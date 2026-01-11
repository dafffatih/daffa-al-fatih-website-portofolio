"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/providers/language-provider"
import { motion } from "framer-motion"

type Experience = {
    id: string
    position: string
    company: string
    startDate: Date
    endDate: Date | null
    description: string
}

interface ExperienceClientProps {
    experiences: Experience[]
}

export function ExperienceClient({ experiences }: ExperienceClientProps) {
    const { t } = useLanguage()

    return (
        <section id="experience" className="min-h-screen flex flex-col justify-center py-24 px-4 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 space-y-4"
            >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-normal bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 text-shadow-sm">
                    {t.experience.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-shadow-sm">
                    {t.experience.subtitle}
                </p>
            </motion.div>

            <div className="max-w-3xl mx-auto relative">
                {/* Vertical line - hidden on mobile, visible on md+ */}
                <motion.div
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block origin-top"
                />

                <div className="space-y-12">
                    {experiences.map((exp, index) => {
                        const isEven = index % 2 === 0
                        return (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: false, margin: "-50px" }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={cn(
                                    "relative flex flex-col md:flex-row gap-8 md:gap-0",
                                    isEven ? "md:flex-row-reverse" : ""
                                )}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-[5px] md:-translate-x-1/2 mt-1.5 z-10 shadow-[0_0_10px_theme(colors.primary.DEFAULT)]" />

                                {/* Date (Desktop only) */}
                                <div className={cn(
                                    "hidden md:block w-1/2 pt-1",
                                    isEven ? "pl-8 text-left" : "pr-8 text-right"
                                )}>
                                    <span className="text-sm font-bold text-primary tracking-widest uppercase">
                                        {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className={cn(
                                    "w-full md:w-1/2 pl-8 md:pl-0 border-l border-border md:border-l-0",
                                    isEven ? "md:pr-12" : "md:pl-12"
                                )}>
                                    <div className="space-y-2 md:hidden mb-2">
                                        <span className="text-xs font-bold text-primary tracking-widest uppercase bg-primary/10 px-2 py-1 rounded">
                                            {new Date(exp.startDate).getFullYear()} - {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"}
                                        </span>
                                    </div>

                                    <div className="bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow relative group">
                                        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                                        <h3 className="text-xl font-bold">{exp.position}</h3>
                                        <p className="text-lg text-primary font-medium">{exp.company}</p>
                                        <p className="mt-4 text-muted-foreground leading-relaxed whitespace-pre-line">
                                            {exp.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {experiences.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>No experience entries yet.</p>
                    </div>
                )}
            </div>
        </section>
    )
}
