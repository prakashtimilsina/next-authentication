import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { hasSubscribers } from "diagnostics_channel";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody); //not recommeded in prod code

    //Check if user already exists

    const user = await User.findOne({email})
    if (user){        
        return NextResponse.json({error: "User Already Exists"}, {status: 400})
    } 

    //Hash Password
    const salt = await bcryptjs.genSalt(10);
    const hashpassword = await bcryptjs.hash(password, salt)
    
    const newUser = new User({
        username,
        email,
        password: hashpassword
    })

    console.log(newUser)

    return NextResponse.json({
        message: "User created successfully",
        success: true,
        newUser,

    })
  } catch (error: any) {
    return NextResponse.json({ error: error.messge }, { status: 500 });
  }
}
