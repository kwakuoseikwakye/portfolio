import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";
// TODO: Update skills
const skills = ["TypeScript", "JavaScript", "NextJs", "Python", "FastApi", "PHP", "Laravel", "Go", "GinFramework"]

export const Skills = () => {
    return (
        <Card className="mt-8 backdrop-blur-xl">
            <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-800">Skills</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-3">
                    {skills.map((s, i) => (
                        <div key={i} className="glass-badge text-gray-700 font-medium text-sm">
                            {s}
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}