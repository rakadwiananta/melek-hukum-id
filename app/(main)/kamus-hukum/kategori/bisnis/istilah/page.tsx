'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Briefcase, TrendingUp, Building, ScrollText } from 'lucide-react'
import Link from 'next/link'

// Batik Pattern Component
const BatikPattern = ({ className = "" }: { className?: string }) => (
	<svg 
		className={`absolute inset-0 w-full h-full opacity-5 ${className}`} 
		preserveAspectRatio="xMidYMid slice"
	>
		<defs>
			<pattern id="batik-pattern-istilah" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
				<circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
				<circle cx="75" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
				<circle cx="25" cy="75" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
				<circle cx="75" cy="75" r="20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
				<path d="M25,25 L75,75 M75,25 L25,75" stroke="currentColor" strokeWidth="0.3"/>
			</pattern>
		</defs>
		<rect width="100%" height="100%" fill="url(#batik-pattern-istilah)" />
	</svg>
)

// Enhanced Loading Component
const LoadingState = () => (
	<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center">
		<div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 relative overflow-hidden">
			<BatikPattern className="text-emerald-300" />
			<div className="relative z-10 flex flex-col items-center">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
					className="mb-4"
				>
					<div className="p-4 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl">
						<Briefcase className="h-12 w-12 text-white" />
					</div>
				</motion.div>
				<motion.div
					animate={{ opacity: [0.5, 1, 0.5] }}
					transition={{ duration: 1.5, repeat: Infinity }}
					className="flex items-center gap-2"
				>
					<Loader2 className="h-5 w-5 text-emerald-600 animate-spin" />
					<span className="text-lg font-semibold text-gray-700">Memuat Kamus Istilah Bisnis...</span>
				</motion.div>
				<div className="mt-4 flex gap-2">
					{[0, 0.2, 0.4].map((delay, i) => (
						<motion.div
							key={i}
							className="w-2 h-2 bg-emerald-500 rounded-full"
							animate={{ scale: [1, 1.5, 1] }}
							transition={{ duration: 1, delay, repeat: Infinity }}
						/>
					))}
				</div>
			</div>
		</div>
	</div>
)

// Dynamic import dengan loading state yang lebih baik
const IstilahBisnisComponent = dynamic(
	() => import('@/app/components/kamus/istilah/IstilahBisnisComponent'),
	{
		loading: () => <LoadingState />,
		ssr: false,
	}
)

// Floating decoration component
const FloatingElement = ({ delay = 0, children }: { delay?: number; children: React.ReactNode }) => (
	<motion.div
		initial={{ y: 0 }}
		animate={{ 
			y: [-10, 10, -10],
			rotate: [-3, 3, -3]
		}}
		transition={{
			delay,
			duration: 4,
			repeat: Infinity,
			ease: "easeInOut"
		}}
	>
		{children}
	</motion.div>
)

export default function Page() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 relative overflow-hidden">
			{/* Background Pattern */}
			<BatikPattern className="text-emerald-900" />
			
			{/* Animated Background Elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<motion.div
					animate={{ 
						x: [0, 100, 0],
						y: [0, -100, 0],
					}}
					transition={{ duration: 20, repeat: Infinity }}
					className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-emerald-200 to-blue-200 rounded-full blur-3xl opacity-20"
				/>
				<motion.div
					animate={{ 
						x: [0, -100, 0],
						y: [0, 100, 0],
					}}
					transition={{ duration: 25, repeat: Infinity }}
					className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-200 to-emerald-200 rounded-full blur-3xl opacity-20"
				/>
			</div>

			{/* Breadcrumb Navigation */}
			<div className="relative z-10 bg-white/80 backdrop-blur-sm border-b border-emerald-100">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
					<nav className="flex items-center gap-2 text-sm">
						<Link href="/kamus-hukum" className="text-gray-500 hover:text-emerald-600 transition-colors">
							Kamus Hukum
						</Link>
						<span className="text-gray-400">/</span>
						<Link href="/kamus-hukum/kategori/bisnis" className="text-gray-500 hover:text-emerald-600 transition-colors">
							Bisnis
						</Link>
						<span className="text-gray-400">/</span>
						<span className="text-emerald-600 font-semibold">Istilah</span>
					</nav>
				</div>
			</div>

			{/* Quick Access Icons */}
			<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
				<div className="flex justify-center gap-4">
					<FloatingElement delay={0}>
						<div className="p-3 bg-white rounded-xl shadow-lg border border-emerald-100">
							<Building className="h-6 w-6 text-emerald-600" />
						</div>
					</FloatingElement>
					<FloatingElement delay={0.5}>
						<div className="p-3 bg-white rounded-xl shadow-lg border border-blue-100">
							<ScrollText className="h-6 w-6 text-blue-600" />
						</div>
					</FloatingElement>
					<FloatingElement delay={1}>
						<div className="p-3 bg-white rounded-xl shadow-lg border border-purple-100">
							<TrendingUp className="h-6 w-6 text-purple-600" />
						</div>
					</FloatingElement>
				</div>
			</div>

			{/* Main Content */}
			<div className="relative z-10">
				<Suspense fallback={<LoadingState />}>
					<IstilahBisnisComponent />
				</Suspense>
			</div>
		</div>
	)
}
