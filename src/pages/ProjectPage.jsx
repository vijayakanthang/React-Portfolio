import React from "react";
import Slider from "react-slick";
import "../styles/Project.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProjectPage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
        fade: true,
        pauseOnHover: true,
        swipeToSlide: true
    };

    const projectData = [
        {
            title: "Strings (MERN)",
            description: "A social media platform for text-based communication with authentication and modern UI.",
            tech: ["MongoDB", "Express", "React", "Node.js"],
            images: [
                "/st-login.png",
                "/st-addnew.png",
                "/st-home.png",
            ],
            github: "https://github.com/vijayakanthang/Strings",
            live: "https://strings-social.vercel.app/"
        },
        {
            title: "Inventory Management System (MERN)",
            description: "Beginner-level inventory app with Chart.js graphs, MongoDB aggregation, and API seeding.",
            tech: ["MongoDB", "Express", "React", "Node.js", "Chart.js"],
            images: [
                "/inv-home.png",
                "/inv-additem.png",
                "/inv-graph.png"
            ],
            github: "https://github.com/vijayakanthang/ProductSales-Inventory",
            live: "https://product-sales-inventory.vercel.app/"
        },
        {
            title: "Expense Tracker (MERN)",
            description: "Basic expense tracker to learn React hooks like useState, useEffect, and Axios.",
            tech: ["MongoDB", "Express", "React", "Node.js"],
            images: ["/exp.png"],
            github: "https://github.com/vijayakanthang/expense-tracker",
            live: "https://expense-tracker-olive-seven.vercel.app/"
        },
        {
            title: "Task Manager",
            description: "My first project, built to learn HTML, CSS, and JavaScript basics.",
            tech: ["HTML", "CSS", "JavaScript"],
            images: [
                "/taskmanger.png"
            ],
            github: "https://github.com/vijayakanthang/Task-Manager--1",
            live: "https://vijayakanthang.github.io/Task-Manager--1/"
        },
    ];

    return (
        <section id="projects">
            <div className="projects-container">
                <h2>My <span className="highlight">Projects</span></h2>
                <div className="projects-grid">
                    {projectData.map((project, index) => (
                        <div className="project-card" key={index}>
                            <Slider {...settings}>
                                {project.images.map((img, i) => (
                                    <div key={i}>
                                        <img src={img} alt={`${project.title} ${i + 1}`} className="project-image" />
                                    </div>
                                ))}
                            </Slider>
                            <div className="project-info">
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-tech">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="tech-tag">{t}</span>
                                    ))}
                                </div>
                                <div className="project-links">
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-outline"
                                    >
                                        GitHub
                                    </a>
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btnn"
                                    >
                                        Live Demo
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
