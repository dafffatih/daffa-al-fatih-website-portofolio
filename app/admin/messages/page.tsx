"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Mail } from "lucide-react"

type Message = {
    id: string
    name: string
    email: string
    message: string
    createdAt: string
    read: boolean
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch("/api/admin/messages")
                if (res.ok) {
                    const data = await res.json()
                    setMessages(data)
                }
            } catch (error) {
                console.error("Failed to fetch messages", error)
            } finally {
                setLoading(false)
            }
        }

        fetchMessages()
    }, [])

    if (loading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    return (
        <div className="space-y-8 text-foreground">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
                    <p className="text-muted-foreground">
                        View messages sent from the contact form.
                    </p>
                </div>
            </div>

            <Card className="border-border bg-card">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Inbox
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {messages.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">
                            No messages found.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-muted/50 border-border">
                                    <TableHead className="text-muted-foreground">Date</TableHead>
                                    <TableHead className="text-muted-foreground">Name</TableHead>
                                    <TableHead className="text-muted-foreground">Email</TableHead>
                                    <TableHead className="text-muted-foreground">Message</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {messages.map((msg) => (
                                    <TableRow key={msg.id} className="hover:bg-muted/50 border-border">
                                        <TableCell className="whitespace-nowrap font-medium">
                                            {format(new Date(msg.createdAt), "MMM d, yyyy HH:mm")}
                                        </TableCell>
                                        <TableCell>{msg.name}</TableCell>
                                        <TableCell>{msg.email}</TableCell>
                                        <TableCell className="max-w-md truncate" title={msg.message}>
                                            {msg.message}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
