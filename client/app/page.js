'use client'

import { useEffect, useState } from "react"; 

export default function Home() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/projects')
       .then((res) => res.json())        
       .then((data) => {
         setProjects(data);             
         setIsLoading(false);                
       });
  }, []);


  return (
    <div className="container" style={{ padding: '20px' }}>
       
       <h1 style={{ textAlign: 'center' }}>Portofolio Davin</h1>
       <p style={{ textAlign: 'center', marginBottom: '30px' }}>
         Selamat datang di galeri project saya.
       </p>

       {}

       {isLoading ? <p>Loading...</p> : (
           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
               {projects.map((item) => (
                   <div key={item.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        {}
                        <h3 style={{ marginTop: 0 }}>{item.title}</h3>
                        <p style={{ color: '#555' }}>{item.description}</p>
                        <div style={{ marginTop: '10px' }}>
                            <span style={{ background: '#eee', padding: '5px 10px', borderRadius: '5px', fontSize: '12px' }}>
                                🛠 {item.tech_stack}
                            </span>
                        </div>

                        {}
                   </div>
               ))}
           </div>
       )}
    </div>
  );
}