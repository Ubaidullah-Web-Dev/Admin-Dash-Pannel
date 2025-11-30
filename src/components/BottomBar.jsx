import { useSiteData } from '../context/SiteDataContext';

export default function BottomBar() {
    const { footer } = useSiteData();
    if (!footer) return null;

    const { copyright, brand, links } = footer;

    return (
        <footer className="sticky bottom-0 z-40 w-full border-t border-zinc-800 bg-zinc-900 text-zinc-300">
            <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between text-xs">
                <nav className="flex items-center gap-4">
                    {links.map((lnk) => (
                        <a key={lnk.name} href={lnk.url} className="hover:text-green-400 transition">
                            {lnk.name}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-3 text-zinc-400">
                    <span className="text-zinc-100 font-semibold">{brand}</span>
                    <span className="text-zinc-600">•</span>
                    <span>{copyright}</span>
                </div>
            </div>
        </footer>
    );
}