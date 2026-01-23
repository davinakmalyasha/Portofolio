'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
    const [projects, setProjects] = useState([]);
    const [isLoading, setisLoading] = useState(true);


    const [showPopup, setShowPopup] = useState(false); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


    useEffect(() => {
        fetch('http://localhost:5000/projects')
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setisLoading(false);
            });
    }, []);


    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const res = await fetch('http://localhost:5000/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
          });

          const data = await res.json();
          
          if (res.ok) {
            localStorage.setItem('token', data.token);
              alert("Selamat datang, Admin!");
              router.push('/dashboard'); 
          } else {
              alert("Password salah bos!");
          }
      } catch (error) {
          console.error(error);
          alert("Server error");
      }
  };


   return (
    <div className="container">
       
       <h1>Portofolio Davin</h1>
       <p>
         Selamat datang di galeri project saya.
       </p>
       
       {}
       {isLoading ? <p>Loading...</p> : (
           <div>
               {projects.map((item) => (
                   <div key={item.id}>
                        
                        {}
                        {item.image ? (
                           <div>
            {item.image.split(',').map((imgName, index) => (
                <img 
                    key={index}
                    src={`http://localhost:5000/images/${imgName.trim()}`} 
                    alt={item.title} 
                    className="card-image"
                />
            ))}
        </div>
                        ) : (
                            <div>No Image</div>
                        )}

                        <h3>{item.title}</h3>
                        <p></p>
                        <span>
                            🛠 {item.tech_stack}
                        </span>
                        {}
        <div>
            {item.link_github && (
                <a href={item.link_github} target="_blank">
                    📂 GitHub
                </a>
            )}
            {item.link_demo && (
                <a href={item.link_demo} target="_blank">
                    🚀 Demo
                </a>
            )}
        </div>
        {}
                   </div>
               ))}
           </div>
       )}

       {}
       
       {}
       {!showPopup && (
           <button 
                onClick={() => setShowPopup(true)}
                title="Login Admin"
           >
            sini admin
           </button>
       )}

       {}
       {showPopup && (
           <div>
               <div>
                   <h4>Admin</h4>
                   <button onClick={() => setShowPopup(false)}>Tutup</button>
               </div>

               <form onSubmit={handleLogin}>
                   <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                   />
                   <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                   />
                   <button type="submit">
                       MASUK
                   </button>
               </form>
           </div>
       )}
       {}

    </div>
  );
}