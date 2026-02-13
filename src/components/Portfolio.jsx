import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp, ArrowDown, ExternalLink, Menu, X } from 'lucide-react';

const Reveal = ({ children, className = '' }) => {
    const ref = useRef(null);
    return (
        <motion.div
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
        >
            {children}
        </motion.div>
    );
};

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState('about');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const { scrollYProgress } = useScroll();

    const navItems = ['about', 'work', 'focus', 'certifications', 'contact'];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setShowBackToTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );
        navItems.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    const scrollToSection = (section) => {
        setMobileMenuOpen(false);
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    };

    const navLabels = {
        about: 'About',
        work: 'Research & Projects',
        focus: 'Current Focus',
        certifications: 'Certifications',
        contact: 'Contact',
    };

    return (
        <div className="min-h-screen" style={{ background: 'var(--color-bg)' }}>
            <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

            {/* Navigation */}
            <nav className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
                <div className="nav-inner">
                    <span className="nav-brand">Ram Bhogesara</span>

                    <div className="nav-links">
                        {navItems.map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item)}
                                className={`nav-link ${activeSection === item ? 'nav-link--active' : ''}`}
                            >
                                {navLabels[item]}
                            </button>
                        ))}
                    </div>

                    <button
                        className="nav-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            className="nav-mobile nav-mobile--open"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ overflow: 'hidden' }}
                        >
                            {navItems.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => scrollToSection(item)}
                                    className={`nav-link ${activeSection === item ? 'nav-link--active' : ''}`}
                                >
                                    {navLabels[item]}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* ========== HERO ========== */}
            <section className="hero container">
                <Reveal>
                    <h1 className="hero-headline">
                        Studying the structure of intelligent systems —<br />
                        one problem at a time.
                    </h1>
                    <p className="hero-sub">
                        BS Data Science, IIT Madras. Applied AI systems, structured problem formulation, and research-driven product thinking.
                    </p>
                    <button className="hero-cta" onClick={() => scrollToSection('work')}>
                        Selected work <ArrowDown size={15} />
                    </button>

                    <div className="hero-links">
                        <a href="https://github.com/bhogesararam23" target="_blank" rel="noopener noreferrer" className="hero-link">GitHub</a>
                        <a href="https://www.linkedin.com/in/ram-bhogesara-207b28380/" target="_blank" rel="noopener noreferrer" className="hero-link">LinkedIn</a>
                        <a href="mailto:bhogesara.ram23@gmail.com" className="hero-link">Email</a>
                    </div>
                </Reveal>
            </section>

            <div className="section-divider" />

            {/* ========== ABOUT ========== */}
            <section id="about" className="section container">
                <Reveal>
                    <div className="section-header">
                        <p className="section-label">About</p>
                        <h2>Intellectual direction</h2>
                    </div>
                </Reveal>

                <Reveal>
                    <p className="about-text">
                        My work is guided by a single question: how do we build systems that reason well under uncertainty? I approach this through applied data science — not as a collection of techniques, but as a discipline of structured inquiry. The problems I gravitate toward sit at the boundary where raw data must be transformed into decisions that are transparent, calibrated, and useful.
                    </p>
                </Reveal>
                <Reveal>
                    <p className="about-text">
                        I am a student at IIT Madras, where the program's emphasis on mathematical foundations and rigorous methodology aligns with how I naturally approach problems. Before writing code, I map the problem space. Before building models, I interrogate the assumptions. This process — slow, deliberate, and often uncomfortable — is where the most important work happens.
                    </p>
                </Reveal>
                <Reveal>
                    <p className="about-text">
                        Outside of coursework, I build systems that test ideas in practice. The gap between theoretical understanding and applied implementation is where I learn most, and it is the space I intend to occupy long-term — as a researcher who builds, and a builder who reasons carefully.
                    </p>
                </Reveal>
            </section>

            <div className="section-divider" />

            {/* ========== RESEARCH & PROJECTS ========== */}
            <section id="work" className="section container">
                <Reveal>
                    <div className="section-header">
                        <p className="section-label">Research & Projects</p>
                        <h2>Applied work</h2>
                    </div>
                </Reveal>

                {/* Wice Weather */}
                <Reveal>
                    <div className="project">
                        <p className="project-label">Applied AI · Decision Systems</p>
                        <h3 className="project-title">Wice Weather — Weather-Informed Travel Decision Platform</h3>

                        <div className="project-section">
                            <p className="project-section-label">Problem Framing</p>
                            <p>
                                Travelers rely on weather data to make trip decisions, but existing tools present raw meteorological output — temperature, precipitation probability, humidity — without contextual interpretation. The information exists; the reasoning does not. A user seeing "35°C, 40% humidity" cannot determine whether outdoor sightseeing in a specific region is advisable without domain knowledge they typically lack.
                            </p>
                        </div>

                        <div className="project-section">
                            <p className="project-section-label">Structured Approach</p>
                            <p>
                                I reframed the problem from "display weather data" to "support a travel decision under uncertainty." This required designing a system that classifies user intent (city vs. country search), normalizes heterogeneous weather API outputs, and generates suitability assessments with explicit confidence scoring — articulating not just a recommendation, but the reasoning behind it.
                            </p>
                        </div>

                        <div className="project-section">
                            <p className="project-section-label">System-Level Reasoning</p>
                            <p>
                                The architecture enforces separation of concerns: input classification, geocoding, weather normalization, suitability analysis, and presentation operate as independent layers. This was a deliberate design choice — the suitability engine should evolve independently of data sources. The confidence scoring mechanism is designed for transparency: users see why the system recommends or discourages a trip, not a binary answer abstracted from its basis.
                            </p>
                        </div>

                        <div className="project-section">
                            <p className="project-section-label">Outcome</p>
                            <p>
                                A deployed platform that transforms weather data into travel-relevant guidance. Supports city and country-level analysis, provides real-time suitability assessments with confidence scoring, surfaces verified landmarks, and recommends alternative destinations when conditions are unfavorable.
                            </p>
                        </div>

                        <div className="project-section">
                            <p className="project-section-label">What I Learned</p>
                            <p>
                                The most difficult aspect was not implementation but problem formulation. Defining what "suitable weather for travel" means required more careful reasoning than building the system itself. This reinforced a broader principle: in applied AI, the quality of the question determines the quality of the system. Confidence calibration, I found, matters more than prediction accuracy — users trust systems that show their reasoning, not systems that claim certainty.
                            </p>
                        </div>

                        <a href="https://wice-weather-travel-buddy.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-link">
                            View deployed system <ExternalLink size={14} />
                        </a>
                    </div>
                </Reveal>

                {/* No-Code Prototype */}
                <Reveal>
                    <div className="project">
                        <p className="project-label">Product Design · Problem Structuring</p>
                        <h3 className="project-title">No-Code Product Prototype</h3>

                        <div className="project-section">
                            <p className="project-section-label">Problem Framing</p>
                            <p>
                                Translating abstract product hypotheses into testable structures — without conflating the validation of an idea with the complexity of its implementation.
                            </p>
                        </div>

                        <div className="project-section">
                            <p className="project-section-label">Structured Approach</p>
                            <p>
                                Used no-code tools to design information architectures and user flows, treating the prototype as a reasoning artifact rather than a visual deliverable. The objective was to validate decision flows: how does a user move from problem awareness to informed action?
                            </p>
                        </div>

                        <div className="project-section">
                            <p className="project-section-label">What I Learned</p>
                            <p>
                                Prototyping before building imposed a discipline I now apply to every project: design the decision flow first, then design the system. The constraint of no-code tools forced clarity — if an idea cannot be expressed simply, the problem framing likely needs more work.
                            </p>
                        </div>
                    </div>
                </Reveal>
            </section>

            <div className="section-divider" />

            {/* ========== CURRENT FOCUS & EXPLORATION ========== */}
            <section id="focus" className="section container">
                <Reveal>
                    <div className="section-header">
                        <p className="section-label">Current Focus</p>
                        <h2>Exploration & direction</h2>
                    </div>
                </Reveal>

                <Reveal>
                    <p className="research-text">
                        My present work centers on applied AI systems — specifically, how structured data can improve real-world decision-making in domains where uncertainty is inherent but often unacknowledged. The underlying question is: how do we build intelligent systems that are honest about what they know and what they don't?
                    </p>
                </Reveal>
                <Reveal>
                    <p className="research-text">
                        I am developing a foundation in statistical reasoning, system design, and applied machine learning that I expect will inform my graduate research direction. The areas I am most drawn to — decision systems, calibrated uncertainty, and human-AI interaction — share a common thread: they require building systems where the reasoning process is as important as the output.
                    </p>
                </Reveal>
                <Reveal>
                    <p className="research-text">
                        Long-term, I want to contribute to research that makes AI systems more interpretable, more reliable, and more genuinely useful — not through added complexity, but through more disciplined problem formulation.
                    </p>
                </Reveal>
            </section>

            <div className="section-divider" />

            {/* ========== CERTIFICATIONS ========== */}
            <section id="certifications" className="section container">
                <Reveal>
                    <div className="section-header">
                        <p className="section-label">Certifications</p>
                        <h2>Structured learning</h2>
                    </div>
                </Reveal>

                <Reveal>
                    <ul className="cert-list">
                        <li className="cert-item">
                            <p className="cert-name">IIT Madras BS Qualifier Examination <span className="cert-badge">Cleared</span></p>
                            <p className="cert-detail">Competitive entrance qualifier for the BS in Data Science program — the foundational step toward formal research training in applied mathematics and data science.</p>
                        </li>
                        <li className="cert-item">
                            <p className="cert-name">Google for Startups — Prompt to Prototype</p>
                            <p className="cert-detail">Structured methodology for moving from problem definition to working AI prototype. Influenced how I approach rapid validation of system-level ideas.</p>
                        </li>
                        <li className="cert-item">
                            <p className="cert-name">Business Analytics with AI <span className="cert-badge">Ongoing · BITSoM</span></p>
                            <p className="cert-detail">Developing understanding of how analytical frameworks apply to organizational decision-making — bridging the gap between data science methodology and real-world application contexts.</p>
                        </li>
                        <li className="cert-item">
                            <p className="cert-name">Web Development — HTML, CSS, JavaScript <span className="cert-badge">Vrundavan Computers</span></p>
                            <p className="cert-detail">Foundational web engineering skills that enable me to personally build and deploy the interfaces for my research projects and applied systems.</p>
                        </li>
                    </ul>
                </Reveal>
            </section>

            <div className="section-divider" />

            {/* ========== CONTACT ========== */}
            <section id="contact" className="section container">
                <Reveal>
                    <div className="section-header">
                        <p className="section-label">Contact</p>
                        <h2>Get in touch</h2>
                    </div>
                </Reveal>

                <Reveal>
                    <p className="contact-text">
                        I welcome conversations about applied AI research, intelligent systems, and structured approaches to real-world problems.
                    </p>

                    <div className="contact-links">
                        <a href="mailto:bhogesara.ram23@gmail.com" className="contact-link">
                            <Mail size={16} /> bhogesara.ram23@gmail.com
                        </a>
                        <a href="https://www.linkedin.com/in/ram-bhogesara-207b28380/" target="_blank" rel="noopener noreferrer" className="contact-link">
                            <Linkedin size={16} /> LinkedIn
                        </a>
                        <a href="https://github.com/bhogesararam23" target="_blank" rel="noopener noreferrer" className="contact-link">
                            <Github size={16} /> GitHub
                        </a>
                    </div>
                </Reveal>
            </section>

            {/* Back to Top */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="back-to-top"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        aria-label="Back to top"
                    >
                        <ArrowUp size={16} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Footer */}
            <footer className="footer container">
                <p className="footer-text">© 2026 Ram Bhogesara</p>
            </footer>
        </div>
    );
}
