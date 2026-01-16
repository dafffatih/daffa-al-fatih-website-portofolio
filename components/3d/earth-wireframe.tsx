"use client"

import { Canvas } from "@react-three/fiber"
import { Stars } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { useTheme } from "@/components/providers/theme-provider"
import { useEffect, useState } from "react"
import { EarthDark } from "./earth-dark"
import { EarthLight } from "./earth-light"

export function EarthWireframe() {
    const { theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isLightMode = theme === "sky"
    const fogColor = isLightMode ? '#ffffff' : '#030712'

    return (
        <div className="w-full h-[400px] md:h-[600px] absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none z-[-100]">

            <Canvas
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
            >
                {/* Fog for depth effect */}
                <fog attach="fog" args={[fogColor, 5, 20]} />
                <ambientLight intensity={isLightMode ? 2 : 0.5} />
                <pointLight position={[10, 10, 10]} intensity={isLightMode ? 2 : 1} />

                {/* Conditionally render Earth based on theme */}
                {isLightMode ? (
                    <EarthLight />
                ) : (
                    <>
                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                        <EarthDark />
                        <EffectComposer>
                            <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} height={100} intensity={1} />
                        </EffectComposer>
                    </>
                )}
            </Canvas>
        </div>
    )
}
