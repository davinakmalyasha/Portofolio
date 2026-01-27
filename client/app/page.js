"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import TargetCursor from "../components/TargetCursor";
import "./css/index.css";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";

// --- DATA STATISTIK ---
const STATS_DATA = {
  exp: "03",
  projects: "3",
  rating: "300+", // Sudah diganti ke Commits biar lebih keren
  certs: "12",
};

// --- KOMPONEN ABOUT ---
const AboutStats = () => {
  return (
    // ID "about" sudah ada di sini, jadi aman
    <div className="aboutSection" id="about">
      <motion.div
        className="aboutBadge"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        ABOUT ME
      </motion.div>
      <motion.h2
        className="aboutHeadline"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        FULLSTACK DEVELOPER CRAFTING INTUITIVE, <br />
        USER-FRIENDLY EXPERIENCES THROUGH <br />
        CLEAN CODE & MODERN TECH.
      </motion.h2>

      <div className="aboutGrid">
        <div className="statsColumn left">
          <div className="statItem">
            <motion.h3
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {STATS_DATA.exp}
            </motion.h3>
            <p>Years of Experience</p>
          </div>
          <div className="statDivider"></div>
          <div className="statItem">
            <motion.h3
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {STATS_DATA.projects}
            </motion.h3>
            <p>Total Projects</p>
          </div>
        </div>
        <div className="portraitWrapper">
          <motion.div
            className="portraitCircle"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="/imgOrIcon/cartoon.jpeg"
              alt="Davin"
              className="portraitImg"
            />
          </motion.div>

          <motion.button
            className="downloadCvBtn"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.open("/cv-davin.pdf", "_blank")}
          >
            DOWNLOAD <br /> MY CV
            <span className="arrowDown">↓</span>
          </motion.button>
        </div>

        <div className="statsColumn right">
          <div className="statItem">
            {/* Bintang saya hapus karena diganti GitHub Commits biar lebih relate */}
            <motion.h3
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {STATS_DATA.rating}
            </motion.h3>
            <p>GitHub Commits</p>
          </div>
          <div className="statDivider"></div>
          <div className="statItem">
            <motion.h3
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {STATS_DATA.certs}
            </motion.h3>
            <p>Certificate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- KOMPONEN PROJECT CARD ---
const ProjectCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const images = item.image
    ? item.image.split(",").map((img) => img.trim())
    : [];

  useEffect(() => {
    let interval;

    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImgIndex((prev) => (prev + 1) % images.length);
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentImgIndex(0);
  };

  return (
    <div
      className="cardProject cursor-target"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="kiriProject">
        <div className="informasiProject">
          <h3 className="judul">{item.title}</h3>
          <h3 className="tech">{item.tech_stack}</h3>
          <h3 className="desc">{item.description}</h3>
          <div>
            {item.link_github && (
              <a href={item.link_github} target="_blank">
                GitHub
              </a>
            )}
            {item.link_demo && (
              <a
                href={item.link_demo}
                target="_blank"
                style={{ marginLeft: "10px" }}
              >
                🚀 Demo
              </a>
            )}
          </div>
        </div>
        <div className="gambarGoToProject">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-up-right"
          >
            <path d="M7 7h10v10" />
            <path d="M7 17 17 7" />
          </svg>
        </div>
      </div>

      <div className="bungkusKanan">
        <div className="kananProject">
          {images.length > 0 ? (
            <>
              <AnimatePresence>
                <motion.img
                  key={currentImgIndex}
                  src={`http://localhost:5000/images/${images[currentImgIndex]}`}
                  alt={item.title}
                  className="fotoProject"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                />
              </AnimatePresence>

              {isHovered && images.length > 1 && (
                <div className="slideIndicators">
                  {images.map((_, idx) => (
                    <span
                      key={idx}
                      className={`dot ${
                        idx === currentImgIndex ? "active" : ""
                      }`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <h3>No Image</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function Home() {
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const [projects, setProjects] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  // --- FUNGSI SCROLL SMOOTH ---
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 20) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -50]);
  const y4 = useTransform(scrollY, [0, 1000], [0, -150]);

  const skillRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: skillRef,
    offset: ["start end", "end start"],
  });
  const scaleImage = useTransform(scrollYProgress, [0, 0.3, 0.8], [1, 1, 0.7]);
  const radiusImage = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8],
    ["0px", "0px", "20px"]
  );
  const marginImage = useTransform(
    scrollYProgress,
    [0, 0.3, 0.8],
    ["0px", "0px", "0px"]
  );

  useEffect(() => {
    fetch("http://localhost:5000/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setisLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        alert("Selamat datang, Admin!");
        router.push("/dashboard");
      } else {
        alert("Password salah bos!");
      }
    } catch (error) {
      alert("Server error");
    }
  };

  const bentoSkills = [
    {
      title: "Frontend Wizard",
      desc: "Crafting beautiful UI",
      techs: ["React", "Next.js", "Tailwind", "Framer"],
      class: "bento-large",
      color: "#fd1d1d",
    },
    {
      title: "Backend Architect",
      desc: "Robust & Scalable logic",
      techs: ["Laravel", "Node.js", "MySQL", "Express"],
      class: "bento-tall",
      color: "white",
    },
    {
      title: "Tools & DevOps",
      desc: "My daily weapons",
      techs: ["Git", "GitHub", "Figma", "Postman"],
      class: "bento-wide",
      color: "black",
    },
  ];

  return (
    <div className="container">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
        hoverDuration={0.2}
      />

      <div className="homeContainer">
        
        {/* --- TOP BAR NAVIGATION --- */}
        <motion.div
          className="topBar"
          variants={{ visible: { y: 0 }, hidden: { y: "-120%" } }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.35, ease: "easeInOut" }}
        >
          <ul className="kiriTopBar">
            <li className="cursor-target" onClick={() => scrollToSection("home")}>
              Home
            </li>
            <li className="cursor-target" onClick={() => scrollToSection("about")}>
              About
            </li>
            <li className="cursor-target" onClick={() => scrollToSection("experience")}>
              Experience
            </li>
          </ul>

          <div
            className="logoNama cursor-target"
            onClick={() => setShowPopup(true)}
            style={{ cursor: "pointer" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-lock"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <h2>Davin</h2>
          </div>

          <ul className="kananTopBar">
            <li
              className="cursor-target"
              onClick={() => window.open("/cv-davin.pdf", "_blank")}
            >
              Resume
            </li>
            <li className="cursor-target" onClick={() => scrollToSection("projects")}>
              Project
            </li>
            <li className="cursor-target" onClick={() => scrollToSection("contact")}>
              Contact
            </li>
          </ul>
        </motion.div>

        {/* --- HERO SECTION (ID: home) --- */}
        <div className="heroSection" id="home">
          <motion.div
            className="floating-tag t1 cursor-target"
            style={{ y: y1 }}
          >
            React
          </motion.div>
          <motion.div
            className="floating-tag t2 cursor-target"
            style={{ y: y2 }}
          >
            Laravel
          </motion.div>
          <motion.div
            className="floating-tag t3 cursor-target"
            style={{ y: y3 }}
          >
            MySQL
          </motion.div>
          <motion.div
            className="floating-tag t4 cursor-target"
            style={{ y: y4 }}
          >
            Express.js
          </motion.div>
          <div className="halo">
            <h3>Hello!</h3>
            <img className="fotoKumis" src="/imgOrIcon/kumis.png" alt="" />
          </div>
          <div className="perkenalanDiri">
            <h1 className="cursor-target">
              Im <span className="spanNama">Davin</span>,
            </h1>
            <h1 className="cursor-target">FullStack Developer</h1>
          </div>
        </div>

        <div className="interactionGuide">
          <motion.div
            className="mouseIcon"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="scrollWheel"
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Scroll down &{" "}
            <span style={{ color: "#fd1d1d", fontWeight: "bold" }}>Hover</span>{" "}
            to explore
          </motion.p>
        </div>
      </div>

      {/* --- PROJECT SECTION (ID: projects) --- */}
      <div className="projectSection" id="projects">
        <div className="headerProject">
          <h4>Project</h4>
          <h2>Recent Project</h2>
        </div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className="projectAn">
            {projects.map((item) => (
              <ProjectCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      <div className="skillSection" ref={skillRef}>
        <div className="bungkusSkill">
          <div className="textBehind">
            <div className="trackMarquee kiri">
              <h1 className="textOutline">
                DAVIN AKMAL YASHA &nbsp; • &nbsp; DAVIN AKMAL YASHA &nbsp; •
                &nbsp;{" "}
              </h1>
              <h1 className="textOutline">
                DAVIN AKMAL YASHA &nbsp; • &nbsp; DAVIN AKMAL YASHA &nbsp; •
                &nbsp;{" "}
              </h1>
            </div>
            <div className="trackMarquee kanan">
              <h1 className="textSolid">
                GISKA ANINDIA &nbsp; • &nbsp; GISKA ANINDIA &nbsp; • &nbsp;{" "}
              </h1>
              <h1 className="textSolid">
                GISKA ANINDIA &nbsp; • &nbsp; GISKA ANINDIA &nbsp; • &nbsp;{" "}
              </h1>
            </div>
          </div>
          <motion.img
            className="tesSkill"
            src="/imgOrIcon/tes.png"
            alt=""
            style={{
              scale: scaleImage,
              borderRadius: radiusImage,
              marginTop: marginImage,
            }}
          />
        </div>
      </div>

      {/* --- EXPERIENCE / BENTO SECTION (ID: experience) --- */}
      <div className="bentoSection" id="experience">
        <div className="bentoHeader">
          <h2>My Arsenal</h2>
          <p>The tools I use to conquer the web.</p>
        </div>
        <div className="bentoGrid">
          {bentoSkills.map((item, index) => (
            <motion.div
              key={index}
              className={`bentoBox ${item.class}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div
                className="bentoContent cursor-target"
                style={{
                  background: `linear-gradient(135deg, white 50%, ${item.color} 100%)`,
                }}
              >
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <div className="techTags">
                  {item.techs.map((tech, i) => (
                    <span key={i} className="tagBadge">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* About Stats Component (ID: about) is handled inside */}
      <AboutStats />

      {/* --- CONTACT SECTION (ID: contact) --- */}
      <div className="contactSection" id="contact">
        <div className="ctaCard">
          <div className="ctaText">
            <h2>Start a project</h2>
            <p>
              Interested in working together? We should queue up a time to chat.
            </p>
          </div>
          <button
            className="ctaButton cursor-target"
            onClick={() => {
              const phoneNumber = "62895324350359";
              const message = encodeURIComponent(
                "Halo Davin, saya melihat portfolio Anda dan tertarik untuk berdiskusi lebih lanjut."
              );
              window.open(
                `https://wa.me/${phoneNumber}?text=${message}`,
                "_blank"
              );
            }}
          >
            Lets do this
          </button>
        </div>
        <div className="footerContent">
          <div className="footerLogo">
            <h3>Living, learning, & leveling up one day at a time.</h3>
          </div>
          <div className="socialIcons">
            <div className="iconBulat cursor-target">IG</div>
            <div className="iconBulat cursor-target">LI</div>
            <div className="iconBulat cursor-target">GH</div>
            <div className="iconBulat cursor-target">EM</div>
          </div>
          <p className="copyright">Handcrafted by me © Davin Akmal</p>
        </div>
      </div>

      {showPopup && (
        <div className="adminModalOverlay">
          <div className="adminModalContent">
            <div className="modalHeader">
              <h4>Admin Access</h4>
              <button className="closeBtn" onClick={() => setShowPopup(false)}>
                ✕
              </button>
            </div>
            <form onSubmit={handleLogin} className="adminForm">
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
              <button type="submit" className="loginBtn">
                MASUK
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}