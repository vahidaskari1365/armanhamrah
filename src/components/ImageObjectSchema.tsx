import { Helmet } from 'react-helmet-async';

interface ImageSchemaProps {
  url: string;
  caption: string;
  width?: number;
  height?: number;
}

const ImageObjectSchema = ({ url, caption, width = 1200, height = 630 }: ImageSchemaProps) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": url,
    "caption": caption,
    "width": width,
    "height": height
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

export default ImageObjectSchema;
