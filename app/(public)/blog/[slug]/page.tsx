
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Calendar, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const revalidate = 60

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
    const params = await props.params;
    const post = await prisma.post.findUnique({
        where: { slug: params.slug },
    })

    if (!post || (!post.published && process.env.NODE_ENV !== 'development')) {
        notFound()
    }

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 container mx-auto">
            <Link href="/">
                <Button variant="ghost" size="sm" className="mb-8 gap-2 text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Button>
            </Link>

            <article className="max-w-3xl mx-auto space-y-8">
                <header className="space-y-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.createdAt).toLocaleDateString('en-US', { dateStyle: 'long' })}</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-500">
                        {post.title}
                    </h1>
                </header>

                {post.coverImage && (
                    <div className="rounded-xl overflow-hidden aspect-video border border-border/50 shadow-lg">
                        <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                    </div>
                )}

                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-xl">
                    <ReactMarkdown>{post.content}</ReactMarkdown>
                </div>
            </article>
        </div>
    )
}
