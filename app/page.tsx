import { Benefits } from "./component/landing/Benefits";
import { CtaBanner } from "./component/landing/Ctabanner";
import { Hero } from "./component/landing/Hero";
import { HowItWorks } from "./component/landing/Howitworks";
import { TrustSection } from "./component/landing/Trustsection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Benefits />
      <TrustSection />
      <CtaBanner />
    </>
  );
}
