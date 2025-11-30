import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import * as Ico from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopBar() {
    const { topBarMeta } = useSiteData();
    if (!topBarMeta) return null;
    const { searchPlaceholder, notifications, userMenu } = topBarMeta;
    const [searchOpen, setSearchOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [userOpen, setUserOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const unreadCount = notifications.filter((n) => n.unread).length;
    const crumb = useLocation().pathname.split('/').filter(Boolean).join(' > ') || 'Dashboard';
    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Search:', searchQuery);
        setSearchOpen(false);
        setSearchQuery('');
    };

    return (
        <>
            <header className="h-16 border-b border-zinc-800 bg-zinc-900 text-zinc-100 flex items-center justify-between px-6">

                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold capitalize text-zinc-300">{crumb}</h1>
                    <span className="text-sm text-zinc-500">19/05/2025 - 25/06/2025</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative w-80">
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="w-full flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 hover:bg-zinc-700 transition text-left cursor-pointer">
                            <Ico.FiSearch className="text-zinc-400" />
                            <span className="text-sm text-zinc-400">{searchPlaceholder}</span>
                        </button>
                        <AnimatePresence>
                            {searchOpen && (
                                <motion.aside
                                    initial={{ x: '100%' }}
                                    animate={{ x: 0 }}
                                    exit={{ x: '100%' }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                    className="fixed right-0 top-16 h-screen w-96 bg-zinc-800 border-l border-zinc-700 shadow-2xl z-50 flex flex-col">
                                    <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
                                        <span className="font-semibold">Search</span>
                                        <button onClick={() => setSearchOpen(false)} className="px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600 text-sm">
                                            Cancel Search
                                        </button>
                                    </div>
                                    <form onSubmit={handleSearch} className="p-4">
                                        <div className="relative">
                                            <input
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder={searchPlaceholder}
                                                autoFocus
                                                className="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2 pr-10 text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-green-400 transition">
                                                <Ico.FiSearch className="text-lg" />
                                            </button>
                                        </div>
                                    </form>
                                    <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
                                        <div className="text-sm text-zinc-400 mb-3">Results in Products (3)</div>
                                        {['Bracelet Woman Platinum', 'Sofa single coco color', 'Shine Nails Hiclon'].map((p, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 rounded hover:bg-zinc-700 cursor-pointer mb-2">
                                                <div>
                                                    <div className="text-sm text-zinc-100">{p}</div>
                                                    <div className="text-xs text-zinc-400">★ 4.8 (15 reviews) • $65.00</div>
                                                </div>
                                                <span className="text-xs text-green-400">10% OFF</span>
                                            </div>
                                        ))}
                                        <button className="w-full text-center text-sm text-green-400 hover:underline mt-3">View All</button>
                                    </div>
                                </motion.aside>
                            )}
                        </AnimatePresence>
                    </div>
                    <button onClick={() => setNotifOpen((o) => !o)} className="p-2 rounded bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700 relative">
                        <Ico.FiBell className="text-zinc-400" />
                        {unreadCount > 0 && (
                            <span className="absolute -top-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-xs font-bold">
                                {unreadCount}
                            </span>
                        )}
                    </button>
                    <button onClick={() => setUserOpen((o) => !o)} className="flex items-center gap-2 px-3 py-2 rounded bg-zinc-800 hover:bg-zinc-700 transition border border-zinc-700">
                        <div className="h-8 w-8 rounded-full bg-linear-to-br from-green-400 to-cyan-500 grid place-items-center text-white font-bold text-xs">U</div>
                        <div className="hidden md:block text-left">
                            <div className="text-sm font-semibold text-zinc-100">Ubaid</div>
                            <div className="text-xs text-zinc-400">Store Owner</div>
                        </div>
                        <Ico.FiChevronDown className={`text-zinc-400 transition-transform ${userOpen ? 'rotate-180' : ''}`} />
                    </button>
                </div>
            </header>
            <AnimatePresence>
                {searchOpen && (
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-16 h-screen w-96 bg-zinc-800 border-l border-zinc-700 shadow-2xl z-50 flex flex-col">
                        <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
                            <span className="font-semibold">Search</span>
                            <button onClick={() => setSearchOpen(false)} className="px-3 py-1 rounded bg-zinc-700 hover:bg-zinc-600 text-sm">
                                Cancel Search
                            </button>
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); console.log('Search:', searchQuery); setSearchOpen(false); }} className="p-4">
                            <div className="relative">
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder={searchPlaceholder}
                                    autoFocus
                                    className="w-full bg-zinc-900 border border-zinc-600 rounded-lg px-4 py-2 pr-10 text-sm text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-green-500"/>
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-green-400 transition">
                                    <Ico.FiSearch className="text-lg" />
                                </button>
                            </div>
                        </form>
                        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
                            <div className="text-sm text-zinc-400 mb-3">Results in Products (3)</div>
                            {['Bracelet Woman Platinum', 'Sofa single coco color', 'Shine Nails Hiclon'].map((p, idx) => (
                                <div key={idx} className="flex items-center justify-between p-3 rounded hover:bg-zinc-700 cursor-pointer mb-2">
                                    <div>
                                        <div className="text-sm text-zinc-100">{p}</div>
                                        <div className="text-xs text-zinc-400">★ 4.8 (15 reviews) • $65.00</div>
                                    </div>
                                    <span className="text-xs text-green-400">10% OFF</span>
                                </div>
                            ))}
                            <button className="w-full text-center text-sm text-green-400 hover:underline mt-3">View All</button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {notifOpen && (
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-16 h-screen w-96 bg-zinc-800 border-l border-zinc-700 shadow-2xl z-50 flex flex-col">
                        <div className="p-4 border-b border-zinc-700 flex items-center justify-between">
                            <span className="font-semibold">Notifications</span>
                            {unreadCount > 0 && <span className="text-xs text-green-400">{unreadCount} new</span>}
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
                            {notifications.map((n) => (
                                <div key={n.id} className={`p-3 rounded mb-2 ${n.unread ? 'bg-green-500/5' : ''}`}>
                                    <div className="flex items-start justify-between">
                                        <div className="text-sm text-zinc-100">{n.title}</div>
                                        <span className="text-xs text-zinc-400">{n.time}</span>
                                    </div>
                                    {n.body && <div className="text-xs text-zinc-400 mt-1">{n.body}</div>}
                                </div>
                            ))}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {userOpen && (
                    <motion.aside
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed right-0 top-16 h-screen w-80 bg-zinc-800 border-l border-zinc-700 shadow-2xl z-50 flex flex-col">
                        <div className="p-4 border-b border-zinc-700">
                            <div className="text-sm text-zinc-400">Available Balance</div>
                            <div className="text-2xl font-bold text-green-400">{userMenu.currency}{userMenu.balance}</div>
                            <div className="text-xs text-zinc-400">Ready</div>
                        </div>
                        <nav className="p-2">
                            {userMenu.shortcuts.map((s) => {
                                const Icon = Ico[s.icon] || Ico.FiCircle;
                                return (
                                    <Link key={s.name} to={s.url} onClick={() => setUserOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-700 transition">
                                        <Icon className="text-lg text-zinc-400" />
                                        <span>{s.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                        <div className="border-t border-zinc-700 p-2">
                            <div className="px-3 py-1 text-xs text-zinc-400">Language</div>
                            {userMenu.languages.map((l) => (
                                <button key={l} onClick={() => setUserOpen(false)} className="w-full text-left px-3 py-1 rounded hover:bg-zinc-700 text-sm">
                                    {l}
                                </button>))}
                            <button onClick={() => { setUserOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-700 text-sm text-red-400 mt-2">
                                <Ico.FiLogOut />
                                <span>Logout</span>
                            </button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}