
import { createClient } from '@supabase/supabase-js';
import { productsData } from './src/data/products';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL or Key is not defined in the environment variables. Please check your .env file');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('Starting the seeding process...');

  try {
    // 1. Seed Brands and get a map of brand names to their new UUIDs
    console.log('Seeding brands...');
    const uniqueBrandNames = [...new Set(productsData.map(p => p.brand_id))];
    const { data: brands, error: brandError } = await supabase
      .from('brands')
      .insert(uniqueBrandNames.map(name => ({ name })))
      .select('id, name');

    if (brandError) throw new Error(`Error seeding brands: ${brandError.message}`);
    
    const brandMap = new Map(brands.map(b => [b.name, b.id]));
    console.log(`${brands.length} brands seeded successfully.`);

    // 2. Seed Categories and get a map of category names to their new UUIDs
    console.log('Seeding categories...');
    const uniqueCategoryNames = [...new Set(productsData.map(p => p.category_id))];
    const { data: categories, error: categoryError } = await supabase
      .from('categories')
      .insert(uniqueCategoryNames.map(name => ({ name })))
      .select('id, name');

    if (categoryError) throw new Error(`Error seeding categories: ${categoryError.message}`);

    const categoryMap = new Map(categories.map(c => [c.name, c.id]));
    console.log(`${categories.length} categories seeded successfully.`);

    // 3. Seed Products
    console.log('Seeding products...');
    const productsToInsert = productsData.map(p => ({
      name: p.name,
      slug: p.slug,
      image: p.image,
      description: p.description,
      brand_id: brandMap.get(p.brand_id),
      category_id: categoryMap.get(p.category_id),
    }));

    const { data: insertedProducts, error: productError } = await supabase
      .from('products')
      .insert(productsToInsert)
      .select('id, slug');

    if (productError) throw new Error(`Error seeding products: ${productError.message}`);
    
    const productMap = new Map(insertedProducts.map(p => [p.slug, p.id]));
    console.log(`${insertedProducts.length} products seeded successfully.`);

    // 4. Seed Product Specs
    console.log('Seeding product specifications...');
    const specsToInsert = productsData.flatMap(p => {
      const productId = productMap.get(p.slug);
      if (!productId) return [];
      
      return Object.entries(p.specs).map(([spec_key, spec_value]) => ({
        product_id: productId,
        spec_key,
        spec_value,
      }));
    });

    const { error: specsError } = await supabase
      .from('product_specs')
      .insert(specsToInsert);

    if (specsError) throw new Error(`Error seeding product specs: ${specsError.message}`);
    
    console.log(`${specsToInsert.length} product specs seeded successfully.`);
    console.log('\n');
    console.log('✅ ✅ ✅ Database seeding completed successfully! ✅ ✅ ✅');

  } catch (error) {
    console.error('\n');
    console.error('❌ ❌ ❌ An error occurred during the seeding process: ❌ ❌ ❌');
    if (error instanceof Error) {
        console.error(error.message);
    } else {
        console.error(error);
    }
  }
}

seedDatabase();
