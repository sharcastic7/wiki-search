import { VercelRequest } from "@vercel/node";
import { fetcher } from "@/utils";

export const runtime = "edge";

export async function GET(request: VercelRequest) {
  const params = new URLSearchParams(request.url?.split("?")[1]);
  const searchTerm = params.get("search");
  const offset = params.get("offset") || 0;
  const result = await fetcher(
    `https://en.wikipedia.org/w/api.php?action=query&gpsoffset=${offset}&generator=prefixsearch&gpslimit=10&gpsnamespace=0&gpssearch=${searchTerm}&pilimit=10&piprop=thumbnail&pithumbsize=120&prop=pageimages%7Cdescription&format=json`
  );

  return new Response(JSON.stringify({ result }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
