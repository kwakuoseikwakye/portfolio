import Link from "next/link";
import { cn } from "@/lib/utils";

import { ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export const projects = [
    {
        title: "Micholin",
        description: "An AI platform for generating personal videos in different languages",
        tech: "TypeScript",
        link: "https://www.michol.in",
    },
    {
        title: "FundPeck",
        description: "A crowdfund platform",
        tech: "PHP",
        link: "https://fundpeck.com",
    },
    {
        title: "Woocommerce payment plugin",
        description: "A woocommerce payment gateway plugin for TheTeller",
        tech: "PHP",
        link: "https://github.com/kwakuoseikwakye/woocommerce-theteller-payment-gateway",
    },
    {
        title: "Nanascript starter kit",
        description: "A simplified light weight express.js starter kit for writing APIs quickly.",
        tech: "Javascript",
        link: "https://www.npmjs.com/package/nanascript-express-api-starter-kit",
    },
]

const techColors = {
    "TypeScript": "bg-blue-500",
    "React Native": "bg-green-500",
    "Vue.js": "bg-purple-500",
    "Python": "bg-purple-600",
    "Javascript": "bg-yellow-300",
    "PHP": "bg-purple-800",
}

export const Projects = () => {
    return (
        <>
            <h2 className="text-3xl font-bold mb-8 text-white">
                Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((p, i) => (
                    <Card key={i} className="backdrop-blur-xl hover:scale-105 transition-all duration-300 group">
                        <CardContent className="pt-6 h-full">
                            <div className="flex flex-col h-full">
                                <Link
                                    href={p.link}
                                    className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors duration-300"
                                >
                                    {p.title}
                                </Link>
                                <p className="text-white/80 mt-3 mb-6 leading-relaxed">
                                    {p.description}
                                </p>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={cn(
                                                "size-5 rounded-full shadow-lg",
                                                techColors[p.tech as keyof typeof techColors]
                                            )}
                                        />
                                        <span className="text-sm font-medium text-white/70">
                                            {p.tech}
                                        </span>
                                    </div>
                                    <Link
                                        href={p.link}
                                        className="flex items-center gap-2 text-sm text-blue-300 hover:text-blue-200 transition-colors duration-300 font-medium"
                                    >
                                        View Project
                                        <ExternalLink className="inline-block size-4" />
                                    </Link>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}