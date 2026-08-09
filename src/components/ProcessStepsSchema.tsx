import { Helmet } from 'react-helmet-async';

interface ProcessStepsSchemaProps {
  name: string;
  steps: { text: string }[];
  description?: string;
}

const ProcessStepsSchema = ({ name, steps, description }: ProcessStepsSchemaProps) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": name,
    ...(description ? { "description": description } : {}),
    "numberOfItems": steps.length,
    "itemListElement": steps.map((step, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": step.text
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  );
};

export default ProcessStepsSchema;