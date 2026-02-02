import { IconUserCog } from "@tabler/icons-react";

export const PageHeader = () => (
    <div className="px-6 py-4 bg-muted flex items-center gap-4 m-0">
        <IconUserCog size={24}/>
        <h1 className="text-xl font-bold text-gray-900">
          Отправка уведомлений
        </h1>
    </div>
);