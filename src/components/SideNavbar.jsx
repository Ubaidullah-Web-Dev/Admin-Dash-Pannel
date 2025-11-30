import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import * as Ico from 'react-icons/fi';

export default function SideNavbar() {
    const [collapsed, setCollapsed] = useState(false);
    const { sideNav } = useSiteData();
    if (!sideNav) return null;
    const { brand, plan, daysLeft, upgradeUrl, main, other } = sideNav;
    const NavItem = ({ item }) => {
        const Icon = Ico[item.icon] || Ico.FiCircle;
        return (
            <NavLink
                to={item.url}
                className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ` +
                    (isActive
                        ? `bg-green-500 text-white`
                        : `hover:bg-zinc-700 text-zinc-300`)
                }>
                <Icon className="text-xl" />
                {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
            </NavLink>
        );
    };

    return (
        <aside
            className={`h-screen bg-zinc-900 text-zinc-300 flex flex-col border-r border-zinc-800 ${collapsed ? 'w-20' : 'w-64'
                } transition-all duration-300`}>
            <div className="flex items-center justify-between p-4">
                {!collapsed && <h1 className="text-xl font-bold text-white">{brand}</h1>}
                <button onClick={() => setCollapsed((c) => !c)} className="grid h-8 w-8 place-items-center rounded hover:bg-zinc-700">
                    {collapsed ? <Ico.FiChevronRight /> : <Ico.FiChevronLeft />}
                </button>
            </div>
            <nav className="flex-1 px-3 space-y-2 overflow-y-auto">
                {!collapsed && <h2 className="px-3 mb-2 text-xs uppercase tracking-wider text-zinc-500">Main</h2>}
                {main.map((i) => (
                    <NavItem key={i.name} item={i} />))}
                {!collapsed && <h2 className="px-3 mt-6 mb-2 text-xs uppercase tracking-wider text-zinc-500">Other</h2>}
                {other.map((i) => (
                    <NavItem key={i.name} item={i} />
                ))}
            </nav>
            {!collapsed && (
                <div className="bg-zinc-800 rounded-lg p-3 m-3 text-center text-xs">
                    <div className="text-white font-semibold mb-1">{plan}</div>
                    <div className="text-zinc-400 mb-2">{daysLeft} days left</div>
                    <a
                        href={upgradeUrl}
                        className="inline-block w-full rounded bg-green-500 py-2 text-white font-medium hover:bg-green-400 transition-colors">
                        Upgrade
                    </a>
                </div>
            )}
        </aside>
    );
}