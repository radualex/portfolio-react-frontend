interface EdgeContext {
  next: () => Promise<Response>;
}

declare const Netlify: {
  env: { get: (key: string) => string | undefined };
};

export default async (
  request: Request,
  context: EdgeContext,
): Promise<Response> => {
  const credentials = Netlify.env.get("ADMIN_CREDENTIALS");
  const provided = request.headers.get("authorization");
  const authorized = credentials
    ? provided === `Basic ${btoa(credentials)}`
    : false;
  const { pathname } = new URL(request.url);

  if (pathname === "/admin/status") {
    return new Response(
      authorized ? "Authenticated." : "Authentication required.",
      {
        status: authorized ? 200 : 401,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }

  if (!authorized) {
    return new Response("Authentication required.", {
      status: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Admin", charset="UTF-8"' },
    });
  }

  return context.next();
};
