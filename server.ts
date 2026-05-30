import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3000;

// Lazy initialization of Gemini API client to prevent crashes if key is omitted
let _ai: any = null;
function getGenAI() {
  if (!_ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is missing. Operating in fallback mode.");
    }
    _ai = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return _ai;
}

// Check if actual credentials exist
const isAiAvailable = () => !!process.env.GEMINI_API_KEY;

// 1. AI Coding Mentor (EVE) Chat Endpoint
app.post("/api/gemini/mentor", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    if (!isAiAvailable()) {
      // Elegant futuristic fallback responses when key is unset
      res.json({
        text: `### 🌌 Greetings from EVE (Ecosystem Virtual Assistant)
        
I am currently operating in **Deep Isolation Flight Mode** (offline preview). To unlock my real-time hyper-intelligent Gemini thinking systems, please supply a \`GEMINI_API_KEY\` in the **Secrets** panel.

However, as your digital mentor, here is a localized core advice regarding your query:
* **Always modularize your code**: Keep structures high-cohesion, low-coupling.
* **Practice syntax**: Daily repetition reinforces semantic memory.
* Let's build something beautiful today! Let me know if you would like to run code in the interactive playground below.`
      });
      return;
    }

    const ai = getGenAI();
    const systemPrompt = `You are EVE (Ecosystem Virtual Assistant), a next-generation, hyper-intelligent AI Coding Mentor from UNAI Tech.
    Your demeanor is futuristic, encouraging, highly technical yet accessible, and professional.
    You assist students in mastering software engineering, Python, frontend, backend, computer science, and AI.
    Explain concepts step-by-step, review user code, point out logical or stylistic bugs, and format everything beautifully using clean markdown with code syntax highlighting. Use subtle futuristic tones (like referencing galactic compilers or neural syncs) but keep it natural and useful.`;

    const chatContents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        chatContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content || msg.text || "" }]
        });
      }
    }
    chatContents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("AI Mentor integration error:", err);
    res.status(500).json({ error: err.message || "Failed to contact EVE virtual intelligence." });
  }
});

// 2. AI Multi-lingual Challenge Generation Endpoint (JSON Response)
app.post("/api/gemini/challenge-generate", async (req, res) => {
  try {
    const { topic, difficulty } = req.body; // e.g., topic: "Loops", difficulty: "Beginner" | "Intermediate" | "Advanced"
    const parsedTopic = topic || "JavaScript Basics";
    const parsedDifficulty = difficulty || "Beginner";

    if (!isAiAvailable()) {
      // Local preset challenges when offline
      const fallbackChallenges: Record<string, any> = {
        "Beginner": {
          title: "Galactic Summation",
          description: "Write a function `sumOfMultiples(n)` that returns the sum of all positive multiples of `3` or `5` below `n`. For example, if `n` is `10`, the multiples are `3, 5, 6, 9`, and their sum is `23`.",
          stubCode: `function sumOfMultiples(n) {\n  // Write your code here\n  return 0;\n}`,
          testCases: [
            { input: "10", expectedOutput: "23" },
            { input: "20", expectedOutput: "78" }
          ]
        },
        "Intermediate": {
          title: "Asteroid Velocity Tracking",
          description: "Implement a function `findMaxStreak(prices)` that calculates the maximum consecutive days an asteroid's speed keeps increasing. Receive an array of numbers representing daily velocity values. Return the streak count.",
          stubCode: `function findMaxStreak(prices) {\n  // Write your code here\n  return 0;\n}`,
          testCases: [
            { input: "[10, 12, 15, 11, 14, 18, 19]", expectedOutput: "4" },
            { input: "[100, 90, 80]", expectedOutput: "1" }
          ]
        },
        "Advanced": {
          title: "Quantum Path Optimizer (Dijkstra)",
          description: "Write a function `shortestQuantumPath(graph, start, end)` to compute the length of the shortest path through a celestial node net. The graph is presented as an adjacency list where weights represent distance. Return the path list or -1.",
          stubCode: `function shortestQuantumPath(graph, start, end) {\n  // Implement pathfinding graph logic\n  return -1;\n}`,
          testCases: [
            { input: JSON.stringify({ a: { b: 2, c: 5 }, b: { c: 1 }, c: {} }), expectedOutput: "3" }
          ]
        }
      };
      res.json(fallbackChallenges[parsedDifficulty] || fallbackChallenges["Beginner"]);
      return;
    }

    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate a programming coding challenge on topic: "${parsedTopic}" for a student at level "${parsedDifficulty}".
      Always return standard JavaScript environment executable content.
      Provide:
      1. A unique, short premium galactic title
      2. Clear description of the problem
      3. A starter code block (stubCode) with empty function body
      4. 2-3 test cases, each specifying serialized string params.
      Format the response strictly to match the requested JSON schema.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "description", "stubCode", "testCases"],
          properties: {
            title: { type: Type.STRING, description: "A highly stylized, epic tech title" },
            description: { type: Type.STRING, description: "Problem statement with examples" },
            stubCode: { type: Type.STRING, description: "Empty starter function structure matching JavaScript syntax" },
            testCases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["input", "expectedOutput"],
                properties: {
                  input: { type: Type.STRING, description: "Input parameter as serialized string" },
                  expectedOutput: { type: Type.STRING, description: "Expected return value string" }
                }
              }
            }
          }
        }
      }
    });

    const body = JSON.parse(response.text.trim());
    res.json(body);
  } catch (err: any) {
    console.error("AI Challenge Generate error:", err);
    res.status(500).json({ error: "Failed to generate dynamic AI coding challenge" });
  }
});

// 3. AI Interview Hub Chat Simulator
app.post("/api/gemini/interview", async (req, res) => {
  try {
    const { message, history, roleName, stage } = req.body; // e.g., roleName: "AI Engineer", stage: "Technical"
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    if (!isAiAvailable()) {
      res.json({
        text: `### 🦾 UNAI Tech Mock Interview Bot (Offline Mode)

* **Interviewer Role:** Lead Principal Core Architect
* **Current Assessment:** Advanced Reasoning, Coding & Data structures for **${roleName || "Full Stack Developer"}**.

**Interviewer Query:**
"Welcome! Given our neural alignment systems at UNAI Tech, scalability is paramount. Can you explain how you would design an efficient caching layer to optimize low-latency access to user learning records? Mention what caching strategy (e.g. Write-Through, LRU Eviction) you would implement and why."`
      });
      return;
    }

    const ai = getGenAI();
    const systemPrompt = `You are the Lead Artificial Intelligence Technical Interviewer for UNAI Tech.
    You are professional, strict yet fair, direct, and simulate real-world elite technical panels at Google, Replit, or OpenAI.
    You are conducting a "${stage || "Technical Session"}" mock interview for a candidate applying for: "${roleName || "Software Engineer"}".
    You will:
    1. Ask one direct topic question at a time.
    2. Respond to the candidate's answers with brief critical review, asking a follow-up or asking to correct/improve their code.
    3. Keep responses highly focused, concise, and realistic. Keep candidates on their toes.
    4. Provide encouraging yet realistic career scoring indicators when asked for feedback.`;

    const chatContents = [];
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        chatContents.push({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content || msg.text || "" }]
        });
      }
    }
    chatContents.push({ role: "user", parts: [{ text: message }] });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.8,
      },
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("AI Interviewer error:", err);
    res.status(500).json({ error: "Failed to query the mock technical interviewer." });
  }
});

// 4. AI Resume ATS Evaluator & Skill Gap Analyzer (JSON Response)
app.post("/api/gemini/ats", async (req, res) => {
  try {
    const { resumeText, targetRole } = req.body;
    if (!resumeText) {
      res.status(400).json({ error: "Resume contents are required" });
      return;
    }

    if (!isAiAvailable()) {
      // Offline mock evaluation report
      res.json({
        score: 74,
        feedback: "Your resume represents strong foundational systems, but lacks adequate exposure to deep server-side pipeline engineering, modern LLM orchestration tools like LangChain or @google/genai, and containerization frameworks.",
        matchingPercentage: 68,
        missingSkills: ["LlamaIndex / Google GenAI SDK", "Docker & Kubernetes", "CI/CD Pipeline Audits", "Redis Caching Strategies"],
        recommendedCourses: [
          "EVE Module 4: Cloud and Container Pipelines",
          "UNAI Masterclass: Building Production-grade Multi-agent Toolkits"
        ]
      });
      return;
    }

    const ai = getGenAI();
    const systemInstruction = `You are the chief Talent Acquisition ATS analyzer for UNAI Tech and VIDYON core ecosystems. Analyze the supplied resume against the target role: "${targetRole || "AI Software Engineer"}". Produce a highly thorough review including an ATS score, core feedback constructive alignment, missing skills gap assessment, and curriculum recommendations from EVE dynamic roadmaps of EVE.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Resume Content:\n"${resumeText}"\n\nTarget Role: "${targetRole || "Software Developer"}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["score", "feedback", "matchingPercentage", "missingSkills", "recommendedCourses"],
          properties: {
            score: { type: Type.INTEGER, description: "ATS Score from 0 to 100" },
            feedback: { type: Type.STRING, description: "Constructive feedback on alignment, formatting, and impact statement gaps" },
            matchingPercentage: { type: Type.INTEGER, description: "Closeness score to modern elite profiles (0 to 100)" },
            missingSkills: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Key technologies, libraries, or methodologies completely absent in the text"
            },
            recommendedCourses: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Suggested EVE x UNAI curriculum tags or focus concepts to resolve gaps"
            }
          }
        }
      }
    });

    const report = JSON.parse(response.text.trim());
    res.json(report);
  } catch (err: any) {
    console.error("AI ATS analysis error:", err);
    res.status(500).json({ error: "Failed to generate AI-powered ATS resume analysis." });
  }
});

// Configure Vite integration for building / hosting the client application
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite environment inside Express dev server...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving production bundle from dist folder...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind to host 0.0.0.0 and Port 3000 as strictly mandated
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 EVE x UNAI platform server alive and listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
