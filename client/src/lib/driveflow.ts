export type NamedDriveItem = { id: number; name: string };

export function filterDriveItems<T extends NamedDriveItem>(items: T[], query: string): T[] {
  const normalizedQuery = query.trim().toLocaleLowerCase();
  if (!normalizedQuery) return items;
  return items.filter((item) => item.name.toLocaleLowerCase().includes(normalizedQuery));
}

export function toggleDriveSelection(selectedIds: number[], id: number): number[] {
  return selectedIds.includes(id)
    ? selectedIds.filter((selectedId) => selectedId !== id)
    : [...selectedIds, id];
}
