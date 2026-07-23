import { Helmet } from 'react-helmet-async';

interface HowToSchemaProps {
  name: string;
  steps: { text: string }[];
  description?: string;
}

const HowToSchema = ({ name, steps, description }: HowToSchemaProps) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    ...(description ? { "description": description } : {}),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": `مرحله ${index + 1}`,
      "text": step.text
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

export default HowToSchema;
