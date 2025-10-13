"use client"

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { motion } from "framer-motion"

interface AnalyticsChartsProps {
  personaData: { name: string; value: number; color: string }[]
  paymentData: { name: string; value: number; color: string }[]
  goalData: { name: string; value: number }[]
  timeData: { name: string; value: number }[]
}

export function AnalyticsCharts({ personaData, paymentData, goalData, timeData }: AnalyticsChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Persona Distribution */}
      <ChartCard title="Persona Distribution" delay={0}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={personaData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {personaData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Payment Willingness */}
      <ChartCard title="Payment Willingness" delay={0.1}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={paymentData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {paymentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Main Goals */}
      <ChartCard title="Main Goals" delay={0.2}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={goalData}>
            <XAxis dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
            <YAxis tick={{ fill: '#a1a1aa' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#18181b', 
                border: '1px solid #3f3f46',
                borderRadius: '8px'
              }}
              cursor={{ fill: 'rgba(38, 128, 74, 0.1)' }}
            />
            <Bar dataKey="value" fill="#26804A" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Time Commitment */}
      <ChartCard title="Weekly Time Commitment" delay={0.3}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={timeData}>
            <XAxis dataKey="name" tick={{ fill: '#a1a1aa', fontSize: 12 }} />
            <YAxis tick={{ fill: '#a1a1aa' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#18181b', 
                border: '1px solid #3f3f46',
                borderRadius: '8px'
              }}
              cursor={{ fill: 'rgba(38, 128, 74, 0.1)' }}
            />
            <Bar dataKey="value" fill="#26804A" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}

function ChartCard({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-zinc-900 border border-zinc-800 rounded-xl p-6"
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      {children}
    </motion.div>
  )
}