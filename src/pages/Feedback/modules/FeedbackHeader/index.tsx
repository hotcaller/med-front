import { IconMessageFilled, IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import FeedbackAddModal from "./FeedbackAddModal/FeedbackAddModal";

const FeedbackHeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-muted p-4 flex flex-col md:flex-row gap-4 items-left md:items-center justify-between">
      <div className="flex items-center">
        <IconMessageFilled className="h-5 w-5 mr-2" />
        <h2 className="text-lg font-semibold">Обратная связь</h2>
      </div>
      <Button 
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2"
      >
        <IconPlus className="h-4 w-4" />
        Добавить сообщение
      </Button>

      <FeedbackAddModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default FeedbackHeader;