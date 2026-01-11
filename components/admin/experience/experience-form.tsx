"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

import { DatePicker } from "@/components/ui/date-picker"

interface ExperienceFormProps {
    initialData?: any
    isEditing?: boolean
}

export function ExperienceForm({ initialData, isEditing = false }: ExperienceFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    // Format dates for input[type="date"]
    const formatDate = (date: Date | string | null) => {
        if (!date) return ""
        return new Date(date).toISOString().split('T')[0]
    }

    const [formData, setFormData] = useState({
        position: initialData?.position || "",
        company: initialData?.company || "",
        startDate: initialData?.startDate || "", // Store as string or Date directly
        endDate: initialData?.endDate || "",
        current: !initialData?.endDate && isEditing ? true : false,
        description: initialData?.description || "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleDateChange = (field: "startDate" | "endDate", date: Date | undefined) => {
        setFormData((prev) => ({
            ...prev,
            [field]: date ? date.toISOString() : ""
        }))
    }

    const handleCurrentChange = (checked: boolean) => {
        setFormData((prev) => ({
            ...prev,
            current: checked,
            endDate: checked ? "" : prev.endDate // Clear end date if current
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const url = isEditing
                ? `/api/experience/${initialData.id}`
                : "/api/experience"

            const method = isEditing ? "PATCH" : "POST"

            const payload = {
                ...formData,
                endDate: formData.current ? null : formData.endDate ? new Date(formData.endDate) : null,
                startDate: new Date(formData.startDate)
            }
            // Remove 'current' helper field from payload
            // @ts-ignore
            delete payload.current

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            })

            if (!res.ok) throw new Error("Failed to save")

            router.push("/admin/experience")
            router.refresh()
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
            <div className="flex items-center gap-4">
                <Link href="/admin/experience">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="w-4 h-4" />
                    </Button>
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">
                    {isEditing ? "Edit Experience" : "Add Experience"}
                </h1>
            </div>

            <div className="space-y-4 border p-6 rounded-lg bg-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="position">Position</Label>
                        <Input
                            id="position"
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            required
                            placeholder="Senior Developer"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="company">Company</Label>
                        <Input
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                            placeholder="Acme Corp"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label>Start Date</Label>
                        <DatePicker
                            date={formData.startDate ? new Date(formData.startDate) : undefined}
                            setDate={(date) => handleDateChange("startDate", date)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label className={formData.current ? "opacity-50" : ""}>End Date</Label>
                        <DatePicker
                            date={formData.endDate ? new Date(formData.endDate) : undefined}
                            setDate={(date) => handleDateChange("endDate", date)}
                            disabled={formData.current}
                        />
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="current"
                        checked={formData.current}
                        onCheckedChange={handleCurrentChange}
                    />
                    <Label htmlFor="current">I currently work here</Label>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        placeholder="Key responsibilities and achievements..."
                        className="min-h-[150px]"
                    />
                </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full md:w-auto">
                {loading && <Loader2 className="mr-2 w-4 h-4 animate-spin" />}
                {isEditing ? "Save Changes" : "Save Experience"}
            </Button>
        </form>
    )
}
