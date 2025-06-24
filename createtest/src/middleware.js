import { NextResponse } from "next/server";

export const config = {
  matcher: "/integrations/:path*",
};

export function middleware(request) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-createxyz-project-id", "4825ef5f-52e5-4d4d-b40e-5e7fa8ca7fef");
  requestHeaders.set("x-createxyz-project-group-id", "c4f79daf-ff1d-4be0-aef5-274a8a746da0");


  request.nextUrl.href = `https://www.create.xyz/${request.nextUrl.pathname}`;

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  });
}