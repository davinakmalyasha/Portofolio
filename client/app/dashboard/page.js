'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TambahProject() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [techStack, setTechStack] = useState('');
    const [linkGithub, setLinkGithub] = useState('');
    const [linkDemo, setLinkDemo] = useState('');
    const [images, setImages] = useState([]); 

    const handleLogout = () => {
        router.push('/'); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tech_stack', techStack);
        formData.append('link_github', linkGithub); 
        formData.append('link_demo', linkDemo);     

        if (!token) {
            alert("Sesi habis, silakan login lagi.");
            router.push('/');
            return;
        }

        for (let i = 0; i < images.length; i++) {
            formData.append('image', images[i]); 
        }

        try {
            const response = await fetch('http://localhost:5000/projects', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData,
            });

            if (response.ok) {
                alert("Project berhasil disimpan");
                window.location.reload(); 
            } else {
               if (response.status === 500 || response.status === 403) {
                    alert("Sesi login habis. Login ulang ya!");
                    router.push('/');
                } else {
                    alert("Gagal menyimpan project.");
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

   return (
        <div className="dashboard-container">
            
            <div className="dashboard-header">
                <h1>Dashboard Admin</h1>
                <button onClick={handleLogout} className="btn-viewer">
                    ⬅ Mode Viewer
                </button>
            </div>

            <form onSubmit={handleSubmit} className="dashboard-form">
                
                <div className="form-group">
                    <label className="form-label">Upload Gambar (Bisa Banyak):</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImages(e.target.files)}
                        className="input-file"
                    />
                    <small className="form-note">Tekan CTRL saat memilih file untuk upload lebih dari 1.</small>
                </div>

                <div className="form-group">
                    <label className="form-label">Judul Project:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input-field" required />
                </div>

                <div className="form-group">
                    <label className="form-label">Deskripsi:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="4" className="input-field" required />
                </div>

                <div className="form-group">
                    <label className="form-label">Tech Stack:</label>
                    <input type="text" value={techStack} onChange={(e) => setTechStack(e.target.value)} className="input-field" required />
                </div>

                <div className="form-row">
                    <div className="form-col">
                        <label className="form-label">Link GitHub (Opsional):</label>
                        <input type="text" value={linkGithub} onChange={(e) => setLinkGithub(e.target.value)} placeholder="https://github.com/..." className="input-field" />
                    </div>
                    <div className="form-col">
                        <label className="form-label">Link Demo (Opsional):</label>
                        <input type="text" value={linkDemo} onChange={(e) => setLinkDemo(e.target.value)} placeholder="https://vercel.app/..." className="input-field" />
                    </div>
                </div>

                <button type="submit" className="btn-save">
                    + Simpan Project
                </button>

            </form>
        </div>
    );
}