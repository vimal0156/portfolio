import Link from "next/link"
import { ArrowRight, Github, GraduationCap, Linkedin, Mail, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProjectCard } from "@/components/project-card"
import { SkillBadge } from "@/components/skill-badge"
import { Timeline } from "@/components/timeline"
import { ContactForm } from "@/components/contact-form"
import { CreativeHero } from "@/components/creative-hero"
import { FloatingNav } from "@/components/floating-nav"
import { MouseFollower } from "@/components/mouse-follower"
import { ScrollProgress } from "@/components/scroll-progress"
import { SectionHeading } from "@/components/section-heading"
import { GlassmorphicCard } from "@/components/glassmorphic-card"
import { GrindSection } from "@/components/grind-section"
import { KnowledgeBrain } from "@/components/knowledge-brain"
import { Marquee } from "@/components/magicui/marquee"
import { ECGProjectCard } from "@/components/ECGProjectCard"
import { LearnNavbar } from "@/components/learn-navbar"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-black text-white overflow-hidden">
      <MouseFollower />
      <ScrollProgress />
      <FloatingNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 sm:pt-24">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-phthalo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container relative z-10 px-4 sm:px-6">
          {/* Mobile Layout */}
          <div className="lg:hidden flex flex-col items-center text-center space-y-8">
            {/* 1. Name first */}
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              <span className="block">Hi, I'm</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
                Vimal Dhama
              </span>
            </h1>
            
            {/* 2. Profile image */}
            <div className="flex justify-center">
              <CreativeHero />
            </div>
            
            {/* 3. Software engineer badge */}
            <div className="flex justify-center">
              <div className="relative px-3 py-1 text-xs font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <span className="relative z-10">Quantitative Analyst | AI/ML Engineer | Data Scientist</span>
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-phthalo-500/20 to-phthalo-700/20 animate-pulse"></span>
              </div>
            </div>

            {/* 4. Description */}
            <p className="text-lg text-zinc-400 max-w-[600px]">
              I blend advanced mathematics, artificial intelligence, machine learning, and full-stack engineering to turn complex ideas into real-world tools.
            </p>
            
            {/* 5. Buttons */}
            <div className="flex flex-wrap gap-4 pt-4 justify-center">
              <Link href="#projects">
                <Button className="relative overflow-hidden group bg-gradient-to-r from-phthalo-600 to-phthalo-800 border-0">
                  <span className="relative z-10 flex items-center">
                    View Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-phthalo-700 to-phthalo-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 bg-transparent"
                >
                  Contact Me
                </Button>
              </Link>
            </div>
            
            {/* 6. Social icons */}
            <div className="flex gap-4 justify-center">
              <Link href="https://github.com/vimal0156" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/in/vimaldhama" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Button>
              </Link>
              <Link href="mailto:vimaldhama0@gmail.com">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <div className="inline-block">
                <div className="relative px-3 py-1 text-sm font-medium rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-4">
                  <span className="relative z-10">Quantitative Analyst | AI/ML Engineer | Data Scientist</span>
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-phthalo-500/20 to-phthalo-700/20 animate-pulse"></span>
                </div>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="block">Hi, I'm</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
                  Vimal Dhama
                </span>
              </h1>
              <p className="text-xl text-zinc-400 max-w-[600px]">
                I blend advanced mathematics, artificial intelligence, machine learning, and full-stack engineering to turn complex ideas into real-world tools.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="#projects">
                  <Button className="relative overflow-hidden group bg-gradient-to-r from-phthalo-600 to-phthalo-800 border-0">
                    <span className="relative z-10 flex items-center">
                      View Projects <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-phthalo-700 to-phthalo-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </Button>
                </Link>
                <Link href="#contact">
                  <Button
                    variant="outline"
                    className="border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 bg-transparent"
                  >
                    Contact Me
                  </Button>
                </Link>
              </div>
              <div className="flex gap-4 pt-4">
                <Link href="https://github.com/vimal0156" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/vimaldhama" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
                <Link href="mailto:vimaldhama0@gmail.com">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
                  >
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <CreativeHero />
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-white/60 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="About Me" subtitle="My background and journey" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <div className="relative">
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-phthalo-500/20 to-phthalo-700/20 blur-xl opacity-70"></div>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-zinc-800">
                <img
                  src="/image.jpg"
                  alt="Vimal Dhama"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-sm font-medium">Available for work</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <GlassmorphicCard>
                <p className="text-lg text-zinc-300">
                  I'm a BTech graduate in Artificial Intelligence & Machine Learning with proven expertise as a Quantitative Analyst, Data Scientist, and AI/ML Engineer. My work lives at the intersection of quantitative finance, advanced analytics, and intelligent automation: I build algorithmic trading platforms, predictive models, and AI-driven solutions that deliver measurable impact.
                </p>
                <p className="text-lg text-zinc-300 mt-4">
                  I specialize in applying rigorous quantitative methods—portfolio optimization, Monte Carlo simulations, options pricing, and risk modeling—combined with cutting-edge AI/ML frameworks (TensorFlow, PyTorch, Scikit-learn) to solve complex problems in finance and technology. My work consistently improves forecasting accuracy, optimizes portfolios, and empowers data-driven decision-making.
                </p>
                <p className="text-lg text-zinc-300 mt-4">
                  Today, I work primarily with Python, R, SQL, and modern web technologies. My focus spans algorithmic trading, time-series forecasting, deep learning applications, and real-time data analytics. Whether in quantitative finance or AI engineering, my goal is the same: to engineer solutions that are both mathematically sound and practically impactful.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Name</div>
                    <div className="font-medium">Vimal Dhama</div>
                  </div>

                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Email</div>
                    <div className="font-medium break-all">vimaldhama0@gmail.com</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Location</div>
                    <div className="font-medium">New Delhi, India</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-zinc-500">Availability</div>
                    <div className="font-medium text-green-500">Open to opportunities</div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href="/VIMALRESUME.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md"
                  >
                    View Resume
                  </a>

                </div>
              </GlassmorphicCard>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="My Skills" subtitle="Technologies I work with" />

          {/* Desktop: Two horizontal rows */}
          <div className="hidden md:block mt-16">
            <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
              <Marquee pauseOnHover className="[--duration:20s]">
                <SkillBadge name="Python" level={100} />
                <SkillBadge name="R" level={95} />
                <SkillBadge name="SQL" level={100} />
                <SkillBadge name="Tableau" level={95} />
                <SkillBadge name="TensorFlow" level={90} />
                <SkillBadge name="PyTorch" level={90} />
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:20s]">
                <SkillBadge name="Scikit-learn" level={95} />
                <SkillBadge name="Excel/VBA" level={90} />
                <SkillBadge name="Power BI" level={85} />
                <SkillBadge name="Next.js" level={85} />
                <SkillBadge name="TypeScript" level={80} />
                <SkillBadge name="Git" level={90} />
                <SkillBadge name="Docker" level={75} />
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-zinc-900"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-zinc-900"></div>
            </div>
          </div>

          {/* Mobile: Two vertical columns */}
          <div className="md:hidden mt-16">
            <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden">
              <Marquee pauseOnHover vertical className="[--duration:20s]">
                <SkillBadge name="Python" level={100} />
                <SkillBadge name="R" level={95} />
                <SkillBadge name="SQL" level={100} />
                <SkillBadge name="Tableau" level={95} />
                <SkillBadge name="TensorFlow" level={90} />
                <SkillBadge name="PyTorch" level={90} />
              </Marquee>
              <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
                <SkillBadge name="Scikit-learn" level={95} />
                <SkillBadge name="Excel/VBA" level={90} />
                <SkillBadge name="Power BI" level={85} />
                <SkillBadge name="Next.js" level={85} />
                <SkillBadge name="TypeScript" level={80} />
                <SkillBadge name="Git" level={90} />
              </Marquee>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-zinc-900"></div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-zinc-900"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Featured Projects" subtitle="Some of my recent work" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            <ECGProjectCard
              title="ECG Arrhythmia Detector"
              description="A real-time ECG monitoring application that streams live cardiac data and performs intelligent arrhythmia detection using advanced signal processing algorithms. Tracks PVC burden, detects patterns like bigeminy and trigeminy, and supports session-based analysis with planned alarm functionality for high-risk events."
              tags={["Next.js", "TypeScript", "Expo", "Python", "IOS Development"]}
              image="/p4.png?height=400&width=600"
              repoUrl="https://github.com/vimal0156/ECG-Arrhythmia-Detection-IOS-app"
            />


            <ProjectCard
              title="Cardinality-Constrained Portfolio Selection"
              description="A research-style project that solves the mean-variance portfolio optimization problem with a cardinality constraint using integer programming. This model captures the real-world need to limit the number of assets in a portfolio, introducing combinatorial complexity and paving the way for quantum-inspired methods."
              tags={["Jupyter", "Python", "NumPy", "CVXPY"]}
              image="/portfolio.png"
              repoUrl="https://github.com/vimal0156/Cardinality-Constrained-Portfolio-Selection"
            />
            <ProjectCard
              title="SOLUSDT signal bot"
              description="A custom algorithmic trading system for Solana using custom signals, enhanced with BTCUSDT price context for confirmation. The strategy includes dynamic stop-loss, ATR-based take-profit, slippage modeling, and realistic funding/fee handling. Backtested on 5-minute candles with live simulation support. It has been deployed live and generated consistent profit in high freq trading environments."
              tags={["Python", "Pandas", "Matplotlib", "Backtesting", "Crypto", "Quant"]}
              image="/trade.png"
            />
            <ProjectCard
              title="BlockFinAI"
              description="BlockFinAI is an advanced application designed for detecting patterns in stock and cryptocurrency charts using deep learning techniques. Inspired by the YOLO Object Recognition Algorithm research, this project implements YOLOv8 and integrates it into a user-friendly Streamlit app. BlockFinAI automates chart pattern recognition to empower traders and analysts."
              tags={["Python", "YOLOv8", "Streamlit", "Deep Learning", "Computer Vision"]}
              image="/BlockFinAI.png"
              repoUrl="https://github.com/vimal0156/BlockFinAI"
            />

            <ProjectCard
              title="Ruaroa AI"
              description="Ruaroa AI is your personal ML wizard that conjures complete machine learning pipelines from simple natural language descriptions. Just describe what you want, upload your data, and watch the magic happen! Using advanced AI reasoning and iterative experimentation, it crafts production-ready solutions that would typically require weeks of expert development."
              tags={["Python", "Streamlit", "OpenAI", "Machine Learning", "NLP"]}
              image="/Ruaroa AI.png"
              repoUrl="https://github.com/vimal0156/Ruaroa-AI"
            />

            <ProjectCard
              title="AlgoStockGPT AI"
              description="AlgoStockGPT AI is a cutting-edge financial intelligence platform that leverages the power of artificial intelligence to provide comprehensive stock analysis, real-time market insights, and algorithmic trading strategies. Your personal AI financial analyst, providing institutional-grade stock analysis and market intelligence through a seamless, conversational interface."
              tags={["Next.js", "OpenAI", "GPT-4", "Financial Analysis", "AI"]}
              image="/AlgoStockGPT AI.png"
              repoUrl="https://github.com/vimal0156/AlgoStockGPT-AI"
            />

            <ProjectCard
              title="QuantumTrade Nexus"
              description="Advanced Trading Intelligence Platform - Comprehensive financial analysis toolkit with 15+ technical indicators, algorithmic strategies, and real-time market intelligence. Features include market scanner, custom signals, advanced trading tools, and trading strategies with backtesting capabilities. Supports multiple data sources including Yahoo Finance and online APIs."
              tags={["Python", "Streamlit", "Pandas", "TA-Lib", "Algorithmic Trading", "Technical Analysis"]}
              image="/QuantumTrade-Nexus.png"
              repoUrl="https://github.com/vimal0156/QuantumTrade-Nexus"
            />

          </div>
        </div>
      </section>

      {/* Grind Section */}
      <section className="py-32 relative" id="grind">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <GrindSection />
        </div>
      </section>

      {/* Knowledge Brain Section */}
      {/* <section className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <KnowledgeBrain />
        </div>
      </section> */}

      {/* Experience Section */}
      <section id="experience" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Work Experience" subtitle="My professional journey" />

          <div className="mt-16">
            <Timeline />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Get In Touch" subtitle="Let's work together" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
            <GlassmorphicCard>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-phthalo-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">Email</div>
                    <div className="font-medium">vimaldhama0@gmail.com</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Linkedin className="h-5 w-5 text-phthalo-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">LinkedIn</div>
                    <div className="font-medium">www.linkedin.com/in/vimaldhama</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Github className="h-5 w-5 text-phthalo-400" />
                  </div>
                  <div>
                    <div className="text-sm text-zinc-500">GitHub</div>
                    <div className="font-medium">github.com/vimal0156</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-zinc-800">
                <h4 className="text-lg font-medium mb-4">Current Status </h4>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"> </div>
                  <span>Open to opportunities in Quantitative Finance, Data Science, and AI/ML Engineering!</span>
                </div>
              </div>
            </GlassmorphicCard>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Learn CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-phthalo-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-phthalo-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
        </div>

        <div className="container relative z-10">
          <SectionHeading title="Learn With Me" subtitle="Quant Finance & Applied Math" />

          <div className="max-w-3xl mx-auto mt-16">
            <GlassmorphicCard>
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-phthalo-500 to-phthalo-700 flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold">Want to Learn Quant Finance & Math?</h3>
                
                <p className="text-lg text-zinc-300">
                  I'm building courses and mentorship programs on quantitative finance, algorithmic trading, and applied mathematics. Join the waitlist to get notified when they launch.
                </p>

                <div className="pt-4">
                  <Link href="/learn">
                    <Button className="relative overflow-hidden group bg-gradient-to-r from-phthalo-600 to-phthalo-800 border-0 text-lg px-8 py-3">
                      <span className="relative z-10 flex items-center">
                        Take the Quiz
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="absolute inset-0 bg-gradient-to-r from-phthalo-700 to-phthalo-900 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <Link href="/" className="font-bold text-xl">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-phthalo-400 to-phthalo-600">
                Vimal
              </span>
              <span className="text-white">Dev</span>
            </Link>
            <p className="text-sm text-zinc-500 mt-2">
              © {new Date().getFullYear()} Vimal Dhama. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="https://github.com/vimal0156" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/vimaldhama" target="_blank" rel="noopener noreferrer">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="mailto:vimaldhama0@gmail.com">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-zinc-800/50 hover:bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Button>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}