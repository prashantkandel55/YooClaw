import React, { useState, useEffect, useRef } from 'react'
import {
    LayoutDashboard,
    Search,
    Mail,
    Code,
    BarChart3,
    ShieldAlert,
    Terminal,
    Settings,
    Menu,
    X,
    CheckCircle2,
    Clock,
    Play,
    Copy,
    Send,
    MoreVertical,
    ChevronRight,
    TrendingUp,
    Cpu,
    History,
    AlertTriangle,
    Github,
    Bug,
    ShieldCheck,
    Check,
    Command,
    Zap,
    Layers,
    Activity,
    ArrowRight
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

// --- Color and Layout Constants ---
const CATEGORIES = [
    { id: 'productivity', label: 'Productivity', icon: LayoutDashboard, color: '#6366f1' },
    { id: 'research', label: 'Research', icon: Search, color: '#06b6d4' },
    { id: 'communication', label: 'Communication', icon: Mail, color: '#3b82f6' },
    { id: 'dev-tools', label: 'Developer Tools', icon: Code, color: '#d97706' },
    { id: 'data', label: 'Data & Reports', icon: BarChart3, color: '#10b981' },
    { id: 'security', label: 'Security', icon: ShieldAlert, color: '#ef4444' }
]

const MODULES = {
    productivity: [
        { id: 'task-prioritizer', title: 'Task Prioritizer', desc: 'Rank tasks by urgency and impact.', inputs: [{ type: 'textarea', placeholder: 'Enter your raw to-do list here...' }] },
        { id: 'meeting-prep', title: 'Meeting Prep', desc: 'Briefing card for your next meeting.', inputs: [{ type: 'text', placeholder: 'Event Name' }, { type: 'text', placeholder: 'Attendees' }] },
        { id: 'daily-standup', title: 'Daily Standup', desc: 'Format your standup message.', inputs: [{ type: 'textarea', placeholder: 'Yesterday, Today, Blockers...' }] }
    ],
    research: [
        { id: 'web-research', title: 'Web Research', desc: 'Deep search summarized with citations.', inputs: [{ type: 'text', placeholder: 'Research query...' }] },
        { id: 'competitor-monitor', title: 'Competitor Monitor', desc: 'Digest of competitor mentions.', inputs: [{ type: 'text', placeholder: 'Competitor names...' }] }
    ],
    communication: [
        { id: 'email-drafter', title: 'Email Drafter', desc: 'Turn bullets into professional email.', inputs: [{ type: 'textarea', placeholder: 'Key points...' }, { type: 'select', options: ['Formal', 'Casual', 'Friendly'], placeholder: 'Select Tone' }] }
    ],
    'dev-tools': [
        { id: 'pr-reviewer', title: 'GitHub PR Reviewer', desc: 'Summary of diffs and flag list.', inputs: [{ type: 'textarea', placeholder: 'Paste diff here...' }] },
        { id: 'error-explainer', title: 'Error Explainer', desc: 'Suggestions for fixing stack traces.', inputs: [{ type: 'textarea', placeholder: 'Paste error stack...' }] }
    ],
    data: [
        { id: 'csv-analyst', title: 'CSV Analyst', desc: 'Ask natural language questions.', inputs: [{ type: 'textarea', placeholder: 'CSV and Question...' }] }
    ],
    security: [
        { id: 'skill-chainer', title: 'Skill Chainer', desc: 'Drag-and-drop execution order.', inputs: [{ type: 'text', placeholder: 'Skill sequence...' }] },
        { id: 'injection-detector', title: 'Injection Detector', desc: 'Scan for malicious phrases.', inputs: [{ type: 'textarea', placeholder: 'Message to scan...' }] }
    ]
}

// --- Components ---

const SkeletonLoader = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="shimmer" style={{ height: '16px', width: '80%' }}></div>
        <div className="shimmer" style={{ height: '16px', width: '60%' }}></div>
        <div className="shimmer" style={{ height: '64px', width: '100%', borderRadius: '8px' }}></div>
    </div>
)

const ModuleCard = ({ module, categoryColor }) => {
    const [isRunning, setIsRunning] = useState(false)
    const [showOutput, setShowOutput] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleRun = () => {
        setIsRunning(true)
        setShowOutput(false)
        setTimeout(() => {
            setIsRunning(false)
            setShowOutput(true)
        }, 2000)
    }

    const handleCopy = () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="card" style={{ borderLeft: `4px solid ${categoryColor}`, marginBottom: '24px' }}>
            <header style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {module.title}
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: categoryColor }}></div>
                </h3>
                <p className="muted small">{module.desc}</p>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {module.inputs.map((input, idx) => (
                    <div key={idx}>
                        {input.type === 'textarea' ? (
                            <textarea placeholder={input.placeholder} rows={4} />
                        ) : input.type === 'select' ? (
                            <select defaultValue="">
                                <option value="" disabled>{input.placeholder}</option>
                                {input.options.map(o => <option key={o} value={o}>{o}</option>)}
                            </select>
                        ) : (
                            <input type="text" placeholder={input.placeholder} />
                        )}
                    </div>
                ))}
            </div>

            <button
                className="primary"
                onClick={handleRun}
                disabled={isRunning}
                style={{ width: '100%', background: isRunning ? '#1a1a2e' : categoryColor, color: isRunning ? '#64748b' : 'white' }}
            >
                {isRunning ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Activity size={16} className="animate-spin" />
                        Generating Intelligence...
                    </div>
                ) : (
                    <>
                        <Zap size={16} fill="white" />
                        Run Module
                    </>
                )}
            </button>

            <AnimatePresence>
                {isRunning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ marginTop: '24px' }}
                    >
                        <SkeletonLoader />
                    </motion.div>
                )}

                {showOutput && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                            <span className="small muted mono" style={{ letterSpacing: '0.1em' }}>OUTPUT_STREAM_READY</span>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="ghost" style={{ padding: '4px 8px', borderRadius: '4px' }} onClick={handleCopy}>
                                    {copied ? <Check size={14} style={{ color: 'var(--color-success)' }} /> : <Copy size={14} />}
                                </button>
                                <button className="ghost" style={{ padding: '4px 8px', borderRadius: '4px' }}><Send size={14} /></button>
                            </div>
                        </div>
                        <div className="mono" style={{ background: '#0a0a18', padding: '16px', borderRadius: '8px', fontSize: '13px', color: '#cbd5e1', border: '1px solid rgba(255,255,255,0.03)' }}>
                            {`Analyzing instructions...\n[STATUS] Context injected successfully.\n[AGENT] Result formulated.\n\n> Task prioritized based on 12 parameters.\n> Strategy card generated for specified attendees.\n\nReady for next command.`}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const WelcomeScreen = ({ onSelectCategory }) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '32px', textAlign: 'center' }}>
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ display: 'flex', alignItems: 'center', gap: '16px' }}
        >
            <div style={{ padding: '20px', background: 'var(--color-primary)', borderRadius: '24px', boxShadow: '0 0 40px rgba(99,102,241,0.2)' }}>
                <Terminal size={48} color="white" strokeWidth={3} />
            </div>
            <div>
                <h1 style={{ fontSize: '3rem', fontWeight: '900', letterSpacing: '-0.02em', background: 'linear-gradient(to bottom, #fff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    OpenClaw
                </h1>
                <p className="muted" style={{ fontSize: '1.2rem' }}>Master of Autonomous Intelligence</p>
            </div>
        </motion.div>

        <div style={{ maxWidth: '400px' }}>
            <p className="muted small" style={{ marginBottom: '24px' }}>Select a specialized module from the sidebar or choose a quick start below to begin your mission session.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button className="ghost" style={{ width: '100%', padding: '14px', borderRadius: '12px' }} onClick={() => onSelectCategory(CATEGORIES[0])}>
                    <LayoutDashboard size={18} color="#6366f1" />
                    Task Prioritization Session
                    <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
                </button>
                <button className="ghost" style={{ width: '100%', padding: '14px', borderRadius: '12px' }} onClick={() => onSelectCategory(CATEGORIES[1])}>
                    <Search size={18} color="#06b6d4" />
                    Deep Market Research
                    <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
                </button>
                <button className="ghost" style={{ width: '100%', padding: '14px', borderRadius: '12px' }} onClick={() => onSelectCategory(CATEGORIES[3])}>
                    <Code size={18} color="#d97706" />
                    Code Review & Debugging
                    <ArrowRight size={14} style={{ marginLeft: 'auto' }} />
                </button>
            </div>
        </div>
    </div>
)

const App = () => {
    const [activeCategory, setActiveCategory] = useState(null)
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [logs, setLogs] = useState([
        { id: 1, type: 'success', mod: 'System', msg: 'Kernel online', time: '12:21:05' },
        { id: 2, type: 'amber', mod: 'Auth', msg: 'Identity verified (C3.5)', time: '12:21:12' },
        { id: 3, type: 'success', mod: 'Agent', msg: 'Neural pathways ready', time: '12:21:22' }
    ])

    return (
        <div className="dashboard">
            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-brand">
                    <div style={{ width: '32px', height: '32px', background: 'var(--color-primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Terminal size={18} color="white" />
                    </div>
                    <span style={{ fontWeight: '800', letterSpacing: '1px' }}>OPENCLAW</span>
                    <button onClick={() => setSidebarOpen(false)} style={{ background: 'transparent', marginLeft: 'auto', padding: '4px' }} className="mobile-only">
                        <X size={20} />
                    </button>
                </div>

                <nav className="sidebar-content">
                    <div className="nav-group">
                        <span className="nav-group-label">Intelligence</span>
                        {CATEGORIES.slice(0, 3).map(cat => (
                            <button
                                key={cat.id}
                                className={`nav-item ${activeCategory?.id === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                <cat.icon size={20} />
                                <span>{cat.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="nav-group">
                        <span className="nav-group-label">Operational</span>
                        {CATEGORIES.slice(3).map(cat => (
                            <button
                                key={cat.id}
                                className={`nav-item ${activeCategory?.id === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                <cat.icon size={20} />
                                <span>{cat.label}</span>
                            </button>
                        ))}
                    </div>
                </nav>

                <div className="sidebar-bottom">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                        <Command size={14} className="muted" />
                        <span className="small muted">Press <span style={{ color: 'white' }}>/</span> to search</span>
                    </div>
                    <button className="nav-item">
                        <Settings size={20} />
                        <span>Settings</span>
                    </button>
                </div>
            </aside>

            <div className="stage">
                {/* Topbar */}
                <header className="topbar">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        {!sidebarOpen && (
                            <button className="ghost" style={{ padding: '8px' }} onClick={() => setSidebarOpen(true)}>
                                <Menu size={20} />
                            </button>
                        )}
                        <div className="agent-status">
                            <div className="pulse-dot"></div>
                            <span style={{ fontWeight: '700', fontSize: '14px' }}>Agent-001</span>
                            <div className="badge-pill">
                                <Cpu size={12} />
                                Claude Sonnet 3.5
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="user-orb">JD</div>
                    </div>
                </header>

                {/* Content */}
                <main className="main-content">
                    <AnimatePresence mode="wait">
                        {!activeCategory ? (
                            <motion.div
                                key="welcome"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                style={{ height: '100%' }}
                            >
                                <WelcomeScreen onSelectCategory={setActiveCategory} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key={activeCategory.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.2 }}
                            >
                                <header style={{ marginBottom: '40px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                        <div style={{ padding: '8px', borderRadius: '10px', background: activeCategory.color + '20' }}>
                                            <activeCategory.icon color={activeCategory.color} size={24} />
                                        </div>
                                        <div>
                                            <h2 style={{ fontSize: '1.75rem', fontWeight: '800' }}>{activeCategory.label}</h2>
                                            <p className="muted small">Specialized tools and command sets for {activeCategory.label.toLowerCase()} tasks.</p>
                                        </div>
                                    </div>
                                </header>

                                <div className="module-grid">
                                    {MODULES[activeCategory.id].map(module => (
                                        <ModuleCard key={module.id} module={module} categoryColor={activeCategory.color} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>

                {/* Log Strip */}
                <footer className="agent-logs">
                    <div style={{ display: 'flex', gap: '24px', overflowX: 'auto', padding: '0 24px', height: '100%', alignItems: 'center' }}>
                        {logs.map(log => (
                            <div key={log.id} className="log-pill mono">
                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: log.type === 'success' ? 'var(--color-success)' : 'var(--color-warning)' }}></div>
                                <span className="muted">[{log.time}]</span>
                                <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>{log.mod}</span>
                                <span style={{ color: '#fff' }}>{log.msg}</span>
                            </div>
                        ))}
                    </div>
                </footer>
            </div>

            <style>{`
        .dashboard {
          display: flex;
          height: 100vh;
          width: 100vw;
          background: var(--color-bg-main);
          overflow: hidden;
        }

        /* Sidebar Styles */
        .sidebar {
          width: var(--sidebar-width);
          max-width: var(--sidebar-width);
          background: var(--color-sidebar);
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          display: flex;
          flex-direction: column;
          z-index: 100;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .sidebar.closed {
          transform: translateX(-100%);
          position: absolute;
        }

        .sidebar-brand {
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 14px;
        }

        .sidebar-content {
          flex: 1;
          padding: 0 16px;
          overflow-y: auto;
        }

        .nav-group {
          margin-bottom: 24px;
        }

        .nav-group-label {
          display: block;
          padding: 0 12px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--color-text-muted);
          margin-bottom: 8px;
          letter-spacing: 1px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          padding: 10px 12px;
          color: var(--color-text-secondary);
          background: transparent;
          text-align: left;
          transition: all 0.15s ease;
          border-left: 2px solid transparent;
        }

        .nav-item:hover {
          color: white;
          background: rgba(255, 255, 255, 0.03);
          transform: translateX(2px);
        }

        .nav-item.active {
          color: var(--color-primary);
          background: rgba(99, 102, 241, 0.08);
          border-left-color: var(--color-primary);
          font-weight: 600;
        }

        .sidebar-bottom {
          padding: 16px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        /* Stage Layout */
        .stage {
          flex: 1;
          display: flex;
          flex-direction: column;
          position: relative;
          min-width: 0;
        }

        .topbar {
          height: var(--topbar-height);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(13, 13, 26, 0.5);
          backdrop-filter: blur(8px);
        }

        .agent-status {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .badge-pill {
          background: var(--color-primary);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .user-orb {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #3b82f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .main-content {
          flex: 1;
          overflow-y: auto;
          padding: 40px;
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
        }

        .module-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 24px;
        }

        /* Footer Logs */
        .agent-logs {
          height: 48px;
          background: #0a0a18;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          white-space: nowrap;
        }

        .log-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          flex-shrink: 0;
          background: rgba(255, 255, 255, 0.02);
          padding: 4px 12px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .module-grid { grid-template-columns: 1fr; }
        }

        @media (min-width: 769px) {
          .mobile-only { display: none; }
        }
      `}</style>
        </div>
    )
}

export default App
