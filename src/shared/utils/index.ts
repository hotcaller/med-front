export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('ru-RU', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
}