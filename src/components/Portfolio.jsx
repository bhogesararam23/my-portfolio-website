import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, useScroll, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ExternalLink, ChevronDown, Menu, X, Sparkles, Code2, Rocket, Brain, Trophy, GraduationCap, ArrowUp } from 'lucide-react';



// Mouse-triggered particle effect - particles originate behind cursor on movement (Antigravity style)
// Interactive Particle Field - Physics-based repulsion
// Mouse-triggered particle effect - particles originate behind cursor on movement (Antigravity style)
// Interactive Particle Field - Elastic Grid Physics
const InteractiveParticleField = () => {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];

        // Configuration
        const spacing = window.innerWidth < 768 ? 50 : 35; // Grid spacing (increased for performance)
        const repulsionRadius = 120; // Radius of mouse influence
        const pushForce = 5; // Strength of mouse repulsion
        const springStiffness = 0.08; // How fast they snap back (higher = faster)
        const damping = 0.90; // Friction (lower = less slide, faster settle)
        const threshold = 1.0; // Distance from origin below which particle becomes invisible

        // Colors - Subtle, premium palette
        const colors = [
            'rgba(99, 102, 241, 0.8)',   // indigo-500
            'rgba(139, 92, 246, 0.8)',   // violet-500
            'rgba(168, 85, 247, 0.8)',   // purple-500
        ];

        // Resize handler
        let resizeTimeout;
        const resizeCanvas = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                initParticles();
            }, 100);
        };

        // Mouse handlers
        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        const handleMouseLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        // Particle Class
        class Particle {
            constructor(x, y) {
                this.originX = x;
                this.originY = y;
                this.x = x;
                this.y = y;
                this.vx = 0;
                this.vy = 0;
                this.size = Math.random() * 2 + 1.5; // 1.5-3.5px
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.visible = false;
            }

            update() {
                // 1. Calculate distance from mouse
                const dxMouse = mouseRef.current.x - this.x;
                const dyMouse = mouseRef.current.y - this.y;
                const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                // 2. Repulsion (Push away from mouse)
                // Only interact if mouse is on screen
                if (mouseRef.current.x > -100 && distMouse < repulsionRadius) {
                    const angle = Math.atan2(dyMouse, dxMouse);
                    const force = (repulsionRadius - distMouse) / repulsionRadius; // 0 to 1

                    // Push harder when closer
                    const pushX = -Math.cos(angle) * force * pushForce;
                    const pushY = -Math.sin(angle) * force * pushForce;

                    this.vx += pushX;
                    this.vy += pushY;
                }

                // 3. Spring Physics (Pull back to origin)
                const dxOrigin = this.originX - this.x;
                const dyOrigin = this.originY - this.y;

                this.vx += dxOrigin * springStiffness;
                this.vy += dyOrigin * springStiffness;

                // 4. Movement & Damping
                this.x += this.vx;
                this.y += this.vy;

                this.vx *= damping;
                this.vy *= damping;

                // 5. Visibility Logic
                // Calculate displacement from origin
                const dx = this.x - this.originX;
                const dy = this.y - this.originY;
                const displacement = Math.sqrt(dx * dx + dy * dy);

                // Always visible with base opacity, brighter when moved
                const baseOpacity = 0.15;
                // Max brightness at 50px displacement
                const activation = Math.min(1, displacement / 50);
                this.opacity = baseOpacity + (1 - baseOpacity) * activation;
                this.visible = true;
            }

            draw() {
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.globalAlpha = 1.0; // Reset
            }
        }

        const initParticles = () => {
            particles = [];
            const cols = Math.floor(canvas.width / spacing);
            const rows = Math.floor(canvas.height / spacing);

            // Center the grid
            const startX = (canvas.width - cols * spacing) / 2;
            const startY = (canvas.height - rows * spacing) / 2;

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    particles.push(new Particle(
                        startX + i * spacing,
                        startY + j * spacing
                    ));
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear screen

            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        // Listeners
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        // Init
        resizeCanvas();
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="fixed inset-0 pointer-events-none z-0 block"
            style={{ opacity: 0.8 }}
        />
    );
};


// Animated gradient orbs
const GradientOrbs = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
            className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full blur-3xl"
            animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -30, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
            className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-full blur-3xl"
            animate={{
                scale: [1.2, 1, 1.2],
                x: [0, 20, 0],
                y: [0, 40, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
            className="absolute bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
            animate={{
                scale: [1, 1.3, 1],
                x: [0, -20, 0],
                y: [0, 20, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
    </div>
);

// Section wrapper with scroll animations
const AnimatedSection = ({ children, className = "", id }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.section
            id={id}
            ref={ref}
            className={className}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
            {children}
        </motion.section>
    );
};

// 3D Tilt Card Component
const AnimatedCard = ({ children, className = "", delay = 0 }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]); // Inverted for natural tilt
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200); // Amplify movement range
        y.set(yPct * 200);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            className={`${className} relative overflow-hidden transition-all duration-200 ease-out`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glare Effect */}
            <motion.div
                className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: useTransform(
                        [x, y],
                        ([latestX, latestY]) => `radial-gradient(circle at ${50 + latestX / 2}% ${50 + latestY / 2}%, rgba(255,255,255,0.15) 0%, transparent 80%)`
                    )
                }}
            />
            {children}
        </motion.div>
    );
};

// Standard Animated Card (Keep for simpler usages if needed, or replace fully)
// const AnimatedCard = TiltCard; // Replacing AnimatedCard directly with TiltCard for now

// Skill badge with animation
const SkillBadge = ({ skill, delay }) => (
    <motion.span
        className="bg-white px-4 py-2 rounded-full text-sm text-gray-700 shadow-md hover:shadow-lg transition-all cursor-default border border-gray-100"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.25, delay }}
        whileHover={{ scale: 1.05, y: -1 }}
    >
        {skill}
    </motion.span>
);

// Magnetic button effect - button follows cursor within bounds
const MagneticButton = ({ children, className = "", onClick }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set((e.clientX - centerX) * 0.15);
        y.set((e.clientY - centerY) * 0.15);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: xSpring, y: ySpring }}
            className={className}
            whileTap={{ scale: 0.95 }}
        >
            {children}
        </motion.button>
    );
};

// Text reveal animation - reveals text letter by letter
const TextReveal = ({ text, className = "" }) => {
    const words = text.split(" ");

    return (
        <span className={className}>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block mr-[0.25em]">
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={charIndex}
                            className="inline-block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.3,
                                delay: wordIndex * 0.08 + charIndex * 0.02,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </span>
    );
};

export default function Portfolio() {
    const [activeSection, setActiveSection] = useState('about');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setShowBackToTop(window.scrollY > 500);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (section) => {
        setActiveSection(section);
        setMobileMenuOpen(false);
        document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
    };

    const navItems = ['about', 'education', 'skills', 'projects', 'contact'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-white relative overflow-hidden">
            {/* Antigravity Vignette Glow */}
            <div className="antigravity-vignette" />
            <div className="noise-overlay fixed inset-0 z-0 pointer-events-none opacity-40"></div>


            <GradientOrbs />
            <InteractiveParticleField />

            {/* Scroll Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 origin-left z-[60]"
                style={{ scaleX: scrollYProgress }}
            />

            {/* Navigation - Antigravity Style */}
            <motion.nav
                className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled
                    ? 'bg-white/95 backdrop-blur-2xl shadow-lg shadow-indigo-500/5'
                    : 'bg-white/70 backdrop-blur-xl'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <motion.div
                            className="text-2xl font-bold text-gradient-animate"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Ram Bhogesara
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex space-x-1">
                            {navItems.map((section, index) => (
                                <motion.button
                                    key={section}
                                    onClick={() => scrollToSection(section)}
                                    className={`capitalize px-4 py-2 rounded-full transition-all ${activeSection === section
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg'
                                        : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                                        }`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {section}
                                </motion.button>
                            ))}
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            whileTap={{ scale: 0.9 }}
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {mobileMenuOpen && (
                            <motion.div
                                className="md:hidden pb-4 overflow-hidden"
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {navItems.map((section, index) => (
                                    <motion.button
                                        key={section}
                                        onClick={() => scrollToSection(section)}
                                        className="block w-full text-left px-4 py-3 capitalize text-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 rounded-lg transition-all"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.03 }}
                                    >
                                        {section}
                                    </motion.button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <Sparkles className="w-4 h-4 text-purple-600" />
                                <span className="text-sm font-medium text-gray-700">Welcome to my portfolio</span>
                            </motion.div>
                        </motion.div>

                        <motion.h1
                            className="text-5xl sm:text-7xl font-bold text-gray-900 mb-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            Hi, I'm{' '}
                            <span className="text-gradient-animate">Ram Bhogesara</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Research-driven Data Science student at IIT Madras, exploring the intersection of AI, systems thinking, and real-world problem solving
                        </motion.p>

                        <motion.div
                            className="flex justify-center space-x-4 mb-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            {[
                                { href: "https://www.linkedin.com/in/ram-bhogesara-5a9b57340/", icon: Linkedin, color: "text-blue-600", bg: "hover:bg-blue-50 hover:shadow-blue-200/50" },
                                { href: "https://github.com/rambhogesara", icon: Github, color: "text-indigo-600", bg: "hover:bg-indigo-50 hover:shadow-indigo-200/50" },
                                { href: "mailto:bhogesara.ram23@gmail.com", icon: Mail, color: "text-purple-600", bg: "hover:bg-purple-50 hover:shadow-purple-200/50" },
                            ].map((social, index) => (
                                <motion.a
                                    key={social.href}
                                    href={social.href}
                                    target={social.href.startsWith('mailto') ? undefined : "_blank"}
                                    rel="noopener noreferrer"
                                    className={`floating-icon shadow-lg hover:shadow-xl transition-all group ${social.bg}`}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.4 + index * 0.08, type: "spring", stiffness: 400, damping: 20 }}
                                >
                                    <social.icon className={`w-6 h-6 ${social.color} group-hover:scale-110 transition-transform`} />
                                </motion.a>
                            ))}
                        </motion.div>

                        <motion.button
                            onClick={() => scrollToSection('about')}
                            className="group"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                className="p-4 ultra-rounded bg-gradient-to-br from-indigo-100 to-purple-100 group-hover:from-indigo-200 group-hover:to-purple-200 transition-all shadow-lg"
                            >
                                <ChevronDown className="w-8 h-8 text-blue-600" />
                            </motion.div>
                        </motion.button>
                    </div>
                </div>

                {/* Decorative elements - Levitating */}
                <motion.div
                    className="absolute top-40 left-10 w-20 h-20 border-2 border-indigo-200/50 ultra-rounded levitate"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
            </section>

            {/* About Section */}
            <AnimatedSection id="about" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="flex items-center justify-center gap-3 mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Brain className="w-8 h-8 text-blue-600" />
                        <h2 className="text-4xl font-bold text-gray-900">About Me</h2>
                    </motion.div>

                    <AnimatedCard className="ultra-rounded spotlight-card bg-white p-8 shadow-xl border border-indigo-100/30 inner-glow">
                        <motion.p
                            className="text-lg text-gray-700 leading-relaxed mb-4"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            I'm a BS Data Science student at the Indian Institute of Technology Madras with a strong passion for applied research and system-level thinking. My approach combines structured reasoning with user-centric research to build meaningful tech products.
                        </motion.p>
                        <motion.p
                            className="text-lg text-gray-700 leading-relaxed"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            Currently working on Wice Weather, an applied weather-based travel assistance platform, while developing foundations for long-term research in AI-driven systems. I'm particularly interested in how abstract concepts translate into functional, real-world solutions.
                        </motion.p>
                    </AnimatedCard>
                </div>
            </AnimatedSection>

            {/* Education Section */}
            <AnimatedSection id="education" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="flex items-center justify-center gap-3 mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <GraduationCap className="w-8 h-8 text-purple-600" />
                        <h2 className="text-4xl font-bold text-gray-900">Education</h2>
                    </motion.div>

                    <AnimatedCard className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100/50">
                        <div className="flex items-start space-x-6">
                            <motion.div
                                className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg"
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                IIT
                            </motion.div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                    Indian Institute of Technology Madras
                                </h3>
                                <p className="text-lg text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-semibold mb-2">
                                    BS in Data Science and Applications
                                </p>
                                <p className="text-gray-600 mb-4">Expected: January 2029</p>
                                <motion.div
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-5 py-2.5 rounded-full text-sm font-semibold shadow-sm"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <motion.span
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        ✓
                                    </motion.span>
                                    Cleared IIT Madras BS Qualifier Examination
                                </motion.div>
                            </div>
                        </div>
                    </AnimatedCard>
                </div>
            </AnimatedSection>

            {/* Skills Section */}
            <AnimatedSection id="skills" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="flex items-center justify-center gap-3 mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Code2 className="w-8 h-8 text-blue-600" />
                        <h2 className="text-4xl font-bold text-gray-900">Skills & Expertise</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Core Research & Technical",
                                gradient: "from-blue-50 to-blue-100",
                                borderColor: "border-blue-200/50",
                                skills: ['Python', 'Statistical Reasoning', 'Problem Solving', 'Research Mindset', 'Algorithmic Thinking', 'Logical Reasoning']
                            },
                            {
                                title: "Product & System Design",
                                gradient: "from-purple-50 to-purple-100",
                                borderColor: "border-purple-200/50",
                                skills: ['No-code Prototyping', 'User Research', 'Feature Ideation', 'System Flow Design', 'Problem Discovery']
                            },
                            {
                                title: "Tools & Technologies",
                                gradient: "from-indigo-50 to-indigo-100",
                                borderColor: "border-indigo-200/50",
                                skills: ['Excel', 'Google Sheets', 'No-code Platforms', 'Documentation Tools']
                            },
                            {
                                title: "Soft Skills",
                                gradient: "from-violet-50 to-fuchsia-50",
                                borderColor: "border-violet-200/50",
                                skills: ['Deep Focus', 'Fast Learner', 'Independent Thinking', 'Critical Analysis', 'Discipline']
                            }
                        ].map((category, categoryIndex) => (
                            <AnimatedCard
                                key={category.title}
                                delay={categoryIndex * 0.08}
                                className={`ultra-rounded spotlight-card bg-white p-6 soft-shadow border ${category.borderColor}`}
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{category.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <SkillBadge
                                            key={skill}
                                            skill={skill}
                                            delay={categoryIndex * 0.08 + skillIndex * 0.03}
                                        />
                                    ))}
                                </div>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            {/* Projects Section */}
            <AnimatedSection id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="flex items-center justify-center gap-3 mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Rocket className="w-8 h-8 text-purple-600" />
                        <h2 className="text-4xl font-bold text-gray-900">Featured Projects</h2>
                    </motion.div>

                    <div className="space-y-8">
                        {/* Wice Weather Project */}
                        <AnimatedCard className="ultra-rounded-lg spotlight-card bg-white overflow-hidden shadow-xl border border-indigo-100/30">
                            <div className="md:flex">
                                <motion.div
                                    className="md:w-2/5 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 p-12 flex items-center justify-center relative overflow-hidden"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    {/* Animated background pattern */}
                                    <div className="absolute inset-0 opacity-20">
                                        <motion.div
                                            className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full"
                                            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
                                            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                        />
                                        <motion.div
                                            className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full"
                                            animate={{ x: [0, -30, 0], y: [0, -50, 0] }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        />
                                    </div>

                                    <div className="text-white text-center relative z-10">
                                        <motion.div
                                            className="text-7xl mb-4"
                                            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                        >
                                            🌤️
                                        </motion.div>
                                        <h3 className="text-2xl font-bold">Wice Weather</h3>
                                    </div>
                                </motion.div>

                                <div className="md:w-3/5 p-8">
                                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                                        <h3 className="text-2xl font-bold text-gray-900">Weather-Based Travel Assistance Platform</h3>
                                        <motion.span
                                            className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 px-4 py-1.5 rounded-full text-sm font-semibold shadow-sm"
                                            animate={{ scale: [1, 1.02, 1] }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            Ongoing
                                        </motion.span>
                                    </div>
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        A weather-centric platform designed to improve travel-related decision making by transforming raw weather data into actionable, user-relevant insights through API integration and intelligent structuring.
                                    </p>
                                    <div className="mb-6">
                                        <h4 className="font-semibold text-gray-900 mb-3">Key Focus Areas:</h4>
                                        <ul className="space-y-2">
                                            {[
                                                'Applied problem formulation & system design',
                                                'User-centric data interpretation',
                                                'Weather intelligence & user behavior analysis',
                                                'Product-research overlap exploration'
                                            ].map((item, index) => (
                                                <motion.li
                                                    key={item}
                                                    className="flex items-start gap-2 text-gray-700"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <span className="text-blue-500 mt-1">•</span>
                                                    {item}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                    <motion.a
                                        href="https://wice-weather-travel-buddy.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span>View Project</span>
                                        <ExternalLink className="w-4 h-4" />
                                    </motion.a>
                                </div>
                            </div>
                        </AnimatedCard>

                        {/* No-Code Project */}
                        <AnimatedCard delay={0.1} className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-100/50">
                            <div className="flex items-start space-x-6">
                                <motion.div
                                    className="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-400 via-pink-500 to-rose-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-lg"
                                    whileHover={{ scale: 1.1, rotate: -5 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    🎨
                                </motion.div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No-Code Website & Product Prototype</h3>
                                    <p className="text-gray-700 mb-4 leading-relaxed">
                                        Designed website layouts and interaction flows using no-code tools, focusing on clarity, usability, and logical information architecture to bridge abstract ideas with functional systems.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {['UI/UX Design', 'User Flow', 'No-Code Tools'].map((tag, index) => (
                                            <motion.span
                                                key={tag}
                                                className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-1.5 rounded-full text-sm font-medium"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: index * 0.05 }}
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {tag}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </AnimatedCard>
                    </div>
                </div>
            </AnimatedSection>

            {/* Certifications & Achievements */}
            <AnimatedSection className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        className="flex items-center justify-center gap-3 mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Trophy className="w-8 h-8 text-yellow-500" />
                        <h2 className="text-4xl font-bold text-gray-900">Certifications & Achievements</h2>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Certifications</h3>
                            <div className="space-y-4">
                                {[
                                    { name: 'Google for Startups — Prompt to Prototype', icon: '🚀' },
                                    { name: 'Web Development (HTML, CSS, JavaScript)', org: 'Vrundavan Computers', icon: '💻' },
                                    { name: 'Business Analytics with AI', org: 'BITSoM', status: 'Ongoing (ends March 2026)', icon: '📊' }
                                ].map((cert, idx) => (
                                    <AnimatedCard
                                        key={idx}
                                        delay={idx * 0.08}
                                        className="bg-gradient-to-r from-blue-50/80 to-purple-50/80 rounded-2xl p-5 shadow-md border border-white/50"
                                    >
                                        <div className="flex items-start space-x-4">
                                            <motion.span
                                                className="text-3xl"
                                                animate={{ rotate: [0, 5, -5, 0] }}
                                                transition={{ duration: 4, repeat: Infinity, delay: idx * 0.3 }}
                                            >
                                                {cert.icon}
                                            </motion.span>
                                            <div>
                                                <p className="font-semibold text-gray-900">{cert.name}</p>
                                                {cert.org && <p className="text-sm text-gray-600">{cert.org}</p>}
                                                {cert.status && <p className="text-sm text-blue-600 font-medium">{cert.status}</p>}
                                            </div>
                                        </div>
                                    </AnimatedCard>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h3>
                            <div className="space-y-4">
                                {[
                                    'Cleared IIT Madras BS Qualifier Examination',
                                    'Built long-term personal roadmap focused on research, AI, and system-level thinking',
                                    'Demonstrated consistent self-learning through independent exploration',
                                    'Strong ability in deep-dive analysis and structured concept understanding'
                                ].map((achievement, idx) => (
                                    <AnimatedCard
                                        key={idx}
                                        delay={idx * 0.08}
                                        className="flex items-start space-x-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 rounded-2xl p-5 shadow-md border border-white/50"
                                    >
                                        <motion.span
                                            className="text-green-600 font-bold text-2xl"
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: idx * 0.08, type: "spring", stiffness: 400, damping: 20 }}
                                        >
                                            ✓
                                        </motion.span>
                                        <p className="text-gray-700">{achievement}</p>
                                    </AnimatedCard>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </AnimatedSection>

            {/* Contact Section */}
            <AnimatedSection id="contact" className="py-20 px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-4xl font-bold text-gray-900 mb-8"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Let's Connect
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-600 mb-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Interested in applied AI research, intelligent systems, or collaborating on innovative projects? I'd love to hear from you!
                    </motion.p>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {[
                            { href: "mailto:bhogesara.ram23@gmail.com", icon: Mail, color: "text-purple-600", bgGlow: "group-hover:shadow-purple-200", title: "Email", info: "bhogesara.ram23@gmail.com" },
                            { href: "tel:+918128328071", icon: Phone, color: "text-indigo-600", bgGlow: "group-hover:shadow-indigo-200", title: "Phone", info: "+91 81283 28071" },
                            { href: "https://www.linkedin.com/in/ram-bhogesara-5a9b57340/", icon: Linkedin, color: "text-blue-600", bgGlow: "group-hover:shadow-blue-200", title: "LinkedIn", info: "Connect with me" }
                        ].map((contact, index) => (
                            <motion.a
                                key={contact.title}
                                href={contact.href}
                                target={contact.href.startsWith('http') ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className={`bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100/50 group ${contact.bgGlow}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                whileHover={{ scale: 1.03, y: -3 }}
                            >
                                <motion.div
                                    animate={{ y: [0, -3, 0] }}
                                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                                >
                                    <contact.icon className={`w-14 h-14 ${contact.color} mx-auto mb-4 group-hover:scale-110 transition-transform`} />
                                </motion.div>
                                <h3 className="font-bold text-gray-900 mb-2 text-lg">{contact.title}</h3>
                                <p className="text-sm text-gray-600">{contact.info}</p>
                            </motion.a>
                        ))}
                    </div>

                    <AnimatedCard className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-2xl shadow-purple-500/20 animate-gradient">
                        <h3 className="text-2xl font-bold mb-6">Areas of Interest</h3>
                        <div className="flex flex-wrap justify-center gap-3">
                            {['Applied AI Research', 'Intelligent Systems', 'Data-Driven Problem Solving', 'Product Experimentation', 'Travel-Tech', 'FinTech', 'Cricket'].map((interest, index) => (
                                <motion.span
                                    key={interest}
                                    className="bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium border border-white/30"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.03 }}
                                    whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.25)" }}
                                >
                                    {interest}
                                </motion.span>
                            ))}
                        </div>
                    </AnimatedCard>
                </div>
            </AnimatedSection>

            {/* Back to Top Button */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl z-50 group"
                        initial={{ opacity: 0, scale: 0, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0, y: 20 }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Footer */}
            <motion.footer
                className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-10 px-4 relative overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    }}
                />
                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.p
                        className="text-gray-400"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        © 2026 Ram Bhogesara. Built with passion for research and innovation.
                    </motion.p>
                </div>
            </motion.footer>
        </div>
    );
}
