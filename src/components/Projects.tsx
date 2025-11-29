import Link from "next/link";
import { cn } from "@/lib/utils";

import { ExternalLink, Github } from "lucide-react";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const projects = [
    {
        title: "Micholin",
        description: "An AI platform for generating personal videos in different languages. Leveraging advanced TTS and lip-sync technologies.",
        tech: ["TypeScript", "Next.js", "AI", "PostgreSQL", "Node.js","Python"],
        link: "https://www.michol.in",
        github: null
    },
    {
        title: "Gasppy",
        description: "A comprehensive gift card management platform enabling businesses to create, manage, and track gift cards to boost sales and customer loyalty.",
        tech: ["Next.js", "React", "Node.js", "PostgreSQL"],
        link: "https://gasppy.com",
        github: null
    },
    {
        title: "FundPeck",
        description: "A crowdfunding platform empowering creators and startups to raise funds securely and efficiently.",
        tech: ["PHP", "Laravel", "PostgreSQL", "Golang"],
        link: "https://fundpeck.com",
        github: null
    },
    {
        title: "Woocommerce Payment Plugin",
        description: "A robust WooCommerce payment gateway plugin for TheTeller, enabling seamless transactions for merchants.",
        tech: ["PHP", "WordPress", "WooCommerce"],
        link: "https://github.com/kwakuoseikwakye/woocommerce-theteller-payment-gateway",
        github: "https://github.com/kwakuoseikwakye/woocommerce-theteller-payment-gateway"
    },
    {
        title: "Nanascript Starter Kit",
        description: "A simplified, lightweight Express.js starter kit for building scalable APIs quickly with best practices.",
        tech: ["JavaScript", "Express", "Node.js"],
        link: "https://www.npmjs.com/package/nanascript-express-api-starter-kit",
        github: "https://github.com/kwakuoseikwakye/nanascript-express-api-starter-kit"
    },
]

const techColors: Record<string, string> = {
    "TypeScript": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "React": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    "React Native": "bg-green-500/10 text-green-500 border-green-500/20",
    "Vue.js": "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    "Python": "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    "JavaScript": "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    "PHP": "bg-purple-500/10 text-purple-500 border-purple-500/20",
    "Next.js": "bg-slate-500/10 text-slate-500 border-slate-500/20",
    "Laravel": "bg-red-500/10 text-red-500 border-red-500/20",
    "AI": "bg-rose-500/10 text-rose-500 border-rose-500/20",
    "WordPress": "bg-blue-600/10 text-blue-600 border-blue-600/20",
    "PostgreSQL": "bg-blue-600/10 text-blue-600 border-blue-600/20",
    "Golang": "bg-green-100/10 text-green-100 border-green-200/20",
    "WooCommerce": "bg-violet-500/10 text-violet-500 border-violet-500/20",
    "Express": "bg-gray-500/10 text-gray-500 border-gray-500/20",
    "Node.js": "bg-green-600/10 text-green-600 border-green-600/20",
}

export const Projects = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-heading font-bold text-foreground">
                    Featured Projects
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((p, i) => (
                    <Card key={i} className="glass-card border-none flex flex-col h-full group hover:-translate-y-2 transition-all duration-300">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                    {p.title}
                                </CardTitle>
                                <div className="flex gap-2">
                                    {p.github && (
                                        <Link href={p.github} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                            <Github className="size-5" />
                                        </Link>
                                    )}
                                    <Link href={p.link} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">
                                        <ExternalLink className="size-5" />
                                    </Link>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground leading-relaxed">
                                {p.description}
                            </p>
                        </CardContent>
                        <CardFooter className="flex flex-wrap gap-2 pt-4">
                            {Array.isArray(p.tech) ? p.tech.map((t) => (
                                <Badge
                                    key={t}
                                    variant="outline"
                                    className={cn("font-medium", techColors[t] || "bg-secondary/50 text-secondary-foreground border-border")}
                                >
                                    {t}
                                </Badge>
                            )) : (
                                <Badge variant="outline" className={cn("font-medium", techColors[p.tech] || "bg-secondary/50 text-secondary-foreground border-border")}>
                                    {p.tech}
                                </Badge>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    )
}