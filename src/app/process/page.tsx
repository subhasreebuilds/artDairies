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
      <section className="py-24 px-6 text-center max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl tracking-widest mb-8">MY PROCESS</h1>
        <p className="font-light text-lg tracking-wide text-ink-800/80 leading-relaxed">
          Art is a meditation. Creating these pieces requires hours of focus, patience, and a deep connection to the present moment. Here is a glimpse into how a blank surface transforms into a finished artwork.
        </p>
      </section>

      {/* Timeline */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="space-y-32">
          {processSteps.map((step, index) => (
            <div 
              key={step.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12 lg:gap-24`}
            >
              {/* Image Side */}
              <div className="w-full lg:w-1/2 aspect-[4/3] relative group overflow-hidden shadow-lg">
                <div className={`absolute inset-0 ${step.imageColor} transition-transform duration-1000 group-hover:scale-105`} />
                <div className="absolute inset-0 flex items-center justify-center text-ivory/30 font-serif text-[10rem] font-bold select-none mix-blend-overlay">
                  {step.id}
                </div>
              </div>

              {/* Text Side */}
              <div className="w-full lg:w-1/2">
                <span className="text-accent-gold font-serif text-3xl mb-4 block">
                  {step.id} —
                </span>
                <h2 className="font-serif text-3xl md:text-4xl mb-6">
                  {step.title}
                </h2>
                <p className="font-light text-lg leading-relaxed text-ink-800/80">
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
