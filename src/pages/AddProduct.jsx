import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteData } from '../context/SiteDataContext';
import toast from 'react-hot-toast';

export default function AddProduct() {
    const navigate = useNavigate();
    const { addProductMeta } = useSiteData();

    const [form, setForm] = useState({
        name: '',
        tagline: '',
        category: '',
        vat: '10%',
        material: '',
        length: 50,
        width: 20,
        weight: 5,
        description: '',
        images: [],
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });
    const handleDrop = (e) => {
        e.preventDefault();
        const files = [...e.dataTransfer.files].filter((f) =>
            /image\/(jpeg|png)/.test(f.type)
        );
        if (files.length + form.images.length > 4) return toast.error('Max 4 images');
        setForm((f) => ({ ...f, images: [...f.images, ...files] }));
    };
    const handleFile = (e) => {
        const files = [...e.target.files];
        if (files.length + form.images.length > 4) return toast.error('Max 4 images');
        setForm((f) => ({ ...f, images: [...f.images, ...files] }));
    };
    const removeImage = (idx) =>
        setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Product saved!');
        setTimeout(() => navigate('/products'), 800);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-8 text-zinc-100">
            <h2 className="text-3xl font-bold">Add / Edit Product</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Product Name *</label>
                        <input name="name" value={form.name} onChange={handleChange} required className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Tagline</label>
                        <input name="tagline" value={form.tagline} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">Category</label>
                            <select name="category" value={form.category} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2">
                                <option value="">Select</option>
                                {addProductMeta?.categories?.map((c) => <option key={c}>{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-400 mb-1">VAT Rate</label>
                            <select name="vat" value={form.vat} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2">
                                {addProductMeta?.vatRates?.map((v) => <option key={v}>{v}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Material</label>
                        <select name="material" value={form.material} onChange={handleChange} className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2">
                            <option value="">Select</option>
                            {addProductMeta?.materials?.map((m) => <option key={m}>{m}</option>)}
                        </select>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {['length', 'width', 'weight'].map((key) => (
                            <div key={key}>
                                <label className="block text-sm text-zinc-400 mb-1 capitalize">{key} (in)</label>
                                <select
                                    name={key}
                                    value={form[key]}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2">
                                    {addProductMeta?.[key === 'weight' ? 'weights' : key + 's']?.map((v) => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Description & SEO</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={6}
                            className="w-full bg-zinc-800 border border-zinc-700 rounded px-3 py-2"
                            placeholder="Type here..."/>
                    </div>
                    <div>
                        <label className="block text-sm text-zinc-400 mb-1">Upload product images (max 4)</label>
                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => document.getElementById('fileInput').click()}
                            className="border-2 border-dashed border-zinc-600 rounded-lg p-6 text-center cursor-pointer hover:border-green-500 transition">
                            {form.images.length ? (
                                <div className="grid grid-cols-4 gap-3">
                                    {form.images.map((img, idx) => (
                                        <div key={idx} className="relative">
                                            <img src={URL.createObjectURL(img)} alt="" className="h-20 w-full object-cover rounded" />
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 grid place-items-center text-xs">
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-zinc-400">
                                    <div className="mb-2">Drag & Drop or <span className="text-green-400">Click here</span></div>
                                    <div className="text-xs">JPEG, PNG only • max 4 images</div>
                                </div>
                            )}
                        </div>
                        <input id="fileInput" type="file" multiple accept="image/jpeg,image/png" onChange={handleFile} className="hidden" />
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