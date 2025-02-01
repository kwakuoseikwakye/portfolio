import Link from "next/link";
import { cn } from "@/lib/utils";

import { ExternalLink } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export const projects = [
    {
        title: "Micholin",
        description: "An AI platfrom for generating videos",
        tech: "TypeScript",
        link: "https://wwww.michol.in",
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
        link: "www.npmjs.com/package/nanascript-express-api-starter-kit",
    },
]

const techColors = {
    "TypeScript": "bg-blue-500",
    "React Native": "bg-green-500",
    "Vue.js": "bg-purple-500",
    "Python": "bg-purple-600",
    "Javascript": "bg-yellow-300",
    "PHP": "bg-blue-700",
}

export const Projects = () => {
    return (
        <>
            <h2 className="text-xl font-bold mb-4">
                Featured Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {projects.map((p, i) => (
                    <Card key={i}>
                        <CardContent className="pt-6 h-full">
                            <div className="flex flex-col h-full">
                                <Link
                                    href={p.link}
                                    className="font-semibold text-primary hover:underline"
                                >
                                    {p.title}
                                </Link>
                                <p className="text-sm text-muted-foreground mt-1 mb-4">
                                    {p.description}
                                </p>
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div
                                            className={cn(
                                                "size-4 rounded-full",
                                                techColors[p.tech as keyof typeof techColors]
                                            )}
                                        />
                                        <span className="text-xs font-medium text-muted-foreground">
                                            {p.tech}
                                        </span>
                                    </div>
                                    <Link
                                        href={p.link}
                                        className="flex items-center gap-2 text-sm text-primary hover:underline"
                                    >
                                        View Project
                                        <ExternalLink className="inline-block size-3" />
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