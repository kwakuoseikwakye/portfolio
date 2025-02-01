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
            "/devvault.png",
        ],
    },
]

export const Experience = () => {
    return (
        <>
           <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Work Experience</h2>
            <Card>
                <CardContent className="pt-6">
                    <ul className="space-y-8">
                        {jobs.map((j, i) => (
                            <li key={i} className="border-b last:border-b-0 pb-8 last:pb-0">
                                {/* Job Details */}
                                <div className="flex items-center space-x-4">
                                    <Image
                                        src={j.logo}
                                        alt={j.company}
                                        width={80}
                                        height={80}
                                        className="rounded-md border shadow-md object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold">
                                            {j.role}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {j.company}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2 flex items-center">
                                    <CalendarDays className="size-3 mr-2"/>
                                    {j.duration}
                                </p>
                                <p className="text-sm mt-2">{j.description}</p>
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
