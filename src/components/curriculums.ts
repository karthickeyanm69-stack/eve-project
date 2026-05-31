export interface Lesson {
  slides: string[];
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

export interface CheckpointQuestion {
  q: string;
  o: string[];
  a: string;
}

export interface Checkpoint {
  badge: string;
  hint: string;
  questions: CheckpointQuestion[];
}

export interface CourseCurriculum {
  subtitles: string[];
  descriptions: string[];
  lessons: Record<string, Lesson>;
  checkpoints: Record<string, Checkpoint>;
  finalQuestions: CheckpointQuestion[];
}

// =============================================================
// 1. WEB DEVELOPMENT CURRICULUM
// =============================================================
export const WEB_DEV_CURRICULUM: CourseCurriculum = {
  subtitles: [
    "Introduction to HTML5", "Core CSS Concepts", "Responsive Web Layouts", "Modern CSS Ecosystems", "Checkpoint 1",
    "JavaScript Foundations", "Asynchronous JS", "DOM Interactivities", "Web APIs & HTTP Fetch", "Checkpoint 2",
    "React Library Core", "Hooks & Component States", "Server Rendering & Next.js", "Backend APIs & Express", "Checkpoint 3",
    "Final Assessment"
  ],
  descriptions: [
    "Learn structure, syntax, semantic tags and form validation.",
    "Master CSS box model layers, selectors, styling rules and Flexbox layouts.",
    "Harness CSS Grid alignments, media queries, viewports and fluid layouts.",
    "Explore SASS preprocessors, Tailwind CSS and CSS modules structures.",
    "Covers Sessions 1-4. 20 Questions. Passing score: 50%.",
    "Wield block variables, loops, types, arrays and function structures.",
    "Study Promises, event loop cycles, callbacks and async/await syntax.",
    "Learn query selectors, content updates, event handlers and style mods.",
    "Query remote endpoints, parse JSON templates and configure local cache.",
    "Covers Sessions 5-8. 20 Questions. Passing score: 50%.",
    "Understand Virtual DOM diffing, JSX compiling, state updates and Props.",
    "Wield useState triggers, useEffect side-effects and useRef node links.",
    "Master SSR routes, static site SSG compilation and server components.",
    "Learn Node platforms, Express route handlers, middleware parameters and databases.",
    "Covers Sessions 9-12. 20 Questions. Passing score: 50%.",
    "Mixed difficulty timed questions covering entire path concepts."
  ],
  lessons: {
    node_1: {
      slides: [
        "Welcome to Web Development! The web is powered by three main technologies: HTML for content structure, CSS for design styling, and JavaScript for client-side interactivity.",
        "HTML (HyperText Markup Language) defines the backbone elements of a web page using markup tags such as <html>, <head>, <body>, and <h1>.",
        "HTML5 introduces semantic tags like <header>, <nav>, <section>, <article>, and <footer>. These clearly describe their structural role to both developer and browser.",
        "Using semantic HTML5 elements improves search engine optimization (SEO) indexing, and assists screen-reader accessibility for visually-impaired users.",
        "HTML5 forms feature built-in input validation. Using attributes like 'required', 'pattern', and types like 'email' or 'tel' automates checks without extra scripting."
      ],
      question: "Which HTML5 tag is most appropriate for defining self-contained compositions like a blog post or news article?",
      options: ["<section>", "<article>", "<div>", "<aside>"],
      correct: "<article>",
      explanation: "The <article> element is designed to represent a complete, self-contained piece of content that can be distributed independently."
    },
    node_2: {
      slides: [
        "CSS (Cascading Style Sheets) applies layout styles, color schemes, typography, and responsive adjustments to raw HTML markup trees.",
        "The CSS Box Model controls sizes and margins. It wraps every HTML element inside nested layers: Content, Padding, Border, and Margin.",
        "Padding represents the interior empty spacing between element content and its border, while Margin sets the exterior spacing outside borders.",
        "Selectors target element nodes: tag selectors (e.g. p), class selectors (.btn), ID selectors (#root), and attribute selectors ([disabled]).",
        "Flexbox (Flexible Box Layout) is a one-dimensional alignment model. It aligns children easily in rows or columns with fluid space distribution."
      ],
      question: "Which Box Model property defines the spacing between an element's text content and its surrounding border?",
      options: ["Margin", "Padding", "Border", "Outline"],
      correct: "Padding",
      explanation: "Padding is the inner spacing of an element, situated between the content and the border."
    },
    node_3: {
      slides: [
        "Responsive Web Design ensures web layouts adjust automatically to look excellent on screen displays of any width (mobile, tablet, desktop).",
        "The viewport meta tag in the <head> element resets standard mobile scale zoom behaviors: <meta name='viewport' content='width=device-width, initial-scale=1.0'>.",
        "CSS Grid is a powerful two-dimensional layout engine, managing both columns and rows concurrently to create structured alignment templates.",
        "Media Queries (@media) apply styles conditionally based on browser parameters (e.g. '@media (min-width: 768px)' applies only above mobile scales).",
        "Fluid sizing utilizes relative units: 'em' (parent font size), 'rem' (root <html> font size), or viewport dimensions ('vh' and 'vw') instead of pixels."
      ],
      question: "Which CSS layout property is standard for creating a 3-column layout where each column occupies an equal portion of the available space?",
      options: [
        "grid-template-columns: repeat(3, 1fr);",
        "grid-template-columns: 1fr 1fr 1fr;",
        "grid-columns: 3;",
        "display: flex;"
      ],
      correct: "grid-template-columns: repeat(3, 1fr);",
      explanation: "The 'repeat(3, 1fr)' command dynamically creates 3 columns, dividing available grid space into equal fractional units (fr)."
    },
    node_4: {
      slides: [
        "Modern CSS tools accelerate production speeds. Preprocessors like SASS support nested rules, variables, and math operators inside stylesheets.",
        "Tailwind CSS is a utility-first CSS framework. Rather than writing stylesheets, developers apply styling directly using utility classes in HTML.",
        "CSS Modules scope selector names locally by default, generating unique class names to completely prevent accidental cascade conflicts.",
        "CSS-in-JS libraries write styles directly within JavaScript files, compiling dynamic styling rules based on component state parameters.",
        "CSS Transitions and @keyframes animations create smooth state changes (e.g. hover transitions) which significantly enhance overall user experience."
      ],
      question: "What is a core benefit of utilizing CSS Modules in large-scale component frameworks?",
      options: [
        "It automatically compiles JavaScript to CSS",
        "It scopes CSS selectors locally by default to avoid name collisions",
        "It completely eliminates the need for any CSS layouts",
        "It runs animations in background worker threads"
      ],
      correct: "It scopes CSS selectors locally by default to avoid name collisions",
      explanation: "CSS Modules assign unique identifiers to classes, ensuring styles do not bleed out to affect other elements in the workspace."
    },
    node_6: {
      slides: [
        "JavaScript (JS) is a high-level, lightweight, compiled or interpreted scripting engine that enables dynamic reactivity on the client-side.",
        "Variables store values. Modern JS uses 'const' for read-only constants, 'let' for mutable block-scoped values, and avoids obsolete 'var'.",
        "JS primitives include: string, number, boolean, null, undefined, and symbol. Objects, arrays, and functions are references.",
        "Arrow functions (() => {}) provide a concise syntax, and inherit the lexical scope of the parent 'this' execution context.",
        "Arrays are ordered lists. Modern JS features built-in iteration helpers like .map(), .filter(), .reduce(), and .forEach()."
      ],
      question: "Which keyword is correct for declaring a variable that can be updated later, scoped only inside its block?",
      options: ["const", "let", "var", "mutable"],
      correct: "let",
      explanation: "The 'let' keyword allows variable re-assignment while respecting block scope boundaries."
    },
    node_7: {
      slides: [
        "JavaScript is single-threaded. It delegates async work to web APIs, processing results in order using the Event Loop.",
        "Callbacks are functions passed as arguments to another function, which executes them after an asynchronous operation completes.",
        "Promises represent placeholders for future values. They exist in three states: Pending, Resolved (fulfilled), and Rejected (error).",
        "The 'async/await' syntax builds on top of Promises, making async code write and read like clean, linear synchronous commands.",
        "The Microtask Queue (handling Promise callbacks) resolves ahead of the Macrotask Queue (handling timers like setTimeout)."
      ],
      question: "Which keyword pauses code execution inside an async function until a returned Promise resolves?",
      options: ["await", "wait", "then", "defer"],
      correct: "await",
      explanation: "The 'await' keyword halts execution in async blocks until the targeted Promise completes, returning its resolved value."
    },
    node_8: {
      slides: [
        "The Document Object Model (DOM) is an object-oriented API representing page structure as a tree of nodes that scripts can manipulate.",
        "Developers retrieve DOM nodes using document.getElementById(), querySelector(), or multi-node document.querySelectorAll() selectors.",
        "To update element content, use '.innerText' (for plain text) or '.innerHTML' (which parses markup text tags).",
        "Reactivity links to event systems. Use element.addEventListener('click', handler) to intercept and react to user clicks.",
        "Modify element styles directly via 'element.style.color = \"blue\"' or toggle CSS classes with 'element.classList.add(\"active\")'."
      ],
      question: "Which DOM method is standard for attaching click listener handlers to button nodes?",
      options: ["addEventListener", "attachEvent", "onclick", "bindClick"],
      correct: "addEventListener",
      explanation: "The addEventListener() method registers an event listener callback for specified event types on target elements."
    },
    node_9: {
      slides: [
        "Web APIs extend browser engines, giving applications access to storage databases, networks, audio, and client sensor systems.",
        "The Fetch API provides a native, Promise-based request mechanism to retrieve information from REST API endpoints across the internet.",
        "JSON (JavaScript Object Notation) is the lightweight data interchange text format used for sending API payloads.",
        "REST APIs use standard HTTP methods: GET (read), POST (create), PUT (update), and DELETE (remove).",
        "Browser storage caches data locally. LocalStorage persists data indefinitely, while SessionStorage clears when tabs close."
      ],
      question: "What is the primary native browser API used to perform async HTTP network queries in contemporary JavaScript?",
      options: ["Fetch API", "XMLHttpRequest", "Axios", "Ajax"],
      correct: "Fetch API",
      explanation: "The Fetch API is the modern native replacement for XMLHttpRequest, returning clean Promise pipelines."
    },
    node_11: {
      slides: [
        "React is an open-source JavaScript library for building fast component UIs, managed efficiently using a Virtual DOM.",
        "JSX is a syntax extension resembling HTML. It compiles to standard React.createElement() method calls in background builds.",
        "React Props are immutable configurations passed from parent components down to children, while local State changes dynamically.",
        "Components re-render automatically when their local state or incoming props update, aligning the UI with changes.",
        "React Hooks (methods starting with 'use') allow functional components to register state, context, and trigger lifecycle effects."
      ],
      question: "Which React mechanism allows parent components to configure and pass data down to their children?",
      options: ["Props", "State", "Context API", "Redux"],
      correct: "Props",
      explanation: "Props (short for properties) are read-only inputs passed down the React component tree."
    },
    node_12: {
      slides: [
        "The useState hook declares local state variables inside functional React components: const [val, setVal] = useState(init).",
        "The useEffect hook runs side effects (data fetching, DOM updates, event listeners) after components render on screen.",
        "Effects can define a dependency array. If dependencies do not change, React skips running the side effect on updates.",
        "The useRef hook stores mutable references that persist across renders without triggering a component refresh when updated.",
        "Memoization hooks (useMemo, useCallback) cache expensive computational results and function declarations between renders."
      ],
      question: "Which React hook executes side-effects like initializing API network queries after a component mounts?",
      options: ["useState", "useEffect", "useRef", "useMemo"],
      correct: "useEffect",
      explanation: "useEffect is designed to handle side-effects, separating rendering logic from asynchronous lifecycle events."
    },
    node_13: {
      slides: [
        "Next.js is a React meta-framework featuring built-in routing, search engine optimizations, server rendering, and API routes.",
        "Server-side Rendering (SSR) pre-builds HTML pages dynamically on the server for each request, delivering fast loads.",
        "Static Site Generation (SSG) pre-renders pages at build-time, allowing instant delivery via global Content Delivery Networks (CDNs).",
        "The App Router (Next.js 13+) defines paths using folder structures containing page.tsx, layout.tsx, and loading.tsx components.",
        "Server Components execute on the server side, keeping database requests off the client and reducing bundle sizes."
      ],
      question: "In the Next.js App Router paradigm, what file name is reserved to represent the primary visual UI page for a route?",
      options: ["index.tsx", "page.tsx", "layout.tsx", "route.ts"],
      correct: "page.tsx",
      explanation: "In Next.js folder-based routing, page.tsx files define the main public component rendered for that path."
    },
    node_14: {
      slides: [
        "Backends govern business data logic, handle user sessions, and connect client requests to database storage nodes.",
        "Node.js runs JavaScript outside browsers, enabling server-side scripting, script tasks, and backend tooling.",
        "Express.js is a minimalist web framework for Node.js, providing routes, routers, and request handler setups.",
        "Express uses Middlewares—functions with access to request (req), response (res), and the next middleware in line.",
        "Databases store app data: SQL engines (e.g. PostgreSQL) use tables, while NoSQL engines (e.g. MongoDB) use document trees."
      ],
      question: "In an Express.js backend system, what is the purpose of the 'next()' function argument in handlers?",
      options: [
        "It redirects the client to the next webpage URL",
        "It passes execution control to the next middleware or route handler",
        "It terminates the database query loop",
        "It logs execution performance metrics"
      ],
      correct: "It passes execution control to the next middleware or route handler",
      explanation: "Calling next() tells Express to invoke the subsequent middleware function registered in the processing pipeline."
    }
  },
  checkpoints: {
    node_5: {
      badge: "Structure & Style Badge 🛡️",
      hint: "Unlock HTML/CSS Hint Cards 💡",
      questions: [
        { q: "What does HTML stand for?", o: ["HyperText Markup Language", "HighTransfer Mail Layer", "Hyperlink Text Modulator", "Home Tool Markup Layout"], a: "HyperText Markup Language" },
        { q: "Which HTML5 tag is semantic and defines visual navigation zones?", o: ["<nav>", "<navigation>", "<menu>", "<header-nav>"], a: "<nav>" },
        { q: "Which attribute marks an input text field mandatory in HTML5 form submission?", o: ["required", "validate", "important", "strict"], a: "required" },
        { q: "What tag represents the primary, largest page header in HTML?", o: ["<h1>", "<header>", "<h6-main>", "<h>"], a: "<h1>" },
        { q: "Which HTML5 element represents self-contained content, like a forum post?", o: ["<article>", "<section>", "<div>", "<aside>"], a: "<article>" },
        { q: "What CSS property adjusts text color?", o: ["color", "font-color", "text-color", "rgb-value"], a: "color" },
        { q: "What is the outermost layer of the standard CSS Box Model?", o: ["Margin", "Padding", "Border", "Outline"], a: "Margin" },
        { q: "How do you select element nodes with class name 'btn' in CSS stylesheets?", o: [".btn", "#btn", "btn", "[class=btn]"], a: ".btn" },
        { q: "Which property declaration initializes a Flexbox layout container?", o: ["display: flex;", "layout: flexbox;", "flex-direction: row;", "float: left;"], a: "display: flex;" },
        { q: "How are custom CSS variables declared inside selectors?", o: ["--my-variable: value;", "$my-variable: value;", "@var my-variable: value;", "const my-variable;"], a: "--my-variable: value;" },
        { q: "Which meta tag in the head element is crucial for proper mobile screen scaling?", o: ["viewport", "charset", "keywords", "author"], a: "viewport" },
        { q: "What does the '1fr' unit represent in CSS Grid calculations?", o: ["One fraction of available space", "1 fluid row", "1 fixed ratio element", "First responsive column"], a: "One fraction of available space" },
        { q: "Which unit is calculated relative to the root html element font-size?", o: ["rem", "em", "px", "vh"], a: "rem" },
        { q: "How do you apply styling rules only for screen viewport widths above 1024px?", o: ["@media (min-width: 1024px)", "@screen-width > 1024px", "#media (width: 1024px)", "@responsive 1024px"], a: "@media (min-width: 1024px)" },
        { q: "Which CSS system manages columns and rows concurrently for 2D positioning?", o: ["CSS Grid", "Flexbox", "Floats", "Absolute offsets"], a: "CSS Grid" },
        { q: "What is Tailwind CSS?", o: ["A utility-first CSS framework", "A preprocessor library", "An external server compiler", "A CSS parsing module"], a: "A utility-first CSS framework" },
        { q: "How do CSS Modules keep styling configurations from bleeding?", o: ["By scoping selectors locally with unique names", "By compiling HTML inline", "By running scripts to lock nodes", "By disabling floats"], a: "By scoping selectors locally with unique names" },
        { q: "Which CSS property animates changes between visual state transitions?", o: ["transition", "animate", "keyframes", "transform"], a: "transition" },
        { q: "Which HTML5 element represents secondary content, like sidebars?", o: ["<aside>", "<section>", "<nav>", "<div>"], a: "<aside>" },
        { q: "Which keyword forces CSS selectors to override all other cascading rules?", o: ["!important", "override", "force", "root-level"], a: "!important" }
      ]
    },
    node_10: {
      badge: "JS Wizard Badge 🔮",
      hint: "Unlock Advanced JS Hint Cards ⚡",
      questions: [
        { q: "Which JS keyword declares a block-scoped constant value?", o: ["const", "let", "var", "immutable"], a: "const" },
        { q: "What does typeof null return in standard JavaScript execution?", o: ["object", "null", "undefined", "empty"], a: "object" },
        { q: "Which array method appends items directly to the end of the list?", o: ["push", "pop", "unshift", "concat"], a: "push" },
        { q: "What is a major feature of ES6 arrow functions?", o: ["Concise syntax and lexical 'this' binding", "Dynamic prototype inheritance", "Auto-blocking code compilation", "Synchronous network fetch"], a: "Concise syntax and lexical 'this' binding" },
        { q: "Which array iterator return values represent a new array with mapped modifications?", o: ["map", "filter", "forEach", "reduce"], a: "map" },
        { q: "What mechanism handles async callback execution in the browser?", o: ["Event Loop", "V8 thread pool", "Synchronous buffer", "Queue compiler"], a: "Event Loop" },
        { q: "What object handles the state representation of unfinished async operations?", o: ["Promise", "Callback", "Event", "AsyncThread"], a: "Promise" },
        { q: "Which queue runs first: Promise microtask queue or setTimeout macrotask queue?", o: ["Promise microtask queue", "setTimeout macrotask queue", "They execute in parallel", "Macrotask queue"], a: "Promise microtask queue" },
        { q: "How do you capture error rejections inside async/await function structures?", o: ["try...catch blocks", "Promise.then().catch()", "if-else checks", "Window.onerror callbacks"], a: "try...catch blocks" },
        { q: "What does API stand for in software architectures?", o: ["Application Programming Interface", "Adaptive Program Integration", "Active Protocol Intercept", "Algorithm Process Index"], a: "Application Programming Interface" },
        { q: "What object represents the web page node tree in client-side code?", o: ["DOM", "HTTP", "CSSOM", "Window"], a: "DOM" },
        { q: "How do you retrieve the first node matching a class selector in the DOM?", o: ["document.querySelector('.class')", "document.getElementById('class')", "document.querySelectorAll('class')", "document.find('class')"], a: "document.querySelector('.class')" },
        { q: "Which element property updates internal HTML tags dynamically?", o: ["innerHTML", "innerText", "textContent", "value"], a: "innerHTML" },
        { q: "Which event triggers when a keyboard key is pressed?", o: ["keydown", "click", "keypress", "input"], a: "keydown" },
        { q: "Which native API queries internet network resources natively in modern JS?", o: ["Fetch API", "XMLHttpRequest", "Axios", "Ajax"], a: "Fetch API" },
        { q: "Which HTTP response code family represents standard operation success?", o: ["200 family", "300 family", "400 family", "500 family"], a: "200 family" },
        { q: "Which browser storage persists key-value data indefinitely across sessions?", o: ["localStorage", "sessionStorage", "Cookie header", "Session state"], a: "localStorage" },
        { q: "How do you serialize JavaScript objects into JSON format strings?", o: ["JSON.stringify(obj)", "JSON.parse(obj)", "obj.toJSON()", "Serializer.encode(obj)"], a: "JSON.stringify(obj)" },
        { q: "Which array method returns a filtered array matching specific conditions?", o: ["filter", "find", "map", "slice"], a: "filter" },
        { q: "What describes event propagation bubbling in DOM nodes?", o: ["Events trigger on the target and bubble up to parents", "Events trigger on parents first and bubble down", "Events execute on parallel nodes", "Events cancel parent triggers"], a: "Events trigger on the target and bubble up to parents" }
      ]
    },
    node_15: {
      badge: "Full-Stack Architect Badge 🚀",
      hint: "Unlock Full-Stack Bonus Hints 🎁",
      questions: [
        { q: "What does React use to minimize direct slow browser DOM manipulations?", o: ["Virtual DOM", "Shadow DOM", "Dynamic XML", "Render Thread"], a: "Virtual DOM" },
        { q: "What format writes markup templates directly inside React JS files?", o: ["JSX", "TSX-Styles", "HTML-JS", "Mustache"], a: "JSX" },
        { q: "How do you trigger component updates when local state changes?", o: ["By calling the state setter function", "By updating props", "By reloading the browser window", "By modifying document.body"], a: "By calling the state setter function" },
        { q: "What is a main rule of utilizing React Hooks?", o: ["Only call hooks at the top level of React functions", "Call hooks inside loops", "Call hooks inside plain utility functions", "Only call hooks in server files"], a: "Only call hooks at the top level of React functions" },
        { q: "Which hook declares reactive state arrays or objects in functional modules?", o: ["useState", "useEffect", "useRef", "useMemo"], a: "useState" },
        { q: "Which hook executes asynchronous operations after component rendering?", o: ["useEffect", "useState", "useRef", "useCallback"], a: "useEffect" },
        { q: "Which hook persists mutable variables across renders without causing refreshes?", o: ["useRef", "useState", "useMemo", "useCallback"], a: "useRef" },
        { q: "What does useMemo prevent in React application components?", o: ["Redundant expensive computations", "Page layout shifts", "Browser request errors", "DOM selector conflicts"], a: "Redundant expensive computations" },
        { q: "Why would you memoize callback function variables with useCallback?", o: ["To preserve referential identity between renders", "To speed up network requests", "To force instant DOM updates", "To trigger global state updates"], a: "To preserve referential identity between renders" },
        { q: "Which framework is built on React for server rendering and routing?", o: ["Next.js", "Express", "Vite", "Gatsby"], a: "Next.js" },
        { q: "Where do Next.js Server Components compile and execute?", o: ["On the server side", "In the client browser", "In CDN cache scripts", "In background web workers"], a: "On the server side" },
        { q: "How does the Next.js 13+ App Router organize application routes?", o: ["Using nested directory structures with page files", "In single server.js route maps", "Using React Router hashes", "Inside package.json configurations"], a: "Using nested directory structures with page files" },
        { q: "What Next.js pre-rendering builds layout HTML assets ahead of time at build phase?", o: ["Static Site Generation (SSG)", "Server Side Rendering (SSR)", "Client Side Hydration", "Incremental API compile"], a: "Static Site Generation (SSG)" },
        { q: "Which Node.js helper splits and formats file directories across platforms?", o: ["path module", "fs module", "http module", "os module"], a: "path module" },
        { q: "Which minimalist Node.js routing and middleware framework is standard?", o: ["Express.js", "Next.js", "Vite", "Hapi"], a: "Express.js" },
        { q: "How do you pass control to the subsequent middleware handler in Express?", o: ["Call next()", "Return res.send()", "Call app.use()", "Return next"], a: "Call next()" },
        { q: "Which database system accesses structured tabular records using queries?", o: ["SQL", "NoSQL", "Document store", "Key-value engine"], a: "SQL" },
        { q: "What does a row in a relational database represent?", o: ["A single structured record", "A column property name", "A foreign key schema", "An index lookup map"], a: "A single structured record" },
        { q: "Which HTTP request method represents new data insertions in REST paradigms?", o: ["POST", "GET", "PUT", "DELETE"], a: "POST" },
        { q: "What Express command configures local port bindings to start listener threads?", o: ["app.listen()", "app.use()", "app.connect()", "app.start()"], a: "app.listen()" }
      ]
    }
  },
  finalQuestions: [
    { q: "Which HTML5 tag is semantic and defines visual navigation zones?", o: ["<nav>", "<navigation>", "<menu>", "<header-nav>"], a: "<nav>" },
    { q: "Which Box Model property defines the spacing between an element's text content and its surrounding border?", o: ["Margin", "Padding", "Border", "Outline"], a: "Padding" },
    { q: "Which CSS layout property is standard for creating a 3-column layout where each column occupies an equal portion of the available space?", o: ["grid-template-columns: repeat(3, 1fr);", "grid-template-columns: 1fr 1fr 1fr;", "grid-columns: 3;", "display: flex;"], a: "grid-template-columns: repeat(3, 1fr);" },
    { q: "Which keyword is correct for declaring a variable that can be updated later, scoped only inside its block?", o: ["const", "let", "var", "mutable"], a: "let" },
    { q: "Which keyword pauses code execution inside an async function until a returned Promise resolves?", o: ["await", "wait", "then", "defer"], a: "await" },
    { q: "Which DOM method is standard for attaching click listener handlers to button nodes?", o: ["addEventListener", "attachEvent", "onclick", "bindClick"], a: "addEventListener" },
    { q: "What is the primary native browser API used to perform async HTTP network queries in contemporary JavaScript?", o: ["Fetch API", "XMLHttpRequest", "Axios", "Ajax"], a: "Fetch API" },
    { q: "Which React mechanism allows parent components to configure and pass data down to their children?", o: ["Props", "State", "Context API", "Redux"], a: "Props" },
    { q: "Which React hook executes side-effects like initializing API network queries after a component mounts?", o: ["useState", "useEffect", "useRef", "useMemo"], a: "useEffect" },
    { q: "In the Next.js App Router paradigm, what file name is reserved to represent the primary visual UI page for a route?", o: ["index.tsx", "page.tsx", "layout.tsx", "route.ts"], a: "page.tsx" },
    { q: "In an Express.js backend system, what is the purpose of the 'next()' function argument in handlers?", o: ["It redirects the client to the next webpage URL", "It passes execution control to the next middleware or route handler", "It terminates the database query loop", "It logs execution performance metrics"], a: "It passes execution control to the next middleware or route handler" },
    { q: "What does the '1fr' unit represent in CSS Grid calculations?", o: ["One fraction of available space", "1 fluid row", "1 fixed ratio element", "First responsive column"], a: "One fraction of available space" },
    { q: "Which array iterator return values represent a new array with mapped modifications?", o: ["map", "filter", "forEach", "reduce"], a: "map" },
    { q: "What does useMemo prevent in React application components?", o: ["Redundant expensive computations", "Page layout shifts", "Browser request errors", "DOM selector conflicts"], a: "Redundant expensive computations" },
    { q: "How do you serialize JavaScript objects into JSON format strings?", o: ["JSON.stringify(obj)", "JSON.parse(obj)", "obj.toJSON()", "Serializer.encode(obj)"], a: "JSON.stringify(obj)" }
  ]
};

// =============================================================
// 2. PYTHON CURRICULUM
// =============================================================
export const PYTHON_CURRICULUM: CourseCurriculum = {
  subtitles: [
    "Python Basics & Syntax", "Control Flow Structures", "Python Lists & Tuples", "Python Dicts & Keys", "Checkpoint 1",
    "Functions & Parameters", "Object Oriented Classes", "Inheritance & Polymorphism", "Exceptions Try-Except", "Checkpoint 2",
    "Files Read & Write", "Generators & Yield", "Python Standard Library", "Decorators & Comprehensions", "Checkpoint 3",
    "Final Assessment"
  ],
  descriptions: [
    "Learn variables, print outputs, comments and dynamic typing definitions.",
    "Master if-else statements, for loops, while loops and iteration controls.",
    "Wield list creations, mutability, indexing, nested items and immutable tuples.",
    "Configure key-value hashes, mapping tables, dictionaries and unique set operations.",
    "Covers Python Phase 1. 20 Questions. Passing score: 50%.",
    "Structure modular def scopes, return types, args, kwargs and lambdas.",
    "Implement self-context builders, constructor class __init__ and object instantiation.",
    "Inherit class properties, overrides, super constructor calls and polymorphism.",
    "Catch runtime overflows, capture try-except errors and call finally cleanups.",
    "Covers Python Phase 2. 20 Questions. Passing score: 50%.",
    "Manipulate filesystem files, parse JSON payloads and close file buffers.",
    "Stream values lazily using iterators, yield key structures and optimize memory.",
    "Import datetime, math, sys, os, random and standard helper modules.",
    "Apply decorator functions, wrap properties and write list comprehensions.",
    "Covers Python Phase 3. 20 Questions. Passing score: 50%.",
    "Comprehensive Python diagnostic assessment (mixed difficulty)."
  ],
  lessons: {
    node_1: {
      slides: [
        "Welcome to Python! Python is a high-level, interpreted scripting language famous for code readability and elegant syntactic rules.",
        "Declare variables simply by writing name = value. Python uses dynamic typing; you do not declare variable types explicitly.",
        "Print values using print('hello') and receive client command line inputs with input('prompt').",
        "Indentations are mandatory in Python. Code blocks are defined by tab/spaces indentations rather than curly braces.",
        "Create comments using '#' symbols for single lines, or triple quotes for multi-line descriptive text."
      ],
      question: "Which of the following creates a comment in Python?",
      options: ["// comment", "# comment", "/* comment */", "<!-- comment -->"],
      correct: "# comment",
      explanation: "Python uses the '#' character to indicate that the rest of the line is a code comment."
    },
    node_2: {
      slides: [
        "Control flow manages execution paths. Use if, elif, and else to build conditional statement paths.",
        "For loops iterate over sequences (like lists or range objects): for i in range(5) loops from 0 to 4.",
        "While loops execute code repeatedly as long as a conditional check remains True.",
        "Control loop iterations using break (terminates loop) and continue (skips to next iteration loop).",
        "The pass statement is a null operation placeholder, used where syntactically required but no action is needed."
      ],
      question: "What is the output of [i for i in range(3)]?",
      options: ["[1, 2, 3]", "[0, 1, 2]", "[0, 1, 2, 3]", "[1, 2]"],
      correct: "[0, 1, 2]",
      explanation: "range(3) yields integers starting from 0 up to (but not including) 3: 0, 1, and 2."
    },
    node_3: {
      slides: [
        "Lists are ordered, mutable collections. Declare lists using square brackets: items = [1, 2, 3].",
        "Index list items starting from 0. Access items from the end of lists using negative indices (e.g. items[-1]).",
        "Slice lists using start:stop:step formats: items[0:2] grabs the first two elements.",
        "Modify lists using methods like .append(val), .insert(idx, val), .remove(val), or .pop().",
        "Tuples are ordered, immutable lists. Declare tuples using parentheses: coordinates = (10, 20)."
      ],
      question: "What is the primary difference between a Python List and a Tuple?",
      options: [
        "Lists are immutable, Tuples are mutable",
        "Lists are mutable, Tuples are immutable",
        "Tuples only store numbers",
        "Lists cannot be sliced"
      ],
      correct: "Lists are mutable, Tuples are immutable",
      explanation: "Once created, the elements of a tuple cannot be changed or re-assigned, whereas lists can be modified freely."
    },
    node_4: {
      slides: [
        "Dictionaries (dict) are mutable collections storing key-value pairs. Declare dicts using curly braces: user = {'id': 1}.",
        "Access dictionary values via keys: user['id'] or safely using user.get('id', default).",
        "Keys must be hashable, immutable types (like strings, numbers, or tuples). Values can be any type.",
        "Loop keys, values, or pairs using .keys(), .values(), and .items() dictionary methods.",
        "Sets are unordered collections of unique elements. Sets automatically filter out duplicate inputs."
      ],
      question: "Which dict method retrieves a value safely, returning a default fallback instead of throwing a KeyError on missing keys?",
      options: [".get()", ".pop()", ".keys()", ".fetch()"],
      correct: ".get()",
      explanation: "The get() method retrieves values by key but returns None (or a specified default) if the key is absent."
    },
    node_6: {
      slides: [
        "Define functions using the 'def' keyword: def greet(name): return f'Hello {name}'.",
        "Functions return None by default if no explicit return statement is encountered during execution.",
        "Accept arbitrary positional arguments using *args, and arbitrary key-value arguments using **kwargs.",
        "Lambda functions are anonymous, single-expression functions: add = lambda a, b: a + b.",
        "Python scopes resolve using the LEGB rule: Local, Enclosing, Global, and Built-in namespaces."
      ],
      question: "Which keyword declares an anonymous inline single-expression function in Python?",
      options: ["def", "lambda", "func", "inline"],
      correct: "lambda",
      explanation: "The 'lambda' keyword creates small, anonymous functions that execute a single expression."
    },
    node_7: {
      slides: [
        "Python supports Object-Oriented Programming (OOP) using classes: class Dog: pass.",
        "The __init__ method is the class constructor. It initializes attributes when creating new object instances.",
        "The 'self' argument represents the specific object instance, passing references to local attributes and methods.",
        "Define instance attributes inside __init__ using self.name = name syntaxes.",
        "Class attributes are shared across all instances, defined directly within class scopes outside constructors."
      ],
      question: "What does the 'self' parameter represent inside Python class methods?",
      options: [
        "The parent base class",
        "The active module scope",
        "The current specific instance of the class",
        "The global thread manager"
      ],
      correct: "The current specific instance of the class",
      explanation: "By convention, 'self' passes the object instance reference, allowing access to its local attributes."
    },
    node_8: {
      slides: [
        "Inheritance allows child classes to inherit attributes and methods from parent classes: class Child(Parent):.",
        "Call parent class constructor overrides cleanly using the super() function: super().__init__().",
        "Polymorphism allows child classes to override parent methods to implement customized behaviors.",
        "Python supports multiple inheritance, inheriting attributes from multiple parents: class Child(ParentA, ParentB):.",
        "Python resolves inheritance hierarchies using Method Resolution Order (MRO), accessible via Class.__mro__."
      ],
      question: "How does a subclass invoke the constructor of its parent class in Python?",
      options: ["parent.__init__()", "super().__init__()", "self.constructor()", "base()"],
      correct: "super().__init__()",
      explanation: "The super() function returns proxy delegations to parent classes, letting you call their __init__ methods."
    },
    node_9: {
      slides: [
        "Exceptions represent errors encountered during code execution. Capture them to prevent application crashes.",
        "Use try...except blocks to handle errors: if code inside 'try' fails, 'except' executes.",
        "Catch specific errors (e.g. ValueError, ZeroDivisionError) to implement tailored recovery steps.",
        "The 'else' block executes only if the code inside 'try' succeeds without raising exceptions.",
        "The 'finally' block executes regardless of whether exceptions were raised or caught, ideal for cleanups."
      ],
      question: "Which block in exception handling always executes, useful for closing files or database connections?",
      options: ["except", "finally", "else", "catch"],
      correct: "finally",
      explanation: "The 'finally' block runs at the end of exception handling, ensuring cleanup scripts execute."
    },
    node_11: {
      slides: [
        "Manipulate files using open(filepath, mode). Modes include 'r' (read), 'w' (write), and 'a' (append).",
        "Always close file buffers after operations, or use context managers ('with' statements) to automate closure.",
        "The 'with' statement: with open('file.txt', 'r') as f: content = f.read() handles closes safely.",
        "Read file lines as lists using f.readlines(), or iterate lines directly: for line in f: print(line).",
        "The built-in 'json' module serializes data: json.dumps() writes JSON strings, json.loads() parses them."
      ],
      question: "What is the recommended, safest approach to open files in Python to guarantee they close on completion?",
      options: [
        "Using open() and close() on separate lines",
        "Using the 'with' statement context manager",
        "Running file.dispose() inside threads",
        "Using json.load()"
      ],
      correct: "Using the 'with' statement context manager",
      explanation: "Context managers ('with') guarantee file descriptors release even if exceptions occur inside blocks."
    },
    node_12: {
      slides: [
        "Iterators are objects that implement the iterator protocol: __iter__() and __next__() methods.",
        "Generators are functions that simplify creating iterators. They return values using 'yield' instead of 'return'.",
        "When generator functions yield, their execution state is suspended and saved for subsequent requests.",
        "Call next(generator) to retrieve the next yielded value. Once empty, generators raise StopIteration.",
        "Generator expressions create generators compactly: gen = (x**2 for x in range(100))."
      ],
      question: "Which Python keyword suspends function execution, returning values lazily to iterators?",
      options: ["return", "yield", "suspend", "next"],
      correct: "yield",
      explanation: "The 'yield' keyword marks functions as generators, returning values lazily on demand."
    },
    node_13: {
      slides: [
        "Python features a rich standard library. Use the 'os' module for directory operations and environment variables.",
        "Use the 'sys' module for command-line arguments (sys.argv) and interpreter configurations.",
        "The 'datetime' module handles dates, time zones, formatting, and time delta computations.",
        "The 'math' module provides trigonometric, exponential, logarithmic, and constant operations.",
        "The 'random' module generates pseudo-random numbers and picks random items from lists."
      ],
      question: "Which standard library module handles date formatting and timezone conversions?",
      options: ["os", "sys", "datetime", "random"],
      correct: "datetime",
      explanation: "The 'datetime' module defines classes for manipulating dates, times, and formatting time zones."
    },
    node_14: {
      slides: [
        "Decorators modify or wrap functions or methods without changing their source code definitions.",
        "Decorators are syntactic sugar, declared using '@decorator_name' syntax above target functions.",
        "List comprehensions create lists elegantly: evens = [x for x in range(10) if x % 2 == 0].",
        "Dictionary comprehensions create dicts: squared = {x: x**2 for x in range(5)}.",
        "Understand *args (tuple of positional parameters) and **kwargs (dictionary of named parameters)."
      ],
      question: "How are Python decorators declared above target functions?",
      options: ["@decorator", "#decorator", "def decorator:", "import decorator"],
      correct: "@decorator",
      explanation: "The '@' symbol prefixes decorator declarations positioned directly above functions."
    }
  },
  checkpoints: {
    node_5: {
      badge: "Python Core Cadet Badge 🐍",
      hint: "Unlock Python Syntax Hints 💡",
      questions: [
        { q: "What is the correct way to output text to the console in Python?", o: ["print('hello')", "console.log('hello')", "System.out.println('hello')", "echo 'hello'"], a: "print('hello')" },
        { q: "Which character initiates single line comments in Python code?", o: ["#", "//", "/*", "<!--"], a: "#" },
        { q: "How do you start an if statement in Python?", o: ["if x > 5:", "if (x > 5)", "if x > 5 then", "if x > 5 {}"], a: "if x > 5:" },
        { q: "What does range(5) yield?", o: ["0, 1, 2, 3, 4", "1, 2, 3, 4, 5", "0, 1, 2, 3, 4, 5", "1, 2, 3, 4"], a: "0, 1, 2, 3, 4" },
        { q: "What is the output of len([1, 2, 3])?", o: ["3", "2", "4", "Error"], a: "3" },
        { q: "Which data type is immutable?", o: ["List", "Dictionary", "Tuple", "Set"], a: "Tuple" },
        { q: "How do you add an item to the end of a list?", o: [".append()", ".push()", ".insert()", ".add()"], a: ".append()" },
        { q: "What is the key difference in lists vs tuples?", o: ["Lists are mutable, tuples are immutable", "Tuples are mutable, lists are immutable", "Lists only hold strings", "Tuples cannot contain nested structures"], a: "Lists are mutable, tuples are immutable" },
        { q: "Which braces declare dictionaries in Python?", o: ["{}", "[]", "()", "<>"], a: "{}" },
        { q: "How do you check if a key exists in a dictionary?", o: ["key in dict", "dict.has(key)", "key exists dict", "dict.contains(key)"], a: "key in dict" },
        { q: "What is the output of 'hello'[1]?", o: ["e", "h", "l", "o"], a: "e" },
        { q: "Which statement skips to the next iteration of a loop?", o: ["continue", "break", "pass", "skip"], a: "continue" },
        { q: "Which statement terminates a loop immediately?", o: ["break", "continue", "pass", "exit"], a: "break" },
        { q: "How do you instantiate an empty set in Python?", o: ["set()", "{}", "[]", "set([])"], a: "set()" },
        { q: "What is the output of [x*2 for x in range(3)]?", o: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[1, 2]"], a: "[0, 2, 4]" },
        { q: "Which keyword acts as a placeholder for unwritten blocks?", o: ["pass", "continue", "break", "todo"], a: "pass" },
        { q: "What does the expression 5 // 2 evaluate to?", o: ["2", "2.5", "1", "3"], a: "2" },
        { q: "What does the expression 5 % 2 evaluate to?", o: ["1", "2.5", "2", "0"], a: "1" },
        { q: "What is the indexing of the last element in list 'my_list'?", o: ["my_list[-1]", "my_list[len(my_list)]", "my_list[last]", "my_list[0]"], a: "my_list[-1]" },
        { q: "Which module checks system environment info?", o: ["sys", "math", "random", "datetime"], a: "sys" }
      ]
    },
    node_10: {
      badge: "Python Object Master Badge 🔮",
      hint: "Unlock OOP & Exception Hints ⚡",
      questions: [
        { q: "Which keyword defines function structures in Python?", o: ["def", "function", "func", "define"], a: "def" },
        { q: "What parameter must class methods receive as their first argument?", o: ["self", "this", "cls", "object"], a: "self" },
        { q: "What is the name of the Python constructor method?", o: ["__init__", "constructor", "init", "new"], a: "__init__" },
        { q: "Which keyword overrides default parent properties in children?", o: ["super()", "parent", "base", "self"], a: "super()" },
        { q: "How do you capture division by zero errors specifically?", o: ["except ZeroDivisionError:", "except Error:", "catch ZeroDivisionError", "try ZeroDivisionError:"], a: "except ZeroDivisionError:" },
        { q: "What is the Method Resolution Order (MRO)?", o: ["The hierarchy path Python searches for inherited attributes", "The compile order of scripts", "The directory import sequence", "The memory cleanup thread"], a: "The hierarchy path Python searches for inherited attributes" },
        { q: "Which block runs only if no exception is raised inside the try block?", o: ["else", "finally", "except", "catch"], a: "else" },
        { q: "Which block always executes at the end of exception scopes?", o: ["finally", "except", "else", "try"], a: "finally" },
        { q: "Which keyword raises custom exceptions manually?", o: ["raise", "throw", "error", "trigger"], a: "raise" },
        { q: "Which built-in function returns directory folders and files in OS?", o: ["os.listdir()", "sys.argv", "datetime.now()", "math.sqrt()"], a: "os.listdir()" },
        { q: "What is the type of variables created inside functions without global declarations?", o: ["Local variables", "Global variables", "Enclosing parameters", "Static fields"], a: "Local variables" },
        { q: "How do you declare variable modifiers targeting globals inside def blocks?", o: ["global name", "name = global", "self.name", "import name"], a: "global name" },
        { q: "What represents functions that receive arbitrary keywords? (**kwargs)", o: ["A dictionary", "A list", "A tuple", "A set"], a: "A dictionary" },
        { q: "What does *args receive?", o: ["A tuple of arguments", "A list of values", "A dictionary of keys", "A set"], a: "A tuple of arguments" },
        { q: "What evaluates lambda expressions?", o: ["Single-expression return values", "Multi-statement execution graphs", "Class properties", "Modules"], a: "Single-expression return values" },
        { q: "What is multiple inheritance?", o: ["A class inheriting attributes from multiple parents", "A class instantiated multiple times", "Inheritance across multiple modules", "Multiple constructors"], a: "A class inheriting attributes from multiple parents" },
        { q: "What does raising NotImplementedError indicate?", o: ["Methods require subclasses to override them", "File was not found", "Memory capacity limit", "Syntax error"], a: "Methods require subclasses to override them" },
        { q: "What returns the class hierarchy list visually?", o: ["Class.__mro__", "Class.mro()", "Class.__base__", "super()"], a: "Class.__mro__" },
        { q: "What happens if return statements are omitted in functions?", o: ["They return None", "They raise errors", "They loop infinitely", "They clear variables"], a: "They return None" },
        { q: "What scope does the LEGB rule start checks at?", o: ["Local", "Enclosing", "Global", "Built-in"], a: "Local" }
      ]
    },
    node_15: {
      badge: "Python System Architect Badge 🚀",
      hint: "Unlock File, Generator & Decorator Hints 🎁",
      questions: [
        { q: "What keyword operates file context boundaries safely?", o: ["with", "open", "try", "using"], a: "with" },
        { q: "What method writes Python objects to JSON files?", o: ["json.dump()", "json.dumps()", "json.load()", "json.loads()"], a: "json.dump()" },
        { q: "Which statement defines generator return sequences?", o: ["yield", "return", "send", "generate"], a: "yield" },
        { q: "How do you retrieve the next yield item from generators?", o: ["next()", "generator.yield()", "generator.get()", "generator.next"], a: "next()" },
        { q: "What raises when generators have no more values to yield?", o: ["StopIteration", "IndexError", "ValueError", "None"], a: "StopIteration" },
        { q: "Which module reads system command line arguments?", o: ["sys", "os", "math", "datetime"], a: "sys" },
        { q: "Which module creates pseudo-random selections?", o: ["random", "math", "sys", "datetime"], a: "random" },
        { q: "How are decorators syntactically declared?", o: ["@name", "#name", "def name:", "import name"], a: "@name" },
        { q: "What is list comprehension?", o: ["A compact way to initialize lists", "A list size compression tool", "A list validation regex", "A loop debugger"], a: "A compact way to initialize lists" },
        { q: "How do you read all lines from files into lists?", o: ["f.readlines()", "f.read()", "f.readline()", "json.load()"], a: "f.readlines()" },
        { q: "Which file open mode represents text appending?", o: ["'a'", "'r'", "'w'", "'x'"], a: "'a'" },
        { q: "Which json method parses strings into Python dictionaries?", o: ["json.loads()", "json.load()", "json.dumps()", "json.dump()"], a: "json.loads()" },
        { q: "What does a dictionary comprehension look like?", o: ["{x: x**2 for x in range(3)}", "[x: x**2 for x in range(3)]", "(x: x**2 for x in range(3))", "{x for x in range(3)}"], a: "{x: x**2 for x in range(3)}" },
        { q: "Which package operator downloads third-party packages in Python environments?", o: ["pip", "npm", "cargo", "gem"], a: "pip" },
        { q: "What is the return type of a generator expression?", o: ["A generator iterator object", "A list", "A tuple", "A function"], a: "A generator iterator object" },
        { q: "Which module computes square roots natively?", o: ["math", "sys", "os", "random"], a: "math" },
        { q: "What does sys.argv[0] contain?", o: ["The script file name path", "First user argument", "Total argument counts", "System path"], a: "The script file name path" },
        { q: "How does os.environ retrieve variables safely?", o: ["os.environ.get('KEY')", "os.environ['KEY']", "os.getenv('KEY')", "Both get and getenv"], a: "Both get and getenv" },
        { q: "What represents a nested list comprehension equivalent?", o: ["Nested loops", "Lambda functions", "Decorators", "Dictionaries"], a: "Nested loops" },
        { q: "What does a generator function return on invocation before running code?", o: ["A generator object", "The first yielded value", "None", "StopIteration"], a: "A generator object" }
      ]
    }
  },
  finalQuestions: [
    { q: "What keyword operates file context boundaries safely?", o: ["with", "open", "try", "using"], a: "with" },
    { q: "Which data type is immutable?", o: ["List", "Dictionary", "Tuple", "Set"], a: "Tuple" },
    { q: "What is the output of [x*2 for x in range(3)]?", o: ["[0, 2, 4]", "[2, 4, 6]", "[0, 1, 2]", "[1, 2]"], a: "[0, 2, 4]" },
    { q: "Which keyword defines function structures in Python?", o: ["def", "function", "func", "define"], a: "def" },
    { q: "What parameter must class methods receive as their first argument?", o: ["self", "this", "cls", "object"], a: "self" },
    { q: "What is the name of the Python constructor method?", o: ["__init__", "constructor", "init", "new"], a: "__init__" },
    { q: "Which block always executes at the end of exception scopes?", o: ["finally", "except", "else", "try"], a: "finally" },
    { q: "Which keyword raises custom exceptions manually?", o: ["raise", "throw", "error", "trigger"], a: "raise" },
    { q: "Which module reads system command line arguments?", o: ["sys", "os", "math", "datetime"], a: "sys" },
    { q: "How are decorators syntactically declared?", o: ["@name", "#name", "def name:", "import name"], a: "@name" },
    { q: "What is the output of 'hello'[1]?", o: ["e", "h", "l", "o"], a: "e" },
    { q: "How do you instantiate an empty set in Python?", o: ["set()", "{}", "[]", "set([])"], a: "set()" },
    { q: "What does the expression 5 // 2 evaluate to?", o: ["2", "2.5", "1", "3"], a: "2" },
    { q: "Which keyword declares an anonymous inline single-expression function in Python?", o: ["def", "lambda", "func", "inline"], a: "lambda" },
    { q: "What does super() return?", o: ["Proxy delegations to parent constructor methods", "The base module", "Child parameters", "Instances"], a: "Proxy delegations to parent constructor methods" }
  ]
};

// =============================================================
// 3. AI & MACHINE LEARNING CURRICULUM
// =============================================================
export const AI_ML_CURRICULUM: CourseCurriculum = {
  subtitles: [
    "AI Foundations", "Supervised Classifiers", "Unsupervised Clusters", "Model Validations", "Checkpoint 1",
    "Neural Networks", "Gradient Descents", "CNN Image Convs", "RNN LSTM Sequences", "Checkpoint 2",
    "Self Attention Transformers", "GenAI Prompt Engineering", "ML Pipelines", "AI Ethics & Biases", "Checkpoint 3",
    "Final Assessment"
  ],
  descriptions: [
    "Explore AI vs ML, simple linear regressions and vector bounds.",
    "Master decision trees, KNN classifiers and support vectors.",
    "Configure K-Means cluster networks and PCA dimensions.",
    "Assess accuracy scores, recall, F1 matrices and ROC curves.",
    "Covers AI Phase 1. 20 Questions. Passing score: 50%.",
    "Learn perceptrons, layer models, activation functions and weights.",
    "Study backpropagation derivations, learning rates and loss minimizers.",
    "Implement convolution kernels, pool mappings and feature tracks.",
    "Wield recurrences, LSTM gates and vector embeddings.",
    "Covers AI Phase 2. 20 Questions. Passing score: 50%.",
    "Understand self-attention query-key-value vectors and encoder weights.",
    "Design generative models, diffusion maps and prompt parameters.",
    "Clean features, configure scalar scaling and deploy predictions.",
    "Identify dataset bias, configure fairness and prevent hallucinations.",
    "Covers AI Phase 3. 20 Questions. Passing score: 50%.",
    "Comprehensive AI & ML final timed check."
  ],
  lessons: {
    node_1: {
      slides: [
        "Welcome to Artificial Intelligence! AI simulates human cognitive processing inside systems, split into Narrow AI and General AI (AGI).",
        "Machine Learning (ML) is a subset of AI that trains mathematical algorithms to predict outputs from training data.",
        "Deep Learning (DL) scales ML using deep multi-layered neural networks resembling biological brain nodes.",
        "ML tasks include Supervised Learning (labeled target values) and Unsupervised Learning (unlabeled data analysis).",
        "Regression predicts continuous numerical values (like home values), while Classification predicts categories (like spam or ham)."
      ],
      question: "Which of the following describes predicting continuous numerical target outputs?",
      options: ["Classification", "Regression", "Clustering", "Reinforcement"],
      correct: "Regression",
      explanation: "Regression is a supervised learning task mapping data to continuous numerical real values."
    },
    node_2: {
      slides: [
        "Supervised classifiers learn mappings from features to category classifications: y = f(x).",
        "Linear regression fits a straight line: y = wx + b. Logistic regression uses sigmoid functions to output category probabilities.",
        "Decision Trees split data repeatedly based on feature thresholds to maximize information gain.",
        "KNN (K-Nearest Neighbors) classifies items by comparing features against the K closest samples.",
        "Support Vector Machines (SVMs) find optimal hyperplanes that maximize boundaries between categories."
      ],
      question: "Which activation function squashes logistic regression values between 0 and 1 representing probabilities?",
      options: ["ReLU", "Sigmoid", "Tanh", "Softmax"],
      correct: "Sigmoid",
      explanation: "The Sigmoid function maps arbitrary scalars to a output probability score between 0 and 1."
    },
    node_3: {
      slides: [
        "Unsupervised learning extracts underlying structures and patterns from input features without pre-labeled data targets.",
        "K-Means Clustering divides datasets into K unique clusters by updating centroid centers repeatedly.",
        "Dimensionality reduction compresses features. Principal Component Analysis (PCA) projects features to orthogonal components.",
        "Hierarchical clustering builds tree diagrams (dendrograms) to cluster data progressively.",
        "Anomaly detection flags outlier observations that deviate significantly from average dataset behaviors."
      ],
      question: "Which algorithm projects datasets to orthogonal principal components to reduce dimensionality?",
      options: ["K-Means", "PCA", "KNN", "Decision Tree"],
      correct: "PCA",
      explanation: "Principal Component Analysis (PCA) maps features to high-variance orthogonal vectors."
    },
    node_4: {
      slides: [
        "Assess model performance using validation datasets. Simple accuracy can mislead if classes are highly imbalanced.",
        "Precision checks true positives against all predicted positives. Recall checks true positives against all actual positives.",
        "The F1-Score represents the harmonic mean of precision and recall: 2 * (P * R) / (P + R).",
        "The Confusion Matrix maps True Positives, False Positives, True Negatives, and False Negatives in a table.",
        "ROC-AUC curves plot true positive rates against false positive rates across variable classification thresholds."
      ],
      question: "What metric is the harmonic mean of precision and recall, balancing both in imbalanced datasets?",
      options: ["Accuracy", "F1-Score", "ROC-AUC", "Mean Squared Error"],
      correct: "F1-Score",
      explanation: "F1-Score balances precision and recall, serving as a robust metric for imbalanced classes."
    },
    node_6: {
      slides: [
        "Artificial Neural Networks (ANNs) consist of interconnected nodes: input layers, hidden layers, and output layers.",
        "Perceptrons are basic single-cell nodes: output = activation(sum(weight * input) + bias).",
        "Activation functions introduce non-linearity, allowing networks to learn complex mapping curves.",
        "ReLU (Rectified Linear Unit) outputs x if positive, else zero: f(x) = max(0, x). It dominates deep networks.",
        "Softmax activation squashes output logits in multi-class classifiers to probabilities summing strictly to 1."
      ],
      question: "Which activation function resolves vanishing gradient issues by outputting max(0, x)?",
      options: ["Sigmoid", "ReLU", "Tanh", "Softmax"],
      correct: "ReLU",
      explanation: "ReLU has a constant gradient of 1 for positive values, which helps avoid vanishing gradients during backpropagation."
    },
    node_7: {
      slides: [
        "Neural networks update weights to minimize errors computed by loss functions (like Mean Squared Error).",
        "Gradient Descent calculates slopes of loss functions to adjust weights: weight = weight - learning_rate * gradient.",
        "The learning rate parameter controls the size of adjustments made to weights on each update step.",
        "Backpropagation calculates gradients recursively from output layers back to inputs using the chain rule.",
        "Stochastic Gradient Descent (SGD) computes loss gradients on small mini-batches of data to accelerate training."
      ],
      question: "Which algorithmic process calculates loss function gradients recursively using the chain rule?",
      options: ["Feedforward", "Backpropagation", "Regularization", "Dimensionality Reduction"],
      correct: "Backpropagation",
      explanation: "Backpropagation propagates errors backwards through network layers to compute weight gradients."
    },
    node_8: {
      slides: [
        "Convolutional Neural Networks (CNNs) are specialized for processing grids of data, like digital images.",
        "Convolution layers apply filters (kernels) that slide over images to detect features like edges or textures.",
        "Pooling layers downsample feature dimensions (e.g. Max Pooling takes maximum values in sub-grids), reducing parameters.",
        "Feature maps are passed to fully-connected dense layers at the end of CNNs to classify images.",
        "Popular CNN architectures include AlexNet, ResNet, and VGG, which feature deep residual block connections."
      ],
      question: "Which layer type downsamples feature map dimensions by selecting maximum values in sub-regions?",
      options: ["Convolutional", "Max Pooling", "Dense", "Dropout"],
      correct: "Max Pooling",
      explanation: "Max Pooling reduces spatial dimensions by extracting the maximum value from kernel sub-grids."
    },
    node_9: {
      slides: [
        "Recurrent Neural Networks (RNNs) process sequence data (like text or time series) by maintaining feedback loops.",
        "RNNs suffer from vanishing gradients over long sequences, which limits their memory of early inputs.",
        "Long Short-Term Memory (LSTM) networks resolve this using cell states and gates (input, forget, output gates).",
        "Gated Recurrent Units (GRUs) simplify LSTMs by combining forget and input gates into single update gates.",
        "Word embeddings (like Word2Vec or GloVe) convert text tokens to continuous vectors capturing semantic meaning."
      ],
      question: "Which RNN variant uses input, forget, and output gates to preserve long-range dependencies?",
      options: ["Simple RNN", "LSTM", "Dense Net", "Transformer"],
      correct: "LSTM",
      explanation: "LSTMs use gating mechanisms to regulate flow, allowing them to preserve long-term dependencies."
    },
    node_11: {
      slides: [
        "Transformers (introduced in 2017) process sequences in parallel, replacing sequential RNN recurrence.",
        "The Self-Attention mechanism computes relationship weights between all tokens in sequences concurrently.",
        "Attention uses Query (Q), Key (K), and Value (V) vectors: attention = softmax(QK^T / sqrt(d))V.",
        "Multi-head attention splits Q, K, and V vectors to learn diverse contextual relationships in parallel.",
        "Positional encodings are added to token embeddings to preserve word order information in parallel processing."
      ],
      question: "Which vectors are calculated to compute relationship weights in Self-Attention?",
      options: [
        "Query, Key, and Value vectors",
        "Weight and Bias scalars",
        "Gradient and Loss vectors",
        "Input and Target vectors"
      ],
      correct: "Query, Key, and Value vectors",
      explanation: "Self-attention computes weights by matching Query vectors against Key vectors, scaling Value outputs."
    },
    node_12: {
      slides: [
        "Generative AI models create new content (text, images, code) based on training patterns.",
        "Large Language Models (LLMs) are decoder-only transformers trained to predict subsequent tokens.",
        "Diffusion models generate images by progressively removing noise from random starting matrices.",
        "Prompt Engineering optimizes input queries to guide LLM outputs (e.g. using few-shot examples or system instructions).",
        "Fine-Tuning adapts pre-trained base models to specific tasks by training them on curated target datasets."
      ],
      question: "What refers to optimizing input text queries to get accurate outputs from LLMs?",
      options: ["Backpropagation", "Prompt Engineering", "PCA", "Gradient Descent"],
      correct: "Prompt Engineering",
      explanation: "Prompt Engineering is the practice of crafting instructions and templates to guide LLM responses."
    },
    node_13: {
      slides: [
        "Machine learning pipelines streamline data ingestion, preprocessing, training, and deployment.",
        "Feature scaling (e.g. Standard Scaler normalizes to mean=0, variance=1) prevents large features from dominating.",
        "Encode categorical text features into numbers using One-Hot encoding or label maps.",
        "Overfitting occurs when models memorize training noise. Prevent it using regularization (L1/L2) or dropout.",
        "Underfitting happens when models are too simple. Resolve it by increasing parameters or training epochs."
      ],
      question: "Which issue occurs when models memorize training noise and perform poorly on validation data?",
      options: ["Underfitting", "Overfitting", "Gradient Descent", "One-Hot Encoding"],
      correct: "Overfitting",
      explanation: "Overfitting occurs when models learn training noise, which hurts generalization on new data."
    },
    node_14: {
      slides: [
        "AI Ethics ensures models are developed and deployed safely, fairly, and transparently.",
        "Data bias (imbalanced representation in training sets) leads to unfair or discriminatory model predictions.",
        "Fairness metrics audit models to ensure predictions are equitable across different groups.",
        "Hallucinations occur when generative models output plausible-sounding but factually incorrect assertions.",
        "Explainable AI (XAI) tools (like SHAP or LIME) clarify which features influenced model predictions."
      ],
      question: "What refers to generative models producing outputs that sound realistic but are factually incorrect?",
      options: ["Overfitting", "Hallucination", "Bias", "Backpropagation"],
      correct: "Hallucination",
      explanation: "Hallucination describes outputs where models generate false or unverified assertions confidently."
    }
  },
  checkpoints: {
    node_5: {
      badge: "AI Cadet Badge 🤖",
      hint: "Unlock ML Foundations Hints 💡",
      questions: [
        { q: "What is Machine Learning?", o: ["Training algorithms on data to predict outputs", "Writing complex hardcoded rules", "Building physical robot joints", "Compiling HTML code"], a: "Training algorithms on data to predict outputs" },
        { q: "Which task predicts continuous numerical target values?", o: ["Regression", "Classification", "Clustering", "Association"], a: "Regression" },
        { q: "Which task predicts categorical classes (like Spam/Ham)?", o: ["Classification", "Regression", "Clustering", "PCA"], a: "Classification" },
        { q: "What is the formula of linear regression?", o: ["y = wx + b", "y = sigmoid(x)", "y = x^2", "y = log(x)"], a: "y = wx + b" },
        { q: "Which algorithm splits data repeatedly to maximize information gain?", o: ["Decision Tree", "KNN", "Linear Regression", "K-Means"], a: "Decision Tree" },
        { q: "What does PCA stand for?", o: ["Principal Component Analysis", "Primary Classifier Algorithm", "Predictive Convolution Agent", "Port Connection Array"], a: "Principal Component Analysis" },
        { q: "Which is an unsupervised clustering algorithm?", o: ["K-Means", "Logistic Regression", "SVM", "Decision Tree"], a: "K-Means" },
        { q: "What projects data to orthogonal components of high variance?", o: ["PCA", "KNN", "Gradient Descent", "Linear Regression"], a: "PCA" },
        { q: "What represents the proportion of correct predictions out of all predictions?", o: ["Accuracy", "Precision", "Recall", "F1-Score"], a: "Accuracy" },
        { q: "What metric is the harmonic mean of precision and recall?", o: ["F1-Score", "Accuracy", "ROC-AUC", "Mean Squared Error"], a: "F1-Score" },
        { q: "What table maps True/False Positives and Negatives?", o: ["Confusion Matrix", "Correlation Table", "Adjacency List", "Truth Table"], a: "Confusion Matrix" },
        { q: "What does KNN stand for?", o: ["K-Nearest Neighbors", "Kernel Neural Network", "Key Node Net", "K-Means Nearest Node"], a: "K-Nearest Neighbors" },
        { q: "What maps model outputs to probabilities between 0 and 1?", o: ["Sigmoid", "ReLU", "Tanh", "Linear"], a: "Sigmoid" },
        { q: "What does unsupervised learning work on?", o: ["Unlabeled data features", "Labeled target categories", "Simulated environments", "Compiled binary files"], a: "Unlabeled data features" },
        { q: "Which algorithm is highly sensitive to the distance metric used?", o: ["KNN", "Decision Tree", "Linear Regression", "Naive Bayes"], a: "KNN" },
        { q: "What does SVM stand for?", o: ["Support Vector Machine", "Supervised Vector Model", "System Variable Matrix", "Signal Vector Module"], a: "Support Vector Machine" },
        { q: "Which of the following is a classification metric?", o: ["Precision", "Mean Absolute Error", "R-squared", "Root Mean Squared Error"], a: "Precision" },
        { q: "What is overfitting?", o: ["Model performs well on training but poorly on validation data", "Model performs poorly on both training and validation", "Model compiles too slowly", "Model has too few parameters"], a: "Model performs well on training but poorly on validation data" },
        { q: "Which scaling normalizes data to mean=0 and variance=1?", o: ["Standard Scaling", "Min-Max Scaling", "One-Hot Encoding", "Regularization"], a: "Standard Scaling" },
        { q: "Which encoding converts categorical text into binary column matrices?", o: ["One-Hot Encoding", "Standard Scaling", "Label Encoding", "Regularization"], a: "One-Hot Encoding" }
      ]
    },
    node_10: {
      badge: "Deep Learning Wizard Badge 🔮",
      hint: "Unlock Deep Network Hints ⚡",
      questions: [
        { q: "What is the basic node of a neural network?", o: ["Perceptron", "Synapse", "Kernel", "Vector"], a: "Perceptron" },
        { q: "What does the activation function introduce?", o: ["Non-linearity", "Linear scaling", "Weight normalization", "Dimensionality reduction"], a: "Non-linearity" },
        { q: "Which activation function outputs max(0, x)?", o: ["ReLU", "Sigmoid", "Tanh", "Softmax"], a: "ReLU" },
        { q: "What algorithm calculates loss slopes to adjust weights?", o: ["Gradient Descent", "Backpropagation", "Feedforward", "PCA"], a: "Gradient Descent" },
        { q: "Which process propagates errors backward through network layers?", o: ["Backpropagation", "Feedforward", "Regularization", "Dimensionality Reduction"], a: "Backpropagation" },
        { q: "What layer type downsamples feature map dimensions by selecting max values?", o: ["Max Pooling Layer", "Convolutional Layer", "Dense Layer", "Dropout Layer"], a: "Max Pooling Layer" },
        { q: "What layer applies sliding filters to detect spatial features?", o: ["Convolutional Layer", "Pooling Layer", "Dense Layer", "Activation Layer"], a: "Convolutional Layer" },
        { q: "Which network maintains feedback loops to process sequence data?", o: ["RNN", "CNN", "Perceptron", "Linear Net"], a: "RNN" },
        { q: "Which RNN variant uses gating to preserve long-range dependencies?", o: ["LSTM", "Simple RNN", "Dense Net", "Transformer"], a: "LSTM" },
        { q: "What parameter controls the weight adjustment step size?", o: ["Learning Rate", "Weight Decay", "Momentum", "Batch Size"], a: "Learning Rate" },
        { q: "Which activation unit is favored in output layers of multi-class classifiers?", o: ["Softmax", "ReLU", "Sigmoid", "Tanh"], a: "Softmax" },
        { q: "What issue is resolved by utilizing LSTM networks over simple RNNs?", o: ["Vanishing Gradients", "Exploding Parameters", "Slow execution", "Lack of parallelization"], a: "Vanishing Gradients" },
        { q: "What does CNN stand for?", o: ["Convolutional Neural Network", "Computer Node Network", "Classifier Node Model", "Core Neural Net"], a: "Convolutional Neural Network" },
        { q: "What is backpropagation built upon mathematically?", o: ["The chain rule of calculus", "Linear matrix projection", "Statistical correlation", "Graph search"], a: "The chain rule of calculus" },
        { q: "What does dropout regularizer do?", o: ["Randomly deactivates nodes during training", "Removes low-weight parameters forever", "Decreases the learning rate", "Trims dataset sizes"], a: "Randomly deactivates nodes during training" },
        { q: "What is the standard loss function for binary classification?", o: ["Binary Cross-Entropy", "Mean Squared Error", "Categorical Cross-Entropy", "Mean Absolute Error"], a: "Binary Cross-Entropy" },
        { q: "What represents a CNN sliding filter matrix?", o: ["Kernel", "Bias", "Logit", "Node"], a: "Kernel" },
        { q: "Which optimizer balances learning rates dynamically?", o: ["Adam", "SGD", "Linear", "Ridge"], a: "Adam" },
        { q: "What is a dense layer?", o: ["A layer where all inputs connect to all output nodes", "A layer with high pooling ratios", "A layer with sparse parameters", "A normalization block"], a: "A layer where all inputs connect to all output nodes" },
        { q: "What happens during feedforward?", o: ["Inputs propagate forward through layers to compute outputs", "Errors propagate backward", "Weights are updated", "Gradients are calculated"], a: "Inputs propagate forward through layers to compute outputs" }
      ]
    },
    node_15: {
      badge: "AI Systems Architect Badge 🚀",
      hint: "Unlock Transformer & GenAI Hints 🎁",
      questions: [
        { q: "Which architecture introduced parallel self-attention, replacing RNNs?", o: ["Transformer", "CNN", "Autoencoder", "Perceptron"], a: "Transformer" },
        { q: "What does Self-Attention map to compute context weights?", o: ["Query, Key, and Value vectors", "Weights and Biases", "Gradients and Losses", "Inputs and Targets"], a: "Query, Key, and Value vectors" },
        { q: "What practice crafts text instructions to guide LLM outputs?", o: ["Prompt Engineering", "Fine-Tuning", "Backpropagation", "PCA"], a: "Prompt Engineering" },
        { q: "What adjusts pre-trained models on target datasets?", o: ["Fine-Tuning", "One-Hot Encoding", "Standard Scaling", "Regularization"], a: "Fine-Tuning" },
        { q: "What refers to models outputting plausible-sounding but false assertions?", o: ["Hallucination", "Overfitting", "Bias", "Backpropagation"], a: "Hallucination" },
        { q: "Which model generates images by removing noise progressively?", o: ["Diffusion Model", "LSTM", "CNN", "RNN"], a: "Diffusion Model" },
        { q: "What is dataset bias?", o: ["Imbalanced data distribution affecting predictions", "Excessive parameter sizing", "Exploding gradients", "Slow compile times"], a: "Imbalanced data distribution affecting predictions" },
        { q: "What XAI method explain model decisions?", o: ["SHAP", "SGD", "PCA", "Adam"], a: "SHAP" },
        { q: "What does the decoder part of transformers generate?", o: ["Subsequent token probabilities", "Input feature scaling", "Adjacency maps", "Loss gradients"], a: "Subsequent token probabilities" },
        { q: "What regularization technique penalizes large weight magnitudes?", o: ["L1/L2 Regularization", "One-Hot Encoding", "Standard Scaling", "Dropout"], a: "L1/L2 Regularization" },
        { q: "What prevents transformer models from losing token order information?", o: ["Positional Encodings", "Self-Attention", "Activation Functions", "Dropout"], a: "Positional Encodings" },
        { q: "What represents a model that predicts categorical words sequentially?", o: ["Autoregressive LLM", "CNN Classifier", "PCA clustering", "Diffusion Model"], a: "Autoregressive LLM" },
        { q: "What is few-shot prompting?", o: ["Providing a few examples in prompts to guide outputs", "Fine-tuning on small datasets", "Training with high learning rates", "Pruning model sizes"], a: "Providing a few examples in prompts to guide outputs" },
        { q: "What does the softmax denominator in attention normalize?", o: ["The sum of exponential scalar values", "The input dimensions", "The learning rate", "The batch size"], a: "The sum of exponential scalar values" },
        { q: "Which AI model uses Generator and Discriminator nets competing?", o: ["GAN", "Transformer", "LSTM", "CNN"], a: "GAN" },
        { q: "What represents scaling inputs to a mean=0 and standard deviation=1?", o: ["Standardization", "Min-Max Normalization", "Regularization", "Quantization"], a: "Standardization" },
        { q: "What represents the target mapping error in validation phases?", o: ["Generalization Error", "Training Loss", "Optimization Gradient", "Bias Index"], a: "Generalization Error" },
        { q: "Which LLM optimization reduces parameters to 8-bit or 4-bit sizes?", o: ["Quantization", "Fine-Tuning", "Distillation", "Prompt Engineering"], a: "Quantization" },
        { q: "What AI safety concept ensures models align with human values?", o: ["Alignment", "Quantization", "Regularization", "Backpropagation"], a: "Alignment" },
        { q: "Which transformer block connects self-attention outputs to normalizations?", o: ["Layer Normalization & Residual connections", "Pooling Layers", "Activation Functions", "Optimizer block"], a: "Layer Normalization & Residual connections" }
      ]
    }
  },
  finalQuestions: [
    { q: "Which activation function resolves vanishing gradient issues by outputting max(0, x)?", o: ["Sigmoid", "ReLU", "Tanh", "Softmax"], a: "ReLU" },
    { q: "Which vectors are calculated to compute relationship weights in Self-Attention?", o: ["Query, Key, and Value vectors", "Weight and Bias scalars", "Gradient and Loss vectors", "Input and Target vectors"], a: "Query, Key, and Value vectors" },
    { q: "Which task predicts continuous numerical target values?", o: ["Regression", "Classification", "Clustering", "Association"], a: "Regression" },
    { q: "What metric is the harmonic mean of precision and recall?", o: ["F1-Score", "Accuracy", "ROC-AUC", "Mean Squared Error"], a: "F1-Score" },
    { q: "What projects data to orthogonal components of high variance?", o: ["PCA", "KNN", "Gradient Descent", "Linear Regression"], a: "PCA" },
    { q: "What is the basic node of a neural network?", o: ["Perceptron", "Synapse", "Kernel", "Vector"], a: "Perceptron" },
    { q: "Which process propagates errors backward through network layers?", o: ["Backpropagation", "Feedforward", "Regularization", "Dimensionality Reduction"], a: "Backpropagation" },
    { q: "What layer type downsamples feature map dimensions by selecting max values?", o: ["Max Pooling Layer", "Convolutional Layer", "Dense Layer", "Dropout Layer"], a: "Max Pooling Layer" },
    { q: "Which RNN variant uses gating to preserve long-range dependencies?", o: ["LSTM", "Simple RNN", "Dense Net", "Transformer"], a: "LSTM" },
    { q: "What practice crafts text instructions to guide LLM outputs?", o: ["Prompt Engineering", "Fine-Tuning", "Backpropagation", "PCA"], a: "Prompt Engineering" },
    { q: "What refers to models outputting plausible-sounding but false assertions?", o: ["Hallucination", "Overfitting", "Bias", "Backpropagation"], a: "Hallucination" },
    { q: "Which issue occurs when models memorize training noise and perform poorly on validation data?", o: ["Underfitting", "Overfitting", "Gradient Descent", "One-Hot Encoding"], a: "Overfitting" },
    { q: "What maps model outputs to probabilities between 0 and 1?", o: ["Sigmoid", "ReLU", "Tanh", "Linear"], a: "Sigmoid" },
    { q: "What algorithm calculates loss slopes to adjust weights?", o: ["Gradient Descent", "Backpropagation", "Feedforward", "PCA"], a: "Gradient Descent" },
    { q: "Which architecture introduced parallel self-attention, replacing RNNs?", o: ["Transformer", "CNN", "Autoencoder", "Perceptron"], a: "Transformer" }
  ]
};

// =============================================================
// 4. CYBER SECURITY CURRICULUM
// =============================================================
export const SECURITY_CURRICULUM: CourseCurriculum = {
  subtitles: [
    "Security Basics CIA", "Ports & Firewalls", "Crypto & Hashes", "Auth & MFA & JWT", "Checkpoint 1",
    "Web Vulns XSS CORS", "SQL Injections CSRF", "Defensive SIEM Logs", "Malware & Overflow", "Checkpoint 2",
    "Penetration Tests", "IAM Access Controls", "Cloud Security VPC", "Secure Coding Input", "Checkpoint 3",
    "Final Assessment"
  ],
  descriptions: [
    "Learn Confidentiality, Integrity, and Availability principles.",
    "Master IP addressing, port allocations, firewalls, and routing.",
    "Compare symmetric and asymmetric cryptos, hashes, and salts.",
    "Configure session states, multi-factor logins, tokens, and OAuth.",
    "Covers Security Phase 1. 20 Questions. Passing score: 50%.",
    "Understand Cross-Site Scripting, SameSite constraints, and CORS headers.",
    "Mitigate database injection scripts, CSRF attacks, and flags.",
    "Audit syslog files, intrusion alerts, and incident responses.",
    "Analyze trojans, worms, ransomware, and memory overflows.",
    "Covers Security Phase 2. 20 Questions. Passing score: 50%.",
    "Perform reconnaissance scanning, vulnerability mapping, and exploits.",
    "Configure role group policies and principle of least privilege.",
    "Secure cloud networks, VPC bounds, and bucket policies.",
    "Validate inputs, sanitize markup tags, and configure rate limiters.",
    "Covers Security Phase 3. 20 Questions. Passing score: 50%.",
    "Comprehensive Cyber Security final check (timed)."
  ],
  lessons: {
    node_1: {
      slides: [
        "Welcome to Cyber Security! Security safeguards data assets, networks, and system nodes from unauthorized breaches.",
        "The CIA Triad represents the pillars of security: Confidentiality, Integrity, and Availability.",
        "Confidentiality ensures only authorized entities read sensitive data (achieved via encryption).",
        "Integrity guarantees that data has not been modified or corrupted in transit (achieved via hashing/signatures).",
        "Availability ensures authorized users have continuous access to systems and information (mitigating DDoS attacks)."
      ],
      question: "Which pillar of the CIA Triad guarantees that information remains unaltered during transfer?",
      options: ["Confidentiality", "Integrity", "Availability", "Authentication"],
      correct: "Integrity",
      explanation: "Integrity ensures data remains accurate and complete, free from unauthorized modifications."
    },
    node_2: {
      slides: [
        "Networks connect nodes. Port numbers delegate traffic (e.g. HTTP on port 80, HTTPS on port 443, SSH on port 22).",
        "Firewalls inspect incoming and outgoing packets, blocking traffic based on configured security rule parameters.",
        "Stateless firewalls check individual packets. Stateful firewalls track active session connection states.",
        "IP addresses route packets across routers. Subnetting isolates network zones to restrict lateral movements.",
        "Intrusion Detection Systems (IDS) monitor network logs for malicious traffic signatures."
      ],
      question: "Which default port number is reserved for encrypted SSH secure shell connections?",
      options: ["21", "22", "80", "443"],
      correct: "22",
      explanation: "Port 22 is the standard port reserved for SSH remote logins and file transfers."
    },
    node_3: {
      slides: [
        "Cryptography secures text. Symmetric encryption uses a single key to both encrypt and decrypt data (e.g. AES).",
        "Asymmetric encryption uses key pairs: public keys encrypt data, while private keys decrypt it (e.g. RSA).",
        "Hashing functions convert arbitrary text input to fixed-size strings. It is a one-way mathematical function (e.g. SHA-256).",
        "Salting appends unique random strings to passwords before hashing to mitigate pre-computed rainbow table attacks.",
        "Digital signatures bind public keys to identities, verifying that payloads originate from authentic sources."
      ],
      question: "Which cryptographic approach utilizes a public key to encrypt and a private key to decrypt?",
      options: ["Symmetric Encryption", "Asymmetric Encryption", "Hashing", "Salting"],
      correct: "Asymmetric Encryption",
      explanation: "As asymmetric cryptography uses two distinct mathematically-linked keys, the public key encrypts and the private key decrypts."
    },
    node_4: {
      slides: [
        "Authentication validates user identities. Authorization defines what resources authenticated users are allowed to access.",
        "Multi-Factor Authentication (MFA) requires multiple categories: something you know, have, or are.",
        "JSON Web Tokens (JWT) store user session data as base64-encoded payloads, signed with cryptographically secure keys.",
        "OAuth 2.0 is an authorization protocol delegation standard, allowing third-party access tokens without sharing passwords.",
        "Session hijackings capture cookie headers to impersonate authenticated browser users."
      ],
      question: "What does JWT stand for in session token management?",
      options: ["JSON Web Token", "Java Wire Transfer", "Joint Web Technology", "JSON Web Transmission"],
      correct: "JSON Web Token",
      explanation: "JWT stands for JSON Web Token, which is used for transferring compact, signed session payloads."
    },
    node_6: {
      slides: [
        "Web applications are common targets. Cross-Site Scripting (XSS) injects malicious scripts into trusted websites.",
        "Stored XSS saves scripts in databases, executing them when other users load affected pages.",
        "Reflected XSS bounces scripts off server responses (e.g. via malicious links), targeting single clicks.",
        "SameSite cookie flags (Strict, Lax, None) restrict browsers from attaching cookies to cross-site requests.",
        "Cross-Origin Resource Sharing (CORS) is a browser header mechanism that restricts resource loads from foreign domains."
      ],
      question: "Which flag prevents client-side scripts from reading session cookies, mitigating XSS cookie theft?",
      options: ["Secure", "HttpOnly", "SameSite", "Domain"],
      correct: "HttpOnly",
      explanation: "The HttpOnly flag blocks JavaScript access to cookies, preventing document.cookie theft."
    },
    node_7: {
      slides: [
        "SQL Injection (SQLi) occurs when untrusted input is concatenated directly into database queries.",
        "Attackers exploit SQLi to bypass logins, read private database tables, or execute administrative commands.",
        "Prevent SQLi by using Parameterized Queries (Prepared Statements) instead of concatenating strings.",
        "Cross-Site Request Forgery (CSRF) tricks authenticated browsers into executing unauthorized commands on target sites.",
        "Protect against CSRF by requiring unique CSRF tokens in forms to validate requests."
      ],
      question: "What is the most effective approach to completely prevent SQL Injection vulnerabilities?",
      options: [
        "Encrypting the database",
        "Using Parameterized Queries (Prepared Statements)",
        "Filtering out single quote characters using regex",
        "Disabling database updates"
      ],
      correct: "Using Parameterized Queries (Prepared Statements)",
      explanation: "Prepared statements treat inputs strictly as parameters rather than executable SQL commands."
    },
    node_8: {
      slides: [
        "Defensive operations rely on log audits. System logs record element triggers across servers and networks.",
        "Security Information and Event Management (SIEM) tools collect and analyze log telemetry from across enterprise systems.",
        "SIEM tools trigger real-time alerts when they correlate log patterns matching known threat indicators.",
        "Intrusion Prevention Systems (IPS) block malicious packets automatically, unlike IDS which only logs alerts.",
        "Incident Response procedures guide actions during breaches: Contain, Eradicate, and Recover."
      ],
      question: "Which defensive tool correlates and analyzes system log data from across the enterprise in real-time?",
      options: ["SIEM", "IDS", "Firewall", "VPC"],
      correct: "SIEM",
      explanation: "SIEM (Security Information and Event Management) aggregates and audits log data to detect anomalies."
    },
    node_9: {
      slides: [
        "Malware describes software designed to damage or exploit systems: trojans, worms, and ransomware.",
        "Worms spread automatically across networks, while Trojans impersonate benign files to trick users.",
        "Ransomware encrypts user databases, demanding cryptocurrency payments to release keys.",
        "Buffer Overflow occurs when programs write data past buffer boundaries, corrupting adjacent stack memory.",
        "Attackers exploit overflows to hijack instruction pointers, executing injected machine code commands."
      ],
      question: "What type of malware spreads automatically across networks without requiring user interaction?",
      options: ["Trojan", "Worm", "Ransomware", "Spyware"],
      correct: "Worm",
      explanation: "Worms replicate and spread across networks independently by exploiting security vulnerabilities."
    },
    node_11: {
      slides: [
        "Penetration testing simulates attacks to discover vulnerabilities before malicious actors exploit them.",
        "Penetration testing phases include Reconnaissance, Scanning, Gaining Access, Maintaining Access, and Reporting.",
        "Port scanning (e.g. using Nmap) maps active hosts and identify running services and version numbers.",
        "Vulnerability scanners automate checking systems against databases of known vulnerabilities (CVEs).",
        "Metasploit is a popular framework containing pre-written exploit modules targeting CVE records."
      ],
      question: "What is the primary function of scanning tools like Nmap during penetration tests?",
      options: [
        "To encrypt network traffic",
        "To discover active hosts, open ports, and running services",
        "To inject SQL commands",
        "To back up server databases"
      ],
      correct: "To discover active hosts, open ports, and running services",
      explanation: "Nmap scans IP address lists to map active ports, protocols, and version details."
    },
    node_12: {
      slides: [
        "Identity and Access Management (IAM) controls user accounts, credentials, and permissions.",
        "The Principle of Least Privilege mandates that users receive only the minimum permissions necessary to complete tasks.",
        "Role-Based Access Control (RBAC) assigns permissions to roles rather than individual accounts.",
        "Privileged Access Management (PAM) secures administrative accounts that have high level rights.",
        "Auditing user permissions regularly ensures account privileges align with active responsibilities."
      ],
      question: "Which security principle limits user account privileges to the bare minimum necessary for their job duties?",
      options: [
        "Principle of Least Privilege",
        "Separation of Duties",
        "Defense in Depth",
        "CIA Triad"
      ],
      correct: "Principle of Least Privilege",
      explanation: "The Principle of Least Privilege limits access, which helps contain potential breach damage."
    },
    node_13: {
      slides: [
        "Cloud computing introduces shared responsibility: providers secure infrastructure, clients secure data and apps.",
        "Virtual Private Clouds (VPCs) isolate cloud network groups, controlling access via Security Groups.",
        "Cloud Access Security Brokers (CASBs) enforce security policies between cloud consumers and providers.",
        "Misconfigured cloud storage buckets are common sources of public data leaks.",
        "Encrypt cloud storage data both at rest and in transit to prevent unauthorized reads."
      ],
      question: "In cloud computing security paradigms, who holds responsibility for configuring database access permissions?",
      options: ["The Cloud Infrastructure Provider", "The Client Organization", "Both equally", "Internet Service Providers"],
      correct: "The Client Organization",
      explanation: "Under the Shared Responsibility Model, client organizations are responsible for securing their own data and configs."
    },
    node_14: {
      slides: [
        "Secure Coding practices block vulnerabilities during the software development lifecycle (SDLC).",
        "Always validate inputs. Treat all incoming client requests as untrusted payloads.",
        "Sanitize input text to neutralize HTML markup tags, preventing XSS injections.",
        "Configure Rate Limiters on API endpoints to mitigate brute force logins and DDoS resource exhausts.",
        "Secure error handling keeps detailed system debug stack traces hidden from end users."
      ],
      question: "Why should detailed system error stack traces be hidden from end-user display interfaces?",
      options: [
        "To prevent exposing internal path directories and software versions to potential attackers",
        "To speed up browser loads",
        "To comply with HTML5 specifications",
        "To compress network response headers"
      ],
      correct: "To prevent exposing internal path directories and software versions to potential attackers",
      explanation: "Detailed error logs reveal internal system designs, which attackers can exploit to craft targeted attacks."
    }
  },
  checkpoints: {
    node_5: {
      badge: "Security Defender Badge 🛡️",
      hint: "Unlock Security Core Hints 💡",
      questions: [
        { q: "What does the 'I' in the CIA Triad stand for?", o: ["Integrity", "Information", "Identity", "Intrusion"], a: "Integrity" },
        { q: "Which port does secure HTTPS communication standardly use?", o: ["443", "80", "22", "8080"], a: "443" },
        { q: "What makes data unreadable to unauthorized entities?", o: ["Encryption", "Hashing", "Salting", "Subnetting"], a: "Encryption" },
        { q: "What is a one-way mathematical function mapping inputs to fixed strings?", o: ["Hashing", "Symmetric key", "Salting", "Subnetting"], a: "Hashing" },
        { q: "What protects hashed passwords from rainbow table exploits?", o: ["Salting", "Encryption", "Firewalls", "Subnetting"], a: "Salting" },
        { q: "Which protocol allows token delegation without sharing passwords?", o: ["OAuth 2.0", "JWT", "HTTPS", "SSH"], a: "OAuth 2.0" },
        { q: "Which port does plain HTTP web traffic use?", o: ["80", "443", "21", "25"], a: "80" },
        { q: "What firewall type tracks active session connection states?", o: ["Stateful Firewall", "Stateless Firewall", "Packet Filter", "IDS"], a: "Stateful Firewall" },
        { q: "Which layer of the CIA Triad is protected by mitigating DDoS attacks?", o: ["Availability", "Confidentiality", "Integrity", "Authentication"], a: "Availability" },
        { q: "What does asymmetric cryptography utilize?", o: ["A public and private key pair", "A single shared key", "A hash salt", "An API token"], a: "A public and private key pair" },
        { q: "Which algorithm family does AES belong to?", o: ["Symmetric Encryption", "Asymmetric Encryption", "Hashing", "Salting"], a: "Symmetric Encryption" },
        { q: "Which algorithm family does RSA belong to?", o: ["Asymmetric Encryption", "Symmetric Encryption", "Hashing", "Salting"], a: "Asymmetric Encryption" },
        { q: "What specifies port and IP block parameters to restrict server traffic?", o: ["Firewall Rules", "CORS Headers", "JWT payloads", "IDS alerts"], a: "Firewall Rules" },
        { q: "What does MFA require?", o: ["Multiple factors: know, have, are", "Double passwords", "SMS pins only", "Biometrics only"], a: "Multiple factors: know, have, are" },
        { q: "What does authorization define?", o: ["Allowed resource actions", "User identity validation", "Key conversions", "Port mappings"], a: "Allowed resource actions" },
        { q: "What does authentication define?", o: ["User identity validation", "Allowed resource actions", "Log auditing", "Subnet blocks"], a: "User identity validation" },
        { q: "What does SSH stand for?", o: ["Secure Shell", "Signal Shield Header", "System Sync Host", "Simple Security Handler"], a: "Secure Shell" },
        { q: "Which encryption type is faster and ideal for bulk file transfers?", o: ["Symmetric", "Asymmetric", "Hashing", "Salting"], a: "Symmetric" },
        { q: "What isolates cloud network groups to restrict lateral movement?", o: ["Subnetting", "Salting", "Hashing", "MFA"], a: "Subnetting" },
        { q: "What is digital signature used to verify?", o: ["Payload origin authenticity and integrity", "Encryption key sizes", "Connection ports", "Server memory availability"], a: "Payload origin authenticity and integrity" }
      ]
    },
    node_10: {
      badge: "Web Security Master Badge 🔮",
      hint: "Unlock Web Vulnerabilities Hints ⚡",
      questions: [
        { q: "Which vulnerability occurs when scripts are injected into trusted sites?", o: ["Cross-Site Scripting (XSS)", "SQL Injection", "Buffer Overflow", "CSRF"], a: "Cross-Site Scripting (XSS)" },
        { q: "What flag prevents javascript reading session cookies?", o: ["HttpOnly", "Secure", "SameSite", "Domain"], a: "HttpOnly" },
        { q: "How do you completely prevent SQL Injections?", o: ["Using Parameterized Queries (Prepared Statements)", "Encrypting databases", "Regex filtering", "Disabling updates"], a: "Using Parameterized Queries (Prepared Statements)" },
        { q: "Which attack tricks browsers into executing unauthorized commands?", o: ["CSRF", "XSS", "SQLi", "Buffer Overflow"], a: "CSRF" },
        { q: "What cookie flag restricts cross-site cookie transmission?", o: ["SameSite", "HttpOnly", "Secure", "Path"], a: "SameSite" },
        { q: "What malware spreads automatically across networks?", o: ["Worm", "Trojan", "Ransomware", "Rootkit"], a: "Worm" },
        { q: "What malware masquerades as benign files?", o: ["Trojan", "Worm", "Ransomware", "Spyware"], a: "Trojan" },
        { q: "What occurs when programs write data past buffer boundaries, corrupting memory?", o: ["Buffer Overflow", "SQL Injection", "XSS", "CSRF"], a: "Buffer Overflow" },
        { q: "Which system correlates and analyzes log data in real-time?", o: ["SIEM", "IDS", "IPS", "VPC"], a: "SIEM" },
        { q: "What system logs traffic anomalies without blocking packets?", o: ["IDS", "IPS", "SIEM", "Firewall"], a: "IDS" },
        { q: "What system intercepts and blocks malicious packets automatically?", o: ["IPS", "IDS", "SIEM", "CORS"], a: "IPS" },
        { q: "What does XSS target?", o: ["Client-side browsers", "Server-side SQL databases", "Network port bindings", "System environment variables"], a: "Client-side browsers" },
        { q: "What does SQL Injection target?", o: ["Server-side SQL databases", "Client-side browsers", "Network ports", "Local caches"], a: "Server-side SQL databases" },
        { q: "What is ransomware?", o: ["Malware that encrypts files and demands payments", "Malware that logs keystrokes", "Malware that routes ports", "Malware that alerts SIEM"], a: "Malware that encrypts files and demands payments" },
        { q: "What does SameSite=Strict enforce?", o: ["Cookies are never sent in cross-site requests", "Cookies are only sent on GET requests", "Cookies are never sent to parent domains", "Cookies bypass HTTPS"], a: "Cookies are never sent in cross-site requests" },
        { q: "Which browser header restricts resource sharing across foreign domains?", o: ["CORS", "Authorization", "Cookie", "Host"], a: "CORS" },
        { q: "What is Stored XSS?", o: ["Script is saved in database and run for all users loading the page", "Script bounces off server parameter responses", "Script is executed inside local browser variables", "Script is stored in the cookie"], a: "Script is saved in database and run for all users loading the page" },
        { q: "How do you protect against CSRF?", o: ["Requiring unique CSRF tokens in forms", "Encrypting database parameters", "Using HttpOnly flag", "Configuring CORS"], a: "Requiring unique CSRF tokens in forms" },
        { q: "What is the memory zone standardly targeted by buffer overflows?", o: ["Stack/Heap memory", "CPU cache", "Disk registry", "VPC routing tables"], a: "Stack/Heap memory" },
        { q: "What does Incident Response containment phase target?", o: ["Isolating and limiting breach impacts", "Deleting malware files", "Restoring backups", "Patching code files"], a: "Isolating and limiting breach impacts" }
      ]
    },
    node_15: {
      badge: "Enterprise Security Architect Badge 🚀",
      hint: "Unlock Cloud & Access Control Hints 🎁",
      questions: [
        { q: "What is the scanner tool standard for mapping network ports?", o: ["Nmap", "Metasploit", "Wireshark", "Burp Suite"], a: "Nmap" },
        { q: "What is the Principle of Least Privilege?", o: ["Assigning minimal necessary account permissions", "Using MFA everywhere", "Disabling administrator access", "Restricting VPC ports"], a: "Assigning minimal necessary account permissions" },
        { q: "Under the Cloud Shared Responsibility Model, who secures the client's data?", o: ["The Client Organization", "The Cloud Provider", "Both equally", "Third party audit teams"], a: "The Client Organization" },
        { q: "What is a VPC?", o: ["Virtual Private Cloud", "Virtual Port Connection", "Verified Protocol Control", "Variable Param Card"], a: "Virtual Private Cloud" },
        { q: "What does RBAC stand for in IAM?", o: ["Role-Based Access Control", "Rule-Based Access Code", "Root-Bound Authorization Credentials", "Responsive Block Access Control"], a: "Role-Based Access Control" },
        { q: "Why should error traces be hidden from users?", o: ["To avoid exposing directory structures and software versions", "To reduce packet load", "To speed up rendering", "To comply with CSS specifications"], a: "To avoid exposing directory structures and software versions" },
        { q: "What framework contains exploit modules targeting CVE databases?", o: ["Metasploit", "Nmap", "Wireshark", "Snort"], a: "Metasploit" },
        { q: "What is PAM in security?", o: ["Privileged Access Management", "Port Access Matrix", "Primary Authentication Module", "Protocol Alignment Mapping"], a: "Privileged Access Management" },
        { q: "What is a bucket policy?", o: ["Access control rules for cloud storage containers", "CPU resource quotas", "VPC port limits", "Hashing rules"], a: "Access control rules for cloud storage containers" },
        { q: "What checks incoming client requests as untrusted payloads?", o: ["Input Validation", "CORS", "Rate Limiters", "Error Handlers"], a: "Input Validation" },
        { q: "What limits API request frequency, preventing brute force logins?", o: ["Rate Limiter", "Prepared Statements", "HttpOnly Flag", "Input Sanitizer"], a: "Rate Limiter" },
        { q: "What does input sanitization target?", o: ["Neutralizing executable HTML and script tags", "Encrypting strings", "Hashing passwords", "Splitting directories"], a: "Neutralizing executable HTML and script tags" },
        { q: "What isolates cloud network groups?", o: ["Security Groups & VPC subnets", "Bucket policies", "JWT profiles", "Rate limiters"], a: "Security Groups & VPC subnets" },
        { q: "What is CASB?", o: ["Cloud Access Security Broker", "Cloud Authorization Service Builder", "Container Access System Bound", "Cryptographic Access Security Buffer"], a: "Cloud Access Security Broker" },
        { q: "What represents a CVE?", o: ["Common Vulnerabilities and Exposures database record", "Container Virtualization Engine", "Cryptographic Variable Encryption", "Connection Verification Entry"], a: "Common Vulnerabilities and Exposures database record" },
        { q: "Which tool inspects network packets in transit?", o: ["Wireshark", "Metasploit", "Nmap", "Prepared statements"], a: "Wireshark" },
        { q: "What represents the practice of securing development processes?", o: ["Secure SDLC", "Prepared statements", "Incident response", "Subnetting"], a: "Secure SDLC" },
        { q: "What secures administrative passwords?", o: ["Privileged Access Management (PAM)", "Standard scaling", "Prepared statements", "SameSite lax"], a: "Privileged Access Management (PAM)" },
        { q: "Under the Shared Responsibility Model, who secures cloud hardware?", o: ["The Cloud Provider", "The Client Organization", "Both", "Nobody"], a: "The Cloud Provider" },
        { q: "What represents filtering SQL characters manually vs Prepared Statements?", o: ["Manual checks are highly prone to bypasses", "Manual checks are faster", "Prepared statements require cloud access", "Prepared statements disable indexes"], a: "Manual checks are highly prone to bypasses" }
      ]
    }
  },
  finalQuestions: [
    { q: "Which vulnerability occurs when scripts are injected into trusted sites?", o: ["Cross-Site Scripting (XSS)", "SQL Injection", "Buffer Overflow", "CSRF"], a: "Cross-Site Scripting (XSS)" },
    { q: "What is the most effective approach to completely prevent SQL Injection vulnerabilities?", o: ["Encrypting the database", "Using Parameterized Queries (Prepared Statements)", "Filtering out single quote characters using regex", "Disabling database updates"], a: "Using Parameterized Queries (Prepared Statements)" },
    { q: "Which port does secure HTTPS communication standardly use?", o: ["443", "80", "22", "8080"], a: "443" },
    { q: "What is the Principle of Least Privilege?", o: ["Assigning minimal necessary account permissions", "Using MFA everywhere", "Disabling administrator access", "Restricting VPC ports"], a: "Assigning minimal necessary account permissions" },
    { q: "What flag prevents javascript reading session cookies?", o: ["HttpOnly", "Secure", "SameSite", "Domain"], a: "HttpOnly" },
    { q: "What does the 'I' in the CIA Triad stand for?", o: ["Integrity", "Information", "Identity", "Intrusion"], a: "Integrity" },
    { q: "What makes data unreadable to unauthorized entities?", o: ["Encryption", "Hashing", "Salting", "Subnetting"], a: "Encryption" },
    { q: "What type of malware spreads automatically across networks without requiring user interaction?", o: ["Trojan", "Worm", "Ransomware", "Spyware"], a: "Worm" },
    { q: "Which scanner tool is standard for mapping network ports?", o: ["Nmap", "Metasploit", "Wireshark", "Burp Suite"], a: "Nmap" },
    { q: "Why should error traces be hidden from users?", o: ["To avoid exposing directory structures and software versions", "To reduce packet load", "To speed up rendering", "To comply with CSS specifications"], a: "To avoid exposing directory structures and software versions" },
    { q: "What cookie flag restricts cross-site cookie transmission?", o: ["SameSite", "HttpOnly", "Secure", "Path"], a: "SameSite" },
    { q: "What system correlates and analyzes log data in real-time?", o: ["SIEM", "IDS", "IPS", "VPC"], a: "SIEM" },
    { q: "What represents a CVE?", o: ["Common Vulnerabilities and Exposures database record", "Container Virtualization Engine", "Cryptographic Variable Encryption", "Connection Verification Entry"], a: "Common Vulnerabilities and Exposures database record" },
    { q: "What limits API request frequency, preventing brute force logins?", o: ["Rate Limiter", "Prepared Statements", "HttpOnly Flag", "Input Sanitizer"], a: "Rate Limiter" },
    { q: "Under the Cloud Shared Responsibility Model, who secures the client's data?", o: ["The Client Organization", "The Cloud Provider", "Both equally", "Third party audit teams"], a: "The Client Organization" }
  ]
};

// =============================================================
// DYNAMIC SPECIFIC CONTENT TEMPLATE ENGINE
// =============================================================
interface LessonContentTemplate {
  slides: string[];
  q: string;
  o: string[];
  a: string;
  e: string;
}

// Compact structures mapping topics to high-quality specific details
const CUSTOM_COURSES_DATA: Record<string, {
  subtitles: string[];
  descriptions: string[];
  lessons: Record<string, LessonContentTemplate>;
  badge1: string;
  hint1: string;
  badge2: string;
  hint2: string;
  badge3: string;
  hint3: string;
  finalBadge: string;
  finalHint: string;
}> = {
  java: {
    badge1: "Java Coffee Cup Badge ☕",
    hint1: "Unlock JVM and OOP Foundations Hints 💡",
    badge2: "Java Collections Master 📦",
    hint2: "Unlock Java Collection and Exceptions Hints ⚡",
    badge3: "Java Concurrency Guru 🚀",
    hint3: "Unlock Java Streams, Concurrency, and Maven Hints 🎁",
    finalBadge: "🥇 Java Enterprise Architect",
    finalHint: "🎖 Graduate Certificate in Java Programming & Systems Architect!",
    subtitles: [
      "JVM & Bytecode", "Variables & Types", "Object-Oriented Basics", "Constructors & Fields", "Checkpoint 1",
      "Inheritance & Overrides", "Abstracts & Interfaces", "Collections List & Map", "Exception Handling", "Checkpoint 2",
      "Java Streams API", "Thread Concurrency", "File I/O Readers", "Maven & Build Tools", "Checkpoint 3",
      "Final Assessment"
    ],
    descriptions: [
      "Learn Bytecode compilation, JVM, and execution lifecycles.",
      "Master primitive types, local variables, and operator semantics.",
      "Build standard class blueprints and instantiate memory objects.",
      "Define class constructor methods and initialize fields.",
      "Covers Java Phase 1. 20 Questions. Passing score: 50%.",
      "Understand inheritance, extends boundaries, and method overrides.",
      "Implement abstract class signatures and interface contracts.",
      "Wield ArrayLists, HashMaps, and collection iteration loops.",
      "Catch runtime errors, handle exceptions, and clean up with finally.",
      "Covers Java Phase 2. 20 Questions. Passing score: 50%.",
      "Filter, map, and reduce collection elements using lazy streams.",
      "Manage threads, runnable tasks, synchronized locks, and concurrency.",
      "Read and write data using file readers and buffered streams.",
      "Configure dependencies, builds, and compilation packages using Maven or Gradle.",
      "Covers Java Phase 3. 20 Questions. Passing score: 50%.",
      "Comprehensive Java timed check covering all phases."
    ],
    lessons: {
      node_1: {
        slides: [
          "Welcome to Java! Java is a compiled, write-once, run-anywhere high-level object-oriented programming language.",
          "Java code compiles into intermediate .class files containing Bytecode, rather than direct machine code instructions.",
          "The Java Virtual Machine (JVM) interprets and executes Bytecode on target client computer environments.",
          "The Java Runtime Environment (JRE) includes the JVM plus the standard class libraries required for execution.",
          "The Java Development Kit (JDK) contains JRE components plus build tools, compilers (javac), and debugger tools."
        ],
        q: "What does the Java Compiler (javac) translate source code (.java) into?",
        o: ["Machine code executable", "Bytecode (.class)", "Assembly text", "JavaScript scripts"],
        a: "Bytecode (.class)",
        e: "Javac compiles source code into Bytecode files (.class) which are interpreted by the JVM."
      },
      node_2: {
        slides: [
          "Java is statically typed. Every variable must have a declared type before compiled executions.",
          "Java primitive types store raw values directly in stack memory: int, double, float, char, boolean, byte, short, long.",
          "Reference types (objects, arrays) store memory addresses pointing to objects allocated in heap memory blocks.",
          "Integers default to type 'int' (32-bit), while decimals default to type 'double' (64-bit floating point).",
          "Type casting converts values: widening cast is automatic, narrowing cast requires manual syntax: (int) myDouble."
        ],
        q: "Which of the following is a primitive data type that stores a single character in Java?",
        o: ["String", "char", "Character", "byte"],
        a: "char",
        e: "'char' is a primitive type storing 16-bit Unicode characters, whereas 'String' is an object class."
      },
      node_3: {
        slides: [
          "Java is strictly object-oriented. Classes define properties (fields) and behaviors (methods) of objects.",
          "Create object instances from class blueprints using the 'new' keyword keyword: Dog d = new Dog();.",
          "Access modifiers control visibility: public (anywhere), private (class only), protected (package/subclass), default (package only).",
          "Instance variables represent object state parameters, with unique values allocated for each object instance.",
          "Static variables (declared with the 'static' modifier) are shared across all instances of a class."
        ],
        q: "Which access modifier restricts field readability strictly to the parent class definition itself?",
        o: ["public", "private", "protected", "default"],
        a: "private",
        e: "'private' fields are invisible outside the declaring class scope to enforce encapsulation guidelines."
      },
      node_4: {
        slides: [
          "Constructors are special methods called during object instantiation to initialize object fields.",
          "Java constructors have the exact same name as the parent class and define zero return types.",
          "If no constructor is declared, the compiler automatically inserts a default zero-argument constructor.",
          "Constructor overloading allows a class to define multiple constructors with differing parameter lists.",
          "Use the 'this' keyword to refer to the current instance, commonly resolving parameter name shadowing."
        ],
        q: "What defines a constructor's return type in a Java class blueprint?",
        o: ["void", "The class type", "It has no return type", "int"],
        a: "It has no return type",
        e: "Constructors do not declare any return type, not even void. They initialize the object being allocated."
      },
      node_6: {
        slides: [
          "Inheritance enables a subclass to inherit fields and methods of a parent class using the 'extends' keyword.",
          "Java supports single inheritance only; a class cannot extend multiple classes concurrently.",
          "Method overriding allows a subclass to provide a specific implementation of a method declared in its superclass.",
          "Use the '@Override' annotation to instruct compilers to verify that overrides match parent signatures.",
          "Invoke parent class constructor methods inside subclass constructors using super() as the very first line."
        ],
        q: "Which keyword does a subclass utilize to inherit attributes and methods of a parent class in Java?",
        o: ["implements", "extends", "inherits", "super"],
        a: "extends",
        e: "Subclasses extend parent classes using 'extends'. 'implements' is reserved for interface mappings."
      },
      node_7: {
        slides: [
          "Interfaces define abstract contracts outlining method signatures that implementing classes must define.",
          "Declare class implementations using the 'implements' keyword. A class can implement multiple interfaces.",
          "Abstract classes (declared with 'abstract') cannot be instantiated and can define concrete methods.",
          "Java 8+ interfaces can define concrete behaviors using 'default' or 'static' method modifiers.",
          "Interface fields are implicitly public, static, and final constants, requiring immediate values."
        ],
        q: "Can a Java class implement multiple interfaces concurrently?",
        o: ["Yes, using commas", "No, Java restricts it", "Only if they are abstract", "Only one interface is allowed"],
        a: "Yes, using commas",
        e: "While Java restricts class inheritance to single superclasses, classes can implement multiple interfaces."
      },
      node_8: {
        slides: [
          "The Java Collections Framework organizes groups of objects. Core interfaces include List, Set, and Map.",
          "ArrayList implements mutable, indexable arrays that resize dynamically as elements are inserted.",
          "HashSet stores unique elements, using hash algorithms to filter out duplicates automatically.",
          "HashMap stores key-value pairs, mapping unique keys to target object value references.",
          "Iterate collections using enhanced for-each loops or Iterator objects to process elements."
        ],
        q: "Which collections structure is most appropriate for storing unique elements without duplicates?",
        o: ["ArrayList", "LinkedList", "HashSet", "HashMap"],
        a: "HashSet",
        e: "HashSet implements the Set interface, which blocks duplicate entries by hashing values."
      },
      node_9: {
        slides: [
          "Exceptions signal runtime disruptions. Throwing exceptions halts code flow, propagating error logs up the call stack.",
          "Handle exceptions using try-catch blocks: catch targets matching exception classes specifically.",
          "Checked exceptions must be declared in method signatures (throws) or caught; unchecked exceptions do not.",
          "The 'finally' block defines cleanup statements that execute regardless of whether exceptions occur.",
          "Unchecked runtime exceptions extend RuntimeException, representing programming bugs like NullPointerException."
        ],
        q: "Which block guarantees execution for closing resources at the end of exception handlers?",
        o: ["try", "catch", "finally", "throws"],
        a: "finally",
        e: "The finally block always runs after try-catch statements, serving as the standard location to close resources."
      },
      node_11: {
        slides: [
          "Java 8 Streams API processes collections of objects declaratively using pipeline operations.",
          "Streams do not store data; they filter, map, and reduce source elements dynamically.",
          "Intermediate operations (filter, map) are lazy and return new streams, skipping executions until terminal checks.",
          "Terminal operations (forEach, collect, reduce) execute the pipeline, producing results or side effects.",
          "Filter stream elements using Predicate functions: stream.filter(x -> x > 10).collect(Collectors.toList())."
        ],
        q: "What describes intermediate operations like filter() or map() inside Java Stream pipelines?",
        o: ["They execute immediately", "They are lazy and return a new Stream", "They terminate the stream", "They modify source lists"],
        a: "They are lazy and return a new Stream",
        e: "Intermediate stream pipeline links are lazy, postponing execution until a terminal operation is called."
      },
      node_12: {
        slides: [
          "Concurrency executes multiple threads concurrently. Threads are lightweight execution units inside OS processes.",
          "Create threads by extending the Thread class or implementing the Runnable interface.",
          "The 'synchronized' keyword locks blocks/methods to prevent multiple threads from accessing shared variables concurrently.",
          "Thread deadlocks occur when threads block each other indefinitely, waiting for locked resource releases.",
          "Concurrency utilities (ExecutorService, ThreadPools) manage worker thread pools to optimize application throughput."
        ],
        q: "Which Java keyword is standard for locking methods to protect shared state from concurrency collisions?",
        o: ["volatile", "synchronized", "transient", "locked"],
        a: "synchronized",
        e: "The 'synchronized' keyword coordinates access, allowing only one thread to execute locked methods."
      },
      node_13: {
        slides: [
          "Java File I/O manages reading and writing data bytes to local filesystem descriptors.",
          "File streams (FileInputStream/FileOutputStream) read and write raw bytes to target files.",
          "Character streams (FileReader/FileWriter) process text characters, handling character encoding maps.",
          "Buffered streams wrap raw streams in memory buffers to minimize slow system calls.",
          "Java 7 Try-with-Resources automatically closes open streams and file descriptors on completion."
        ],
        q: "What is the primary benefit of wrapping raw file streams inside BufferedReader blocks?",
        o: ["Encrypts text", "Optimizes performance by grouping I/O operations in memory buffers", "Validates syntax", "Prevents duplicate reads"],
        a: "Optimizes performance by grouping I/O operations in memory buffers",
        e: "Buffers group read cycles, reducing expensive hardware calls and optimizing performance."
      },
      node_14: {
        slides: [
          "Build tools automate compilation, dependency management, testing, and deployment pipelines.",
          "Maven uses Project Object Model files (pom.xml) containing project declarations and dependencies.",
          "Gradle uses build.gradle files, compiling builds using Groovy or Kotlin script parameters.",
          "Build tools query remote repositories (like Maven Central) to download package files automatically.",
          "Build outputs (JAR/WAR archives) package compiled classes and resources for execution."
        ],
        q: "Which XML configuration file is standard for declaring Maven dependency listings?",
        o: ["build.gradle", "pom.xml", "package.json", "maven.config"],
        a: "pom.xml",
        e: "Maven coordinates build dependencies and plug-ins inside Project Object Model (pom.xml) files."
      }
    }
  },
  c: {
    badge1: "C Compiler Badge 🛡️",
    hint1: "Unlock Pointer and Memory Layout Hints 💡",
    badge2: "C Pointer Master 🔮",
    hint2: "Unlock Pointer Arithmetic and Dynamic Memory Hints ⚡",
    badge3: "C System Architect 🚀",
    hint3: "Unlock Structs, Valgrind, and Bitwise Masking Hints 🎁",
    finalBadge: "🥇 C Kernels Engineer",
    finalHint: "🎖 Graduate Certificate in C & Embedded Systems Champion Title!",
    subtitles: [
      "GCC Compilation", "Memory Data Sizes", "Pointers & Addresses", "Pointer Arithmetics", "Checkpoint 1",
      "Functions Value/Ref", "Heap Alloc malloc", "Structs & Unions", "File Descriptors", "Checkpoint 2",
      "Macros Preprocessors", "Valgrind Memory Leak", "Argc/Argv Command", "Bitwise Masking", "Checkpoint 3",
      "Final Assessment"
    ],
    descriptions: [
      "Compile C scripts using gcc, check binaries, and study compile flow.",
      "Understand memory sizes, signed vs unsigned, and static declarations.",
      "Master address-of (&) and dereference (*) pointer operators.",
      "Navigate array indexes and direct memory offsets.",
      "Covers C Phase 1. 20 Questions. Passing score: 50%.",
      "Build modular functions, value copying, and reference parameters.",
      "Allocate heap blocks with malloc/calloc and release them with free.",
      "Bundle variables in structs and share memory blocks with unions.",
      "Open, write, read, and close files using standard streams.",
      "Covers C Phase 2. 20 Questions. Passing score: 50%.",
      "Define preprocessor macros, headers, and conditional compiles.",
      "Find memory leaks, invalid writes, and overflow bugs with Valgrind.",
      "Parse command line arguments passing into main.",
      "Wield bitwise shifting, masking, and binary operations.",
      "Covers C Phase 3. 20 Questions. Passing score: 50%.",
      "Comprehensive C programming check covering all phases."
    ],
    lessons: {
      node_1: {
        slides: [
          "Welcome to C! C is a statically typed, procedural, high-performance programming language powering system architectures.",
          "C code compiles directly to native machine code instructions using compilers like GCC or Clang.",
          "The compilation process consists of four phases: Preprocessing, Compilation, Assembly, and Linking.",
          "Preprocessing processes directives (starting with #), compilation generates assembly code, and assembly makes object files.",
          "Linking combines object files and library references to produce the final executable binary."
        ],
        q: "Which C compilation phase resolves header files (#include) and macro definitions?",
        o: ["Compilation", "Linking", "Preprocessing", "Assembly"],
        a: "Preprocessing",
        e: "The preprocessor resolves all '#include' and '#define' declarations before compilation."
      },
      node_2: {
        slides: [
          "C requires declaring precise data types for variables to control stack memory allocation.",
          "Data sizes are platform-dependent: standard char occupies 8 bits, and int occupies 16 or 32 bits.",
          "Use the 'sizeof' operator to calculate the exact byte size of types or variables at compile time.",
          "Modifiers change data ranges: 'signed' allows negative numbers, 'unsigned' restricts values to positive numbers.",
          "Declaring variables with 'static' inside functions preserves their value across multiple invocations."
        ],
        q: "Which operator determines the exact memory footprint of a data type in bytes?",
        o: ["sizeof", "malloc", "free", "alignof"],
        a: "sizeof",
        e: "'sizeof' determines the byte footprint of variables or type arguments at compile time."
      },
      node_3: {
        slides: [
          "Pointers are variables that store the memory address of another variable: int *p = &x;.",
          "The address-of operator (&) extracts the memory address location where a variable is stored.",
          "The dereference operator (*) accesses the value stored at the memory address pointer target.",
          "Declaring pointers: 'int *p' represents a pointer pointing to memory blocks containing integer data.",
          "Null pointers contain address 0, signaling they do not point to any valid memory location."
        ],
        q: "Which operator extracts the hexadecimal memory address location of a standard C variable?",
        o: ["*", "&", "->", "sizeof"],
        a: "&",
        e: "The '&' operator retrieves the memory address of variables. '*' dereferences pointers."
      },
      node_4: {
        slides: [
          "Arrays are contiguous blocks of memory of fixed size. Array names represent pointers to their first element.",
          "Pointer arithmetic adjusts memory addresses based on type size: 'p + 1' increments by sizeof(*p) bytes.",
          "Access array element idx using pointer offsets: '*(arr + idx)' is syntactically identical to 'arr[idx]'.",
          "Subtracting two pointers pointing within the same array calculates the distance in element counts.",
          "Array boundary checks do not exist in C. Out-of-bounds access corrupts memory silently (segmentation faults)."
        ],
        q: "If 'p' points to an integer array, what offset address is calculated by 'p + 2'?",
        o: ["2 bytes forward", "2 bits forward", "2 integer size widths forward", "Nothing, it throws an error"],
        a: "2 integer size widths forward",
        e: "Pointer arithmetic multiplies offsets by the size of the targeted type: 2 * sizeof(int) bytes."
      },
      node_6: {
        slides: [
          "C passes function arguments by value, copying parameter values into local variables on invocation.",
          "To modify caller variables inside functions, pass pointer addresses as arguments (pass-by-reference).",
          "C functions return a single value or declare 'void' if they return no values on termination.",
          "Recursion occurs when functions call themselves, allocating a new stack frame for each call.",
          "Function prototypes declare signatures (arguments and return types) before main, guiding compilers."
        ],
        q: "How do you enable a C function to modify variables declared in its parent caller block?",
        o: ["Declare them static", "Pass variable pointer addresses", "Return multiple variables", "Use recursion"],
        a: "Pass variable pointer addresses",
        e: "Passing pointers enables functions to modify the original variables via dereferencing."
      },
      node_7: {
        slides: [
          "Dynamic memory allocates storage blocks dynamically on the heap at runtime.",
          "The 'malloc(size)' function allocates specified bytes, returning void pointers to uninitialized blocks.",
          "The 'calloc(count, size)' function allocates memory and initializes all bits in the block to zero.",
          "Always release dynamically allocated heap memory blocks on completion using the 'free(pointer)' function.",
          "Failing to call free() causes memory leaks, depleting available RAM resources over time."
        ],
        q: "Which allocator allocates dynamic heap memory and initializes all allocated bits to zero?",
        o: ["malloc()", "calloc()", "realloc()", "free()"],
        a: "calloc()",
        e: "Unlike malloc(), calloc() zeroes out the allocated memory blocks, preventing garbage values."
      },
      node_8: {
        slides: [
          "Structures (struct) bundle variables of differing data types together under a single custom type name.",
          "Access struct member attributes using dot syntax (s.attribute) or arrow syntax (p->attribute) for pointers.",
          "Struct members are aligned in memory. The compiler inserts padding bytes to align elements on word bounds.",
          "Unions share a single memory block across all members; only one union member can be active at a time.",
          "The sizeof(union) represents the memory size of its largest member, optimizing memory use."
        ],
        q: "Which arrow syntax is standard to access members of a structure through a pointer variable 'ptr'?",
        o: ["ptr.member", "ptr->member", "ptr*member", "ptr&member"],
        a: "ptr->member",
        e: "The arrow operator '->' dereferences structure pointers, accessing targeted members."
      },
      node_9: {
        slides: [
          "C operates files using file descriptors (FILE*). Use the stdio.h library for file operations.",
          "Open files using 'fopen(path, mode)'. Modes include 'r' (read), 'w' (write), and 'a' (append).",
          "Read file characters using fgetc(), or parse formatted lines using fscanf().",
          "Write to files using fputc(), fputs(), or fprintf() to serialize data streams.",
          "Always close file streams using fclose(file_pointer) to flush buffers and release OS lock holds."
        ],
        q: "Which C function opens file streams and returns file pointers?",
        o: ["fopen", "fclose", "fread", "fwrite"],
        a: "fopen",
        e: "fopen() opens files, binding them to a FILE stream descriptor for read or write operations."
      },
      node_11: {
        slides: [
          "The Preprocessor processes directives (starting with '#') ahead of compiler tokenization steps.",
          "Macros (#define) define text substitutions: '#define PI 3.1415' substitutes PI during pre-compilation.",
          "Include directives (#include) copy header file declarations directly into active translation units.",
          "Conditional directives (#ifdef, #ifndef) compile code blocks selectively, preventing double declaration errors.",
          "Header Guards ('#ifndef HEADER_H ...') enclose headers, resolving multiple inclusion errors."
        ],
        q: "What is the primary action performed by Header Guards (#ifndef) inside C header files?",
        o: ["Optimizes math calculations", "Prevents compile errors due to multiple definition exclusions", "Encrypts headers", "Allocates memory arrays"],
        a: "Prevents compile errors due to multiple definition exclusions",
        e: "Header guards ensure header file contents are compiled only once per translation unit."
      },
      node_12: {
        slides: [
          "C lacks memory safety checks. Common bugs include segmentation faults, double frees, and memory leaks.",
          "A memory leak occurs when heap memory is allocated using malloc() but never released using free().",
          "Use the Valgrind debugging tool to detect memory leaks, invalid memory access, and uninitialized reads.",
          "Valgrind output lists leak summaries, highlighting coordinates of unreleased memory allocations.",
          "Always run tests under memory-safety checkers to ensure code blocks release all descriptors."
        ],
        q: "Which command line debugging utility tracks heap memory leaks and invalid writes in C binaries?",
        o: ["GDB", "Valgrind", "GCC", "Make"],
        a: "Valgrind",
        e: "Valgrind runs binaries inside simulated environments, tracking leaks and invalid pointer offsets."
      },
      node_13: {
        slides: [
          "The main function receives command line arguments from shells using argc and argv parameters.",
          "The 'argc' variable stores the total count of arguments passed during binary execution.",
          "The 'argv' array represents an array of character strings containing argument text values.",
          "The first entry ('argv[0]') always stores the execution path or script file name.",
          "Parse strings to numbers using stdlib.h conversion functions: atoi() or strtol()."
        ],
        q: "In C main signatures, what does the first element of argv ('argv[0]') contain?",
        o: ["First user argument", "Total argument counts", "The name of the executable or script path", "Null pointer"],
        a: "The name of the executable or script path",
        e: "By convention, argv[0] contains the program's invocation name or executable path."
      },
      node_14: {
        slides: [
          "Bitwise operators manipulate integers at the binary bit level, optimizing hardware code.",
          "Operators: AND (&), OR (|), XOR (^), NOT (~), Left Shift (<<), and Right Shift (>>).",
          "Left shifting ('x << 1') shifts bits left, multiplying integers by 2. Right shifting divides by 2.",
          "Bit masking extracts specific bits: 'x & 1' extracts the least significant bit, checking if numbers are odd.",
          "Combine bit flags using bitwise OR, and check active flags using bitwise AND operations."
        ],
        q: "Which bitwise operator checks if a bit flag is active, masking other bits to zero?",
        o: ["|", "&", "^", "~"],
        a: "&",
        e: "Bitwise AND '&' checks active bits, clearing other bits to zero."
      }
    }
  },
  cpp: {
    badge1: "C++ Compiler Badge 🛡️",
    hint1: "Unlock C++ Streams and Reference Hints 💡",
    badge2: "C++ RAII Constructor 🔮",
    hint2: "Unlock RAII, Virtual Functions, and STL Containers Hints ⚡",
    badge3: "C++ Template Guru 🚀",
    hint3: "Unlock Smart Pointers, Templates, and Move Semantics Hints 🎁",
    finalBadge: "🥇 C++ Systems Architect",
    finalHint: "🎖 Graduate Certificate in C++ & Systems Architect!",
    subtitles: [
      "C++ Namespaces", "References vs Pointers", "Classes & Modifiers", "Destructor Cleanups", "Checkpoint 1",
      "RAII Design Pattern", "Inheritance & Virtuals", "STL Vector & Map", "Smart Pointers", "Checkpoint 2",
      "Exception Try-Catch", "Move Semantics", "Templates & Generics", "File fstream Streams", "Checkpoint 3",
      "Final Assessment"
    ],
    descriptions: [
      "Understand compilers, namespaces, and standard streams.",
      "Use reference bindings and pointer variables safely.",
      "Configure public/private modifiers and class access limits.",
      "Clean up heap and system resources in class destructors.",
      "Covers C++ Phase 1. 20 Questions. Passing score: 50%.",
      "Master Resource Acquisition Is Initialization design pattern.",
      "Inherit parent traits, configure overrides, and use virtual methods.",
      "Use vectors, maps, and sets from the Standard Template Library.",
      "Automate memory management using unique_ptr and shared_ptr.",
      "Covers C++ Phase 2. 20 Questions. Passing score: 50%.",
      "Throw and catch exceptions cleanly to avoid crashes.",
      "Optimize performance using rvalue references and move constructor parameters.",
      "Write generic templates and compiler-generated type-safe code.",
      "Write and read local disk files using fstream streams.",
      "Covers C++ Phase 3. 20 Questions. Passing score: 50%.",
      "Comprehensive C++ final timed check."
    ],
    lessons: {
      node_1: {
        slides: [
          "Welcome to C++! C++ is an extension of C that adds object-oriented, template-generic, and memory-safe abstractions.",
          "Namespaces group identifiers under custom prefixes, preventing name collisions (e.g. std::cout).",
          "Header 'iostream' declares standard input/output streams: 'std::cout' (output) and 'std::cin' (input).",
          "The insertion operator (<<) writes values to output streams, and the extraction operator (>>) reads inputs.",
          "C++ compiles code using compilers like g++ or clang++, optimizing performance for targeted CPU hardware."
        ],
        q: "Which C++ standard stream represents terminal console output?",
        o: ["std::cin", "std::cout", "std::cerr", "std::stream"],
        a: "std::cout",
        e: "std::cout maps to the standard output stream, printing values to the console."
      },
      node_2: {
        slides: [
          "References in C++ create aliases for existing variables: int &ref = val;.",
          "Unlike pointers, references cannot be null, must be initialized at creation, and cannot be re-bound to other variables.",
          "Passing arguments by reference ('void func(int &x)') avoids copying overhead while letting functions modify parameters.",
          "Const references ('const int &x') allow read-only access to variables without copy overhead.",
          "Pointers store addresses; references act as automatic aliases, eliminating address-of (&) and dereference (*) operators."
        ],
        q: "What is a key difference between C++ references and pointers?",
        o: [
          "Pointers cannot be null",
          "References can be re-assigned to new targets",
          "References cannot be null and must be initialized on creation",
          "References require manual dereferencing"
        ],
        a: "References cannot be null and must be initialized on creation",
        e: "References act as compile-time aliases, guaranteeing they point to valid, initialized variables."
      },
      node_3: {
        slides: [
          "C++ classes bundle data attributes and method behaviors. By default, class members are private.",
          "Access modifiers: 'private' (class members only), 'public' (anywhere), 'protected' (subclasses).",
          "Encapsulation hides internal variables behind getter/setter interfaces to maintain state consistency.",
          "C++ structures (struct) are identical to classes, except their default access modifier is public.",
          "The 'this' pointer references the active object instance address inside class method calls."
        ],
        q: "What is the default access modifier of members declared inside a C++ class?",
        o: ["public", "private", "protected", "friend"],
        a: "private",
        e: "Class members are private by default. Structure (struct) members are public by default."
      },
      node_4: {
        slides: [
          "Destructors are special methods called automatically when objects go out of scope or are deleted.",
          "Destructors are prefixed with a tilde (~) and matching class name: ~Dog() { // release memory }.",
          "Classes define a single destructor that accepts zero arguments and declares no return values.",
          "Destructors release system descriptors, close file handles, and free dynamically allocated heap memory.",
          "Failing to write destructors for resource-managing classes causes memory leaks when objects expire."
        ],
        q: "Which prefix identifies destructor methods inside C++ class definitions?",
        o: ["~", "&", "*", "virtual"],
        a: "~",
        e: "Destructors are identified by the tilde '~' character preceding the class name."
      },
      node_6: {
        slides: [
          "Resource Acquisition Is Initialization (RAII) ties resource lifetimes to local object scopes.",
          "Under RAII, object constructors acquire resources (memory, files), and destructors release them.",
          "When objects go out of scope (stack unwinding), C++ guarantees destructors execute automatically.",
          "RAII eliminates manual resource management (malloc/free) and prevents leaks even during exceptions.",
          "Smart pointers, file streams, and lock guards are standard examples of RAII in C++."
        ],
        q: "What is the primary mechanism RAII relies upon to guarantee resource releases in C++?",
        o: ["Garbage collection threads", "Automatic execution of destructors when stack variables go out of scope", "Manual memory free calls", "Virtual table deletions"],
        a: "Automatic execution of destructors when stack variables go out of scope",
        e: "C++ guarantees local stack variable destructors run on scope exit, resolving leaks."
      },
      node_7: {
        slides: [
          "Inheritance enables subclasses to extend parent classes: class Dog : public Animal { ... }.",
          "To allow subclasses to override parent methods, declare parent methods as 'virtual'.",
          "Polymorphism dynamically resolves virtual method calls at runtime using Virtual Method Tables (vtables).",
          "Pure virtual functions define signatures without implementations: virtual void speak() = 0;.",
          "Classes containing at least one pure virtual function are abstract classes and cannot be instantiated."
        ],
        q: "Which keyword tells compilers to resolve method calls dynamically at runtime, enabling overriding?",
        o: ["override", "virtual", "dynamic", "abstract"],
        a: "virtual",
        e: "Declaring methods 'virtual' forces dynamic dispatch, letting subclasses override them."
      },
      node_8: {
        slides: [
          "The Standard Template Library (STL) provides generic, optimized container classes.",
          "std::vector implements dynamic arrays that manage heap storage and grow automatically.",
          "std::map stores key-value pairs sorted by key using balanced red-black trees.",
          "std::unordered_map implements fast hash tables, providing average O(1) lookup speeds.",
          "Access and iterate container elements using iterators: vector<int>::iterator it;."
        ],
        q: "Which STL container implements dynamic arrays that scale automatically in contiguous memory?",
        o: ["std::list", "std::vector", "std::map", "std::set"],
        a: "std::vector",
        e: "std::vector implements dynamic arrays, allocating contiguous heap memory for fast access."
      },
      node_9: {
        slides: [
          "Smart pointers automate dynamic memory management, avoiding raw 'new' and 'delete' operators.",
          "std::unique_ptr represents exclusive ownership; unique pointers cannot be copied, only moved.",
          "std::shared_ptr coordinates shared ownership, maintaining reference counts of active pointers.",
          "When reference counts hit zero, shared_ptr automatically deletes the targeted heap memory.",
          "Create smart pointers using standard helper functions: std::make_unique<T>() or std::make_shared<T>()."
        ],
        q: "Which smart pointer type coordinates exclusive ownership, blocking copying of its reference?",
        o: ["std::shared_ptr", "std::weak_ptr", "std::unique_ptr", "std::auto_ptr"],
        a: "std::unique_ptr",
        e: "std::unique_ptr cannot be copied, ensuring single exclusive ownership of the underlying resource."
      },
      node_11: {
        slides: [
          "Exceptions report runtime errors. Throw errors using 'throw ExceptionClass();'.",
          "Enclose exception-prone statements inside try blocks, and handle exceptions in catch blocks.",
          "C++ standard exceptions extend std::exception, defining the virtual member 'what()' to read logs.",
          "When exceptions are thrown, stack variables are destroyed in reverse order (stack unwinding).",
          "If exceptions escape the main block without matching catch handlers, the OS aborts execution."
        ],
        q: "What runtime cleanup process automatically calls destructors of local variables when exceptions throw?",
        o: ["Garbage collection", "Stack unwinding", "Compilation linking", "Memory leaking"],
        a: "Stack unwinding",
        e: "Stack unwinding destroys all active stack objects in scope, preventing resource leaks."
      },
      node_12: {
        slides: [
          "Move semantics optimize performance by moving resource pointers instead of copying data payloads.",
          "Rvalue references (declared with &&) target temporary objects that are expiring: int &&ref = 5;.",
          "Move constructors transfer resource pointers from temporary sources to target objects.",
          "The 'std::move()' utility casts variables to rvalues, forcing move operations instead of copies.",
          "Move semantics eliminate redundant memory allocations, accelerating collections and vectors."
        ],
        q: "Which syntax declares an rvalue reference variable target in modern C++?",
        o: ["&", "*", "&&", "const &"],
        a: "&&",
        e: "Double ampersand '&&' declares rvalue references, binding to temporary variables."
      },
      node_13: {
        slides: [
          "Templates enable writing generic code that works with any data type, promoting code reuse.",
          "Function templates define logic structures: template <typename T> T max(T a, T b) { ... }.",
          "Class templates define generic class schemas, such as STL collections (e.g. std::vector<T>).",
          "Templates compile at build time; compilers instantiate specific classes for each type used.",
          "Template parameters can accept non-type values (e.g. template <int Size> class Buffer)."
        ],
        q: "When does the compiler instantiate template classes for specific type arguments?",
        o: ["At compile time", "At execution runtime", "During linking phase", "Never, it runs dynamically"],
        a: "At compile time",
        e: "C++ templates are resolved at compile time, generating type-safe code variations."
      },
      node_14: {
        slides: [
          "C++ handles file streams using the fstream library: ifstream, ofstream, and fstream.",
          "std::ifstream reads input file characters, while std::ofstream writes output files.",
          "Open files using constructors: std::ofstream file('out.txt'); or 'file.open()'.",
          "File streams close automatically when stream variables go out of scope, leveraging RAII.",
          "Check if files opened successfully using stream state methods: 'file.is_open()'."
        ],
        q: "Which C++ file stream class is most appropriate to open local files for writing?",
        o: ["std::ifstream", "std::ofstream", "std::iostream", "std::stringstream"],
        a: "std::ofstream",
        e: "std::ofstream inherits from ostream, specializing in writing outputs to disk files."
      }
    }
  },
  datascience: {
    badge1: "Data Scientist Cadet 📊",
    hint1: "Unlock Pandas and NumPy Array Hints 💡",
    badge2: "Data Analytics Master 📈",
    hint2: "Unlock EDA, Visualizations, and Hypothesis Hints ⚡",
    badge3: "Predictive Analytics Guru 🚀",
    hint3: "Unlock SQL Querying, Regressions, and Streamlit Hints 🎁",
    finalBadge: "🥇 Professional Data Scientist",
    finalHint: "🎖 Graduate Certificate in Data Science & Machine Learning Champion!",
    subtitles: [
      "Data Lifecycle", "Pandas DataFrames", "NumPy Vector Arrays", "Data Cleaning NaNs", "Checkpoint 1",
      "Exploratory Analysis", "Matplotlib Charts", "Hypothesis Tests", "Feature Selection", "Checkpoint 2",
      "SQL Query Joins", "Time Series Models", "Linear Regression", "Streamlit Dashboards", "Checkpoint 3",
      "Final Assessment"
    ],
    descriptions: [
      "Explore dataset collections, analysis lifecycles, and roles.",
      "Inspect tabular records, select rows, and clean cells with Pandas.",
      "Create high-performance vector grids and matrices with NumPy.",
      "Handle missing cells, drop NaNs, and impute column values.",
      "Covers Data Science Phase 1. 20 Questions. Passing score: 50%.",
      "Generate statistical reports and summary analytics.",
      "Render charts, histograms, scatter plots, and box plots.",
      "Perform t-tests, ANOVA checks, and assess p-value distributions.",
      "Measure Pearson coefficients and choose meaningful features.",
      "Covers Data Science Phase 2. 20 Questions. Passing score: 50%.",
      "Query datasets and join relational database tables with SQL.",
      "Analyze temporal sequences, trend behaviors, and seasonal patterns.",
      "Fit regression lines, measure MSE values, and predict trends.",
      "Package models into interactive web dashboards using Streamlit.",
      "Covers Data Science Phase 3. 20 Questions. Passing score: 50%.",
      "Comprehensive Data Science timed assessment."
    ],
    lessons: {
      node_1: {
        slides: [
          "Welcome to Data Science! Data Science combines statistics, programming, and domain expertise to extract insights from raw data.",
          "The Data Science lifecycle consists of: Collection, Cleaning, Exploration, Modeling, and Communication.",
          "Structured data resides in tables (database tables, CSV files), while unstructured data includes text, audio, and images.",
          "Explore dataset properties using summary statistics: mean (average), median (middle value), and standard deviation (spread).",
          "Data analysts focus on descriptive statistics, while Data Scientists build predictive models to forecast trends."
        ],
        q: "Which lifecycle step involves cleaning missing values and correcting formatting errors?",
        o: ["Data Collection", "Data Preparation / Cleaning", "Machine Modeling", "Data Communication"],
        a: "Data Preparation / Cleaning",
        e: "Data Cleaning transforms raw, noisy files into structured, accurate records for analysis."
      },
      node_2: {
        slides: [
          "Pandas is a powerful Python library for data manipulation and analysis.",
          "A Series represents a 1-dimensional array, while a DataFrame is a 2-dimensional labeled table.",
          "Load data from file paths using Pandas utilities: df = pd.read_csv('dataset.csv').",
          "Select columns using 'df['ColumnName']', and filter rows using logical expressions: df[df['Age'] > 21].",
          "Group and aggregate tabular records using split-apply-combine methods: df.groupby('Category').mean()."
        ],
        q: "Which Pandas object represents a 2-dimensional labeled tabular data structure?",
        o: ["Series", "DataFrame", "Panel", "Index"],
        a: "DataFrame",
        e: "Pandas DataFrames align data in rows and columns, similar to SQL tables or spreadsheet grids."
      },
      node_3: {
        slides: [
          "NumPy (Numerical Python) enables high-performance vector and matrix calculations in Python.",
          "NumPy ndarray represents a multi-dimensional grid of homogeneous elements, optimized in C.",
          "Vectors process mathematical operations in parallel (vectorization), avoiding slow Python loops.",
          "Perform element-wise math directly: 'arr * 2' multiplies every element inside arrays by 2.",
          "Navigate matrices using slicing and boolean masks: arr[arr > 0] filters out negative elements."
        ],
        q: "What describes element types stored inside a standard NumPy ndarray grid?",
        o: ["Heterogeneous (mixed)", "Homogeneous (must be identical types)", "String objects only", "Lists only"],
        a: "Homogeneous (must be identical types)",
        e: "NumPy arrays enforce homogeneous datatypes, allowing contiguous memory allocation and speed."
      },
      node_4: {
        slides: [
          "Real-world data is noisy. Missing values are represented as NaN (Not a Number) in Pandas.",
          "Locate missing cells using the 'df.isnull().sum()' command to audit datasets.",
          "Handle missing values by dropping affected rows ('df.dropna()') or columns.",
          "Imputation replaces NaNs with estimates: filling missing cells with the column's mean or median.",
          "Impute missing values using fillna: 'df['Age'].fillna(df['Age'].mean(), inplace=True)'."
        ],
        q: "Which Pandas method fills missing NaN values with a replacement value?",
        o: ["dropna()", "fillna()", "isnull()", "drop()"],
        a: "fillna()",
        e: "fillna() replaces missing NaN values with specified scalars, means, or constants."
      },
      node_6: {
        slides: [
          "Exploratory Data Analysis (EDA) investigates datasets to discover patterns and check assumptions.",
          "Summarize DataFrame shapes using 'df.info()' (types, non-nulls) and 'df.describe()' (stats).",
          "Identify outliers—extreme observations that deviate significantly from average dataset behaviors.",
          "Detect outliers using the Interquartile Range (IQR): IQR = Q3 - Q1. Outliers fall outside [Q1-1.5*IQR, Q3+1.5*IQR].",
          "Analyze relationships between continuous variable categories using correlation coefficients."
        ],
        q: "Which function displays summary statistical parameters (mean, std, min, max) in Pandas?",
        o: ["df.info()", "df.describe()", "df.head()", "df.shape"],
        a: "df.describe()",
        e: "describe() compiles descriptive statistics for all numerical columns in DataFrames."
      },
      node_7: {
        slides: [
          "Data visualization communicates insights. Matplotlib is the foundation plotting library in Python.",
          "Seaborn is built on top of Matplotlib, providing elegant statistical charts.",
          "Use Histograms to plot frequency distributions, showing where numerical values cluster.",
          "Use Scatter plots (plt.scatter) to map two continuous variables, checking for visual trends.",
          "Box plots visualize distributions using quartiles, highlighting median lines and outlier points."
        ],
        q: "Which chart is most appropriate for visualizing the frequency distribution of a single numerical variable?",
        o: ["Scatter Plot", "Line Chart", "Histogram", "Pie Chart"],
        a: "Histogram",
        e: "Histograms group numerical values into interval bins, plotting frequency counts as bars."
      },
      node_8: {
        slides: [
          "Hypothesis testing uses statistics to determine if sample findings represent true patterns.",
          "The Null Hypothesis (H0) assumes no effect or difference exists between tested groups.",
          "The Alternative Hypothesis (H1) asserts that a significant difference or effect does exist.",
          "The p-value measures probability: if p-value < 0.05, we reject H0, concluding findings are significant.",
          "T-tests compare the means of two groups. ANOVA compares means across three or more groups."
        ],
        q: "What standard p-value threshold is commonly used to reject the Null Hypothesis (H0)?",
        o: ["0.50", "0.05", "0.01", "0.001"],
        a: "0.05",
        e: "A p-value below 0.05 indicates a less than 5% probability that findings occurred by chance."
      },
      node_9: {
        slides: [
          "Feature selection isolates predictive variables, reducing model complexity and overfitting.",
          "Pearson correlation coefficient measures linear relationships between variables, ranging from -1 to +1.",
          "Correlation does not imply causation; variables can co-vary due to external hidden factors.",
          "Multicollinearity occurs when independent features correlate strongly, skewing model parameters.",
          "Drop redundant features that correlate strongly with other predictors to clean features."
        ],
        q: "What range represents the boundary values of the Pearson correlation coefficient?",
        o: ["0 to 1", "-1 to +1", "-100 to +100", "0 to 100"],
        a: "-1 to +1",
        e: "Pearson coefficients range from -1 (perfect negative) to +1 (perfect positive correlation)."
      },
      node_11: {
        slides: [
          "SQL (Structured Query Language) is standard for retrieving data from relational databases.",
          "Select specific columns and filter database records using SELECT, FROM, and WHERE clauses.",
          "Combine rows from multiple tables based on related columns using JOIN operations.",
          "INNER JOIN returns matching records in both tables. LEFT JOIN returns all rows from the left table.",
          "Aggregate records using GROUP BY and filter grouped results using HAVING clauses."
        ],
        q: "Which SQL clause filters grouped rows aggregated by GROUP BY statements?",
        o: ["WHERE", "HAVING", "ORDER BY", "SELECT"],
        a: "HAVING",
        e: "HAVING filters aggregated groups. WHERE filters individual rows before groups are assembled."
      },
      node_12: {
        slides: [
          "Time series analysis processes sequence data indexed chronologically over time.",
          "Time series components include: Trend (long-term direction), Seasonality (cycles), and Noise.",
          "A time series is stationary if its mean and variance remain constant over time.",
          "Stationarity is required for forecasting models. Achieve it by differencing values.",
          "Autoregressive Integrated Moving Average (ARIMA) models forecast future values based on past observations."
        ],
        q: "What describes a time series where mean and variance stay constant over time?",
        o: ["Seasonal", "Stationary", "Trended", "Autoregressive"],
        a: "Stationary",
        e: "Stationary series have constant statistical parameters over time, making them easier to forecast."
      },
      node_13: {
        slides: [
          "Linear regression fits a straight line to predict continuous outputs: y = wx + b.",
          "The Ordinary Least Squares (OLS) algorithm minimizes the sum of squared differences (errors).",
          "Evaluate regression accuracy using Mean Squared Error (MSE) and R-squared metrics.",
          "R-squared measures the proportion of variance explained by model features, ranging from 0 to 1.",
          "Ensure residuals (errors) are normally distributed, showing no systematic patterns."
        ],
        q: "Which regression metric measures the proportion of target variance explained by model features?",
        o: ["Mean Squared Error (MSE)", "R-squared", "Pearson correlation", "p-value"],
        a: "R-squared",
        e: "R-squared (coefficient of determination) evaluates how well model features explain target variance."
      },
      node_14: {
        slides: [
          "Streamlit is an open-source Python framework to build interactive web apps for data models.",
          "Write dashboards using clean Python scripts, avoiding HTML, CSS, or JS templates.",
          "Create interactive widgets compactly: 'name = st.text_input()' or 'st.button()'.",
          "Render charts directly inside web layouts: 'st.pyplot()' or 'st.line_chart()'.",
          "Deploy Streamlit applications locally using the 'streamlit run app.py' terminal command."
        ],
        q: "Which command runs a Streamlit application script named 'app.py' locally?",
        o: ["python app.py", "streamlit run app.py", "npm run app.py", "run streamlit app.py"],
        a: "streamlit run app.py",
        e: "'streamlit run' boots a local development server, rendering the dashboard in browsers."
      }
    }
  },
  app: {
    badge1: "App Development Cadet 📱",
    hint1: "Unlock iOS and Android Ecosystem Hints 💡",
    badge2: "Cross-Platform Builder 🔮",
    hint2: "Unlock React Native and Mobile UI Hints ⚡",
    badge3: "App Store Publisher 🚀",
    hint3: "Unlock Storage, APIs, and App Store Publishing Hints 🎁",
    finalBadge: "🥇 Professional App Developer",
    finalHint: "🎖 Graduate Certificate in Mobile App Development & App Store Launch!",
    subtitles: [
      "Mobile Ecosystems", "Swift & SwiftUI Basics", "Kotlin & Compose", "React Native Setup", "Checkpoint 1",
      "Mobile Layout UIs", "Local Database Storage", "State Managers", "Native APIs & GPS", "Checkpoint 2",
      "App Lifecycle States", "Network REST Integrations", "Publishing Store Packs", "App Security & Links", "Checkpoint 3",
      "Final Assessment"
    ],
    descriptions: [
      "Compare iOS and Android paradigms, native builds, and hybrid tools.",
      "Learn Swift variables, options, and SwiftUI declarative views.",
      "Build Android screens with Kotlin and composable layouts.",
      "Compile cross-platform apps using React Native and JSX.",
      "Covers App Dev Phase 1. 20 Questions. Passing score: 50%.",
      "Configure scroll lists, flex boxes, and mobile responsive grids.",
      "Store values using Room, CoreData, and SQLite storage nodes.",
      "Manage app state globally with Redux or local context.",
      "Access mobile cameras, GPS location services, and sensor cards.",
      "Covers App Dev Phase 2. 20 Questions. Passing score: 50%.",
      "Handle app launch, active state, backgrounding, and sleep.",
      "Fetch web JSON payloads and sync lists with remote servers.",
      "Package bundle releases for Google Play and Apple App Store.",
      "Manage API keys, deep links, and device secure storages.",
      "Covers App Dev Phase 3. 20 Questions. Passing score: 50%.",
      "Comprehensive Mobile App Dev final timed check."
    ],
    lessons: {
      node_1: {
        slides: [
          "Welcome to App Development! Mobile applications are compiled for specific mobile operating systems (iOS or Android).",
          "Native apps use system languages: Swift for iOS, and Kotlin for Android, yielding high performance.",
          "Cross-platform frameworks (React Native, Flutter) compile a single codebase for both platforms.",
          "Mobile development requires Software Development Kits (SDKs) and Integrated Development Environments (IDEs).",
          "Use Xcode for iOS compilation (macOS only) and Android Studio for Android compilation (cross-platform)."
        ],
        q: "Which IDE is required to compile native iOS applications?",
        o: ["Android Studio", "Xcode", "Visual Studio", "VS Code"],
        a: "Xcode",
        e: "Apple requires Xcode on macOS to compile and submit native iOS applications."
      },
      node_2: {
        slides: [
          "Swift is Apple's modern, safe, type-safe programming language for iOS app development.",
          "Swift Optionals handle null values safely using '?' suffix indicators: var name: String?.",
          "SwiftUI is a declarative framework to build user interfaces using state-driven view variables.",
          "Views update automatically when State variables change: @State private var isLogged = false.",
          "Arrange layouts using stacks: VStack (vertical), HStack (horizontal), and ZStack (depth layers)."
        ],
        q: "Which Swift type indicator handles variables that can contain null or nil values?",
        o: ["Optional", "Nullable", "Null", "NilPointer"],
        a: "Optional",
        e: "Optionals enclose values that can be nil, requiring unwrapping statements to access."
      },
      node_3: {
        slides: [
          "Kotlin is the modern, expressive programming language for Android development.",
          "Jetpack Compose is Android's modern declarative UI toolkit, replacing legacy XML layouts.",
          "Composable functions (declared with @Composable) build UI layouts based on input data.",
          "Manage state inside Composables using 'remember' variables: val count = remember { mutableStateOf(0) }.",
          "Compose coordinates elements inside columns (vertical stacks), rows (horizontal), and boxes (stacked layers)."
        ],
        q: "What annotation identifies declarative user interface functions in Jetpack Compose?",
        o: ["@View", "@Composable", "@Layout", "@Screen"],
        a: "@Composable",
        e: "The @Composable annotation declares that a function compiles inputs into visual layouts."
      },
      node_4: {
        slides: [
          "React Native compiles cross-platform mobile apps using JavaScript and React concepts.",
          "React Native bridges JavaScript logic to native views, rendering native components on screens.",
          "Write layouts using React concepts, mapping HTML to mobile views (e.g. <View> instead of <div>).",
          "Style components using Flexbox layouts, aligning children dynamically across viewports.",
          "Update React Native views using state, compile code using Metro, and preview builds in simulators."
        ],
        q: "Which React Native tag is standard to group layout components, mapping to a <div> in web?",
        o: ["<Group>", "<Div>", "<View>", "<Container>"],
        a: "<View>",
        e: "The <View> tag is the basic container element in React Native, rendering as a native container."
      },
      node_6: {
        slides: [
          "Mobile screens require responsive layouts that scale across diverse aspect ratios.",
          "Display long list records efficiently using scrolling lists: FlatList (React Native) or LazyColumn (Compose).",
          "Scrolling lists recycle off-screen views to minimize memory use and prevent rendering lag.",
          "Safe Area components protect layouts from overlapping notch cutouts and system buttons.",
          "Configure touch controls using gesture detectors to support swipe, pinch, and double-tap actions."
        ],
        q: "Which layout component recycles off-screen items to render long lists efficiently in React Native?",
        o: ["ScrollView", "FlatList", "ListView", "LazyRow"],
        a: "FlatList",
        e: "FlatList recycles item elements dynamically, preventing memory overflows on long lists."
      },
      node_7: {
        slides: [
          "Mobile apps cache database records locally to support offline use when disconnected.",
          "SQLite is the lightweight SQL database engine embedded directly inside mobile devices.",
          "Room (Android) and Core Data (iOS) are object-relational mapping frameworks that simplify SQLite queries.",
          "Save key-value configuration values using local stores: SharedPreferences (Android) or UserDefaults (iOS).",
          "Encrypt local databases to protect sensitive user profiles from extraction attacks."
        ],
        q: "Which local storage API is standard for saving lightweight key-value user preferences in iOS?",
        o: ["CoreData", "Room", "UserDefaults", "SQLite"],
        a: "UserDefaults",
        e: "UserDefaults provides a simple interface to save lightweight key-value pairs in iOS."
      },
      node_8: {
        slides: [
          "Mobile apps require robust state management to sync complex component hierarchies.",
          "Local state handles simple configurations, while global state stores session variables.",
          "Redux implements unidirectional data flow, updating states using actions and reducers.",
          "Context API provides a lightweight state sharing alternative, avoiding prop drilling.",
          "Keep states immutable, updating values using setters to trigger correct re-renders."
        ],
        q: "What describes unidirectional data flow in global state frameworks like Redux?",
        o: [
          "Data changes flow in multiple directions",
          "Actions trigger state updates in reducers, which re-render views",
          "Views modify state properties directly",
          "Compilers block state changes"
        ],
        a: "Actions trigger state updates in reducers, which re-render views",
        e: "Redux enforces unidirectional flow: views dispatch actions, reducers update states, views re-render."
      },
      node_9: {
        slides: [
          "Mobile devices feature native APIs that access cameras, GPS locations, and sensors.",
          "Request runtime permissions before accessing sensitive APIs (e.g. camera, location, contacts).",
          "Access location coordinates using GPS APIs, and display maps using Map SDKs.",
          "Manage battery consumption by adjusting GPS accuracy and location request intervals.",
          "Trigger background tasks to sync coordinates when applications are suspended."
        ],
        q: "What is required before mobile applications can access device cameras or GPS sensors?",
        o: [
          "A paid developer account",
          "Explicit runtime permission approval from the user",
          "A network connection",
          "Compiling the app in release mode"
        ],
        a: "Explicit runtime permission approval from the user",
        e: "Mobile OS guidelines mandate requesting explicit user permission before accessing sensitive hardware APIs."
      },
      node_11: {
        slides: [
          "The Mobile OS manages application lifecycle states to conserve battery and CPU resources.",
          "Lifecycle states include: Not Running, Active (foreground), Suspended (background), and Background.",
          "Apps in Suspended state are paused in memory; the OS can terminate them to reclaim RAM.",
          "Save user progress when transitioning to background states to prevent data loss on termination.",
          "Configure background tasks to run lightweight operations (e.g. download updates, sync logs)."
        ],
        q: "What describes the Suspended state in mobile application lifecycles?",
        o: [
          "The app is actively executing instructions",
          "The app is paused in memory and can be terminated by the OS",
          "The app is downloading resources from App Store",
          "The device is turned off"
        ],
        a: "The app is paused in memory and can be terminated by the OS",
        e: "Suspended apps remain in RAM but stop processing instructions. The OS can kill them if memory is low."
      },
      node_12: {
        slides: [
          "Mobile apps consume REST APIs to sync databases and authenticate users.",
          "Perform network queries asynchronously to keep the main thread responsive, avoiding UI freezes.",
          "Use native fetch libraries (URLSession in iOS, OkHttp/Retrofit in Android) to query API endpoints.",
          "JSON is the standard format to exchange payloads, requiring serialization tools.",
          "Handle network errors (e.g. timeout, offline) gracefully, showing informative messages to users."
        ],
        q: "Why must API network queries execute asynchronously in mobile applications?",
        o: [
          "To speed up network transfers",
          "To prevent blocking the main UI thread, avoiding application freezes",
          "To secure transfer payloads",
          "To bypass firewall rules"
        ],
        a: "To prevent blocking the main UI thread, avoiding application freezes",
        e: "Network calls are slow. Running them on the main thread freezes the UI, causing OS termination."
      },
      node_13: {
        slides: [
          "Publishing packages apps for distribution via the App Store (iOS) or Google Play (Android).",
          "Compile release builds using signing certificates, and configure bundle identifiers.",
          "iOS builds require provisioning profiles and compile into .ipa archive bundles.",
          "Android builds compile into Android App Bundles (.aab) for optimization in Google Play.",
          "Submit builds to developer consoles (App Store Connect, Play Console) for review and release."
        ],
        q: "Which file format is standard for Android release packages submitted to Google Play?",
        o: [".ipa", ".aab (Android App Bundle)", ".exe", ".dmg"],
        a: ".aab (Android App Bundle)",
        e: "Google Play requires Android App Bundles (.aab) to optimize device-specific APK downloads."
      },
      node_14: {
        slides: [
          "Mobile app security protects user databases, API keys, and network payloads.",
          "Store sensitive credentials (tokens, passwords) securely using Keychain (iOS) or Keystore (Android).",
          "Secure network communication by enforcing HTTPS and pinning certificates.",
          "Deep linking routes URLs to specific app views: app://profile/user_id.",
          "Sanitize deep link parameters to prevent navigation injection vulnerabilities."
        ],
        q: "Which system API is standard for saving sensitive tokens securely on iOS devices?",
        o: ["UserDefaults", "Keychain", "CoreData", "VPC"],
        a: "Keychain",
        e: "The Keychain API provides secure, hardware-encrypted storage for sensitive credentials like tokens."
      }
    }
  },
  cloud: {
    badge1: "Cloud Practitioner ☁️",
    hint1: "Unlock Cloud Models and VPC Networking Hints 💡",
    badge2: "Docker and Kubernetes Master 🐳",
    hint2: "Unlock Containerization and Serverless Lambda Hints ⚡",
    badge3: "Cloud DevOps Architect 🚀",
    hint3: "Unlock CI/CD, Terraform, and Monitoring Hints 🎁",
    finalBadge: "🥇 Cloud Systems Architect",
    finalHint: "🎖 Graduate Certificate in Cloud Computing & DevOps Champion!",
    subtitles: [
      "IaaS PaaS SaaS Models", "Hypervisors & VMs", "AWS Core Infrastructure", "VPC Cloud Networks", "Checkpoint 1",
      "Docker Containers", "Kubernetes Pods", "Serverless Lambda", "IAM Identity Access", "Checkpoint 2",
      "S3 Buckets & CDNs", "DevOps CI/CD", "Infrastructure as Code", "CloudWatch Monitoring", "Checkpoint 3",
      "Final Assessment"
    ],
    descriptions: [
      "Classify cloud models: Infrastructure, Platform, and Software.",
      "Understand hypervisors, VM isolates, and bare-metal nodes.",
      "Deploy virtual servers (EC2), storage blocks (S3), and database clusters (RDS).",
      "Isolate network zones, configure subnets, and setup VPC routers.",
      "Covers Cloud Phase 1. 20 Questions. Passing score: 50%.",
      "Package code inside Docker files and run image isolation bundles.",
      "Scale container pods, configure load balancers, and setup Kubernetes clusters.",
      "Deploy function-as-a-service code triggering on dynamic events.",
      "Manage users, assign IAM roles, and configure least-privilege bounds.",
      "Covers Cloud Phase 2. 20 Questions. Passing score: 50%.",
      "Distribute file assets using CDN nodes and secure storage buckets.",
      "Automate build testing, deployment scripts, and CI/CD pipelines.",
      "Write code templates to provision resources using Terraform.",
      "Track cloud latency, watch error logs, and configure alarms.",
      "Covers Cloud Phase 3. 20 Questions. Passing score: 50%.",
      "Comprehensive Cloud Computing final check."
    ],
    lessons: {
      node_1: {
        slides: [
          "Welcome to Cloud Computing! Cloud computing delivers on-demand computing services (servers, storage, databases) over the internet.",
          "Cloud service models: IaaS (Infrastructure as a Service), PaaS (Platform as a Service), SaaS (Software as a Service).",
          "IaaS provides raw infrastructure (servers, network blocks) like AWS EC2. Users manage OS and runtimes.",
          "PaaS provides managed runtime environments (AWS Elastic Beanstalk), abstracting OS management.",
          "SaaS delivers fully managed applications (Google Drive, Salesforce), abstracting all infrastructure."
        ],
        q: "Which cloud service model provides managed runtime environments, abstracting OS management?",
        o: ["IaaS", "PaaS", "SaaS", "On-Premises"],
        a: "PaaS",
        e: "PaaS (Platform as a Service) manages servers, networks, and OS, letting users focus on code."
      },
      node_2: {
        slides: [
          "Virtualization partitions single hardware units into multiple virtual machines (VMs).",
          "Hypervisors coordinate and allocate physical hardware resources (CPU, RAM) to VMs.",
          "Type 1 Hypervisors run directly on physical hardware (bare-metal), yielding high performance.",
          "Type 2 Hypervisors run on top of host OS layers (VirtualBox), ideal for development.",
          "Virtual machines isolate guest operating systems, providing secure multi-tenant execution."
        ],
        q: "Which hypervisor type runs directly on bare-metal hardware without host OS layers?",
        o: ["Type 1 Hypervisor", "Type 2 Hypervisor", "Container Engine", "VPC Router"],
        a: "Type 1 Hypervisor",
        e: "Type 1 Hypervisors run directly on hardware, optimizing hypervisor speed and isolation."
      },
      node_3: {
        slides: [
          "Amazon Web Services (AWS) is a leading cloud infrastructure provider.",
          "AWS EC2 (Elastic Compute Cloud) provides resizable virtual servers (instances) in the cloud.",
          "AWS S3 (Simple Storage Service) provides object storage for files and data assets.",
          "AWS RDS (Relational Database Service) provides managed SQL databases (PostgreSQL, MySQL).",
          "Deploy instances in multiple Availability Zones (AZs) to build fault-tolerant architectures."
        ],
        q: "Which AWS service provides resizable virtual servers in the cloud?",
        o: ["S3", "EC2", "RDS", "Lambda"],
        a: "EC2",
        e: "AWS EC2 provides elastic virtual compute nodes, letting users spin up servers on demand."
      },
      node_4: {
        slides: [
          "Virtual Private Clouds (VPCs) create isolated networks within cloud provider infrastructures.",
          "Subnets partition VPCs: Public subnets route internet traffic, private subnets do not.",
          "Route Tables configure network path routes, and Internet Gateways connect public subnets to the web.",
          "Security Groups act as firewalls for instances, controlling port and IP traffic.",
          "VPC Peering connects VPC networks, enabling direct communication between cloud nodes."
        ],
        q: "Which VPC component acts as a virtual firewall, controlling inbound and outbound instance port traffic?",
        o: ["Internet Gateway", "Route Table", "Security Group", "Subnet"],
        a: "Security Group",
        e: "Security Groups act as stateful firewalls at the instance level, blocking unauthorized port traffic."
      },
      node_6: {
        slides: [
          "Docker packages application code, runtimes, and dependencies into portable containers.",
          "Dockerfiles define build templates: base images, commands, environment parameters, and ports.",
          "Docker Images are read-only build artifacts compiled from Dockerfiles.",
          "Docker Containers are active runtime instances instantiated from Docker images.",
          "Containers share the host OS kernel, making them lightweight and fast compared to virtual machines."
        ],
        q: "What is a primary difference between Docker containers and Virtual Machines?",
        o: [
          "Containers require hypervisors",
          "Containers share the host OS kernel, making them lightweight",
          "Containers occupy more disk space",
          "Containers cannot run databases"
        ],
        a: "Containers share the host OS kernel, making them lightweight",
        e: "Containers share host kernels rather than replicating full OS layers, reducing overhead."
      },
      node_7: {
        slides: [
          "Kubernetes is an open-source container orchestration engine that automates container management.",
          "Pods are the smallest deployable units in Kubernetes, enclosing one or more containers.",
          "Deployments scale pods, manage rolling updates, and ensure target replicas are running.",
          "Services configure networking, load-balancing traffic across pods using virtual IPs.",
          "Ingress routes external HTTP/HTTPS traffic to internal services based on host paths."
        ],
        q: "What is the smallest deployable compute unit in a Kubernetes cluster?",
        o: ["Container", "Pod", "Service", "Node"],
        a: "Pod",
        e: "Pods wrap containers, sharing network namespaces and storage volumes in Kubernetes."
      },
      node_8: {
        slides: [
          "Serverless computing abstracts infrastructure management, charging only for active compute time.",
          "AWS Lambda executes function-as-a-service code in response to trigger events (e.g. API requests).",
          "Lambda functions scale automatically from zero to thousands of concurrent executions.",
          "Cold starts occur when functions initialize containers, causing latency on early invocations.",
          "Write stateless functions that execute quickly to minimize billing charges."
        ],
        q: "What describes billing models for serverless functions like AWS Lambda?",
        o: [
          "Fixed monthly rates",
          "Pay only for active execution duration and request counts",
          "Charges based on disk allocations",
          "Free for all users"
        ],
        a: "Pay only for active execution duration and request counts",
        e: "Serverless models eliminate idle charges, billing users strictly for active processing time."
      },
      node_9: {
        slides: [
          "Identity and Access Management (IAM) controls user accounts and access permissions in the cloud.",
          "IAM Users represent identities, IAM Groups bundle users, and IAM Roles grant temporary access.",
          "IAM Policies are JSON documents that define permissions (Allow/Deny) for API actions.",
          "The Principle of Least Privilege mandates granting only the minimum permissions necessary for tasks.",
          "Enable Multi-Factor Authentication (MFA) on root credentials to secure administrative accounts."
        ],
        q: "What format is standard to write permission policy documents in AWS IAM?",
        o: ["XML", "JSON", "YAML", "INI"],
        a: "JSON",
        e: "AWS IAM policies are JSON schema definitions listing allowed and denied actions on resources."
      },
      node_11: {
        slides: [
          "AWS S3 stores files as objects inside container buckets, providing high durability.",
          "S3 Bucket Policies define access rules, preventing public data exposure.",
          "Content Delivery Networks (CDNs), like AWS CloudFront, cache file assets globally.",
          "CDN Edge Locations cache assets near users, reducing latency and download times.",
          "Enable S3 Versioning to preserve, retrieve, and restore older versions of objects."
        ],
        q: "Which AWS service functions as a global CDN, caching file assets at edge locations?",
        o: ["S3", "CloudFront", "Route 53", "VPC"],
        a: "CloudFront",
        e: "CloudFront is AWS's global CDN service, caching assets at edge locations to minimize latency."
      },
      node_12: {
        slides: [
          "DevOps merges development and operations to automate build testing and deployments.",
          "CI/CD pipelines compile code, run tests, and deploy packages automatically.",
          "Continuous Integration (CI) runs unit tests on code commits to detect integration bugs early.",
          "Continuous Deployment (CD) deploys validated builds to production environments automatically.",
          "Manage pipelines using tools like GitHub Actions, Jenkins, or AWS CodePipeline."
        ],
        q: "What is the primary goal of Continuous Integration (CI) in DevOps pipelines?",
        o: [
          "Deploying code to production",
          "Running tests automatically on code commits to detect bugs early",
          "Provisioning cloud servers",
          "Encrypting database tables"
        ],
        a: "Running tests automatically on code commits to detect bugs early",
        e: "CI automates build testing, validating commits to prevent integrating broken code."
      },
      node_13: {
        slides: [
          "Infrastructure as Code (IaC) manages cloud resources using machine-readable configuration files.",
          "Terraform is an open-source IaC tool that compiles declarative configuration files.",
          "Define resource structures in Terraform files using HashiCorp Configuration Language (HCL).",
          "Terraform States track active cloud configurations, mapping resource blocks to provider IDs.",
          "Deploy resources using Terraform commands: 'terraform plan' (preview) and 'terraform apply' (execute)."
        ],
        q: "Which command previews resource changes Terraform will execute in cloud environments?",
        o: ["terraform init", "terraform plan", "terraform apply", "terraform destroy"],
        a: "terraform plan",
        e: "'terraform plan' computes diffs between local files and active cloud states, previewing changes."
      },
      node_14: {
        slides: [
          "Cloud monitoring tracks application health, request volume, and execution logs.",
          "AWS CloudWatch aggregates log data, system metrics, and execution events from AWS services.",
          "Configure CloudWatch Alarms to trigger notifications when metrics (e.g. CPU load) exceed thresholds.",
          "Application Performance Monitoring (APM) tools trace request latency across distributed services.",
          "Audit user actions and API calls across accounts using logging tools (e.g. AWS CloudTrail)."
        ],
        q: "Which AWS service aggregates logs and tracks performance metrics from EC2 and S3 resources?",
        o: ["CloudTrail", "CloudWatch", "IAM", "CloudFront"],
        a: "CloudWatch",
        e: "CloudWatch collects log telemetry and plots system metrics from resource groups in AWS."
      }
    }
  },
  game: {
    badge1: "Game Designer Cadet 🎮",
    hint1: "Unlock Game Engine and Coordinate Vector Hints 💡",
    badge2: "Physics and Collision Expert 🔮",
    hint2: "Unlock Physics Forces, Controller Inputs, and Audio Hints ⚡",
    badge3: "Game Optimization Guru 🚀",
    hint3: "Unlock UI, Animators, Shaders, and Frame Rate Hints 🎁",
    finalBadge: "🥇 Professional Game Developer",
    finalHint: "🎖 Graduate Certificate in Game Development & Game Engine Architect!",
    subtitles: [
      "Game Engines Overview", "Vectors & Coordinates", "Scripting Engine Logic", "2D Physics Colliders", "Checkpoint 1",
      "3D Forces & Rigidbodies", "Input Key Mapping", "Audio Spatial Sound", "Prefabs & Pools", "Checkpoint 2",
      "Game HUD UI Canvas", "Animation Blend Trees", "Material Shaders", "Framerate Optimizations", "Checkpoint 3",
      "Final Assessment"
    ],
    descriptions: [
      "Compare Unity, Unreal, and custom game loops.",
      "Use vector math, normalizations, dot products, and cross products.",
      "Write Unity C# scripts and Unreal C++ class components.",
      "Detect collisions, use bounding boxes, and handle bounce math.",
      "Covers Game Dev Phase 1. 20 Questions. Passing score: 50%.",
      "Apply gravity, mass, torque, and friction forces in 3D scopes.",
      "Map key triggers, gamepads, and touch coordinates to gameplay.",
      "Configure spatial audio emitters and background music.",
      "Instantiate components and recycle nodes using object pools.",
      "Covers Game Dev Phase 2. 20 Questions. Passing score: 50%.",
      "Design canvas overlays, health bars, and overlay screens.",
      "Link animation nodes, blend trees, and transitions.",
      "Render standard shaders, shadow mappings, and materials.",
      "Profile draw calls, debug GPU bottlenecks, and stabilize frame rates.",
      "Covers Game Dev Phase 3. 20 Questions. Passing score: 50%.",
      "Comprehensive Game Development final check."
    ],
    lessons: {
      node_1: {
        slides: [
          "Welcome to Game Development! Game engines (Unity, Unreal) provide core rendering, physics, and input systems.",
          "The Game Loop executes repeatedly: Input Processing, State Updating, and Frame Rendering.",
          "Unity uses C# scripts attached to GameObjects, ideal for indie and mobile development.",
          "Unreal Engine uses C++ classes and Blueprints, optimized for high-end graphics.",
          "Custom game loops handle timing synchronization, adjusting delta time to maintain consistent speeds."
        ],
        q: "What are the three main sequential phases executed inside standard Game Loops?",
        o: [
          "Compile, Link, Deploy",
          "Process Input, Update State, Render Frame",
          "Draw, Scale, Rotate",
          "Save, Load, Quit"
        ],
        a: "Process Input, Update State, Render Frame",
        e: "The game loop processes inputs, updates world coordinates, and renders frames repeatedly."
      },
      node_2: {
        slides: [
          "Game positions and movements are calculated using 2D and 3D coordinate vector spaces.",
          "Vectors represent direction and magnitude. Normalization divides vectors by their length, returning unit vectors.",
          "The Dot Product calculates angles between vectors: a • b = |a||b|cos(theta).",
          "Dot product returns positive if facing identical directions, negative if facing away, zero if orthogonal.",
          "The Cross Product calculates vectors perpendicular to input vectors, ideal for finding normal directions."
        ],
        q: "What does a Dot Product value of zero indicate about the relationship between two vectors?",
        o: ["They are parallel", "They are orthogonal (90 degrees)", "One vector is null", "They are identical"],
        a: "They are orthogonal (90 degrees)",
        e: "The dot product is zero when vectors are orthogonal, as cos(90) = 0."
      },
      node_3: {
        slides: [
          "Game logic coordinates GameObject variables and coordinates over time.",
          "In Unity, MonoBehaviour classes define lifecycle hooks: Awake, Start, and Update.",
          "Start() runs once when scripts mount. Update() runs once per frame, handling visual updates.",
          "FixedUpdate() runs at regular intervals, handling physics updates synchronously.",
          "Multiply displacements by 'Time.deltaTime' to ensure movements scale consistently across variable frame rates."
        ],
        q: "Which Unity lifecycle method is standard for executing physics calculations?",
        o: ["Update()", "FixedUpdate()", "Start()", "Awake()"],
        a: "FixedUpdate()",
        e: "FixedUpdate() runs at fixed physics intervals, ensuring consistent calculations."
      },
      node_4: {
        slides: [
          "Physics engines simulate gravity, forces, and collisions between game entities.",
          "Colliders define geometric boundaries (Box, Circle, Polygon) to detect overlap events.",
          "Trigger Colliders detect overlaps without blocking movements, ideal for checkpoint zones.",
          "Collision callbacks (OnCollisionEnter) return collision details like impact forces.",
          "Rigidbodies bind GameObjects to the physics engine, enabling force and torque calculations."
        ],
        q: "Which collider configuration detects overlaps without blocking object movements?",
        o: ["Rigidbody", "Trigger Collider", "Mesh Collider", "Static Collider"],
        a: "Trigger Collider",
        e: "Trigger colliders act as check zones, firing events without blocking physical movements."
      },
      node_6: {
        slides: [
          "3D physics manages gravity, mass, friction, and torque across three axes.",
          "Apply forces using Rigidbody methods: 'AddForce(Vector3.up * 10, ForceMode.Impulse)'.",
          "Torque applies rotational force, spinning objects around their center of mass.",
          "Friction materials adjust slide rates between colliding surface boundaries.",
          "Configure Rigidbody constraints to lock coordinate axes, preventing accidental rotations."
        ],
        q: "Which force type applies rotational acceleration to 3D physical objects?",
        o: ["Friction", "Torque", "Impulse", "Gravity"],
        a: "Torque",
        e: "Torque is the rotational equivalent of force, spinning objects around axes."
      },
      node_7: {
        slides: [
          "Input Managers map keyboard triggers, controllers, and touches to gameplay actions.",
          "Create abstract actions (e.g. 'Jump') to bind multiple key inputs (Space, Controller A).",
          "Check active inputs using polling: 'Input.GetButtonDown(\"Jump\")' returns true on clicks.",
          "Input systems coordinate gamepad joysticks as vector inputs: Input.GetAxis(\"Horizontal\").",
          "Configure deadzones to ignore slight joystick drifts from resting controls."
        ],
        q: "Why do game input managers use abstract action mappings instead of hardcoded keys?",
        o: [
          "To speed up compiles",
          "To support multiple controllers and customizable key bindings easily",
          "To bypass physics engines",
          "To reduce memory use"
        ],
        a: "To support multiple controllers and customizable key bindings easily",
        e: "Abstract actions decouple input logic from specific hardware key codes."
      },
      node_8: {
        slides: [
          "Game audio manages sound effects, spatial layouts, and background music.",
          "Audio Sources attach to GameObjects, playing audio files in 2D or 3D space.",
          "Audio Listeners attach to cameras, receiving sound waves from active sources.",
          "3D spatial audio adjusts volume and panning based on distances to listeners.",
          "Configure audio mixers to group, balance, and apply effects (e.g. reverb) to sound groups."
        ],
        q: "Which component receives sound waves in game engines, standardly attached to cameras?",
        o: ["Audio Source", "Audio Listener", "Audio Mixer", "Audio Clip"],
        a: "Audio Listener",
        e: "The Audio Listener acts as the game's microphone, receiving spatial sound waves."
      },
      node_9: {
        slides: [
          "Prefabs are reusable GameObject templates containing properties, children, and scripts.",
          "Instantiating prefabs allocates memory dynamically, which can cause lag spikes.",
          "Object Pooling pre-instantiates objects, disabling and recycling them to avoid allocations.",
          "When objects expire, return them to pools rather than calling Destroy().",
          "Object pools optimize memory, stabilizing frame rates in games that spawn many objects."
        ],
        q: "What is the primary benefit of Object Pooling in game development?",
        o: [
          "Encrypts game assets",
          "Stabilizes framerates by recycling objects, avoiding dynamic allocation overhead",
          "Automates animation loops",
          "Creates vtables dynamically"
        ],
        a: "Stabilizes framerates by recycling objects, avoiding dynamic allocation overhead",
        e: "Object pooling avoids runtime garbage collection spikes by recycling inactive objects."
      },
      node_11: {
        slides: [
          "HUDs (Heads-Up Displays) render overlay canvases displaying player statistics.",
          "UI Canvases scale overlays across diverse mobile and desktop aspect ratios.",
          "Anchor UI components to corners to keep layouts aligned during viewport resizes.",
          "Render UI overlays in Screen Space (HUD) or World Space (floating health bars).",
          "Bind UI buttons to methods using click listener callbacks to process clicks."
        ],
        q: "What specifies UI coordinate alignments to keep buttons locked to screen corners during resizes?",
        o: ["Anchors", "Rigidbodies", "Colliders", "Prefabs"],
        a: "Anchors",
        e: "UI anchors bind elements to parent canvas bounds, maintaining alignments during resizes."
      },
      node_12: {
        slides: [
          "Animation state machines coordinate transitions between sprite or 3D mesh clips.",
          "State machines define states (Idle, Run, Jump) and transition arrow routes.",
          "Transition parameters (e.g. Speed) trigger transitions when values pass thresholds.",
          "Blend Trees mix multiple clips (e.g. Walk and Run) based on parameter values.",
          "Configure skeletal animations to bind mesh vertices to bone rotation vectors."
        ],
        q: "What animation component blends walk and run clips dynamically based on speed parameters?",
        o: ["State Machine", "Blend Tree", "Skeletal Mesh", "Keyframe clip"],
        a: "Blend Tree",
        e: "Blend Trees mix animations based on input values, smoothing speed transitions."
      },
      node_13: {
        slides: [
          "Shaders compile GPU instructions that render pixels, lights, and materials on screens.",
          "Vertex shaders transform 3D model coordinates into 2D screen coordinates.",
          "Fragment (Pixel) shaders calculate color values for individual screen pixels.",
          "Materials wrap shaders, exposing parameters like roughness, metallic, and texture maps.",
          "Normal maps manipulate surface lighting to simulate depth details without extra polygons."
        ],
        q: "Which shader type transforms 3D model vertex coordinates into 2D screen space?",
        o: ["Fragment Shader", "Vertex Shader", "Pixel Shader", "Surface Shader"],
        a: "Vertex Shader",
        e: "Vertex shaders transform vertex vectors into screen coordinate structures."
      },
      node_14: {
        slides: [
          "Game optimization profiles code blocks to maintain stable target frame rates.",
          "Draw calls request GPUs to render meshes; group meshes using batching to reduce calls.",
          "LOD (Level of Detail) reduces polygon counts for objects that are far from cameras.",
          "Occlusion Culling disables rendering for objects blocked by closer walls.",
          "Analyze execution bottlenecks using profiling tools to optimize update scripts."
        ],
        q: "Which optimization technique disables rendering for objects hidden behind solid walls?",
        o: ["LOD", "Occlusion Culling", "Batching", "Mipmapping"],
        a: "Occlusion Culling",
        e: "Occlusion culling hides objects blocked from view, saving GPU render cycles."
      }
    }
  },
  uiux: {
    badge1: "UI/UX Designer Cadet 🎨",
    hint1: "Unlock User Research and Grid Layout Hints 💡",
    badge2: "Figma Prototyping Master 🔮",
    hint2: "Unlock Typography, Color Contrast, and Figma Interactions Hints ⚡",
    badge3: "Design Systems Architect 🚀",
    hint3: "Unlock Components, WCAG Accessibility, and Handoff Hints 🎁",
    finalBadge: "🥇 Professional UI/UX Designer",
    finalHint: "🎖 Graduate Certificate in UI/UX Design & Design System Architect!",
    subtitles: [
      "UI vs UX Foundations", "User Research Profiles", "Wireframe Info Arch", "Column Grid Layouts", "Checkpoint 1",
      "Typography Hierarchy", "Color Theory HSL", "Figma Prototyping", "Usability Iterations", "Checkpoint 2",
      "Design Component System", "Accessibility WCAG", "Responsive UI Design", "Developer Handoffs", "Checkpoint 3",
      "Final Assessment"
    ],
    descriptions: [
      "Differentiate look-and-feel (UI) from user experience journeys (UX).",
      "Perform interview surveys, map personas, and outline user needs.",
      "Sketch layout maps, define navigation hierarchies, and build blueprints.",
      "Utilize columns, gutters, and padding boundaries in grid panels.",
      "Covers UI/UX Phase 1. 20 Questions. Passing score: 50%.",
      "Pick font pairings, scale header labels, and adjust line spacing.",
      "Choose color palettes, contrast ratios, and HSL hues.",
      "Build interaction vectors, frame connections, and overlays in Figma.",
      "Watch test users perform target tasks and record friction points.",
      "Covers UI/UX Phase 2. 20 Questions. Passing score: 50%.",
      "Design button states, form inputs, and reusable card components.",
      "Understand contrast limits, screen readers, and WCAG guidelines.",
      "Scale layouts across mobile viewports and desktop resolutions.",
      "Document redline dimensions, color codes, and export assets.",
      "Covers UI/UX Phase 3. 20 Questions. Passing score: 50%.",
      "Comprehensive UI/UX Design final check."
    ],
    lessons: {
      node_1: {
        slides: [
          "Welcome to UI/UX Design! UI (User Interface) focuses on visual design: layout, colors, and typography.",
          "UX (User Experience) focuses on user journeys: ease of use, utility, and satisfaction.",
          "Good design is user-centered, designing interfaces based on user needs and feedback.",
          "Usability determines how easily users complete tasks: learnability, efficiency, and error rates.",
          "Heuristic evaluation audits interfaces using design rules (e.g. visibility of system status)."
        ],
        q: "Which discipline focuses on user journeys, satisfaction, and ease of use?",
        o: ["Visual Interface Design", "User Experience (UX)", "Front-end Development", "Database Schema Design"],
        a: "User Experience (UX)",
        e: "UX designs user journeys, optimizing satisfaction and ease of use."
      },
      node_2: {
        slides: [
          "User research defines target users, gathering qualitative and quantitative data.",
          "User Personas are fictional profiles representing target user characteristics and goals.",
          "User Interviews gather qualitative insights, exploring user pain points and needs.",
          "User Journey Maps trace steps users perform to complete tasks, highlighting pain points.",
          "Analyze research data to define design requirements before sketching layouts."
        ],
        q: "What represents fictional profiles of target users created from research data?",
        o: ["Target groups", "User Personas", "Wireframes", "User journeys"],
        a: "User Personas",
        e: "Personas represent target users, keeping designs aligned with user needs."
      },
      node_3: {
        slides: [
          "Information Architecture (IA) organizes and labels content to help users navigate interfaces.",
          "User Flows diagram paths users take to complete tasks: start screen to end actions.",
          "Wireframes are low-fidelity structural blueprints of layout arrangements, omitting visual details.",
          "Low-fidelity wireframes focus on content hierarchy and element placement, avoiding decoration.",
          "Create wireframe designs to align layouts with user flows before adding colors."
        ],
        q: "What defines low-fidelity structural blueprints that map content layouts?",
        o: ["High-fidelity mocks", "Wireframes", "Interactive prototypes", "Color palettes"],
        a: "Wireframes",
        e: "Wireframes sketch layout blueprints, defining content placements without styling details."
      },
      node_4: {
        slides: [
          "Grid Systems align layout components, creating visual consistency across viewports.",
          "Column grids partition layouts: standard desktop grids use 12 columns, mobile uses 4.",
          "Gutters define spacing gaps between columns, preventing elements from overlapping.",
          "Margins define padding boundaries between layout edges and outer columns.",
          "Align components to grids to create clean layouts, simplifying developer implementation."
        ],
        q: "How many columns are standard in desktop grid layouts?",
        o: ["4", "8", "12", "16"],
        a: "12",
        e: "12-column layouts are standard on desktop, as 12 is divisible by 2, 3, 4, and 6."
      },
      node_6: {
        slides: [
          "Typography applies hierarchy to text, directing user attention to key labels.",
          "Pick readable font pairings: distinct headings paired with legible body text.",
          "Establish typographic hierarchies using font weights, sizes, and color contrast.",
          "Line Height (leading) controls vertical spacing between text lines, optimizing readability.",
          "Line Length (measure) limits character counts per line to prevent reading fatigue (45-75 chars)."
        ],
        q: "What refers to the vertical spacing between text lines, crucial for readability?",
        o: ["Kerning", "Tracking", "Line Height (leading)", "Font Weight"],
        a: "Line Height (leading)",
        e: "Line height regulates spacing between lines, preventing overlapping rows."
      },
      node_7: {
        slides: [
          "Color theory selects harmonized palettes that convey branding and highlight actions.",
          "HSL (Hue, Saturation, Lightness) adjusts colors logically, simplifying color selection.",
          "Primary colors highlight active actions (e.g. buttons); neutral colors background layouts.",
          "Contrast ratios check readability: WCAG requires 4.5:1 contrast for normal text.",
          "Apply colors systematically to establish visual hierarchy and guide users."
        ],
        q: "What WCAG contrast ratio is required for normal text readability?",
        o: ["2:1", "3:1", "4.5:1", "7:1"],
        a: "4.5:1",
        e: "WCAG AA guidelines require at least 4.5:1 contrast for legible text."
      },
      node_8: {
        slides: [
          "Figma is a collaborative design tool to build wireframes, mockups, and prototypes.",
          "Frames act as layout screens, holding component layers and alignments.",
          "Auto Layout creates responsive layouts in Figma, adjusting sizes automatically.",
          "Prototypes connect frames using interaction arrows, simulating active interfaces.",
          "Configure interactive transitions (e.g. Smart Animate) to preview animations."
        ],
        q: "Which Figma feature creates responsive frames that resize automatically?",
        o: ["Constraints", "Auto Layout", "Smart Animate", "Components"],
        a: "Auto Layout",
        e: "Auto Layout dynamically scales frames, mimicking CSS Flexbox alignments."
      },
      node_9: {
        slides: [
          "Usability Testing evaluates prototypes by watching users perform tasks.",
          "Moderated tests guide users directly; unmoderated tests let users explore independently.",
          "Watch test users navigate interfaces, recording friction points and mistakes.",
          "Measure success rates: task completion times and error counts.",
          "Iterate designs based on testing feedback, refining layouts to resolve pain points."
        ],
        q: "What is the primary goal of performing usability testing on prototypes?",
        o: [
          "To clean code files",
          "To identify user friction points and validate design flows",
          "To publish apps to stores",
          "To choose contrast colors"
        ],
        a: "To identify user friction points and validate design flows",
        e: "Usability testing audits layouts with real users, exposing friction zones."
      },
      node_11: {
        slides: [
          "Design Systems document UI components to maintain consistency across layouts.",
          "Atomic Design builds systems progressively: Atoms (buttons) to Molecules (search bars) to Organisms.",
          "Components represent reusable UI elements; variations represent active states (e.g. hover).",
          "Figma Component Libraries let teams share reusable assets, speed up workflows.",
          "Sync design components with frontend libraries to streamline implementation."
        ],
        q: "Which design methodology builds UI components from Atoms to Molecules?",
        o: ["Material Design", "Atomic Design", "Fluid Design", "Flat Design"],
        a: "Atomic Design",
        e: "Atomic Design structures components from basic atoms up to complex layouts."
      },
      node_12: {
        slides: [
          "Accessibility ensures designs are usable by everyone, including people with disabilities.",
          "WCAG (Web Content Accessibility Guidelines) outlines standards for accessible design.",
          "Ensure layout elements are focusable, supporting keyboard-only navigation paths.",
          "Add alternative text (alt text) to images to assist screen-reader users.",
          "Avoid using color as the only way to convey information (e.g. add error icons)."
        ],
        q: "Which guidelines define accessibility standards for modern UI/UX designs?",
        o: ["WCAG", "MRO", "ISO", "W3C"],
        a: "WCAG",
        e: "WCAG outlines international accessibility guidelines for digital designs."
      },
      node_13: {
        slides: [
          "Responsive layouts adjust fluidly across mobile viewports and desktop resolutions.",
          "Design mobile viewports first (mobile-first), prioritizing critical features.",
          "Breakpoints define viewport widths where layouts rearrange to fit displays.",
          "Use relative sizing (percentages, fractions) instead of static pixel offsets.",
          "Test designs on real devices to verify touch target sizes and readability."
        ],
        q: "What defines viewport widths where responsive layouts rearrange elements?",
        o: ["Margins", "Breakpoints", "Gutters", "Frames"],
        a: "Breakpoints",
        e: "Breakpoints specify layout triggers where grid structures adapt to screen widths."
      },
      node_14: {
        slides: [
          "Developer Handoff prepares design files for frontend implementation.",
          "Document redline specs: spacing padding, element dimensions, and border radius.",
          "Expose color hex values, typography parameters, and asset download folders.",
          "Figma Dev Mode displays CSS/iOS/Android code equivalents for selected components.",
          "Discuss design flows with developers early to prevent layout conflicts."
        ],
        q: "Which Figma feature displays code styling parameters for developers?",
        o: ["Auto Layout", "Dev Mode", "Smart Animate", "Component Library"],
        a: "Dev Mode",
        e: "Dev Mode helps developers extract CSS parameters and layout specs from designs."
      }
    }
  }
};

// Map course aliases
const COURSE_ALIASES: Record<string, string> = {
  "java": "java",
  "c": "c",
  "c++": "cpp",
  "cpp": "cpp",
  "data science": "datascience",
  "data": "datascience",
  "app development": "app",
  "app dev": "app",
  "app": "app",
  "cloud computing": "cloud",
  "cloud": "cloud",
  "game development": "game",
  "game dev": "game",
  "game": "game",
  "ui/ux design": "uiux",
  "ui/ux": "uiux",
  "ui": "uiux",
  "ux": "uiux"
};

// Helper function to build custom curriculums dynamically
const buildCustomCurriculum = (courseKey: string): CourseCurriculum => {
  const data = CUSTOM_COURSES_DATA[courseKey];
  const lessons: Record<string, Lesson> = {};

  // Build the 12 lesson nodes
  const nodeIds = ["node_1", "node_2", "node_3", "node_4", "node_6", "node_7", "node_8", "node_9", "node_11", "node_12", "node_13", "node_14"];
  nodeIds.forEach(id => {
    const raw = data.lessons[id];
    lessons[id] = {
      slides: raw?.slides || [
        `Welcome to the lesson node.`,
        `Study structural details and components.`,
        `Apply design guidelines to stabilize state.`,
        `Complete validations inside terminal controls.`,
        `Verify outcomes using testing tools.`
      ],
      question: raw?.q || "What is the primary concept verified here?",
      options: raw?.o || ["Option A", "Option B", "Option C", "Option D"],
      correct: raw?.a || "Option A",
      explanation: raw?.e || "This option matches the concept guidelines."
    };
  });

  // Build Checkpoint 1 (node_5) pooling questions from nodes 1-4
  const checkpoint1Questions: CheckpointQuestion[] = [];
  ["node_1", "node_2", "node_3", "node_4"].forEach(id => {
    const raw = data.lessons[id];
    if (raw) {
      checkpoint1Questions.push({ q: raw.q, o: raw.o, a: raw.a });
    }
  });
  // Add 16 backfill variations to reach 20 questions
  while (checkpoint1Questions.length < 20) {
    const idx = checkpoint1Questions.length;
    checkpoint1Questions.push({
      q: `Identify correct practice when initializing step ${idx + 1} parameters:`,
      o: ["Using modular configurations", "Ignoring warning codes", "Allocating redundant memory", "Bypassing structures"],
      a: "Using modular configurations"
    });
  }

  // Build Checkpoint 2 (node_10) pooling questions from nodes 6-9
  const checkpoint2Questions: CheckpointQuestion[] = [];
  ["node_6", "node_7", "node_8", "node_9"].forEach(id => {
    const raw = data.lessons[id];
    if (raw) {
      checkpoint2Questions.push({ q: raw.q, o: raw.o, a: raw.a });
    }
  });
  while (checkpoint2Questions.length < 20) {
    const idx = checkpoint2Questions.length;
    checkpoint2Questions.push({
      q: `Select the key architectural validation indicator for task ${idx + 1}:`,
      o: ["Validating inputs cleanly", "Omitting test suites", "Compiling variables globally", "Disabling active logs"],
      a: "Validating inputs cleanly"
    });
  }

  // Build Checkpoint 3 (node_15) pooling questions from nodes 11-14
  const checkpoint3Questions: CheckpointQuestion[] = [];
  ["node_11", "node_12", "node_13", "node_14"].forEach(id => {
    const raw = data.lessons[id];
    if (raw) {
      checkpoint3Questions.push({ q: raw.q, o: raw.o, a: raw.a });
    }
  });
  while (checkpoint3Questions.length < 20) {
    const idx = checkpoint3Questions.length;
    checkpoint3Questions.push({
      q: `What is recommended to deploy component ${idx + 1} securely?`,
      o: ["Enforcing environment variables", "Hardcoding path strings", "Removing exceptions checks", "Exposing secure logs"],
      a: "Enforcing environment variables"
    });
  }

  // Build Final Questions (15 items selected from checkpoints)
  const finalQuestions: CheckpointQuestion[] = [
    ...checkpoint1Questions.slice(0, 5),
    ...checkpoint2Questions.slice(0, 5),
    ...checkpoint3Questions.slice(0, 5)
  ].slice(0, 15);

  return {
    subtitles: data.subtitles,
    descriptions: data.descriptions,
    lessons,
    checkpoints: {
      node_5: {
        badge: data.badge1,
        hint: data.hint1,
        questions: checkpoint1Questions
      },
      node_10: {
        badge: data.badge2,
        hint: data.hint2,
        questions: checkpoint2Questions
      },
      node_15: {
        badge: data.badge3,
        hint: data.hint3,
        questions: checkpoint3Questions
      }
    },
    finalQuestions
  };
};

// =============================================================
// GLOBAL CURRICULUM ROUTER
// =============================================================
export const getCurriculum = (courseName: string | null): CourseCurriculum => {
  const norm = courseName?.toLowerCase().trim() || "";

  // 1. Python mapping
  if (norm.includes("python")) {
    return PYTHON_CURRICULUM;
  }

  // 2. Web Development / JavaScript mapping
  if (
    norm.includes("web") ||
    norm.includes("javascript") ||
    norm.includes("js") ||
    norm.includes("html") ||
    norm.includes("css") ||
    !norm
  ) {
    return WEB_DEV_CURRICULUM;
  }

  // 3. AI & Machine Learning mapping
  if (norm.includes("ai") || norm.includes("machine") || norm.includes("learning")) {
    return AI_ML_CURRICULUM;
  }

  // 4. Cyber Security mapping
  if (norm.includes("security") || norm.includes("cyber")) {
    return SECURITY_CURRICULUM;
  }

  // 5. Check alias map for custom courses (Java, C, C++, Data Science, App, Cloud, Game, UI/UX)
  for (const [key, alias] of Object.entries(COURSE_ALIASES)) {
    if (norm.includes(key)) {
      return buildCustomCurriculum(alias);
    }
  }

  // 6. Generic compiler-focused fallback (fully populated under constraints)
  const course = courseName || "Full-Stack Web";
  return {
    subtitles: [
      `${course} Intro`, `${course} Core`, `${course} Structures`, `${course} Advanced`, "Checkpoint 1",
      `${course} Methods`, `${course} Objects`, `${course} Engineering`, `${course} Exceptions`, "Checkpoint 2",
      `${course} Streams`, `${course} Modules`, `${course} Environment`, `${course} Deployment`, "Checkpoint 3",
      "Final Assessment"
    ],
    descriptions: [
      `Variables, types and initial syntax configurations of ${course}.`,
      `Expressions, block scopes and basic logic conditions of ${course}.`,
      `Managing collections, arrays and data outlines of ${course}.`,
      `Exploring advanced libraries and design architectures of ${course}.`,
      `Covers ${course} Phase 1. 20 Questions. Passing score: 50%.`,
      `Structuring methods, parameters, return declarations and modular scopes.`,
      `Instantiating objects, class constructors and internal attributes.`,
      `Inheriting properties, abstractions and implementation overrides.`,
      `Capturing runtime exceptions and compiling clean trial blocks.`,
      `Covers ${course} Phase 2. 20 Questions. Passing score: 50%.`,
      `Manipulating data streams, read/write protocols and filesystem inputs.`,
      `Configuring module bindings, dependency references and interfaces.`,
      `Understanding standard compiler runs and platform runtimes.`,
      `Packaging applications, rate-limit controls and secure deployment paths.`,
      `Covers ${course} Phase 3. 20 Questions. Passing score: 50%.`,
      `Comprehensive final diagnostic assessment for ${course}.`
    ],
    lessons: {
      node_1: {
        slides: [
          `Welcome to the ${course} course! We will walk through the core compiler rules and runtime foundations.`,
          `Declare properties using typed variables. Ensure name layouts follow clean camelCase or snake_case conventions.`,
          `Code blocks are surrounded by structural indentation or curly braces depending on the target framework.`,
          `Perform console operations using system print methods to write debug parameters.`,
          `Always write descriptive comment documentation blocks explaining key architectural code behaviors.`
        ],
        question: `Which approach represents clean development guidelines when starting coding in ${course}?`,
        options: [
          "Hardcoding all variables globally",
          "Writing modular functions with clear single-responsibility parameters",
          "Omitting comments and code validations",
          "Ignoring compiler logs and trace errors"
        ],
        correct: "Writing modular functions with clear single-responsibility parameters",
        explanation: `Single responsibility structures improve code maintainability and compiler testability inside ${course}.`
      },
      node_2: {
        slides: [
          "Control flow operates execution paths. Conditions test variables against target logic operations.",
          "Loops (for/while structures) iterate instructions repeatedly over sequences or indices.",
          "Set control boundaries to exit loops early when target values are successfully calibrated.",
          "Logical operators (AND, OR, NOT) evaluate complex compound checks inside if statements.",
          "Avoid deep nesting of control statements to prevent spaghetti architectures."
        ],
        question: "What control loop statement skips execution steps to proceed to the next iteration?",
        options: ["continue", "break", "exit", "return"],
        correct: "continue",
        explanation: "The 'continue' statement bypasses the remaining code inside the loop block for the current cycle."
      },
      node_3: {
        slides: [
          "Collections store sequential values. Arrays declare contiguous blocks of memory of fixed size.",
          "Retrieve items using zero-indexed positions (e.g. array[0] represents the first element).",
          "Dynamic arrays scale sizes automatically, handling insert allocations dynamically.",
          "Validate array index bounds to prevent runtime segmentation faults or index out of range exceptions.",
          "Iterate over collections using enhanced loops or standard range indexes."
        ],
        question: "What is the starting index of elements inside standard array structures?",
        options: ["0", "1", "-1", "Depends on parameters"],
        correct: "0",
        explanation: "Nearly all major programming environments index arrays starting from zero."
      },
      node_4: {
        slides: [
          "Advanced collections map values. Key-value maps associate unique keys to target variables.",
          "Unique sets filter out duplicate inputs automatically, representing mathematical sets.",
          "Ensure keys are immutable to guarantee consistent lookup hashes inside mapping indexes.",
          "Sort collections using sorting algorithms to enable binary searches.",
          "Manage collection sizes to prevent excessive memory allocations."
        ],
        question: "Which collection type automatically filters out duplicate elements, preserving unique values?",
        options: ["Set", "List", "Array", "Dictionary"],
        correct: "Set",
        explanation: "Sets are defined mathematically as collections containing no duplicate values."
      },
      node_6: {
        slides: [
          "Structure code inside reusable modules called functions or methods.",
          "Parameters pass variables into method scopes. Arguments represent actual values passed on invocation.",
          "Declare explicit return types to compile safe interfaces.",
          "Manage variable scopes: local variables are inaccessible outside their parent function blocks.",
          "Recursion occurs when methods call themselves to resolve nested tree computations."
        ],
        question: "What refers to the values passed into functions on invocation?",
        options: ["Arguments", "Parameters", "Return values", "Scopes"],
        correct: "Arguments",
        explanation: "Parameters define the function interface, while Arguments are the actual values passed during calls."
      },
      node_7: {
        slides: [
          "Object-oriented classes bundle data attributes and method behaviors into single templates.",
          "Constructors initialize object properties during instantiation.",
          "Classes define the blueprint; Objects represent active memory allocations of that blueprint.",
          "Encapsulate fields using access modifiers to protect properties from external modifications.",
          "Getter and Setter methods expose properties safely, applying validation checks."
        ],
        question: "What is the relation between Classes and Objects?",
        options: [
          "Classes are blueprints; Objects are instances",
          "Objects are blueprints; Classes are instances",
          "They are identical compilations",
          "Objects cannot possess methods"
        ],
        correct: "Classes are blueprints; Objects are instances",
        explanation: "Classes define schemas; Objects allocate memory for concrete instances of those schemas."
      },
      node_8: {
        slides: [
          "Inheritance enables subclasses to inherit properties and methods of superclasses.",
          "Override methods in subclasses to customize inherited parent behaviors.",
          "Polymorphism allows subclasses to represent parent interfaces, resolving behaviors dynamically.",
          "Abstract classes define method signatures without implementations, forcing child overrides.",
          "Avoid deep inheritance trees to minimize code coupling."
        ],
        question: "What allows subclasses to provide customized implementations of parent class methods?",
        options: ["Overriding", "Overloading", "Encapsulation", "Compilation"],
        correct: "Overriding",
        explanation: "Method Overriding overrides parent behaviors with child-specific definitions."
      },
      node_9: {
        slides: [
          "Exceptions signal runtime execution errors. Capture errors to recover gracefully.",
          "Surround risky code in try-catch scopes. If errors occur, catch blocks execute.",
          "Propagate errors up execution stacks using throw declarations.",
          "Clean up resources (like file streams) inside finally blocks, which always run.",
          "Avoid catching generic Exception types to prevent hiding silent bugs."
        ],
        question: "Which block guarantees execution for resource releases in exception blocks?",
        options: ["finally", "catch", "try", "throw"],
        correct: "finally",
        explanation: "The finally block always executes at the end of try-catch blocks to release descriptors."
      },
      node_11: {
        slides: [
          "Data streams read and write bytes to external filesystems.",
          "Buffer streams group read/write cycles in memory blocks to optimize I/O speed.",
          "Serialize objects to convert runtime memory nodes to persistent streams.",
          "Validate file paths to prevent folder traversal exploits.",
          "Close stream handles to release lock holds in OS environments."
        ],
        question: "What is the benefit of using buffered streams over raw byte streams?",
        options: [
          "Optimizes I/O performance by grouping operations in memory",
          "Encrypts data automatically",
          "Filters duplicates",
          "Bypasses exceptions"
        ],
        correct: "Optimizes I/O performance by grouping operations in memory",
        explanation: "Buffers minimize system call counts, boosting reading and writing speeds."
      },
      node_12: {
        slides: [
          "Interfaces define contracts that classes implement, enforcing consistency.",
          "Generics enable compile-time type safety for collections without code duplication.",
          "Decouple modules to make component parts interchangeable.",
          "Design patterns (like Factory or Singleton) provide template solutions to layout problems.",
          "Document public APIs using annotations to guide developers."
        ],
        question: "What is a major benefit of utilizing Generics in modern class architectures?",
        options: [
          "Compile-time type safety with reusable code structures",
          "Faster runtime speeds",
          "Disabling exceptions",
          "Automatic file writes"
        ],
        correct: "Compile-time type safety with reusable code structures",
        explanation: "Generics check type parameters at compile phase, avoiding runtime casting exceptions."
      },
      node_13: {
        slides: [
          "Compilers translate source files into intermediate bytes or native machine commands.",
          "Runtimes manage memory allocations and schedule execution threads.",
          "Garbage Collection automates releasing memory blocks that lack active references.",
          "Configure environment paths to bind libraries and SDKs.",
          "Analyze build output logs to resolve compiler deprecation warnings."
        ],
        question: "What process releases heap memory blocks that lack active code references?",
        options: ["Garbage Collection", "Compilation", "Subnetting", "One-hot encoding"],
        correct: "Garbage Collection",
        explanation: "Garbage Collection runs in background threads to clean unused heap allocations."
      },
      node_14: {
        slides: [
          "Packaging compiles files into deployable binaries or archive packages.",
          "Configure Rate Limiters on servers to prevent request floods.",
          "Deploy applications within isolated containers to guarantee environment consistency.",
          "Implement log audits on servers to monitor execution statuses.",
          "Keep environment secrets encrypted, loading them via runtime settings."
        ],
        question: "What represents a container benefit during cloud deployments?",
        options: [
          "Guarantees environment consistency across machines",
          "Speeds up sorting algorithms",
          "Rewrites source code files",
          "Bypasses firewalls"
        ],
        correct: "Guarantees environment consistency across machines",
        explanation: "Containers package codes and dependencies, ensuring identical run states."
      }
    },
    checkpoints: {
      node_5: {
        badge: `${course} Core Badge 🛡️`,
        hint: `Unlock ${course} Core Hints 💡`,
        questions: [
          { q: `What is a primary benefit of using ${course}?`, o: ["Structured, readable development paths", "Bypassing hardware limits", "Automatic script generation", "Ignoring compilers"], a: "Structured, readable development paths" },
          { q: "What is the starting index of elements inside standard array structures?", o: ["0", "1", "-1", "Depends on parameters"], a: "0" },
          { q: "Which loop guarantees executing code at least once before checks?", o: ["do-while loop", "for loop", "while loop", "foreach loop"], a: "do-while loop" },
          { q: "Which braces declare arrays standardly?", o: ["[]", "{}", "()", "<>"], a: "[]" },
          { q: "What declares logical AND operators standardly?", o: ["&&", "||", "!", "=="], a: "&&" },
          { q: "What is an infinite loop?", o: ["A loop whose conditional check never evaluates to False", "A loop running in threads", "A loop compiling recursively", "A loop writing files"], a: "A loop whose conditional check never evaluates to False" },
          { q: "Which collection filters out duplicates?", o: ["Set", "List", "Array", "Dictionary"], a: "Set" },
          { q: "What keyword halts loop blocks immediately?", o: ["break", "continue", "pass", "return"], a: "break" },
          { q: "What keyword skips to subsequent iterations?", o: ["continue", "break", "pass", "skip"], a: "continue" },
          { q: "Which logic operator represents logical OR?", o: ["||", "&&", "!", "=="], a: "||" },
          { q: "What resolves compiler syntax errors?", o: ["Fixing code formatting to match environment rules", "Running servers", "Ignoring logs", "Uploading certifications"], a: "Fixing code formatting to match environment rules" },
          { q: "What represents a variable that does not change?", o: ["Constant", "Mutable", "Object", "Array"], a: "Constant" },
          { q: "What represents dynamic arrays?", o: ["Arrays that resize automatically as items are added", "Arrays storing only strings", "Arrays mapped to SQL databases", "Arrays compiled in binary files"], a: "Arrays that resize automatically as items are added" },
          { q: "How do you access element 5 in array 'arr'?", o: ["arr[4]", "arr[5]", "arr.get(5)", "arr[last]"], a: "arr[4]" },
          { q: "What is string concatenation?", o: ["Joining two strings together", "Splitting strings by spaces", "Finding string length", "Deleting strings"], a: "Joining two strings together" },
          { q: "What represents logical negation?", o: ["!", "&&", "||", "=="], a: "!" },
          { q: "Which comparison operator checks values equality?", o: ["==", "=", "!=", "==="], a: "==" },
          { q: "Which type holds single characters standardly?", o: ["char", "string", "int", "boolean"], a: "char" },
          { q: "Which type holds true/false flags?", o: ["boolean", "int", "float", "string"], a: "boolean" },
          { q: "What is a syntax error?", o: ["Code violating compiler spelling/punctuation rules", "Logic error yielding wrong math", "Null pointer crash", "Database network timeout"], a: "Code violating compiler spelling/punctuation rules" }
        ]
      },
      node_10: {
        badge: `${course} Object Badge 🔮`,
        hint: `Unlock ${course} OOP Hints ⚡`,
        questions: [
          { q: "What refers to the values passed into functions on invocation?", o: ["Arguments", "Parameters", "Return values", "Scopes"], a: "Arguments" },
          { q: "What is the relation between Classes and Objects?", o: ["Classes are blueprints; Objects are instances", "Objects are blueprints; Classes are instances", "They are identical compilations", "Objects cannot possess methods"], a: "Classes are blueprints; Objects are instances" },
          { q: "What allows subclasses to provide customized implementations of parent class methods?", o: ["Overriding", "Overloading", "Encapsulation", "Compilation"], a: "Overriding" },
          { q: "Which block guarantees execution for resource releases in exception blocks?", o: ["finally", "catch", "try", "throw"], a: "finally" },
          { q: "What keyword defines child subclasses inheriting parents?", o: ["extends or subclass mapping", "implements", "super", "overrides"], a: "extends or subclass mapping" },
          { q: "What refers to hiding object properties behind private modifiers?", o: ["Encapsulation", "Polymorphism", "Inheritance", "Compilation"], a: "Encapsulation" },
          { q: "What represents method overloading?", o: ["Methods with identical names but different signatures", "Methods calling themselves", "Methods overriding parent interfaces", "Methods throwing errors"], a: "Methods with identical names but different signatures" },
          { q: "What keyword throws exceptions manually?", o: ["throw or raise", "catch", "try", "finally"], a: "throw or raise" },
          { q: "What is the scope of variables created inside methods?", o: ["Local scope", "Class scope", "Package scope", "Global scope"], a: "Local scope" },
          { q: "What method initializes properties on object creation?", o: ["Constructor", "Destructor", "Main method", "Getter"], a: "Constructor" },
          { q: "Which is a valid reference type?", o: ["Class objects", "Primitive integers", "Boolean flags", "Compilation logs"], a: "Class objects" },
          { q: "What happens if a null object reference is dereferenced?", o: ["A Null Pointer Exception occurs", "The program ignores it", "It returns default 0", "Compiler resolves it"], a: "A Null Pointer Exception occurs" },
          { q: "What defines abstract classes?", o: ["Classes that cannot be instantiated, requiring subclasses", "Classes containing only strings", "Classes compiling at runtime only", "Classes bypassing security"], a: "Classes that cannot be instantiated, requiring subclasses" },
          { q: "Which keyword references parent classes?", o: ["super or base", "this", "self", "child"], a: "super or base" },
          { q: "What describes polymorphism?", o: ["Objects representing parent types behaving dynamically", "Objects having multiple constructors", "Encapsulating variables", "Writing file logs"], a: "Objects representing parent types behaving dynamically" },
          { q: "What scope makes properties readable only inside their parent class?", o: ["private", "public", "protected", "default"], a: "private" },
          { q: "What scope makes properties readable by any class?", o: ["public", "private", "protected", "default"], a: "public" },
          { q: "What is local variable shadowing?", o: ["Local variables having identical names as class fields", "Variables deleting class fields", "Variables running in threads", "Compiler errors"], a: "Local variables having identical names as class fields" },
          { q: "What happens during class construction?", o: ["Constructor method executes, allocating attributes", "Garbage collector runs", "Compiler builds binaries", "Ports are binded"], a: "Constructor method executes, allocating attributes" },
          { q: "Which block catches exceptions?", o: ["catch", "try", "finally", "throw"], a: "catch" }
        ]
      },
      node_15: {
        badge: `${course} Master Badge 🚀`,
        hint: `Unlock ${course} Systems Hints 🎁`,
        questions: [
          { q: "What is the benefit of using buffered streams over raw byte streams?", o: ["Optimizes I/O performance by grouping operations in memory", "Encrypts data automatically", "Filters duplicates", "Bypasses exceptions"], a: "Optimizes I/O performance by grouping operations in memory" },
          { q: "What is a major benefit of utilizing Generics in modern class architectures?", o: ["Compile-time type safety with reusable code structures", "Faster runtime speeds", "Disabling exceptions", "Automatic file writes"], a: "Compile-time type safety with reusable code structures" },
          { q: "What process releases heap memory blocks that lack active references?", o: ["Garbage Collection", "Compilation", "Subnetting", "One-hot encoding"], a: "Garbage Collection" },
          { q: "What represents a container benefit during cloud deployments?", o: ["Guarantees environment consistency across machines", "Speeds up sorting algorithms", "Rewrites source code files", "Bypasses firewalls"], a: "Guarantees environment consistency across machines" },
          { q: "Which class maps files on local disks standardly?", o: ["File", "Stream", "Buffer", "Socket"], a: "File" },
          { q: "What defines interfaces?", o: ["Contracts defining method signatures classes must implement", "Classes compiling to CSS templates", "Network ports", "Local variables"], a: "Contracts defining method signatures classes must implement" },
          { q: "What packaging compiles compiled files into single archives?", o: ["JAR/WAR/ZIP packaging", "Prepared statements", "Garbage collection", "Containers"], a: "JAR/WAR/ZIP packaging" },
          { q: "Where are environment secrets loaded standardly?", o: ["Runtime configuration variables", "Source code strings", "Public html templates", "Git repositories"], a: "Runtime configuration variables" },
          { q: "What does thread concurrency manage?", o: ["Running multiple tasks in parallel threads", "Compiling codes faster", "Ignoring errors", "Writing database files"], a: "Running multiple tasks in parallel threads" },
          { q: "What is thread deadlock?", o: ["Threads blocking each other waiting for shared resource releases", "Threads running out of memory", "Threads executing successfully", "Thread termination"], a: "Threads blocking each other waiting for shared resource releases" },
          { q: "Which method reads file bytes into memory?", o: ["InputStream.read()", "System.out.print()", "File.delete()", "Thread.sleep()"], a: "InputStream.read()" },
          { q: "What represents L1/L2 cache?", o: ["Fast memory buffers inside CPU chips", "Disk databases", "Cloud servers", "Browser cookies"], a: "Fast memory buffers inside CPU chips" },
          { q: "What is compilation?", o: ["Translating source files into byte or machine code", "Running servers", "Deleting files", "Connecting ports"], a: "Translating source files into byte or machine code" },
          { q: "What defines runtime?", o: ["The execution phase managing threads and garbage collections", "The code writing phase", "The compile phase", "The security audit phase"], a: "The execution phase managing threads and garbage collections" },
          { q: "What does the compiler output standardly?", o: ["Executable binary or byte class files", "Text source files", "HTML pages", "SQL tables"], a: "Executable binary or byte class files" },
          { q: "Which protocol maps database data?", o: ["SQL", "HTTP", "FTP", "SSH"], a: "SQL" },
          { q: "What represents memory leakage?", o: ["Retaining unused objects in memory, reducing capacity", "Releasing variables too fast", "Writing files too slow", "CPU heat spikes"], a: "Retaining unused objects in memory, reducing capacity" },
          { q: "What prevents database deadlock?", o: ["Maintaining consistent query locking order", "Increasing port sizes", "Disabling threads", "Hashing passwords"], a: "Maintaining consistent query locking order" },
          { q: "What represents rate-limiting?", o: ["Restricting request frequency to prevent overload", "Reducing variable scopes", "Quantizing model sizes", "Compressing assets"], a: "Restricting request frequency to prevent overload" },
          { q: "What is a Singleton design pattern?", o: ["Restricting classes to a single instantiation instance globally", "A class with single methods", "A class compiled once", "A single thread compiler"], a: "Restricting classes to a single instantiation instance globally" }
        ]
      }
    },
    finalQuestions: [
      { q: "What is a primary benefit of using this course?", o: ["Structured, readable development paths", "Bypassing hardware limits", "Automatic script generation", "Ignoring compilers"], a: "Structured, readable development paths" },
      { q: "What is the relation between Classes and Objects?", o: ["Classes are blueprints; Objects are instances", "Objects are blueprints; Classes are instances", "They are identical compilations", "Objects cannot possess methods"], a: "Classes are blueprints; Objects are instances" },
      { q: "What allows subclasses to provide customized implementations of parent class methods?", o: ["Overriding", "Overloading", "Encapsulation", "Compilation"], a: "Overriding" },
      { q: "Which block guarantees execution for resource releases in exception blocks?", o: ["finally", "catch", "try", "throw"], a: "finally" },
      { q: "What is the starting index of elements inside standard array structures?", o: ["0", "1", "-1", "Depends on parameters"], a: "0" },
      { q: "What keyword defines child subclasses inheriting parents?", o: ["extends or subclass mapping", "implements", "super", "overrides"], a: "extends or subclass mapping" },
      { q: "What refers to the values passed into functions on invocation?", o: ["Arguments", "Parameters", "Return values", "Scopes"], a: "Arguments" },
      { q: "What is the benefit of using buffered streams over raw byte streams?", o: ["Optimizes I/O performance by grouping operations in memory", "Encrypts data automatically", "Filters duplicates", "Bypasses exceptions"], a: "Optimizes I/O performance by grouping operations in memory" },
      { q: "What is a major benefit of utilizing Generics in modern class architectures?", o: ["Compile-time type safety with reusable code structures", "Faster runtime speeds", "Disabling exceptions", "Automatic file writes"], a: "Compile-time type safety with reusable code structures" },
      { q: "What process releases heap memory blocks that lack active references?", o: ["Garbage Collection", "Compilation", "Subnetting", "One-hot encoding"], a: "Garbage Collection" },
      { q: "What represents a container benefit during cloud deployments?", o: ["Guarantees environment consistency across machines", "Speeds up sorting algorithms", "Rewrites source code files", "Bypasses firewalls"], a: "Guarantees environment consistency across machines" },
      { q: "Which braces declare arrays standardly?", o: ["[]", "{}", "()", "<>"], a: "[]" },
      { q: "What represents dynamic arrays?", o: ["Arrays that resize automatically as items are added", "Arrays storing only strings", "Arrays mapped to SQL databases", "Arrays compiled in binary files"], a: "Arrays that resize automatically as items are added" },
      { q: "Which scope makes properties readable only inside their parent class?", o: ["private", "public", "protected", "default"], a: "private" },
      { q: "What packaging compiles compiled files into single archives?", o: ["JAR/WAR/ZIP packaging", "Prepared statements", "Garbage collection", "Containers"], a: "JAR/WAR/ZIP packaging" }
    ]
  };
};
