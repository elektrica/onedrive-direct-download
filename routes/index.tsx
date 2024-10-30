import { X } from "lucide-preact";

import { Handlers, PageProps } from "$fresh/server.ts";
import { toDirectDownloadUrl } from "../lib/onedrive-link.ts";
import CopyButton from "../islands/copy-button.tsx";

interface Data {
  result?: string;
  shareUrl?: string;
}

export const handler: Handlers<Data> = {
  GET(req, ctx) {
    const url = new URL(req.url);
    const shareUrl = url.searchParams.get("shareUrl");
    if (!shareUrl) return ctx.render({});

    const result = toDirectDownloadUrl(shareUrl);
    return ctx.render({ result, shareUrl });
  },
};

export default function Page({ data }: PageProps<Data>) {
  const { result, shareUrl } = data;
  return (
    <div class="p-4 flex flex-col gap-8 h-full items-center justify-center">
      <div class="flex flex-col w-full max-w-sm gap-4">
        <form class="flex flex-col gap-4">
          <label class="flex flex-col gap-2">
            <span class="font-semibold text-sm">Share URL</span>
            <div class="flex-1 relative">
              <input
                type="text"
                name="shareUrl"
                value={shareUrl}
                class="border rounded-md p-2 w-full font-normal"
                autofocus
              />
              <div class="absolute top-0 right-2 h-full flex items-center justify-center">
                <a
                  class="right-1.5 bottom-1.5 p-1 rounded-full hover:bg-zinc-100"
                  href="/"
                >
                  <X class="w-5 h-5" />
                </a>
              </div>
            </div>
          </label>
          <button
            type="submit"
            class="font-semibold bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md"
          >
            Generate Direct Download URL
          </button>
        </form>
        {result && (
          <div class="flex gap-2 items-end">
            <label class="flex-1 flex flex-col gap-2">
              <span class="font-semibold text-sm">
                Direct Download URL
              </span>
              <input
                class="border rounded-md p-2 flex-1 font-normal"
                value={result}
                readOnly
              />
            </label>
            <CopyButton content={result} />
          </div>
        )}
      </div>
    </div>
  );
}
