import { NextResponse } from "next/server";

import { connectDB } from "@/database/connection";
import { User } from "@/database/model/user-model";
import bcrypt from "bcryptjs";

export const POST = async (request) => {
    const { firstName, lastName, email, password, userRole } =
        await request.json();

    console.log(firstName, lastName, email, password, userRole);

    await connectDB();
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        return new NextResponse("User already exists", {
            status: 409,
        });
    }
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: userRole,
    };

    try {
        await User.create(newUser);
        return new NextResponse("User has been created", {
            status: 201,
        });
    } catch (error) {
        console.error(error);
        return new NextResponse(error.message, {
            status: 500,
        });
    }
};
