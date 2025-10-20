import Image from "next/image";

import { CalendarDays } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { JobImages } from "@/components/JobImages";

const jobs = [
    {
        role: "Software Engineer", 
        company: "Kirirom Digital Japan",
        logo: "/kirirom.png",
        duration: "2024 - Present",
        description:
            'Lead developer for multiple high-impact projects, mentoring junior developers, and implementing best practices.',
        link: "https://www.kirirom-digital.com",
        images: [],
    },
    {
        role: "Full-Stack Developer",
        company: "Payswitch Company",
        logo: "/payswitch.png",
        duration: "2023 - 2024",
        description:
            "Developed and maintained various internal projects, focusing on responsive design and performance optimization.",
        link: "https://payswitch.com.gh",
        images: [
            "/payswitch1.webp",
            "/payswitch2.png",
        ],
    },
    {
        role: "Full-Stack Developer",
        company: "Gitplus Limited",
        logo: "/gitplus.png",
        duration: "2019 - 2023",
        description:
            "Assisted in the development of SAAS web applications, gained experience in agile methodologies and version control.",
        link: "https://gitplus.app",
        images: [
            "/gitplus1.jpeg",
            "/gitplus2.jpeg",
        ],
    },
]

export const Experience = () => {
    return (
        <>
           <h2 className="text-3xl font-bold mb-8 text-white">Work Experience</h2>
            <Card className="backdrop-blur-xl">
                <CardContent className="pt-8">
                    <ul className="space-y-10">
                        {jobs.map((j, i) => (
                            <li key={i} className="border-b border-white/20 last:border-b-0 pb-10 last:pb-0">
                                {/* Job Details */}
                                <div className="flex items-center space-x-6">
                                    <div className="relative">
                                        <Image
                                            src={j.logo}
                                            alt={j.company}
                                            width={80}
                                            height={80}
                                            className="rounded-2xl border-2 border-white/30 shadow-2xl object-cover"
                                        />
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent"></div>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-xl text-white">
                                            {j.role}
                                        </h3>
                                        <p className="text-lg text-white/80 font-medium">
                                            {j.company}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-white/70 mt-3 flex items-center">
                                    <CalendarDays className="size-4 mr-3"/>
                                    {j.duration}
                                </p>
                                <p className="text-white/80 mt-4 leading-relaxed">{j.description}</p>
                                {/* Job Images */}
                                <JobImages 
                                    role={j.role} 
                                    link={j.link}
                                    images={j.images} 
                                    duration={j.duration} 
                                />
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </>
    )
}
