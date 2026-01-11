"use client"

import { useLanguage } from "@/components/providers/language-provider"
import { motion } from "framer-motion"
import Image from "next/image"
import { MapPin, Mail, Phone } from "lucide-react"

export function AboutSection() {
    const { t } = useLanguage()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    return (
        <section id="about" className="min-h-screen py-24 px-4 container mx-auto relative scroll-mt-20">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-100px" }}
                variants={containerVariants}
                className="max-w-6xl mx-auto space-y-16"
            >
                {/* Header */}
                <div className="text-center space-y-4">
                    <motion.h2
                        variants={itemVariants}
                        className="text-4xl md:text-5xl font-bold tracking-tight leading-normal bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-500 text-shadow-sm"
                    >
                        {t.about.title}
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-muted-foreground max-w-2xl mx-auto text-shadow-sm"
                    >
                        {t.about.subtitle}
                    </motion.p>
                </div>

                {/* Profile & Bio */}
                <div className="grid md:grid-cols-12 gap-12 items-center">
                    {/* Image Column */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-5 flex justify-center"
                    >
                        <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-secondary shadow-2xl relative group">
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <Image
                                src="/images/profile.jpg"
                                alt="Daffa Muhammad Al Fatih"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                    </motion.div>

                    {/* Bio Column */}
                    <motion.div
                        variants={itemVariants}
                        className="md:col-span-7 space-y-6"
                    >
                        <h3 className="text-3xl font-bold">{t.home.hero.title}</h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {t.about.bio}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4 pt-4">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="p-2 bg-secondary/50 rounded-full"><MapPin className="w-4 h-4" /></div>
                                Bandar Lampung, Indonesia
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="p-2 bg-secondary/50 rounded-full"><Mail className="w-4 h-4" /></div>
                                daffamalfatih.3135@gmail.com
                            </div>
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="p-2 bg-secondary/50 rounded-full"><Phone className="w-4 h-4" /></div>
                                +62 857 8991 9805
                            </div>
                        </div>
                    </motion.div>
                </div>



            </motion.div>
        </section>
    )
}
