"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input" // need to create this
import { Textarea } from "@/components/ui/textarea" // need to create this
import { Checkbox } from "@/components/ui/checkbox" // need to create this
import { Label } from "@/components/ui/label" // need to create this
import { ArrowLeft, Save, Loader2 } from "lucide-react"
import Link from "next/link"

interface ProjectFormProps {
    initialData?: any
    isEditing?: boolean
}

export function ProjectForm({ initialData, isEditing = false }: ProjectFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        description: initialData?.description || "",
        techStack: initialData?.techStack || "",
        imageUrl: initialData?.imageUrl || "",
        demoUrl: initialData?.demoUrl || "",
        repoUrl: initialData?.repoUrl || "",
        published: initialData?.published ?? true,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleCheckboxChange = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, published: checked }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const url = isEditing
                ? `/api/projects/${initialData.id}`
                : "/api/projects"

            const method = isEditing ? "PATCH" : "POST"

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            if (!res.ok) throw new Error("Failed to save")

            router.push("/admin/projects")
            router.refresh()
        } catch (error) {
            console.error(error)
            // Show toast error here
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/projects">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">
                    {isEditing ? "Edit Project" : "New Project"}
                </h1>
            </div>

            <div className="space-y-4 border p-6 rounded-lg bg-card">
                <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        placeholder="Project Name"
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Short description of the project..."
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="techStack">Tech Stack</Label>
                    <Input
                        id="techStack"
                        name="techStack"
                        value={formData.techStack}
                        onChange={handleChange}
                        placeholder="React, Next.js, Three.js (comma separated)"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="demoUrl">Demo URL</Label>
                        <Input
                            id="demoUrl"
                            name="demoUrl"
                            value={formData.demoUrl}
                            onChange={handleChange}
                            placeholder="https://..."
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="repoUrl">Repository URL</Label>
                        <Input
                            id="repoUrl"
                            name="repoUrl"
                            value={formData.repoUrl}
                            onChange={handleChange}
                            placeholder="https://github.com/..."
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                        id="imageUrl"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="https://..."
                    />
                </div>

                <div className="flex items-center space-x-2 pt-2">
                    <Checkbox
                        id="published"
                        checked={formData.published}
                        onCheckedChange={handleCheckboxChange}
                    />
                    <Label htmlFor="published">Published</Label>
                </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full md:w-auto">
                {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                {isEditing ? "Save Changes" : "Create Project"}
            </Button>
        </form>
    )
}
