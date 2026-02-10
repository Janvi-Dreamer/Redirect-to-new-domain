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

  // Ensure karein ki domain ke end me slash ka issue na ho
  const targetDomain = env.NEW_DOMAIN.endsWith('/') 
    ? env.NEW_DOMAIN.slice(0, -1) 
    : env.NEW_DOMAIN;

  // Destination URL construct karein (path aur search params ke sath)
  const destination = `${targetDomain}${url.pathname}${url.search}`;

  // 307 Temporary Redirect return karein
  return Response.redirect(destination, 307);
};
