import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageIntro } from "@/components/common/PageIntro";
import { SiteShell } from "@/components/common/SiteShell";
import { buttonModules, shellModules, extraModules } from "@/content/site";

const storeModules = [...buttonModules, ...shellModules, ...extraModules];
const klassicModules = storeModules.filter(m => m.collection === "Klassic");
const kommunityModules = storeModules.filter(m => m.collection === "Kommunity");

export const metadata: Metadata = {
  title: "Accessories | KOVA",
  description: "Explore the KOVA modular ecosystem. Premium upgrades for your modular gaming setup.",
};

export default function AccessoriesPage() {
  return (
    <SiteShell>
      <PageIntro
        eyebrow="Collection"
        title="Accessories"
        description="Personalize your performance. Official Klassic components and unique Kommunity creations designed to evolve with your playstyle."
      />
      <section className="py-32 bg-white">
        <div className="container mx-auto space-y-32 px-8">
          
          {/* KOVA Klassic Section */}
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black pb-8">
              <div className="max-w-xl">
                <h3 className="text-sm font-bold tracking-[0.5em] text-black uppercase mb-4">
                  Series 01: Klassic
                </h3>
                <h2 className="text-4xl font-light tracking-tighter text-black">Precision Engineered</h2>
              </div>
              <p className="mt-4 md:mt-0 text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                {klassicModules.length} Modules Available
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {klassicModules.map((module) => (
                <Link key={module.id} href={`/accessories/${module.id}`} className="group block">
                  <article className="relative space-y-6">
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-md border border-black bg-gray-50 transition-all duration-500 group-hover:shadow-2xl">
                      {module.image && (
                        <Image 
                          src={module.image} 
                          alt={module.name} 
                          width={600} 
                          height={750} 
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <p className="text-[10px] tracking-[0.4em] font-bold text-gray-400 uppercase">{module.category}</p>
                        <p className="text-sm font-medium text-black">${module.price}</p>
                      </div>
                      <h4 className="text-2xl font-light tracking-tighter text-black transition-colors group-hover:text-gray-500">
                        {module.name}
                      </h4>
                      <p className="text-sm font-light text-gray-600 line-clamp-2 leading-relaxed">
                        {module.description}
                      </p>
                    </div>

                    <div className="pt-4 overflow-hidden">
                       <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-black translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                          View Details <span>→</span>
                       </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

          {/* KOVA Kommunity Section */}
          <div className="space-y-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black pb-8">
              <div className="max-w-xl">
                <h3 className="text-sm font-bold tracking-[0.5em] text-black uppercase mb-4">
                  Series X: Kommunity
                </h3>
                <h2 className="text-4xl font-light tracking-tighter text-black">Experimental Designs</h2>
              </div>
              <p className="mt-4 md:mt-0 text-xs font-bold tracking-[0.2em] text-gray-400 uppercase">
                {kommunityModules.length} Modules Available
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {kommunityModules.map((module) => (
                <Link key={module.id} href={`/accessories/${module.id}`} className="group block">
                  <article className="relative space-y-6">
                    <div className="aspect-[4/5] w-full overflow-hidden rounded-md border border-black bg-gray-50 transition-all duration-500 group-hover:shadow-2xl">
                      {module.image && (
                        <Image 
                          src={module.image} 
                          alt={module.name} 
                          width={600} 
                          height={750} 
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <p className="text-[10px] tracking-[0.4em] font-bold text-gray-400 uppercase">{module.category}</p>
                        <p className="text-sm font-medium text-black">${module.price}</p>
                      </div>
                      <h4 className="text-2xl font-light tracking-tighter text-black transition-colors group-hover:text-gray-500">
                        {module.name}
                      </h4>
                      <p className="text-sm font-light text-gray-600 line-clamp-2 leading-relaxed">
                        {module.description}
                      </p>
                    </div>

                    <div className="pt-4 overflow-hidden">
                       <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.3em] uppercase text-black translate-y-8 transition-transform duration-500 group-hover:translate-y-0">
                          View Details <span>→</span>
                       </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>
    </SiteShell>
  );
}
