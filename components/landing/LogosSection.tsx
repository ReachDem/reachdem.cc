"use client";

import Image from "next/image";

const logos = [
  { src: "/images/Orange.png", alt: "Orange Cameroon", width: 130, height: 48, className: "h-12 w-auto" },
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
    <section className="relative overflow-hidden bg-muted/50 py-14">
      <div className="mx-auto text-center">
        <p className="mb-8 text-sm font-medium uppercase tracking-[0.32em] text-muted-foreground">
          Supported from the start by the best partners.
        </p>
        <div
          className="relative overflow-hidden"
          style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
        >
          <div className="flex w-max animate-marquee items-center gap-20">
            {[...logos, ...logos, ...logos, ...logos].map((logo, index) =>
              logo.external ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${logo.alt}-${index}`}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  loading="lazy"
                  className={`${logo.className} shrink-0 object-contain opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:invert`}
                />
              ) : (
                <Image
                  key={`${logo.alt}-${index}`}
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`${logo.className} shrink-0 object-contain opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:invert`}
                />
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
