"use client";

import { useState, type ReactNode } from "react";

/**
 * Shows the first `initial` rows and a button that reveals the rest. Rows are
 * rendered on the server and passed in, so this only toggles visibility.
 * `kind` picks the container: a table body (with `head` as its thead) or a list.
 */
export function Expandable({
  rows,
  initial,
  noun,
  kind,
  head,
  className = "",
}: {
  rows: ReactNode[];
  initial: number;
  noun: string;
  kind: "table" | "list";
  head?: ReactNode;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const hidden = rows.length - initial;
  const shown = open || hidden <= 0 ? rows : rows.slice(0, initial);

  return (
    <div className="flex flex-col gap-3">
      {kind === "table" ? (
        <div className="overflow-x-auto rounded-lg border border-[#26262a]">
          <table className={className}>
            {head}
            <tbody>{shown}</tbody>
          </table>
        </div>
      ) : (
        <ul className={className}>{shown}</ul>
      )}
      {hidden > 0 && (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="min-h-11 self-start rounded-lg border border-[#3a3a40] px-4 text-[12px] text-[#d6d3ca] hover:border-[#5a5a62] hover:text-white"
        >
          {open ? "Show fewer" : `Show all ${rows.length} ${noun}`}
        </button>
      )}
    </div>
  );
}
