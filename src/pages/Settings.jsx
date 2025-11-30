import { useSiteData } from '../context/SiteDataContext';

export default function Settings() {
    const { settings } = useSiteData();
    if (!settings) return null;
    const { sections } = settings;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            {sections.map((section) => (
                <div key={section.title} className="bg-zinc-800 rounded-lg p-4">
                    <h3 className="mb-4 font-semibold">{section.title}</h3>
                    <div className="space-y-4">
                        {section.fields.map((field) => (
                            <div key={field.label}>
                                <label className="block text-sm text-zinc-400 mb-1">{field.label}</label>
                                {field.type === 'checkbox' ? (
                                    <input type="checkbox" defaultChecked={field.value} className="rounded" />
                                ) : field.type === 'select' ? (
                                    <select defaultValue={field.value} className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2">
                                        <option>USD</option><option>EUR</option><option>GBP</option>
                                    </select>
                                ) : (
                                    <input type={field.type} defaultValue={field.value} className="w-full bg-zinc-700 border border-zinc-600 rounded px-3 py-2" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}