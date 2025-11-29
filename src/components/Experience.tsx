import { Briefcase, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const experiences = [
    {
        company: "Kirirom Digital",
        role: "Software Engineer",
        period: "2024 - Present",
        location: "Tokyo, Japan",
        description: "Leading development of scalable web applications using Next.js and React. Mentoring junior developers and implementing best practices for code quality and performance.",
        skills: ["React", "Next.js", "TypeScript", "Node.js"],
        current: true
    },
    {
        company: "PaySwitch",
        role: "Software Engineer",
        period: "2023 - 2024",
        location: "Accra, Ghana",
        description: "Developed and maintained fintech solutions. Integrated multiple payment gateways and improved transaction processing speed by 40%.",
        skills: ["PHP", "Laravel", "MySQL", "Redis"],
        current: false
    },
    {
        company: "GitPlus",
        role: "Full Stack Developer",
        period: "2019 - 2023",
        location: "Accra, Ghana",
        description: "Delivered custom web solutions for various clients. Specialized in e-commerce platforms and content management systems.",
        skills: ["WordPress", "PHP", "JavaScript", "CSS"],
        current: false
    }
]

export const Experience = () => {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Briefcase className="size-6" />
                </div>
                <h2 className="text-3xl font-heading font-bold text-foreground">
                    Work Experience
                </h2>
            </div>

            <div className="relative space-y-8 pl-8 md:pl-0">
                {/* Timeline Line */}
                <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-transparent hidden md:block"></div>
                <div className="absolute left-0 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-transparent md:hidden"></div>

                {experiences.map((exp, i) => (
                    <div key={i} className={`relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        {/* Timeline Dot */}
                        <div className="absolute left-[-36px] md:left-1/2 md:-translate-x-1/2 top-6 z-10">
                            <div className={`size-4 rounded-full border-4 border-background ${exp.current ? 'bg-primary animate-pulse' : 'bg-muted-foreground'}`}></div>
                        </div>

                        {/* Content Card */}
                        <div className="flex-1">
                            <Card className="glass-card border-none hover:bg-white/5 transition-colors">
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                                        <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                                        <Badge variant={exp.current ? "default" : "secondary"} className="w-fit">
                                            {exp.period}
                                        </Badge>
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2 text-primary font-medium">
                                            <Briefcase className="size-4" />
                                            {exp.company}
                                        </div>
                                        <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                            <MapPin className="size-4" />
                                            {exp.location}
                                        </div>
                                    </div>

                                    <p className="text-muted-foreground leading-relaxed">
                                        {exp.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {exp.skills.map((skill) => (
                                            <Badge key={skill} variant="outline" className="bg-secondary/30 border-border text-xs">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Spacer for alternating layout */}
                        <div className="flex-1 hidden md:block"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}
