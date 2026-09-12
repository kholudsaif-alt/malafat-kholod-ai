import { describe, expect, it } from "vitest";
import { filterDriveItems, toggleDriveSelection } from "../client/src/lib/driveflow";

describe("driveflow helpers", () => {
  const items = [
    { id: 1, name: "مجلد المشاريع" },
    { id: 2, name: "Brand Guidelines 2024.pdf" },
    { id: 3, name: "خطة المحتوى - Q3" },
  ];

  it("filters files case-insensitively and ignores surrounding whitespace", () => {
    expect(filterDriveItems(items, "  brand ")).toEqual([items[1]]);
    expect(filterDriveItems(items, "")).toEqual(items);
  });

  it("toggles a selected file without mutating the original array", () => {
    const selected = [1, 3];
    expect(toggleDriveSelection(selected, 3)).toEqual([1]);
    expect(toggleDriveSelection(selected, 2)).toEqual([1, 3, 2]);
    expect(selected).toEqual([1, 3]);
  });
});
