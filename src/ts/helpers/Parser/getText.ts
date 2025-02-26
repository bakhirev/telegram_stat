export default function getText(text: any): string {
  if (typeof text === 'string') {
    return text;
  } else if (Array.isArray(text)) {
    return text.reduce((sum: number, item: string) => (
      sum + getText(item)
    ), '');
  } else if (text?.type === 'plain') {
    return text?.text || '';
  }
  return '';
}
