import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  CheckCircle2, 
  Lock, 
  PlayCircle, 
  Award, 
  BookOpen, 
  Sparkles, 
  Monitor, 
  Cpu, 
  Binary, 
  ShieldAlert, 
  SlidersHorizontal 
} from "lucide-react";
import { RoadmapNode } from "../types";

interface RoadmapProps {
  onNodeComplete: (xpGained: number) => void;
  completedNodes: string[];
}

export default function Roadmap({ onNodeComplete, completedNodes }: RoadmapProps) {
  const [activeTab, setActiveTab] = useState<"frontend" | "backend" | "python" | "ai" | "security">("frontend");
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [quizStatus, setQuizStatus] = useState<"idle" | "correct" | "incorrect">("idle");

  const categories = [
    { id: "frontend" as const, label: "Frontend Dev", icon: Monitor, desc: "HTML to Next.js frameworks" },
    { id: "backend" as const, label: "Backend Dev", icon: Cpu, desc: "Node.js, APIs & SQL/NoSQL" },
    { id: "python" as const, label: "Python Orbit", icon: Binary, desc: "Basics to neural automation" },
    { id: "ai" as const, label: "AI & GenAI", icon: Sparkles, desc: "Machine Learning & LLM systems" },
    { id: "security" as const, label: "Cyber Security", icon: ShieldAlert, desc: "Ethical hacking & network shields" }
  ];

  // Duolingo-style Roadmap Nodes
  const roadmapNodes: RoadmapNode[] = [
    // Frontend Track
    {
      id: "fe_html",
      title: "Structure HTML5",
      description: "Master modern semantic markup, tables, form validation and page outline guidelines.",
      status: "available",
      category: "frontend",
      estimatedXp: 50,
      lessonsCount: 3,
      challengeText: "Which HTML5 container element should be used to encapsulate self-contained composition (like a forum post or blog entry)?",
      optionsAnswers: ["<section>", "<article>", "<aside>", "<div>"],
      correctAnswer: "<article>"
    },
    {
      id: "fe_css",
      title: "Cascade CSS Grid",
      description: "Harness CSS Flexbox, Grid systems, adaptive media queries, and responsive design systems.",
      status: "locked",
      category: "frontend",
      estimatedXp: 60,
      lessonsCount: 4,
      challengeText: "In CSS Grid, what is the correct syntax to create a 3-column grid layout with equal widths?",
      optionsAnswers: [
        "grid-template-columns: repeat(3, 1fr);",
        "grid-template-columns: 1fr 1fr 1fr;",
        "grid-columns: 3;",
        "grid-template-columns: repeat(3, auto);"
      ],
      correctAnswer: "grid-template-columns: repeat(3, 1fr);"
    },
    {
      id: "fe_js",
      title: "Asynchronous JS",
      description: "Wield closures, callbacks, promises, and the Event Loop for concurrent flow orchestration.",
      status: "locked",
      category: "frontend",
      estimatedXp: 80,
      lessonsCount: 5,
      challengeText: "What sequence of code execution manages asynchronous REST APIs in contemporary JavaScript frameworks?",
      optionsAnswers: [
        "async / await",
        "setTimeout inline loop",
        "sync / block handlers",
        "Immediate try-catch pools"
      ],
      correctAnswer: "async / await"
    },
    {
      id: "fe_react",
      title: "React Virtual DOM",
      description: "Learn functional components, state synchronization Hooks, and reconciliations.",
      status: "locked",
      category: "frontend",
      estimatedXp: 100,
      lessonsCount: 6,
      challengeText: "Which React hook should you use to memorize a computationally expensive function return value to prevent redundant calculations?",
      optionsAnswers: ["useEffect()", "useMemo()", "useCallback()", "useState()"],
      correctAnswer: "useMemo()"
    },
    {
      id: "fe_next",
      title: "Next.js SSR Systems",
      description: "Grasp Server Side Rendering (SSR), App Routing configurations, and page pre-rendering.",
      status: "locked",
      category: "frontend",
      estimatedXp: 120,
      lessonsCount: 5,
      challengeText: "Which directory-based layout system manages routes inside current Next.js 13+ production standards?",
      optionsAnswers: ["The pages directory", "The app directory", "The routes folder", "The server.ts entry"],
      correctAnswer: "The app directory"
    },

    // Backend Track
    {
      id: "be_node",
      title: "Node.js Platform",
      description: "Learn the event loop, V8 engine dynamics, file operations, and buffer streams.",
      status: "available",
      category: "backend",
      estimatedXp: 60,
      lessonsCount: 3,
      challengeText: "Which core Node.js module provides access to directory querying, path splicing, and platform-specific dividers?",
      optionsAnswers: ["fs", "path", "http", "os"],
      correctAnswer: "path"
    },
    {
      id: "be_express",
      title: "Express.js Middlewares",
      description: "Intercept and modulate requests, configure cross-origin resource sharing, and set body parsers.",
      status: "locked",
      category: "backend",
      estimatedXp: 70,
      lessonsCount: 4,
      challengeText: "What is the correct syntax to create a mock logging middleware interceptor inside an Express app instance?",
      optionsAnswers: [
        "app.use((req, res, next) => { console.log(); next(); });",
        "app.get((req) => { console.log(); });",
        "app.middleware((req, res) => {});",
        "app.use(express.static());"
      ],
      correctAnswer: "app.use((req, res, next) => { console.log(); next(); });"
    },
    {
      id: "be_db",
      title: "Databases & Engines",
      description: "Understand SQL tables vs. Document stores (NoSQL), write queries, and perform indexations.",
      status: "locked",
      category: "backend",
      estimatedXp: 90,
      lessonsCount: 5,
      challengeText: "Which keyword is utilized to retrieve specific intersection listings across multiple target tables in relational PostgreSQL databases?",
      optionsAnswers: ["UNION", "JOIN", "INTERSECT", "ATTACH"],
      correctAnswer: "JOIN"
    },

    // Python Track
    {
      id: "py_basics",
      title: "Python Fundamentals",
      description: "Master list comprehensions, dictionary indexing, loops, and generator pipelines.",
      status: "available",
      category: "python",
      estimatedXp: 50,
      lessonsCount: 3,
      challengeText: "What is the output of the following list comprehension: [x*2 for x in range(3)]?",
      optionsAnswers: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[1, 2, 3]"],
      correctAnswer: "[0, 2, 4]"
    },
    {
      id: "py_oop",
      title: "Pythonic OOP",
      description: "Grasp classes, inheritance, dunder helper methods, and polymorphic structures.",
      status: "locked",
      category: "python",
      estimatedXp: 70,
      lessonsCount: 4,
      challengeText: "Which keyword represents the current object context reference inside Python method structures?",
      optionsAnswers: ["this", "self", "init", "cls"],
      correctAnswer: "self"
    },

    // AI Track
    {
      id: "ai_math",
      title: "Vector Linear Algebra",
      description: "Wield matrices, eigenvalues, derivatives, and backpropagation calculations.",
      status: "available",
      category: "ai",
      estimatedXp: 70,
      lessonsCount: 4,
      challengeText: "Which activation function is highly favored in hidden layers of deep networks because it resolves vanishing gradient issues?",
      optionsAnswers: ["Sigmoid", "ReLU", "Tanh", "Softmax"],
      correctAnswer: "ReLU"
    },
    {
      id: "ai_llm",
      title: "Transformer & Attention",
      description: "Study query-key-value vectors, self-attention calculations, and context windows.",
      status: "locked",
      category: "ai",
      estimatedXp: 110,
      lessonsCount: 5,
      challengeText: "In self-attention mechanisms, which vectors calculate the relative importance of words relative to each other?",
      optionsAnswers: [
        "Query, Key, and Value vectors",
        "Direct scalar coefficients",
        "Stochastic gradient vectors",
        "Layer normalization weights"
      ],
      correctAnswer: "Query, Key, and Value vectors"
    },
    {
      id: "ai_dev",
      title: "@google/genai Models",
      description: "Build server-side multi-modular agent integrations, function call schemes, and RAG pipelines.",
      status: "locked",
      category: "ai",
      estimatedXp: 150,
      lessonsCount: 6,
      challengeText: "When implementing a Gemini 3 series model using the @google/genai SDK, what is the official initialization structure?",
      optionsAnswers: [
        "const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })",
        "const client = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)",
        "declare var GoogleGenAI = process.env.GEMINI_API_KEY",
        "const ai = ai.models.create('gemini')"
      ],
      correctAnswer: "const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })"
    },

    // Cyber Security Track
    {
      id: "sec_web",
      title: "Web Interception Pentesting",
      description: "Master Cross-Site Scripting (XSS), SQL Injections, and CSRF protective headers.",
      status: "available",
      category: "security",
      estimatedXp: 70,
      lessonsCount: 4,
      challengeText: "Which mechanism prevents malicious scripts from hijacking authorization Cookie headers via client-side scripts?",
      optionsAnswers: ["HttpOnly flag", "SameSite lax setting", "JSON Web Encryption", "CORS header bounds"],
      correctAnswer: "HttpOnly flag"
    }
  ];

  // Helper to figure out actual visual status of a node
  const getNodeStatus = (node: RoadmapNode) => {
    if (completedNodes.includes(node.id)) return "completed";
    
    // Check order (unlock nodes sequentially within category)
    const categoryNodes = roadmapNodes.filter(n => n.category === node.category);
    const nodeIndex = categoryNodes.findIndex(n => n.id === node.id);
    
    if (nodeIndex === 0) return "available";
    
    const prevNodeId = categoryNodes[nodeIndex - 1].id;
    if (completedNodes.includes(prevNodeId)) return "available";
    
    return "locked";
  };

  const activeNodes = roadmapNodes.filter(node => node.category === activeTab);

  const handleOpenQuiz = (node: RoadmapNode) => {
    const status = getNodeStatus(node);
    if (status === "locked") return; // cannot play locked

    // Read details
    setSelectedNode(node);
    setUserAnswer("");
    setQuizStatus("idle");
  };

  const handleVerifyAnswer = () => {
    if (!selectedNode) return;
    if (userAnswer === selectedNode.correctAnswer) {
      setQuizStatus("correct");
      onNodeComplete(selectedNode.estimatedXp);
    } else {
      setQuizStatus("incorrect");
    }
  };

  const handleCloseQuiz = () => {
    setSelectedNode(null);
    setUserAnswer("");
    setQuizStatus("idle");
  };

  return (
    <div id="roadmap_module" className="min-h-full flex flex-col space-y-6">
      
      {/* Category selector */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {categories.map((cat) => {
          const IconComponent = cat.icon;
          const isActive = activeTab === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setSelectedNode(null);
              }}
              className={`unai-glass px-4 py-4 rounded-2xl flex flex-col items-center text-center transition-all relative overflow-hidden group ${
                isActive 
                  ? "border-unai-blue/40 bg-unai-deep/50 shadow-[0_0_15px_rgba(0,240,255,0.15)] scale-[1.02]" 
                  : "hover:scale-[1.01] hover:border-slate-800"
              }`}
            >
              {isActive && (
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-unai-blue to-transparent" />
              )}
              <div className={`p-2.5 rounded-xl mb-2 transition-all ${isActive ? "bg-unai-blue/10 text-unai-blue" : "bg-slate-900 text-slate-500 group-hover:text-slate-350"}`}>
                <IconComponent className="w-5 h-5" />
              </div>
              <span className={`text-xs font-display font-medium block truncate w-full ${isActive ? "text-unai-blue" : "text-slate-400"}`}>
                {cat.label}
              </span>
              <p className="text-[10px] font-sans text-slate-500 mt-1 truncate w-full hidden sm:block">
                {cat.desc}
              </p>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Dynamic Duolingo snake nodes tree (Left Col) */}
        <div className="lg:col-span-7 flex flex-col items-center bg-unai-deep/15 border border-slate-900 py-12 px-4 rounded-3xl relative min-h-[450px]">
          {/* Subtle connecting vertical line */}
          <div className="absolute top-12 bottom-12 w-[3px] bg-gradient-to-b from-unai-blue/20 via-unai-purple/10 to-unai-neon/10" />

          <div className="relative space-y-12 w-full flex flex-col items-center">
            {activeNodes.map((node, index) => {
              const status = getNodeStatus(node);
              // Shift nodes alignment snake-style (Alternating offsets left / middle / right)
              const alignments = ["translate-x-0", "translate-x-[-30px] sm:translate-x-[-65px]", "translate-x-0", "translate-x-[30px] sm:translate-x-[65px]"];
              const offsetClass = alignments[index % alignments.length];

              return (
                <div 
                  key={node.id} 
                  className={`flex flex-col items-center transition-all ${offsetClass}`}
                >
                  {/* Circular Duolingo Node Button */}
                  <button
                    onClick={() => handleOpenQuiz(node)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center relative cursor-pointer active:scale-90 transition-all ${
                      status === "completed" 
                        ? "bg-transparent border-2 border-unai-neon/90 text-unai-neon font-bold shadow-[0_0_15px_rgba(57,255,20,0.25)]" 
                        : status === "available"
                        ? "bg-gradient-to-r from-unai-blue to-unai-purple border-2 border-white text-unai-dark font-black tracking-widest shadow-[0_0_20px_rgba(0,240,255,0.4)]"
                        : "bg-slate-950 border-2 border-slate-800 text-slate-600 cursor-not-allowed"
                    }`}
                  >
                    {/* Ring wrapper for current lesson active pulses */}
                    {status === "available" && (
                      <div className="absolute inset-[-4px] rounded-full border-2 border-unai-blue/30 animate-ping opacity-60" />
                    )}

                    {status === "completed" ? (
                      <CheckCircle2 className="w-6 h-6 stroke-[3]" />
                    ) : status === "available" ? (
                      <PlayCircle className="w-6 h-6 stroke-[2]" />
                    ) : (
                      <Lock className="w-5 h-5" />
                    )}

                    {/* Quick floaty XP tooltip */}
                    <span className="absolute -top-6 bg-slate-900 border border-slate-800 text-[9px] px-2 py-0.5 rounded-full font-mono text-slate-400 whitespace-nowrap shadow-md">
                      +{node.estimatedXp} XP
                    </span>
                  </button>

                  {/* Title and Badge indicators below circle */}
                  <div className="text-center mt-3 max-w-[150px]">
                    <span className={`text-xs font-display font-medium block truncate ${
                      status === "completed" ? "text-unai-neon" : status === "available" ? "text-white" : "text-slate-500"
                    }`}>
                      {node.title}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {node.lessonsCount} milestones
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lesson Quiz Details panel (Right Col) */}
        <div id="quiz_panel" className="lg:col-span-5 h-full">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div 
                key={selectedNode.id}
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="unai-glass p-6 rounded-3xl border border-unai-blue/20 relative"
              >
                {/* Visual glowing top bar */}
                <div className={`absolute top-0 inset-x-0 h-[2px] transition-all ${
                  quizStatus === "correct" ? "bg-unai-neon" : quizStatus === "incorrect" ? "bg-red-500" : "bg-unai-blue"
                }`} />

                <div className="flex justify-between items-center mb-4">
                  <span className="px-2.5 py-1 rounded bg-slate-900 text-[10px] border border-slate-800 font-mono text-unai-blue uppercase tracking-wider">
                    MODULE ACTIVE
                  </span>
                  <button 
                    onClick={handleCloseQuiz}
                    className="text-slate-500 hover:text-white font-mono text-xs cursor-pointer border border-slate-800 px-2 py-1 rounded hover:bg-slate-900"
                  >
                    ✕ CANCEL
                  </button>
                </div>

                <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-unai-blue" />
                  {selectedNode.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 font-sans leading-relaxed">
                  {selectedNode.description}
                </p>

                {/* Simulated Content segment */}
                <div className="bg-unai-deep/50 rounded-2xl p-4 my-4 border border-slate-900 text-xs font-mono text-slate-300">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-2">EVE Sync Lesson Material</div>
                  Our target learning compilers optimize system throughput. Review the micro challenge details below and click the correct matching response variables.
                </div>

                <div className="space-y-4 pt-2">
                  <div className="text-sm font-sans text-slate-200 bg-slate-950 p-4 border border-slate-900 rounded-xl whitespace-pre-line">
                    {selectedNode.challengeText}
                  </div>

                  {/* Multiple Choice interactive answers */}
                  <div className="space-y-2">
                    {selectedNode.optionsAnswers?.map((option, idx) => {
                      const isSelected = userAnswer === option;
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (quizStatus === "idle") {
                              setUserAnswer(option);
                            }
                          }}
                          className={`w-full p-3 rounded-xl text-left text-xs font-mono border transition-all ${
                            isSelected 
                              ? "bg-slate-900 border-unai-blue text-unai-blue" 
                              : "bg-unai-deep/80 border-slate-900 text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] bg-slate-900 px-1.5 py-0.5 border border-slate-800 rounded font-bold">{idx + 1}</span>
                            {option}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback panel depending on state */}
                  {quizStatus === "correct" && (
                    <div className="bg-unai-neon/10 border border-unai-neon/30 rounded-xl p-4 flex gap-3 text-unai-neon text-xs">
                      <Award className="w-5 h-5 shrink-0" />
                      <div>
                        <strong>Quantum Compiling Positive:</strong> Unlocked next solar orbital nodes and syncing +{selectedNode.estimatedXp} XP to your general leaderboard scorecard!
                      </div>
                    </div>
                  )}

                  {quizStatus === "incorrect" && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-xs text-left">
                      <strong>Calibration Error:</strong> Incorrect compilation choice. Try again to sync neural grids.
                    </div>
                  )}

                  <div className="pt-2 flex gap-2">
                    {quizStatus === "correct" ? (
                      <button
                        onClick={handleCloseQuiz}
                        className="w-full py-3 bg-unai-neon text-unai-dark font-sans font-bold text-xs rounded-xl hover:scale-[1.01] transition-all cursor-pointer"
                      >
                        Proceed to Next Orbit
                      </button>
                    ) : (
                      <button
                        disabled={!userAnswer}
                        onClick={handleVerifyAnswer}
                        className="w-full py-3 bg-unai-blue disabled:opacity-45 disabled:cursor-not-allowed text-unai-dark font-sans font-bold text-xs rounded-xl hover:scale-[1.01] transition-all cursor-pointer"
                      >
                        Verify compilation parameters
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="unai-glass p-8 rounded-3xl border border-slate-900 text-center flex flex-col justify-center items-center h-full min-h-[350px]">
                <div className="w-12 h-12 rounded-full border border-slate-800 flex items-center justify-center mb-4 text-slate-500 animate-pulse">
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <h4 className="font-display font-medium text-slate-300">Milestone Calibration Ready</h4>
                <p className="text-xs text-slate-500 max-w-[250px] mx-auto mt-2 leading-relaxed">
                  Select any active glowing circle nodes along your vertical roadmap snake to start interactive compiling challenges.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
