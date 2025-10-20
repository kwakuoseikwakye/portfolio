'use client'
import Link from "next/link";
import Image from "next/image";

import { FaStackOverflow } from "react-icons/fa6";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import {
    Card,
    CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const socials = [
    {
        name: "Github",
        link: "https://github.com/kwakuoseikwakye",
        icon: <FaGithub className="size-4" />
    },
    {
        name: "LinkedIn",
        link: "https://linkedin.com/in/kwaku-osei-kwakye-2a5280132",
        icon: <FaLinkedin className="size-4" />
    },
    {
        name: "Stackoverflow",
        link: "https://stackoverflow.com/users/13247079/kwaku",
        icon: <FaStackOverflow className="size-4" />
    }
    // TODO: Add more socials here
]

export const Profile = () => {
    return (
        <Card className="backdrop-blur-xl">
            <CardContent className="pt-8 pb-8">
                <div className="flex flex-col items-start gap-4">
                    <div className="w-full flex flex-row justify-between items-top">
                        <div className="flex flex-row md:flex-col items-center md:items-start w-full gap-6">
                            <div className="relative">
                                <Image
                                    width={150}
                                    height={150}
                                    quality={100}
                                    src="/kwaku.png"
                                    alt="Profile Picture"
                                    className="rounded-2xl size-16 md:w-32 h-32 object-cover border-2 border-white/30 shadow-2xl"
                                />
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
                            </div>
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="font-bold md:mt-4 text-xl md:text-3xl text-gray-800">Kwaku Osei Kwakye</h1>
                                <p className="text-sm md:text-lg text-gray-600 font-medium">
                                    Software Engineer
                                </p>
                            </div>
                        </div>
                    </div>

                    <Button className="mt-6 w-full text-base font-bold" asChild>
                        <Link
                            href="/resume.pdf"
                            target="_blank"
                            className="font-bold uppercase tracking-wide"
                        >
                            CONTACT ME
                        </Link>
                    </Button>
                    <div className="mt-6 flex flex-col space-y-3 border-t border-gray-200 pt-6 w-full">
                        {socials.map((s, i) => {
                            const parts = s.link.split("/");
                            const username = parts[parts.length - 1];

                            return (
                                <Link
                                    key={i}
                                    href={s.link}
                                    target="_blank"
                                    className="cursor-pointer flex items-center gap-3 group p-2 rounded-xl hover:bg-gray-100 transition-all duration-300"
                                >
                                    <div className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                                        {s.icon}
                                    </div>
                                    <span className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300 font-medium">
                                        /{username}
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}