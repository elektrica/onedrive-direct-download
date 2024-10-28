import { useSignal } from "https://esm.sh/v135/@preact/signals@1.2.2/X-ZS8q/dist/signals.js";
import { Check, Copy } from "lucide-preact";

interface Props {
  content: string;
}

export default function CopyButton({ content }: Props) {
  const copied = useSignal(false);

  return (
    <>
      <button
        class="border hover:bg-zinc-100 rounded-md px-4 py-3"
        onClick={() => {
          navigator.clipboard.writeText(content);
          copied.value = true;
          setTimeout(() => {
            copied.value = false;
          }, 5000);
        }}
      >
        <span class="sr-only">Copy</span>
        <Copy class="w-4 h-4" />
      </button>
      {copied.value &&
        (
          <div class="absolute bottom-0 right-0 px-5 py-3 border rounded-md m-4 flex gap-3 items-center">
            <Check class="w-4 h-4" />
            Copied
          </div>
        )}
    </>
  );
}
