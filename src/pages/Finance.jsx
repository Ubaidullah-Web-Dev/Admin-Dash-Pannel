import { useSiteData } from '../context/SiteDataContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import * as Ico from 'react-icons/fi';

const colorMap = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
};

export default function Finance() {
    const { finance } = useSiteData();
    if (!finance) return null;
    const { summary, chartData } = finance;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Finance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {summary.map((s, idx) => {
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
                <h3 className="mb-4 font-semibold">Revenue vs Profit</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis dataKey="month" stroke="#9ca3af" />
                        <YAxis stroke="#9ca3af" />
                        <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none' }} />
                        <Bar dataKey="revenue" fill="#10b981" />
                        <Bar dataKey="profit" fill="#3b82f6" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}