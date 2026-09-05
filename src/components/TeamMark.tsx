import type { TeamMember } from "@/data/team";

const tints = [
  "from-[#dbe7ff] to-[#b8cff5]",
  "from-[#e4dcff] to-[#c9bdf2]",
  "from-[#d6f0f1] to-[#b5dfe2]",
  "from-[#e8e8ed] to-[#cfcfd6]",
  "from-[#ffe6d5] to-[#f5cbb0]",
  "from-[#dff2e3] to-[#bfe2c7]",
];

/** Soft-tinted initials disc in place of a portrait — honest, and consistent with the system. */
export function TeamMark({ member }: { member: TeamMember }) {
  return (
    <div
      role="img"
      aria-label={`Initials for ${member.name}`}
      className={`flex size-20 items-center justify-center rounded-full bg-gradient-to-br ${tints[member.seed % tints.length]}`}
    >
      <span className="text-[24px] font-semibold tracking-[-0.02em] text-[#1d1d1f]/80">{member.initials}</span>
    </div>
  );
}
