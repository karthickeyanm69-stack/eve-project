import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Rocket, 
  Sparkles, 
  Trophy, 
  Flame, 
  Briefcase, 
  Terminal, 
  Bot, 
  ShieldCheck, 
  Sliders, 
  User, 
  Code, 
  Plus, 
  Play, 
  AlertCircle, 
  ChevronRight, 
  CheckCircle, 
  Globe, 
  Trash2, 
  ArrowRight, 
  Cpu, 
  Folder, 
  FileCode, 
  Gauge, 
  PlusCircle, 
  GraduationCap,
  LogOut,
  Users
} from "lucide-react";
import { VidyonProfile, DailyMission, Achievement, LeaderboardEntry, CodeFile, SandboxProject, ChatMessage, ResumeAtsResult } from "./types";
import Onboarding from "./components/Onboarding";
import Roadmap from "./components/Roadmap";
import Guild from "./components/Guild";

export default function App() {
  const [profile, setProfile] = useState<VidyonProfile | null>(null);
  const [activeView, setActiveView] = useState<"roadmap" | "playground" | "chat" | "interview" | "portfolio" | "admin" | "guild">("roadmap");

  // XP, Stream and level states
  const [xp, setXp] = useState(2450);
  const [streak, setStreak] = useState(12);
  const [level, setLevel] = useState(3);
  const [completedNodes, setCompletedNodes] = useState<string[]>(["fe_html"]);
  const [completedReadings, setCompletedReadings] = useState<string[]>([]);
  const [completedStories, setCompletedStories] = useState<string[]>([]);

  // Multi-filing playground state
  const playgroundTemplates: SandboxProject[] = [
    {
      id: "proj_js",
      title: "Universal Landing Node",
      language: "javascript",
      activeFile: "main.js",
      files: [
        {
          name: "index.html",
          language: "html",
          content: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { background: #050505; color: #00A3FF; font-family: sans-serif; text-align: center; padding-top: 50px; }
    h1 { border: 2px solid #00F0FF; padding: 20px; display: inline-block; border-radius: 10px; }
  </style>
</head>
<body>
  <h1 id="title">EVE × UNAI Sandbox</h1>
  <p>Modify script files and click compile below!</p>
</body>
</html>`
        },
        {
          name: "main.js",
          language: "javascript",
          content: `// Click Execute compilation to run inside simulated framework
function greetUser() {
  console.log("Initializing deep neural sync...");
  const title = document.getElementById("title");
  if(title) {
    title.innerText = "SSO Ecosystem Online ⚡";
    title.style.color = "#39ff14";
  }
}
greetUser();`
        }
      ]
    },
    {
      id: "proj_py",
      title: "AI Agent Orchestrator",
      language: "python",
      activeFile: "agent.py",
      files: [
        {
          name: "agent.py",
          language: "python",
          content: `# Python Agentic Loop
import time

def process_prompt(prompt):
    print(f"📡 Query dispatched to EVE node... Input: {prompt}")
    time.sleep(0.5)
    return {
        "status": "CALIBRATED",
        "agent": "Ecosystem Intel",
        "tokens": 4022
    }

response = process_prompt("Build an interview framework")
print("Matrix Sync Complete:", response)`
        }
      ]
    },
    {
      id: "proj_cpp",
      title: "Celestial Raymarcher Engine",
      language: "cpp",
      activeFile: "main.cpp",
      files: [
         {
           name: "main.cpp",
           language: "cpp",
           content: `#include <iostream>
using namespace std;

int main() {
    cout << "🚀 COMPILING UNAI STARLIGHT ENGINE v1.2" << endl;
    cout << "Loading neural vectors..." << endl;
    cout << "All buffers clean. Vector space established." << endl;
    return 0;
}`
         }
      ]
    }
  ];

  const [sandboxProjects, setSandboxProjects] = useState<SandboxProject[]>(playgroundTemplates);
  const [selectedProjectIdx, setSelectedProjectIdx] = useState<number>(0);
  const [currentActiveFileContent, setCurrentActiveFileContent] = useState<string>("");
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "System standby. Code sandbox ready to execute.",
    "Click standard Run code or request AI debugger tips."
  ]);
  const [isSandboxCompiling, setIsSandboxCompiling] = useState<boolean>(false);

  // AI Mentor Chat (EVE)
  const [mentorInput, setMentorInput] = useState("");
  const [mentorChatHistory, setMentorChatHistory] = useState<ChatMessage[]>([
    {
      id: "init_msg",
      role: "assistant",
      text: "### 🌌 Welcome to the Unified Coding Hub!\n\nI am **EVE**, your Digital Mentor. Ask me to:\n* **Generate algorithms** (e.g., Dijkstra in Python)\n* **Explain coding practices** (e.g., closures in JS)\n* **Review custom source code** for hidden compilation bottlenecks.\n\nLet's write clean code together!",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [isMentorLoading, setIsMentorLoading] = useState(false);

  // Interview stage state
  const [interviewRole, setInterviewRole] = useState("AI Developer & Specialist");
  const [interviewStage, setInterviewStage] = useState("Advanced System Design");
  const [interviewHistory, setInterviewHistory] = useState<ChatMessage[]>([
    {
      id: "int_1",
      role: "assistant",
      text: `🦾 **UNAI Tech Technical Interview Simulator Initialized**
Role: **AI Developer & Specialist**
Stage: **Advanced System Design**

*Interviewer:* Welcome! In high-volume streaming, our servers need memory-efficient operations. How would you design a rate limiter to throttle API abuse gracefully? Type your answer below.`,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [interviewInput, setInterviewInput] = useState("");
  const [isInterviewLoading, setIsInterviewLoading] = useState(false);

  // ATS / Resume & Job Center state
  const [resumeText, setResumeText] = useState(`KARTHICKEYAN M
Email: karthickeyanm69@gmail.com
Experience:
- Frontend Trainee working with HTML and basics of Javascript.
- Completed simple responsive landing pages using CSS media queries.
Skills: HTML, CSS, JavaScript, Basic Git.`);
  const [atsTargetJob, setAtsTargetJob] = useState("AI Full-Stack Software Engineer");
  const [atsResult, setAtsResult] = useState<ResumeAtsResult | null>(null);
  const [atsLoading, setAtsLoading] = useState(false);

  // Admin section: dynamic course creation simulation
  const [adminCourses, setAdminCourses] = useState([
    { id: "c_1", name: "Intro to Neural Compilers", category: "AI", enrollees: 450, tracking: 94 },
    { id: "c_2", name: "High-throughput Rust Kernels", category: "Backend", enrollees: 280, tracking: 89 },
    { id: "c_3", name: "Modern Vidyon OAuth Setup", category: "Security", enrollees: 120, tracking: 75 }
  ]);
  const [newCourseName, setNewCourseName] = useState("");
  const [newCourseCat, setNewCourseCat] = useState("AI");

  // Sync state with selected project
  useEffect(() => {
    const proj = sandboxProjects[selectedProjectIdx];
    if (proj) {
      const activeFile = proj.files.find(f => f.name === proj.activeFile);
      if (activeFile) {
        setCurrentActiveFileContent(activeFile.content);
      }
    }
  }, [selectedProjectIdx, sandboxProjects]);

  const activeProject = sandboxProjects[selectedProjectIdx];

  // Daily missions list
  const dailyMissions: DailyMission[] = [
    { id: "m_1", description: "Solve a Duolingo milestone quiz", target: 1, current: completedNodes.length > 1 ? 1 : 0, rewardXp: 100, completed: completedNodes.length > 1 },
    { id: "m_2", description: "Incorporate AI code autocomplete hints", target: 1, current: terminalLogs.length > 2 ? 1 : 0, rewardXp: 150, completed: terminalLogs.length > 2 },
    { id: "m_3", description: "Synchronize a resume mock ATS profile", target: 1, current: atsResult ? 1 : 0, rewardXp: 200, completed: !!atsResult }
  ];

  // Leaderboard lists
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    { rank: 1, name: "unai_super_developer", xp: 12400, avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80" },
    { rank: 2, name: "alex_matrix", xp: 9850, avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80" },
    { rank: 3, name: "YOU (VIDYON CADET)", xp: xp, avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80", isCurrentUser: true }
  ]);

  // Sync current user rank position / XP in leaderboard
  useEffect(() => {
    const sorted = [...leaderboard].map(entry => {
      if (entry.isCurrentUser) {
        return { ...entry, xp };
      }
      return entry;
    }).sort((a, b) => b.xp - a.xp);
    
    const ranked = sorted.map((entry, idx) => ({
      ...entry,
      rank: idx + 1
    }));
    setLeaderboard(ranked);
  }, [xp]);

  const handleOnboardingComplete = (profileData: VidyonProfile, initialXp: number, testScore: number) => {
    setProfile(profileData);
    setXp(initialXp);
    setLeaderboard(prev => prev.map(item => item.isCurrentUser ? { ...item, name: profileData.name + " (YOU)" } : item));
  };

  const handleNodeComplete = (xpGained: number) => {
    setXp(prev => prev + xpGained);
    setStreak(prev => prev + 1);
    // Add completed node id simulation
    const currentActiveNodes = ["fe_html", "fe_css", "fe_js", "fe_react", "fe_next", "be_node", "be_express", "be_db", "py_basics", "py_oop", "ai_math", "ai_llm", "ai_dev", "sec_web"];
    const finishedCount = completedNodes.length;
    if (finishedCount < currentActiveNodes.length) {
      const nextNodeToComplete = currentActiveNodes[finishedCount];
      setCompletedNodes(prev => [...prev, nextNodeToComplete]);
    }
  };

  const handleModeComplete = (nodeId: string, mode: "reading" | "story", xpGained: number) => {
    setXp(prev => prev + xpGained);
    setStreak(prev => prev + 1);
    
    if (mode === "reading") {
      setCompletedReadings(prev => {
        if (prev.includes(nodeId)) return prev;
        return [...prev, nodeId];
      });
      setCompletedStories(prev => {
        if (prev.includes(nodeId)) return prev;
        return [...prev, nodeId];
      });
    } else if (mode === "story") {
      setCompletedStories(prev => {
        if (prev.includes(nodeId)) return prev;
        return [...prev, nodeId];
      });
    }
  };

  // Run codes in the IDE playground simulation
  const handleExecuteSandbox = () => {
    setIsSandboxCompiling(true);
    setTerminalLogs(prev => [...prev, "⚡ [COMPILING] Deploying temporary sandbox files to Cloud Sandbox..."]);
    
    setTimeout(() => {
      setIsSandboxCompiling(false);
      let simulatedLogs = [
        `📡 Environment mapped to: Sandbox Docker node v20.0`,
        `🛠️ Executed file: ${activeProject.activeFile}`,
        `✨ Execution successful. Exit code: 0`
      ];

      if (activeProject.language === "javascript") {
        simulatedLogs.push("LOG: 'Initializing deep neural sync...'");
        simulatedLogs.push("DOM UPDATE: Title altered correctly to \"SSO Ecosystem Online ⚡\" with green accent.");
      } else if (activeProject.language === "python") {
        simulatedLogs.push("LOG: 📡 Query dispatched to EVE node... Input: Build interview framework");
        simulatedLogs.push("LOG: Matrix Sync Complete: {'status': 'CALIBRATED', 'agent': 'Ecosystem Intel', 'tokens': 4022}");
      } else {
        simulatedLogs.push("LOG: 🚀 COMPILING UNAI STARLIGHT ENGINE v1.2");
        simulatedLogs.push("LOG: Loading neural vectors...");
        simulatedLogs.push("LOG: All buffers clean. Vector space established.");
      }

      setTerminalLogs(prev => [...prev, ...simulatedLogs]);
      setXp(prev => prev + 25); // Minor run award
    }, 1200);
  };

  // Update file contents
  const handleCodeContentChange = (val: string) => {
    setCurrentActiveFileContent(val);
    setSandboxProjects(prev => {
      const copy = [...prev];
      const proj = copy[selectedProjectIdx];
      const fIdx = proj.files.findIndex(f => f.name === proj.activeFile);
      if (fIdx !== -1) {
        proj.files[fIdx].content = val;
      }
      return copy;
    });
  };

  // Request AI code help triggers EVE mentor directly in terminal logs
  const handleSandboxAiDebug = async () => {
    setTerminalLogs(prev => [...prev, "🤖 [AI AGENT] EVE analyzing vector scopes for code errors..."]);
    
    try {
      const response = await fetch("/api/gemini/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Explain or optimize this code snippet from file ${activeProject.activeFile}:\n\n${currentActiveFileContent}`
        })
      });
      const data = await response.json();
      
      setTerminalLogs(prev => [
        ...prev,
        "💡 EVE Recommendation Map:",
        data.text || "Ensure appropriate parameter sizing."
      ]);
      setXp(prev => prev + 30);
    } catch {
      setTerminalLogs(prev => [
        ...prev,
        "💡 EVE Smart recommendation (static offline): Keep code modular, utilize single-view layouts, and declare all variables cleanly with no redundancy."
      ]);
    }
  };

  // Submit chat with AI Mentor EVE
  const handleSendMessageToMentor = async () => {
    if (!mentorInput.trim()) return;
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: "user",
      text: mentorInput,
      timestamp: new Date().toLocaleTimeString()
    };
    setMentorChatHistory(prev => [...prev, userMsg]);
    setMentorInput("");
    setIsMentorLoading(true);

    try {
      // Create request payload history
      const formattedHistory = mentorChatHistory.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        text: msg.text
      }));

      const response = await fetch("/api/gemini/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          history: formattedHistory
        })
      });

      const data = await response.json();
      setMentorChatHistory(prev => [
        ...prev,
        {
          id: `msg_${Date.now() + 1}`,
          role: "assistant",
          text: data.text || "Neural sync established successfully.",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } catch (err) {
      setMentorChatHistory(prev => [
        ...prev,
        {
          id: `msg_${Date.now() + 1}`,
          role: "assistant",
          text: "**Fallback Engine online.** Unable to contact the live Gemini API server node. Ensure your `GEMINI_API_KEY` is present in the secrets sidebar.",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setIsMentorLoading(false);
    }
  };

  // Send message to Mock Interview panel 
  const handleSendInterviewResponse = async () => {
    if (!interviewInput.trim()) return;
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      role: "user",
      text: interviewInput,
      timestamp: new Date().toLocaleTimeString()
    };
    setInterviewHistory(prev => [...prev, userMsg]);
    setInterviewInput("");
    setIsInterviewLoading(true);

    try {
      const historyFormatted = interviewHistory.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        content: msg.text
      }));

      const response = await fetch("/api/gemini/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMsg.text,
          history: historyFormatted,
          roleName: interviewRole,
          stage: interviewStage
        })
      });

      const data = await response.json();
      setInterviewHistory(prev => [
        ...prev,
        {
          id: `msg_${Date.now() + 1}`,
          role: "assistant",
          text: data.text || "Answer analyzed. Give your thoughts on error tracking setups.",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
      setXp(prev => prev + 50);
    } catch {
      setInterviewHistory(prev => [
        ...prev,
        {
          id: `msg_${Date.now() + 1}`,
          role: "assistant",
          text: "I received your response! Let's drill deeper. How would you handle continuous updates within database transaction grids while avoiding deadlocks?",
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      setIsInterviewLoading(false);
    }
  };

  // Trigger ATS Resume scanning
  const handleAtsAnalysis = async () => {
    setAtsLoading(true);
    try {
      const response = await fetch("/api/gemini/ats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resumeText,
          targetRole: atsTargetJob
        })
      });
      const data = await response.json();
      setAtsResult(data);
      setXp(prev => prev + 100); // Reward for syncing profile gaps
    } catch {
      // Mock result fallback standard
      setAtsResult({
        score: 68,
        feedback: "Your profile shows robust foundations but lacks active exposure to cloud server pipelines and advanced state-synchronization engines. Start React and Node courses now to boost score.",
        matchingPercentage: 62,
        missingSkills: ["Express API Proxies", "PostgreSQL database optimization", "GitHub Actions CI/CD workflows", "Gemini generative models"],
        recommendedCourses: [
          "EVE Module 2: High Performance Node.js",
          "UNAI Specialized Course: Backend and APIs"
        ]
      });
    } finally {
      setAtsLoading(false);
    }
  };

  // Admin module: Add customized learning programs
  const handleAddCourse = () => {
    if (!newCourseName.trim()) return;
    setAdminCourses(prev => [
      ...prev,
      {
        id: `c_${Date.now()}`,
        name: newCourseName,
        category: newCourseCat,
        enrollees: Math.floor(Math.random() * 50) + 10,
        tracking: Math.floor(Math.random() * 20) + 80
      }
    ]);
    setNewCourseName("");
  };

  // Remove administrative course
  const handleRemoveCourse = (id: string) => {
    setAdminCourses(prev => prev.filter(c => c.id !== id));
  };

  // Unsynced landing screen fallback standard 
  if (!profile) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className="flex flex-col h-screen w-screen bg-[#050505] text-slate-100 font-sans overflow-hidden select-none">
      
      {/* 1. Header Navigation System matching theme strictly */}
      <header className="h-16 flex items-center justify-between px-6 bg-[#0a0a0a] border-b border-white/10 z-10 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 bg-gradient-to-br from-[#00A3FF] to-[#00F0FF] rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(0,163,255,0.4)]">
            <span className="text-black font-black text-xs tracking-tighter">E×U</span>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tighter uppercase font-display flex items-center gap-1.5">
              EVE <span className="text-[#00A3FF] font-light">×</span> UNAI
            </h1>
            <p className="text-[9px] text-[#00A3FF] font-mono uppercase tracking-widest leading-none">ECOSYSTEM CONSOLE</p>
          </div>
        </div>
        
        {/* Dynamic header stats */}
        <div className="flex items-center space-x-6 text-xs font-mono font-medium tracking-wide">
          <div className="flex items-center space-x-1.5 text-orange-400 group cursor-pointer" title="Day Streaks status">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 group-hover:scale-115 transition-transform" />
            <span className="uppercase">{streak} DAY STREAK</span>
          </div>

          <div className="flex items-center space-x-1.5 text-[#00F0FF] group cursor-pointer" title="XP accumulation points">
            <Trophy className="w-4 h-4 text-[#00F0FF] group-hover:rotate-12 transition-transform" />
            <span className="font-bold">{xp.toLocaleString()} XP</span>
          </div>

          <div className="h-6 w-px bg-white/10 hidden sm:block"></div>

          {/* Unified VIDYON SSO User profile sync component */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center space-x-2.5 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/10 transition-colors shadow-sm">
              <img 
                src={profile.avatar} 
                alt={profile.name}
                className="w-5 h-5 rounded-full border border-[#00A3FF]/50"
              />
              <div className="text-left leading-none">
                <span className="text-[10px] text-slate-100 block font-sans truncate max-w-[90px]">{profile.name}</span>
                <span className="text-[8px] text-slate-500 block font-mono">ID: {profile.id}</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="VIDYON SSO Active" />
            </div>

            {/* Logout button */}
            <button
              id="header_logout_button"
              onClick={() => setProfile(null)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all text-[9.5px] font-mono cursor-pointer uppercase font-bold shadow-sm hover:border-red-500/40"
              title="Log out of session"
            >
              <LogOut className="w-3 h-3" />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Primary Workspace Panel */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Side Navigation icons with active outlines */}
        <nav className="w-16 sm:w-20 bg-[#070707] border-r border-white/10 flex flex-col items-center py-6 justify-between shrink-0">
          <div className="flex flex-col items-center space-y-4 w-full px-2">
            {[
              { id: "roadmap", label: "ROADMAP", icon: Globe },
              { id: "playground", label: "IDE", icon: Terminal },
              { id: "chat", label: "MENTOR", icon: Bot },
              { id: "interview", label: "PANEL", icon: Briefcase },
              { id: "portfolio", label: "CAREER", icon: GraduationCap },
              { id: "guild", label: "GUILD", icon: Users },
              { id: "admin", label: "ADMIN", icon: Sliders }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isSelected = activeView === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id as any)}
                  title={tab.label}
                  className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer relative group ${
                    isSelected
                      ? "text-[#00A3FF] bg-blue-500/10 border border-blue-500/25 shadow-[0_0_12px_rgba(0,163,255,0.15)]"
                      : "text-slate-500 hover:text-slate-200 border border-transparent"
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  <span className="text-[8px] font-mono mt-1 opacity-80 scale-90 tracking-tighter truncate max-w-full">
                    {tab.label}
                  </span>
                  
                  {/* Glowing line element on the left side of nav */}
                  {isSelected && (
                    <div className="absolute left-0 top-3 bottom-3 w-1 bg-[#00A3FF] rounded-r-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom telemetry indicators */}
          <div className="flex flex-col items-center space-y-3">
            <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center" title="Software Engine Version">
              <span className="text-[8px] font-mono text-slate-500 font-bold uppercase">v2.1</span>
            </div>
          </div>
        </nav>

        {/* Central Component Panel */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(0,163,255,0.06),transparent)] pointer-events-none"></div>

          {/* App Views wrapper */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 z-10 flex flex-col">
            
            {/* VIEW 1: DUOLINGO STYLE ROADMAP */}
            {activeView === "roadmap" && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-[#00A3FF]/10 border border-[#00A3FF]/30 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-[#00A3FF]" />
                      </div>
                      <div>
                        <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider">Sync Roadmap Target</h3>
                        <p className="text-sm font-sans font-medium text-slate-100">Duolingo Learning Compilers</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20 uppercase">
                        Progress synced
                      </span>
                    </div>
                  </div>

                  {profile.interests && profile.interests.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-950/10 to-transparent p-4 rounded-2xl border border-[#00A3FF]/10 mb-4 text-left">
                      <h4 className="text-[10px] font-mono text-[#00A3FF] uppercase tracking-widest mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#00A3FF]" /> Synchronized Orbit Interests
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {profile.interests.map((interest) => (
                          <span 
                            key={interest} 
                            className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-200 font-mono flex items-center gap-1 hover:border-[#00A3FF]/30 transition-colors"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#00A3FF]" />
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <Roadmap 
                    onNodeComplete={handleNodeComplete} 
                    completedNodes={completedNodes}
                    completedReadings={completedReadings}
                    completedStories={completedStories}
                    onModeComplete={handleModeComplete}
                    xp={xp}
                    level={level}
                    streak={streak}
                    profileName={profile?.name}
                    activeInterest={profile?.interests?.[0] || "Web Development"}
                  />
                </div>

                {/* Interactive Dynamic Mission bar matching layout */}
                <div className="mt-8 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="text-left w-full md:w-auto">
                    <span className="text-[9px] text-[#00A3FF] font-mono font-bold uppercase tracking-wider">Active Duolingo Streak Missions</span>
                    <h4 className="text-sm font-medium mt-1">Resolve tasks to increment score metrics</h4>
                    <div className="space-y-2 mt-3">
                      {dailyMissions.map((mis) => (
                        <div key={mis.id} className="flex items-center space-x-2 text-xs">
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${mis.completed ? "bg-emerald-500 border-emerald-500 text-black font-bold text-[8px]" : "border-slate-700"}`}>
                            {mis.completed && "✓"}
                          </div>
                          <span className={mis.completed ? "text-slate-500 line-through" : "text-slate-300"}>
                            {mis.description} (+{mis.rewardXp} XP)
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h-px w-full md:h-12 md:w-px bg-white/10"></div>
                  <button 
                    onClick={() => setActiveView("playground")}
                    className="w-full md:w-auto bg-[#00A3FF] text-black font-black text-xs px-6 py-3.5 rounded-xl uppercase tracking-tighter hover:bg-[#00F0FF] transition-all shrink-0 active:scale-95 shadow-[0_0_20px_rgba(0,163,255,0.3)] flex items-center justify-center gap-2"
                  >
                    <Terminal className="w-4 h-4" />
                    Launch Interactive Playground
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 2: INTERACTIVE DEEP CODING PLAYGROUND */}
            {activeView === "playground" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-stretch">
                
                {/* Project File Tree sidebar */}
                <div className="lg:col-span-3 unai-glass p-4 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-mono text-[#00A3FF] uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                      <Folder className="w-4 h-4" /> Multi-File Templates
                    </h3>
                    <div className="space-y-2">
                      {sandboxProjects.map((proj, idx) => (
                        <button
                          key={proj.id}
                          onClick={() => setSelectedProjectIdx(idx)}
                          className={`w-full p-3 rounded-xl border text-left text-xs font-sans transition-all flex items-center justify-between ${
                            selectedProjectIdx === idx
                              ? "bg-white/5 border-[#00A3FF] text-white font-medium"
                              : "bg-[#070707] border-white/5 text-slate-400 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-sm">
                              {proj.language === "python" ? "🐍" : proj.language === "cpp" ? "⚙️" : "🕸️"}
                            </span>
                            <span className="truncate max-w-[130px]">{proj.title}</span>
                          </div>
                          <span className="text-[9px] font-mono uppercase bg-white/5 px-2 py-0.5 rounded text-[#00A3FF]">
                            {proj.language}
                          </span>
                        </button>
                      ))}
                    </div>

                    <div className="h-px bg-white/5 my-4"></div>

                    {/* Interactive lists of files within selected project */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-slate-500 uppercase block mb-2">Workspace File Tree</span>
                      {activeProject.files.map((file) => (
                        <button
                          key={file.name}
                          onClick={() => {
                            setSandboxProjects(prev => {
                              const copy = [...prev];
                              copy[selectedProjectIdx].activeFile = file.name;
                              return copy;
                            });
                          }}
                          className={`w-full p-2 rounded-lg text-left text-xs font-mono flex items-center space-x-2 transition-all ${
                            activeProject.activeFile === file.name
                              ? "text-[#00A3FF] bg-[#00A3FF]/5 font-medium"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <FileCode className="w-3.5 h-3.5" />
                          <span>{file.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-[10px] font-mono text-slate-400 leading-relaxed mt-4">
                    🛠️ Ensure dynamic updates compile smoothly before pushing to your portfolio.
                  </div>
                </div>

                {/* Core Code Canvas editor */}
                <div className="lg:col-span-5 flex flex-col space-y-4">
                  <div className="unai-glass rounded-2xl flex-1 flex flex-col overflow-hidden">
                    
                    {/* Monaco style pseudo-header toolbar */}
                    <div className="bg-[#0c0c0c] px-4 py-2 flex items-center justify-between border-b border-white/10 text-xs font-mono">
                      <div className="flex items-center space-x-2 text-slate-300">
                        <FileCode className="w-4 h-4 text-[#00A3FF]" />
                        <span>{activeProject.activeFile}</span>
                      </div>
                      <div className="flex space-x-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500/40"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500/40"></span>
                      </div>
                    </div>

                    {/* Textarea Code Canvas */}
                    <textarea
                      id="ide_editor_canvas"
                      value={currentActiveFileContent}
                      onChange={(e) => handleCodeContentChange(e.target.value)}
                      className="w-full flex-1 bg-[#050505] p-4 text-xs font-mono text-slate-100 outline-none resize-none border-0 leading-relaxed font-medium"
                      placeholder="// Insert source code matrix vectors here..."
                      spellCheck={false}
                    />

                    {/* Integrated control dashboard bar */}
                    <div className="bg-[#0a0a0a] border-t border-white/10 p-3 flex justify-between gap-3">
                      <button
                        onClick={handleSandboxAiDebug}
                        className="flex-1 py-2.5 px-3 bg-white/5 hover:bg-white/10 text-xs font-mono text-[#00A3FF] rounded-lg border border-white/10 active:scale-95 transition-all text-center"
                      >
                        ⚡ Ask EVE to Review Code
                      </button>

                      <button
                        onClick={handleExecuteSandbox}
                        disabled={isSandboxCompiling}
                        className="flex-1 py-2.5 px-4 bg-gradient-to-r from-[#00A3FF] to-[#00F0FF] text-black font-semibold text-xs rounded-lg active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,163,255,0.2)] disabled:opacity-45"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        {isSandboxCompiling ? "Compiling..." : "Compile Matrix"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Output Terminal & AI instructions (Right side) */}
                <div className="lg:col-span-4 flex flex-col space-y-4">
                  
                  {/* Virtual terminal simulator */}
                  <div className="unai-glass rounded-2xl flex-1 flex flex-col overflow-hidden">
                    <div className="bg-[#0a0a0a] px-4 py-2 border-b border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
                      <span>CONSOLE SANDBOX ENGINE OUTPUT</span>
                      <button 
                        onClick={() => setTerminalLogs(["System standby logs cleared. Ready."])}
                        className="hover:text-slate-200"
                      >
                        [clear]
                      </button>
                    </div>
                    <div className="p-4 bg-[#050505] flex-1 font-mono text-[11px] text-slate-400 space-y-2 overflow-y-auto leading-relaxed select-text">
                      {terminalLogs.map((log, lIdx) => (
                        <div key={lIdx} className="border-b border-white/5 pb-1 whitespace-pre-line last:border-0 text-left">
                          <span className="text-[#00A3FF] mr-1.5">&gt;&gt;</span>
                          {log}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AI Autocomplete suggestions box */}
                  <div className="bg-gradient-to-br from-indigo-950/20 to-blue-900/10 rounded-2xl border border-blue-500/20 p-4">
                     <h4 className="text-xs font-mono font-bold text-[#00A3FF] uppercase tracking-wider flex items-center gap-2">
                       <Sparkles className="w-4 h-4 animate-pulse text-[#00A3FF]" /> Smart Pilot Assist
                     </h4>
                     <p className="text-[11px] text-slate-400 mt-2 font-sans leading-relaxed">
                       You are currently optimizing: <span className="text-white font-mono">{activeProject.activeFile}</span>. Try referencing our dynamic roadmaps or use standard ES module imports.
                     </p>
                  </div>
                </div>

              </div>
            )}

            {/* VIEW 3: EVE × AI MENTOR CHAT SECTION */}
            {activeView === "chat" && (
              <div className="unai-glass p-5 rounded-2xl flex flex-col flex-1 h-[550px] relative">
                
                {/* Assistant identification header */}
                <div className="p-4 bg-[#0a0a0a] border border-white/10 rounded-xl flex items-center justify-between col-span-1 border-b mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-[#00A3FF]/10 flex items-center justify-center relative">
                      <Bot className="w-5 h-5 text-[#00A3FF] animate-float" />
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-unai-dark" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xs font-mono text-[#00A3FF] uppercase tracking-widest font-black">EVE VIRTUAL INTELLIGENCE</h3>
                      <p className="text-[11px] text-slate-400 font-sans leading-none">Powered by Gemini 3.5 Flash server-side LLM</p>
                    </div>
                  </div>
                  <span className="text-[9px] font-mono bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 text-[#00A3FF] rounded-full uppercase tracking-wider">
                    Synced with VIDYON Profile
                  </span>
                </div>

                {/* Messages stream log with custom scrolls */}
                <div className="flex-1 overflow-y-auto space-y-4 p-4 min-h-[300px] mb-4 bg-black/30 rounded-xl border border-white/5 select-text">
                  {mentorChatHistory.map((item) => {
                    const isAssistant = item.role === "assistant";
                    return (
                      <div
                        key={item.id}
                        className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed text-left ${
                          isAssistant
                            ? "bg-white/5 border border-white/5 text-slate-100 self-start mr-auto"
                            : "bg-blue-600/10 border border-blue-500/20 text-slate-100 self-end ml-auto"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                          <span className="font-mono text-[9px] text-[#00F0FF] uppercase tracking-wider">
                            {isAssistant ? "🤖 EVE AI Core" : "🔮 User Matrix Entity"}
                          </span>
                          <span className="text-[8px] font-mono text-slate-500">{item.timestamp}</span>
                        </div>
                        <div className="whitespace-pre-line font-medium break-words leading-relaxed text-slate-200">
                          {item.text}
                        </div>
                      </div>
                    );
                  })}

                  {isMentorLoading && (
                    <div className="bg-white/5 border border-white/5 p-4 rounded-2xl self-start mr-auto flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-bounce" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-bounce delay-150" />
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce delay-300" />
                      <span className="text-[10px] font-mono text-[#00A3FF] ml-2">EVE is compiling response matrices...</span>
                    </div>
                  )}
                </div>

                {/* Chat message inputs forms */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={mentorInput}
                    onChange={(e) => setMentorInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessageToMentor()}
                    placeholder="Ask EVE to explain a concept or build templates..."
                    className="flex-1 bg-unai-deep border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00F0FF] transition-all font-mono"
                  />
                  <button
                    onClick={handleSendMessageToMentor}
                    disabled={isMentorLoading || !mentorInput.trim()}
                    className="bg-[#00A3FF] hover:bg-[#00F0FF] text-black font-bold text-xs px-5 rounded-xl transition-all shadow-[0_0_15px_rgba(0,163,255,0.2)] select-none cursor-pointer disabled:opacity-50"
                  >
                    SYNC DISPATCH
                  </button>
                </div>
              </div>
            )}

            {/* VIEW 4: TECHNICAL INTERVIEW HUB */}
            {activeView === "interview" && (
              <div className="space-y-6">
                
                {/* Top selectors configuration row */}
                <div className="unai-glass p-5 rounded-2xl border border-white/10">
                  <h3 className="text-sm font-display font-bold text-white mb-4 flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-[#00A3FF]" /> Technical Mock Interview Configurator
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">Target Developer Role</label>
                      <select
                        value={interviewRole}
                        onChange={(e) => setInterviewRole(e.target.value)}
                        className="w-full bg-[#070707] border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#00A3FF] text-slate-200 font-mono"
                      >
                        <option value="AI Developer & Specialist">AI Developer & Specialist</option>
                        <option value="Full Stack React Engineer">Full Stack React Engineer</option>
                        <option value="Server Architect (Node / PostgreSQL)">Server Architect (Node / PostgreSQL)</option>
                        <option value="Cyber Security Auditor">Cyber Security Auditor</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1.5">Assessment Stage Round</label>
                      <select
                        value={interviewStage}
                        onChange={(e) => setInterviewStage(e.target.value)}
                        className="w-full bg-[#070707] border border-white/10 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#00A3FF] text-slate-200 font-mono"
                      >
                        <option value="Advanced System Design">Advanced System Design</option>
                        <option value="Data Structures & Algorithms">Data Structures & Algorithms</option>
                        <option value="Behavioral & Leadership Metrics">Behavioral & Leadership Metrics</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => {
                        const initMsg = {
                          id: `init_${Date.now()}`,
                          role: "assistant" as const,
                          text: `🦾 **UNAI Tech Technical Interview Simulator Initialized**\nRole: **${interviewRole}**\nStage: **${interviewStage}**\n\nWelcome! Let's examine architectural flow patterns. Explain how your code handles horizontal data caching scaling.`,
                          timestamp: new Date().toLocaleTimeString()
                        };
                        setInterviewHistory([initMsg]);
                      }}
                      className="text-[11px] font-mono font-bold bg-[#00A3FF] text-black px-4 py-2 rounded-lg hover:bg-[#00F0FF] transition-all cursor-pointer"
                    >
                      🚀 REBOOT SIMULATED INTERVIEW
                    </button>
                    <span className="text-[10px] font-mono text-slate-500 self-center">
                      (Resets state to align with current selectors parameters)
                    </span>
                  </div>
                </div>

                {/* Interview chat container */}
                <div className="unai-glass p-5 rounded-2xl flex flex-col h-[400px]">
                  <div className="flex-1 overflow-y-auto space-y-4 p-4 mb-4 bg-black/20 rounded-xl border border-white/5 select-text">
                    {interviewHistory.map((msg) => {
                      const isInterviewer = msg.role === "assistant";
                      return (
                        <div
                          key={msg.id}
                          className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed text-left ${
                            isInterviewer
                              ? "bg-white/5 border border-white/5 text-slate-100 mr-auto self-start"
                              : "bg-gradient-to-r from-blue-900/10 to-indigo-900/15 border border-slate-700 text-slate-100 ml-auto self-end"
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1.5 border-b border-white/5 pb-1">
                            <span className="font-mono text-[9px] text-[#00F0FF] uppercase tracking-wider">
                              {isInterviewer ? "🏢 Lead Interviewer Core" : "🎖️ Elite Candidate Response"}
                            </span>
                            <span className="text-[8px] font-mono text-slate-500">{msg.timestamp}</span>
                          </div>
                          <div className="whitespace-pre-line text-slate-200">
                            {msg.text}
                          </div>
                        </div>
                      );
                    })}

                    {isInterviewLoading && (
                      <div className="bg-white/5 p-4 rounded-2xl self-start flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00A3FF] animate-bounce" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-bounce delay-150" />
                        <span className="text-[10px] font-mono text-slate-500 ml-2">Lead Architect analyzing response telemetry...</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={interviewInput}
                      onChange={(e) => setInterviewInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSendInterviewResponse()}
                      placeholder="Type your explanation or design solution step-by-step..."
                      className="flex-1 bg-unai-deep border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-[#00A3FF] transition-all font-mono"
                    />
                    <button
                      onClick={handleSendInterviewResponse}
                      disabled={isInterviewLoading || !interviewInput.trim()}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 rounded-xl transition-all select-none cursor-pointer"
                    >
                      SUBMIT
                    </button>
                  </div>
                </div>

                {/* Score Report Preview */}
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 flex gap-4 text-xs font-sans text-slate-300">
                  <span className="text-3xl text-emerald-500">🏆</span>
                  <div>
                    <h4 className="font-bold text-slate-200">Continuous Assessment Report Generator</h4>
                    <p className="mt-1">
                      Our live score tracking calibrates your answers for optimal ATS results. Submit at least 2 conversational questions to gain deep statistics insights.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 5: PORTFOLIO & JOB CENTER (ATS SCANNERS) */}
            {activeView === "portfolio" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start">
                
                {/* Left side resume details */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="unai-glass p-5 rounded-2xl border border-white/10 text-left">
                    <h3 className="text-sm font-display font-bold text-white mb-3 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#00A3FF]" /> Live Resume ATS Scanner
                    </h3>
                    <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                      Warrant resume optimization relative to high-end roles. Paste text and let our AI alignment calculate structural gaps.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Target Tech Role</label>
                        <select
                          value={atsTargetJob}
                          onChange={(e) => setAtsTargetJob(e.target.value)}
                          className="w-full bg-[#070707] border border-white/10 rounded-xl p-2.5 text-xs text-slate-200 font-mono"
                        >
                          <option value="AI Full-Stack Software Engineer">AI Full-Stack Software Engineer</option>
                          <option value="Lead Mobile Native Engineer">Lead Mobile Native Engineer</option>
                          <option value="Cyber Security Red-Team Specialist">Cyber Security Red-Team Specialist</option>
                          <option value="Junior Python Developer">Junior Python Developer</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">Personal Resume Text</label>
                        <textarea
                          value={resumeText}
                          onChange={(e) => setResumeText(e.target.value)}
                          className="w-full bg-[#070707] border border-white/10 rounded-xl p-3 h-48 text-xs font-mono text-slate-200 outline-none leading-relaxed"
                          placeholder="Paste details..."
                          spellCheck={false}
                        />
                      </div>

                      <button
                        onClick={handleAtsAnalysis}
                        disabled={atsLoading}
                        className="w-full py-3 bg-[#00A3FF] text-black font-bold text-xs uppercase rounded-xl hover:bg-[#00F0FF] transition-all cursor-pointer disabled:opacity-50"
                      >
                        {atsLoading ? "Matrix Analyzing Text..." : "Activate ATS Compliance Scan"}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right side alignment reports */}
                <div className="lg:col-span-6 space-y-6">
                  <AnimatePresence mode="wait">
                    {atsResult ? (
                      <motion.div 
                        key="ats_result"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className="unai-glass p-5 rounded-2xl border border-white/15 text-left space-y-4"
                      >
                        <div className="flex justify-between items-center bg-[#070707] p-4 rounded-xl border border-white/5">
                          <div>
                            <span className="text-[9px] font-mono text-slate-500 uppercase">calculated ats fit</span>
                            <div className="text-2xl font-display font-medium text-[#00A3FF]">{atsResult.score}% Compliance</div>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] font-mono text-slate-500 uppercase">matching index</span>
                            <div className="text-xl font-mono font-medium text-emerald-400">{atsResult.matchingPercentage}% Sync</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5">Interviewer Constructive Feedback</h4>
                          <p className="text-xs text-slate-300 leading-relaxed bg-[#0c0c0c] p-3 rounded-lg border border-white/5 whitespace-pre-line select-text">
                            {atsResult.feedback}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5">Missing Core Competencies</h4>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {atsResult.missingSkills.map((sk) => (
                              <span key={sk} className="text-[10px] font-mono bg-red-500/10 hover:bg-red-500/15 border border-red-500/20 px-2 py-0.5 rounded text-red-400">
                                ➔ {sk}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5">Recommended Remediation Modules</h4>
                          <div className="space-y-1.5">
                            {atsResult.recommendedCourses.map((crs) => (
                              <div key={crs} className="text-xs bg-blue-500/5 border border-blue-500/15 px-3 py-2 rounded-lg text-slate-300 flex items-center space-x-2">
                                <span className="text-[#00A3FF]">●</span>
                                <span>{crs}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="h-px bg-white/5"></div>

                        {/* Simulate resume generation output exports */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              alert(`RESUME EXPORT SUCCESSFUL\nYour portfolio is now synced to VIDYON portal ID: ${profile.id}`);
                              setXp(p => p + 15);
                            }}
                            className="flex-1 py-2.5 bg-white/5 text-[10px] font-mono text-[#00A3FF] border border-white/10 rounded-lg hover:bg-white/10 transition-colors"
                          >
                            🚀 EXPORT COMPLIANT PDF
                          </button>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="unai-glass p-8 rounded-2xl border border-white/5 text-center flex flex-col items-center justify-center min-h-[300px]">
                        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 mb-3 animate-pulse">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <h4 className="font-display font-medium text-slate-300">Compliance Report Pending</h4>
                        <p className="text-xs text-slate-500 max-w-[250px] mx-auto mt-1.5 leading-relaxed">
                          Enter your details in the text area on the left and run the scanner to receive high-precision career indicators.
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            )}

            {/* VIEW 5.5: THE CLAN LEARNING GUILD SYSTEM */}
            {activeView === "guild" && (
              <Guild 
                profile={profile} 
                xp={xp} 
                onAddXp={(amount) => setXp(prev => prev + amount)} 
              />
            )}

            {/* VIEW 6: MANAGEMENT & ADMIN DASHBOARD */}
            {activeView === "admin" && (
              <div className="space-y-6">
                
                {/* Meta grid showing key telemetry analytics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { title: "SSO Active Users", value: "24,801", sub: "VIDYON ecosystem active", icon: ShieldCheck, color: "text-emerald-400" },
                    { title: "Generative Token Load", value: "4.8M", sub: "EVE model metrics daily", icon: Cpu, color: "text-[#00A3FF]" },
                    { title: "Consolidated Revenue", value: "$182,400", sub: "Enterprise licenses sync", icon: Trophy, color: "text-amber-400" },
                    { title: "Sandbox compilation rate", value: "98.92%", sub: "Zero cluster overhead", icon: Terminal, color: "text-[#00F0FF]" }
                  ].map((stat, idx) => {
                    const StatIcon = stat.icon;
                    return (
                      <div key={idx} className="unai-glass p-4 rounded-xl border border-white/10 text-left">
                        <div className="flex justify-between items-start">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block leading-none">{stat.title}</span>
                          <StatIcon className={`w-4 h-4 ${stat.color}`} />
                        </div>
                        <p className="text-xl font-display font-semibold mt-2 text-white">{stat.value}</p>
                        <span className="text-[9px] font-mono text-slate-500 block mt-1">{stat.sub}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Course Creator Manager (Administrative panel) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* Left listing */}
                  <div className="lg:col-span-8 unai-glass p-5 rounded-2xl border border-white/10 text-left space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="text-xs font-mono text-[#00A3FF] uppercase tracking-widest font-black">ACTIVE MATRIX CURRICULUMS</h4>
                        <p className="text-[10px] text-slate-500 font-sans mt-0.5">Define target glowing modules inside learning roadmaps</p>
                      </div>
                      <span className="text-[9px] font-mono bg-[#00A3FF]/10 border border-[#00A3FF]/20 px-2 py-0.5 rounded text-[#00A3FF]">
                        AUTH ROLE: {profile.role}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {adminCourses.map((crs) => (
                        <div 
                          key={crs.id}
                          className="p-3.5 bg-[#070707] border border-white/5 rounded-xl flex items-center justify-between hover:border-white/10 transition-colors"
                        >
                          <div className="flex items-center space-x-3 text-xs">
                            <span className="text-base">☄️</span>
                            <div>
                              <strong className="text-slate-200 font-display font-medium text-xs block">{crs.name}</strong>
                              <span className="text-[10px] font-mono text-slate-500">Track Orbit: {crs.category}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-6 text-xs font-mono">
                            <div className="text-right hidden sm:block">
                              <span className="text-[9px] text-[#00A3FF] uppercase tracking-widest block">enrollees</span>
                              <strong>{crs.enrollees} devs</strong>
                            </div>
                            <div className="text-right hidden sm:block">
                              <span className="text-[9px] text-[#00F0FF] uppercase tracking-widest block">pass rating</span>
                              <strong>{crs.tracking}% success</strong>
                            </div>
                            
                            <button
                              onClick={() => handleRemoveCourse(crs.id)}
                              className="text-slate-600 hover:text-red-400 p-1 rounded hover:bg-red-500/5"
                              title="Decommission Course"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right creator form */}
                  <div className="lg:col-span-4 unai-glass p-5 rounded-2xl border border-white/10 text-left space-y-4">
                    <h4 className="text-xs font-mono text-[#00A3FF] uppercase tracking-widest font-black">COURSE FABRICATOR</h4>
                    <p className="text-[10px] text-slate-400 leading-relaxed">
                      Warrant instant distribution across all synchronized platform nodes.
                    </p>

                    <div className="space-y-3 pt-2">
                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">Module Name</label>
                        <input
                          type="text"
                          value={newCourseName}
                          onChange={(e) => setNewCourseName(e.target.value)}
                          placeholder="e.g. LLM Orchestration v2"
                          className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00F0FF] font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-1">Track Category</label>
                        <select
                          value={newCourseCat}
                          onChange={(e) => setNewCourseCat(e.target.value)}
                          className="w-full bg-[#050505] border border-white/10 rounded-xl px-3 py-2 text-xs text-slate-200 font-mono"
                        >
                          <option value="AI">AI & GenAI</option>
                          <option value="Backend">Backend Systems</option>
                          <option value="Frontend">Frontend Dev</option>
                          <option value="Security">Cyber Security</option>
                        </select>
                      </div>

                      <button
                        onClick={handleAddCourse}
                        className="w-full py-2.5 bg-[#00F0FF] text-black font-semibold text-xs rounded-xl hover:bg-[#00A3FF] active:scale-95 transition-all text-center"
                      >
                        ⚡ Inject Into Roadmap
                      </button>
                    </div>

                    <div className="bg-amber-500/5 rounded-xl p-3 border border-amber-500/10 text-[9px] font-mono text-slate-500 mt-2 leading-relaxed">
                      ⚠️ Enterprise policy audit: Course deployment requires verified Admin role level synclinked via VIDYON SSO.
                    </div>
                  </div>

                </div>
              </div>
            )}

          </main>
        </div>

      </div>

      {/* 3. Bottom Terminal Status Bar exactly matching Design HTML */}
      <footer className="h-8 bg-[#00A3FF] flex items-center px-4 justify-between text-black font-black text-[10px] tracking-widest shrink-0">
        <div className="flex space-x-4">
          <span>SYSTEM STATE: OPTIMAL</span>
          <span className="hidden sm:inline">REGION: ASIA-SOUTH-1</span>
          <span className="hidden sm:inline">CONTAINER PORT: 3000</span>
        </div>
        <div className="flex space-x-4">
          <span>LATENCY: 24MS</span>
          <span>AI COMPILING SYNC: ACTIVE</span>
        </div>
      </footer>

    </div>
  );
}
