import { motion } from 'framer-motion';

const galleryImages = [
  { src: '/images/export/gallery-1.jpg', alt: 'Export Image 1' },
  { src: '/images/export/gallery-2.jpg', alt: 'Export Image 2' },
  { src: '/images/export/gallery-3.jpg', alt: 'Export Image 3' },
  { src: '/images/export/gallery-4.jpg', alt: 'Export Image 4' },
  { src: '/images/export/gallery-5.jpg', alt: 'Export Image 5' },
  { src: '/images/export/gallery-6.jpg', alt: 'Export Image 6' },
];

const ExportGallery = () => {
  return (
    <section className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">گالری تصاویر صادرات</h2>
          <div className="w-24 h-1 mx-auto rounded-full bg-primary mt-4" />
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-lg"
            >
              <img src={image.src} alt={image.alt} className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-300" / loading="lazy" decoding="async">
            </motion.div>
          ))}
        </div>
        <p className="text-center mt-8 text-muted-foreground">
          تصاویری از محصولات صادراتی و فرآیندهای مرتبط
        </p>
      </div>
    </section>
  );
};

export default ExportGallery;
