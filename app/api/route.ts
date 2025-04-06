import OpenGraphImage from "@/components/OpenGraphImage";
import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const title = searchParams.has("title")
      ? searchParams.get("title")
      : "Find more at";

    return new ImageResponse(
      OpenGraphImage({ title: title ?? "Atakan Zengin" }),
      {
        width: 1200,
        height: 600,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to generate Opengraph Image", { status: 500 });
  }
}
