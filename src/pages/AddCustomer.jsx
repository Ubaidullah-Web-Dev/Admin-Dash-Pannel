import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import toast from 'react-hot-toast';

export default function AddCustomer() {
    const navigate = useNavigate();
    const { addCustomerMeta } = useSiteData();

    const [form, setForm] = useState({
        title: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        country: '',
        dateOfBirth: '',
        creditCard: '',
        iban: '',
        about: '',
        visibility: 'Public',
        status: 'Active',
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });
    const handleCard = (e) => {
        const raw = e.target.value.replace(/\s+/g, '');
        const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
        setForm({ ...form, creditCard: formatted });
    };
    const handleIban = (e) => {
        const raw = e.target.value.replace(/\s+/g, '');
        const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
        setForm({ ...form, iban: formatted });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Customer saved!');
        setTimeout(() => navigate('/customers'), 800);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 text-zinc-100">
            <h2 className="text-3xl font-bold">Add / Edit Customer</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-3">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Title</label>
                            <select name="title" value={form.title} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2">
                                <option value="">Select</option>
                                {addCustomerMeta?.titles?.map((t) => <option key={t}>{t}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">First Name *</label>
                            <input name="firstName" value={form.firstName} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Last Name *</label>
                            <input name="lastName" value={form.lastName} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Email *</label>
                            <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2" />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Phone</label>
                            <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Country</label>
                            <select name="country" value={form.country} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2">
                                <option value="">Select</option>
                                {addCustomerMeta?.countries?.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Date of Birth</label>
                            <input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Credit Card</label>
                        <input
                            name="creditCard"
                            value={form.creditCard}
                            onChange={handleCard}
                            placeholder="0000 0000 0000 0000"
                            maxLength={19}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 font-mono tracking-widest"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">IBAN</label>
                        <input
                            name="iban"
                            value={form.iban}
                            onChange={handleIban}
                            placeholder="ABCD 0000 0000 0000 0000"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2 font-mono tracking-widest"
                        />
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">About me</label>
                        <textarea
                            name="about"
                            value={form.about}
                            onChange={handleChange}
                            rows={5}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2"
                            placeholder="Type here..."
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Status</label>
                            <select name="status" value={form.status} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2">
                                {addCustomerMeta?.statuses?.map((s) => <option key={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Visibility</label>
                            <select name="visibility" value={form.visibility} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2">
                                {addCustomerMeta?.visibility?.map((v) => <option key={v}>{v}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 rounded bg-zinc-700 text-zinc-100 hover:bg-zinc-600">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 rounded bg-green-500 text-white hover:bg-green-600">
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );
}