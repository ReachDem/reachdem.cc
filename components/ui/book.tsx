import type { JSX } from 'react';
import Image from 'next/image';

interface BookProps {
  title: string;
}

export function Book({ title }: BookProps): JSX.Element {
  return (
    <div className="group relative h-[280px] w-[220px] flex-shrink-0 cursor-pointer overflow-visible perspective-[1000px] mx-auto">
      
      {/* Back Cover & Pages (visible when front flips open) */}
      <div className="absolute inset-0 rounded-r-lg rounded-l-sm bg-white shadow-xl border-y border-r border-[#e9e9e9]">
        {/* Page edges styling */}
        <div className="absolute left-[3px] right-0 top-[2px] bottom-[2px] rounded-r-md border border-gray-100 bg-[#fafafa]" />
        <div className="absolute left-[6px] right-0 top-[4px] bottom-[4px] rounded-r-sm border-y border-r border-gray-100 bg-white flex flex-col items-center justify-center p-4">
           {/* Content inside the book (optional, currently empty or subtle logo) */}
           <span className="text-gray-300 font-bold opacity-50">ReachDem</span>
        </div>
      </div>

      {/* Front Cover (This flips open on hover/focus) */}
      <div 
        className="absolute inset-0 z-10 origin-left transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-y-[35deg] group-focus-within:-rotate-y-[35deg] group-hover:shadow-2xl group-focus-within:shadow-2xl rounded-r-lg rounded-l-sm overflow-hidden border border-gray-200 bg-white"
        style={{ transformStyle: "preserve-3d" }}
      >
        
        {/* Spine styling/gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/10 via-black/5 to-transparent z-20 pointer-events-none" />
        <div className="absolute left-[1px] top-0 bottom-0 w-[1px] bg-white/40 z-20 pointer-events-none" />
        <div className="absolute left-6 top-0 bottom-0 w-[1px] bg-black/5 z-20 pointer-events-none" />

        <div className="flex h-full flex-col">
          {/* Top Half: Yellow color */}
          <div className="h-[52%] w-full bg-[#fbbc05]" />
          
          {/* Bottom Half: White background with text & logo */}
          <div className="flex flex-1 flex-col justify-between p-6 pl-8 z-0">
            <p className="text-[17px] font-bold leading-snug text-gray-900 tracking-tight text-balance">
              {title}
            </p>
            
            {/* ReachDem Logo replacing Vercel triangle */}
            <div className="mt-auto">
               <Image 
                 src="/icon.png" 
                 alt="ReachDem" 
                 width={24} 
                 height={24} 
                 className="opacity-90 grayscale contrast-200 object-contain mix-blend-multiply drop-shadow-sm" 
               />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
