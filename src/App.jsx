import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, ArrowRight, ExternalLink, Download, Moon, Sun, Code2, ServerCog, Rocket } from "lucide-react";

// ---------- Helpers ----------
const cn = (...cls) => cls.filter(Boolean).join(" ");

const container = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.08 * i, type: "spring", stiffness: 120, damping: 14 },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

// ---------- Data (edit freely) ----------
const PROFILE = {
  name: "Reza Yuli Santosa",
  role: "Backend Developer • React Enthusiast",
  blurb: "Fresh graduate focused on Laravel backends with a growing love for React/Next.js. I build clean APIs and sleek, responsive UIs.",
  location: "Ajibarang, Banyumas",
  email: "rezayulisantosaa@gmail.com",
  phone: "+62 838 7581 9875",
  social: {
    github: "https://github.com/rezayulisantosaa",
    linkedin: "https://www.linkedin.com/in/reza-yuli-santosa",
  },
};

const SKILLS = [
  { name: "Laravel 11", icon: <ServerCog className="h-4 w-4" /> },
  { name: "MySQL", icon: <ServerCog className="h-4 w-4" /> },
  { name: "RESTful API", icon: <Code2 className="h-4 w-4" /> },
  { name: "React", icon: <Code2 className="h-4 w-4" /> },
  { name: "Next.js", icon: <Code2 className="h-4 w-4" /> },
  { name: "Tailwind CSS", icon: <Code2 className="h-4 w-4" /> },
];

const PROJECTS = [
  {
    title: "Sistem Informasi Desa — Karangtengah",
    desc: "Website desa dengan berita, profil desa, galeri, dan surat-menyurat. Backend Laravel 11 + Tailwind. (Skripsi)",
    tags: ["Laravel 11", "Blade", "Tailwind"],
    link: "#",
    image: "/assets/home.png",
  },
  {
    title: "Kasir App — Tatorkoffie",
    desc: "Aplikasi kasir sederhana: produk, stok, transaksi, laporan. Stack: Laravel 11 + Vite + Tailwind.",
    tags: ["Laravel", "Vite", "MySQL"],
    link: "#",
    image: "/assets/tator.png",
  },
  {
    title: "Absensi Siswa Geotagging",
    desc: "Aplikasi absensi berbasis web dengan lokasi (geotagging). Pengujian ISO 25010 & UAT 87,33.",
    tags: ["Laravel", "Leaflet.js", "REST API"],
    link: "#",
    image: "/assets/absen.jpeg",
  },
];

const EXPERIENCES = [
  {
    company: "Freelance",
    role: "Backend Developer (Laravel)",
    period: "2024 – 2025",
    points: ["Build CRUD modules, authentication, and file upload.", "Design REST APIs consumed by React/Next.js frontends.", "Optimize queries and database schema for performance."],
  },
];

// ---------- UI Subcomponents ----------
const Chip = ({ children }) => <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs opacity-90 backdrop-blur border-slate-200/60 dark:border-slate-700/60">{children}</span>;

const SectionTitle = ({ icon: Icon, title, subtitle }) => (
  <div className="mb-8 flex items-end justify-between gap-4">
    <div>
      <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
        {Icon ? <Icon className="h-6 w-6" /> : null}
        {title}
      </h2>
      {subtitle ? <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p> : null}
    </div>
  </div>
);

const ProjectCard = ({ project, i }) => (
  <motion.a
    variants={scaleIn}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
    href={project.link}
    target="_blank"
    rel="noreferrer"
    className="group relative overflow-hidden rounded-2xl border bg-white/70 shadow-sm transition hover:shadow-lg dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-700/60"
  >
    <div className="aspect-[16/10] w-full overflow-hidden">
      <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
    </div>
    <div className="p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <ExternalLink className="h-4 w-4 opacity-70 group-hover:opacity-100" />
      </div>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{project.desc}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <Chip key={t}>{t}</Chip>
        ))}
      </div>
    </div>
  </motion.a>
);

const ExperienceItem = ({ item }) => (
  <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} className="rounded-2xl border p-5 bg-white/70 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-700/60">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold">
        {item.role} · {item.company}
      </h3>
      <span className="text-xs opacity-70">{item.period}</span>
    </div>
    <ul className="mt-3 list-disc pl-5 text-sm space-y-2">
      {item.points.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </ul>
  </motion.div>
);

const SkillBadge = ({ skill, i }) => (
  <motion.div
    custom={i}
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-60px" }}
    className="flex items-center gap-2 rounded-2xl border px-4 py-2 text-sm bg-white/70 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-700/60"
  >
    {skill.icon}
    <span>{skill.name}</span>
  </motion.div>
);

// ---------- Theme Hook ----------
function useDarkMode() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(mq.matches);
    const onChange = (e) => setDark(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return [dark, setDark];
}

// ---------- Main ----------
export default function Portfolio() {
  const [dark, setDark] = useDarkMode();

  const nav = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  const [active, setActive] = useState("home");
  useEffect(() => {
    const handler = () => {
      const sections = ["about", "skills", "projects", "experience", "contact"];
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120 && rect.bottom >= 120) {
          current = id;
          break;
        }
      }
      setActive(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900 dark:from-slate-950 dark:to-slate-900 dark:text-slate-100">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b bg-white/70 backdrop-blur dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            <a href="#home" className="font-semibold tracking-tight">
              Reza Yuli Santosa
            </a>
            <nav className="hidden gap-1 md:flex">
              {nav.map((n) => (
                <a key={n.id} href={`#${n.id}`} className={cn("rounded-xl px-3 py-2 text-sm transition", active === n.id ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "hover:bg-slate-100 dark:hover:bg-slate-800")}>
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <a href="#cv" onClick={(e) => e.preventDefault()} className="hidden rounded-xl border px-3 py-2 text-sm hover:shadow-sm md:inline-flex gap-2 items-center border-slate-200/60 dark:border-slate-700/60">
                <Download className="h-4 w-4" /> Download CV
              </a>
              <button onClick={() => setDark((d) => !d)} className="inline-flex h-9 w-9 items-center justify-center rounded-xl border hover:shadow-sm border-slate-200/60 dark:border-slate-700/60" aria-label="Toggle theme">
                <AnimatePresence mode="wait" initial={false}>
                  {dark ? (
                    <motion.span key="sun" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }}>
                      <Sun className="h-4 w-4" />
                    </motion.span>
                  ) : (
                    <motion.span key="moon" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }}>
                      <Moon className="h-4 w-4" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-8 py-16 md:grid-cols-2 md:py-20">
            <motion.div variants={container} initial="hidden" animate="show" className="space-y-5">
              <Chip>
                <span className="inline-flex items-center gap-2">
                  <Rocket className="h-4 w-4" /> Available for work
                </span>
              </Chip>
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl">{PROFILE.name}</h1>
              <p className="text-lg opacity-80">{PROFILE.role}</p>
              <p className="max-w-xl text-slate-600 dark:text-slate-300">{PROFILE.blurb}</p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={PROFILE.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white shadow-sm transition hover:scale-[1.02] dark:bg-white dark:text-slate-900"
                >
                  <Github className="h-4 w-4" /> GitHub
                </a>
                <a href={PROFILE.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:shadow-sm border-slate-200/60 dark:border-slate-700/60">
                  <Linkedin className="h-4 w-4" /> LinkedIn
                </a>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 transition hover:shadow-sm border-slate-200/60 dark:border-slate-700/60">
                  <Mail className="h-4 w-4" /> Contact
                </a>
              </div>
              <div className="flex items-center gap-4 pt-1 text-sm">
                <span className="inline-flex items-center gap-2 opacity-80">
                  <MapPin className="h-4 w-4" /> {PROFILE.location}
                </span>
                <span className="inline-flex items-center gap-2 opacity-80">
                  <Phone className="h-4 w-4" /> {PROFILE.phone}
                </span>
              </div>
            </motion.div>
            <motion.div className="relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="relative mx-auto aspect-square max-w-md overflow-hidden rounded-[2rem] border shadow-xl border-slate-200/60 dark:border-slate-800/60">
                <img src="/assets/foto.JPG" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle title="About" subtitle="A quick introduction" />
          <motion.div variants={fadeIn} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <div className="rounded-2xl border bg-white/70 p-6 leading-relaxed dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-700/60">
                Halo! Saya Eja — backend developer yang nyaman di Laravel 11 dan lagi intens belajar React/Next.js. Saya suka bikin API yang rapi, aman, dan enak dipakai, lalu membalutnya dengan UI yang bersih.
              </div>
            </div>
            <div className="grid gap-3 text-sm">
              <div className="rounded-2xl border bg-white/70 p-4 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-700/60">
                <div className="font-medium">Email</div>
                <a className="opacity-80 hover:opacity-100" href={`mailto:${PROFILE.email}`}>
                  {PROFILE.email}
                </a>
              </div>
              <div className="rounded-2xl border bg-white/70 p-4 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-700/60">
                <div className="font-medium">Location</div>
                <div className="opacity-80">{PROFILE.location}</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle title="Skills" subtitle="Tech I'm comfortable with" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {SKILLS.map((s, i) => (
              <SkillBadge key={s.name} skill={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle title="Projects" subtitle="Selected work & study cases" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p, i) => (
              <ProjectCard project={p} i={i} key={p.title} />
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle title="Experience" subtitle="What I've been up to" />
          <div className="grid gap-6 md:grid-cols-2">
            {EXPERIENCES.map((e, i) => (
              <ExperienceItem item={e} key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-12 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionTitle title="Contact" subtitle="Let's build something together" />
          <motion.form
            variants={fadeIn}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! This demo form doesn't send yet — hook it to Formspree or your API.");
            }}
            className="grid gap-4 rounded-2xl border bg-white/70 p-6 dark:bg-slate-900/60 md:grid-cols-2 border-slate-200/60 dark:border-slate-700/60"
          >
            <div className="grid gap-2">
              <label className="text-sm">Your name</label>
              <input className="rounded-xl border px-3 py-2 bg-white/90 dark:bg-slate-950/60 border-slate-200/60 dark:border-slate-700/60" placeholder="John Doe" required />
            </div>
            <div className="grid gap-2">
              <label className="text-sm">Email</label>
              <input type="email" className="rounded-xl border px-3 py-2 bg-white/90 dark:bg-slate-950/60 border-slate-200/60 dark:border-slate-700/60" placeholder="john@email.com" required />
            </div>
            <div className="md:col-span-2 grid gap-2">
              <label className="text-sm">Message</label>
              <textarea className="min-h-[120px] rounded-xl border px-3 py-2 bg-white/90 dark:bg-slate-950/60 border-slate-200/60 dark:border-slate-700/60" placeholder="Tell me about your project..." required />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-white shadow-sm transition hover:translate-y-[-1px] active:translate-y-[0] dark:bg-white dark:text-slate-900">
                Send message <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-10 text-center text-sm opacity-70 border-slate-200/60 dark:border-slate-800/60">
        <div className="mx-auto max-w-6xl px-4">
          © {new Date().getFullYear()} {PROFILE.name}. Built with React, Tailwind, and Framer Motion.
        </div>
      </footer>
    </div>
  );
}
