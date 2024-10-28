import { Handlers, PageProps } from "$fresh/server.ts";
import { toDirectDownloadUrl } from "../lib/onedrive-link.ts";

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
    <div class="p-4 flex flex-col gap-8 container mx-auto">
      <h1 class="text-3xl font-bold text-zinc-800">
        OneDrive Direct Download Generator
      </h1>
      <div class="flex flex-col gap-4">
        <form class="flex w-full gap-4">
          <label class="flex-1 flex gap-4 items-center font-semibold">
            Share URL:
            <input
              type="text"
              name="shareUrl"
              value={shareUrl}
              class="border rounded-md p-2 flex-1 font-normal"
              autofocus
            />
          </label>
          <button
            type="submit"
            class="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-md"
          >
            Generate
          </button>
        </form>
        {result && (
          <div class="flex flex-col">
            <span class="font-semibold">Direct Download URL:</span>
            <a
              href={result}
              class="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            >
              {result}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
