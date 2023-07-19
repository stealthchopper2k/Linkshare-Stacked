import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function GET(request: Request, { params: { id } }: Params) {
  if (!id) {
    return NextResponse.next(
      new Response("No tree with this ID exists", { status: 404 })
    );
  }

  const response = await fetch();

  const nodes = await response.json();

  return NextResponse.json(nodes);
}
