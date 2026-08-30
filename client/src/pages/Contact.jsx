import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import PageTransition from "../components/ui/slider";
import { Button } from "@/components/ui/button";
import "animate.css";
import { toast } from "react-toastify";

const GlassPanel = ({ children, className = "" }) => (
  <div
    className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/3 backdrop-blur-2xl shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset,0_20px_60px_-15px_rgba(0,0,0,0.6)] ${className}`}
  >
    <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-white/[6 via-white/0 to-transparent" />
    <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-white/6 blur-3xl" />
    <div className="pointer-events-none absolute -bottom-28 -right-20 h-64 w-64 rounded-full bg-amber-500/8 blur-3xl" />
    <div className="relative">{children}</div>
  </div>
);

const locations = [
  {
    city: "Kabul Showroom",
    detail: "Antique Frosha Lane, Kabul",
    hours: "Sat – Thu, 9am – 6pm",
    phone: "+93 78 585 8419",
  },
];

const Contact = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");

  const materials = [
    "Handmade Carpet",
    "Silk Carpet",
    "Killim",
    "Natural-dyed Wool",
  ];
  const sizes = ["3' x 5'", "5' x 8'", "8' x 10'", "Custom size"];

  const sendInquiry = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_k23wcrs",
        "template_c7t5bsl",
        formRef.current,
        "Z7Ik-rctvOft2LPPP",
      )
      .then(
        () => {
          toast.success("Message sent Successfully!");
          formRef.current.reset();
          setMaterial("");
          setSize("");
          setIsSending(false);
        },
        (err) => {
          toast.error("Failed to send the message, please try again!");
          setIsSending(false);
        },
      );
  };

  return (
    <>
      {showIntro && (
        <PageTransition
          words={["Lets Talk About Your Carpet"]}
          onComplete={() => setShowIntro(false)}
        />
      )}

      <div className="container overflow-x-hidden">
        {/* Hero */}
        <section className="min-w-full min-h-60 bg-black text-white pt-32 sm:pt-40 pb-16 flex flex-col items-center justify-center relative overflow-hidden animate_animated animate__fadeInUp px-4">
          <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-64 w-64 sm:h-95 sm:w-95 rounded-full bg-amber-600/10 blur-[120px]" />
          <h3 className="font-semibold text-4xl sm:text-5xl md:text-7xl tracking-tight text-center mt-3 max-w-4xl leading-tight relative">
            Get in Touch
          </h3>
          <h3 className="text-center text-zinc-400 font-normal mt-6 text-base sm:text-lg md:text-[22px] max-w-2xl relative">
            Whether it's a single rug or a room-by-room commission, tell us what
            you have in mind.
          </h3>
        </section>

        {/* Form + Direct contact */}
        <section className="min-w-full bg-zinc-950 text-white py-16 sm:py-24 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 max-w-6xl mx-auto items-start">
            {/* Inquiry form */}
            <form ref={formRef} onSubmit={sendInquiry}>
              <GlassPanel className="p-6 md:p-10">
                <h2 className="font-semibold text-2xl sm:text-3xl tracking-tight">
                  Start an order inquiry
                </h2>
                <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                  This isn't a support ticket — it goes straight to the weaving
                  team who'll size and price it with you.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-400 text-sm font-medium">
                      Full name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      className="bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-amber-500/40 focus:bg-white/6 focus:ring-2 focus:ring-amber-500/10 w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-zinc-400 text-sm font-medium">
                      Phone or WhatsApp
                    </label>
                    <input
                      type="text"
                      name="email"
                      placeholder="+93 xx xxx xxxx"
                      className="bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors focus:border-amber-500/40 focus:bg-white/6 focus:ring-2 focus:ring-amber-500/10 w-full"
                    />
                  </div>
                </div>

                {/* Hidden inputs to feed button selection values into EmailJS form submission */}
                <input type="hidden" name="material" value={material} />
                <input type="hidden" name="size" value={size} />

                <div className="flex flex-col gap-2 mt-6">
                  <label className="text-zinc-400 text-sm font-medium">
                    Preferred material
                  </label>
                  <div className="flex gap-2.5 flex-wrap">
                    {materials.map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMaterial(m)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                          material === m
                            ? "border-amber-500/60 bg-amber-500/15 text-amber-50 shadow-[0_0_0_1px_rgba(245,158,11,0.15)]"
                            : "border-white/10 bg-white/3 text-zinc-300 hover:border-white/20 hover:bg-white/6 hover:text-white"
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  <label className="text-zinc-400 text-sm font-medium">
                    Approximate size
                  </label>
                  <div className="flex gap-2.5 flex-wrap">
                    {sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSize(s)}
                        className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer ${
                          size === s
                            ? "border-amber-500/60 bg-amber-500/15 text-amber-50 shadow-[0_0_0_1px_rgba(245,158,11,0.15)]"
                            : "border-white/10 bg-white/3 text-zinc-300 hover:border-white/20 hover:bg-white/6 hover:text-white"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                  <label className="text-zinc-400 text-sm font-medium">
                    Tell us about the space
                  </label>
                  <textarea
                    rows={4}
                    name="description"
                    placeholder="Room type, colors you're drawn to, any pattern references..."
                    className="bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 outline-none transition-colors resize-none focus:border-amber-500/40 focus:bg-white/6 focus:ring-2 focus:ring-amber-500/10 w-full"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSending}
                  variant="secondary"
                  className="mt-8 py-5 px-8 rounded-full cursor-pointer w-full sm:w-fit font-medium shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
                >
                  {isSending ? "Sending..." : "Send inquiry"}
                </Button>
              </GlassPanel>
            </form>

            {/* Direct contact + WhatsApp */}
            <div className="flex flex-col gap-6">
              <GlassPanel className="p-6 md:p-8">
                <p className="text-zinc-500 text-sm font-medium">
                  Prefer to just message us?
                </p>
                <h3 className="font-semibold text-xl sm:text-2xl tracking-tight mt-2">
                  WhatsApp is fastest
                </h3>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                  Most custom orders start as a photo and a voice note. Send us
                  both and we'll reply with options same-day.
                </p>
                <a
                  href="https://wa.me/93788544379"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="ghost"
                    className="mt-5 py-5 px-7 rounded-full border border-white/15 hover:bg-white hover:text-black cursor-pointer w-full sm:w-fit font-medium transition-colors"
                  >
                    Message on WhatsApp
                  </Button>
                </a>
              </GlassPanel>

              <GlassPanel className="p-6 md:p-8">
                <h3 className="font-semibold text-lg sm:text-xl tracking-tight">
                  Email
                </h3>
                <p className="text-zinc-300 text-sm mt-2 wrap-break-word">
                  orders@baraticarpets.com
                </p>
                <div className="h-px bg-white/10 my-5" />
                <h3 className="font-semibold text-lg sm:text-xl tracking-tight">
                  Phone
                </h3>
                <p className="text-zinc-300 text-sm mt-2">+93 78 854 4379</p>
              </GlassPanel>
            </div>
          </div>
        </section>

        {/* Showrooms */}
        <section className="min-w-full bg-black text-white py-16 sm:py-24 px-4">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            <h3 className="text-center text-zinc-500 text-sm font-medium uppercase tracking-widest">
              Visit in Person
            </h3>
            <h2 className="font-semibold text-3xl sm:text-4xl md:text-5xl tracking-tight text-center mt-3">
              See the weave before you decide.
            </h2>

            <div className="grid mt-14 w-full justify-items-center">
              {locations.map((loc) => (
                <GlassPanel
                  key={loc.city}
                  className="p-6 md:p-8 w-full max-w-lg"
                >
                  <h4 className="font-semibold text-xl sm:text-2xl tracking-tight">
                    {loc.city}
                  </h4>
                  <p className="text-zinc-400 text-sm mt-3">{loc.detail}</p>
                  <p className="text-zinc-500 text-sm mt-1">{loc.hours}</p>
                  <p className="text-zinc-500 text-sm mt-1">{loc.phone}</p>
                </GlassPanel>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Contact;
