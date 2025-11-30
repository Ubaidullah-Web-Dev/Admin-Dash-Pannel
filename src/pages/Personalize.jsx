import { useEffect, useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline';

export default function Personalize() {
    const { personalize } = useSiteData();
    if (!personalize) return null;
    const { themes, colors } = personalize;

    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
    const [accent, setAccent] = useState(() => localStorage.getItem('accent') || '#10b981');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.documentElement.classList.toggle('dark', theme === 'dark');
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('accent', accent);
        document.documentElement.style.setProperty('--accent', accent);
    }, [accent]);

    const themeIcons = { light: SunIcon, dark: MoonIcon, auto: ComputerDesktopIcon };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Personalize</h2>
            <div className="bg-zinc-800 rounded-lg p-4">
                <h3 className="mb-4 font-semibold">Theme</h3>
                <div className="flex gap-3">
                    {themes.map((t) => {
                        const Icon = themeIcons[t.value];
                        const active = theme === t.value;
                        return (
                            <button
                                key={t.value}
                                onClick={() => setTheme(t.value)}
                                className={`flex items-center gap-2 px-4 py-2 rounded border
                    ${active ? 'border-green-500 bg-green-500/10 text-green-400' : 'border-zinc-600 hover:bg-zinc-700'}`}
                            >
                                <Icon className="h-5 w-5" />
                                {t.name}
                            </button>
                        );
                    })}
                </div>
            </div>
            <div className="bg-zinc-800 rounded-lg p-4">
                <h3 className="mb-4 font-semibold">Accent Color</h3>
                <div className="flex gap-3">
                    {colors.map((c) => {
                        const active = accent === c.value;
                        return (
                            <button
                                key={c.value}
                                onClick={() => setAccent(c.value)}
                                className={`w-12 h-12 rounded-full border-2
                            ${active ? 'border-white scale-110' : 'border-zinc-600 hover:scale-105'}`}
                                style={{ backgroundColor: c.value }}
                                title={c.name}
                            />
                        );
                    })}
                </div>
            </div>
            <div className="bg-zinc-800 rounded-lg p-4">
                <h3 className="mb-2 font-semibold">Preview</h3>
                <div className="flex items-center gap-3">
                    <span className="text-zinc-400">Active colour:</span>
                    <span className="px-3 py-1 rounded text-sm font-medium" style={{ backgroundColor: accent, color: '#18181b' }}>
                        {accent}
                    </span>
                </div>
            </div>
        </div>
    );
}