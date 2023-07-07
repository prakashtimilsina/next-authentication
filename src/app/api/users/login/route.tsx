import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);
    //Check if user exits?
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "user does not exist." },
        { status: 400 }
      );
    }
    //Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email/password" },
        { status: 400 }
      );
    }
    //Create Token Schema Data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };
    //Creating token
    const token = await jwt.sign(tokenData, process.env.JWT_TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login sucessful",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
