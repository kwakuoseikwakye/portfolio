import { Sidebar } from "@/components/Sidebar";
import { AboutMe } from "@/components/AboutMe";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[35%] bg-purple-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] bg-blue-500/20 rounded-full mix-blend-screen filter blur-[120px] opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container max-w-screen-xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Section - Sticky on Desktop */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-8 space-y-8">
              <Sidebar />
              <div className="hidden lg:block">
                <Skills />
              </div>
            </div>
          </div>

          {/* Main Section */}
          <main className="lg:col-span-8 xl:col-span-9 space-y-12">
            {/* Mobile Skills (visible only on mobile) */}
            <div className="lg:hidden">
              <Skills />
            </div>

            {/* About Me Section */}
            <section id="about" className="scroll-mt-20">
              <AboutMe />
            </section>

            {/* Projects Section */}
            <section id="projects" className="scroll-mt-20">
              <Projects />
            </section>

            {/* Experience Section */}
            <section id="experience" className="scroll-mt-20">
              <Experience />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
