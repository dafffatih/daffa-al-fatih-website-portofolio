"use server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import bcrypt from "bcryptjs"

export async function updateAdminProfile(formData: FormData) {
    const session = await auth()

    if (!session?.user?.email) {
        return { error: "Unauthorized" }
    }

    const currentEmail = session.user.email
    const newEmail = formData.get("email") as string
    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!newEmail || !currentPassword) {
        return { error: "Email and current password are required" }
    }

    if (newPassword && newPassword !== confirmPassword) {
        return { error: "New passwords do not match" }
    }

    try {
        // Verify current password
        const user = await prisma.user.findUnique({
            where: { email: currentEmail }
        })

        if (!user || !user.password) {
            return { error: "User not found" }
        }

        const isValid = await bcrypt.compare(currentPassword, user.password)

        if (!isValid) {
            return { error: "Incorrect current password" }
        }

        // Prepare update data
        const updateData: any = {
            email: newEmail
        }

        if (newPassword) {
            updateData.password = await bcrypt.hash(newPassword, 10)
        }

        await prisma.user.update({
            where: { email: currentEmail },
            data: updateData
        })

        revalidatePath("/admin/settings")
        return { success: "Profile updated successfully" }
    } catch (error) {
        console.error("Profile update error:", error)
        return { error: "Failed to update profile" }
    }
}
