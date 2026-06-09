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

    const targetUser = await db.user.findUnique({
      where: { id: targetUserId },
      include: { role: true }
    });

    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const roleToAssign = await db.role.findUnique({
      where: { id: parseInt(role_id) }
    });

    if (!roleToAssign) {
      return NextResponse.json({ error: "Target role not found" }, { status: 404 });
    }

    const updatedUser = await db.user.update({
      where: { id: targetUserId },
      data: { role_id: parseInt(role_id) },
      include: { role: true }
    });

    // Log action
    await db.activityLog.create({
      data: {
        user_id: parseInt((session.user as any).id),
        action: `Changed user ${targetUser.name}'s role from ${targetUser.role.name} to ${roleToAssign.name}`
      }
    });

    return NextResponse.json({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    });
  } catch (error) {
    console.error("User update error:", error);
    return NextResponse.json({ error: "Failed to update user role" }, { status: 500 });
  }
}
