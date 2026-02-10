// functions/[[path]].ts

interface Env {
  NEW_DOMAIN: string;
}

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);

  // Check agar NEW_DOMAIN set nahi hai to error avoid karein
  if (!env.NEW_DOMAIN) {
    return new Response("NEW_DOMAIN environment variable is not set.", { status: 500 });
  }

  let targetDomain = env.NEW_DOMAIN;

  // 1. Check karein ki protocol (http/https) hai ya nahi, nahi to https:// lagayein
  if (!targetDomain.startsWith("http://") && !targetDomain.startsWith("https://")) {
    targetDomain = `https://${targetDomain}`;
  }

  // 2. Domain ke end se slash remove karein (agar hai to) taki double slash na bane
  if (targetDomain.endsWith('/')) {
    targetDomain = targetDomain.slice(0, -1);
  }

  // Destination URL construct karein
  const destination = `${targetDomain}${url.pathname}${url.search}`;

  // 307 Temporary Redirect return karein
  return Response.redirect(destination, 307);
};
