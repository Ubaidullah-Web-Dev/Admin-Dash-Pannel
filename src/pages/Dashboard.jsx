import { useSiteData } from '../context/SiteDataContext';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import * as Ico from 'react-icons/fi';

const colorMap = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500',
};

export default function Dashboard() {
    const { dashboard } = useSiteData();
    if (!dashboard) return null;
    const { welcome, user, totalEarned, stats, chartData, topProducts } = dashboard;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-green-500">{welcome} {user}</h2>
                    <p className="text-zinc-400">Here is what’s happening today.</p>
                </div>
                <div className="bg-zinc-800 rounded-lg px-4 py-2">
                    <div className="text-xs text-zinc-400">Total Earned</div>
                    <div className="text-xl font-semibold">${totalEarned.toLocaleString()}</div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, idx) => {
                    const Icon = Ico[s.icon];
                    return (
                        <div key={idx} className="bg-zinc-800 rounded-lg p-4 flex items-center justify-between">
                            <div>
                                <div className="text-sm text-zinc-400">{s.label}</div>
                                <div className="text-xl font-bold">{s.value}</div>
                            </div>
                            <div className={`p-3 rounded-full ${colorMap[s.color]}`}>
                                <Icon className="text-white text-xl" />
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="bg-zinc-800 rounded-lg p-4">
                <h3 className="mb-4 font-semibold">Revenue Overview</h3>
                <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={chartData}>
                        <XAxis dataKey="name" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none' }} />
                        <Line type="monotone" dataKey="pv" stroke="#10b981" strokeWidth={2} dot={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div className="bg-zinc-800 rounded-lg p-4">
                <h3 className="mb-4 font-semibold">Top Products</h3>
                <div className="space-y-3">
                    {topProducts.map((p, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                            <span>{p.name}</span>
                            <span className="text-green-400">+{p.growth}%</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}