'use client'

import React from 'react'
import KategoriBisnis from '@/app/components/kamus/KategoriBisnis'
import { Briefcase } from 'lucide-react'
import PatternBackground from '@/app/components/nusantara/PatternBackground'
import NusantaraCanvas from '@/app/components/nusantara/NusantaraCanvas'
import WayangModel from '@/app/components/nusantara/WayangModel'
import { Canvas } from '@react-three/fiber'
import usePrefersReducedMotion from '@/app/hooks/usePrefersReducedMotion'

export default function Page() {
	const reduced = usePrefersReducedMotion()

	return (
		<div className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-red-50">
			<PatternBackground />

			<header className="relative overflow-hidden">
				<div className="absolute inset-0">
					<NusantaraCanvas height={240} reducedMotion={reduced} className="opacity-80" />
				</div>
				<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
						<div className="flex items-start gap-4">
							<div className="p-3 bg-white/30 backdrop-blur rounded-xl ring-1 ring-white/40">
								<Briefcase className="h-8 w-8 text-amber-800" />
							</div>
							<div>
								<h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-amber-700 via-rose-700 to-red-700 bg-clip-text text-transparent">
									Kategori Hukum Bisnis
								</h1>
								<p className="text-sm sm:text-base text-gray-700">
									Statistik, ringkasan, dan sorotan topik seputar hukum bisnis di Indonesia
								</p>
								<div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-red-500" />
							</div>
						</div>

						{!reduced && (
							<div className="relative h-48 sm:h-56 md:h-48 lg:h-56">
								<div className="absolute inset-0 rounded-xl ring-1 ring-amber-200/60 shadow-[0_0_60px_-15px_rgba(234,179,8,0.45)]" />
								<Canvas camera={{ position: [0.8, 0.5, 1.6], fov: 45 }}>
									<ambientLight intensity={0.8} />
									<directionalLight position={[2, 3, 2]} intensity={1} />
									<group position={[0, -0.1, 0]}>
										<WayangModel scale={1.1} pointerIntensity={0.1} />
									</group>
								</Canvas>
							</div>
						)}
					</div>
				</div>
			</header>

			<main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
				<div className="rounded-2xl bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-xl ring-1 ring-gray-200/70">
					<KategoriBisnis />
				</div>
			</main>
		</div>
	)
}
