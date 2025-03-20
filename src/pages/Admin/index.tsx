import { IconMail } from "@tabler/icons-react";
import { useState } from "react";
import { ReminderDialog } from "./components/Modals/ReminderDialog";
import { WarningDialog } from "./components/Modals/WarningDialog";
import { NewsDialog } from "./components/Modals/NewsDialog";
import { ImportantDialog } from "./components/Modals/ImportantDialog";
import { PageHeader } from "./components/PageHeader/PageHeader";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { User, UserList } from "./modules/UserList";

const users: User[] = [
  { id: 1, name: "Иван Иванов" },
  { id: 2, name: "Мария Петрова" },
  { id: 3, name: "Алексей Смирнов" },
];

const Admin = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isReminderOpen, setIsReminderOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isNewsOpen, setIsNewsOpen] = useState(false);
  const [isImportantOpen, setIsImportantOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedReminder, setSelectedReminder] = useState("");
  const [customReminder, setCustomReminder] = useState("");
  const [selectedWarning, setSelectedWarning] = useState("");
  const [newsTitle, setNewsTitle] = useState("");
  const [newsContent, setNewsContent] = useState("");
  const [importantTitle, setImportantTitle] = useState("");
  const [importantContent, setImportantContent] = useState("");

  const filteredUsers = users.filter(user => 
    user.id.toString().includes(searchQuery)
  );

  const handleSubmit = (reset: () => void, close: () => void) => {
    reset();
    close();
  };

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <PageHeader />
        
        <ReminderDialog
          open={isReminderOpen}
          onOpenChange={setIsReminderOpen}
          selectedReminder={selectedReminder}
          setSelectedReminder={setSelectedReminder}
          customReminder={customReminder}
          setCustomReminder={setCustomReminder}
          message={message}
          setMessage={setMessage}
          onSubmit={() => handleSubmit(() => {
            setSelectedReminder("");
            setCustomReminder("");
            setMessage("");
          }, () => setIsReminderOpen(false))}
        />

        <WarningDialog
          open={isWarningOpen}
          onOpenChange={setIsWarningOpen}
          selectedWarning={selectedWarning}
          setSelectedWarning={setSelectedWarning}
          customTitle={customTitle}
          setCustomTitle={setCustomTitle}
          message={message}
          setMessage={setMessage}
          onSubmit={() => handleSubmit(() => {
            setSelectedWarning("");
            setCustomTitle("");
            setMessage("");
          }, () => setIsWarningOpen(false))}
        />

        <NewsDialog
          open={isNewsOpen}
          onOpenChange={setIsNewsOpen}
          title={newsTitle}
          setTitle={setNewsTitle}
          content={newsContent}
          setContent={setNewsContent}
          onSubmit={() => handleSubmit(() => {
            setNewsTitle("");
            setNewsContent("");
          }, () => setIsNewsOpen(false))}
        />

        <ImportantDialog
          open={isImportantOpen}
          onOpenChange={setIsImportantOpen}
          title={importantTitle}
          setTitle={setImportantTitle}
          content={importantContent}
          setContent={setImportantContent}
          onSubmit={() => handleSubmit(() => {
            setImportantTitle("");
            setImportantContent("");
          }, () => setIsImportantOpen(false))}
        />

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
          <div className="flex flex-col items-center justify-between gap-4 border-b bg-white p-6 sm:flex-row">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
              {users.length} Пользователя
            </span>
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
          </div>

          <UserList
            users={filteredUsers}
            onOpenNews={() => setIsNewsOpen(true)}
            onOpenReminder={() => setIsReminderOpen(true)}
            onOpenWarning={() => setIsWarningOpen(true)}
            onOpenImportant={() => setIsImportantOpen(true)}
          />

          {filteredUsers.length === 0 && (
            <div className="p-12 text-center">
              <IconMail className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-4 text-sm font-medium text-gray-900">
                Пользователи не найдены
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Попробуйте изменить параметры поиска
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin; 