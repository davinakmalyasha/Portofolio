'use client'

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; 

export default function EditProject() {
  const router = useRouter();
  const params = useParams(); 
  const id = params.id; 

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tech, setTech] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    fetch(`http://localhost:5000/projects/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data) {
                setTitle(data.title);
                setDesc(data.description);
                setTech(data.tech_stack);
                setIsLoading(false);
            }
        });
  }, [id]);

  async function handleUpdate(e) {
    e.preventDefault();

    const dataUpdate = { title, description: desc, tech_stack: tech };

    try {
        const res = await fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataUpdate)
        });

        if(res.ok) {
            alert("Berhasil diupdate!");
            router.push('/'); 
        }
    } catch (error) {
        console.log(error);
    }
  }

  if(isLoading) return <p>Sedang mengambil data lama...</p>;

  return (
    <div style={{ padding: '30px' }}>
        <h1>Edit Project (ID: {id})</h1>
        
        <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
            
            <label>Judul Project</label>
            <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: '10px' }}
            />

            <label>Deskripsi</label>
            <input 
                type="text" 
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ padding: '10px' }}
            />

            <label>Tech Stack</label>
            <input 
                type="text" 
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                style={{ padding: '10px' }}
            />

            <button type="submit" style={{ padding: '10px', background: 'orange', color: 'black', fontWeight: 'bold' }}>
                Update Data
            </button>

        </form>
    </div>
  );
}