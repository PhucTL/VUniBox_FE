import IntroSection from "../home/introsSection";
import FeedbackSection from "../home/feedbackSection";
import FeaturesSection from "../home/featuresSection";

export default function Home() {
  return (
    <div className="w-full">
      <IntroSection />
      <FeedbackSection />
      <FeaturesSection />
    </div>
  );
}
