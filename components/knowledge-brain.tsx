"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Brain } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

// Knowledge domain data structure with brain regions
const knowledgeDomains = {
  mathematics: {
    id: "mathematics",
    name: "Mathematics",
    icon: "🧮",
    color: "#22c55e",
    region: "frontal-left",
    description: "Logical reasoning and mathematical computation",
    nodes: [
      { id: "calculus", name: "Calculus", description: "Differential and integral calculus, limits, derivatives" },
      { id: "linear-algebra", name: "Linear Algebra", description: "Vector spaces, matrices, eigenvalues" },
      { id: "real-analysis", name: "Real Analysis", description: "Mathematical proofs, convergence, continuity" },
      { id: "abstract-algebra", name: "Abstract Algebra", description: "Groups, rings, fields, algebraic structures" },
      { id: "topology", name: "Topology", description: "Continuous deformations, topological spaces" },
      { id: "statistics", name: "Statistics", description: "Probability theory, statistical inference" },
    ],
  },
  ai: {
    id: "ai",
    name: "AI & ML",
    icon: "🤖",
    color: "#16a34a",
    region: "frontal-right",
    description: "Artificial intelligence and machine learning",
    nodes: [
      { id: "deep-learning", name: "Deep Learning", description: "Neural networks, CNNs, RNNs, transformers" },
      { id: "machine-learning", name: "Machine Learning", description: "Supervised/unsupervised learning, algorithms" },
      { id: "nlp", name: "NLP", description: "Natural language processing, text analysis" },
      { id: "computer-vision", name: "Computer Vision", description: "Image processing, object detection" },
      { id: "reinforcement-learning", name: "RL", description: "Reinforcement learning, Q-learning" },
      { id: "llms", name: "LLMs", description: "Large language models, GPT, BERT" },
    ],
  },
  trading: {
    id: "trading",
    name: "Trading & Finance",
    icon: "📈",
    color: "#15803d",
    region: "parietal-right",
    description: "Financial markets and quantitative trading",
    nodes: [
      { id: "algorithmic-trading", name: "Algo Trading", description: "Automated trading systems, strategies" },
      { id: "quantitative-analysis", name: "Quant Analysis", description: "Mathematical models for finance" },
      { id: "risk-management", name: "Risk Management", description: "Portfolio optimization, VaR" },
      { id: "derivatives", name: "Derivatives", description: "Options, futures, swaps pricing" },
      { id: "market-microstructure", name: "Market Structure", description: "Order books, market making" },
      { id: "blockchain", name: "Blockchain", description: "Cryptocurrency, DeFi protocols" },
    ],
  },
  software: {
    id: "software",
    name: "Software Development",
    icon: "💻",
    color: "#14532d",
    region: "temporal-right",
    description: "Software engineering and development",
    nodes: [
      { id: "frontend", name: "Frontend", description: "React, Next.js, TypeScript, UI/UX" },
      { id: "backend", name: "Backend", description: "Node.js, APIs, databases, microservices" },
      { id: "devops", name: "DevOps", description: "Docker, AWS, CI/CD, infrastructure" },
      { id: "mobile", name: "Mobile Dev", description: "React Native, iOS, Android development" },
      { id: "web3", name: "Web3", description: "Smart contracts, dApps, Ethereum" },
      { id: "architecture", name: "Architecture", description: "System design, scalability patterns" },
    ],
  },
  sciences: {
    id: "sciences",
    name: "Natural Sciences",
    icon: "🔬",
    color: "#10b981",
    region: "parietal-left",
    description: "Physics, chemistry, and natural phenomena",
    nodes: [
      { id: "physics", name: "Physics", description: "Quantum mechanics, thermodynamics" },
      { id: "chemistry", name: "Chemistry", description: "Organic, inorganic, physical chemistry" },
      { id: "biology", name: "Biology", description: "Molecular biology, genetics, biochemistry" },
      { id: "neuroscience", name: "Neuroscience", description: "Brain function, neural networks" },
      { id: "bioinformatics", name: "Bioinformatics", description: "Computational biology, genomics" },
      { id: "materials", name: "Materials Science", description: "Nanotechnology, advanced materials" },
    ],
  },
  medtech: {
    id: "medtech",
    name: "Medical Technology",
    icon: "🏥",
    color: "#059669",
    region: "temporal-left",
    description: "Healthcare technology and medical devices",
    nodes: [
      { id: "medical-imaging", name: "Medical Imaging", description: "MRI, CT, ultrasound technology" },
      { id: "biomedical-engineering", name: "Biomedical Eng", description: "Medical devices, prosthetics" },
      { id: "digital-health", name: "Digital Health", description: "Telemedicine, health apps" },
      { id: "drug-discovery", name: "Drug Discovery", description: "Pharmaceutical research, AI in drug dev" },
      { id: "genomics", name: "Genomics", description: "Gene therapy, personalized medicine" },
      { id: "medical-ai", name: "Medical AI", description: "Diagnostic AI, medical decision support" },
    ],
  },
  business: {
    id: "business",
    name: "Business & Entrepreneurship",
    icon: "🚀",
    color: "#047857",
    region: "occipital",
    description: "Business strategy and entrepreneurship",
    nodes: [
      { id: "startup", name: "Startup Strategy", description: "Business models, MVP development" },
      { id: "product-management", name: "Product Management", description: "Product strategy, roadmaps" },
      { id: "venture-capital", name: "Venture Capital", description: "Investment, funding strategies" },
      { id: "marketing", name: "Digital Marketing", description: "Growth hacking, analytics" },
      { id: "operations", name: "Operations", description: "Process optimization, scaling" },
      { id: "leadership", name: "Leadership", description: "Team building, strategic thinking" },
    ],
  },
}

// More realistic brain regions with detailed paths
const brainRegions = {
  "frontal-left": {
    path: "M200 180 Q220 140 260 130 Q300 125 340 135 Q370 145 380 170 Q385 190 375 210 Q365 230 340 240 Q310 245 280 240 Q250 235 220 220 Q200 200 200 180 Z",
    center: { x: 290, y: 185 },
    nodePositions: [
      { x: 270, y: 160 },
      { x: 310, y: 155 },
      { x: 340, y: 175 },
      { x: 320, y: 200 },
      { x: 280, y: 210 },
      { x: 250, y: 190 },
    ],
  },
  "frontal-right": {
    path: "M420 170 Q430 145 460 135 Q500 125 540 130 Q580 140 600 180 Q600 200 590 220 Q580 235 550 240 Q520 245 490 240 Q460 230 440 210 Q425 190 420 170 Z",
    center: { x: 510, y: 185 },
    nodePositions: [
      { x: 480, y: 155 },
      { x: 520, y: 160 },
      { x: 550, y: 175 },
      { x: 530, y: 200 },
      { x: 490, y: 210 },
      { x: 460, y: 190 },
    ],
  },
  "parietal-left": {
    path: "M220 220 Q200 240 205 270 Q215 300 240 320 Q270 335 300 330 Q330 325 350 310 Q365 290 360 270 Q355 250 340 240 Q310 245 280 240 Q250 235 220 220 Z",
    center: { x: 285, y: 285 },
    nodePositions: [
      { x: 250, y: 260 },
      { x: 290, y: 255 },
      { x: 320, y: 270 },
      { x: 315, y: 300 },
      { x: 275, y: 310 },
      { x: 240, y: 295 },
    ],
  },
  "parietal-right": {
    path: "M440 240 Q455 250 460 270 Q465 290 480 310 Q505 325 535 330 Q565 335 595 320 Q615 300 610 270 Q605 240 590 220 Q580 235 550 240 Q520 245 490 240 Q465 230 440 240 Z",
    center: { x: 525, y: 285 },
    nodePositions: [
      { x: 480, y: 260 },
      { x: 520, y: 255 },
      { x: 560, y: 270 },
      { x: 555, y: 300 },
      { x: 515, y: 310 },
      { x: 480, y: 295 },
    ],
  },
  "temporal-left": {
    path: "M240 320 Q215 340 220 370 Q230 400 255 420 Q285 435 315 430 Q340 425 355 405 Q365 385 360 365 Q355 345 340 335 Q315 340 290 345 Q265 340 240 320 Z",
    center: { x: 300, y: 375 },
    nodePositions: [
      { x: 270, y: 350 },
      { x: 310, y: 345 },
      { x: 335, y: 365 },
      { x: 325, y: 395 },
      { x: 285, y: 405 },
      { x: 255, y: 385 },
    ],
  },
  "temporal-right": {
    path: "M480 335 Q505 345 520 365 Q535 385 545 405 Q560 425 585 430 Q615 435 645 420 Q670 400 675 370 Q680 340 655 320 Q630 340 605 345 Q580 340 555 335 Q530 340 505 345 Q480 340 480 335 Z",
    center: { x: 575, y: 375 },
    nodePositions: [
      { x: 520, y: 360 },
      { x: 560, y: 355 },
      { x: 600, y: 365 },
      { x: 610, y: 395 },
      { x: 570, y: 405 },
      { x: 530, y: 385 },
    ],
  },
  occipital: {
    path: "M355 405 Q365 385 380 375 Q400 370 420 375 Q440 385 445 405 Q450 425 440 445 Q425 460 405 465 Q385 460 370 445 Q360 425 355 405 Z",
    center: { x: 400, y: 420 },
    nodePositions: [
      { x: 380, y: 395 },
      { x: 420, y: 395 },
      { x: 425, y: 420 },
      { x: 410, y: 445 },
      { x: 390, y: 445 },
      { x: 375, y: 420 },
    ],
  },
}

// Node connections within each domain
const nodeConnections = {
  mathematics: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [0, 3],
    [1, 4],
    [2, 5],
  ],
  ai: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [0, 2],
    [1, 3],
    [2, 4],
  ],
  trading: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [0, 3],
    [1, 4],
    [2, 5],
  ],
  software: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [0, 2],
    [1, 3],
    [2, 4],
  ],
  sciences: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [0, 3],
    [1, 4],
    [2, 5],
  ],
  medtech: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [0, 2],
    [1, 3],
    [2, 4],
  ],
  business: [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [0, 3],
    [1, 4],
    [2, 5],
  ],
}

interface Node {
  id: string
  name: string
  description: string
}

interface Domain {
  id: string
  name: string
  icon: string
  color: string
  region: string
  description: string
  nodes: Node[]
}

export function KnowledgeBrain() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  const handleDomainClick = (domainId: string) => {
    setSelectedDomain(selectedDomain === domainId ? null : domainId)
    setSelectedNode(null)
  }

  const handleNodeClick = (node: Node) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node)
  }

  return (
    <div className="space-y-16">
      <SectionHeading title="Knowledge Neural Network" subtitle="My interconnected expertise domains" />

      {/* Brain Visualization */}
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-sm border border-zinc-700/50 p-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-phthalo-500/20 to-phthalo-700/20 rounded-2xl blur opacity-50"></div>

          <div className="relative">
            {/* Brain SVG Container */}
            <div className="w-full h-[600px] relative">
              <svg
                ref={svgRef}
                viewBox="0 0 800 600"
                className="w-full h-full"
                style={{ filter: "drop-shadow(0 0 20px rgba(18, 53, 36, 0.3))" }}
              >
                <defs>
                  {/* Gradients for each brain region */}
                  {Object.values(knowledgeDomains).map((domain) => (
                    <radialGradient
                      key={`gradient-${domain.id}`}
                      id={`gradient-${domain.id}`}
                      cx="50%"
                      cy="50%"
                      r="50%"
                    >
                      <stop offset="0%" stopColor={`${domain.color}60`} />
                      <stop offset="100%" stopColor={`${domain.color}20`} />
                    </radialGradient>
                  ))}

                  {/* Glow filters */}
                  {Object.values(knowledgeDomains).map((domain) => (
                    <filter
                      key={`glow-${domain.id}`}
                      id={`glow-${domain.id}`}
                      x="-50%"
                      y="-50%"
                      width="200%"
                      height="200%"
                    >
                      <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  ))}
                </defs>

                {/* Detailed brain outline with folds and curves */}
                <path
                  d="M180 200 Q190 150 230 130 Q280 110 340 115 Q400 110 460 115 Q520 110 570 130 Q610 150 620 200 Q625 230 615 260 Q605 290 585 320 Q565 350 535 375 Q505 400 470 415 Q435 425 400 425 Q365 425 330 415 Q295 400 265 375 Q235 350 215 320 Q195 290 185 260 Q175 230 180 200 Z"
                  fill="none"
                  stroke="rgba(34, 197, 94, 0.6)"
                  strokeWidth="3"
                  className="animate-pulse"
                />

                {/* Brain folds and details */}
                <path
                  d="M250 160 Q300 150 350 155 Q400 150 450 155 Q500 150 550 160"
                  stroke="rgba(34, 197, 94, 0.3)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M230 220 Q280 210 330 215 Q380 210 430 215 Q480 210 530 220"
                  stroke="rgba(34, 197, 94, 0.3)"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M240 280 Q290 270 340 275 Q390 270 440 275 Q490 270 540 280"
                  stroke="rgba(34, 197, 94, 0.3)"
                  strokeWidth="2"
                  fill="none"
                />

                {/* Central division line (corpus callosum) */}
                <path
                  d="M400 130 Q400 200 400 270 Q400 340 400 410"
                  stroke="rgba(34, 197, 94, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="8,4"
                  className="animate-pulse"
                />

                {/* Brain regions */}
                {Object.values(knowledgeDomains).map((domain) => {
                  const region = brainRegions[domain.region as keyof typeof brainRegions]
                  const isHovered = hoveredDomain === domain.id
                  const isSelected = selectedDomain === domain.id

                  return (
                    <g key={domain.id}>
                      {/* Brain region */}
                      <motion.path
                        d={region.path}
                        fill={`url(#gradient-${domain.id})`}
                        stroke={domain.color}
                        strokeWidth={isSelected ? "3" : "2"}
                        className="cursor-pointer transition-all duration-300"
                        onClick={() => handleDomainClick(domain.id)}
                        onMouseEnter={() => setHoveredDomain(domain.id)}
                        onMouseLeave={() => setHoveredDomain(null)}
                        style={{
                          filter: isHovered || isSelected ? `url(#glow-${domain.id})` : "none",
                          opacity: isHovered || isSelected ? 0.9 : 0.6,
                        }}
                        animate={{
                          strokeWidth: isSelected ? 3 : 2,
                        }}
                      />

                      {/* Region label */}
                      <text
                        x={region.center.x}
                        y={region.center.y - 50}
                        textAnchor="middle"
                        fill="white"
                        fontSize="11"
                        fontWeight="bold"
                        className="pointer-events-none"
                      >
                        {domain.icon} {domain.name}
                      </text>

                      {/* Nodes and connections within the region */}
                      {isSelected && (
                        <g>
                          {/* Node connections */}
                          {nodeConnections[domain.id as keyof typeof nodeConnections].map(([from, to], connIndex) => (
                            <motion.line
                              key={`${domain.id}-conn-${connIndex}`}
                              x1={region.nodePositions[from].x}
                              y1={region.nodePositions[from].y}
                              x2={region.nodePositions[to].x}
                              y2={region.nodePositions[to].y}
                              stroke={domain.color}
                              strokeWidth="2"
                              opacity="0.6"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.5, delay: connIndex * 0.1 }}
                            />
                          ))}

                          {/* Nodes */}
                          {domain.nodes.map((node, nodeIndex) => {
                            const nodePos = region.nodePositions[nodeIndex]
                            return (
                              <motion.circle
                                key={node.id}
                                cx={nodePos.x}
                                cy={nodePos.y}
                                r="8"
                                fill={domain.color}
                                stroke="white"
                                strokeWidth="2"
                                className="cursor-pointer"
                                onClick={() => handleNodeClick(node)}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.3, delay: nodeIndex * 0.1 }}
                                whileHover={{ scale: 1.3 }}
                                style={{
                                  filter:
                                    selectedNode?.id === node.id ? `drop-shadow(0 0 10px ${domain.color})` : "none",
                                }}
                              />
                            )
                          })}
                        </g>
                      )}
                    </g>
                  )
                })}

                {/* Neural activity particles */}
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.circle
                    key={`neural-${i}`}
                    r="2"
                    fill="rgba(34, 197, 94, 0.8)"
                    initial={{
                      cx: 200 + ((i * 50) % 400),
                      cy: 180 + ((i * 30) % 250),
                      opacity: 0,
                    }}
                    animate={{
                      cx: 200 + ((i * 50 + 100) % 400),
                      cy: 180 + ((i * 30 + 50) % 250),
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.4,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </svg>

              {/* Interaction hints */}
              <div className="absolute bottom-4 left-4 text-sm text-zinc-400">
                <p>🧠 Click on brain regions to explore neural networks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Domain Legend */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {Object.values(knowledgeDomains).map((domain) => (
            <motion.div
              key={domain.id}
              className={`relative overflow-hidden rounded-lg bg-zinc-800/50 backdrop-blur-sm border p-4 cursor-pointer transition-all duration-300 ${
                selectedDomain === domain.id
                  ? "border-phthalo-500/50 bg-zinc-700/50"
                  : "border-zinc-700/50 hover:border-zinc-600/50"
              }`}
              onClick={() => handleDomainClick(domain.id)}
              onMouseEnter={() => setHoveredDomain(domain.id)}
              onMouseLeave={() => setHoveredDomain(null)}
              whileHover={{ y: -2 }}
              style={{
                borderColor: selectedDomain === domain.id ? domain.color : undefined,
                boxShadow: hoveredDomain === domain.id ? `0 0 20px ${domain.color}40` : "none",
              }}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">{domain.icon}</div>
                <div className="text-sm font-medium text-white">{domain.name}</div>
                <div className="text-xs text-zinc-400 mt-1">{domain.nodes.length} topics</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Node Details */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedNode(null)}
          >
            <motion.div
              className="relative max-w-md w-full bg-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 rounded-xl p-6"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-phthalo-500/20 to-phthalo-700/20 rounded-xl blur opacity-50"></div>

              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{selectedNode.name}</h3>
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-zinc-300 leading-relaxed">{selectedNode.description}</p>

                <div className="mt-6 flex items-center gap-2 text-sm text-phthalo-400">
                  <Brain className="h-4 w-4" />
                  <span>Part of my neural knowledge network</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
