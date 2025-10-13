"use client"

import { motion } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

const experiences = [
  {
    title: "Independent Trader",
    company: "Self Employed",
    period: "Sep 2024 - Present",
    description:
      "Engineered quantitative trading strategies across equities, derivatives, and forex, consistently achieving positive risk-adjusted returns. Developed proprietary AI trading bots, enhancing execution speed and strategy accuracy in volatile conditions. Applied macroeconomic & microeconomic research to capture high-value trading opportunities. Implemented risk frameworks and portfolio optimization models to balance exposure and maximize returns.",
  },
  {
    title: "Data Analyst",
    company: "Futurestic",
    period: "Sep 2024 - Feb 2025",
    description:
      "Designed predictive models, dashboards, and automation pipelines using Python, SQL, and Tableau. Delivered actionable insights that supported growth in renewable energy and eCommerce sectors. Reduced reporting turnaround by 30%, minimizing errors and empowering data-driven decision-making.",
  },
  {
    title: "Quantitative Analyst",
    company: "Mudraksh & McShaw Advisory",
    period: "Dec 2023 - Aug 2024",
    description:
      "Increased financial forecast accuracy by 15% using ML-driven time-series models. Applied Monte Carlo simulations to evaluate volatility and optimize risk-adjusted strategies. Automated financial analysis workflows in Python & Excel, improving reporting efficiency by 20%.",
  },
  {
    title: "Tech Lead & Coordinator",
    company: "STEM Club, Presidency University",
    period: "Jun 2023 - Dec 2024",
    description: "Organized workshops for over 150+ students and represented the club at Founder's Day with 60 founders. Led technical initiatives and coordinated club activities.",
  },
]

export function Timeline() {
  const isMobile = useMobile()

  return (
    <div
      className={`space-y-12 relative ${
        !isMobile
          ? "before:absolute before:inset-0 before:left-1/2 before:ml-0 before:-translate-x-px before:border-l-2 before:border-zinc-700 before:h-full before:z-0"
          : ""
      }`}
    >
      {experiences.map((experience, index) => (
        <div
          key={index}
          className={`relative z-10 flex items-center ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"}`}
        >
          <motion.div
            className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:pl-10" : "md:pr-10"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-xl bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-6 transition-all duration-300 hover:border-phthalo-500/50">
              <div className="absolute -inset-1 bg-gradient-to-r from-phthalo-500/10 to-phthalo-700/10 rounded-xl blur opacity-25 hover:opacity-100 transition duration-1000 hover:duration-200"></div>

              <div className="relative">
                <h3 className="text-xl font-bold">{experience.title}</h3>
                <div className="text-zinc-400 mb-4">
                  {experience.company} | {experience.period}
                </div>
                <p className="text-zinc-300">{experience.description}</p>
              </div>
            </div>
          </motion.div>

          {!isMobile && (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
              <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-r from-phthalo-600 to-phthalo-800 z-10 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-2 h-2 rounded-full bg-white"></div>
              </motion.div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
