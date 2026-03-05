import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageDir = path.join(__dirname, 'public/images');

const optimizeImages = async (dir) => {
  const files = await fs.promises.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.promises.lstat(filePath);

    if (stat.isDirectory()) {
      await optimizeImages(filePath); // Recurse into subdirectories
    } else if (['.png', '.jpg', '.jpeg'].includes(path.extname(file).toLowerCase())) {
      const webpPath = filePath.replace(/\.(png|jpe?g)$/i, '.webp');
      
      if (fs.existsSync(webpPath)) {
        console.log(`Skipping ${file} as WebP version already exists.`);
        continue;
      }

      console.log(`Optimizing ${file}...`);

      try {
        await sharp(filePath)
          .webp({ quality: 80 })
          .toFile(webpPath);
        console.log(`Successfully converted ${file} to WebP.`);
      } catch (err) {
        console.error(`Error converting ${file} to WebP:`, err);
      }
    }
  }
};

(async () => {
  console.log('Starting image optimization...');
  await optimizeImages(imageDir);
  console.log('Image optimization finished.');
})();
