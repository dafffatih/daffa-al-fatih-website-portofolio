"use client"

import { useState, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Send, Mail, MapPin, Github, Linkedin, Instagram } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/providers/language-provider"
import { motion } from "framer-motion"
import { EarthWireframe } from "@/components/3d/earth-wireframe"

export function ContactSection() {
    const { t } = useLanguage()
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!res.ok) {
                const data = await res.json()
                throw new Error(data.error || "Failed to send")
            }

            setSuccess(true)
            setFormData({ name: "", email: "", message: "" })
        } catch (error: any) {
            console.error(error)
            alert(error.message || "Failed to send message. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="contact" className="min-h-screen flex flex-col justify-center py-24 px-4 container mx-auto relative">
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto items-start z-10">
                {/* Left Side: Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 text-shadow-sm">
                            {t.contact.title}
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed text-shadow-sm">
                            {t.contact.subtitle}
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                            <div className="h-10 w-10 bg-secondary/50 rounded-full flex items-center justify-center">
                                <Mail className="w-5 h-5" />
                            </div>
                            <span className="text-lg">daffamalfatih.3135@gmail.com</span>
                        </div>
                        <div className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors">
                            <div className="h-10 w-10 bg-secondary/50 rounded-full flex items-center justify-center">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <span className="text-lg">{t.contact.info.location}</span>
                        </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Link href="https://github.com/dafffatih" target="_blank" className="p-3 bg-secondary/50 rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110">
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link href="https://www.linkedin.com/in/daffamalfatih" target="_blank" className="p-3 bg-secondary/50 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110">
                            <Linkedin className="w-5 h-5" />
                        </Link>
                        <Link href="https://www.instagram.com/dafffatih_/" target="_blank" className="p-3 bg-secondary/50 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 hover:scale-110">
                            <Instagram className="w-5 h-5" />
                        </Link>
                    </div>
                </motion.div>

                {/* Right Side: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <Card className="border-muted/50 shadow-xl bg-card/80 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle>{t.contact.title}</CardTitle>
                            <CardDescription>
                                {t.contact.form.successDesc}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {success ? (
                                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 animate-in fade-in zoom-in">
                                    <div className="h-16 w-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                                        <Send className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold">{t.contact.form.successTitle}</h3>
                                    <p className="text-muted-foreground">{t.contact.form.successDesc}</p>
                                    <Button onClick={() => setSuccess(false)} variant="outline" className="mt-4">
                                        {t.contact.form.sendAnother}
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">{t.contact.form.name}</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder={t.contact.form.placeholderName}
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">{t.contact.form.email}</Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder={t.contact.form.placeholderEmail}
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">{t.contact.form.message}</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            placeholder={t.contact.form.placeholderMessage}
                                            className="min-h-[150px] bg-background/50"
                                        />
                                    </div>
                                    <Button type="submit" className="w-full gap-2" disabled={loading}>
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                        {loading ? t.contact.form.sending : t.contact.form.send}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* 3D Earth Background */}
            <div className="absolute bottom-[-100px] left-0 right-0 h-[50vh] z-0 opacity-50 pointer-events-none">
                <EarthWireframe />
            </div>
        </section>
    )
}
