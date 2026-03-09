import { ScrollCanvas } from "@/components/ScrollCanvas";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-b from-[#3E2723] to-[#1A100E] text-[#F3E5D8] selection:bg-[#D2B48C] selection:text-black">
      {/* 
        Hero Section + Canvas Background
        The scroll canvas will handle its own sticky positioning and cover the background of the right side (or full screen).
      */}
      
      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pointer-events-none">
        {/* We use pointer-events-none on the container and point-events-auto on the interactive elements 
            so that the user can still interact with the canvas if needed, though mostly it's just scrolling. */}
            
        <div className="min-h-screen flex items-center">
          <div className="w-full lg:w-1/2 pointer-events-auto">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]">
              Creative <br/> Developer.
            </h1>
            <p className="text-lg md:text-xl text-[#D2B48C] font-light max-w-md mb-8 leading-relaxed">
              Crafting Awwwards-level digital experiences with Next.js, Framer Motion, and scroll-triggered animations.
            </p>
            
            {/* Profile Section */}
            <div className="mt-12 p-8 border border-[#5D4037]/30 bg-[#2B1B15]/40 backdrop-blur-md rounded-2xl w-full max-w-lg relative">
              <div className="relative w-24 h-24 rounded-full bg-[#1A100E] border-2 border-[#D2B48C] mb-6 flex items-center justify-center overflow-hidden">
                <span className="absolute z-0 text-xs text-[#8D6E63]">Photo Here</span>
                <img 
                  src="/danny.jpeg" 
                  alt="Danish Almer" 
                  className="w-full h-full object-cover relative z-10" 
                />
              </div>
              <h2 className="text-3xl font-bold mb-1">Danish Almer</h2>
              <h3 className="text-sm tracking-wide text-[#D2B48C] mb-4 uppercase font-medium">Aspiring Software Engineer | B.Tech CSE (DBATU)</h3>
              <p className="text-sm text-[#F3E5D8] opacity-90 leading-relaxed mb-6 border-[#5D4037]/50">
                I'm currently pursuing a degree in Computer Science & Engineering with a strong foundation in core programming languages like Java, C, and Python. Passionate about building efficient, real-world software solutions and exploring AI/ML. Looking forward to collaborative opportunities in software development and problem-solving.
              </p>
              <div className="flex gap-6 text-sm font-medium tracking-wide">
                <a href="https://github.com/shaikhdanish-create" target="_blank" rel="noreferrer" className="text-[#8D6E63] hover:text-[#D2B48C] transition-colors border-b border-transparent hover:border-[#D2B48C] pb-1">GitHub</a>
                <a href="https://www.linkedin.com/in/danish-almer" target="_blank" rel="noreferrer" className="text-[#8D6E63] hover:text-[#D2B48C] transition-colors border-b border-transparent hover:border-[#D2B48C] pb-1">LinkedIn</a>
                <a href="mailto:shaikhkingdanish@gmail.com" className="text-[#8D6E63] hover:text-[#D2B48C] transition-colors border-b border-transparent hover:border-[#D2B48C] pb-1">Email</a>
              </div>
            </div>
          </div>
          
          {/* Right side is intentionally left empty/transparent so the cinematic coffee cups are visible */}
          <div className="hidden lg:block w-1/2" />
        </div>

        {/* More scroll content to trigger the animation */}
        <div className="min-h-[200vh] py-32 pointer-events-auto">
          <div className="w-full lg:w-1/2">
            <h2 className="text-4xl font-bold mb-8">The Transition.</h2>
            <p className="text-lg text-[#D2B48C] font-light max-w-md">
              Keep scrolling to see the locked camera product transition. The cream cup tilts forward and the lid lifts dynamically as you move down the page.
            </p>
          </div>
        </div>

      </div>

      {/* Background Canvas Animation */}
      <div className="absolute inset-0 pointer-events-none z-0">
         {/* We place it absolutely to overlay behind the text, and stick it to the screen. 
             The ScrollCanvas component handles taking up the correct scroll height (e.g. 300vh) */}
         <ScrollCanvas 
            frameCount={100} 
            framePathTemplate="/frames/cup_anim_{index}.svg"
            className="w-full"
         />
      </div>

    </main>
  );
}
