type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="bg-white py-48 border-b border-black">
      <div className="container mx-auto px-8">
        <p className="text-[10px] font-bold tracking-[0.3em] text-black uppercase">{eyebrow}</p>
        <h1 className="mt-8 max-w-4xl text-6xl leading-[0.95] font-light tracking-tighter text-black md:text-[6rem]">
          {title}
        </h1>
        <p className="mt-12 max-w-2xl text-xl leading-relaxed text-gray-700 font-light">
          {description}
        </p>
      </div>
    </section>
  );
}
