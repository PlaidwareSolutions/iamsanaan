import type { TeamMember } from "@/data/team";

/**
 * Abstract portrait mark — a seeded geometric composition instead of a fake
 * photo. Three motif families keep the grid varied; honest for a demo build.
 */
export function TeamMark({ member }: { member: TeamMember }) {
  const s = member.seed;
  // offset the second grid row so columns don't repeat the same motif
  const variant = (s + (s >= 3 ? 2 : 0)) % 3;
  const mirrored = s >= 3;

  return (
    <svg
      viewBox="0 0 100 100"
      role="img"
      aria-label={`Abstract portrait mark for ${member.name}`}
      className="block h-auto w-full"
    >
      <rect width="100" height="100" fill="#e9e6dc" />
      <g transform={mirrored ? "translate(100 0) scale(-1 1)" : undefined}>

      {variant === 0 && (
        <>
          {/* full circle + diagonal bar */}
          <circle cx={34 + s * 3} cy={36} r={22} fill="#1a1a1c" />
          <circle cx={34 + s * 3} cy={36} r={12} fill="none" stroke="#e9e6dc" strokeWidth="1.5" />
          <rect x={20} y={64} width={52} height={7} fill="#1a1a1c" transform={`rotate(${-12 - s * 4} 46 68)`} />
          <rect x={76 - s * 2} y={18} width={9} height={9} fill="#ff4d00" />
        </>
      )}

      {variant === 1 && (
        <>
          {/* quarter arc + stacked lines */}
          <path d={`M 22 66 A 34 34 0 0 1 56 32 L 56 66 Z`} fill="#1a1a1c" />
          <rect x={62} y={30 + s * 2} width={20} height={5} fill="#1a1a1c" />
          <rect x={62} y={42 + s * 2} width={14} height={5} fill="#1a1a1c" />
          <rect x={62} y={54 + s * 2} width={24} height={5} fill="#1a1a1c" />
          <circle cx={30 + s * 3} cy={24} r={5} fill="#ff4d00" />
        </>
      )}

      {variant === 2 && (
        <>
          {/* semicircle + column */}
          <path d={`M 20 52 A 26 26 0 0 1 72 52 Z`} fill="#1a1a1c" />
          <rect x={42 + s} y={52} width={9} height={26} fill="#1a1a1c" />
          <rect x={62 + s * 2} y={60} width={14} height={14} fill="none" stroke="#1a1a1c" strokeWidth="2" />
          <rect x={22} y={62 + (s % 2) * 6} width={9} height={9} fill="#ff4d00" />
        </>
      )}
      </g>

      <text
        x="8"
        y="92"
        fontFamily="var(--font-jbm), monospace"
        fontSize="8"
        letterSpacing="1.5"
        fill="#625f56"
      >
        {member.initials}
      </text>
    </svg>
  );
}
