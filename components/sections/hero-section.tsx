"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { motion } from "framer-motion"
import { Link as ScrollLink } from "react-scroll"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function HeroSection() {
    const { t } = useLanguage()

    return (
        <section id="home" className="min-h-screen flex flex-col items-center justify-center p-4 pt-20 relative overflow-hidden">
            {/* Content wrapper with z-index to sit above background */}
            <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto gap-8">

                {/* Animated Headline */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-4"
                >
                    <h2 className="text-xl md:text-2xl font-medium text-primary tracking-wide uppercase text-shadow-sm">
                        {t.home.hero.subtitle}
                    </h2>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 text-shadow-sm">
                        {t.home.hero.title}
                    </h1>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ delay: 0.2, duration: 1 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed text-shadow-sm"
                >
                    {t.home.hero.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 mt-8"
                >
                    <ScrollLink
                        to="projects"
                        smooth={true}
                        offset={-20}
                        duration={800}
                        className={cn(
                            "h-12 px-8 rounded-full flex items-center justify-center gap-2 text-base font-medium transition-all duration-300 cursor-pointer",
                            "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 shadow-lg shadow-primary/25"
                        )}
                    >
                        {t.home.hero.cta} <ArrowRight className="w-4 h-4" />
                    </ScrollLink>

                    <ScrollLink
                        to="contact"
                        smooth={true}
                        offset={-20}
                        duration={800}
                        className={cn(
                            "h-12 px-8 rounded-full flex items-center justify-center gap-2 text-base font-medium transition-all duration-300 cursor-pointer",
                            "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border hover:scale-105"
                        )}
                    >
                        {t.nav.contact}
                    </ScrollLink>
                </motion.div>
            </div>

            {/* Scroll Indicator (optional) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute bottom-10 animate-bounce"
            >
                <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-scroll" />
                </div>
            </motion.div>
        </section>
    )
}
