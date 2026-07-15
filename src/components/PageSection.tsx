type PageSectionProps = {
  title: string;
  children?: React.ReactNode;
};

export default function PageSection({ title, children }: PageSectionProps) {
  return (
    <main className="flex-1 px-8 py-12 lg:px-16">
      <h1 className="font-barlow-condensed text-4xl font-extrabold uppercase leading-normal text-black">
        {title}
      </h1>
      {children}
    </main>
  );
}
