import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

// GET all users
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || ((session.user as any).role !== "Super Admin" && (session.user as any).role !== "Admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await db.user.findMany({
      include: { role: true },
      orderBy: { name: "asc" }
    });

    // Strip passwords before returning
    const safeUsers = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role_id: u.role_id,
      role: u.role,
      created_at: u.created_at
    }));

    return NextResponse.json(safeUsers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
