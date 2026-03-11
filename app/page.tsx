import { CTASection } from "@/components/landing/CTASection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Hero195 } from "@/components/landing/Hero195";
import { LogosSection } from "@/components/landing/LogosSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { WordRotate } from "@/components/magicui/word-rotate";

export default function Home() {
  return (
    <>
      <Hero195
        title={
          <span className="xl:inline-flex xl:items-baseline xl:gap-[0.35em] xl:whitespace-nowrap">
            <span className="block xl:inline">Reach them</span>
            <span className="block xl:inline-block">
              <WordRotate
                className="min-w-[10ch] xl:min-w-0"
                duration={2000}
                words={["everywhere", "anytime"]}
              />
            </span>
          </span>
        }
        description="Maximize your communications impact by reaching all your customers through SMS, from one fast and reliable platform."
        primaryButtonText="Get started for free"
        primaryButtonUrl="/signup"
        secondaryButtonText="Talk to Sales"
        secondaryButtonUrl="/support"
      />
      <LogosSection />
      <FeaturesSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
