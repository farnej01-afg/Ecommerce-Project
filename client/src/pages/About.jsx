import { useState } from "react";
import PageTransition from "../components/ui/slider";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

// Liquid glass panel — the signature element for this page.
const GlassPanel = ({ children, className = "" }) => (
  <div
    className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/4 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.45)] ${className}`}
  >
    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/15 via-white/0 to-transparent opacity-60" />
    <div className="pointer-events-none absolute -top-20 -left-20 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />
    <div className="relative">{children}</div>
  </div>
);

const process = [
  {
    n: "01",
    title: "Sourcing the Wool",
    body: "Highland wool, chosen fleece by fleece from herds across the Hindu Kush foothills.",
  },
  {
    n: "02",
    title: "Hand-Spinning",
    body: "Cleaned, carded, and spun by hand — no machine spinning, ever.",
  },
  {
    n: "03",
    title: "Natural Dyeing",
    body: "Madder root, walnut husk, indigo, pomegranate skin. Colors that deepen with age.",
  },
  {
    n: "04",
    title: "Knot by Knot",
    body: "Tied on a vertical loom, one knot at a time, by hand.",
  },
  {
    n: "05",
    title: "Wash & Finish",
    body: "A final wash and hand-trim brings out the sharpness of every motif.",
  },
];

const stats = [
  { value: "2010", label: "Founded in Kabul by Salahuddin Barati" },
  { value: "8+", label: "Years of hands-on experience in the trade" },
  { value: "$2,500", label: "Value of our finest pure silk carpets" },
  {
    value: "Trusted",
    label: "Source for other carpet sellers across Afghanistan",
  },
];

const About = () => {
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      {showIntro && (
        <PageTransition
          words={["Woven By Hand,", " Carried by time."]}
          onComplete={() => setShowIntro(false)}
        />
      )}

      <div className="bg-black">
        {/* SECTION 1 — Story */}
        <section className="relative min-h-screen w-full overflow-hidden flex items-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-amber-700/20 blur-[120px]" />
            <div className="absolute bottom-0 -right-40 h-[28rem] w-[28rem] rounded-full bg-rose-900/20 blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center pt-24">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] backdrop-blur-xl px-4 py-1.5 text-xs font-medium tracking-wide text-stone-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Est. 2010 · Kabul, Afghanistan
              </span>

              <h1 className="font-bold text-6xl mt-6 leading-[1.05] text-white">
                Woven by hand.
                <br />
                Trusted by the trade.
              </h1>

              <p className="text-stone-400 text-lg mt-6 leading-relaxed max-w-lg">
                Barati Carpets was founded in 2010 in Kabul by Salahuddin
                Barati, who brings over 8 years of hands-on experience in the
                carpet trade. Other carpet sellers across Afghanistan source
                their own stock through us — a trust that's harder to earn than
                any tagline.
              </p>

              <div className="flex gap-4 mt-8">
                <Button
                  onClick={() => navigate("/products")}
                  className="rounded-full px-7 py-5 bg-white text-black hover:bg-white/90"
                >
                  Shop the collection
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full px-7 py-5 border border-white/20 text-white hover:bg-white/10"
                >
                  Read our process
                </Button>
              </div>
            </div>

            <GlassPanel className="p-10">
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-bold text-4xl text-white">
                      {stat.value}
                    </p>
                    <p className="text-stone-400 text-sm mt-2 leading-snug">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </div>
        </section>

        {/* SECTION 2 — Process + CTA */}
        <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-1/4 left-1/3 h-[26rem] w-[26rem] rounded-full bg-orange-800/15 blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-24">
            <h3 className="text-stone-400 text-sm tracking-widest uppercase">
              The Process
            </h3>
            <h2 className="font-bold text-4xl mt-2 text-white">
              From fleece to finished floor.
            </h2>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-4">
              {process.map((step) => (
                <GlassPanel key={step.n} className="p-5">
                  <span className="text-amber-500/80 text-xs tracking-widest">
                    {step.n}
                  </span>
                  <h4 className="font-semibold text-base mt-2 text-white">
                    {step.title}
                  </h4>
                  <p className="text-stone-400 text-xs mt-2 leading-relaxed">
                    {step.body}
                  </p>
                </GlassPanel>
              ))}
            </div>

            <GlassPanel className="mt-14 px-10 py-12 flex flex-col md:flex-row items-center justify-between gap-6 ">
              <div className="ml-2">
                <h2 className="font-bold text-3xl text-white">
                  Made by hand. Made to last.
                </h2>
                <p className="text-stone-400 mt-2">
                  See the collection, founded and run by Salahuddin Barati.
                </p>
              </div>
              <div className="flex gap-4 shrink-0 mt-3">
                <Button
                  onClick={() => navigate("/products")}
                  className="rounded-full px-6 py-4 bg-white text-black hover:bg-white/90"
                >
                  View the collection
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full px-6 py-4 border border-white/20 text-white hover:bg-white/10"
                >
                  Meet me in person
                </Button>
              </div>
            </GlassPanel>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
