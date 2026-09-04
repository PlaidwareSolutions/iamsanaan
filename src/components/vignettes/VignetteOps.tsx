import { cn } from "@/lib/utils";

/**
 * Coded UI vignette — Veyra Freight operations dashboard.
 * Everything is em-based inside a container-query wrapper so it scales like a screenshot.
 * Decorative: parents provide the textual context.
 */
export function VignetteOps({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("@container w-full select-none", className)}>
      <div
        className="relative w-full overflow-hidden border border-[#26262a] bg-[#101013] text-[#d6d3ca] shadow-[0_30px_80px_rgb(0_0_0/0.45)]"
        style={{ fontSize: "1.05cqw", aspectRatio: "16/10" }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-[1em] border-b border-[#232327] bg-[#0b0b0d] px-[1.6em] py-[1em]">
          <span className="flex gap-[0.5em]">
            <i className="size-[0.7em] rounded-full bg-[#3a3a40]" />
            <i className="size-[0.7em] rounded-full bg-[#3a3a40]" />
            <i className="size-[0.7em] rounded-full bg-[#3a3a40]" />
          </span>
          <span className="rounded-[0.3em] bg-[#1a1a1e] px-[1.2em] py-[0.35em] font-mono text-[0.8em] text-[#6f6e67]">
            ops.veyrafreight.com
          </span>
        </div>

        <div className="flex" style={{ height: "calc(100% - 3.1em)" }}>
          {/* Sidebar */}
          <div className="flex w-[16%] flex-col gap-[1.6em] border-r border-[#232327] p-[1.6em]">
            <span className="font-mono text-[1em] font-bold tracking-[0.2em] text-[#edeae1]">VEYRA</span>
            {["Load board", "Quotes", "Carriers", "Lanes", "Reports"].map((item, i) => (
              <span
                key={item}
                className={cn(
                  "flex items-center gap-[0.7em] text-[0.95em]",
                  i === 0 ? "text-[#ff4d00]" : "text-[#6f6e67]",
                )}
              >
                <i className={cn("size-[0.5em]", i === 0 ? "bg-[#ff4d00]" : "bg-[#3a3a40]")} />
                {item}
              </span>
            ))}
          </div>

          {/* Main */}
          <div className="flex flex-1 flex-col p-[1.8em]">
            {/* KPI tiles */}
            <div className="grid grid-cols-3 gap-[1.2em]">
              {[
                { label: "MARGIN / LANE", value: "18.4%", delta: "+2.1", up: true },
                { label: "LOADS THIS WEEK", value: "91", delta: "+8", up: true },
                { label: "QUOTE TURNAROUND", value: "11 min", delta: "−3.1h", up: true },
              ].map((kpi) => (
                <div key={kpi.label} className="border border-[#232327] bg-[#141417] p-[1.2em]">
                  <p className="font-mono text-[0.75em] tracking-[0.14em] text-[#6f6e67]">{kpi.label}</p>
                  <p className="mt-[0.5em] text-[1.9em] font-medium text-[#edeae1]">{kpi.value}</p>
                  <p className="mt-[0.3em] font-mono text-[0.75em] text-[#7fb069]">▲ {kpi.delta}</p>
                </div>
              ))}
            </div>

            {/* Chart + table */}
            <div className="mt-[1.2em] grid min-h-0 flex-1 grid-cols-5 gap-[1.2em]">
              <div className="col-span-2 flex flex-col border border-[#232327] bg-[#141417] p-[1.2em]">
                <p className="font-mono text-[0.75em] tracking-[0.14em] text-[#6f6e67]">MARGIN BY WEEK</p>
                <svg viewBox="0 0 200 80" preserveAspectRatio="none" className="mt-[0.8em] w-full flex-1">
                  <polyline
                    points="0,62 25,58 50,60 75,48 100,44 125,34 150,30 175,22 200,14"
                    fill="none"
                    stroke="#ff4d00"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                  <polyline
                    points="0,62 25,58 50,60 75,48 100,44 125,34 150,30 175,22 200,14 200,80 0,80"
                    fill="#ff4d00"
                    opacity="0.08"
                  />
                  {[62, 44, 30, 14].map((y, i) => (
                    <line
                      key={i}
                      x1={i * 66}
                      y1="0"
                      x2={i * 66}
                      y2="80"
                      stroke="#edeae1"
                      strokeOpacity="0.06"
                      vectorEffect="non-scaling-stroke"
                    />
                  ))}
                </svg>
              </div>
              <div className="col-span-3 flex flex-col border border-[#232327] bg-[#141417] p-[1.2em]">
                <p className="font-mono text-[0.75em] tracking-[0.14em] text-[#6f6e67]">ACTIVE LOADS</p>
                <div className="mt-[0.8em] flex flex-1 flex-col justify-between gap-[0.55em]">
                  {[
                    { id: "VF-2381", lane: "HOU → DAL", status: "In transit", tone: "#7fb069" },
                    { id: "VF-2379", lane: "HOU → ATL", status: "Quoted", tone: "#ff4d00" },
                    { id: "VF-2375", lane: "SAT → MEM", status: "At pickup", tone: "#d9b44a" },
                    { id: "VF-2373", lane: "AUS → OKC", status: "Quoted", tone: "#ff4d00" },
                    { id: "VF-2371", lane: "DAL → PHX", status: "Delivered", tone: "#6f6e67" },
                  ].map((row) => (
                    <div
                      key={row.id}
                      className="flex items-center justify-between border-b border-[#1e1e22] pb-[0.5em] text-[0.9em]"
                    >
                      <span className="font-mono text-[#9a988f]">{row.id}</span>
                      <span className="text-[#d6d3ca]">{row.lane}</span>
                      <span
                        className="rounded-full px-[0.8em] py-[0.15em] font-mono text-[0.78em]"
                        style={{ color: row.tone, backgroundColor: `${row.tone}1a` }}
                      >
                        {row.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
