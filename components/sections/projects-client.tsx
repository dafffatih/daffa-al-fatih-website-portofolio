"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"
import { motion } from "framer-motion"

type Project = {
    id: string
    title: string
    description: string
    imageUrl: string | null
    demoUrl: string | null
    repoUrl: string | null
    techStack: string
    published: boolean
    createdAt: Date
    updatedAt: Date
}

interface ProjectsClientProps {
    projects: Project[]
}

export function ProjectsClient({ projects }: ProjectsClientProps) {
    const { t } = useLanguage()

    return (
        <section id="projects" className="min-h-screen flex flex-col justify-center py-24 px-4 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 space-y-4"
            >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-normal bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 text-shadow-sm">
                    {t.projects.title}
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-shadow-sm">
                    {t.projects.subtitle}
                </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="group relative"
                    >
                        {/* Glow effect */}
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

                        <Card className="relative h-full flex flex-col bg-card border-muted/50 overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                            <div className="h-48 bg-muted overflow-hidden relative">
                                {project.imageUrl ? (
                                    <img
                                        src={project.imageUrl}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-700">
                                        <span className="font-mono text-xs">{t.projects.noPreview}</span>
                                    </div>
                                )}

                                {/* Overlay on hover */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                    {project.demoUrl && (
                                        <Link href={project.demoUrl} target="_blank">
                                            <Button size="sm" variant="secondary" className="gap-2">
                                                <ExternalLink className="w-4 h-4" /> {t.projects.demo}
                                            </Button>
                                        </Link>
                                    )}
                                    {project.repoUrl && (
                                        <Link href={project.repoUrl} target="_blank">
                                            <Button size="sm" variant="outline" className="gap-2 bg-background/20 text-white border-white/20 hover:bg-background/40">
                                                <Github className="w-4 h-4" /> {t.projects.code}
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <CardHeader>
                                <CardTitle className="text-xl">{project.title}</CardTitle>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {project.techStack.split(",").map((tech) => (
                                        <span key={tech} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                                            {tech.trim()}
                                        </span>
                                    ))}
                                </div>
                            </CardHeader>

                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {project.description}
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {projects.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    <p>{t.projects.noProjects}</p>
                </div>
            )}
        </section>
    )
}
