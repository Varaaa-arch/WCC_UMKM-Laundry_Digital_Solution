import { BubbleButton } from "@/components/ui/bubble-button";
import { PlayIcon } from "lucide-react";

export default function BubbleDemo() {
  return (
    <div className="min-h-screen bg-[#e8f0fe] flex flex-col items-center justify-center gap-20">
      <BubbleButton className="flex items-center gap-3 px-12 py-5 rounded-full font-bold text-white text-2xl bg-gradient-to-r from-sky-400 to-blue-600 shadow-[0_8px_32px_rgba(59,130,246,0.4)]">
        <PlayIcon className="w-7 h-7 fill-white" />
        play
      </BubbleButton>

      <BubbleButton className="px-10 py-4 rounded-full font-bold text-white text-lg bg-gradient-to-r from-blue-500 to-blue-700 shadow-[0_8px_32px_rgba(59,130,246,0.4)]">
        Pesan Sekarang
      </BubbleButton>
    </div>
  );
}
