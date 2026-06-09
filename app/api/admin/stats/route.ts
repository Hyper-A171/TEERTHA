import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    // Verify session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const role = (session.user as any).role;
    if (role !== "Super Admin" && role !== "Admin") {
      return NextResponse.json({ error: "Forbidden access" }, { status: 403 });
    }

    // Fetch counts
    const totalUsers = await db.user.count();
    const totalTemples = await db.temple.count();
    const totalCategories = await db.templeCategory.count();
    const totalLogs = await db.activityLog.count();

    // Fetch recent logs
    const recentLogs = await db.activityLog.findMany({
      take: 5,
      orderBy: { created_at: "desc" },
      include: {
        user: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json({
      totalUsers,
      totalTemples,
      totalCategories,
      totalLogs,
      recentLogs
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
