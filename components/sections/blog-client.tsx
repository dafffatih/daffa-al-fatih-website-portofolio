"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"
import { motion } from "framer-motion"

type Post = {
    id: string
    title: string
    slug: string
    content: string
    excerpt: string | null
    published: boolean
    coverImage: string | null
    createdAt: Date
    updatedAt: Date
}

interface BlogClientProps {
    posts: Post[]
}

export function BlogClient({ posts }: BlogClientProps) {
    const { t } = useLanguage()

    return (
        <section id="blog" className="min-h-screen flex flex-col justify-center py-24 px-4 container mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="text-center mb-16 space-y-4"
            >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-normal bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-400 text-shadow-sm">
                    {t.blog.title}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto text-shadow-sm">
                    {t.blog.subtitle}
                </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, index) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                        whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="h-full"
                    >
                        <Link href={`/blog/${post.slug}`} className="group h-full block">
                            <Card className="h-full flex flex-col overflow-hidden hover:border-primary/50 transition-colors duration-300">
                                {post.coverImage && (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    </div>
                                )}
                                <CardHeader>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                                        <Calendar className="w-3 h-3" />
                                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                                        {post.excerpt || post.content.substring(0, 150)}...
                                    </p>
                                </CardContent>
                                <CardFooter className="pt-0 text-sm font-medium text-primary flex items-center gap-2">
                                    {t.blog.readMore} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </CardFooter>
                            </Card>
                        </Link>
                    </motion.div>
                ))}
            </div>

            {posts.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                    <p>{t.blog.noPosts}</p>
                </div>
            )}
        </section>
    )
}
