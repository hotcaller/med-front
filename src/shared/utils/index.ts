export function formatDate(dateString: string): string {
  if (!dateString) return "Неизвестная дата";
  
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    if (isNaN(date.getTime())) {
      return dateString;
    }
    
    const isToday = 
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();
    
    if (isToday) {
      return `Сегодня, ${new Intl.DateTimeFormat('ru-RU', {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)}`;
    } else {
      return new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }).format(date);
    }
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}