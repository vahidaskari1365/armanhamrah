import { createClient } from '@supabase/supabase-js';

// پروژه قدیمی (Lovable / Firebase)
const oldSupabase = createClient(
  'https://hlwdnwssvctffotklqjl.supabase.co',  // VITE_SUPABASE_URL قدیمی
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhsd2Rud3NzdmN0ZmZvdGtscWpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc0OTE0ODIsImV4cCI6MjA4MzA2NzQ4Mn0.Le7ikMo8sF9oCDyMepTHvhrc-z3YuU2zFrK6-bPDO7Q'
);

// پروژه جدید (armanhamrah)
const newSupabase = createClient(
  'https://iksjergvpjsqcbdiwizq.supabase.co', // VITE_SUPABASE_URL جدید
  'sb_publishable_IZrpkPS5e1wVyE-62ph7CA_vDKCCM8d' // Publishable Key جدید
);

async function migrateProducts() {
  try {
    // گرفتن تمام محصولات از پروژه قدیمی
    const { data: oldProducts, error: fetchError } = await oldSupabase
      .from('products')
      .select('*');

    if (fetchError) {
      console.error('Error fetching old products:', fetchError);
      return;
    }

    // اضافه کردن محصولات به پروژه جدید
    for (const product of oldProducts) {
      const { error } = await newSupabase.from('products').insert([product]);
      if (error) console.error('Error inserting product:', error);
    }

    console.log('Migration complete! Total products:', oldProducts.length);
  } catch (err) {
    console.error('Unexpected error:', err);
  }
}

migrateProducts();
