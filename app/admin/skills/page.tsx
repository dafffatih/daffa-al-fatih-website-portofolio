
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Pencil, Trash2 } from "lucide-react"

export default async function AdminSkillsPage() {
    const skills = await prisma.skill.findMany({
        orderBy: { category: "asc" },
    })

    // Group by category
    const groupedSkills = skills.reduce((acc, skill) => {
        (acc[skill.category] = acc[skill.category] || []).push(skill)
        return acc
    }, {} as Record<string, typeof skills>)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Skills</h1>
                <Link href="/admin/skills/new">
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" /> Add Skill
                    </Button>
                </Link>
            </div>

            {Object.entries(groupedSkills).map(([category, items]) => (
                <div key={category} className="space-y-4">
                    <h2 className="text-xl font-semibold border-b pb-2">{category}</h2>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        {items.map((skill) => (
                            <Card key={skill.id}>
                                <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between space-y-0">
                                    <CardTitle className="text-base font-medium">{skill.name}</CardTitle>
                                    <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                                </CardHeader>
                                <CardContent className="p-4 pt-2">
                                    <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden mb-4">
                                        <div className="bg-primary h-full rounded-full" style={{ width: `${skill.proficiency}%` }} />
                                    </div>
                                    <div className="flex justify-end gap-2">
                                        <Link href={`/admin/skills/${skill.id}`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                <Pencil className="w-3 h-3" />
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
                                            <Trash2 className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}

            {skills.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No skills found. Start adding some!
                </div>
            )}
        </div>
    )
}
