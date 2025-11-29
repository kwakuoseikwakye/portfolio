import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Database, Layout, Terminal } from "lucide-react";

const skillGroups = [
    {
        title: "Frontend",
        icon: <Layout className="size-4" />,
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Vue.js"]
    },
    {
        title: "Backend",
        icon: <Database className="size-4" />,
        skills: ["Node.js", "Express", "PHP", "Laravel","GoLang", "Python", "PostgreSQL", "MySQL", "MongoDB"]
    },
    {
        title: "Tools & DevOps",
        icon: <Terminal className="size-4" />,
        skills: ["Git", "Docker", "AWS", "CI/CD", "Linux", "Nginx"]
    },
    {
        title: "Languages",
        icon: <Code2 className="size-4" />,
        skills: ["JavaScript", "TypeScript", "PHP", "Python", "SQL", "HTML/CSS"]
    }
]

export const Skills = () => {
    return (
        <Card className="glass-card border-none">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">
                    Skills & Technologies
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {skillGroups.map((group, i) => (
                    <div key={i} className="space-y-3">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            {group.icon}
                            {group.title}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {group.skills.map((skill) => (
                                <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="bg-secondary/50 hover:bg-primary/20 hover:text-primary transition-colors cursor-default"
                                >
                                    {skill}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}