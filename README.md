# Portfolio Website 
<p align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,react,nodejs,express,mysql,github,threejs" />
</p>

<p align="center">
  <strong>Crafting high-end digital experiences with modern web technologies.</strong>
</p>

---

## Visual Preview
A high-end, interactive portfolio website built with **Next.js 14**, **Framer Motion**, and **GSAP**. This project focuses on delivering a seamless user experience through clean code and modern web technologies.

## Visual Preview
<p align="center">
<img width="947" height="475" alt="image" src="https://github.com/user-attachments/assets/f979d319-2009-45ce-9ea7-c742183da3fb" />
<img width="1890" height="940" alt="image" src="https://github.com/user-attachments/assets/e9339d06-8370-45ce-913d-fb6d02229d6b" />
<img width="1894" height="949" alt="image" src="https://github.com/user-attachments/assets/49584693-cdd7-4c10-bd56-ddc13d5ccffc" />

</p>

## The Arsenal (Tech Stack)
- **Frontend:** Next.js (App Router), React.js, Tailwind CSS.
- **Animations:** Framer Motion (Scroll animations), GSAP (Magnetic Cursor & Transitions).
- **Backend:** Express.js (Rest API for Project Management).
- **Database:** MySQL (Storing project metadata and stats).
- **Design:** Figma (Custom assets & layout).

## Key Technical Features
- **Magnetic Target Cursor:** A custom-built cursor that "snaps" to interactive elements, enhancing the micro-interaction experience.
- **Dynamic Bento Grid:** Showcasing tech stacks using a responsive grid layout with glassmorphism effects.
- **Real-time Project Management:** Admin dashboard to manage projects (Add/Edit/Delete) with multi-image upload support.
- **Interactive Marquee:** Smooth vertical and horizontal infinite text animations using Framer Motion.
- **Optimized Performance:** Achieving high scores in Lighthouse through Next.js Image Optimization and efficient client-side rendering.

##  Project Structure
```text
client/
├── app/                  # Next.js App Router (Pages & Layouts)
│   ├── dashboard/        # Admin Panel
│   ├── css/              # Global Styling
│   └── page.js           # Main Home Page
├── components/           # Reusable UI Components
│   ├── TargetCursor.js   # GSAP Cursor Logic
│   ├── AboutStats.js     # Statistics Component
│   └── ProjectCard.js    # Interactive Project Display
└── public/               # Static Assets (Images & Icons)
