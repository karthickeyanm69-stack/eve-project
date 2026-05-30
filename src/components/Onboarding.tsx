import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Rocket, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Languages, 
  Code, 
  User, 
  Terminal,
  Trophy,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Globe,
  Settings,
  Check,
  CheckCircle,
  Cpu,
  Mail,
  Smartphone,
  Link,
  ChevronRight,
  GraduationCap,
  Sparkle,
  Briefcase,
  Layers,
  CheckCircle2,
  AlertCircle,
  FileText
} from "lucide-react";
import { VidyonProfile, UserRole } from "../types";

interface OnboardingProps {
  onComplete: (profile: VidyonProfile, initialXp: number, testScore: number) => void;
}

// Global Avatar Matrix
const AVATARS = ["🤖", "🔮", "🛡️", "⚔️", "⚙️", "🦊", "👾", "🚀", "🧠", "🧙‍♂️"];

// Programming Interests Catalog with Adaptive Explanation Quiz questions
const QUESTION_CATALOG: Record<string, any[]> = {
  "Python": [
    {
      question: "Which python keyword is used to handle exceptions caught during structured trial executions?",
      options: ["catch", "except", "throws", "rescue"],
      correctIndex: 1,
      explanation: "Python uses 'try...except' blocks to handle exceptions, unlike Java or C++ which use 'catch'."
    },
    {
      question: "What is the primary operational performance difference between a Tuple and a List in Python?",
      options: [
        "Tuples support key-value hashes, Lists do not",
        "Lists are mutable arrays; Tuples are immutable static structures",
        "Tuples require double memory space allocation",
        "Lists use binary searches internally"
      ],
      correctIndex: 1,
      explanation: "Lists are mutable and can scale dynamically, whereas Tuples are allocated a static fixed size at creation, making them immutable and faster."
    }
  ],
  "Java": [
    {
      question: "Which modifier prevents a class from being inherited or extended by an external subclass in Java?",
      options: ["static", "abstract", "final", "private"],
      correctIndex: 2,
      explanation: "The 'final' keyword on a class prevents inheritance. On a method, it prevents overriding, and on variables, it prevents reassignment."
    }
  ],
  "JavaScript": [
    {
      question: "Regarding JS engines, what is the key difference in queuing priority between Microtasks and Macrotasks?",
      options: [
        "Macrotasks override all active microtask checks",
        "The microtask queue executes completely before the next macrotask starts",
        "Microtasks operate synchronously within the main call stack",
        "They share a single first-in-first-out transaction register"
      ],
      correctIndex: 1,
      explanation: "After each task in the macrotask event loop completes, the engine processes all tasks in the Microtask Queue before moving to the next macrotask."
    },
    {
      question: "What is the primary action performed by JavaScript's \"strict mode\" ('use strict') directive?",
      options: [
        "Compiles the script directly to native device machine vectors",
        "Forces global variables to be allocated inside localized arrays",
        "Suppresses benign reference warnings during runtime",
        "Converts silent errors into explicit runtime throw exceptions"
      ],
      correctIndex: 3,
      explanation: "'use strict' enforces strict coding guidelines, converting mistakes that normally fail silently (like double variable declaration) into explicit exceptions."
    }
  ],
  "C": [
    {
      question: "Which allocator allocates contiguous memory space in C and initializes every bit of the block to zero?",
      options: ["malloc()", "calloc()", "realloc()", "sbrk()"],
      correctIndex: 1,
      explanation: "calloc() takes number of units and byte size, allocates the product contiguous memory, and zeroes out every single allocated bit."
    }
  ],
  "C++": [
    {
      question: "What is the underlying philosophy behind C++ RAII (Resource Acquisition Is Initialization)?",
      options: [
        "Resource handlers must be registered in global abstract scopes",
        "Memory resources are tied to class instances and released automatically during stack destruction",
        "Allows dynamic casting across deep base nodes",
        "Increases throughput by omitting virtual destructor calls"
      ],
      correctIndex: 1,
      explanation: "RAII ties resource lifetimes (sockets, files, memory) to the lifetime of scoped objects. When the object goes out of scope, its destructor is called, releasing the resource automatically."
    }
  ],
  "AI & Machine Learning": [
    {
      question: "What is the primary output function of a Softmax activation unit inside multiclass neural classifiers?",
      options: [
        "Squashes logits into a sum-to-one probability distribution",
        "Prevents neural weights from exploding into infinite scopes",
        "Performs spatial downsampling of multi-dimensional feature graphs",
        "Introduces sparse rectifying linear filters"
      ],
      correctIndex: 0,
      explanation: "The Softmax function translates an arbitrary vector of real values (logits) into a probability distribution summing strictly to 1."
    },
    {
      question: "In transformer architectures, what is the main purpose of the Self-Attention mechanism?",
      options: [
        "Compiles weights down to 8-bit precision models",
        "Computes contextual relationship weights between any two tokens in a sequence, mapping long-range dependencies",
        "Implements strict regularized dropout across dense linear layers",
        "Prunes low-weight vector cells to boost throughput"
      ],
      correctIndex: 1,
      explanation: "Self-attention enables tokens to dynamically weigh their relative contexts against other tokens in a sentence, capturing relationships regardless of distance."
    }
  ],
  "Data Science": [
    {
      question: "Why should we prefer Adjusted R-squared over standard R-squared when assessing multiple regression graphs?",
      options: [
        "Adjusted R-squared is simpler to compute over multi-threaded nodes",
        "Standard R-squared increases artificially with every inserted independent variable, whereas Adjusted R-squared penalizes meaningless parameters",
        "Standard R-squared cannot handle negative slope rates",
        "Standard R-squared is prone to extreme logarithmic scaling skew"
      ],
      correctIndex: 1,
      explanation: "Standard R-squared increases or stays identical as more predictors are added. Adjusted R-squared adjusts for the number of predictors, penalizing arbitrary features."
    }
  ],
  "Cyber Security": [
    {
      question: "How does a Cross-Site Request Forgery (CSRF) vulnerability exploit a target client's session state?",
      options: [
        "Infiltrates physical memory registers on local routers",
        "Tricks a browser into transmitting authentic credentials and cookies to an authenticated domain on behalf of a malicious app",
        "Exposes backend database server structures via query injecting errors",
        "Corrupts local browser caches to steal active workspace passwords"
      ],
      correctIndex: 1,
      explanation: "CSRF forces an end user's web browser to execute unwanted actions on a trusted application where they are active, because browsers automatically attach session credentials of that target domain."
    }
  ]
};

// Standard general computer science questions to backfill if fewer than 5 are selected
const GENERAL_AI_QUESTIONS = [
  {
    question: "What refers to an elegant layout design boundary representing a single-view constraint in simple UI requests?",
    options: ["Multi-page navigation flow", "Modular bento-box with single-screen structural layouts", "Heavy persistent sidebars on mobile screens", "Infinite loading client drawers"],
    correctIndex: 1,
    explanation: "Simple requests should target a single screen, structured within modular bento grids, with zero persistent navigation tabs or redundant sidebars."
  },
  {
    question: "What is the primary function of the index.html entry-point inside standard React environments?",
    options: ["Compiles the Node.js Express server-side routes", "Serves the primary DOM structure mounted by the main bundle script", "Performs direct database telemetry syncs", "Executes strict JWT authorization checks"],
    correctIndex: 1,
    explanation: "index.html serves as the bootstrap page, embedding the script entry-point to mount the React component hierarchy."
  },
  {
    question: "Which of the following describes the execution pattern of React's useState hooks?",
    options: [
      "Triggers immediate synchronous block locks",
      "Schedules local state updates asynchronously, triggering subsequent component re-renders",
      "Bypasses the virtual DOM to update real elements synchronously",
      "Establishes a persistent Firestore database stream"
    ],
    correctIndex: 1,
    explanation: "State schedules are queued asynchronously. Re-rendering updates variables, keeping references consistent within the render context cycle."
  }
];

export default function Onboarding({ onComplete }: OnboardingProps) {
  // Numeric steps tracker from 1 to 9
  const [step, setStep] = useState<number>(1);
  
  // Profile / Identity States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState<UserRole>("Student");
  const [avatar, setAvatar] = useState("🤖");
  const [isVidyonSso, setIsVidyonSso] = useState(false);
  const [isSsoLoading, setIsSsoLoading] = useState(false);

  // LinkedIn, GitHub, and Portfolio fields
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");

  // Step 2: Language Preferred
  const [preferredLanguage, setPreferredLanguage] = useState("English");

  // Step 3: Academic / Certificate Sync
  const [hasCompletedCourses, setHasCompletedCourses] = useState<boolean | null>(null);
  const [platformName, setPlatformName] = useState("");
  const [portfolioLinks, setPortfolioLinks] = useState("");
  const [certificateFile, setCertificateFile] = useState<{name: string, size: string} | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [isUploadingSimulated, setIsUploadingSimulated] = useState(false);

  // Step 4: Programming Interests
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["Python", "JavaScript", "AI & Machine Learning"]);

  // Step 5: Study Hours
  const [studySlot, setStudySlot] = useState("Flexible");

  // Step 7: Learning Journeys (Dashboard path pathways)
  const [enrolledJourneys, setEnrolledJourneys] = useState<string[]>(["Web Development", "AI"]);

  // Step 8: Objective
  const [learningObjective, setLearningObjective] = useState("Placement Preparation");

  // Step 9: Quiz state managers
  const [quizStage, setQuizStage] = useState<"intro" | "live" | "report">("intro");
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]); // User selected index matching each question
  const [showExplanation, setShowExplanation] = useState(false);

  // Sync profile details when Continue with Vidyon SSO is activated
  const handleVidyonSso = () => {
    setIsSsoLoading(true);
    setTimeout(() => {
      setIsSsoLoading(false);
      setIsVidyonSso(true);
      setName("Karthickeyan M");
      setEmail("karthickeyanm69@gmail.com");
      setPhoneNumber("9840244821");
      setRole("Student");
      setAvatar("🚀");
      setStep(2); // Progress directly to Language selection
    }, 1800);
  };

  // Generate the adaptive dynamic assessment questions based on chosen programming interests
  const generateAdaptiveQuiz = () => {
    let pool: any[] = [];
    selectedTopics.forEach((topic) => {
      const qList = QUESTION_CATALOG[topic];
      if (qList && qList.length > 0) {
        pool = [...pool, ...qList];
      }
    });

    // Fill the rest from the general programming list
    let idx = 0;
    while (pool.length < 5 && idx < GENERAL_AI_QUESTIONS.length) {
      pool.push(GENERAL_AI_QUESTIONS[idx]);
      idx++;
    }

    // Slice to exactly 5 questions
    const finalSet = pool.slice(0, 5);
    setQuizQuestions(finalSet);
    setQuizAnswers(new Array(finalSet.length).fill(-1));
    setCurrentQuizIndex(0);
    setShowExplanation(false);
    setQuizStage("live");
  };

  // Form validations for each step before advancing
  const isStepValid = () => {
    if (step === 2) {
      return !!preferredLanguage && selectedTopics.length > 0;
    }
    if (step === 3) {
      const isNameValid = name.trim().length > 0;
      const isEmailValid = email.includes("@") && email.includes(".");
      const digitsOnly = phoneNumber.replace(/\D/g, "");
      const isPhoneValid = digitsOnly.length === 10;
      return isNameValid && isEmailValid && isPhoneValid;
    }
    if (step === 4) {
      return enrolledJourneys.length > 0;
    }
    return true;
  };

  const handleNext = () => {
    if (step === 5) {
      setStep(6);
      setQuizStage("intro");
    } else if (step < 5) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // File simulated drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const handleDragLeave = () => {
    setIsDraggingFile(false);
  };

  const handleDropFile = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      simulateFileUpload(files[0].name, files[0].size);
    }
  };

  const triggerMockUpload = () => {
    simulateFileUpload("nptel_cert_compilers.pdf", 2145800);
  };

  const simulateFileUpload = (fileName: string, fileSizeVal: number) => {
    setIsUploadingSimulated(true);
    setTimeout(() => {
      setIsUploadingSimulated(false);
      const sizeStr = (fileSizeVal / (1024 * 1024)).toFixed(2) + " MB";
      setCertificateFile({ name: fileName, size: sizeStr });
    }, 1200);
  };

  // Manage individual programming interests selection
  const handleToggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setSelectedTopics(selectedTopics.filter((t) => t !== topic));
    } else {
      setSelectedTopics([...selectedTopics, topic]);
    }
  };

  // Manage dashboard tracks selection
  const handleToggleJourney = (journey: string) => {
    if (enrolledJourneys.includes(journey)) {
      setEnrolledJourneys(enrolledJourneys.filter((j) => j !== journey));
    } else {
      setEnrolledJourneys([...enrolledJourneys, journey]);
    }
  };

  // Quiz interactive responders
  const handleSelectQuizAnswer = (optionIdx: number) => {
    const updated = [...quizAnswers];
    updated[currentQuizIndex] = optionIdx;
    setQuizAnswers(updated);
    setShowExplanation(true);
  };

  const handleNextQuizQuestion = () => {
    setShowExplanation(false);
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setQuizStage("report");
    }
  };

  // Compute final aggregated results
  const getQuizScore = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleFinishOnboarding = () => {
    const correctCount = getQuizScore();
    const finalScoreFloat = (correctCount / quizQuestions.length) * 100;
    const initialAwardedXp = 250 + (correctCount * 150); // 250 Base + 150 XP per correct question

    const finalProfile: VidyonProfile = {
      id: isVidyonSso ? "VIDYON-4482-991" : `LOCAL-${Math.floor(Math.random() * 8999) + 1000}`,
      email: email || "cadet@unaitech.space",
      name: name || "Galaxy Explorer",
      avatar: avatar,
      role: role,
      isVidyonSso: isVidyonSso,
      educationLevel: "Self Learner",
      experienceLevel: selectedTopics.includes("AI & Machine Learning") ? "Intermediate" : "Beginner",
      goals: [learningObjective, ...enrolledJourneys],
      preferredLanguage: preferredLanguage,
      interests: selectedTopics
    };

    onComplete(finalProfile, initialAwardedXp, finalScoreFloat);
  };

  return (
    <div id="onboarding_universe" className="min-h-screen bg-gradient-to-b from-[#050b1a] via-[#070e24] to-[#081229] text-white flex flex-col justify-between items-center p-4 relative overflow-hidden select-none">
      
      {/* Aesthetic ambient lighting controls */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 rounded-full bg-cyan-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 rounded-full bg-purple-500/10 blur-[140px] pointer-events-none" />

      {/* Top Banner Branding Header */}
      <header className="w-full max-w-4xl flex justify-between items-center py-4 px-6 mb-2 border-b border-white/5 bg-[#050b1a]/40 backdrop-blur-md rounded-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 bg-gradient-to-br from-cyan-400 to-indigo-500 rounded-lg flex items-center justify-center shadow-[0_0_12px_rgba(0,163,255,0.3)]">
            <span className="text-black font-black text-[10px]">E×U</span>
          </div>
          <div>
            <h2 className="text-sm font-bold tracking-tighter uppercase font-display">
              EVE <span className="text-cyan-400 font-light">×</span> UNAI
            </h2>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
            System Calibrator
          </span>
        </div>
      </header>

      {/* Loading overlay for SSO verification */}
      {isSsoLoading && (
        <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="unai-glass p-8 rounded-3xl border border-cyan-500/30 flex flex-col items-center max-w-sm text-center space-y-6"
          >
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-2 border-cyan-400/20 border-t-cyan-400 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Settings className="w-5 h-5 text-cyan-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h3 className="font-display font-medium text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                VIDYON SECURE OAUTH
              </h3>
              <p className="text-[10px] font-mono text-slate-400 mt-2">Authenticating credentials...</p>
            </div>
            <div className="bg-[#101430]/60 border border-white/5 rounded-xl p-3 text-left w-full space-y-1">
              <span className="text-[9px] font-mono text-slate-400 block truncate">HOST: <span className="text-cyan-400">auth.vidyon.com/sync</span></span>
              <span className="text-[9px] font-mono text-slate-400 block truncate">TOKEN: <span className="text-cyan-400">GRANTED_SESSION_OK</span></span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Primary Transition Interactive Deck Container */}
      <div className="flex-1 w-full max-w-4xl flex items-center justify-center py-6">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: WELCOME & LANDING SCREEN */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl text-center space-y-6"
            >
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-[#00ffff] to-[#7f00ff] blur-2xl rounded-full opacity-40 animate-pulse" />
                  <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-[#00ffff] to-[#7f00ff] p-[2px] shadow-[0_0_25px_rgba(0,163,255,0.4)]">
                    <div className="w-full h-full bg-[#050b1a] rounded-[18px] flex items-center justify-center">
                      <Sparkles className="w-9 h-9 text-white animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-center mb-1">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-300">
                    Meet EVE & UNAI
                  </span>
                </h1>
                <p className="text-xs font-mono tracking-widest uppercase text-cyan-400 font-bold">
                  Learn. Build. Grow with AI.
                </p>
              </div>

              <div className="bg-[#101430]/40 border border-white/5 rounded-2xl p-6 text-center max-w-lg mx-auto">
                <p className="text-slate-300 text-sm font-sans leading-relaxed">
                  Combining lessons, interactive skill assessment, visual curriculum trees, and playgrounds personalized for Indian professionals & students.
                </p>
              </div>

              {/* Login SSO vs Local Access Controls styled elegantly */}
              <div className="w-full max-w-md mx-auto space-y-4">
                <button
                  id="btn_sso_vidyon"
                  onClick={handleVidyonSso}
                  className="w-full py-3.5 px-6 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 text-black font-display font-medium rounded-xl hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,163,255,0.2)] cursor-pointer"
                >
                  <Rocket className="w-4 h-4 fill-black" />
                  Continue with VIDYON SSO
                </button>

                <div className="flex items-center my-4">
                  <div className="flex-1 h-[1px] bg-white/5" />
                  <span className="px-4 text-[10px] font-mono text-slate-500 uppercase tracking-wider">or local access setup</span>
                  <div className="flex-1 h-[1px] bg-white/5" />
                </div>

                <div className="bg-[#050510]/50 border border-white/10 rounded-2xl p-6 text-left space-y-4">
                  <div>
                    <label className="block text-left text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                      Local Codename
                    </label>
                    <input
                      id="input_onboarding_name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. AstroCoder"
                      className="w-full bg-[#1b203c]/40 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-white transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                      Email Address
                    </label>
                    <input
                      id="input_onboarding_email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. cadet@unaitech.space"
                      className="w-full bg-[#1b203c]/40 border border-white/10 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-white transition-all font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-left text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 font-bold">
                      Ecosystem Role
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(["Student", "Mentor", "Admin", "Others"] as UserRole[]).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`py-2 rounded-lg text-[10px] font-mono border transition-all ${
                            role === r
                              ? "bg-cyan-500/10 border-cyan-400 text-cyan-400 font-semibold"
                              : "bg-black/30 border-white/5 text-slate-400 hover:text-white"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (!name.trim()) setName("Ecosystem Cadet");
                      if (!email.trim() || !email.includes("@")) setEmail("cadet@unaitech.space");
                      setStep(2);
                    }}
                    className="w-full py-3 px-4 bg-white/5 border border-cyan-500/20 hover:border-cyan-500/50 text-cyan-400 text-xs font-mono tracking-wide rounded-xl active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    Assemble Profile
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: THE UNIFIED PERSONALIZATION STEP */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-4xl text-center space-y-6"
            >
              <div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  UNIFIED_PATH_CALIBRATOR
                </span>
                <h2 className="text-2xl font-display font-bold mt-2">Personalize Your Path</h2>
                <p className="text-slate-400 text-xs mt-1">Configure language preference, verify certifications, and choose interests in one unified view.</p>
              </div>

              <div id="unified_grid_container" className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
                
                {/* Left Column: Language & Academic Sync */}
                <div className="lg:col-span-5 space-y-5">
                  
                  {/* Language Section */}
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center space-x-2 text-cyan-400">
                      <Globe className="w-4 h-4" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Language Focus</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      {[
                        { name: "English", native: "English 🇬🇧" },
                        { name: "Tamil", native: "தமிழ் 🇮🇳" },
                        { name: "Hindi", native: "हिन्दी 🇮🇳" },
                        { name: "Telugu", native: "తెలుగు 🇮🇳" },
                        { name: "Malayalam", native: "മലയാളം 🇮🇳" },
                        { name: "Kannada", native: "ಕನ್ನಡ 🇮🇳" }
                      ].map((lang) => {
                        const isSelected = preferredLanguage === lang.name;
                        return (
                          <button
                            key={lang.name}
                            onClick={() => setPreferredLanguage(lang.name)}
                            type="button"
                            className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 cursor-pointer ${
                              isSelected
                                ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_12px_rgba(0,163,255,0.1)] text-white font-medium"
                                : "bg-black/20 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-100"
                            }`}
                          >
                            <span className="text-[8px] font-mono tracking-wider uppercase text-slate-500">
                              {lang.name}
                            </span>
                            <div className="flex justify-between items-center w-full mt-1">
                              <span className="text-xs font-sans font-medium">{lang.native}</span>
                              {isSelected && <Check className="w-3 h-3 text-cyan-400 shrink-0" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Academic Sync Section */}
                  <div className="bg-black/30 border border-white/5 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center space-x-2 text-indigo-400">
                      <GraduationCap className="w-4 h-4" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Academic Imports</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setHasCompletedCourses(false);
                          setPlatformName("");
                          setPortfolioLinks("");
                          setCertificateFile(null);
                        }}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          hasCompletedCourses === false
                            ? "bg-cyan-500/5 border-cyan-500/40 text-white"
                            : "bg-[#0c1226]/40 border-white/5 text-slate-400 hover:border-white/10"
                        }`}
                      >
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-300">No, I'm new</h4>
                        <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">Lessons from scratch.</p>
                      </button>

                      <button
                        type="button"
                        onClick={() => setHasCompletedCourses(true)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          hasCompletedCourses === true
                            ? "bg-cyan-500/5 border-cyan-500/40 text-white"
                            : "bg-[#0c1226]/40 border-white/5 text-slate-400 hover:border-white/10"
                        }`}
                      >
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Yes, sync records</h4>
                        <p className="text-[9px] text-slate-500 mt-0.5 leading-tight">Conditional verification.</p>
                      </button>
                    </div>

                    {/* Conditional Academic Fields */}
                    <AnimatePresence>
                      {hasCompletedCourses === true && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden space-y-3 pt-2"
                        >
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-0.5 font-bold">
                                Platform
                              </label>
                              <input
                                type="text"
                                value={platformName}
                                onChange={(e) => setPlatformName(e.target.value)}
                                placeholder="e.g. Coursera, NPTEL"
                                className="w-full bg-[#1b203c] border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-cyan-400"
                              />
                            </div>

                            <div>
                              <label className="block text-[8px] font-mono text-slate-400 uppercase tracking-widest mb-0.5 font-bold">
                                Portfolio Link
                              </label>
                              <input
                                type="text"
                                value={portfolioLinks}
                                onChange={(e) => setPortfolioLinks(e.target.value)}
                                placeholder="e.g. Github Link"
                                className="w-full bg-[#1b203c] border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-cyan-400"
                              />
                            </div>
                          </div>

                          {/* Upload space */}
                          <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDropFile}
                            onClick={triggerMockUpload}
                            className={`border border-dashed rounded-lg p-3 text-center cursor-pointer transition-all relative ${
                              isDraggingFile 
                                ? "border-cyan-400 bg-cyan-400/5 scale-[1.01]" 
                                : certificateFile 
                                  ? "border-emerald-500 bg-emerald-500/5" 
                                  : "border-white/10 bg-[#0c1226]/40 hover:border-white/20"
                            }`}
                          >
                            {isUploadingSimulated ? (
                              <div className="flex flex-col items-center space-y-1 py-1">
                                <RefreshCw className="w-4 h-4 text-cyan-400 animate-spin" />
                                <span className="text-[8px] font-mono text-cyan-400">Syncing ledger...</span>
                              </div>
                            ) : certificateFile ? (
                              <div className="flex flex-col items-center space-y-1">
                                <span className="text-[10px] font-sans font-medium text-emerald-400 block truncate max-w-xs">{certificateFile.name}</span>
                                <span className="text-[8px] font-mono text-slate-400 block">Simulated Sync Success ✓</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center space-y-1">
                                <FileText className="w-5 h-5 text-slate-500" />
                                <p className="text-[10px] text-slate-300">
                                  Drag PDF or <span className="text-cyan-400 underline font-bold">click upload</span>
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Right Column: Programming & AI Interests */}
                <div className="lg:col-span-7 space-y-5 bg-black/30 border border-white/5 rounded-2xl p-5">
                  <div className="flex items-center justify-between text-cyan-400 mb-2">
                    <div className="flex items-center space-x-2">
                      <Code className="w-4 h-4" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Programming & AI Interests</h3>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">Select topics you wish to study (* Min 1)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      "Python",
                      "Java",
                      "JavaScript",
                      "C",
                      "C++",
                      "AI & Machine Learning",
                      "Data Science",
                      "Cyber Security"
                    ].map((topic) => {
                      const isSelected = selectedTopics.includes(topic);
                      return (
                        <button
                          key={topic}
                          type="button"
                          onClick={() => handleToggleTopic(topic)}
                          className={`p-3 rounded-xl border text-left text-xs font-sans transition-all duration-200 cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? "bg-cyan-500/15 border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(0,255,255,0.15)] font-semibold"
                              : "bg-black/40 border-white/10 text-slate-400 hover:border-white/20"
                          }`}
                        >
                          <span>{topic}</span>
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center text-[8px] shrink-0 ml-2 ${isSelected ? "border-cyan-400 bg-cyan-400 text-black" : "border-slate-700"}`}>
                            {isSelected && "✓"}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-[#101430]/30 border border-white/5 rounded-xl p-3 mt-4 text-[10px] text-slate-400 leading-relaxed font-mono">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider block mb-1">Adaptive Assessment Trigger</span>
                    These topics directly calibrate the interactive 5-question UNAI adaptive quiz structured at Step 6 of onboarding.
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* STEP 3: IDENTITY SETUP */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl text-center space-y-6"
            >
              <div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  CYBER_STUDENT_PROFILING
                </span>
                <h2 className="text-2xl font-display font-bold mt-2">Cyber Student Profile Setup</h2>
                <p className="text-slate-400 text-xs mt-1">Establish your developer name and workspace contact node. (* Required fields)</p>
              </div>

              {/* Avatar Selector row */}
              <div className="bg-[#050510]/50 border border-white/5 rounded-2xl p-5 space-y-3">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block text-left">
                  Choose Neural Avatar Emoji
                </span>
                <div className="flex flex-wrap justify-between gap-1.5">
                  {AVATARS.map((emoji) => {
                    const isSelected = avatar === emoji;
                    return (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => setAvatar(emoji)}
                        className={`w-10 h-10 rounded-xl bg-black/40 border text-xl flex items-center justify-center transition-all ${
                          isSelected
                            ? "scale-110 border-cyan-400 bg-cyan-500/5 shadow-[0_0_12px_rgba(0,163,255,0.4)]"
                            : "border-white/5 hover:border-white/20"
                        }`}
                      >
                        {emoji}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Forms container */}
              <div className="bg-black/30 border border-white/5 p-6 rounded-2xl space-y-4 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Karthickeyan M"
                        className="w-full bg-[#1b203c]/40 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white uppercase focus:ring-1 focus:ring-cyan-400"
                      />
                      <User className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="yourname@domain.com"
                        className="w-full bg-[#1b203c]/40 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:ring-1 focus:ring-cyan-400"
                      />
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1">
                    Mobile Number * (10 Digits)
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={15}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g., 9840244821"
                      className="w-full bg-[#1b203c]/40 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:ring-1 focus:ring-cyan-400"
                    />
                    <Smartphone className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 space-y-3">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                    Optional Portfolio Integrations Nodes
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="relative">
                      <input
                        type="text"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                        placeholder="LinkedIn Profile url"
                        className="w-full bg-black/40 border border-white/5 rounded-xl pl-8 pr-3 py-2 text-[10px] text-white"
                      />
                      <Link className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                        placeholder="GitHub Username url"
                        className="w-full bg-black/40 border border-white/5 rounded-xl pl-8 pr-3 py-2 text-[10px] text-white"
                      />
                      <Code className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                    </div>

                    <div className="relative">
                      <input
                        type="text"
                        value={portfolio}
                        onChange={(e) => setPortfolio(e.target.value)}
                        placeholder="Personal Portfolio url"
                        className="w-full bg-black/40 border border-white/5 rounded-xl pl-8 pr-3 py-2 text-[10px] text-white"
                      />
                      <Globe className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-slate-500" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 4: TRACK ENROLMENT */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl text-center space-y-6"
            >
              <div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  CURRICULUM_COMPILATOR
                </span>
                <h2 className="text-2xl font-display font-bold mt-2">Choose Learning Journeys</h2>
                <p className="text-slate-400 text-xs mt-1">Select the paths that will assemble your dashboard curriculum map. (Min 1)</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-lg mx-auto">
                {[
                  "Web Development",
                  "App Development",
                  "AI",
                  "Data Science",
                  "Cloud Computing",
                  "Cyber Security",
                  "Game Development",
                  "UI/UX Design"
                ].map((journey) => {
                  const isChecked = enrolledJourneys.includes(journey);
                  return (
                    <button
                      key={journey}
                      type="button"
                      onClick={() => handleToggleJourney(journey)}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                        isChecked
                          ? "bg-purple-950/20 border-purple-500 text-purple-300 font-semibold"
                          : "bg-black/30 border-white/5 text-slate-400 hover:border-white/15"
                      }`}
                    >
                      <span className="text-xs font-sans">{journey}</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] shrink-0 ml-2 transition-all ${isChecked ? "bg-[#7f05ff] border-[#7f05ff] text-white" : "border-slate-700"}`}>
                        {isChecked && "✓"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 5: PRIMARY LEARNING GOAL */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-xl text-center space-y-6"
            >
              <div>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  OBJECTIVE_ALIGNMENT_TUTOR
                </span>
                <h2 className="text-2xl font-display font-bold mt-2">Primary Learning Goal</h2>
                <p className="text-slate-400 text-xs mt-1">What is the absolute primary objective you seek from EVE mentor systems?</p>
              </div>

              <div className="grid grid-cols-1 gap-2.5 max-w-lg mx-auto text-left">
                {[
                  { id: "Placement Preparation", title: "Placement Preparation", desc: "Secure high-paying jobs with technical interview prep." },
                  { id: "Career Growth", title: "Career Growth", desc: "Upskill and secure promotions or transition to senior roles." },
                  { id: "Startup Building", title: "Startup Building", desc: "Build scalable Minimal Viable Products (MVPs) from scratch." },
                  { id: "Freelancing Work", title: "Freelancing Work", desc: "Acquire high-demand client skills to work independently." },
                  { id: "Personal Interest Project", title: "Personal Interest Project", desc: "Hobby builds, software automation, and pure exploration." },
                  { id: "Academic Grades boost", title: "Academic Grades boost", desc: "Excel in university courses, mock tests, and exams." }
                ].map((obj) => {
                  const isChoice = learningObjective === obj.id;
                  return (
                    <button
                      key={obj.id}
                      type="button"
                      onClick={() => setLearningObjective(obj.id)}
                      className={`p-4 rounded-xl border text-left flex justify-between items-center transition-all cursor-pointer ${
                        isChoice
                          ? "bg-cyan-500/10 border-cyan-400 shadow-[0_0_15px_rgba(0,163,255,0.1)] text-white"
                          : "bg-[#0b1022]/40 border-white/5 text-slate-400 hover:border-white/10"
                      }`}
                    >
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-slate-200">{obj.title}</h4>
                        <p className="text-[10px] text-slate-500 leading-none">{obj.desc}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${isChoice ? "border-cyan-400 bg-cyan-400 text-black text-[10px]" : "border-slate-800"}`}>
                        {isChoice && "✓"}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* STEP 6: VERIFICATION QUIZ */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-2xl text-center space-y-6"
            >
              
              {/* STAGE A: QUIZ INTRO */}
              {quizStage === "intro" && (
                <div className="space-y-6 py-4">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-cyan-500/15 border border-cyan-400/20 flex items-center justify-center text-cyan-400 relative">
                      <Cpu className="w-8 h-8 animate-spin transition-all duration-[3000ms]" />
                    </div>
                  </div>

                  <div>
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                      ADAPTIVE_TEST_HARNESS
                    </span>
                    <h2 className="text-2xl font-display font-bold mt-2">EVE Adaptive Assessment</h2>
                    <p className="text-slate-400 text-xs mt-1">Let's compile a quick 5-question test matching your selected subjects.</p>
                  </div>

                  <div className="bg-[#101430]/30 border border-white/5 rounded-2xl p-6 text-left max-w-md mx-auto space-y-2 text-xs">
                    <div className="flex items-start gap-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 mt-1 flex-shrink-0 animate-pulse" />
                      <p className="text-slate-300">Custom tailored topics from Step 4 interests: <span className="text-cyan-400 font-semibold">{selectedTopics.join(", ")}</span>.</p>
                    </div>
                    <div className="flex items-start gap-2.5 animate-pulse">
                      <div className="w-2.5 h-2.5 rounded-full bg-pink-500 mt-1 flex-shrink-0" />
                      <p className="text-slate-300">Each submitted answer receives an instant live explanation panel description.</p>
                    </div>
                  </div>

                  <button
                    onClick={generateAdaptiveQuiz}
                    className="py-3 px-6 bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-600 text-black font-display font-medium rounded-2xl hover:scale-[1.01] transition-all shadow-[0_0_20px_rgba(0,163,255,0.4)] cursor-pointer"
                  >
                    Start UNAI Assessment
                  </button>
                </div>
              )}

              {/* STAGE B: LIVE QUIZ CONSOLE */}
              {quizStage === "live" && quizQuestions.length > 0 && (
                <div className="space-y-6 text-left bg-black/20 border border-white/5 p-6 sm:p-8 rounded-3xl">
                  
                  {/* Status metrics bar */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                        UNAI ADAPTIVE TEST • Question {currentQuizIndex + 1} of {quizQuestions.length}
                      </span>
                    </div>
                    <div className="w-32 bg-slate-800 h-1 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-400 h-full transition-all duration-300"
                        style={{ width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Question Container Card */}
                  <div className="bg-[#0b1022] border border-white/5 p-6 rounded-2xl">
                    <h3 className="text-sm font-sans font-medium text-slate-100 leading-relaxed leading-wide">
                      {quizQuestions[currentQuizIndex].question}
                    </h3>
                  </div>

                  {/* Multiple choice selections */}
                  <div className="grid grid-cols-1 gap-3">
                    {quizQuestions[currentQuizIndex].options.map((opt: string, oIdx: number) => {
                      const isUserSelection = quizAnswers[currentQuizIndex] === oIdx;
                      const isCorrectChoice = q => q.correctIndex === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => {
                            if (!showExplanation) {
                              handleSelectQuizAnswer(oIdx);
                            }
                          }}
                          disabled={showExplanation}
                          className={`p-4 rounded-xl border text-xs text-left font-sans transition-all flex items-center justify-between ${
                            isUserSelection
                              ? oIdx === quizQuestions[currentQuizIndex].correctIndex
                                ? "bg-emerald-950/20 border-emerald-500 text-emerald-300"
                                : "bg-red-950/20 border-red-500 text-red-300"
                              : "bg-black/30 border-white/5 text-slate-400 hover:border-white/10"
                          } ${showExplanation ? "cursor-not-allowed opacity-90" : "cursor-pointer"}`}
                        >
                          <span>{opt}</span>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ml-2 ${isUserSelection ? "border-transparent bg-cyan-400 text-black font-bold" : "border-slate-800"}`}>
                            {isUserSelection && "✓"}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Live tutorial explanation drawer */}
                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="bg-[#070e24] border border-cyan-500/10 p-5 rounded-2xl flex gap-3.5"
                      >
                        <div className="w-8 h-8 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                          <Sparkle className="w-4.5 h-4.5 animate-pulse" />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                            {quizAnswers[currentQuizIndex] === quizQuestions[currentQuizIndex].correctIndex ? "Correct Alignment Perfected ✓" : "Divergence Detected ✗"}
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {quizQuestions[currentQuizIndex].explanation}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Trigger to advance quiz */}
                  {showExplanation && (
                    <button
                      onClick={handleNextQuizQuestion}
                      className="w-full py-3 px-4 bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-sans font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,163,255,0.22)] active:scale-95 transition-all cursor-pointer"
                    >
                      <span>
                        {currentQuizIndex < quizQuestions.length - 1 ? "Next Matrix Step" : "Submit Results & Verify Metrics"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}

              {/* STAGE C: PERFORMANCE REPORT & VICTORY */}
              {quizStage === "report" && (
                <div className="space-y-6 bg-[#04091a]/30 border border-white/5 p-6 sm:p-8 rounded-3xl">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    
                    {/* Glowing circular progress meter */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <div className="absolute inset-0 bg-cyan-400/10 rounded-full blur-xl scale-110" />
                      <div className="absolute inset-0 rounded-full border-4 border-white/5" />
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="56"
                          cy="56"
                          r="50"
                          stroke="#00ffff"
                          strokeWidth="5"
                          fill="transparent"
                          strokeDasharray={2 * Math.PI * 50}
                          strokeDashoffset={2 * Math.PI * 50 * (1 - getQuizScore() / quizQuestions.length)}
                          className="transition-all duration-[1200ms] ease-out stroke-cyan-400"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-display font-bold text-white">
                          {Math.round((getQuizScore() / quizQuestions.length) * 100)}%
                        </span>
                        <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                          Matrix Sync
                        </span>
                      </div>
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                        Assessment Completed
                      </h3>
                      <p className="text-[11px] text-[#00ffff] font-mono uppercase tracking-widest mt-1">
                        +{250 + (getQuizScore() * 150)} XP Sync Credited
                      </p>
                    </div>
                  </div>

                  {/* Correct/Incorrect scrolling review panel */}
                  <div className="text-left space-y-3 border-t border-white/5 pt-4">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-2">
                      Correct/Incorrect Analysis Box
                    </span>
                    
                    <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 select-text">
                      {quizQuestions.map((q, idx) => {
                        const isCorrect = quizAnswers[idx] === q.correctIndex;
                        return (
                          <div
                            key={idx}
                            className="bg-black/40 border border-white/5 p-3.5 rounded-xl flex items-start gap-3 text-xs leading-relaxed"
                          >
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${isCorrect ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
                              {isCorrect ? "✓" : "✗"}
                            </div>
                            <div className="space-y-1 flex-1">
                              <p className="text-slate-200 font-sans font-medium line-clamp-1">{q.question}</p>
                              <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 font-mono">
                                <span>You chose: <span className={isCorrect ? "text-emerald-400" : "text-red-400"}>{q.options[quizAnswers[idx]] || "N/A"}</span></span>
                                <span>•</span>
                                <span>Correct: <span className="text-emerald-400">{q.options[q.correctIndex]}</span></span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <button
                    onClick={handleFinishOnboarding}
                    className="w-full py-4 bg-gradient-to-r from-cyan-400 via-white to-emerald-400 text-black font-display font-black tracking-wide text-xs rounded-2xl active:scale-95 transition-all shadow-[0_0_22px_rgba(0,255,255,0.35)] cursor-pointer"
                  >
                    Enter UNAI Dashboard
                  </button>
                </div>
              )}

            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Bottom Row Navigation & Progress Sync tracks */}
      <footer className="w-full max-w-4xl border-t border-white/5 py-4 px-6 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#050b1a]/30 backdrop-blur-md rounded-2xl">
        
        {/* Playback step trigger back control links */}
        <div className="flex gap-2">
          {step > 1 && quizStage !== "live" && (
            <button
              onClick={handleBack}
              className="px-4 py-2 bg-white/5 border border-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Prev
            </button>
          )}
        </div>

        {/* Visual Dots Progression Tracker representing 6 steps */}
        <div className="flex items-center justify-center space-x-2">
          {[1, 2, 3, 4, 5, 6].map((num) => {
            const isActive = step === num;
            const isCompleted = num < step;
            return (
              <button
                key={num}
                onClick={() => {
                  if (num < step) {
                    setStep(num);
                    if (num < 6) {
                      setQuizStage("intro");
                      setCurrentQuizIndex(0);
                      setQuizAnswers([]);
                    }
                  }
                }}
                disabled={!isCompleted}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  isActive 
                    ? "w-6 bg-[#00ffff] shadow-[0_0_10px_rgba(0,255,255,0.8)]" 
                    : isCompleted 
                      ? "w-3 bg-cyan-500 hover:bg-cyan-400 cursor-pointer" 
                      : "w-1.5 bg-white/15 cursor-not-allowed"
                }`}
                title={`Step ${num}`}
              />
            );
          })}
        </div>

        {/* Action Button forward dispatch triggers */}
        <div className="flex gap-2">
          {step < 6 && (
            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`px-5 py-2.5 rounded-xl text-xs font-mono tracking-wider uppercase transition-all flex items-center gap-1.5 ${
                isStepValid()
                  ? "bg-cyan-400 text-black font-semibold hover:bg-cyan-300 shadow-[0_0_12px_rgba(0,255,255,0.2)] cursor-pointer"
                  : "bg-white/5 text-slate-600 border border-white/5 cursor-not-allowed"
              }`}
            >
              <span>{step === 5 ? "Start Assessment" : "Next"}</span>
              <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
            </button>
          )}
        </div>
      </footer>

    </div>
  );
}
