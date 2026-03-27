import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, ArrowRight, Github, Linkedin, Mail, Code2, Database, Cpu } from 'lucide-react';

// --- DATA ---
const PORTFOLIO_DATA = {
  projects: [
    {
      id: "01",
      title: "Face Emotion Recognition",
      desc: "Deep learning model comparing 6 CNN architectures (including ConvNeXt & LAKAN). Optimized on the FER-2013 dataset using Constraint-based Tree Optimization.",
      stack: ["Python", "TensorFlow", "Pandas", "CNN"],
    },
    {
      id: "02",
      title: "Lung Cancer Detection",
      desc: "Medical imaging classification system built to identify malignancies in early stages using advanced deep learning techniques.",
      stack: ["Python", "PyTorch", "Computer Vision"],
    },
    {
      id: "03",
      title: "Automated Soil Moisture System",
      desc: "Hardware integration utilizing an Arduino Uno R3, servos, and custom circuitry for automated environmental monitoring and response.",
      stack: ["C++", "Arduino", "IoT", "Sensors"],
    },
    {
      id: "04",
      title: "Retail Sales Forecasting",
      desc: "End-to-end forecasting pipeline trained on ~1M+ records. Engineered 15+ temporal features achieving a 9.8% RMSPE on holdout data.",
      stack: ["XGBoost", "MySQL", "Scikit-Learn"],
    }
  ],
  skills: [
    { category: "Languages", items: ["Python", "Java", "C++", "SQL"] },
    { category: "ML & Data", items: ["PyTorch", "TensorFlow", "Pandas", "Computer Vision"] },
    { category: "Hardware & Core", items: ["Arduino", "Circuit Design", "Load Flow Analysis"] },
    { category: "Dev Tools", items: ["Git", "Jupyter", "VS Code", "Mac OS"] }
  ]
};

// --- COMPONENTS ---

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (cursorRef.current) cursorRef.current.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    };
    
    const animRing = () => {
      rx += (mx - rx - 18) * 0.12;
      ry += (my - ry - 18) * 0.12;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`;
      requestAnimationFrame(animRing);
    };
    
    window.addEventListener('mousemove', onMouseMove);
    animRing();
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-3 h-3 bg-[#00d4ff] rounded-full pointer-events-none z-[9999] mix-blend-screen transition-transform duration-100 ease-out"></div>
      <div ref={ringRef} className="fixed top-0 left-0 w-9 h-9 border border-[#00d4ff]/40 rounded-full pointer-events-none z-[9998] transition-transform duration-200 ease-out"></div>
    </>
  );
};

const NetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let W, H;
    const nodes = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < 55; i++) {
      nodes.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .35, vy: (Math.random() - .5) * .35, r: Math.random() * 1.5 + .5 });
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 140) * 0.18})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,212,255,0.35)';
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };
    draw();

    return () => window.removeEventListener('resize', resize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50"></canvas>;
};

// --- MAIN APP ---

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#060810] min-h-screen text-[#e8eaf0] font-sans overflow-x-hidden selection:bg-[#00d4ff] selection:text-[#060810] cursor-none">
      <CustomCursor />
      <NetworkBackground />

      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-300 backdrop-blur-md bg-[#060810]/70 border-b border-[#00d4ff]/10 ${scrolled ? 'py-4 px-8 md:px-16' : 'py-6 px-8 md:px-16'}`}>
        <a href="#hero" className="font-bold text-xl tracking-tighter text-white font-sans">
          KM<span className="text-[#00d4ff]">.</span>
        </a>
        <ul className="hidden md:flex gap-8 font-mono text-xs uppercase tracking-widest text-[#6b7a99]">
          <li><a href="#about" className="hover:text-[#00d4ff] transition-colors relative group">About<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00d4ff] transition-all group-hover:w-full"></span></a></li>
          <li><a href="#skills" className="hover:text-[#00d4ff] transition-colors relative group">Skills<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00d4ff] transition-all group-hover:w-full"></span></a></li>
          <li><a href="#projects" className="hover:text-[#00d4ff] transition-colors relative group">Projects<span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00d4ff] transition-all group-hover:w-full"></span></a></li>
        </ul>
      </nav>

      <section id="hero" className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-16 pt-32 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="flex items-center gap-3 text-[#00d4ff] font-mono text-xs tracking-widest uppercase mb-7">
          <Terminal size={16} /> <span>Available for Internships & Research</span>
        </motion.div>
        
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }} className="text-5xl md:text-[7.5rem] font-extrabold tracking-tighter leading-[0.9] mb-9 max-w-4xl">
          Kshitij<br />
          <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(0,212,255,0.5)' }}>Mishra</span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }} className="text-[#6b7a99] text-lg max-w-xl font-light leading-relaxed mb-12">
          Electrical & Electronics Engineer bridging the gap between hardware and software. Specializing in machine learning, deep neural networks, and developing scalable algorithms.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }} className="flex flex-wrap gap-4">
          <a href="#projects" className="bg-[#00d4ff] text-[#060810] font-mono text-xs uppercase tracking-widest px-8 py-4 font-semibold hover:bg-white transition-colors relative overflow-hidden group">
            <span className="relative z-10">View Projects</span>
            <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
          </a>
          <a href="#contact" className="border border-[#00d4ff]/20 text-[#6b7a99] font-mono text-xs uppercase tracking-widest px-8 py-4 hover:border-[#00d4ff] hover:text-[#00d4ff] transition-colors">
            Get in Touch
          </a>
        </motion.div>
      </section>

      <section id="about" className="relative z-10 py-32 px-8 md:px-16 border-t border-[#00d4ff]/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative aspect-square max-w-[420px] w-full">
            <div className="w-full h-full rounded bg-[#131925] border border-[#00d4ff]/10 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00d4ff]/10 to-transparent"></div>
              <span className="text-8xl font-extrabold text-[#00d4ff]/20 tracking-tighter">KM</span>
            </div>
            <div className="absolute -top-5 -left-5 bg-[#0d1117] border border-[#00d4ff]/20 rounded p-4 backdrop-blur-sm">
              <div className="font-mono text-[0.65rem] text-[#00d4ff] uppercase tracking-widest mb-1">Institute</div>
              <div className="font-bold text-lg leading-tight">NIT<br/>Nagaland</div>
            </div>
            <div className="absolute -bottom-5 -right-5 bg-[#0d1117] border border-[#00d4ff]/20 rounded p-4 backdrop-blur-sm min-w-[120px]">
              <div className="font-mono text-[0.65rem] text-[#00d4ff] uppercase tracking-widest mb-1">CGPA</div>
              <div className="font-bold text-2xl text-white">9.55</div>
              <div className="h-[3px] bg-[#00d4ff]/20 mt-2 rounded-full overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: '95.5%' }} transition={{ duration: 1.5, delay: 0.5 }} viewport={{ once: true }} className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]"></motion.div>
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 font-mono text-xs text-[#00d4ff] uppercase tracking-widest mb-4">
              <span className="w-5 h-[1px] bg-[#00d4ff]"></span> About Me
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">Building the Future with Data & Code</h2>
            <p className="text-[#6b7a99] leading-relaxed mb-4">I'm an Electrical & Electronics Engineering B.Tech student at NIT Nagaland, maintaining a 9.55 CGPA while actively developing complex ML models and hardware systems. My technical foundation spans both rigorous algorithm design and practical circuit engineering.</p>
            <p className="text-[#6b7a99] leading-relaxed mb-8">Whether I am mastering Data Structures and Algorithms in Java, optimizing computer vision models for lung cancer detection, or wiring Arduino environmental sensors, I focus on turning theoretical concepts into deployable realities.</p>
            
            <div className="grid grid-cols-2 gap-4">
               {['B.Tech EEE', 'Open to Work', 'ML & CV Focus', 'NIT Nagaland'].map((item, i) => (
                 <div key={i} className="p-4 bg-[#0d1117] border border-[#00d4ff]/10 rounded hover:border-[#00d4ff] transition-colors flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-[#00d4ff]"></div>
                   <span className="font-bold text-sm">{item}</span>
                 </div>
               ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section id="skills" className="relative z-10 py-32 px-8 md:px-16 border-t border-[#00d4ff]/10 bg-[#0d1117]">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 font-mono text-xs text-[#00d4ff] uppercase tracking-widest mb-4">
              <span className="w-5 h-[1px] bg-[#00d4ff]"></span> Technical Stack
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Tools & Technologies</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[2px]">
            {PORTFOLIO_DATA.skills.map((category, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-[#060810] p-8 border border-transparent hover:border-[#00d4ff]/20 transition-colors relative group">
                <div className="absolute top-0 left-0 w-[3px] h-0 bg-[#00d4ff] transition-all duration-300 group-hover:h-full"></div>
                <h3 className="font-bold mb-6 flex items-center gap-2">
                  {idx === 0 && <Code2 size={18} className="text-[#00d4ff]" />}
                  {idx === 1 && <Database size={18} className="text-[#00d4ff]" />}
                  {idx === 2 && <Cpu size={18} className="text-[#00d4ff]" />}
                  {idx === 3 && <Terminal size={18} className="text-[#00d4ff]" />}
                  {category.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, i) => (
                    <span key={i} className="bg-[#00d4ff]/10 border border-[#00d4ff]/20 text-[#00d4ff] font-mono text-xs py-1.5 px-3 rounded-sm">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-10 py-32 px-8 md:px-16 border-t border-[#00d4ff]/10">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <div className="flex items-center gap-3 font-mono text-xs text-[#00d4ff] uppercase tracking-widest mb-4">
              <span className="w-5 h-[1px] bg-[#00d4ff]"></span> Work
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Selected Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-[2px]">
            {PORTFOLIO_DATA.projects.map((project, idx) => (
              <motion.div key={project.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-[#0d1117] p-10 border border-transparent hover:border-[#00d4ff]/20 hover:bg-[#131925] transition-all relative group cursor-pointer">
                <ArrowRight className="absolute top-8 right-8 text-[#6b7a99] group-hover:text-[#00d4ff] group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                <div className="font-mono text-xs text-[#6b7a99] tracking-widest mb-6">PROJECT — {project.id}</div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-[#00d4ff] transition-colors">{project.title}</h3>
                <p className="text-[#6b7a99] text-sm leading-relaxed mb-8">{project.desc}</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.stack.map((tech, i) => (
                    <span key={i} className="font-mono text-[0.65rem] text-[#6b7a99] border border-[#00d4ff]/10 py-1 px-2">{tech}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer id="contact" className="relative z-10 py-20 px-8 md:px-16 border-t border-[#00d4ff]/10 bg-[#060810]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Ready to collaborate?</h2>
            <p className="text-[#6b7a99] font-mono text-sm">Currently open for internships & research roles.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="p-3 border border-[#00d4ff]/20 text-[#6b7a99] hover:text-[#00d4ff] hover:border-[#00d4ff] transition-colors rounded"><Mail size={20} /></a>
            <a href="#" className="p-3 border border-[#00d4ff]/20 text-[#6b7a99] hover:text-[#00d4ff] hover:border-[#00d4ff] transition-colors rounded"><Github size={20} /></a>
            <a href="#" className="p-3 border border-[#00d4ff]/20 text-[#6b7a99] hover:text-[#00d4ff] hover:border-[#00d4ff] transition-colors rounded"><Linkedin size={20} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
