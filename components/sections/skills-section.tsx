import { prisma } from "@/lib/prisma"
import { SkillsClient } from "./skills-client"

export async function SkillsSection() {
    const skills = await prisma.skill.findMany({
        orderBy: { category: "asc" },
    })

    return <SkillsClient skills={skills} />
}
