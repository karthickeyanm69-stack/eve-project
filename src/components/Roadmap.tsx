import React, { useState, useEffect, useRef } from "react";
import { getCurriculum, CourseCurriculum, CheckpointQuestion } from "./curriculums";
import { motion, AnimatePresence } from "motion/react";
import {
  CheckCircle2,
  Lock,
  PlayCircle,
  Award,
  BookOpen,
  Sparkles,
  Clock,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Check,
  AlertTriangle,
  RotateCcw,
  Sparkle,
  Bot,
  Flame
} from "lucide-react";

interface RoadmapProps {
  onNodeComplete: (xpGained: number, nodeId?: string) => void;
  completedNodes: string[];
  activeInterest?: string | null;
  onAskEve?: (promptText: string) => void;
  completedReadings?: string[];
  completedStories?: string[];
  onModeComplete?: (nodeId: string, mode: "reading" | "story", xpGained: number) => void;
  xp?: number;
  level?: number;
  streak?: number;
  achievements?: string[];
  hasCertificate?: boolean;
  profileName?: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  estimatedXp: number;
  lessonsCount: number;
  type: "reading" | "test" | "final";
  phase: number;
}

// -------------------------------------------------------------
// CURRICULUM DATABASE
// -------------------------------------------------------------

interface StoryModeScene {
  id: number;
  title: string;
  narrative: string;
  dialogues: { character: string; role: string; avatar: string; text: string }[];
  challenge?: { q: string; o: string[]; a: string; explanation: string };
  imagePrompt: string;
  voiceover: string;
  musicStyle: string;
}

interface StoryMode {
  id: string;
  lessonId: string;
  title: string;
  genre: string;
  missionName: string;
  missionGoal: string;
  worldName: string;
  worldDesc: string;
  xp: number;
  scenes: StoryModeScene[];
  charactersList: { name: string; age: string; role: string; personality: string; motivation: string; avatar: string }[];
}

const generateStoryMode = (courseName: string, nodeId: string, curriculum: CourseCurriculum): StoryMode => {
  const normCourse = courseName.toLowerCase();
  const lesson = curriculum.lessons[nodeId];
  const slides = lesson?.slides || ["Welcome to the core logic node."];
  const question = lesson?.question || "What is the logic check?";
  const options = lesson?.options || ["A", "B", "C", "D"];
  const correct = lesson?.correct || "A";
  const explanation = lesson?.explanation || "Default check.";
  const title = curriculum.subtitles[parseInt(nodeId.split("_")[1]) - 1] || "Core Concepts";

  let genre = "Cyberpunk / Sci-Fi";
  let worldName = "The Cyber Academy mainframe";
  let worldDesc = "A glowing vertical web of logic grids and holographic code conduits floating in black space.";
  let missionName = "Operation: Matrix Calibration";
  let missionGoal = `Restore power to the sector mainframe by solving technical parameter validations.`;
  let storyTitle = `Grid Runner: ${title}`;

  let charactersList = [
    { name: "Cody", age: "19", role: "Console Cadet", personality: "Ambitious but slightly overwhelmed", motivation: "To graduate as a certified Tech Architect", avatar: "👨‍💻" },
    { name: "EVE", age: "Infinite", role: "Virtual Intelligence Mentor", personality: "Calm, precise, analytical", motivation: "Maintain ecosystem optimization and guide cadets", avatar: "🤖" },
    { name: "Byte", age: "3", role: "Grid Technician Drone", personality: "Playful, enthusiastic", motivation: "Scan memory banks and debug circuits", avatar: "⚡" }
  ];

  if (normCourse.includes("python")) {
    genre = "Adventure / Lost World";
    worldName = "The Python Sanctuary";
    worldDesc = "An ancient, moss-grown jungle temple filled with robotic serpent sentinels and logical obelisks.";
    missionName = "Operation: Serpent's Key";
    missionGoal = `Locate the ancestral logical matrix files using clean Python syntax commands.`;
    storyTitle = `Py-Quest: Temple of ${title}`;
    charactersList = [
      { name: "Aria", age: "22", role: "Jungle Archaeologist", personality: "Brave, curious, sharp", motivation: "Discover ancient mathematical relics", avatar: "🤠" },
      { name: "EVE", age: "Infinite", role: "AI Navigator Subroutine", personality: "Knowledgeable, helpful", motivation: "Protect Aria from ancient defensive logic traps", avatar: "🤖" },
      { name: "Nix", age: "1", role: "Scout Drone", personality: "Silly, alert", motivation: "Map corridors and locate variables in memory banks", avatar: "👾" }
    ];
  } else if (normCourse.includes("ai") || normCourse.includes("machine") || normCourse.includes("learning") || normCourse.includes("data")) {
    genre = "Synthwave Cyberpunk";
    worldName = "Neural Nexus Core";
    worldDesc = "A neon-soaked server network pulsing with self-learning neural synapses and gradient vectors.";
    missionName = "Operation: Synaptic Sync";
    missionGoal = `Train the mainframe algorithms and adjust synaptic weight values to prevent a database collapse.`;
    storyTitle = `Neural Nexus: ${title}`;
    charactersList = [
      { name: "Cipher", age: "25", role: "Synapse Engineer", personality: "Focused, analytical, cool", motivation: "Calibrate self-learning neural engines", avatar: "🧠" },
      { name: "EVE", age: "Infinite", role: "Nexus System AI Core", personality: "Sophisticated, protective", motivation: "Optimize learning rates and loss functions", avatar: "🤖" },
      { name: "Scalar", age: "2", role: "Validation Sprite", personality: "Dynamic, quick", motivation: "Track data accuracy and F1 scores", avatar: "📈" }
    ];
  } else if (normCourse.includes("security") || normCourse.includes("cyber")) {
    genre = "Hacking Thriller / Cyber Ops";
    worldName = "The Rogue Sector Firewall";
    worldDesc = "A dark virtual grid protected by glowing green walls of code and security subroutines.";
    missionName = "Operation: Sentinel Breach";
    missionGoal = `Audit encryption blocks and patch security gaps before rogue subroutines override system privileges.`;
    storyTitle = `Red-Team Ops: ${title}`;
    charactersList = [
      { name: "Apex", age: "21", role: "Red-Team Auditor", personality: "Intelligent, rebellious, precise", motivation: "Keep network grids safe from malicious intrusions", avatar: "🕵️" },
      { name: "EVE", age: "Infinite", role: "Defense Subroutine Sentinel", personality: "Authoritative, vigilant", motivation: "Guard core logic registers and decrypt signals", avatar: "🤖" },
      { name: "Cipher-Dog", age: "4", role: "Support Daemon", personality: "Alert, hyperactive", motivation: "Decompress network logs and scan ports", avatar: "🐶" }
    ];
  }

  const mentorName = charactersList[1].name;
  const mainName = charactersList[0].name;
  const helperName = charactersList[2].name;

  const scenes: StoryModeScene[] = [
    {
      id: 1,
      title: "Sector Outage Alarm",
      narrative: `Warning! A logical mismatch has triggered in ${worldName}. Energy grids fluctuate. ${mainName} checks the console while ${mentorName} initializes data logs.`,
      dialogues: [
        { character: mentorName, role: charactersList[1].role, avatar: charactersList[1].avatar, text: `Warning, cadet! A critical exception has locked our parameters in this sector. We must deploy standard synchronization protocols.` },
        { character: mainName, role: charactersList[0].role, avatar: charactersList[0].avatar, text: `System online. I am opening the telemetry buffers. What are we dealing with, ${mentorName}?` },
        { character: helperName, role: charactersList[2].role, avatar: charactersList[2].avatar, text: `Squeak! Core registers detected! Memory allocation is currently unmapped!` }
      ],
      imagePrompt: `Futuristic dark room with glowing blue holographic screens, cyberpunk digital environment, detailed illustration, sci-fi concept art`,
      voiceover: `System alert. Sector integrity is decaying. Initialize synchronization protocols.`,
      musicStyle: `Dark Synthwave, slow pulse`
    },
    {
      id: 2,
      title: "Scanning the Blueprint",
      narrative: `${mentorName} scans the sector database and decrypts the initial transmission log. To proceed, ${mainName} must comprehend the basic layers.`,
      dialogues: [
        { character: mentorName, role: charactersList[1].role, avatar: charactersList[1].avatar, text: `Analyze this blueprint transmission data immediately: "${slides[0] || slides[1]}"` },
        { character: mainName, role: charactersList[0].role, avatar: charactersList[0].avatar, text: `Ah! That establishes our foundation variables. So we are structuring our logic container first!` },
        { character: helperName, role: charactersList[2].role, avatar: charactersList[2].avatar, text: `Bip-bip! Diagnostic scan complete. Let's calibrate the next logical coordinate!` }
      ],
      imagePrompt: `Holographic grid blueprint floating in midair, blue and violet lighting, digital interface, detailed, cinematic lighting`,
      voiceover: `Telemetry decrypted. Analyzing core database structures.`,
      musicStyle: `Tech Ambient, digital clicks`
    },
    {
      id: 3,
      title: "Logic Core Alignment",
      narrative: `Deep inside the mainframe, you encounter the primary processor nodes. ${mainName} must apply core parameters to calibrate the system flow.`,
      dialogues: [
        { character: mentorName, role: charactersList[1].role, avatar: charactersList[1].avatar, text: `Excellent progress. We are approaching the primary alignment gate. Review this technical parameter: "${slides[2] || slides[1]}"` },
        { character: mainName, role: charactersList[0].role, avatar: charactersList[0].avatar, text: `Got it! This binds our active components together. The grid vectors are stabilizing.` }
      ],
      imagePrompt: `Power generator node glowing with blue electricity, high technology matrix, detailed, Unreal Engine render`,
      voiceover: `Approaching logic gate. Calibrating system parameters.`,
      musicStyle: `Electronic Beats, retro futuristic`
    },
    {
      id: 4,
      title: "Optimizing the Grid Buffer",
      narrative: `A network bottleneck triggers! Defensive security systems lock down the sector. ${mainName} applies technical optimizations to clear the queue.`,
      dialogues: [
        { character: mentorName, role: charactersList[1].role, avatar: charactersList[1].avatar, text: `Warning! Queue limit reached. We must optimize memory parameters immediately: "${slides[3] || slides[4]}"` },
        { character: mainName, role: charactersList[0].role, avatar: charactersList[0].avatar, text: `Applying memory allocation sweeps now. The buffer backlog is clearing! The terminal console is active!` }
      ],
      imagePrompt: `Network server racks with pulsing green and red LEDs, network cables, dark futuristic server room, detailed`,
      voiceover: `System bottleneck detected. Initiating buffer clear sweeps.`,
      musicStyle: `Action Synth, fast pacing`
    },
    {
      id: 5,
      title: "Terminal Override Mission",
      narrative: `You stand before the sector central console. To complete the mission and bypass system lockouts, you must override the logic gate question.`,
      dialogues: [
        { character: mentorName, role: charactersList[1].role, avatar: charactersList[1].avatar, text: `The control mainframe requires a validated compile confirmation. Answer the check parameter to deploy the system patch!` }
      ],
      challenge: {
        q: question,
        o: options,
        a: correct,
        explanation: explanation
      },
      imagePrompt: `Cadet typing on a large glowing terminal keyboard, giant cyberpunk monitor screen, dark shadows, epic scale`,
      voiceover: `Terminal override active. Input logical validation check.`,
      musicStyle: `Tense Orchestral Synth, dramatic climax`
    }
  ];

  return {
    id: `story_${nodeId}`,
    lessonId: nodeId,
    title: storyTitle,
    genre: genre,
    missionName: missionName,
    missionGoal: missionGoal,
    worldName: worldName,
    worldDesc: worldDesc,
    xp: 50,
    scenes: scenes,
    charactersList: charactersList
  };
};

const nodeCoordinates: Record<string, { x: number; y: number }> = {
  node_1: { x: 37, y: 16 },
  node_2: { x: 61, y: 21 },
  node_3: { x: 27, y: 29 },
  node_4: { x: 25, y: 38 },
  node_5: { x: 61, y: 29.5 },
  node_6: { x: 68, y: 42.5 },
  node_7: { x: 23, y: 49 },
  node_8: { x: 21, y: 58 },
  node_9: { x: 68, y: 63.5 },
  node_10: { x: 61, y: 51.5 },
  node_11: { x: 20, y: 67 },
  node_12: { x: 64, y: 68 },
  node_13: { x: 27, y: 77 },
  node_14: { x: 48, y: 78 },
  node_15: { x: 63, y: 81 },
  node_16: { x: 50, y: 88.5 }
};

interface InteractiveChallenge {
  type: "drag_drop" | "true_false" | "rearrange" | "predict_output" | "choose_syntax" | "error_spotting" | "mcq";
  prompt: string;
  code?: string;
  options: string[];
  correct: string;
  explanation: string;
  blankSentence?: string;
  blankWord?: string;
  lines?: string[];
  segments?: string[];
  correctIdx?: number;
}

const getInteractiveChallenge = (nodeId: string, lesson: any, activeCourse: string): InteractiveChallenge => {
  const normCourse = activeCourse.toLowerCase();
  
  if (nodeId === "node_1") {
    const isPy = normCourse.includes("python");
    return {
      type: "drag_drop",
      prompt: "Click the correct code token to fill the blank sentence:",
      blankSentence: isPy
        ? "Create comments in Python using the ________ character."
        : "The ________ tag is most appropriate for defining self-contained compositions.",
      blankWord: isPy ? "#" : "<article>",
      options: lesson.options,
      correct: lesson.correct,
      explanation: lesson.explanation
    };
  }
  
  if (nodeId === "node_2") {
    const isPy = normCourse.includes("python");
    return {
      type: "true_false",
      prompt: isPy
        ? "True or False: The range(3) function generates numbers up to 3 inclusive (0, 1, 2, 3)."
        : "True or False: The CSS Box Model 'Padding' property defines the spacing outside the element's border.",
      options: ["True", "False"],
      correct: "False",
      explanation: lesson.explanation
    };
  }
  
  if (nodeId === "node_3") {
    const isPy = normCourse.includes("python");
    const lines = isPy
      ? ["my_list = []", "my_list.append('EVE')", "my_list.append('UNAI')", "print(my_list)"]
      : [".grid-container {", "  display: grid;", "  grid-template-columns: repeat(3, 1fr);", "}"];
    return {
      type: "rearrange",
      prompt: "Rearrange the lines of code in the correct sequence using the arrows:",
      lines: lines,
      correct: lines.join("\n"),
      options: [],
      explanation: lesson.explanation
    };
  }
  
  if (nodeId === "node_6") {
    const isPy = normCourse.includes("python");
    const code = isPy
      ? `def double(x):\n    return x * 2\n\nprint(double(5))`
      : `let x = 10;\nif (true) {\n  let x = 20;\n}\nconsole.log(x);`;
    return {
      type: "predict_output",
      prompt: "Predict the final logged output of this program in the terminal:",
      code: code,
      options: lesson.options,
      correct: lesson.correct,
      explanation: lesson.explanation
    };
  }
  
  if (nodeId === "node_7") {
    const isPy = normCourse.includes("python");
    return {
      type: "drag_drop",
      prompt: "Click the correct keyword to complete the code block:",
      blankSentence: isPy
        ? "def __init__(________, name):\n    self.name = name"
        : "________ function add(x, y) {\n    return await getResult();\n}",
      blankWord: isPy ? "self" : "async",
      options: lesson.options,
      correct: lesson.correct,
      explanation: lesson.explanation
    };
  }
  
  if (nodeId === "node_8") {
    const isPy = normCourse.includes("python");
    const segments = isPy
      ? ["class", " Child", "(Parent)", "[no_colon]"]
      : ["const", " btn", " =", " document.getElementByID", "('btn')"];
    const errIdx = 3;
    return {
      type: "error_spotting",
      prompt: "Identify and click the code segment that contains a syntax or naming error:",
      segments: segments,
      correctIdx: errIdx,
      options: [],
      correct: lesson.correct,
      explanation: lesson.explanation
    };
  }
  
  return {
    type: "choose_syntax",
    prompt: lesson.question,
    options: lesson.options,
    correct: lesson.correct,
    explanation: lesson.explanation
  };
};

export default function Roadmap({
  onNodeComplete,
  completedNodes = [],
  activeInterest = "Web Development",
  onAskEve,
  completedReadings = [],
  completedStories = [],
  onModeComplete = () => {},
  xp = 2450,
  level = 3,
  streak = 12,
  achievements = [],
  hasCertificate = false,
  profileName = "VIDYON CADET"
}: RoadmapProps) {
  // Get active course curriculum database dynamically
  const activeCourse = activeInterest || "Web Development";
  const curriculum = getCurriculum(activeCourse);

  // Map curriculum database back into the 16 structured nodes
  const roadmapNodes: RoadmapNode[] = [
    { id: "node_1", title: "Reading Session 1", subtitle: curriculum.subtitles[0], description: curriculum.descriptions[0], estimatedXp: 50, lessonsCount: 5, type: "reading", phase: 1 },
    { id: "node_2", title: "Reading Session 2", subtitle: curriculum.subtitles[1], description: curriculum.descriptions[1], estimatedXp: 50, lessonsCount: 5, type: "reading", phase: 1 },
    { id: "node_3", title: "Reading Session 3", subtitle: curriculum.subtitles[2], description: curriculum.descriptions[2], estimatedXp: 50, lessonsCount: 5, type: "reading", phase: 1 },
    { id: "node_4", title: "Reading Session 4", subtitle: curriculum.subtitles[3], description: curriculum.descriptions[3], estimatedXp: 50, lessonsCount: 5, type: "reading", phase: 1 },
    { id: "node_5", title: "Knowledge Test 1", subtitle: curriculum.subtitles[4], description: curriculum.descriptions[4], estimatedXp: 200, lessonsCount: 20, type: "test", phase: 1 },

    { id: "node_6", title: "Reading Session 5", subtitle: curriculum.subtitles[5], description: curriculum.descriptions[5], estimatedXp: 50, lessonsCount: 5, type: "reading", phase: 2 },
    { id: "node_7", title: "Reading Session 6", subtitle: curriculum.subtitles[6], description: curriculum.descriptions[6], estimatedXp: 50, lessonsCount: 5, type: "reading", phase: 2 },
    { id: "node_8", title: "Reading Session 7", subtitle: curriculum.subtitles[7], description: curriculum.descriptions[7], estimatedXp: 50, lessonsCount: 5, type: "reading", phase: 2 },
    { id: "node_9", title: "Reading Session 8", subtitle: curriculum.subtitles[8], description: curriculum.descriptions[8], estimatedXp: 50, lessonsCount: 5, type: "reading", phase: 2 },
    { id: "node_10", title: "Knowledge Test 2", subtitle: curriculum.subtitles[9], description: curriculum.descriptions[9], estimatedXp: 200, lessonsCount: 20, type: "test", phase: 2 },

    { id: "node_11", title: "Reading Session 9", subtitle: curriculum.subtitles[10], description: curriculum.descriptions[10], estimatedXp: 50, lessonsCount: 5, type: "reading", phase: 3 },
    { id: "node_12", title: "Reading Session 10", subtitle: curriculum.subtitles[11], description: curriculum.descriptions[11], estimatedXp: 50, lessonsCount: 5, type: "reading", phase: 3 },
    { id: "node_13", title: "Reading Session 11", subtitle: curriculum.subtitles[12], description: curriculum.descriptions[12], estimatedXp: 50, lessonsCount: 5, type: "reading", phase: 3 },
    { id: "node_14", title: "Reading Session 12", subtitle: curriculum.subtitles[13], description: curriculum.descriptions[13], estimatedXp: 50, lessonsCount: 5, type: "reading", phase: 3 },
    { id: "node_15", title: "Knowledge Test 3", subtitle: curriculum.subtitles[14], description: curriculum.descriptions[14], estimatedXp: 300, lessonsCount: 20, type: "test", phase: 3 },

    { id: "node_16", title: "Final Comprehensive Test", subtitle: curriculum.subtitles[15], description: curriculum.descriptions[15], estimatedXp: 1000, lessonsCount: 15, type: "final", phase: 4 },
  ];

  // Selected state controllers
  const [selectedNode, setSelectedNode] = useState<RoadmapNode | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [quizStatus, setQuizStatus] = useState<"idle" | "correct" | "incorrect">("idle");

  // Interactive mini-game states
  const [sequenceBlocks, setSequenceBlocks] = useState<string[]>([]);
  const [selectedHotspot, setSelectedHotspot] = useState<number | null>(null);

  // Split learning modes: null (menu) | "reading" | "story"
  const [activeMode, setActiveMode] = useState<null | "reading" | "story">(null);
  const [storyActiveSceneIdx, setStoryActiveSceneIdx] = useState(0);

  // Test states
  const [testActive, setTestActive] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [testAnswers, setTestAnswers] = useState<Record<number, string>>({});
  const [testFinished, setTestFinished] = useState(false);
  const [testScore, setTestScore] = useState(0);
  const [testPassed, setTestPassed] = useState(false);
  const [activeTestQuestions, setActiveTestQuestions] = useState<CheckpointQuestion[]>([]);
  const [isTestQuestionsLoading, setIsTestQuestionsLoading] = useState(false);
  const [lives, setLives] = useState(5);

  // Timed state for Final Test
  const [timerSeconds, setTimerSeconds] = useState(600); // 10 minutes default
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Confetti particles generator
  const [confettiActive, setConfettiActive] = useState(false);
  const [confettiParticles, setConfettiParticles] = useState<Array<{
    id: number; x: number; delay: number; color: string; size: number; duration: number;
  }>>([]);

  // Reward Card & Certificate slides
  const [showRewardCard, setShowRewardCard] = useState(false);
  const [rewardCardData, setRewardCardData] = useState<{
    title: string; xp: number; badge: string; hint: string; cert?: boolean;
  } | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const outerStory = selectedNode && selectedNode.type === "reading"
    ? generateStoryMode(activeCourse, selectedNode.id, curriculum)
    : null;
  const outerCurrentScene = outerStory ? outerStory.scenes[storyActiveSceneIdx] : null;

  // Reset node configuration if course changes mid-way to prevent state mismatch
  useEffect(() => {
    setSelectedNode(null);
    setTestActive(false);
    setTestFinished(false);
  }, [activeInterest]);

  // Determine actual visual status of a node
  const getNodeStatus = (node: RoadmapNode) => {
    if (node.type === "reading") {
      if (completedStories.includes(node.id)) return "completed";
    } else {
      if (completedNodes.includes(node.id)) return "completed";
    }

    const nodeIndex = roadmapNodes.findIndex(n => n.id === node.id);
    if (nodeIndex === 0) return "available";

    const prevNode = roadmapNodes[nodeIndex - 1];
    const isPrevCompleted = prevNode.type === "reading"
      ? completedStories.includes(prevNode.id)
      : completedNodes.includes(prevNode.id);

    if (isPrevCompleted) return "available";

    return "locked";
  };

  // Trigger confetti particles
  const triggerConfetti = () => {
    setConfettiActive(true);
    const colors = ["#39ff14", "#00A3FF", "#00F0FF", "#ff007f", "#ffea00", "#9d00ff"];
    const particles = Array.from({ length: 120 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // random start horizontal %
      delay: Math.random() * 2, // staggered delays
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 6,
      duration: Math.random() * 2.5 + 2 // duration of fall (seconds)
    }));
    setConfettiParticles(particles);

    // Stop after animation finishes
    setTimeout(() => {
      setConfettiActive(false);
    }, 4500);
  };

  // Final Timed Assessment counter
  useEffect(() => {
    if (testActive && selectedNode?.type === "final" && !testFinished) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinishTest(true); // auto finish when time runs out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testActive, testFinished, selectedNode]);

  // Click node handler
  const handleOpenNode = (node: RoadmapNode) => {
    const status = getNodeStatus(node);
    if (status === "locked") return; // locked click has no effect

    setSelectedNode(node);
    setCurrentSlide(0);
    setUserAnswer("");
    setQuizStatus("idle");
    setTestActive(false);
    setCurrentQuestionIdx(0);
    setTestAnswers({});
    setTestFinished(false);
    setTimerSeconds(600);
    setActiveMode(node.type === "reading" ? "story" : null);
    setStoryActiveSceneIdx(0);

    // Reset interactive mini-game states
    setSequenceBlocks([]);
    setSelectedHotspot(null);
  };

  // Verify single reading validation question
  const handleVerifyReadingAnswer = () => {
    if (!selectedNode) return;
    const lesson = curriculum.lessons[selectedNode.id];
    if (!lesson) return;

    if (userAnswer === lesson.correct) {
      setQuizStatus("correct");
      triggerConfetti();

      // Award XP & set progress
      onModeComplete(selectedNode.id, "reading", selectedNode.estimatedXp);

      // Setup slide-in reward card info
      setRewardCardData({
        title: `${selectedNode.title} (Reading Mode)`,
        xp: selectedNode.estimatedXp,
        badge: `${activeCourse} Reading Synced ⭐`,
        hint: "+1 Lesson Completed Profile Sync"
      });
      setShowRewardCard(true);
    } else {
      setQuizStatus("incorrect");
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  // Checkpoint & Final test action handlers
  const handleStartTest = async () => {
    if (!selectedNode) return;
    setIsTestQuestionsLoading(true);
    setTestActive(true);
    setTestFinished(false);
    setCurrentQuestionIdx(0);
    setTestAnswers({});
    setTimerSeconds(selectedNode.type === "final" ? 600 : 0);
    setActiveTestQuestions([]);

    const count = selectedNode.type === "final" ? 15 : 20;

    try {
      const response = await fetch("/api/gemini/questions-generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseName: activeCourse,
          testType: selectedNode.type,
          count: count
        })
      });

      if (!response.ok) throw new Error("Failed to fetch dynamic questions");
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setActiveTestQuestions(data);
      }
    } catch (err) {
      console.warn("Using offline static fallback questions:", err);
      // Fallback is handled automatically when activeTestQuestions is empty
    } finally {
      setIsTestQuestionsLoading(false);
    }
  };

  const handleSelectTestOption = (option: string) => {
    setTestAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: option
    }));
  };

  const handleNextQuestion = () => {
    const questions = activeTestQuestions.length > 0
      ? activeTestQuestions
      : (selectedNode?.type === "final"
        ? curriculum.finalQuestions
        : curriculum.checkpoints[selectedNode?.id || ""]?.questions);

    if (!questions) return;
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(idx => idx + 1);
    } else {
      handleFinishTest(false);
    }
  };

  const handleFinishTest = (timeOut = false) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const questions = activeTestQuestions.length > 0
      ? activeTestQuestions
      : (selectedNode?.type === "final"
        ? curriculum.finalQuestions
        : curriculum.checkpoints[selectedNode?.id || ""]?.questions);

    if (!questions) return;

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (testAnswers[idx] === q.a) {
        correctCount++;
      }
    });

    const score = Math.round((correctCount / questions.length) * 100);
    const passThreshold = selectedNode?.type === "final" ? 70 : 50;
    const passed = score >= passThreshold;

    setTestScore(score);
    setTestPassed(passed);
    setTestFinished(true);

    if (passed && selectedNode) {
      triggerConfetti();
      onNodeComplete(selectedNode.estimatedXp, selectedNode.id);

      if (selectedNode.type === "final") {
        setRewardCardData({
          title: `🏆 ${activeCourse} Master`,
          xp: selectedNode.estimatedXp,
          badge: "🥇 Master Champion Badge",
          hint: `🎖 Graduate Certificate in ${activeCourse} & Champion Title!`,
          cert: true
        });
      } else {
        const details = curriculum.checkpoints[selectedNode.id];
        setRewardCardData({
          title: `📝 Checkpoint Test Sync`,
          xp: selectedNode.estimatedXp,
          badge: details?.badge || "Badge Unlock",
          hint: details?.hint || "Hint reward unlocked"
        });
      }

      // Delay showing reward card for visual impact
      setTimeout(() => {
        setShowRewardCard(true);
      }, 600);
    } else {
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  // Close panel
  const handleClosePanel = () => {
    setSelectedNode(null);
    setTestActive(false);
    setTestFinished(false);
    setActiveMode(null);
    setStoryActiveSceneIdx(0);
  };

  // Calculate Progress Percent for visual connector line
  const completedCount = completedNodes.length;
  const totalCount = roadmapNodes.length;
  const progressPercent = totalCount > 1
    ? Math.min(100, Math.max(0, ((completedCount - 1) / (totalCount - 1)) * 100))
    : 0;

  return (
    <div id="roadmap_module" className="min-h-full flex flex-col space-y-6 select-none relative">

      {/* Styles for confetti falling animations */}
      <style>{`
        @keyframes confetti-fall-drift {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0px);
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) rotate(360deg) translateX(50px);
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) rotate(720deg) translateX(-50px);
            opacity: 0;
          }
        }
        .confetti-piece {
          position: fixed;
          top: -20px;
          z-index: 100;
          pointer-events: none;
          animation: confetti-fall-drift 4s linear forwards;
          border-radius: 4px;
        }
        .map-node-label {
          color: white;
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          font-weight: 800;
          font-size: 10px;
          text-align: center;
          text-shadow: -1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000, 0 2px 4px rgba(0,0,0,0.85);
          white-space: nowrap;
          pointer-events: none;
        }
      `}</style>

      {/* Confetti Overlay */}
      {confettiActive && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {confettiParticles.map((p) => (
            <div
              key={p.id}
              className="confetti-piece"
              style={{
                left: `${p.x}%`,
                backgroundColor: p.color,
                width: `${p.size}px`,
                height: `${p.size * 0.6}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Slide-in Reward Card */}
      <AnimatePresence>
        {showRewardCard && rewardCardData && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="w-full max-w-md bg-[#0a0a0a] border border-[#00A3FF]/30 rounded-3xl p-6 text-center shadow-[0_0_50px_rgba(0,163,255,0.15)] relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-unai-neon via-unai-blue to-unai-purple" />

              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#00A3FF] to-[#00F0FF] flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(0,163,255,0.4)]">
                <Trophy className="w-8 h-8 text-black" />
              </div>

              <h3 className="text-xl font-display font-bold text-white uppercase tracking-wider">
                COMPILATION COMPLETE! 🎉
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">{rewardCardData.title}</p>

              {/* Rewards List */}
              <div className="bg-[#050505] border border-slate-900 rounded-2xl p-4 my-5 text-left space-y-3 font-mono">
                <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                  <span className="text-slate-500">EXPERIENCE REWARD:</span>
                  <span className="text-[#00F0FF] font-bold">+{rewardCardData.xp} XP</span>
                </div>

                <div className="flex items-center justify-between text-xs border-b border-white/5 pb-2">
                  <span className="text-slate-500">ACHIEVEMENT BADGE:</span>
                  <span className="text-unai-neon font-bold flex items-center gap-1">
                    {rewardCardData.badge}
                  </span>
                </div>

                <div className="text-xs pt-1">
                  <span className="text-slate-500 block mb-1">UNLOCKED ITEMS:</span>
                  <span className="text-slate-350 block text-[11px] leading-relaxed">
                    {rewardCardData.hint}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {rewardCardData.cert && (
                  <button
                    onClick={() => {
                      setShowRewardCard(false);
                      setShowCertificate(true);
                    }}
                    className="w-full py-3 bg-unai-neon text-black font-display font-bold text-xs rounded-xl hover:scale-[1.01] active:scale-99 transition-all cursor-pointer shadow-[0_0_20px_rgba(57,255,20,0.3)] uppercase tracking-wide"
                  >
                    View Graduate Certificate 🎓
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowRewardCard(false);
                    setRewardCardData(null);
                    handleClosePanel();
                  }}
                  className="w-full py-3 bg-[#00A3FF] text-black font-display font-bold text-xs rounded-xl hover:scale-[1.01] active:scale-99 transition-all cursor-pointer uppercase tracking-wider"
                >
                  Return to Roadmap
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Graduation Certificate Modal */}
      <AnimatePresence>
        {showCertificate && (
          <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-[#090909] border-4 border-double border-[#00A3FF]/40 rounded-3xl p-8 sm:p-12 text-center shadow-[0_0_100px_rgba(0,163,255,0.25)] relative overflow-hidden"
            >
              {/* Elegant borders */}
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#00A3FF]/10 rounded-2xl pointer-events-none" />
              <div className="absolute top-6 left-6 right-6 bottom-6 border border-dashed border-[#00A3FF]/10 rounded-2xl pointer-events-none" />

              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-mono text-[#00A3FF] tracking-widest">EVE × UNAI ECOSYSTEM</span>
                <span className="text-[10px] font-mono text-unai-neon tracking-widest">VERIFIED COMPILER</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight uppercase">
                Certificate of Completion
              </h2>
              <div className="w-32 h-1 bg-[#00A3FF] mx-auto my-6" />

              <p className="text-xs sm:text-sm font-mono text-slate-400 max-w-lg mx-auto leading-relaxed">
                This document verifies that the core credentials of the cadet system sync have successfully integrated and completed the
              </p>

              <h3 className="text-xl sm:text-2xl font-display font-bold text-unai-neon mt-4 uppercase tracking-widest">
                {activeCourse} Core Learning Path
              </h3>

              <div className="my-8">
                <span className="text-[11px] font-mono text-slate-500 uppercase block">AWARDED TO CADET NODE</span>
                <span className="text-2xl sm:text-3xl font-display font-bold text-white block mt-2 border-b border-[#00A3FF]/20 pb-2 max-w-sm mx-auto">
                  {profileName || "VIDYON CADET"}
                </span>
              </div>

              <p className="text-xs font-mono text-slate-400 max-w-md mx-auto leading-relaxed">
                Completed with full passing score parameters across all core topics, checkpoint assessments and the comprehensive timed final exam in {activeCourse}.
              </p>

              <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
                <div className="text-center sm:text-left">
                  <span>DATE COMPLETED:</span>
                  <span className="text-slate-350 block mt-1">{new Date().toLocaleDateString()}</span>
                </div>

                <div className="w-16 h-16 rounded-full border-2 border-unai-neon/40 flex items-center justify-center text-unai-neon font-display font-extrabold text-sm shadow-[0_0_15px_rgba(57,255,20,0.15)] animate-pulse">
                  PASSED
                </div>

                <div className="text-center sm:text-right">
                  <span>SYSTEM CERTIFICATE ID:</span>
                  <span className="text-slate-350 block mt-1">EVE-{activeCourse.substring(0, 3).toUpperCase()}-{Math.floor(Math.random() * 900000 + 100000)}</span>
                </div>
              </div>

              <button
                onClick={() => setShowCertificate(false)}
                className="mt-8 px-8 py-3 bg-[#00A3FF] text-black font-display font-bold text-xs rounded-xl hover:scale-[1.01] transition-all cursor-pointer uppercase tracking-wider"
              >
                Close Certificate
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* LEFT COLUMN: Illustrated Adventure Map */}
        <div
          className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-xl aspect-[2/3] w-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/roadmap_bg.png')",
          }}
        >
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/10 pointer-events-none rounded-3xl" />

          {/* Animated Paper Plane flying in the sky */}
          <motion.div
            className="absolute z-20 pointer-events-none text-indigo-500/80"
            initial={{ left: "-10%", top: "4%", rotate: 15, scale: 0.7 }}
            animate={{
              left: ["-10%", "110%"],
              top: ["4%", "8%", "3%", "5%"],
              rotate: [15, 20, 10, 15],
              scale: [0.7, 0.9, 0.8, 0.7]
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg
              className="w-6 h-6 fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]"
              viewBox="0 0 24 24"
            >
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </motion.div>

          {/* HUD: Top bar (hearts + course + XP) */}
          <div className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-5 pt-4 pb-2 pointer-events-none">
            {/* Hearts */}
            <button
              onClick={() => {
                if (lives < 5) {
                  setLives(5);
                  alert("💖 EVE Auto-regen complete: Hearts restored to 5!");
                }
              }}
              title={lives < 5 ? "Click to restore hearts" : "Hearts fully charged"}
              className="flex items-center gap-1.5 bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/60 px-3.5 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all active:scale-95 pointer-events-auto cursor-pointer outline-none"
            >
              <span className="text-sm">❤️</span>
              <span className="font-black text-xs text-white">{lives}</span>
            </button>

            {/* Course name badge */}
            <div className="flex items-center gap-1.5 bg-slate-900/95 border border-indigo-500/40 px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] select-none pointer-events-auto">
              <span className="text-xs">
                {activeCourse.toLowerCase().includes("python") ? "🐍" :
                  activeCourse.toLowerCase().includes("java") ? "☕" :
                    activeCourse.toLowerCase().includes("javascript") || activeCourse.toLowerCase().includes("web") ? "🌐" : "💻"}
              </span>
              <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">{activeCourse}</span>
            </div>

            {/* XP total */}
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-amber-500/50 px-3.5 py-1.5 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.3)] select-none pointer-events-auto">
              <span className="text-sm">⭐</span>
              <span className="font-black text-xs text-amber-400">{xp.toLocaleString()} XP</span>
            </div>
          </div>

          {/* Static Start platform at the top (overlays the Start dial in background image) */}
          <div
            className="absolute z-20 -translate-y-1/2 -translate-x-1/2"
            style={{
              left: "50%",
              top: "9%"
            }}
          >
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-white border-2 border-slate-350 rounded-full flex items-center justify-center shadow-lg mb-1">
                <Bot className="w-5 h-5 text-slate-500 animate-pulse" />
              </div>
              <div className="bg-amber-700 border-2 border-amber-900 text-white font-black text-[9px] px-3 py-0.5 rounded-full shadow-lg uppercase tracking-widest">
                Start
              </div>
            </div>
          </div>


          {/* Active Robot Character stands adjacent to the available/active node */}
          {(() => {
            const activeNode = roadmapNodes.find(n => getNodeStatus(n) === "available");
            const robotCoords = activeNode ? nodeCoordinates[activeNode.id] : null;
            if (!robotCoords) return null;
            const offset = robotCoords.x < 50 ? 7.5 : -7.5;

            // Adjust Y position if the active node is a castle with a shifted button
            let verticalOffset = 0;
            if (activeNode.type === "final") {
              verticalOffset = 64; // px
            } else if (activeNode.type === "test") {
              verticalOffset = 52; // px
            }

            return (
              <div
                className="absolute z-35 -translate-y-1/2 -translate-x-1/2 transition-all duration-700"
                style={{
                  left: `${robotCoords.x + offset}%`,
                  top: `calc(${robotCoords.y}% + ${verticalOffset}px)`
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="bg-sky-500/90 text-white font-mono font-bold text-[7.5px] px-1 rounded-sm shadow-md animate-bounce mb-1">
                    ACTIVE
                  </div>
                  <div className="w-9 h-9 bg-white border-2 border-sky-400 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-sky-500" />
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Map Nodes absolutely placed along the winding path */}
          {roadmapNodes.map((node) => {
            const status = getNodeStatus(node);
            const coords = nodeCoordinates[node.id] || { x: 50, y: 50 };



            // Dynamic Styling for Buttons and Badges
            let buttonClass = "";
            let xpBadgeClass = "";
            let nodeIcon = null;

            // Define Castle Gate SVGs inline
            const ClosedGateIcon = () => (
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M3 21V8l3-3h12l3 3v13" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 21v-4a3 3 0 0 1 6 0v4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 17h4M10 19h4M12 17v4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 8h10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            );

            const OpenGateIcon = () => (
              <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M3 21V8l3-3h12l3 3v13" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 21v-6a3 3 0 0 1 6 0v6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 14l3 7M18 14l-3 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            );

            if (node.type === "final") {
              // Final castle size config
              xpBadgeClass = "bg-gradient-to-r from-amber-500 to-yellow-500 border-amber-400 text-slate-950 animate-pulse text-[9.5px] font-black px-2 py-0.5 rounded-full mb-1.5 shadow-md border";
              if (status === "completed") {
                buttonClass = "w-24 h-24 flex items-center justify-center text-emerald-400 filter drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]";
                nodeIcon = <Trophy className="w-10 h-10" />;
              } else if (status === "available") {
                buttonClass = "w-28 h-28 flex items-center justify-center text-amber-300 filter drop-shadow-[0_0_15px_rgba(245,158,11,0.9)] animate-pulse";
                nodeIcon = <Trophy className="w-12 h-12" />;
              } else {
                buttonClass = "w-24 h-24 flex items-center justify-center text-slate-500/80";
                nodeIcon = <Lock className="w-7 h-7" />;
              }
            } else if (node.type === "test") {
              // Castle size config
              xpBadgeClass = "bg-purple-600 border-purple-400 text-white text-[8.5px] font-black px-1.5 py-0.5 rounded-full mb-1 shadow-sm border border-purple-500/30 select-none";
              if (status === "completed") {
                buttonClass = "w-18 h-18 flex items-center justify-center text-emerald-400 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]";
                nodeIcon = <Check className="w-7 h-7 stroke-[3]" />;
              } else if (status === "available") {
                buttonClass = "w-20 h-20 flex items-center justify-center text-purple-300 filter drop-shadow-[0_0_12px_rgba(168,85,247,0.8)] animate-pulse";
                nodeIcon = <OpenGateIcon />;
              } else {
                buttonClass = "w-18 h-18 flex items-center justify-center text-slate-500/80";
                nodeIcon = <ClosedGateIcon />;
              }
            } else {
              // Reading sessions / Coding Challenge / Quiz
              xpBadgeClass = "bg-emerald-600 border-emerald-400 text-white text-[8.5px] font-black px-1.5 py-0.5 rounded-full mb-1 shadow-sm border border-emerald-500/30 select-none";
              if (status === "completed") {
                buttonClass = "w-14 h-14 flex items-center justify-center text-emerald-400 filter drop-shadow-[0_0_8px_rgba(16,185,129,0.6)]";
                nodeIcon = <Check className="w-6 h-6 stroke-[3]" />;
              } else if (status === "available") {
                buttonClass = "w-16 h-16 flex items-center justify-center text-sky-400 filter drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] animate-pulse";
                nodeIcon = (
                  <svg className="w-6 h-6 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                );
              } else {
                buttonClass = "w-14 h-14 flex items-center justify-center text-slate-500/80";
                nodeIcon = <Lock className="w-5 h-5" />;
              }
            }

            // Spacing Configuration based on node type to prevent overlaps and improve visual spacing
            let xpPositionClass = "";
            let xpStyle: React.CSSProperties = {};
            let labelStyle: React.CSSProperties = {};
            let buttonStyle: React.CSSProperties = {};
            let associationLine = null;

            if (node.type === "final") {
              xpPositionClass = "absolute left-1/2 -translate-x-1/2 mb-0 z-30";
              xpStyle = { top: "-24px" };
              buttonStyle = { transform: "translateY(64px)" };
              labelStyle = { top: "168px" };
              associationLine = (
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-[3px] bg-gradient-to-b from-amber-500/20 to-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)] rounded pointer-events-none"
                  style={{ top: "40px", height: "64px" }}
                />
              );
            } else if (node.type === "test") {
              xpPositionClass = "absolute left-1/2 -translate-x-1/2 mb-0 z-30";
              xpStyle = { top: "-12px" };
              buttonStyle = { transform: "translateY(52px)" };
              labelStyle = { top: "138px" };
              associationLine = (
                <div
                  className="absolute left-1/2 -translate-x-1/2 w-[2.5px] bg-gradient-to-b from-purple-500/20 to-purple-500/80 shadow-[0_0_8px_rgba(168,85,247,0.5)] rounded pointer-events-none"
                  style={{ top: "40px", height: "52px" }}
                />
              );
            } else {
              xpPositionClass = "absolute left-1/2 -translate-x-1/2 mb-0 z-30";
              xpStyle = { top: "16px" };
              buttonStyle = {};
              labelStyle = { top: "88px" };
            }

            return (
              <div
                key={node.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-25 transition-all duration-300 hover:scale-[1.03] hover:z-35"
                style={{
                  left: `${coords.x}%`,
                  top: `${coords.y}%`
                }}
              >
                <div className="flex flex-col items-center relative w-20 h-20">
                  {/* Subtle visual association line for shifted elements */}
                  {associationLine}



                  {/* Node Button */}
                  <button
                    onClick={() => handleOpenNode(node)}
                    className={`relative transition-all hover:scale-105 active:scale-95 flex items-center justify-center ${buttonClass} ${status === "locked" ? "cursor-not-allowed" : "cursor-pointer"} z-20`}
                    style={buttonStyle}
                  >
                    {status === "available" && (
                      <div className="absolute inset-[-5px] rounded-full border-2 border-sky-400/80 animate-ping pointer-events-none" />
                    )}
                    {nodeIcon}
                  </button>

                  {/* Node Label Below removed for clean styling */}
                </div>
              </div>
            );
          })}
        </div>


        {/* RIGHT COLUMN: Interactive Lesson Content / Test Panel */}
        <div id="quiz_panel" className="lg:col-span-5 relative z-40 lg:sticky lg:top-6 h-fit">
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-white"
              >
                {selectedNode.type === "reading" ? (
                  // 📖 IMAGINATIVE INTERACTIVE READING SESSIONS UI
                  <div className="flex-1 w-full h-full flex flex-col bg-white relative select-none">
                    {/* Top Status Bar / Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white shrink-0 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-sky-600" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-sky-600 uppercase tracking-widest font-bold block leading-none">
                            {activeCourse.toUpperCase()} • READING SESSION
                          </span>
                          <h3 className="text-sm font-display font-bold text-slate-800 mt-0.5">
                            {selectedNode.title} — {selectedNode.subtitle}
                          </h3>
                        </div>
                      </div>
                      <button
                        onClick={handleClosePanel}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-mono text-xs cursor-pointer border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        ✕ Exit Session
                      </button>
                    </div>

                    {/* Content Section with animated transitions */}
                    <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto bg-slate-50">
                      <div className="w-full max-w-2xl bg-white border border-slate-200 shadow-lg rounded-3xl overflow-hidden flex flex-col min-h-[460px]">
                        {/* Progress Bar */}
                        {(() => {
                          const lesson = curriculum.lessons[selectedNode.id];
                          if (!lesson) return null;
                          const slides = lesson.slides;
                          const progress = ((currentSlide + 1) / slides.length) * 100;
                          return (
                            <div className="w-full bg-slate-100 h-1.5">
                              <div
                                className="bg-gradient-to-r from-sky-500 to-indigo-500 h-full transition-all duration-500"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          );
                        })()}

                        {/* Animated Slide Content Area */}
                        <div className="flex-1 p-8 flex flex-col justify-between overflow-hidden">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentSlide}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.25 }}
                              className="space-y-6 flex-1 flex flex-col justify-between"
                            >
                              {(() => {
                                const lesson = curriculum.lessons[selectedNode.id];
                                if (!lesson) return <div className="text-slate-550 font-mono text-sm">Lesson data not found.</div>;
                                const slides = lesson.slides;

                                if (currentSlide < slides.length - 1) {
                                  // Regular Slide rendering
                                  return (
                                    <div className="space-y-6 flex-1 flex flex-col justify-center">
                                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                                        Slide {currentSlide + 1} of {slides.length}
                                      </div>
                                      <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-sans font-medium text-left">
                                        {slides[currentSlide]}
                                      </p>
                                    </div>
                                  );
                                }

                                // Final Slide - Interactive Game Section
                                const challenge = getInteractiveChallenge(selectedNode.id, lesson, activeCourse);

                                return (
                                  <div className="space-y-6 flex-1 text-left">
                                    <div className="flex justify-between items-center">
                                      <div className="text-[10px] font-mono text-indigo-600 uppercase tracking-widest font-bold">
                                        Slide {currentSlide + 1} of {slides.length} • ACTIVE CHALLENGE
                                      </div>
                                      <span className="text-[9px] font-mono bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200 uppercase font-black">
                                        {challenge.type.replace("_", " ")}
                                      </span>
                                    </div>

                                    {/* Challenge prompt instructions */}
                                    <p className="text-sm font-sans font-semibold text-slate-800 leading-snug">
                                      {challenge.prompt}
                                    </p>

                                    {/* RENDER THE CORRESPONDING GAME LAYOUT */}
                                    {(() => {
                                      if (challenge.type === "drag_drop") {
                                        return (
                                          <div className="space-y-6">
                                            {/* Word Token slot sentence */}
                                            <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl font-mono text-xs sm:text-sm text-slate-800 flex flex-wrap items-center gap-2 shadow-inner leading-relaxed">
                                              {challenge.blankSentence?.split("________").map((part, pIdx, pArr) => (
                                                <React.Fragment key={pIdx}>
                                                  <span>{part}</span>
                                                  {pIdx < pArr.length - 1 && (
                                                    userAnswer ? (
                                                      <button
                                                        onClick={() => {
                                                          setUserAnswer("");
                                                          setQuizStatus("idle");
                                                        }}
                                                        className="px-2.5 py-1 bg-sky-500 text-white font-bold rounded-lg border border-sky-650 shadow-md transition-all active:scale-95 cursor-pointer font-mono"
                                                      >
                                                        {userAnswer}
                                                      </button>
                                                    ) : (
                                                      <span className="w-24 h-7 border-2 border-dashed border-sky-400 rounded-lg bg-sky-50/50 flex items-center justify-center animate-pulse" />
                                                    )
                                                  )}
                                                </React.Fragment>
                                              ))}
                                            </div>

                                            {/* Choice tokens */}
                                            <div className="flex flex-wrap gap-2.5 justify-center pt-2">
                                              {challenge.options.map((opt, idx) => {
                                                const isUsed = userAnswer === opt;
                                                return (
                                                  <button
                                                    key={idx}
                                                    disabled={quizStatus === "correct" || isUsed}
                                                    onClick={() => {
                                                      setUserAnswer(opt);
                                                      setQuizStatus("idle");
                                                    }}
                                                    className="px-4 py-2.5 bg-white border border-slate-250 text-slate-750 hover:bg-slate-50 font-mono text-xs rounded-xl shadow-sm cursor-pointer transition-all active:scale-95 disabled:opacity-30 disabled:scale-100 font-bold"
                                                  >
                                                    {opt}
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        );
                                      }

                                      if (challenge.type === "true_false") {
                                        return (
                                          <div className="grid grid-cols-2 gap-4 pt-2">
                                            {challenge.options.map((opt) => {
                                              const isSelected = userAnswer === opt;
                                              const isTrue = opt === "True";
                                              return (
                                                <button
                                                  key={opt}
                                                  disabled={quizStatus === "correct"}
                                                  onClick={() => {
                                                    setUserAnswer(opt);
                                                    setQuizStatus("idle");
                                                  }}
                                                  className={`p-6 rounded-2xl border text-center transition-all cursor-pointer ${
                                                    isSelected
                                                      ? isTrue
                                                        ? "bg-emerald-500 border-emerald-600 text-white shadow-lg shadow-emerald-500/20 font-bold"
                                                        : "bg-red-500 border-red-600 text-white shadow-lg shadow-red-500/20 font-bold"
                                                      : isTrue
                                                        ? "bg-slate-50 border-slate-200 text-slate-700 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700"
                                                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
                                                  }`}
                                                >
                                                  <span className="text-lg font-bold font-sans uppercase tracking-wider block">
                                                    {isTrue ? "👍 True" : "👎 False"}
                                                  </span>
                                                </button>
                                              );
                                            })}
                                          </div>
                                        );
                                      }

                                      if (challenge.type === "rearrange") {
                                        // Auto initialize rearrange order if empty
                                        if (sequenceBlocks.length === 0 && challenge.lines) {
                                          const shuffled = [...challenge.lines].sort(() => Math.random() - 0.5);
                                          setSequenceBlocks(shuffled);
                                          setUserAnswer(shuffled.join("\n"));
                                        }

                                        return (
                                          <div className="space-y-2 pt-2">
                                            {sequenceBlocks.map((line, idx) => (
                                              <div
                                                key={idx}
                                                className="bg-slate-900 border border-slate-800 text-slate-200 p-3 rounded-xl font-mono text-xs flex items-center justify-between shadow-inner"
                                              >
                                                <span>{line}</span>
                                                <div className="flex gap-1.5 shrink-0">
                                                  <button
                                                    disabled={idx === 0 || quizStatus === "correct"}
                                                    onClick={() => {
                                                      const copy = [...sequenceBlocks];
                                                      [copy[idx], copy[idx - 1]] = [copy[idx - 1], copy[idx]];
                                                      setSequenceBlocks(copy);
                                                      setUserAnswer(copy.join("\n"));
                                                      setQuizStatus("idle");
                                                    }}
                                                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-400 disabled:opacity-30 cursor-pointer font-sans text-[10px]"
                                                    title="Move Up"
                                                  >
                                                    ▲
                                                  </button>
                                                  <button
                                                    disabled={idx === sequenceBlocks.length - 1 || quizStatus === "correct"}
                                                    onClick={() => {
                                                      const copy = [...sequenceBlocks];
                                                      [copy[idx], copy[idx + 1]] = [copy[idx + 1], copy[idx]];
                                                      setSequenceBlocks(copy);
                                                      setUserAnswer(copy.join("\n"));
                                                      setQuizStatus("idle");
                                                    }}
                                                    className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-400 disabled:opacity-30 cursor-pointer font-sans text-[10px]"
                                                    title="Move Down"
                                                  >
                                                    ▼
                                                  </button>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        );
                                      }

                                      if (challenge.type === "predict_output") {
                                        return (
                                          <div className="space-y-4">
                                            {/* Command Line Console Display */}
                                            <div className="bg-[#0f172a] border border-slate-800 p-4 rounded-xl shadow-inner font-mono text-[11px] leading-relaxed text-slate-350 space-y-3">
                                              <div className="flex items-center gap-1 border-b border-slate-800/80 pb-1.5 text-[9px] text-slate-500">
                                                <span className="w-2 h-2 rounded-full bg-red-500/80" />
                                                <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
                                                <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                                                <span className="ml-1 uppercase tracking-wider font-bold">UNAI TERMINAL</span>
                                              </div>
                                              <pre className="text-emerald-400 whitespace-pre-wrap select-all font-bold">
                                                {challenge.code}
                                              </pre>
                                            </div>

                                            {/* MCQ selection grid */}
                                            <div className="grid grid-cols-2 gap-2 pt-1">
                                              {challenge.options.map((opt, idx) => {
                                                const isSelected = userAnswer === opt;
                                                return (
                                                  <button
                                                    key={idx}
                                                    disabled={quizStatus === "correct"}
                                                    onClick={() => {
                                                      setUserAnswer(opt);
                                                      setQuizStatus("idle");
                                                    }}
                                                    className={`p-3 rounded-xl text-left text-xs font-mono border transition-all flex items-center gap-2 cursor-pointer ${
                                                      isSelected
                                                        ? "bg-indigo-500 border-indigo-650 text-white font-bold"
                                                        : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                                                    }`}
                                                  >
                                                    <span className={`text-[9px] px-1 rounded font-mono ${isSelected ? 'bg-white text-indigo-600' : 'bg-slate-200'}`}>
                                                      {idx + 1}
                                                    </span>
                                                    <span>{opt}</span>
                                                  </button>
                                                );
                                              })}
                                            </div>
                                          </div>
                                        );
                                      }

                                      if (challenge.type === "error_spotting") {
                                        return (
                                          <div className="space-y-4">
                                            {/* Code blocks split into tokens */}
                                            <div className="bg-[#0f172a] border border-slate-800 p-6 rounded-xl font-mono text-xs sm:text-sm text-slate-200 flex flex-wrap gap-1 leading-relaxed shadow-inner">
                                              {challenge.segments?.map((seg, idx) => {
                                                const isClicked = selectedHotspot === idx;
                                                return (
                                                  <span
                                                    key={idx}
                                                    onClick={() => {
                                                      if (quizStatus !== "correct") {
                                                        setSelectedHotspot(idx);
                                                        setUserAnswer(idx === challenge.correctIdx ? lesson.correct : "incorrect");
                                                        setQuizStatus("idle");
                                                      }
                                                    }}
                                                    className={`px-1 rounded cursor-pointer transition-all ${
                                                      isClicked
                                                        ? "bg-amber-500 text-slate-950 font-black border border-amber-400"
                                                        : "hover:bg-slate-800 text-slate-350"
                                                    }`}
                                                  >
                                                    {seg}
                                                  </span>
                                                );
                                              })}
                                            </div>
                                            <div className="text-[10px] text-slate-400 font-mono italic">
                                              Tip: Click on the token segment above containing the syntax or logic bug.
                                            </div>
                                          </div>
                                        );
                                      }

                                      // Standard Choose Syntax / MCQ fallback
                                      return (
                                        <div className="space-y-2">
                                          {challenge.options.map((opt, idx) => {
                                            const isSelected = userAnswer === opt;
                                            return (
                                              <button
                                                key={idx}
                                                disabled={quizStatus === "correct"}
                                                onClick={() => {
                                                  setUserAnswer(opt);
                                                  setQuizStatus("idle");
                                                }}
                                                className={`w-full p-3 rounded-xl text-left text-xs font-sans border transition-all flex items-center gap-3 cursor-pointer ${
                                                  isSelected
                                                    ? "bg-sky-500 border-sky-650 text-white font-bold"
                                                    : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                                                }`}
                                              >
                                                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                                                  isSelected
                                                    ? "bg-white text-sky-600"
                                                    : "bg-slate-200 text-slate-700"
                                                }`}>
                                                  {String.fromCharCode(65 + idx)}
                                                </span>
                                                <span className="leading-snug">{opt}</span>
                                              </button>
                                            );
                                          })}
                                        </div>
                                      );
                                    })()}

                                    {/* Question Feedback Box */}
                                    {quizStatus !== "idle" && (
                                      <div className={`p-4 rounded-xl text-xs border leading-relaxed ${
                                        quizStatus === "correct"
                                          ? "bg-emerald-50 border-emerald-250 text-emerald-950"
                                          : "bg-red-50 border-red-250 text-red-950"
                                      }`}>
                                        <span className="font-bold block uppercase tracking-wider">
                                          {quizStatus === "correct" ? "🎉 CORRECT ANSWER!" : "❌ CALIBRATION ERROR"}
                                        </span>
                                        <p className="mt-1 font-sans font-medium">{challenge.explanation}</p>
                                      </div>
                                    )}
                                  </div>
                                );
                              })()}

                              {/* Navigation Buttons inside slide footer */}
                              {(() => {
                                const lesson = curriculum.lessons[selectedNode.id];
                                if (!lesson) return null;
                                const slides = lesson.slides;

                                return (
                                  <div className="mt-8 pt-6 border-t border-slate-150 flex items-center justify-between">
                                    <button
                                      disabled={currentSlide === 0}
                                      onClick={() => {
                                        setCurrentSlide(prev => prev - 1);
                                        if (quizStatus !== "correct") {
                                          setUserAnswer("");
                                          setQuizStatus("idle");
                                          setSequenceBlocks([]);
                                          setSelectedHotspot(null);
                                        }
                                      }}
                                      className="px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-xs font-mono flex items-center gap-1 cursor-pointer"
                                    >
                                      <ChevronLeft className="w-4 h-4" /> Back
                                    </button>

                                    {currentSlide < slides.length - 1 ? (
                                      <button
                                        onClick={() => {
                                          setCurrentSlide(prev => prev + 1);
                                          setUserAnswer("");
                                          setQuizStatus("idle");
                                          setSequenceBlocks([]);
                                          setSelectedHotspot(null);
                                        }}
                                        className="px-4 py-2 bg-sky-500 border border-sky-650 text-white hover:bg-sky-600 rounded-lg text-xs font-mono flex items-center gap-1 font-bold cursor-pointer"
                                      >
                                        Next <ChevronRight className="w-4 h-4" />
                                      </button>
                                    ) : (
                                      quizStatus === "correct" ? (
                                        <button
                                          onClick={handleClosePanel}
                                          className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-lg hover:bg-emerald-700 transition-all uppercase tracking-wider cursor-pointer"
                                        >
                                          Complete Session
                                        </button>
                                      ) : (
                                        <button
                                          disabled={!userAnswer}
                                          onClick={handleVerifyReadingAnswer}
                                          className="px-5 py-2 bg-sky-500 text-white font-bold text-xs rounded-lg hover:bg-sky-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all uppercase tracking-wider cursor-pointer flex items-center gap-1.5"
                                        >
                                          Verify Answer <Check className="w-3.5 h-3.5" />
                                        </button>
                                      )
                                    )}
                                  </div>
                                );
                              })()}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Top accent bar */}
                    <div className={`h-1 w-full shrink-0 ${quizStatus === "correct" || testPassed ? "bg-emerald-500" : quizStatus === "incorrect" ? "bg-red-500" : "bg-sky-500"}`} />

                    {/* Full-screen header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white shrink-0 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-sky-600" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-sky-600 uppercase tracking-widest font-bold block leading-none">
                            {activeCourse.toUpperCase()} • {selectedNode.type.toUpperCase()}
                          </span>
                          <h3 className="text-sm font-display font-bold text-slate-800 mt-0.5">
                            {selectedNode.title} — {selectedNode.subtitle}
                          </h3>
                        </div>
                      </div>
                      <button
                        onClick={handleClosePanel}
                        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 font-mono text-xs cursor-pointer border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        ✕ Exit Session
                      </button>
                    </div>

                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto">
                      <div className="max-w-3xl mx-auto px-6 py-8 text-left">
                        <p className="text-xs text-slate-500 mb-6 font-sans">
                          {selectedNode.description}
                        </p>
                        <div className="h-px bg-slate-100 mb-6" />

                        {/* ... existing Test / Final components here ... */}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ) : (
              // Idle state card info
              <div className="bg-white border border-slate-200 shadow-sm p-6 rounded-3xl flex flex-col gap-5 h-full min-h-[350px] text-left">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center shadow-md">
                    <Sparkle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-slate-800 uppercase tracking-wider text-sm">Calibration Panel</h4>
                    <p className="text-[9px] text-sky-600 font-mono uppercase tracking-widest leading-none mt-0.5">{activeCourse} Track</p>
                  </div>
                </div>

                {/* 1. Language Profile Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 font-mono">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">ACTIVE LEVEL:</span>
                    <span className="text-emerald-600 font-bold">LEVEL {level}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">TOTAL SCORE:</span>
                    <span className="text-sky-600 font-bold">{xp.toLocaleString()} XP</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500">STREAK:</span>
                    <span className="text-orange-500 font-bold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-orange-400" /> {streak} DAYS
                    </span>
                  </div>

                  {/* Progress percentage */}
                  <div className="pt-1">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>COMPLETION:</span>
                      <span>{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-sky-500 to-indigo-500 h-2 transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Achievement Badges List */}
                <div className="space-y-2">
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">UNLOCKED ACHIEVEMENTS</span>
                  {achievements.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {achievements.map((ach, idx) => (
                        <div key={idx} className="bg-sky-50 border border-sky-100 px-3 py-2 rounded-xl flex items-center gap-2 text-xs text-slate-700 font-mono shadow-sm">
                          <Trophy className="w-3.5 h-3.5 text-sky-600" />
                          <span className="truncate" title={ach}>{ach}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-3 text-center text-[10px] text-slate-400 font-mono leading-relaxed">
                      No achievements unlocked yet. Complete lessons to unlock badges.
                    </div>
                  )}
                </div>

                {/* 3. Earned Certificates Section */}
                <div className="mt-auto pt-3 border-t border-slate-200 space-y-2">
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-wider block">GRADUATE STATUS</span>
                  {hasCertificate ? (
                    <button
                      onClick={() => setShowCertificate(true)}
                      className="w-full py-2.5 bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-display font-bold text-xs rounded-xl hover:scale-[1.01] active:scale-99 transition-all cursor-pointer shadow-md uppercase tracking-wider flex items-center justify-center gap-1.5"
                    >
                      <span>View Graduate Certificate</span>
                      <span>🎓</span>
                    </button>
                  ) : (
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs font-mono text-slate-400">
                      <div className="flex items-center gap-2">
                        <Lock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Graduate Certificate</span>
                      </div>
                      <span className="text-[10px] text-slate-400">LOCKED</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
