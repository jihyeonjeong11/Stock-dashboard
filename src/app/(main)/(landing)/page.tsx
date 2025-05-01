import { appConfig } from "@/app-config";
import { ComingSoon } from "@/app/(main)/(coming-soon)/coming-soon";
import { HeroSection } from "./_sections/hero";

export default function Home() {
  if (appConfig.mode === "comingSoon") {
    return <ComingSoon />;
  }

  return (
    <div>
      <HeroSection />
    </div>
  );
}
