'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./css/index.css";

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
      <div className="homeContainer">
        <div className="topBar">
          <ul className="kiriTopBar">
            <li>Home</li>
            <li>About</li>
            <li>Experience</li>
          </ul>

          <div className="logoNama">
            <img className="fotoTopBarNama" src="/imgOrIcon/kumis.png" alt="" />
            <h2>Davin</h2>
          </div>

          <ul className="kananTopBar">
            <li>Resume</li>
            <li>Project</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="heroSection">
          <div className="halo">
            <h3>Hello!</h3>
            <img className="fotoKumis" src="/imgOrIcon/kumis.png" alt="" />
          </div>

          <div className="perkenalanDiri">
            <h1>Im <span className="spanNama">Davin</span>,</h1>
            <h1>FullStack Developer</h1>
          </div>
        </div>
      </div>

      <div className="projectSection">
        <div className="headerProject">
          <h4>Project</h4>
          <h2>Recent Project</h2>
        </div>
        {isLoading ? <p>Loading...</p> : (

          <div className="projectAn">
            {projects.map((item) => (
              <div className="cardProject" key={item.id}>
                <div className="kiriProject">
                  <div className="informasiProject">
                    <h3 className="judul" >{item.title}</h3>
                    <h3 className="tech">{item.tech_stack}</h3>
                    <h3 className="desc">{item.description}</h3>
                    <div>
                      {item.link_github && (
                        <a href={item.link_github} target="_blank">
                          GitHub
                        </a>
                      )}
                      {item.link_demo && (
                        <a href={item.link_demo} target="_blank">
                          🚀 Demo
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="gambarGoToProject">
                    <img className="panahProject" src="/imgOrIcon/panah.png" alt="" />
                  </div>
                </div>
                <hr />
                <div className="bungkusKanan">
                  {item.image ? (
                    <div className="kananProject">
                      <img
                        className="fotoProject"
                        src={`http://localhost:5000/images/${item.image.split(',')[0].trim()}`}
                        alt={item.title}
                      />
                    </div>
                  ) : (
                    <h3>No Image</h3>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="skillSection">
        
      </div>
      <div className="startProjectSection">

      </div>
      <div className="contactSection">

      </div>
      {!showPopup && (
        <button
          onClick={() => setShowPopup(true)}
          title="Login Admin"
        >
          sini admin
        </button>
      )}

      { }
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
      { }

    </div>
  );
}













