import { useSiteData } from '../context/SiteDataContext';

const statusColor = {
    Shipping: 'bg-yellow-500',
    Delivered: 'bg-green-500',
    'New Order': 'bg-blue-500',
    'Ready to Ship': 'bg-purple-500',
};
export default function Orders() {
    const { orders } = useSiteData();
    if (!orders) return null;
    const { dateRange, summary, table } = orders;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold">Orders</h2>
                    <p className="text-zinc-400">{dateRange}</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {summary.map((s, idx) => (
                        <div key={idx} className="bg-zinc-800 rounded-lg p-3 text-center">
                            <div className="text-xs text-zinc-400">{s.label}</div>
                            <div className="text-lg font-semibold">{s.count}</div>
                            <div className="text-xs text-green-400">${s.amount}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-zinc-800 rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-zinc-900 text-zinc-400">
                        <tr>
                            {["Order ID", "Customer", "Amount", "Status", "Date", "Discount"].map((h) => (
                                <th key={h} className="px-4 py-3 text-left">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row) => (
                            <tr key={row.id} className="border-t border-zinc-700">
                                <td className="px-4 py-3 font-medium">{row.id}</td>
                                <td className="px-4 py-3">
                                    {row.customer}<span className="text-zinc-400"> ({row.country})</span>
                                </td>
                                <td className="px-4 py-3">${row.amount}.00</td>
                                <td className="px-4 py-3">
                                    <span className={`px-2 py-1 rounded text-xs text-white ${statusColor[row.status]}`}>
                                        {row.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-zinc-400">{row.date}<br />{row.time}</td>
                                <td className="px-4 py-3 text-green-400">${row.discount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}