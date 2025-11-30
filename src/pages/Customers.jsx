import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import * as Ico from 'react-icons/fi';

const colorMap = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    yellow: 'bg-yellow-500',
};

export default function Customers() {
    const { customers } = useSiteData();
    if (!customers) return null;
    const { stats, list } = customers;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold">Customers</h2>
                <Link to="/customers/add">
                    <button className="rounded bg-green-500 px-4 py-2 text-white font-medium hover:bg-green-600">
                        Add Customer
                    </button>
                </Link>
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
            <div className="bg-zinc-800 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-zinc-900 text-zinc-400">
                        <tr>
                            {["Name", "Country", "Orders", "Spent", "Status"].map((h) => (
                                <th key={h} className="px-4 py-3 text-left">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((c) => (
                            <tr key={c.id} className="border-t border-zinc-700">
                                <td className="px-4 py-3 font-medium">{c.name}</td>
                                <td className="px-4 py-3 text-zinc-400">{c.country}</td>
                                <td className="px-4 py-3">{c.orders}</td>
                                <td className="px-4 py-3 text-green-400">${c.spent}</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded text-xs ${c.status === 'Active' ? 'bg-green-500 text-white' : 'bg-zinc-600 text-zinc-200'}`}>
                                        {c.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}