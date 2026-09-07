import { expect, test, type Page } from '@playwright/test';

const forms = [
  {
    type: 'survey',
    path: '/warranty/customer-survey',
    heading: 'فرم نظرسنجی مشتریان',
    englishHeading: 'Customer Satisfaction Survey',
    title: 'نظرسنجی مشتریان خدمات پس از فروش | آرمان همراه',
    firstField: '#survey-customer-name',
  },
  {
    type: 'complaint',
    path: '/warranty/complaints',
    heading: 'فرم رسیدگی به شکایت مشتریان',
    englishHeading: 'Customer Complaint Form',
    title: 'فرم رسیدگی به شکایت مشتریان | آرمان همراه',
    firstField: '#complaint-receipt-number',
  },
] as const;

type ServiceForm = (typeof forms)[number];

const surveyData = {
  customerName: 'کاربر آزمایشی',
  warrantyNumber: 'TEST-123',
  mobile: '۰۹۱۲۰۰۰۰۰۰۰',
  suggestions: 'این پیام فقط برای آزمایش فرم است.',
  ratings: {
    acceptanceTime: 'good',
    repairTime: 'good',
    serviceCost: 'good',
    staffBehavior: 'good',
    repairUpdates: 'good',
    serviceCenterAccess: 'good',
    issueResolution: 'high',
  },
};

const complaintData = {
  receiptNumber: 'TEST-123',
  firstName: 'کاربر',
  lastName: 'آزمایشی',
  province: 'تهران',
  city: 'تهران',
  mobile: '۰۹۱۲۰۰۰۰۰۰۰',
  email: 'test@example.com',
  complaintTypes: ['device-issues', 'response-time'],
  description: 'این شکایت فقط برای آزمایش فرم است.',
  expertOpinion: 'توضیح آزمایشی کارشناس',
};

async function expectNoHorizontalOverflow(page: Page) {
  // A form can be "visible" in the DOM while sitting 10,000px outside the
  // viewport. Check the actual document width, not just CSS visibility.
  await expect.poll(() => page.evaluate(() =>
    Math.max(document.body.scrollWidth, document.documentElement.scrollWidth)
      - document.documentElement.clientWidth,
  )).toBeLessThanOrEqual(1);
}

async function expectUsableForm(page: Page, form: ServiceForm) {
  const heading = page.getByRole('heading', { level: 1, name: form.heading, exact: true });
  await expect(heading).toBeVisible();
  await expect(page.locator('form')).toHaveCSS('opacity', '1');
  await expectNoHorizontalOverflow(page);
  await expect(heading).toBeInViewport();
  await expect(page.locator(form.firstField)).toBeEditable();
  await expect(page.locator('form input[name="website"]')).toBeHidden();
  await expect(page.locator(`form input[type="${form.type === 'survey' ? 'radio' : 'checkbox'}"]`))
    .toHaveCount(form.type === 'survey' ? 35 : 7);
}

async function fillForm(page: Page, form: ServiceForm) {
  const data = form.type === 'survey' ? surveyData : complaintData;
  for (const [name, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      await page.locator(`form [name="${name}"]`).fill(value);
    }
  }

  if (form.type === 'survey') {
    for (const [question, answer] of Object.entries(surveyData.ratings)) {
      await page.locator(`label[for="survey-${question}-${answer}"]`).click();
    }
  } else {
    for (const category of complaintData.complaintTypes) {
      await page.locator(`#complaint-category-${category}`).check();
    }
  }

  return { formType: form.type, data, website: '' };
}

test.beforeEach(async ({ page, baseURL }) => {
  // Never send test feedback, analytics, or email to the live services.
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.origin === new URL(baseURL!).origin) {
      if (url.pathname.startsWith('/api/')) {
        await route.fulfill({ status: 503, json: { success: false } });
      } else {
        await route.continue();
      }
    } else if (url.hostname.endsWith('.supabase.co')) {
      await route.fulfill({ json: [] });
    } else {
      await route.abort();
    }
  });
});

test.afterEach(async ({ page }) => {
  expect(await page.pageErrors()).toEqual([]);
});

for (const form of forms) {
  test(`${form.type}: opens from warranty without moving RTL content off-screen`, async ({ page }) => {
    await page.goto('/warranty/');
    await page.locator(`a[href="${form.path}"]`).click();
    await expect(page).toHaveURL(form.path);
    await expectUsableForm(page, form);
  });

  test(`${form.type}: has a built entry page and survives a direct visit and refresh`, async ({ page, request }) => {
    // Vite preview has an SPA fallback that can hide missing HTML files on the
    // PHP/static production host. Verify route-specific HTML before running JS.
    const response = await request.get(`${form.path}/`);
    expect(response.status()).toBe(200);
    const html = await response.text();
    expect(html).toContain(`<title>${form.title}</title>`);
    expect(html).toContain('<meta name="robots" content="noindex, nofollow"');
    expect(html).toContain(`rel="canonical" href="https://armanhamrah.com${form.path}/"`);

    await page.goto(`${form.path}/`);
    await expectUsableForm(page, form);
    await page.reload();
    await expectUsableForm(page, form);
  });

  test(`${form.type}: stays on-screen after language and theme changes`, async ({ page }) => {
    await page.goto(`${form.path}/`);
    await expectUsableForm(page, form);
    await page.getByTitle('English', { exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
    await expect(page.getByRole('heading', { level: 1, name: form.englishHeading })).toBeInViewport();
    await expectNoHorizontalOverflow(page);
    await page.getByTitle('Light Mode', { exact: true }).click();
    await expect(page.locator('html')).toHaveClass(/light/);
    await page.getByTitle('فارسی', { exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
    await expectUsableForm(page, form);
  });

  test(`${form.type}: validates, retains data on failure, and submits with an empty honeypot`, async ({ page }) => {
    const submissions: unknown[] = [];
    await page.route('**/api/submit-service-form.php', async (route) => {
      expect(route.request().method()).toBe('POST');
      submissions.push(route.request().postDataJSON());
      const success = submissions.length > 1;
      await route.fulfill({ status: success ? 200 : 503, json: { success } });
    });

    await page.goto(`${form.path}/`);
    await expectUsableForm(page, form);
    const submit = page.locator('form button[type="submit"]');
    await submit.click();
    expect(await page.locator('form').evaluate((element: HTMLFormElement) => element.checkValidity())).toBe(false);
    expect(submissions).toHaveLength(0);

    const payload = await fillForm(page, form);
    const originalValue = await page.locator(form.firstField).inputValue();
    await submit.click();
    await expect(page.locator('form [role="alert"]')).toContainText('ارسال فرم انجام نشد');
    await expect(page.locator(form.firstField)).toHaveValue(originalValue);
    expect(submissions).toEqual([payload]);

    await submit.click();
    await expect(page.locator('form [role="status"]')).toContainText('با موفقیت');
    expect(submissions).toEqual([payload, payload]);
    await expect(page.locator(form.firstField)).toHaveValue('');
    await expect(page.locator('form input:checked')).toHaveCount(0);
    await expectNoHorizontalOverflow(page);
  });
}
