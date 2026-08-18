import Image from "next/image";

const processSteps = [
  {
    id: "01",
    title: "Inspiration",
    description: "Every piece begins with an observation—a traditional motif, a moment of stillness, or a cultural story. I spend time researching and meditating on the subject before any physical work begins.",
    imageColor: "bg-earth-100"
  },
  {
    id: "02",
    title: "Initial Sketch",
    description: "The foundation is laid lightly with pencil. For mandalas and geometric pieces, this stage requires precise mathematical division of the canvas to ensure perfect symmetry.",
    imageColor: "bg-earth-200"
  },
  {
    id: "03",
    title: "Pattern & Detailing",
    description: "The core of my work lies in the intricate details. Using fine liners or fine brushes, I build up layers of patterns, breathing life into the initial structure.",
    imageColor: "bg-earth-300"
  },
  {
    id: "04",
    title: "Color / Dot Work",
    description: "Whether it's the vibrant acrylics of an Odisha-inspired piece or the meticulous application of thousands of dots for a mandala, color is added with immense patience.",
    imageColor: "bg-ink-800"
  },
  {
    id: "05",
    title: "Final Artwork",
    description: "The finished piece is sealed to protect its vibrancy. What was once a blank canvas is now a tangible entry in the Art Diaries—ready to be shared with the world.",
    imageColor: "bg-accent-gold"
  }
];

export default function ProcessPage() {
  return (
    <div className="min-h-screen bg-ivory text-ink-900 pb-24">
      {/* Header */}
      <section className="py-24 px-6 text-center max-w-4xl mx-auto border-b border-ink-900/10 mb-24">
        <span className="text-accent-gold text-xs tracking-[0.2em] uppercase mb-6 block font-light">
          Behind the Canvas
        </span>
        <h1 className="font-serif text-5xl md:text-7xl tracking-tight mb-8">My Process</h1>
        <p className="font-light text-lg tracking-wide text-ink-800/80 leading-[1.8]">
          Art is a meditation. Creating these pieces requires hours of focus, patience, and a deep connection to the present moment. Here is a glimpse into how a blank surface transforms into a finished artwork.
        </p>
      </section>

      {/* Timeline */}
      <section className="max-w-[1400px] mx-auto px-6">
        <div className="space-y-32">
          {processSteps.map((step, index) => (
            <div 
              key={step.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-32`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 aspect-[4/3] relative group overflow-hidden bg-earth-100 shadow-sm p-8">
                <div className={`absolute inset-0 ${step.imageColor} mix-blend-multiply opacity-20`} />
                <div className="w-full h-full border border-ink-900/10 flex items-center justify-center relative overflow-hidden group-hover:border-ink-900/20 transition-colors duration-700">
                  <div className="absolute inset-0 bg-white/50 backdrop-blur-sm" />
                  <div className="relative text-ink-900/10 font-serif text-[12rem] leading-none font-light select-none transform group-hover:scale-105 transition-transform duration-[2s] ease-out">
                    {step.id}
                  </div>
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2">
                <span className="text-ink-800/40 text-sm tracking-[0.2em] uppercase mb-6 block">
                  Step {step.id}
                </span>
                <h2 className="font-serif text-4xl md:text-5xl mb-8 leading-[1.1] text-ink-900">
                  {step.title}
                </h2>
                <p className="font-light text-lg leading-[1.8] text-ink-800/80 max-w-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
