import { Para } from "@/components/typography/para";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

export default function QuizLoading() {
  return (
    <div className="flex h-[70vh] w-full items-center justify-center p-5 md:p-10 md:pl-32">
      <div className="flex flex-col items-center gap-4">
        <LoadingSpinner size="lg" />
        <Para>Loading quiz questions...</Para>
      </div>
    </div>
  );
}
