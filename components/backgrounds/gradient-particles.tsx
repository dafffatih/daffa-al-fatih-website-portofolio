"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { motion } from "framer-motion"

interface MousePosition {
    x: number
    y: number
}

interface LightParticle {
    id: number
    size: number
    y: number
    duration: number
    delay: number
    opacity: number
    color: string
}

interface GradientLayer {
    id: number
    color: string
    size: number
    x: number
    y: number
    blur: number
}

export function GradientParticles() {
    const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
    const [smoothPosition, setSmoothPosition] = useState<MousePosition>({ x: 0, y: 0 })
    const animationRef = useRef<number | null>(null)

    // Layered gradient backgrounds for depth - MORE VISIBLE with vibrant colors
    const gradientLayers = useMemo<GradientLayer[]>(() => [
        // Deep purple/pink like reference image 1
        { id: 1, color: "rgba(219, 39, 119, 0.45)", size: 900, x: -10, y: -5, blur: 100 },
        // Coral/orange glow
        { id: 2, color: "rgba(251, 146, 60, 0.35)", size: 700, x: 70, y: 5, blur: 90 },
        // Deep blue like reference image 2
        { id: 3, color: "rgba(59, 130, 246, 0.40)", size: 1000, x: 50, y: 40, blur: 110 },
        // Magenta/pink accent
        { id: 4, color: "rgba(236, 72, 153, 0.38)", size: 800, x: 80, y: 60, blur: 95 },
        // Purple depth
        { id: 5, color: "rgba(139, 92, 246, 0.42)", size: 850, x: 20, y: 70, blur: 100 },
        // Cyan/teal accent like reference image 3
        { id: 6, color: "rgba(34, 211, 238, 0.30)", size: 600, x: 40, y: 20, blur: 80 },
    ], [])

    // Small floating light particles
    const particles = useMemo<LightParticle[]>(() => {
        const colors = [
            "rgba(244, 114, 182, 0.6)", // pink
            "rgba(96, 165, 250, 0.5)",  // blue
            "rgba(52, 211, 153, 0.5)",  // green
            "rgba(167, 139, 250, 0.5)", // purple
            "rgba(251, 191, 36, 0.4)",  // amber
            "rgba(255, 255, 255, 0.6)", // white
        ]

        return Array.from({ length: 35 }, (_, i) => ({
            id: i,
            size: Math.random() * 4 + 2, // 2-6px
            y: Math.random() * 100,
            duration: Math.random() * 30 + 25, // 25-55s (very slow)
            delay: Math.random() * 20,
            opacity: Math.random() * 0.4 + 0.2,
            color: colors[Math.floor(Math.random() * colors.length)],
        }))
    }, [])

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Smooth lerp animation for mouse follower
    useEffect(() => {
        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor
        }

        const animate = () => {
            setSmoothPosition(prev => ({
                x: lerp(prev.x, mousePosition.x, 0.05),
                y: lerp(prev.y, mousePosition.y, 0.05)
            }))
            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [mousePosition])

    return (
        <>
            {/* Layered gradient backgrounds for depth */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {gradientLayers.map((layer) => (
                    <motion.div
                        key={layer.id}
                        className="absolute rounded-full"
                        style={{
                            width: layer.size,
                            height: layer.size,
                            left: `${layer.x}%`,
                            top: `${layer.y}%`,
                            background: `radial-gradient(circle, ${layer.color} 0%, transparent 70%)`,
                            filter: `blur(${layer.blur}px)`,
                        }}
                        animate={{
                            x: [0, 150, -100, 200, -50, 0],
                            y: [0, -100, 150, -50, 100, 0],
                            scale: [1, 1.3, 0.9, 1.2, 0.95, 1],
                            opacity: [0.6, 0.9, 0.5, 0.8, 0.7, 0.6],
                        }}
                        transition={{
                            duration: 15 + layer.id * 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Small floating light particles moving left to right */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className="absolute rounded-full"
                        style={{
                            width: particle.size,
                            height: particle.size,
                            top: `${particle.y}%`,
                            left: "-5%",
                            background: particle.color,
                            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                        }}
                        animate={{
                            x: ["0vw", "110vw"],
                            opacity: [0, particle.opacity, particle.opacity, 0],
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            ease: "linear",
                            times: [0, 0.1, 0.9, 1], // fade in at start, fade out at end
                        }}
                    />
                ))}
            </div>

            {/* Floating sparkle particles (smaller, faster fade) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 20 }, (_, i) => (
                    <motion.div
                        key={`sparkle-${i}`}
                        className="absolute rounded-full bg-white"
                        style={{
                            width: Math.random() * 2 + 1,
                            height: Math.random() * 2 + 1,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            boxShadow: "0 0 4px rgba(255,255,255,0.8)",
                        }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1.2, 0.5],
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            delay: Math.random() * 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Subtle mouse follower gradient */}
            <motion.div
                className="fixed pointer-events-none z-[1]"
                style={{
                    left: smoothPosition.x - 100,
                    top: smoothPosition.y - 100,
                }}
            >
                <div
                    className="w-[200px] h-[200px] rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(244,114,182,0.08) 0%, rgba(192,132,252,0.05) 40%, transparent 70%)",
                        filter: "blur(40px)",
                    }}
                />
            </motion.div>
        </>
    )
}
