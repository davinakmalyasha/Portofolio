"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; 
import '../css/dashboard.css'; 

export default function TambahProject() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [techStack, setTechStack] = useState('');
    const [linkGithub, setLinkGithub] = useState('');
    const [linkDemo, setLinkDemo] = useState('');
    const [images, setImages] = useState([]);
    
    const [previewUrls, setPreviewUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/'); 
    };

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        Array.from(images).forEach(image => newImageUrls.push(URL.createObjectURL(image)));
        setPreviewUrls(newImageUrls);
    }, [images]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
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
                alert("Project berhasil disimpan!");
                window.location.reload(); 
            } else {
               if (response.status === 500 || response.status === 403) {
                    alert("⚠️ Sesi login habis. Login ulang ya!");
                    handleLogout();
                } else {
                    alert("Gagal menyimpan project.");
                }
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server Error");
        } finally {
            setIsLoading(false); 
        }
    };

   return (
        <div className="dashboard-container">
            
            <motion.div 
                className="dashboard-header"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1>Admin Panel</h1>
                <button onClick={handleLogout} className="btn-viewer">
                    Log Out 
                </button>
            </motion.div>

            <motion.form 
                onSubmit={handleSubmit} 
                className="dashboard-form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <h3 style={{marginBottom: '20px', borderBottom:'1px solid #333', paddingBottom:'10px'}}>Add New Project</h3>
                
                <div className="form-group">
                    <label className="form-label">Upload Images (Cover First)</label>
                    <div className="file-upload-wrapper">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={(e) => setImages(e.target.files)}
                            className="input-file"
                        />
                        <small className="file-note">Supports JPG, PNG. Hold CTRL to select multiple.</small>
                    </div>
        
                    {previewUrls.length > 0 && (
                        <div className="image-preview-container">
                            {previewUrls.map((src, index) => (
                                <img key={index} src={src} alt="preview" className="preview-img" />
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-group">
                    <label className="form-label">Project Title</label>
                    <input 
                        type="text" 
                        placeholder="e.g. 4C Construction App"
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="input-field" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Tech Stack</label>
                    <input 
                        type="text" 
                        placeholder="e.g. Laravel, React, MySQL"
                        value={techStack} 
                        onChange={(e) => setTechStack(e.target.value)} 
                        className="input-field" 
                        required 
                    />
                </div>

                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        rows="4" 
                        placeholder="Explain the problem and your solution..."
                        className="input-field" 
                        required 
                    />
                </div>

                <div className="form-row">
                    <div className="form-col">
                        <label className="form-label">GitHub URL</label>
                        <input 
                            type="url" 
                            value={linkGithub} 
                            onChange={(e) => setLinkGithub(e.target.value)} 
                            placeholder="https://github.com/..." 
                            className="input-field" 
                        />
                    </div>
                    <div className="form-col">
                        <label className="form-label">Live Demo URL</label>
                        <input 
                            type="url" 
                            value={linkDemo} 
                            onChange={(e) => setLinkDemo(e.target.value)} 
                            placeholder="https://..." 
                            className="input-field" 
                        />
                    </div>
                </div>

                <button type="submit" className="btn-save" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Publish Project"}
                </button>

            </motion.form>
        </div>
    );
}