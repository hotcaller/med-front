import FeedbackCard from "./modules/FeedbackCard";
import FeedbackModal from "./modules/FeedbackAnswerModal";
import { FeedbackProvider } from "./hooks/FeedbackProvider";

const Feedback = () => {
  return (
    <FeedbackProvider>
      <div className="mx-auto pt-6">
        <FeedbackCard />
        <FeedbackModal />
      </div>
    </FeedbackProvider>
  );
};

export default Feedback;  