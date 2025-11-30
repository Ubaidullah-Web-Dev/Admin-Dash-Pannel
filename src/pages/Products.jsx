import { Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import * as Ico from 'react-icons/fi';

const colorMap = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
};

export default function Products() {
    const { products } = useSiteData();
    if (!products) return null;
    const { stats, list } = products;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h2 className="text-2xl font-bold">Products</h2>
                <Link to="/products/add">
                    <button className="rounded bg-green-500 px-4 py-2 text-white font-medium hover:bg-green-600">
                        Add Product
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((p) => (
                    <div key={p.id} className="bg-zinc-800 rounded-lg p-4 flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm text-zinc-400">ID: {p.id}</span>
                            <span className="text-green-400 font-semibold">${p.price}</span>
                        </div>
                        <h3 className="font-semibold mb-2">{p.name}</h3>
                        <div className="text-sm text-zinc-400 mb-4">Stock: {p.stock} | Sales: {p.sales}</div>
                        <div className="mt-auto text-right text-green-400 font-bold">${p.revenue.toLocaleString()}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}