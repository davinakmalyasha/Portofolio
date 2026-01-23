'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TambahProject() {
    const router = useRouter();


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
   const [techStack, setTechStack] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('tech_stack', techStack);

        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await fetch('http://localhost:5000/projects', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setTitle('');
                setDescription('');
                setTechStack('');
                setImage(null);

                alert("Project berhasil disimpan!");
                window.location.reload();
            } else {
                alert("Gagal menyimpan project.");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };



    return (
        <div>
            <h1>Tambah Project Baru</h1>

            <form onSubmit={handleSubmit}>
                { }
                <div>
                    <label>Upload Gambar:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>
                { }

                <input
                    type="text"
                    placeholder="Judul Project"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Deskripsi Singkat"
                    value={description}
                    onChange={(e) =>  setDescription(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Tech Stack (misal: Next.js, MySQL)"
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                />

                <button type="submit">
                    Simpan
                </button>

            </form>
        </div>
    );
}