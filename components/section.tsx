import React from 'react';

type SectionProps = {
  title: string;
};

const Section = ({ title }: SectionProps) => {
  return (
    <section className="pb-2 mb-4 border-b border-gray-200">
      <p className="text-2xl font-bold">{title}</p>
    </section>
  );
};

export default Section;
