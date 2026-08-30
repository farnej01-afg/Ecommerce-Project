import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateInquiry } from "@/hooks/useInquiry";
import { toast } from "react-toastify";

const materials = [
  "Handmade Carpet",
  "Silk Carpet",
  "Killim",
  "Natural-dyed Wool",
];
const sizes = ["3' x 5'", "5' x 8'", "8' x 10'", "Custom size"];

const ShortMessageModal = ({ onClose }) => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [material, setMaterial] = useState("");
  const [size, setSize] = useState("");

  const { mutateAsync: createInquiry } = useCreateInquiry();

  const sendInquiry = async (e) => {
    e.preventDefault();
    setIsSending(true);

    const formData = new FormData(formRef.current);
    const name = formData.get("name");
    const phone = formData.get("email"); // form field is mislabeled "email" but holds a phone/WhatsApp number
    const description = formData.get("description");

    try {
      // save to backend first, as planned
      await createInquiry({
        type: "short_message",
        name,
        phone,
        material,
        size,
        message: description,
      });

      // then send via EmailJS, same as before
      await emailjs.sendForm(
        "service_k23wcrs",
        "template_c7t5bsl",
        formRef.current,
        "Z7Ik-rctvOft2LPPP",
      );

      toast.success("Message sent Successfully!");
      formRef.current.reset();
      setMaterial("");
      setSize("");
      onClose();
    } catch (err) {
      toast.error("Failed to send the message, please try again!");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 bg-zinc-950/95 backdrop-blur-2xl p-6 md:p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]">
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 p-1.5 rounded-lg hover:bg-white/10 text-white/60"
        >
          <X size={18} />
        </button>

        <h2 className="font-semibold text-2xl tracking-tight text-white">
          Send a short message
        </h2>
        <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
          This isn't a support ticket — it goes straight to the weaving team
          who'll size and price it with you.
        </p>

        <form ref={formRef} onSubmit={sendInquiry} className="mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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
            className="mt-8 py-5 px-8 rounded-full cursor-pointer w-full font-medium shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] transition-transform hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
          >
            {isSending ? "Sending..." : "Send inquiry"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ShortMessageModal;
