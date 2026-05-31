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
      options: isPy ? ["5", "10", "15", "20"] : ["10", "20", "undefined", "ReferenceError"],
      correct: "10",
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
      options: isPy ? ["self", "this", "init", "cls"] : ["async", "sync", "await", "defer"],
      correct: isPy ? "self" : "async",
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
      correct: isPy ? "[no_colon]" : "document.getElementByID",
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
    const qId = `${activeCourse.toLowerCase()}_${node.id}`;
    if (node.type === "reading") {
      if (completedStories.includes(qId)) return "completed";
    } else {
      if (completedNodes.includes(qId)) return "completed";
    }

    const nodeIndex = roadmapNodes.findIndex(n => n.id === node.id);
    if (nodeIndex === 0) return "available";

    const prevNode = roadmapNodes[nodeIndex - 1];
    const prevQId = `${activeCourse.toLowerCase()}_${prevNode.id}`;
    const isPrevCompleted = prevNode.type === "reading"
      ? completedStories.includes(prevQId)
      : completedNodes.includes(prevQId);

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

    const challenge = getInteractiveChallenge(selectedNode.id, lesson, activeCourse);
    if (userAnswer === challenge.correct) {
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
                  <div className="flex-1 w-full h-full flex flex-col bg-slate-950 relative select-none font-serif">
                    {/* Top Status Bar / Header */}
                    <div className="flex items-center justify-between px-6 py-3 border-b border-slate-800 bg-slate-900 text-slate-100 shrink-0 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-850 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-sky-400" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest font-bold block leading-none">
                            {activeCourse.toUpperCase()} • READING SESSION
                          </span>
                          <h3 className="text-sm font-display font-bold text-white mt-0.5">
                            {selectedNode.title} — {selectedNode.subtitle}
                          </h3>
                        </div>
                      </div>
                      <button
                        onClick={handleClosePanel}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white font-mono text-xs cursor-pointer border border-slate-700 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      >
                        ✕ Exit Session
                      </button>
                    </div>

                    {/* Content Section with animated chalkboard */}
                    <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative bg-slate-950">
                      <div className="w-full max-w-[850px] aspect-square relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border-4 border-amber-900/60 rounded-2xl overflow-hidden bg-[url('/reading_bg.jpg')] bg-cover bg-center">
                        {/* Chalkboard content overlay */}
                        <div className="absolute top-[12%] left-[39%] w-[55%] h-[73%] p-4 select-text text-left flex flex-col justify-between">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentSlide}
                              initial={{ opacity: 0, scale: 0.98 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.98 }}
                              transition={{ duration: 0.2 }}
                              className="h-full"
                            >
                              {(() => {
                                const lesson = curriculum.lessons[selectedNode.id];
                                if (!lesson) return <div className="text-slate-350 font-mono text-xs">Lesson data not found.</div>;
                                const slides = lesson.slides;

                                return (
                                  <div className="flex flex-col justify-between h-full space-y-3">
                                    {/* 1. TOP MAIN CONTENT AREA (SLIDE TEXT OR CHALLENGE) */}
                                    <div className="flex-1 overflow-y-auto scrollbar-thin select-text min-h-[90px] pr-1">
                                      {currentSlide < slides.length - 1 ? (
                                        // Regular Slide rendering
                                        <div className="space-y-3 select-text">
                                          <div className="flex items-center">
                                            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                              Slide {currentSlide + 1} of {slides.length}
                                            </span>
                                          </div>
                                          <p className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed font-sans font-medium">
                                            {slides[currentSlide]}
                                          </p>
                                        </div>
                                      ) : (
                                        // Final Challenge rendering
                                        (() => {
                                          const challenge = getInteractiveChallenge(selectedNode.id, lesson, activeCourse);
                                          return (
                                            <div className="space-y-2 select-text">
                                              <div className="flex justify-between items-center">
                                                <span className="bg-blue-600 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                                                  Slide {currentSlide + 1} of {slides.length} • CHALLENGE
                                                </span>
                                                <span className="text-[7.5px] font-mono bg-sky-955/80 text-sky-300 px-1.5 py-0.5 rounded-full border border-sky-850 uppercase font-black">
                                                  {challenge.type.replace("_", " ")}
                                                </span>
                                              </div>

                                              <p className="text-[10.5px] font-sans font-semibold text-slate-100 leading-snug">
                                                {challenge.prompt}
                                              </p>

                                              <div className="py-1">
                                                {/* GAME LAYOUT */}
                                                {(() => {
                                                  if (challenge.type === "drag_drop") {
                                                    return (
                                                      <div className="space-y-2">
                                                        <div className="bg-slate-900/60 border border-slate-700/50 p-2 rounded-lg font-mono text-[9px] sm:text-[10px] text-slate-200 flex flex-wrap items-center gap-1 leading-relaxed select-text">
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
                                                                    className="px-1.5 py-0.5 bg-sky-600 hover:bg-sky-500 text-white font-bold rounded shadow transition-all active:scale-95 cursor-pointer font-mono text-[8px] border border-sky-500"
                                                                  >
                                                                    {userAnswer}
                                                                  </button>
                                                                ) : (
                                                                  <span className="w-12 h-4 border border-dashed border-sky-400 rounded bg-sky-950/40 flex items-center justify-center animate-pulse" />
                                                                )
                                                              )}
                                                            </React.Fragment>
                                                          ))}
                                                        </div>
                                                        <div className="flex flex-wrap gap-1 justify-center">
                                                          {challenge.options.map((opt, idx) => (
                                                            <button
                                                              key={idx}
                                                              disabled={quizStatus === "correct" || userAnswer === opt}
                                                              onClick={() => {
                                                                setUserAnswer(opt);
                                                                setQuizStatus("idle");
                                                              }}
                                                              className="px-2 py-0.5 bg-slate-900/80 border border-slate-700 text-slate-200 hover:bg-slate-800 font-mono text-[9px] rounded-lg cursor-pointer transition-all active:scale-95 disabled:opacity-30 font-bold"
                                                            >
                                                              {opt}
                                                            </button>
                                                          ))}
                                                        </div>
                                                      </div>
                                                    );
                                                  }

                                                  if (challenge.type === "true_false") {
                                                    return (
                                                      <div className="grid grid-cols-2 gap-2">
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
                                                              className={`py-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                                                                isSelected
                                                                  ? isTrue
                                                                    ? "bg-emerald-700 border-emerald-600 text-white shadow-lg font-bold text-[9px]"
                                                                    : "bg-red-700 border-red-600 text-white shadow-lg font-bold text-[9px]"
                                                                  : isTrue
                                                                    ? "bg-slate-900/60 border-slate-700 text-slate-200 hover:bg-emerald-950 hover:border-emerald-800 text-[9px] hover:text-emerald-300"
                                                                    : "bg-slate-900/60 border-slate-700 text-slate-200 hover:bg-red-950 hover:border-red-800 text-[9px] hover:text-red-300"
                                                              }`}
                                                            >
                                                              {isTrue ? "👍 True" : "👎 False"}
                                                            </button>
                                                          );
                                                        })}
                                                      </div>
                                                    );
                                                  }

                                                  if (challenge.type === "rearrange") {
                                                    if (sequenceBlocks.length === 0 && challenge.lines) {
                                                      const shuffled = [...challenge.lines].sort(() => Math.random() - 0.5);
                                                      setSequenceBlocks(shuffled);
                                                      setUserAnswer(shuffled.join("\n"));
                                                      setQuizStatus("idle");
                                                    }
                                                    return (
                                                      <div className="space-y-1">
                                                        {sequenceBlocks.map((line, idx) => (
                                                          <div
                                                            key={idx}
                                                            className="bg-slate-900/80 border border-slate-700/60 text-slate-200 px-2 py-1 rounded-lg font-mono text-[9px] flex items-center justify-between shadow-inner"
                                                          >
                                                            <span className="truncate select-text">{line}</span>
                                                            <div className="flex gap-1 shrink-0 ml-1.5">
                                                              <button
                                                                disabled={idx === 0 || quizStatus === "correct"}
                                                                onClick={() => {
                                                                  const copy = [...sequenceBlocks];
                                                                  [copy[idx], copy[idx - 1]] = [copy[idx - 1], copy[idx]];
                                                                  setSequenceBlocks(copy);
                                                                  setUserAnswer(copy.join("\n"));
                                                                  setQuizStatus("idle");
                                                                }}
                                                                className="p-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-400 disabled:opacity-30 cursor-pointer text-[7px]"
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
                                                                className="p-0.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-400 disabled:opacity-30 cursor-pointer text-[7px]"
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
                                                      <div className="space-y-1.5">
                                                        <div className="bg-[#020617]/90 border border-slate-800 p-2 rounded shadow-inner font-mono text-[8px] sm:text-[9px] leading-relaxed text-slate-350">
                                                          <pre className="text-emerald-400 whitespace-pre-wrap select-all font-bold">
                                                            {challenge.code}
                                                          </pre>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-1">
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
                                                                className={`p-1.5 rounded-lg text-left text-[8.5px] font-mono border transition-all flex items-center gap-1 cursor-pointer ${
                                                                  isSelected
                                                                    ? "bg-sky-700 border-sky-600 text-white font-bold"
                                                                    : "bg-slate-900/60 border-slate-700 text-slate-350 hover:bg-slate-800"
                                                                }`}
                                                              >
                                                                <span className={`text-[7px] px-1 rounded font-mono ${isSelected ? 'bg-white text-sky-700 font-bold' : 'bg-slate-800'}`}>
                                                                  {idx + 1}
                                                                </span>
                                                                <span className="truncate">{opt}</span>
                                                              </button>
                                                            );
                                                          })}
                                                        </div>
                                                      </div>
                                                    );
                                                  }

                                                  if (challenge.type === "error_spotting") {
                                                    return (
                                                      <div className="bg-[#020617]/90 border border-slate-800 p-2 rounded font-mono text-[9px] text-slate-200 flex flex-wrap gap-1 leading-relaxed shadow-inner select-text">
                                                        {challenge.segments?.map((seg, idx) => (
                                                          <span
                                                            key={idx}
                                                            onClick={() => {
                                                              if (quizStatus !== "correct") {
                                                                setSelectedHotspot(idx);
                                                                setUserAnswer(idx === challenge.correctIdx ? challenge.correct : "incorrect");
                                                                setQuizStatus("idle");
                                                              }
                                                            }}
                                                            className={`px-0.5 rounded cursor-pointer transition-all ${
                                                              selectedHotspot === idx
                                                                ? "bg-amber-600 text-white font-black border border-amber-500"
                                                                : "hover:bg-slate-800 text-slate-350"
                                                            }`}
                                                          >
                                                            {seg}
                                                          </span>
                                                        ))}
                                                      </div>
                                                    );
                                                  }

                                                  return (
                                                    <div className="space-y-1">
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
                                                            className={`w-full p-1.5 rounded-lg text-left text-[9px] border transition-all flex items-center gap-1.5 cursor-pointer ${
                                                              isSelected
                                                                ? "bg-sky-700 border-sky-600 text-white font-bold"
                                                                : "bg-slate-900/60 border-slate-700 text-slate-200 hover:bg-slate-800"
                                                            }`}
                                                          >
                                                            <span className={`text-[7px] px-1 rounded font-mono font-bold ${isSelected ? "bg-white text-sky-750 font-bold" : "bg-slate-800 text-slate-400"}`}>
                                                              {String.fromCharCode(65 + idx)}
                                                            </span>
                                                            <span className="truncate" title={opt}>{opt}</span>
                                                          </button>
                                                        );
                                                      })}
                                                    </div>
                                                  );
                                                })()}
                                              </div>

                                              {/* Verification feedback info box */}
                                              {quizStatus !== "idle" && (
                                                <div className={`p-2 rounded border leading-snug text-[8.5px] ${
                                                  quizStatus === "correct" ? "bg-emerald-955/80 border-emerald-800 text-emerald-100" : "bg-red-955/80 border-red-800 text-red-100"
                                                }`}>
                                                  <span className="font-bold block uppercase text-[7.5px]">
                                                    {quizStatus === "correct" ? "🎉 CORRECT!" : "❌ STUDY SLIDES"}
                                                  </span>
                                                  <p className="mt-0.5 font-sans font-medium text-[8px] leading-tight">{challenge.explanation}</p>
                                                </div>
                                              )}
                                            </div>
                                          );
                                        })()
                                      )}
                                    </div>

                                    {/* 2. BOTTOM BUTTONS AREA (PREVIOUS & NEXT BUTTONS) */}
                                    <div className="pt-2 border-t border-slate-700/40 flex items-center justify-between shrink-0 font-mono mt-auto">
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
                                        className="px-2.5 py-1 bg-slate-900/90 border border-slate-700 text-slate-300 hover:bg-slate-800 disabled:opacity-20 disabled:cursor-not-allowed rounded text-[10px] flex items-center gap-1 cursor-pointer shadow-sm"
                                      >
                                        <ChevronLeft className="w-3 h-3" /> Back
                                      </button>

                                      <span className="text-[10px] text-slate-350 tracking-wider">
                                        {currentSlide + 1} / {slides.length}
                                      </span>

                                      {currentSlide < slides.length - 1 ? (
                                        <button
                                          onClick={() => {
                                            setCurrentSlide(prev => prev + 1);
                                            setUserAnswer("");
                                            setQuizStatus("idle");
                                            setSequenceBlocks([]);
                                            setSelectedHotspot(null);
                                          }}
                                          className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white rounded text-[10px] flex items-center gap-1 font-bold cursor-pointer shadow-sm border border-sky-500"
                                        >
                                          Next <ChevronRight className="w-3 h-3" />
                                        </button>
                                      ) : (
                                        quizStatus === "correct" ? (
                                          <button
                                            onClick={handleClosePanel}
                                            className="px-3 py-1 bg-emerald-600 text-white font-bold text-[10px] rounded hover:bg-emerald-700 transition-all uppercase tracking-wider cursor-pointer shadow-sm border border-emerald-500"
                                          >
                                            Complete
                                          </button>
                                        ) : (
                                          <button
                                            disabled={!userAnswer}
                                            onClick={handleVerifyReadingAnswer}
                                            className="px-3.5 py-1 bg-sky-600 text-white font-bold text-[10px] rounded hover:bg-sky-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all uppercase tracking-wider cursor-pointer flex items-center gap-1 border border-sky-550 shadow-sm"
                                          >
                                            Verify <Check className="w-3 h-3" />
                                          </button>
                                        )
                                      )}
                                    </div>
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
                  // 🛡️ IMAGINATIVE INTERACTIVE TEST / FINAL SESSIONS UI
                  <div className="flex-1 w-full h-full flex flex-col bg-slate-950 relative select-none">
                    {/* Top Status Bar / Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900 text-slate-100 shrink-0 shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800 flex items-center justify-center">
                          <Award className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-bold block leading-none">
                            {activeCourse.toUpperCase()} • {selectedNode.type.toUpperCase()} SESSION
                          </span>
                          <h3 className="text-sm font-display font-bold text-white mt-0.5">
                            {selectedNode.title} — {selectedNode.subtitle}
                          </h3>
                        </div>
                      </div>
                      <button
                        onClick={handleClosePanel}
                        className="flex items-center gap-1.5 text-slate-400 hover:text-white font-mono text-xs cursor-pointer border border-slate-700 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
                      >
                        ✕ Exit Session
                      </button>
                    </div>

                    {/* Scrollable content area with background wrapper */}
                    <div className="flex-1 flex items-center justify-center p-4 overflow-y-auto bg-slate-950">
                      <div className="w-full max-w-[850px] aspect-square relative shadow-[0_0_50px_rgba(0,0,0,0.8)] border-4 border-purple-900/60 rounded-2xl overflow-hidden bg-[url('/test_bg.jpg')] bg-cover bg-center">
                        
                        {(() => {
                          const questions = activeTestQuestions.length > 0
                            ? activeTestQuestions
                            : (selectedNode.type === "final"
                              ? curriculum.finalQuestions
                              : curriculum.checkpoints[selectedNode.id]?.questions) || [];

                          // CASE 1: Test has not started yet (Intro Screen)
                          if (!testActive) {
                            return (
                              <>
                                {/* Top Scroll: Title & Details */}
                                <div className="absolute top-[10%] left-[26%] w-[48%] h-[25%] flex flex-col justify-center px-6 text-center overflow-y-auto scrollbar-thin select-text text-slate-900">
                                  <h4 className="text-sm sm:text-base font-bold font-serif uppercase tracking-wide leading-tight">
                                    {selectedNode.title}
                                  </h4>
                                  <p className="text-[10px] sm:text-xs text-slate-850 leading-snug mt-1 font-medium font-serif max-h-[80px] overflow-y-auto">
                                    {selectedNode.description}
                                  </p>
                                  <div className="mt-2 flex items-center justify-center gap-4 text-[10px] sm:text-xs font-mono font-bold text-slate-950">
                                    <span className="bg-amber-100 border border-amber-900/20 px-2 py-0.5 rounded">XP: {selectedNode.estimatedXp}</span>
                                    <span className="bg-amber-100 border border-amber-900/20 px-2 py-0.5 rounded">Pass: {selectedNode.type === "final" ? "70%" : "50%"}</span>
                                  </div>
                                </div>

                                {/* Bottom Scroll: Start Controls */}
                                <div className="absolute top-[67%] left-[43%] w-[33%] h-[28%] flex flex-col items-center justify-center p-4 select-text text-slate-900">
                                  <button
                                    onClick={handleStartTest}
                                    className="px-6 py-2.5 bg-gradient-to-r from-purple-800 to-indigo-900 text-white font-bold text-xs rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-all uppercase tracking-wider cursor-pointer font-sans"
                                  >
                                    Start Test
                                  </button>
                                </div>
                              </>
                            );
                          }

                          // CASE 2: Loading Dynamic Questions
                          if (isTestQuestionsLoading) {
                            return (
                              <div className="absolute top-[10%] left-[26%] w-[48%] h-[25%] flex flex-col justify-center items-center text-slate-900 font-serif p-4">
                                <div className="w-6 h-6 border-2 border-purple-900 border-t-transparent rounded-full animate-spin mb-2" />
                                <span className="text-[11px] font-bold tracking-wider animate-pulse">GENERATING ASSESSMENT SYNAPSE...</span>
                              </div>
                            );
                          }

                          // CASE 3: Test Finished (Results Screen)
                          if (testFinished) {
                            return (
                              <>
                                {/* Top Scroll: Score & Status */}
                                <div className="absolute top-[10%] left-[26%] w-[48%] h-[25%] flex flex-col justify-center px-6 text-center overflow-y-auto scrollbar-thin text-slate-900">
                                  <h4 className="text-sm sm:text-base font-bold font-serif uppercase tracking-wide leading-tight">
                                    {testPassed ? "🎉 assessment passed" : "❌ alignment failed"}
                                  </h4>
                                  <div className="text-xl sm:text-2xl font-black font-mono text-purple-950 mt-1">
                                    {testScore}%
                                  </div>
                                  <p className="text-[10px] sm:text-xs text-slate-800 font-serif leading-snug mt-1 max-h-[60px] overflow-y-auto">
                                    {testPassed 
                                      ? `Congratulations! You've verified your knowledge parameters in ${activeCourse}. XP rewards successfully synced.`
                                      : `Calibration error. Required passing threshold: ${selectedNode.type === "final" ? "70%" : "50%"}. Brush up your skills and try again.`
                                    }
                                  </p>
                                </div>

                                {/* Bottom Scroll: Finish Controls */}
                                <div className="absolute top-[67%] left-[43%] w-[33%] h-[28%] flex flex-col gap-2 items-center justify-center p-3 select-text text-slate-900">
                                  {testPassed ? (
                                    <button
                                      onClick={() => {
                                        handleClosePanel();
                                      }}
                                      className="w-full py-2 bg-emerald-700 text-white font-bold text-[10px] sm:text-xs rounded-lg hover:bg-emerald-800 transition-all uppercase tracking-wider cursor-pointer font-mono"
                                    >
                                      Claim Rewards
                                    </button>
                                  ) : (
                                    <>
                                      <button
                                        onClick={() => {
                                          setLives(5); // reset hearts
                                          handleStartTest();
                                        }}
                                        className="w-full py-2 bg-purple-800 text-white font-bold text-[10px] sm:text-xs rounded-lg hover:bg-purple-900 transition-all uppercase tracking-wider cursor-pointer font-mono"
                                      >
                                        Try Again
                                      </button>
                                      <button
                                        onClick={handleClosePanel}
                                        className="w-full py-1.5 bg-slate-200 border border-slate-350 text-slate-800 text-[10px] sm:text-xs font-bold rounded-lg hover:bg-slate-300 transition-colors cursor-pointer font-mono"
                                      >
                                        Exit
                                      </button>
                                    </>
                                  )}
                                </div>
                              </>
                            );
                          }

                          // CASE 4: Active Question Display
                          if (questions.length === 0) {
                            return (
                              <div className="absolute top-[10%] left-[26%] w-[48%] h-[25%] flex flex-col justify-center items-center text-slate-900 font-serif p-4">
                                <span className="text-[11px] font-bold">No questions found. Exit and retry.</span>
                              </div>
                            );
                          }

                          const currentQuestion = questions[currentQuestionIdx];
                          const selectedAnswer = testAnswers[currentQuestionIdx];

                          return (
                            <>
                              {/* Top Scroll: Question Prompt & Progress/HUD */}
                              <div className="absolute top-[10%] left-[26%] w-[48%] h-[25%] flex flex-col justify-center px-6 text-center select-text text-slate-900">
                                <div className="flex items-center justify-between text-[9px] font-mono font-bold text-slate-600 border-b border-slate-300/35 pb-1 mb-1">
                                  <span>Q: {currentQuestionIdx + 1}/{questions.length}</span>
                                  <span className="text-red-650">❤️ {lives}</span>
                                  {selectedNode.type === "final" && (
                                    <span className="text-purple-800">⏱️ {Math.floor(timerSeconds / 60)}:{String(timerSeconds % 60).padStart(2, '0')}</span>
                                  )}
                                </div>
                                <p className="text-[10px] sm:text-xs text-slate-950 font-serif font-semibold leading-snug max-h-[85px] overflow-y-auto text-center scrollbar-thin">
                                  {currentQuestion.q}
                                </p>
                              </div>

                              {/* Bottom Scroll: Answering options */}
                              <div className="absolute top-[67%] left-[43%] w-[33%] h-[28%] flex flex-col p-3 overflow-y-auto scrollbar-thin select-text text-slate-900">
                                <div className="space-y-1.5 flex-1 overflow-y-auto scrollbar-thin pr-1">
                                  {currentQuestion.o.map((opt, idx) => {
                                    const isSelected = selectedAnswer === opt;
                                    return (
                                      <button
                                        key={idx}
                                        onClick={() => handleSelectTestOption(opt)}
                                        className={`w-full p-1.5 rounded text-left text-[9px] font-mono border transition-all flex items-center gap-1.5 cursor-pointer ${
                                          isSelected
                                            ? "bg-purple-950 border-purple-900 text-white font-bold"
                                            : "bg-white/60 border-purple-900/20 text-slate-800 hover:bg-white/80"
                                        }`}
                                      >
                                        <span className="text-[8px] bg-purple-200/80 px-1 border border-purple-900/20 rounded font-bold text-purple-950">
                                          {String.fromCharCode(65 + idx)}
                                        </span>
                                        <span className="leading-tight truncate" title={opt}>{opt}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                                
                                <div className="pt-2">
                                  <button
                                    disabled={!selectedAnswer}
                                    onClick={handleNextQuestion}
                                    className="w-full py-1.5 bg-gradient-to-r from-purple-800 to-indigo-900 text-white font-bold text-[9px] rounded transition-all uppercase tracking-wider shadow cursor-pointer font-mono disabled:opacity-40 disabled:cursor-not-allowed"
                                  >
                                    {currentQuestionIdx < questions.length - 1 ? "Next Question" : "Submit Assessment"}
                                  </button>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                        
                      </div>
                    </div>
                  </div>
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
