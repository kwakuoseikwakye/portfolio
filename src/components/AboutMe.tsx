import {
    Card,
    CardTitle,
    CardHeader,
    CardContent
} from "@/components/ui/card";


export const AboutMe = () => {
    return (    

    <Card className="backdrop-blur-xl">
        <CardHeader className="pb-4">
            <CardTitle className="text-2xl font-bold text-gray-800">About Me</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-gray-600 text-lg leading-relaxed">
                I am a software engineer with a passion for building scalable and efficient web applications. 
                With over 5 years of experience in modern software engineering, I specialize in creating 
                innovative solutions that drive business growth and enhance user experiences.
            </p>
        </CardContent>
    </Card>
    )
}