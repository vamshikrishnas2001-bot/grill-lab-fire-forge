import { BarChart, Bar, LineChart, Line, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip } from "recharts";

export default function AnalyticsCharts({ daily, top }: { daily: any[]; top: any[] }) {
  return (
    <div className="mt-6 grid lg:grid-cols-2 gap-4">
      <div className="bg-bg2 border border-white/5 p-6">
        <p className="label-mono">Daily Orders</p>
        <div className="h-72 mt-4">
          <ResponsiveContainer>
            <BarChart data={daily}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="rgba(245,245,240,0.5)" fontSize={11} />
              <YAxis stroke="rgba(245,245,240,0.5)" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1B1B1B", border: "1px solid rgba(184,115,51,0.3)", color: "#F5F5F0" }} />
              <Bar dataKey="orders" fill="#E85D04" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-bg2 border border-white/5 p-6">
        <p className="label-mono">Weekly Revenue</p>
        <div className="h-72 mt-4">
          <ResponsiveContainer>
            <LineChart data={daily}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="rgba(245,245,240,0.5)" fontSize={11} />
              <YAxis stroke="rgba(245,245,240,0.5)" fontSize={11} />
              <Tooltip contentStyle={{ background: "#1B1B1B", border: "1px solid rgba(184,115,51,0.3)", color: "#F5F5F0" }} />
              <Line type="monotone" dataKey="revenue" stroke="#B87333" strokeWidth={3} dot={{ fill: "#F6AA1C", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-bg2 border border-white/5 p-6 lg:col-span-2">
        <p className="label-mono">Top 5 Items</p>
        <div className="h-72 mt-4">
          <ResponsiveContainer>
            <BarChart data={top} layout="vertical">
              <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
              <XAxis type="number" stroke="rgba(245,245,240,0.5)" fontSize={11} />
              <YAxis type="category" dataKey="name" stroke="rgba(245,245,240,0.7)" fontSize={11} width={140} />
              <Tooltip contentStyle={{ background: "#1B1B1B", border: "1px solid rgba(184,115,51,0.3)", color: "#F5F5F0" }} />
              <Bar dataKey="sold" fill="#B87333" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
