import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const [existingRows] = await db.execute<any[]>(
      'SELECT id FROM users WHERE email = ?',
      [email]
    );

    if (existingRows.length > 0) {
      return NextResponse.json(
        { error: "A user with this email address already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user and assign the default "User" role (Role ID: 3)
    const [result] = await db.execute<any>(
      'INSERT INTO users (name, email, password, role_id, created_at) VALUES (?, ?, ?, ?, NOW())',
      [name, email, hashedPassword, 3]
    );
    const userId = result.insertId;

    // Log the activity
    await db.execute(
      'INSERT INTO activity_logs (user_id, action, created_at) VALUES (?, ?, NOW())',
      [userId, `User registered account under the email: ${email}`]
    );

    return NextResponse.json(
      { message: "User registered successfully", userId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred during registration" },
      { status: 500 }
    );
  }
}
