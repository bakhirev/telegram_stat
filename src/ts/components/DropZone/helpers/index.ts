export async function getStringFromFileList(files: any) {
  const text: string[] = await Promise.all(
    files.map((file: any) => file.text()),
  );

  return text
    .filter(file => file)
    .pop();
}

export function getOnDrop(setLoading: Function, onChange: Function) {
  return async function dropFile(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const files = [...(event?.dataTransfer?.items || [])]
      .map((file: any) => file.kind === 'file' ? file?.getAsFile() : null)
      .filter(file => file);

    setLoading(false);
    if (!files.length) return;

    const text = await getStringFromFileList(files);
    if (!text || text.length < 2) return;

    const report = JSON.parse(text);
    onChange('dump', report);
  };
}

export function getShowDropZone(setLoading: Function) {
  return function showDropZone(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
  };
}
