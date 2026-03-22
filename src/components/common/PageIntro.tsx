type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="from-surface-container-lowest to-surface relative overflow-hidden bg-gradient-to-b py-28">
      <div className="bg-primary/10 absolute top-0 right-0 h-80 w-80 rounded-full blur-3xl" />
      <div className="container relative z-10 mx-auto px-8">
        <p className="text-primary text-[10px] tracking-[0.3em] uppercase">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl text-5xl leading-[0.95] font-bold tracking-tighter text-white md:text-7xl">
          {title}
        </h1>
        <p className="text-on-surface-variant mt-6 max-w-2xl text-lg leading-relaxed">
          {description}
        </p>
      </div>
    </section>
  );
}
