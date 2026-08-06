import { Button } from "@/components/ui/button";
import { useState } from "react";
import PageTransition from "../components/ui/slider";
import CategoryScroll from "@/components/layout/categoryScroll";
import { Hand, Truck, ShieldCheck, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import BannerSlider from "@/components/common/bannerSlider";
const Home = () => {
  const [showIntro, setShowIntro] = useState(true);
  const navigate = useNavigate();

  return (
    <>
      {showIntro && (
        <PageTransition
          words={["Welcome"]}
          onComplete={() => setShowIntro(false)}
        />
      )}
      {/* hero section */}
      <section className="relative min-w-full min-h-screen overflow-hidden bg-black text-white pt-30">
        {/* Ambient color blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 h-128 w-lg rounded-full bg-amber-700/20 blur-[120px]" />
          <div className="absolute top-1/3 -right-40 h-112 w-md rounded-full bg-rose-900/25 blur-[120px]" />
          <div className="absolute bottom-0 left-1/3 h-96 w-[24rem] rounded-full bg-orange-800/15 blur-[120px]" />
        </div>

        <div className="relative z-10">
          {/* Eyebrow badge */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 backdrop-blur-xl px-4 py-1.5 text-xs font-medium tracking-wide text-stone-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Handwoven in Kabul since 2010
            </span>
          </div>

          <h3 className="text-center text-stone-400 text-lg text-[18px] mt-6">
            Barati Carpets
          </h3>
          <h1 className="font-bold text-5xl md:text-7xl text-center mt-3">
            The Future of Carpet.
          </h1>
          <h3 className="text-center text-stone-400 text-lg mt-6 text-[22px] max-w-2xl mx-auto px-4">
            Handcrafted rugs woven with generations of Afghan tradition —
            comfort at its peak.
          </h3>

          <div className="min-w-full h-fit py-5 flex items-center justify-center gap-5 mt-4">
            <Button
              variant="secondary"
              className="py-5 px-7 rounded-full cursor-pointer"
              onClick={() => navigate("/products")}
            >
              Shop Collection
            </Button>
            <Button
              variant="ghost"
              className="py-5 px-7 rounded-full hover:bg-black border border-white hover:text-white cursor-pointer"
              onClick={() => navigate("/about")}
            >
              Our Story
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 px-4">
            {[
              { icon: Hand, label: "100% Handwoven" },
              { icon: Truck, label: "Worldwide Shipping" },
              { icon: ShieldCheck, label: "Quality Guaranteed" },
            ].map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-stone-400"
              >
                <Icon size={16} strokeWidth={1.5} />
                <span className="text-sm">{label}</span>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <div className="mt-16 flex justify-center animate-bounce">
            <ChevronDown size={22} className="text-stone-500" />
          </div>
        </div>
      </section>
      <section className=" w-full min-h-fit overflow-hidden bg-black text-white py-8 px-4 md:px-8">
        <BannerSlider />
      </section>
      <section className="bg-zinc-900 py-16">
        <CategoryScroll />
        <CategoryScroll />

      </section>
      {/* portal to shop */}
    </>
  );
};

export default Home;
