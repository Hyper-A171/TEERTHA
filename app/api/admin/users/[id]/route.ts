import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT /api/admin/users/[id]
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const currentRole = (session.user as any).role;
    // Only Super Admin can change user roles
    if (currentRole !== "Super Admin") {
      return NextResponse.json({ error: "Forbidden. Super Admin access required." }, { status: 403 });
    }

    const resolvedParams = await params;
    const targetUserId = parseInt(resolvedParams.id);
    const { role_id } = await req.json();

    if (!role_id) {
      return NextResponse.json({ error: "Role ID is required" }, { status: 400 });
    }

    const [targetUserRows] = await db.execute<any[]>(
      'SELECT u.id, u.name, u.email, r.name as role_name FROM users u JOIN roles r ON u.role_id = r.id WHERE u.id = ?',
      [targetUserId]
    );

    if (targetUserRows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const targetUser = targetUserRows[0];

    const parsedRoleId = parseInt(role_id);
    const [roleRows] = await db.execute<any[]>('SELECT id, name FROM roles WHERE id = ?', [parsedRoleId]);

    if (roleRows.length === 0) {
      return NextResponse.json({ error: "Target role not found" }, { status: 404 });
    }
    const roleToAssign = roleRows[0];

    await db.execute('UPDATE users SET role_id = ? WHERE id = ?', [parsedRoleId, targetUserId]);

    // Log action
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [parseInt((session.user as any).id), `Changed user ${targetUser.name}'s role from ${targetUser.role_name} to ${roleToAssign.name}`]
    );

    return NextResponse.json({
      id: targetUser.id,
      name: targetUser.name,
      email: targetUser.email,
      role: {
        id: roleToAssign.id,
        name: roleToAssign.name
      }
    });
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
  }
}
