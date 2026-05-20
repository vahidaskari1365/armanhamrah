import type { ProductSpecEntry } from '@/types/product';

export function resolveSpecLabel(
  label: string,
  lang: 'fa' | 'en',
  t: (key: string) => string
): string {
  if (label.includes('.')) return t(label);
  return lang === 'fa' ? label : label;
}

export function getSpecEntryText(
  entry: ProductSpecEntry,
  lang: 'fa' | 'en'
): { label: string; value: string } {
  return {
    label: entry.label[lang],
    value: entry.value[lang],
  };
}

export function resolveLegacySpecValue(
  value: string,
  t: (key: string) => string
): string {
  if (value.startsWith('spec.')) return t(value);
  return value;
}

export function resolveLegacySpecKey(key: string, t: (key: string) => string): string {
  if (key.startsWith('spec.')) return t(key);
  return key;
}
