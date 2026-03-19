"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const logos = [
  { src: "/images/mtn-black.png", alt: "MTN", width: 120, height: 60, className: "h-14 w-auto" },
  { src: "/images/lowejo.svg", alt: "Lowejo", width: 120, height: 28, className: "h-7 w-auto" },
  {
    src: "https://eleven-public-cdn.elevenlabs.io/payloadcms/pwsc4vchsqt-ElevenLabsGrants.webp",
    alt: "ElevenLabs",
    width: 144,
    height: 36,
    className: "h-8 w-36",
    external: true,
  },
];

export function LogosSection() {
  return (
    <section className="relative overflow-hidden py-14 sm:py-18">
      <div className="container mx-auto text-center">
        <p className="mb-8 text-sm font-medium tracking-normal text-primary text-muted-foreground">
          Supported from the start by the best partners.
        </p>
        <div className="relative mx-auto flex items-center justify-center pt-2">
          <Carousel
            opts={{ align: "start", loop: true }}
            plugins={[AutoScroll({ playOnInit: true, speed: 0.9, stopOnInteraction: false })]}
            className="w-full"
          >
            <CarouselContent className="ml-0">
              {[...logos, ...logos].map((logo, index) => (
                <CarouselItem
                  key={`${logo.alt}-${index}`}
                  className="mx-2 flex h-24 basis-1/2 items-center justify-center border-y border-border/70 pl-0 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                >
                  <div className="flex h-full w-full items-center justify-center px-6 py-4">
                    <div className="flex h-full w-full items-center justify-center bg-transparent dark:border dark:invert">
                    {logo.external ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        loading="lazy"
                        className={`${logo.className} shrink-0 object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:brightness-[0.12]`}
                      />
                    ) : (
                      <Image
                        src={logo.src}
                        alt={logo.alt}
                        width={logo.width}
                        height={logo.height}
                        className={`${logo.className} shrink-0 object-contain opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:brightness-[0.12]`}
                      />
                    )}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-background to-transparent sm:w-28" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-background to-transparent sm:w-28" />
        </div>
      </div>
    </section>
  );
}
