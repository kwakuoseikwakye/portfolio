import {
    Card,
    CardTitle,
    CardHeader,
    CardContent
} from "@/components/ui/card";
import { User } from "lucide-react";

export const AboutMe = () => {
    return (
        <Card className="glass-card border-none">
            <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <User className="size-5" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                        About Me
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground leading-relaxed text-lg">
                <p>
                    I am a passionate Software Engineer with a strong foundation in building scalable web applications.
                    My journey in tech has been driven by a curiosity to understand how things work and a desire to create impactful digital solutions.
                </p>
                <p>
                    With expertise in both frontend and backend technologies, I enjoy tackling complex problems and delivering user-centric experiences.
                    I am constantly learning and adapting to new technologies to stay ahead in the ever-evolving tech landscape.
                </p>
                <p>
                    When I&apos;m not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my knowledge with the community.
                </p>
            </CardContent>
        </Card>
    )
}