import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Shield, 
  Trophy, 
  MessageSquare, 
  Plus, 
  Check, 
  X, 
  Lock, 
  Unlock, 
  Coins, 
  Zap, 
  Play, 
  Flame, 
  Sparkles, 
  Send,
  MessageCircle,
  HelpCircle,
  Award,
  Globe,
  Bell,
  ChevronRight,
  UserPlus,
  Gamepad2,
  Bookmark,
  Activity,
  UserCheck
} from "lucide-react";
import { VidyonProfile, LeaderboardEntry } from "../types";

interface GuildProps {
  profile: VidyonProfile;
  xp: number;
  onAddXp: (amount: number) => void;
}

interface GuildMember {
  id: string;
  name: string;
  role: "Leader" | "Officer" | "Elite Elder" | "Elite Cadet" | "Cadet";
  xpContributed: number;
  dogTags: number;
  status: "online" | "offline" | "in sandbox" | "in assessment";
  avatar: string;
  titleBadge?: string;
  borderGlow?: string;
}

interface RequestToJoin {
  id: string;
  name: string;
  xp: number;
  role: string;
  avatar: string;
  message: string;
}

export default function Guild({ profile, xp, onAddXp }: GuildProps) {
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "chat" | "store" | "applicants">("overview");
  
  // Guild Currency configuration
  const [guildCoins, setGuildCoins] = useState<number>(250);
  
  // User custom title unlocked via Guild store
  const [unlockedTitle, setUnlockedTitle] = useState<string>("");
  const [activeFrameGlow, setActiveFrameGlow] = useState<string>("");
  const [doubleXpActive, setDoubleXpActive] = useState<boolean>(false);
  const [roomCardKey, setRoomCardKey] = useState<string>("");

  // Local state for dog tags to demonstrate real-time advancement
  const [guildDogTags, setGuildDogTags] = useState<number>(1420);
  const [userDogTags, setUserDogTags] = useState<number>(45);

  // Guild Info State
  const [guildNotice, setGuildNotice] = useState<string>(
    "DOG TAG THURSDAYS AND FRIDAYS ARE ACTIVE! GRIND EXERCISES IN THE SANDBOX. AIMING FOR THE GLOBAL PRESTIGE TOP 5!"
  );
  const [isEditingNotice, setIsEditingNotice] = useState<boolean>(false);
  const [newNoticeText, setNewNoticeText] = useState<string>(guildNotice);

  // Mini-game trivia state
  const [isPlayingTrivia, setIsPlayingTrivia] = useState<boolean>(false);
  const [currentTriviaIndex, setCurrentTriviaIndex] = useState<number>(0);
  const [triviaScore, setTriviaScore] = useState<number>(0);
  const [selectedTriviaAnswer, setSelectedTriviaAnswer] = useState<string | null>(null);
  const [triviaFinished, setTriviaFinished] = useState<boolean>(false);

  // Join Requests state
  const [joinRequests, setJoinRequests] = useState<RequestToJoin[]>([
    {
      id: "req1",
      name: "Cyber_Viper",
      xp: 4120,
      role: "Student",
      avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80",
      message: "Hey guys! Level 4 React coder here. Looking for an active Friday Dog Tag squad!"
    },
    {
      id: "req2",
      name: "BitSlinger",
      xp: 2950,
      role: "AI Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      message: "Active learner, practicing Python everyday. Let me in to boost the weekly XP metrics!"
    }
  ]);

  // Members list states
  const [members, setMembers] = useState<GuildMember[]>([
    {
      id: "leader1",
      name: "Master Cadet",
      role: "Leader",
      xpContributed: 14500,
      dogTags: 320,
      status: "online",
      avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=120&q=80",
      titleBadge: "Vidyoneer King"
    },
    {
      id: "officer1",
      name: "Debugger_Luna",
      role: "Officer",
      xpContributed: 9800,
      dogTags: 210,
      status: "in assessment",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80",
      titleBadge: "No-Bug Splicer"
    },
    {
      id: "active_user",
      name: `${profile.name} (YOU)`,
      role: "Elite Cadet",
      xpContributed: 4500,
      dogTags: 45,
      status: "online",
      avatar: profile.avatar,
      titleBadge: "Cadet Recruit"
    },
    {
      id: "member1",
      name: "Pixel_Paladin",
      role: "Elite Elder",
      xpContributed: 6700,
      dogTags: 180,
      status: "in sandbox",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80"
    },
    {
      id: "member2",
      name: "Async_Knight",
      role: "Cadet",
      xpContributed: 2400,
      dogTags: 75,
      status: "offline",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80"
    }
  ]);

  // Chat local State
  const [chatMessages, setChatMessages] = useState([
    { id: "msg1", sender: "Master Cadet", role: "Leader", text: "Welcome to the Friday Tournament lads! Grind those dog tags so we can unlock the Custom Room card today!", timestamp: "10:15 AM", avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=120&q=80" },
    { id: "msg2", sender: "Debugger_Luna", role: "Officer", text: "Finished the JavaScript Async module roadmap! Contributed +15 dog tags! 🚀", timestamp: "10:20 AM", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" },
    { id: "msg3", sender: "Pixel_Paladin", role: "Elite Elder", text: "Need some backup in the sandbox playground, has anyone solved the recursion challenge in Java?", timestamp: "10:25 AM", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80" }
  ]);
  const [currentUserMsg, setCurrentUserMsg] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSubTab === "chat" && chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages, activeSubTab]);

  // Handle incoming application approvals
  const handleApproveRequest = (req: RequestToJoin) => {
    const newMember: GuildMember = {
      id: req.id,
      name: req.name,
      role: "Cadet",
      xpContributed: req.xp,
      dogTags: 10,
      status: "online",
      avatar: req.avatar
    };
    setMembers(prev => [...prev, newMember]);
    setJoinRequests(prev => prev.filter(r => r.id !== req.id));
    
    // Auto post welcome message in chat
    const systemWelcome = {
      id: "sys_" + Math.random(),
      sender: "GUILD SYSTEM",
      role: "System",
      text: `🎉 USER '${req.name}' HAS BEEN INITIATED INTO THE GUILD BY SYSTEM ALGORITHMS! Welcome to the squad!`,
      timestamp: "Now",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"
    };
    setChatMessages(prev => [...prev, systemWelcome]);
  };

  const handleRejectRequest = (id: string) => {
    setJoinRequests(prev => prev.filter(r => r.id !== id));
  };

  // Submit custom message to chat card
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserMsg.trim()) return;

    const newMsg = {
      id: "user_msg_" + Math.random(),
      sender: profile.name,
      role: "Elite Cadet",
      text: currentUserMsg,
      timestamp: "Just now",
      avatar: profile.avatar
    };

    setChatMessages(prev => [...prev, newMsg]);
    const inputSaved = currentUserMsg;
    setCurrentUserMsg("");

    // Simulate reply from a guild member 1.5 seconds later
    setTimeout(() => {
      const responses = [
        "Ayyy! Let's go Cadet! 🔥 We are pushing hard for that tournament reward!",
        "Double XP is activated. Sandbox grinding pays off! Keep pushing code!",
        "Awesome! I'll team up with you in any sandbox lobby for DSA challenges.",
        "Glad to have you active. Don't forget to run the Speed Trivia on the overview tab to get us those precious Friday Dog Tags!",
        "Copy that, Commander! Level 4 Node API is deployable on standby limits!"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const replyMsg = {
        id: "reply_msg_" + Math.random(),
        sender: "Master Cadet",
        role: "Leader",
        text: replyMsgTextFormatter(inputSaved, randomResponse),
        timestamp: "Just now",
        avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=120&q=80"
      };

      setChatMessages(prev => [...prev, replyMsg]);
    }, 1500);
  };

  const replyMsgTextFormatter = (input: string, fallback: string) => {
    if (input.toLowerCase().includes("hello") || input.toLowerCase().includes("hey") || input.toLowerCase().includes("hi")) {
      return "Well met! Grab some coffee and start writing code. Need help with some roadmaps tonight?";
    }
    return fallback;
  };

  // Save changes to Guild Notice Board
  const handleSaveNotice = () => {
    setGuildNotice(newNoticeText);
    setIsEditingNotice(false);
  };

  // Cyber Speeds Trivia Quiz questions 
  const triviaQuestions = [
    {
      q: "Which algorithm scheme resolves elements in sorted lists by dividing the search interval in half successively?",
      options: ["Linear Search", "Binary Search", "Bubble Sort", "Dijkstra Algorithm"],
      correct: "Binary Search",
      xpGained: 50,
      tagsGained: 10
    },
    {
      q: "In relational database queries, which keyword is utilized to synthesize matching tuples across distinct tables?",
      options: ["MERGE", "CROSSOVER", "JOIN", "INTEGRATE"],
      correct: "JOIN",
      xpGained: 50,
      tagsGained: 10
    },
    {
      q: "What design pattern focuses on creating a single class instance accessible globally throughout execution?",
      options: ["Singleton", "Observer", "Factory", "Decorator"],
      correct: "Singleton",
      xpGained: 50,
      tagsGained: 10
    }
  ];

  const handleSelectTriviaAnswer = (option: string) => {
    setSelectedTriviaAnswer(option);
  };

  const handleNextTrivia = () => {
    if (!selectedTriviaAnswer) return;

    if (selectedTriviaAnswer === triviaQuestions[currentTriviaIndex].correct) {
      setTriviaScore(prev => prev + 1);
    }

    if (currentTriviaIndex + 1 < triviaQuestions.length) {
      setCurrentTriviaIndex(prev => prev + 1);
      setSelectedTriviaAnswer(null);
    } else {
      setTriviaFinished(true);
    }
  };

  const claimTriviaRewards = () => {
    // Standard calculation: 50 XP per correct, 10 tags per correct
    const finalScoreXP = triviaScore * 50;
    const finalTags = triviaScore * 10;

    // Grant real platform XP via callback and simulate currency
    onAddXp(finalScoreXP);
    setGuildCoins(prev => prev + (triviaScore * 15)); // Coin conversion bonus

    // Add Dog tags
    setGuildDogTags(prev => prev + finalTags);
    setUserDogTags(prev => prev + finalTags);

    // Update member list contributor dogTags and XP contribution 
    setMembers(prev => prev.map(m => {
      if (m.id === "active_user") {
        return {
          ...m,
          xpContributed: m.xpContributed + finalScoreXP,
          dogTags: m.dogTags + finalTags
        };
      }
      return m;
    }));

    // Reset trivia components
    setIsPlayingTrivia(false);
    setCurrentTriviaIndex(0);
    setTriviaScore(0);
    setSelectedTriviaAnswer(null);
    setTriviaFinished(false);

    // Post mini achievement in chat 
    const gameFinishedMsg = {
      id: "sys_game_" + Math.random(),
      sender: "GUILD SYSTEM",
      role: "System",
      text: `🏆 ACTIVE CADET ${profile.name} completed the Speeds Trivia. Score: ${triviaScore}/3. Contributed +${finalTags} Friday Dog Tags to the Clan!`,
      timestamp: "Now",
      avatar: profile.avatar
    };
    setChatMessages(prev => [...prev, gameFinishedMsg]);
  };

  // Handle purchasing perks inside Guild Store
  const handlePurchaseStore = (item: "xpCard" | "roomCard" | "title" | "glow", cost: number) => {
    if (guildCoins < cost) {
      alert("Insufficient Guild Coins! Complete more tasks and game trivia rounds to stack coins.");
      return;
    }

    setGuildCoins(prev => prev - cost);

    if (item === "xpCard") {
      setDoubleXpActive(true);
      onAddXp(200); // Instantly give 200 XP
      // Trigger temporary visual notification
      alert("Double XP Card successfully applied! +200 XP immediate stack applied.");
    } else if (item === "roomCard") {
      const generatedCode = "CUST-" + Math.floor(100000 + Math.random() * 900000);
      setRoomCardKey(generatedCode);
      alert(`Room Card Unlocked! Custom Code: ${generatedCode}. You can now construct custom lobbies.`);
    } else if (item === "title") {
      setUnlockedTitle("No-Bug Splicer");
      // Update role display
      setMembers(prev => prev.map(m => {
        if (m.id === "active_user") {
          return { ...m, titleBadge: "No-Bug Splicer" };
        }
        return m;
      }));
      alert(`Legendary title tag unlocked! Display tag applied: 'No-Bug Splicer'.`);
    } else if (item === "glow") {
      setActiveFrameGlow("ring-2 ring-cyan-400 animate-pulse shadow-[0_0_15px_rgba(0,163,255,0.6)]");
      alert("Cyber Dragon Avatar frame successfully purchased! Wear it with code dominance.");
    }
  };

  return (
    <div id="guild_container" className="flex flex-col lg:flex-row h-full w-full bg-[#030303] text-slate-200 overflow-hidden">
      
      {/* 1. Left Primary Operations Container */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto space-y-6">
        
        {/* Banner Headers resembling Gaming Division */}
        <div className="relative rounded-2xl overflow-hidden border border-cyan-500/20 bg-gradient-to-r from-[#0d152c] to-[#040813] p-6 shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-cyan-500/10 to-transparent pointer-events-none" />
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-extrabold flex items-center gap-1.5 w-fit">
                <Shield className="w-3 h-3 text-cyan-400 fill-cyan-400/20" /> Guild Level 4 (PRESTIGE_CAP_MAX)
              </span>
              <h1 className="text-3xl font-display font-black tracking-tight text-white flex items-center gap-2">
                ALPHA CODERS <span className="text-[#00F0FF] text-xl font-mono bg-blue-500/10 px-2 py-0.5 border border-blue-500/25 rounded">[A1]</span>
              </h1>
              <p className="text-xs text-slate-400 font-mono tracking-wide max-w-xl">
                Guild ID: <span className="text-slate-300">77889922</span> | Creator: <span className="text-cyan-400">Master Cadet</span> | Region: <span className="text-emerald-400">Asia North</span>
              </p>
            </div>

            <div className="flex items-center space-x-3 bg-black/40 border border-white/5 p-3 rounded-xl">
              <Coins className="w-5 h-5 text-yellow-400 animate-bounce" />
              <div className="text-left font-mono">
                <span className="text-[9px] text-slate-400 block uppercase font-bold">Guild Coin Stack</span>
                <span className="text-lg font-bold text-yellow-400">{guildCoins} GC</span>
              </div>
            </div>
          </div>

          {/* Navigation Sub-sections */}
          <div className="flex space-x-1 border-b border-white/5 mt-6 pb-px">
            {[
              { id: "overview", label: "Overview HUB", icon: Gamepad2 },
              { id: "chat", label: "Guild Comms Chat", icon: MessageSquare },
              { id: "store", label: "Redeem Perks Store", icon: Coins },
              { id: "applicants", label: `Recruits Queue (${joinRequests.length})`, icon: UserPlus }
            ].map((subTab) => {
              const Icon = subTab.icon;
              const isActive = activeSubTab === subTab.id;
              return (
                <button
                  key={subTab.id}
                  onClick={() => {
                    setActiveSubTab(subTab.id as any);
                    setIsPlayingTrivia(false); // Cancel active trivia triggers on swap
                  }}
                  className={`flex items-center space-x-1.5 px-4 py-2.5 text-xs font-mono border-b-2 transition-all cursor-pointer ${
                    isActive
                      ? "border-cyan-400 text-cyan-300 bg-cyan-400/5 font-bold"
                      : "border-transparent text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{subTab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Middle Variable Views Routing */}
        <AnimatePresence mode="wait">
          
          {/* OVERVIEW CONTENT VIEW */}
          {activeSubTab === "overview" && (
            <motion.div
              key="overview_view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Notice Bulletin Board Card */}
                <div className="bg-[#0b0e14] border border-white/5 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-cyan-400">
                      <Bookmark className="w-4 h-4" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Guild Broadcast Board</h3>
                    </div>
                    <button
                      onClick={() => {
                        if (isEditingNotice) {
                          handleSaveNotice();
                        } else {
                          setNewNoticeText(guildNotice);
                          setIsEditingNotice(true);
                        }
                      }}
                      className="px-2.5 py-1 rounded bg-[#162238] hover:bg-[#203254] border border-cyan-500/20 text-cyan-300 text-[10px] uppercase font-mono cursor-pointer"
                    >
                      {isEditingNotice ? "Sync Save" : "Modify"}
                    </button>
                  </div>

                  {isEditingNotice ? (
                    <div className="space-y-2">
                      <textarea
                        value={newNoticeText}
                        onChange={(e) => setNewNoticeText(e.target.value)}
                        className="w-full bg-[#05060b] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-400 h-24 resize-none font-mono"
                      />
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setIsEditingNotice(false)}
                          className="px-2 py-1 text-[10px] uppercase font-mono text-slate-400 cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSaveNotice}
                          className="px-3 py-1 bg-cyan-400 text-black text-[10px] uppercase font-mono font-bold rounded cursor-pointer"
                        >
                          Apply Notice
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#05060b] border border-white/5 rounded-xl p-4 min-h-[96px] flex items-center relative overflow-hidden">
                      <div className="absolute top-0 bottom-0 left-0 w-1 bg-cyan-500 animate-pulse" />
                      <p className="text-xs text-slate-300 leading-relaxed font-mono italic">
                        "{guildNotice}"
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-[#10141f] border border-white/5 p-3 rounded-xl flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">Guild Glory</span>
                      <span className="text-xs font-mono font-bold text-white">84,500 GP</span>
                    </div>
                    <div className="bg-[#10141f] border border-white/5 p-3 rounded-xl flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono">Members Limit</span>
                      <span className="text-xs font-mono font-bold text-[#00F0FF]">{members.length} / 30</span>
                    </div>
                  </div>
                </div>

                {/* Friday Tournament Dog Tag Progress tracker (Gaming Classic style) */}
                <div className="bg-[#0b0e14] border border-white/5 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-rose-500">
                      <Flame className="w-4 h-4 fill-rose-500/20" />
                      <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Dog Tag Tournament</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[9px] font-mono font-bold uppercase tracking-wide animate-pulse">
                      Live on Fridays
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[9px] text-slate-400 font-mono block">Weekly Tags Collected</span>
                        <span className="text-xl font-mono font-bold text-white">{guildDogTags} / 1800</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 font-mono block">Your Contribution</span>
                        <span className="text-sm font-mono font-bold text-cyan-400">{userDogTags} Tags</span>
                      </div>
                    </div>

                    <div className="w-full bg-[#05060b] rounded-full h-2.5 overflow-hidden border border-white/5 p-px">
                      <div 
                        className="bg-gradient-to-r from-red-500 to-amber-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, (guildDogTags / 1800) * 100)}%` }}
                      />
                    </div>

                    {/* Milestones bar */}
                    <div className="grid grid-cols-4 text-[9px] font-mono text-slate-500 pt-1 text-center">
                      <div>400 <span className="text-[7.5px] block">XP Boost Card</span></div>
                      <div>800 <span className="text-[7.5px] block">Elite Voucher</span></div>
                      <div>1200 <span className="text-[7.5px] block">Priority Ticket</span></div>
                      <div className="text-amber-400 font-bold">1800 <span className="text-[7.5px] block text-amber-500">Custom Room Card</span></div>
                    </div>
                  </div>

                  {/* Playable mini-game triggers */}
                  {!isPlayingTrivia ? (
                    <button
                      onClick={() => setIsPlayingTrivia(true)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00F0FF]/15 to-blue-600/15 hover:from-[#00F0FF]/25 hover:to-blue-600/25 border border-[#00A3FF]/30 text-[#00F0FF] text-xs font-mono font-bold cursor-pointer uppercase flex items-center justify-center gap-2 tracking-wider mt-2 hover:shadow-[0_0_15px_rgba(0,163,255,0.15)] transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Guild Mini-Game (Speeds Trivia)</span>
                    </button>
                  ) : (
                    <div className="border border-cyan-500/30 rounded-xl bg-[#03060d] p-4 text-left relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-indigo-500" />
                      
                      {/* Interactive Mini Quiz Screen */}
                      {!triviaFinished ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                            <span>SPEEDS TRIVIA ROUND {currentTriviaIndex + 1}/3</span>
                            <span className="text-yellow-400 font-bold">CORRECT: {triviaScore}</span>
                          </div>

                          <h4 className="text-xs font-bold leading-relaxed text-slate-200">
                            {triviaQuestions[currentTriviaIndex].q}
                          </h4>

                          <div className="space-y-1.5 pt-1">
                            {triviaQuestions[currentTriviaIndex].options.map((option) => {
                              const isChosen = selectedTriviaAnswer === option;
                              return (
                                <button
                                  key={option}
                                  onClick={() => handleSelectTriviaAnswer(option)}
                                  className={`w-full p-2.5 rounded-lg border text-left text-[11px] transition-all cursor-pointer ${
                                    isChosen
                                      ? "bg-cyan-500/10 border-cyan-400 text-white font-bold"
                                      : "bg-black/30 border-white/5 text-slate-300 hover:border-white/10 hover:text-slate-100"
                                  }`}
                                >
                                  {option}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <button
                              onClick={() => {
                                setIsPlayingTrivia(false);
                                setCurrentTriviaIndex(0);
                                setTriviaScore(0);
                                setSelectedTriviaAnswer(null);
                              }}
                              className="text-[10px] font-mono text-red-400 cursor-pointer uppercase hover:underline"
                            >
                              Exit Game
                            </button>

                            <button
                              disabled={!selectedTriviaAnswer}
                              onClick={handleNextTrivia}
                              className={`px-3 py-1.5 rounded text-[10px] font-mono font-bold uppercase transition-all ${
                                selectedTriviaAnswer
                                  ? "bg-cyan-400 text-black cursor-pointer"
                                  : "bg-white/5 text-slate-500 cursor-not-allowed"
                              }`}
                            >
                              {currentTriviaIndex === 2 ? "Finish" : "Next Code"}
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4 text-center py-2">
                          <Award className="w-10 h-10 text-yellow-400 mx-auto animate-bounce pb-1" />
                          <div>
                            <h4 className="text-sm font-bold text-white">Speeds Trivia Concluded!</h4>
                            <p className="text-[10px] text-slate-400 font-mono mt-0.5">SCORE ACHIEVED: {triviaScore} / 3 CORE TARGETS CORRECT</p>
                          </div>

                          <div className="bg-[#121c33]/30 border border-white/5 p-3 rounded-lg max-w-sm mx-auto text-left font-mono space-y-1.5 text-[10px]">
                            <div className="flex justify-between">
                              <span className="text-slate-400">XP Stack Earned:</span>
                              <span className="text-emerald-400 font-bold">+{triviaScore * 50} Real XP</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Friday Dog Tags:</span>
                              <span className="text-rose-400 font-bold">+{triviaScore * 10} Clan Tags</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Bonus GC Currency:</span>
                              <span className="text-yellow-400 font-bold">+{triviaScore * 15} GC</span>
                            </div>
                          </div>

                          <button
                            onClick={claimTriviaRewards}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-mono font-bold text-[10px] rounded uppercase cursor-pointer hover:shadow-lg transition-transform hover:scale-105"
                          >
                            Sync & Claim Rewards
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>

              </div>

              {/* Guild Stats metrics */}
              <div className="bg-[#0b0e14] border border-white/5 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-indigo-400">
                    <Activity className="w-5 h-5" />
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider">Clan Statistics Matrix</h3>
                  </div>
                  <span className="text-[9px] font-mono text-slate-400">Refreshes every 24 hours</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-[#05060b] border border-white/5 p-4 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Weekly Rank</span>
                    <span className="text-lg font-bold text-white font-mono">#14 (Diamond III)</span>
                  </div>
                  
                  <div className="bg-[#05060b] border border-white/5 p-4 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Clan Matchmaking Winrate</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">72.4%</span>
                  </div>

                  <div className="bg-[#05060b] border border-white/5 p-4 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Dog Tag Streak</span>
                    <span className="text-lg font-bold text-amber-500 font-mono">12 Weeks Continuous</span>
                  </div>

                  <div className="bg-[#05060b] border border-white/5 p-4 rounded-xl space-y-1">
                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block font-bold">Sandbox Lobbies Host Count</span>
                    <span className="text-lg font-bold text-fuchsia-400 font-mono">42 Open</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CHAT ROOM VIEW */}
          {activeSubTab === "chat" && (
            <motion.div
              key="chat_view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col border border-white/5 rounded-2xl bg-[#0b0e14] h-[450px] overflow-hidden"
            >
              {/* Chat Sub-header */}
              <div className="bg-black/30 border-b border-white/5 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono font-bold uppercase text-slate-200">ACTIVE DIVISION COMMS CHAT_</span>
                </div>
                <span className="text-[8.5px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 uppercase tracking-widest font-extrabold animate-pulse">
                  ● Live Channel Secured
                </span>
              </div>

              {/* Chat scroll box */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((msg) => {
                  const isUser = msg.sender === profile.name;
                  const isSystem = msg.role === "System";

                  if (isSystem) {
                    return (
                      <div key={msg.id} className="text-center">
                        <span className="inline-block bg-white/5 text-[9.5px] font-mono text-indigo-300 px-3 py-1 rounded-full border border-white/5 leading-normal max-w-lg">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div 
                      key={msg.id} 
                      className={`flex items-start space-x-2.5 max-w-xl ${isUser ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"}`}
                    >
                      <img 
                        src={msg.avatar} 
                        alt={msg.sender} 
                        className={`w-7 h-7 rounded-full border shrink-0 ${isUser ? "border-cyan-400" : "border-slate-700"}`}
                      />
                      
                      <div className="space-y-1 text-left">
                        <div className={`flex items-center space-x-1.5 ${isUser ? "justify-end" : ""}`}>
                          <span className="text-[10px] font-bold text-white font-sans">{msg.sender}</span>
                          <span className={`px-1.5 py-0.2 bg-white/5 rounded text-[7.5px] font-mono uppercase ${
                            msg.role === "Leader" ? "text-amber-400 border border-amber-400/20 font-black" :
                            msg.role === "Officer" ? "text-cyan-400 border border-cyan-400/20 font-bold" :
                            "text-slate-400"
                          }`}>
                            {msg.role}
                          </span>
                          <span className="text-[8px] font-mono text-slate-500">{msg.timestamp}</span>
                        </div>

                        <div className={`p-3 rounded-xl text-xs leading-relaxed ${
                          isUser 
                            ? "bg-cyan-500/10 border border-cyan-500/25 text-slate-100 rounded-tr-none" 
                            : "bg-black/40 border border-white/5 text-slate-300 rounded-tl-none"
                        }`}>
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input form */}
              <form onSubmit={handleSendChatMessage} className="bg-black/30 border-t border-white/5 p-3 flex gap-2">
                <input
                  type="text"
                  value={currentUserMsg}
                  onChange={(e) => setCurrentUserMsg(e.target.value)}
                  placeholder="Type secure coms to your Clan..."
                  className="flex-1 bg-[#10141f] border border-white/10 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                />
                <button
                  type="submit"
                  className="px-4 bg-cyan-400 hover:bg-cyan-500 text-black font-semibold text-xs rounded-xl flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}

          {/* STORE VIEW */}
          {activeSubTab === "store" && (
            <motion.div
              key="store_view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Store Perk: Double XP Card */}
                <div className="bg-[#0b0e14] border border-white/5 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shadow-inner">
                        <Zap className="w-5 h-5 fill-current" />
                      </div>
                      <span className="text-yellow-400 text-xs font-mono font-bold flex items-center gap-1">
                        <Coins className="w-3 h-3" /> 100 GC
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        Double XP Card (24H) {doubleXpActive && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        Accelerate your ranks! Activates double multiplier bounds for sandbox compilations and quiz completions. Also instantly stacks +200 XP onto your account ledger profile.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePurchaseStore("xpCard", 100)}
                    className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold rounded-xl cursor-pointer uppercase tracking-wider"
                  >
                    Redeem Perk
                  </button>
                </div>

                {/* Store Perk: Custom Sandbox Room Card */}
                <div className="bg-[#0b0e14] border border-white/5 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-[#00F0FF]/10 border border-[#00A3FF]/20 flex items-center justify-center text-[#00F0FF] shadow-inner">
                        <Lock className="w-5 h-5" />
                      </div>
                      <span className="text-yellow-400 text-xs font-mono font-bold flex items-center gap-1">
                        <Coins className="w-3 h-3" /> 150 GC
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Standard Sandbox Room Card
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        Unlock the exclusive capability to create dedicated sandbox lobby partitions. Challenge fellow Guild members to live speed contests or show off complex solution snippets!
                      </p>
                    </div>
                  </div>

                  {roomCardKey ? (
                    <div className="bg-black/40 text-center py-2.5 rounded-lg border border-emerald-500/20 text-xs font-mono font-bold text-emerald-400">
                      Code: {roomCardKey}
                    </div>
                  ) : (
                    <button
                      onClick={() => handlePurchaseStore("roomCard", 150)}
                      className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold rounded-xl cursor-pointer uppercase tracking-wider"
                    >
                      Redeem Perk
                    </button>
                  )}
                </div>

                {/* Store Perk: Coder Legendary Profile title */}
                <div className="bg-[#0b0e14] border border-white/5 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shadow-inner">
                        <Award className="w-5 h-5" />
                      </div>
                      <span className="text-yellow-400 text-xs font-mono font-bold flex items-center gap-1">
                        <Coins className="w-3 h-3" /> 200 GC
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Clan Slogan Tag Title: "No-Bug Splicer" {unlockedTitle && <Check className="w-4 h-4 text-emerald-500 shrink-0 inline ml-1" />}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        Wear your dominance with pride in coms channels! Replaces your generic 'Elite Cadet' signature text tag in the Guild Coms room with a prestigious violet header logo label.
                      </p>
                    </div>
                  </div>

                  <button
                    disabled={!!unlockedTitle}
                    onClick={() => handlePurchaseStore("title", 200)}
                    className={`w-full py-2 text-xs font-mono font-bold rounded-xl uppercase tracking-wider ${
                      unlockedTitle 
                        ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed" 
                        : "bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 cursor-pointer"
                    }`}
                  >
                    {unlockedTitle ? "Already Applied" : "Redeem Tag"}
                  </button>
                </div>

                {/* Store Perk: Cyber Frame Aura glow */}
                <div className="bg-[#0b0e14] border border-white/5 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-inner">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <span className="text-yellow-400 text-xs font-mono font-bold flex items-center gap-1">
                        <Coins className="w-3 h-3" /> 250 GC
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                        Cyber Dragon Aura Glow {activeFrameGlow && <Check className="w-4 h-4 text-emerald-500 shrink-0" />}
                      </h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                        Add a glowing, pulsating custom cyan and holographic container outline bordering your avatar on the active members list dashboard sidebar, demonstrating supreme ranks.
                      </p>
                    </div>
                  </div>

                  <button
                    disabled={!!activeFrameGlow}
                    onClick={() => handlePurchaseStore("glow", 250)}
                    className={`w-full py-2 text-xs font-mono font-bold rounded-xl uppercase tracking-wider ${
                      activeFrameGlow 
                        ? "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed" 
                        : "bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 cursor-pointer"
                    }`}
                  >
                    {activeFrameGlow ? "Applied" : "Redeem Core Aura"}
                  </button>
                </div>

              </div>
            </motion.div>
          )}

          {/* JOIN RECRUITS QUEUE VIEW */}
          {activeSubTab === "applicants" && (
            <motion.div
              key="applicants_view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="bg-[#0b0e14] border border-white/5 p-4 rounded-xl text-left">
                <span className="text-[9.5px] font-mono text-cyan-400 uppercase tracking-widest font-bold">Officer Clearance Gateway</span>
                <h3 className="text-sm font-display font-bold mt-1 text-white">Candidates Request Archive</h3>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  As an Officer block of the Guild, you hold authoritative clearance to accept or deny recruitment submissions.
                </p>
              </div>

              {joinRequests.length === 0 ? (
                <div className="border border-white/5 bg-[#0b0e14]/50 p-10 rounded-2xl text-center flex flex-col items-center justify-center space-y-2">
                  <UserCheck className="w-8 h-8 text-slate-500" />
                  <p className="text-xs text-slate-400">All applications sorted. No current pending recruit profiles.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {joinRequests.map((req) => (
                    <div 
                      key={req.id} 
                      className="bg-[#0b0e14] border border-cyan-500/10 hover:border-cyan-500/20 p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-colors"
                    >
                      <div className="flex items-start space-x-3 text-left">
                        <img 
                          src={req.avatar} 
                          alt={req.name} 
                          className="w-10 h-10 rounded-full border border-slate-700 shrink-0"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-white">{req.name}</span>
                            <span className="text-[8px] font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-1 rounded uppercase">
                              {req.role}
                            </span>
                          </div>
                          <span className="text-[9px] font-mono text-slate-500 block">Accumulated Score: {req.xp.toLocaleString()} XP</span>
                          <p className="text-[11px] text-slate-300 italic min-w-[200px] leading-relaxed block">
                            "{req.message}"
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => handleRejectRequest(req.id)}
                          className="px-3 py-1.5 rounded-lg border border-red-500/25 bg-red-500/5 hover:bg-red-500/15 text-red-400 hover:text-red-300 text-[10px] uppercase font-mono cursor-pointer transition-colors"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApproveRequest(req)}
                          className="px-3 py-1.5 rounded-lg border border-emerald-505/25 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 text-[10px] uppercase font-mono cursor-pointer transition-colors"
                        >
                          Approve
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 3. Right Sidebar: Active Guild Members (Interactive List) */}
      <div id="guild_members_sidebar" className="w-full lg:w-80 bg-[#070707] border-l border-white/10 p-5 flex flex-col shrink-0 overflow-y-auto">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">Guild Roster ({members.length}/30)</h3>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Active Synchronization" />
        </div>

        {/* Member Cards mapping */}
        <div className="space-y-2.5 mt-4">
          {members.map((member) => {
            const isUser = member.id === "active_user";
            let statusColor = "bg-slate-600";
            if (member.status === "online") statusColor = "bg-emerald-500 animate-pulse";
            if (member.status === "in sandbox") statusColor = "bg-blue-400";
            if (member.status === "in assessment") statusColor = "bg-amber-500 animate-pulse";

            return (
              <div 
                key={member.id}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  isUser 
                    ? "bg-cyan-500/5 border-cyan-400/40 shadow-inner" 
                    : "bg-[#0b0e14]/50 border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center space-x-3 text-left">
                  <div className="relative">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className={`w-9 h-9 rounded-full ${isUser ? activeFrameGlow : "border border-[#00A3FF]/40"}`}
                    />
                    <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-black ${statusColor}`} />
                  </div>

                  <div className="space-y-0.5 leading-none">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold font-sans text-slate-100 max-w-[120px] truncate block leading-none">
                        {member.name}
                      </span>
                    </div>

                    {member.titleBadge && (
                      <span className="text-[7.5px] text-fuchsia-400 font-mono font-bold uppercase block tracking-wider mt-0.5">
                        [{member.titleBadge}]
                      </span>
                    )}

                    <span className="text-[8px] font-mono text-slate-500 block uppercase font-semibold">
                      Rank: {member.role}
                    </span>
                  </div>
                </div>

                {/* Score Indicators */}
                <div className="text-right font-mono pr-1">
                  <span className="text-[10px] font-bold text-white block">{member.dogTags} tags</span>
                  <span className="text-[7.5px] text-slate-500 block">{member.xpContributed.toLocaleString()} XP</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tactical help details list */}
        <div className="mt-8 bg-[#162238]/20 border border-cyan-500/15 p-4 rounded-xl text-left text-[10px] text-slate-400 leading-relaxed font-mono">
          <span className="text-cyan-400 uppercase font-black text-[9px] tracking-widest block mb-1">Guild Rules Handbook</span>
          1. Accumulate daily streaking lines.<br />
          2. Complete speeds trivia matching grids to boost aggregate Dog Tag milestones.<br />
          3. Clear Custom Sandboxes to test new algorithm logic limits.
        </div>
      </div>

    </div>
  );
}
