import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCreditsSnapshot } from "@/lib/credits";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snapshot = await getCreditsSnapshot(userId);
  return NextResponse.json(snapshot, { status: 200 });
}

