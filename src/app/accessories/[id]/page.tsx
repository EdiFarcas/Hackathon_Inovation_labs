"use client";

import { notFound, useParams } from "next/navigation";
import { SiteShell } from "@/components/common/SiteShell";
import { getModuleById } from "@/content/site";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;
  const module = getModuleById(id);
  const [isLoaded, setIsLoaded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!module) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="relative min-h-screen bg-white overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -z-10 hidden lg:block" />
        
        <div className="container mx-auto px-8 py-32">
          {/* Breadcrumbs */}
          <div className={`mb-12 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <Link 
              href="/accessories" 
              className="group flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-gray-400 hover:text-black transition"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span> 
              Back to Catalog
            </Link>
          </div>

          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Image */}
            <div className={`lg:col-span-7 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative aspect-[4/5] w-full rounded-md border border-black bg-white overflow-hidden shadow-2xl group">
                {module.image ? (
                  <Image 
                    src={module.image} 
                    alt={module.name} 
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-12">
                    <div className="text-center">
                      <p className="text-[10px] tracking-[0.3em] font-bold text-black/20 uppercase mb-4">{module.category} Visualization</p>
                      <div className="w-32 h-32 border-2 border-black/10 rounded-full mx-auto mb-4" />
                    </div>
                  </div>
                )}
                
                {/* Image Overlay Label */}
                <div className="absolute bottom-8 left-8 bg-black text-white px-4 py-2 text-[10px] font-bold tracking-[0.4em] uppercase">
                  Ref. {module.id.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Right Column: Content */}
            <div className={`lg:col-span-5 space-y-12 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-black" />
                  <p className="text-xs tracking-[0.4em] font-bold text-black uppercase">{module.collection} Series</p>
                </div>
                <h1 className="text-6xl lg:text-8xl font-light tracking-tighter text-black leading-none">
                  {module.name}
                </h1>
                <p className="text-3xl font-light text-gray-400 mt-6">${module.price}</p>
              </div>

              <div className="space-y-6">
                <p className="text-xl font-light text-gray-700 leading-relaxed max-w-md">
                  {module.description}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  <span className="rounded-full border border-gray-200 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">{module.category}</span>
                  <span className="rounded-full border border-gray-200 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">Toolless Swap</span>
                  <span className="rounded-full border border-gray-200 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">Eco-Friendly</span>
                </div>
              </div>

              <div className="space-y-8 border-t border-black pt-12">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold tracking-[0.3em] text-black uppercase">Technical Specs</h3>
                  <div className="grid gap-4">
                    {module.specs.map((spec, i) => (
                      <div key={spec} className={`flex justify-between items-center border-b border-gray-100 pb-2 transition-all duration-500 delay-[${700 + i*100}ms] ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
                        <span className="text-xs font-light text-gray-500 uppercase tracking-widest">{spec.split(':')[0]}</span>
                        <span className="text-sm font-medium text-black">{spec.split(':')[1] || spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 space-y-4">
                  <button 
                    onClick={() => module && addToCart(module)}
                    className="relative w-full overflow-hidden rounded-md border border-black bg-black text-white px-12 py-6 text-xs font-bold tracking-[0.4em] uppercase transition-all hover:bg-transparent hover:text-black group"
                  >
                    <span className="relative z-10">Add to Cart</span>
                    <div className="absolute inset-0 bg-white translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                  </button>
                  <p className="text-center text-[9px] text-gray-400 uppercase tracking-[0.3em]">
                    Ships within 24 hours • 2 Year Warranty
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Feature Section */}
      <section className="bg-black text-white py-32">
        <div className="container mx-auto px-8 grid lg:grid-cols-3 gap-16">
          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.4em] uppercase text-gray-500">Performance</h4>
            <p className="text-2xl font-light leading-snug">Engineered for zero-latency response and maximum durability.</p>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.4em] uppercase text-gray-500">Customization</h4>
            <p className="text-2xl font-light leading-snug">Swap components in seconds with our magnetic lock system.</p>
          </div>
          <div className="space-y-6">
            <h4 className="text-xs font-bold tracking-[0.4em] uppercase text-gray-500">Sustainability</h4>
            <p className="text-2xl font-light leading-snug">Part of our carbon-neutral modular lifecycle program.</p>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
