'use client'
import Link from "next/link";
import Image from "next/image";

import { FaStackOverflow } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const socials = [
    {
        name: "Github",
        link: "https://github.com/kwakuoseikwakye",
        icon: <FaGithub className="size-5" />
    },
    {
        name: "LinkedIn",
        link: "https://linkedin.com/in/kwaku-osei-kwakye-2a5280132",
        icon: <FaLinkedin className="size-5" />
    },
    {
        name: "Stackoverflow",
        link: "https://stackoverflow.com/users/13247079/kwaku",
        icon: <FaStackOverflow className="size-5" />
    }
]

export const Profile = () => {
    return (
        <Card className="glass-card border-none overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl"></div>

            <CardContent className="pt-12 pb-8 px-6 relative z-10">
                <div className="flex flex-col items-center text-center gap-6">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative">
                            <Image
                                width={160}
                                height={160}
                                quality={100}
                                src="/kwaku.png"
                                alt="Kwaku Osei Kwakye"
                                className="rounded-full size-32 md:size-40 object-cover border-4 border-background shadow-2xl"
                                priority
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="font-heading font-bold text-2xl md:text-3xl text-foreground tracking-tight">
                            Kwaku Osei Kwakye
                        </h1>
                        <p className="text-primary font-medium text-lg">
                            Software Engineer
                        </p>
                        <p className="text-muted-foreground text-sm max-w-[280px] mx-auto leading-relaxed">
                            Building digital experiences with modern technologies.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full justify-center">
                        {socials.map((s, i) => (
                            <Link
                                key={i}
                                href={s.link}
                                target="_blank"
                                className="p-3 rounded-full bg-secondary/50 hover:bg-primary/10 hover:text-primary text-muted-foreground transition-all duration-300 hover:scale-110"
                                aria-label={s.name}
                            >
                                {s.icon}
                            </Link>
                        ))}
                    </div>

                    <div className="w-full pt-6 border-t border-border/50">
                        <Button className="w-full rounded-xl font-bold py-6 text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none" asChild>
                            <Link
                                href="/resume.pdf"
                                target="_blank"
                                className="flex items-center gap-2"
                            >
                                <Mail className="size-5" />
                                CONTACT ME
                            </Link>
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}