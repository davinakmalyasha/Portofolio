'use client'

import { useEffect, useState } from "react";
import '../css/index.css';
import Link from 'next/link';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setisLoading(false);
      });
  }, []);

  async function handleDelete(id) {
    if (!confirm("Yakin mau hapus project ini?")) return;

    try {
      const res = await fetch(`http://localhost:5000/projects/${id}`, {
        method: 'DELETE' 
      });

      if (res.ok) {
        setProjects(projects.filter(item => item.id !== id));
        alert("Berhasil dihapus!");
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className="container">
      {projects.map((item) => (
        <div key={item.id}>
          <p>test {item.title}</p>
          <p>test {item.description}</p>
          <p>test {item.tech_stack}</p>
          <Link href={`/edit/${item.id}`}>
        <button style={{ background: 'orange', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
            Edit
        </button>
    </Link>
          <button
            onClick={() => handleDelete(item.id)}
            style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
          >
            Hapus
          </button>
        </div>
      ))}
      <Link href="/tambah">
        <button style={{ padding: '10px', background: 'green', color: 'white', marginBottom: '20px' }}>
          + Tambah Project
        </button>
      </Link>
    </div>

  );
}


