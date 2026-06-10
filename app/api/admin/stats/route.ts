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
    const [[{ count: totalUsers }]] = await db.execute<any[]>('SELECT COUNT(*) as count FROM users');
    const [[{ count: totalTemples }]] = await db.execute<any[]>('SELECT COUNT(*) as count FROM temples');
    const [[{ count: totalCategories }]] = await db.execute<any[]>('SELECT COUNT(*) as count FROM temple_categories');
    const [[{ count: totalLogs }]] = await db.execute<any[]>('SELECT COUNT(*) as count FROM activity_logs');

    // Fetch recent logs
    const [recentLogs] = await db.execute<any[]>(
      `SELECT a.*, u.name as user_name, u.email as user_email 
       FROM activity_logs a 
       JOIN users u ON a.user_id = u.id 
       ORDER BY a.created_at DESC 
       LIMIT 5`
    );

    const formattedLogs = recentLogs.map(log => ({
      ...log,
      user: { name: log.user_name, email: log.user_email }
    }));

    return NextResponse.json({
      totalUsers,
      totalTemples,
      totalCategories,
      totalLogs,
      recentLogs: formattedLogs
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
