'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'; 

export default function TambahProject() {
  const router = useRouter();
  

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [tech, setTech] = useState('');


  async function handleSubmit(e) {
    e.preventDefault(); 

   
    const dataBaru = {
        title: title,
        description: desc,
        tech_stack: tech
    };

 
    try {
        const res = await fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(dataBaru)
        });

        if(res.ok) {
            alert("Sukses nambah data!");
            router.push('/'); 
        } else {
            alert("Gagal kirim data");
        }

    } catch (error) {
        console.log(error);
    }
  }

  return (
    <div style={{ padding: '30px' }}>
        <h1>Tambah Project Baru</h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
            
            <input 
                type="text" 
                placeholder="Judul Project"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{ padding: '10px' }}
            />

            <input 
                type="text" 
                placeholder="Deskripsi Singkat"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ padding: '10px' }}
            />

            <input 
                type="text" 
                placeholder="Tech Stack (misal: Next.js, MySQL)"
                value={tech}
                onChange={(e) => setTech(e.target.value)}
                style={{ padding: '10px' }}
            />

            <button type="submit" style={{ padding: '10px', background: 'blue', color: 'white' }}>
                Simpan
            </button>

        </form>
    </div>
  );
}