import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ text = "Hello Rainbow The Learner Zone, I would like to know about admissions." }: { text?: string }) {
  return (
    <a href={`https://wa.me/916263549413?text=${encodeURIComponent(text)}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition hover:scale-105">
      <MessageCircle size={27} fill="currentColor" />
    </a>
  );
}
