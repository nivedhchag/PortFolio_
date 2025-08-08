'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ChevronDown, Mail, Github, Linkedin, ExternalLink, Palette, Figma, Smartphone, Monitor, Users, Lightbulb, LightbulbOff, Search, Layout, Code, CheckCircle, XCircle } from 'lucide-react'

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Refs for project visibility
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const [projectVisibility, setProjectVisibility] = useState<boolean[]>(
    Array(2).fill(false) // Initialize with false for 2 projects
  )

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    
    // Trigger paper crush animation after component mounts
    setTimeout(() => setIsLoaded(true), 100)

    // Intersection Observer for project entry animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = parseInt(entry.target.getAttribute('data-index') || '0')
          if (entry.isIntersecting) {
            setProjectVisibility((prev) => {
              const newVisibility = [...prev]
              newVisibility[index] = true
              return newVisibility
            })
            // No longer unobserve to allow re-animation if scrolled away and back
            // observer.unobserve(entry.target) 
          } else {
            // Optional: reset visibility if scrolled out of view to re-trigger on scroll back
            setProjectVisibility((prev) => {
              const newVisibility = [...prev]
              newVisibility[index] = false
              return newVisibility
            })
          }
        })
      },
      { threshold: 0.1 } // Trigger when 10% of the item is visible
    )

    projectRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.setAttribute('data-index', index.toString())
        observer.observe(ref)
      }
    })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      projectRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  const skills = [
    { name: 'UI Design', icon: Palette, level: 85, description: 'Creating beautiful, intuitive interfaces' },
    { name: 'UX Research', icon: Users, level: 80, description: 'User-centered design methodology' },
    { name: 'Figma', icon: Figma, level: 90, description: 'Advanced prototyping & design systems' },
    { name: 'Responsive Design', icon: Monitor, level: 95, description: 'Mobile-first design approach' },
    { name: 'React Development', icon: Smartphone, level: 85, description: 'Bringing designs to life' },
    { name: 'Design Systems', icon: Lightbulb, level: 75, description: 'Scalable design frameworks' }
  ]

  const projects = [
    {
      title: 'Neev Next - Digital Agency Redesign',
      description: 'A comprehensive UI/UX overhaul for a digital marketing agency, focusing on modern aesthetics, intuitive user journeys, and conversion optimization.',
      link: 'https://neevnext.netlify.app/#/home',
      category: 'Web Design & Branding',
      year: '2024',
      problem: 'The existing Neev Next website lacked a modern aesthetic, clear user flow, and effective conversion points. It struggled to convey the agency\'s innovative services and expertise.',
      solution: 'Designed a sleek, user-centric website with a refreshed brand identity. Implemented intuitive navigation, engaging content presentation, and clear calls-to-action to guide users through services and contact points.',
      processSteps: [
        {
          title: 'Discovery & Research',
          description: 'Conducted stakeholder interviews, competitive analysis, and user surveys to understand business goals and user needs. Defined target audience and key pain points.',
          image: '/images/neevnext-research.png' // Generated image
        },
        {
          title: 'Information Architecture & Wireframing',
          description: 'Developed sitemaps and user flows to define content hierarchy. Created low-fidelity wireframes to establish layout and functionality, ensuring a logical user journey.',
          image: '/images/neevnext-wireframes.png' // Generated image
        },
        {
          title: 'UI Design & Prototyping (Figma)',
          description: 'Translated wireframes into high-fidelity mockups, focusing on a clean, modern aesthetic with vibrant branding. Built interactive prototypes in Figma to simulate user experience and gather early feedback.',
          image: '/images/neevnext-digital-marketing-section.png', // Actual image
          note: 'Figma animations were crucial for demonstrating micro-interactions and page transitions.'
        },
        {
          title: 'Usability Testing & Iteration',
          description: 'Conducted usability tests with target users to identify pain points and areas for improvement. Iterated on designs based on feedback, refining the UI and UX for optimal performance.',
          image: '/images/neevnext-usability-testing.png' // Generated image
        },
        {
          title: 'Development Handoff & QA',
          description: 'Prepared detailed design specifications and asset libraries for developers. Collaborated closely during implementation to ensure pixel-perfect execution and conducted thorough QA.',
          image: '/images/neevnext-contact-footer.png' // Generated image
        }
      ],
      tools: ['Figma', 'Miro', 'UserTesting.com', 'Adobe Photoshop', 'React', 'Next.js', 'Tailwind CSS'],
      results: [
        { icon: CheckCircle, text: 'Increased user engagement by 30% through improved navigation.' },
        { icon: CheckCircle, text: 'Modernized brand image, attracting new clients.' },
        { icon: CheckCircle, text: 'Streamlined service discovery, leading to higher conversion rates.' }
      ],
      image: '/images/neevnext-hero-skills.png',
    },
    {
      title: 'FlinG - Cinematic Movie Experience',
      description: 'An intuitive movie booking and streaming platform designed to provide an immersive cinematic experience with a focus on visual storytelling and seamless user interaction.',
      link: 'https://nivedhchag.github.io/Movie-Website/',
      category: 'Web Application Design',
      year: '2024',
      problem: 'Existing movie platforms often feel cluttered or lack a truly immersive visual experience. The challenge was to create a platform that prioritizes cinematic aesthetics while maintaining intuitive navigation and core functionalities like booking and streaming.',
      solution: 'Designed a dark-themed interface that highlights movie posters and trailers. Implemented a streamlined booking flow and integrated features like ratings and download options, all within a visually rich environment.',
      processSteps: [
        {
          title: 'Concept & User Flow Mapping',
          description: 'Explored various visual themes and user journeys for movie discovery and booking. Mapped out key user flows from browsing to ticket confirmation/streaming.',
          image: '/images/fling-navbar-search.png' // Actual image
        },
        {
          title: 'Visual Design & Prototyping (Figma)',
          description: 'Developed a dark, cinematic visual style with vibrant accents. Created high-fidelity mockups and interactive prototypes in Figma, focusing on smooth transitions and engaging micro-interactions for a premium feel.',
          image: '/images/fling-latest-movies.png', // Actual image
          note: 'Figma\'s smart animate feature was extensively used to simulate seamless transitions between movie details and booking screens.'
        },
        {
          title: 'API Integration & Data Visualization',
          description: 'Designed how movie data (ratings, duration, genres) would be presented visually to enhance user understanding and decision-making.',
          image: '/images/fling-movie-detail.png' // Actual image
        },
        {
          title: 'Responsive Layouts',
          description: 'Ensured the design adapted flawlessly across various devices, from large cinema displays to mobile phones, maintaining the immersive experience.',
          image: '/images/fling-latest-series.png' // New image for step 4
        }
      ],
      tools: ['Figma', 'Adobe Illustrator', 'HTML/CSS', 'JavaScript', 'REST APIs'],
      results: [
        { icon: CheckCircle, text: 'Enhanced visual appeal, leading to longer session durations.' },
        { icon: CheckCircle, text: 'Simplified booking process, reducing abandonment rates.' },
        { icon: CheckCircle, text: 'Positive user feedback on the immersive and intuitive interface.' }
      ],
      image: '/images/fling-latest-movies.png',
    }
  ]

  const designProcess = [
    { step: '01', title: 'Research', description: 'Understanding users, market, and business goals' },
    { step: '02', title: 'Ideate', description: 'Brainstorming solutions and exploring possibilities' },
    { step: '03', title: 'Design', description: 'Creating wireframes, prototypes, and visual designs' },
    { step: '04', title: 'Test', description: 'User testing and iterating based on feedback' },
    { step: '05', title: 'Develop', description: 'Collaborating with developers for pixel-perfect implementation' }
  ]

  return (
    <>
      {/* Paper Crush Loading Animation */}
      <div className={`fixed inset-0 z-[100] pointer-events-none transition-all duration-1000 ${
        isLoaded ? 'opacity-0' : 'opacity-100'
      }`}>
        <div className="paper-crush-container">
          {/* Create multiple paper pieces */}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className={`paper-piece paper-piece-${i + 1}`}
              style={{
                animationDelay: `${i * 0.1}s`,
                left: `${(i % 5) * 20}%`,
                top: `${Math.floor(i / 5) * 25}%`
              }}
            />
          ))}
        </div>
      </div>

      <div className={`bg-white text-gray-900 font-system overflow-x-hidden transition-all duration-1000 ${
        isLoaded ? 'opacity-100 transform-none' : 'opacity-0 transform scale-95'
      }`}>
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-white/80 backdrop-blur-xl border-b border-gray-200' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-semibold tracking-tight">Nivedhan Chagana</h1>
              <div className="hidden md:flex space-x-8">
                {['About', 'Process', 'Work', 'Skills', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm font-medium"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50"></div>
          <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
            <div className="mb-12">
              <div className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-lg overflow-hidden">
                <img 
                  src="/images/profile.jpg"
                  alt="Nivedhan Chagana"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="mb-6">
              <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                Available for UI/UX Design Opportunities
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              UI/UX Designer
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                & Creative Developer
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-4xl mx-auto">
              Transforming complex problems into simple, beautiful, and intuitive designs. 
              Currently studying at Apple Developer Academy, Italy.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#work"
                className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-200 font-medium"
              >
                View My Design Work
              </a>
              <a
                href="#contact"
                className="border border-gray-300 text-gray-900 px-8 py-4 rounded-full hover:border-gray-400 transition-all duration-200 font-medium"
              >
                Let's Collaborate
              </a>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">The Story Behind the Design</h3>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    Picture this: It's 2 AM, rain pattering against my window (my favorite kind of weather), and I'm deep in a design sprint with a steaming bowl of ramen beside my laptop. This is where the magic happens – where my love for storytelling meets user experience design.
                  </p>
                  <p>
                    My journey into UI/UX began in the most unexpected way. While binge-watching anime and scrolling through memes (yes, I'm that person), I started noticing patterns – how certain visual narratives made me feel, how interface designs in my favorite shows influenced user behavior, and how even the simplest meme could convey complex emotions instantly.
                  </p>
                  <p>
                    Just like Harry Potter discovered his magical abilities, I discovered mine through code. But unlike Harry's wand, my tools evolved from JavaScript and React to Figma and user research. I realized that great design, like great storytelling, isn't just about what you see – it's about how it makes you feel.
                  </p>
                  <p>
                    Now, studying at the Apple Developer Academy in Italy, I'm combining my technical wizardry with design thinking. Whether I'm crafting user journeys over a perfect carbonara or sketching wireframes during a thunderstorm, I believe the best designs come from understanding human emotions – something anime taught me better than any textbook ever could.
                  </p>
                  <p className="text-blue-600 font-medium">
                    My mission? To create digital experiences that feel as satisfying as finding the perfect meme, as immersive as a Studio Ghibli film, and as magical as casting your first spell at Hogwarts.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-600">3+</div>
                    <div className="text-sm text-gray-500">Years Coding</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">∞</div>
                    <div className="text-sm text-gray-500">Anime Episodes</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">🌧️</div>
                    <div className="text-sm text-gray-500">Favorite Weather</div>
                  </div>
                </div>
                
                {/* Fun Facts Section */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                  <h4 className="font-semibold text-lg mb-4 text-gray-800">Fun Facts That Fuel My Creativity</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🍜</span>
                      <span>Designs best with ramen nearby</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">⚡</span>
                      <span>Hufflepuff with Ravenclaw tendencies</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🎌</span>
                      <span>Studio Ghibli = Design inspiration</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-lg mr-2">🌙</span>
                      <span>Night owl & storm chaser</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 h-96 flex items-center justify-center overflow-hidden">
                  <img
                    src="/images/profile.jpg"
                    alt="Nivedhan at work"
                    className="rounded-2xl shadow-2xl w-full h-full object-cover"
                  />
                </div>
                {/* Floating elements for personality */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
                  <span className="text-2xl">🍜</span>
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-3 shadow-lg">
                  <span className="text-2xl">⚡</span>
                </div>
                <div className="absolute top-1/2 -right-6 bg-white rounded-full p-3 shadow-lg">
                  <span className="text-2xl">🌧️</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Design Process */}
        <section id="process" className="py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight">My Design Process</h3>
            <div className="grid md:grid-cols-5 gap-8">
              {designProcess.map((item, index) => (
                <div key={item.step} className="text-center group">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform duration-300">
                      {item.step}
                    </div>
                    {index < designProcess.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 -translate-x-8"></div>
                    )}
                  </div>
                  <h4 className="text-xl font-semibold mb-3">{item.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section - Now with detailed case studies */}
        <section id="work" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Featured Work & Case Studies</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Dive deep into my design process, challenges, and solutions for each project.
              </p>
            </div>
            <div className="space-y-32"> {/* Increased spacing between projects */}
              {projects.map((project, index) => (
                <div
                  key={project.title}
                  ref={(el) => (projectRefs.current[index] = el)}
                  className={`bg-gray-50 rounded-3xl p-8 md:p-12 shadow-xl transition-all duration-700 ease-out ${
                    projectVisibility[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="text-center mb-12">
                    <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
                      {project.category} - {project.year}
                    </span>
                    <h4 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">{project.title}</h4>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-6 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all duration-200 font-medium"
                    >
                      View Live Project
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>

                  {/* Project Overview */}
                  <div className="grid md:grid-cols-2 gap-12 mb-16">
                    <div>
                      <h5 className="text-2xl font-bold mb-4 flex items-center"><Lightbulb className="w-6 h-6 mr-2 text-purple-600" /> The Problem</h5>
                      <p className="text-gray-700 leading-relaxed">{project.problem}</p>
                    </div>
                    <div>
                      <h5 className="text-2xl font-bold mb-4 flex items-center"><CheckCircle className="w-6 h-6 mr-2 text-green-600" /> The Solution</h5>
                      <p className="text-gray-700 leading-relaxed">{project.solution}</p>
                    </div>
                  </div>

                  {/* Design Process Steps */}
                  <div className="mb-16">
                    <h5 className="text-3xl font-bold mb-10 text-center tracking-tight">My Design Process</h5>
                    <div className="space-y-16">
                      {project.processSteps.map((step, stepIndex) => (
                        <div key={step.title} className={`grid lg:grid-cols-2 gap-12 items-center ${stepIndex % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                          <div className={`${stepIndex % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                            <span className="text-sm font-semibold text-blue-600 mb-2 block">STEP {stepIndex + 1}</span>
                            <h6 className="text-2xl font-bold mb-4">{step.title}</h6>
                            <p className="text-gray-700 leading-relaxed">{step.description}</p>
                            {step.note && (
                              <p className="text-sm text-gray-500 mt-4 italic">
                                <span className="font-semibold">Note:</span> {step.note}
                              </p>
                            )}
                          </div>
                          <div className={`${stepIndex % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                            <div className="relative group perspective-1000">
                              <img
                                src={step.image || "/placeholder.svg"}
                                alt={`${project.title} - ${step.title}`}
                                className="w-full rounded-2xl shadow-2xl transform-gpu transition-all duration-500 ease-out
                                           group-hover:rotate-x-[5deg] group-hover:rotate-y-[5deg] group-hover:scale-105 group-hover:shadow-3xl"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools & Technologies */}
                  <div className="mb-16">
                    <h5 className="text-3xl font-bold mb-8 text-center tracking-tight">Tools & Technologies</h5>
                    <div className="flex flex-wrap justify-center gap-4">
                      {project.tools.map((tool) => (
                        <span key={tool} className="bg-white text-gray-800 px-6 py-3 rounded-full shadow-md flex items-center">
                          {tool === 'Figma' && <Figma className="w-5 h-5 mr-2" />}
                          {tool === 'Miro' && <Search className="w-5 h-5 mr-2" />} {/* Using Search as a placeholder for Miro icon */}
                          {tool === 'UserTesting.com' && <Users className="w-5 h-5 mr-2" />}
                          {tool === 'Adobe Photoshop' && <Palette className="w-5 h-5 mr-2" />}
                          {tool === 'React' && <Smartphone className="w-5 h-5 mr-2" />}
                          {tool === 'Next.js' && <Code className="w-5 h-5 mr-2" />}
                          {tool === 'Tailwind CSS' && <Layout className="w-5 h-5 mr-2" />}
                          {tool === 'Adobe Illustrator' && <Palette className="w-5 h-5 mr-2" />}
                          {tool === 'HTML/CSS' && <Code className="w-5 h-5 mr-2" />}
                          {tool === 'JavaScript' && <Code className="w-5 h-5 mr-2" />}
                          {tool === 'REST APIs' && <LightbulbOff className="w-5 h-5 mr-2" />} {/* Placeholder for API icon */}
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Results */}
                  <div>
                    <h5 className="text-3xl font-bold mb-8 text-center tracking-tight">Key Results</h5>
                    <div className="grid md:grid-cols-3 gap-8">
                      {project.results.map((result, resultIndex) => (
                        <div key={resultIndex} className="bg-white p-6 rounded-2xl shadow-md text-center">
                          <result.icon className="w-10 h-10 mx-auto mb-4 text-blue-600" />
                          <p className="text-lg text-gray-700">{result.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-4xl md:text-5xl font-bold mb-16 text-center tracking-tight">Design Skills & Tools</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.map((skill, index) => (
                <div
                  key={skill.name}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                      <skill.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{skill.name}</h4>
                      <p className="text-sm text-gray-500">{`${skill.description}`}</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">{skill.level}% Proficiency</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight">Let's Create Something Amazing</h3>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
              I'm actively seeking UI/UX design opportunities where I can contribute my unique blend of 
              design thinking and technical expertise. Let's discuss how we can work together!
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <a
                href="mailto:nivedhan@example.com"
                className="bg-black text-white px-8 py-4 rounded-full hover:bg-gray-800 transition-all duration-200 font-medium inline-flex items-center justify-center"
              >
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </a>
              <a
                href="https://linkedin.com/in/chagana-nivedhan/"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-gray-300 text-gray-900 px-8 py-4 rounded-full hover:border-gray-400 transition-all duration-200 font-medium inline-flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5 mr-2" />
                Connect on LinkedIn
              </a>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
              <h4 className="text-2xl font-bold mb-4">Currently Available For</h4>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Palette className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="font-semibold">UI/UX Design</h5>
                  <p className="text-sm text-gray-600">Full-time positions</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="font-semibold">Freelance Projects</h5>
                  <p className="text-sm text-gray-600">Design consultancy</p>
                </div>
                <div>
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h5 className="font-semibold">Collaborations</h5>
                  <p className="text-sm text-gray-600">Creative partnerships</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-6 border-t border-gray-200 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <h4 className="text-xl font-semibold mb-2">Nivedhan Chagana</h4>
                <p className="text-gray-600">UI/UX Designer & Creative Developer</p>
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com/in/chagana-nivedhan/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors duration-200">
                  <Figma className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 text-center">
              <p className="text-gray-500">
                © {new Date().getFullYear()} Nivedhan Chagana. Designed with passion for great user experiences.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
