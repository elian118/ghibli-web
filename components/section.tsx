import React from 'react';

type SectionProps = {
  title: string;
  backBtn?: React.ReactNode;
};

const Section = ({ title, backBtn }: SectionProps) => {
  return (
    <section className="pb-2 mb-4 border-b border-gray-200 flex items-center justify-between w-full">
      <p className="text-2xl font-bold">{title}</p>
      {backBtn ?? null}
    </section>
  );
};

export default Section;
