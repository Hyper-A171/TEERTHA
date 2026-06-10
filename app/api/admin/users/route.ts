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

    const [users] = await db.execute<any[]>(
      `SELECT u.id, u.name, u.email, u.role_id, u.created_at, r.name as role_name 
       FROM users u 
       JOIN roles r ON u.role_id = r.id 
       ORDER BY u.name ASC`
    );

    // Strip passwords before returning (though we didn't SELECT them above anyway)
    const safeUsers = users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      role_id: u.role_id,
      role: {
        id: u.role_id,
        name: u.role_name
      },
      created_at: u.created_at
    }));

    return NextResponse.json(safeUsers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
