// apiRequests.js

import { NextResponse } from "next/server";
import connect from './../../../utils/db';
import User from '@/models/User';

export const GET = async (email) => {
    try {
        await connect();
        const user = await User.findOne({ email });
        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        return user;
    } catch (err) {
        return new NextResponse("Error in fetching user: " + err, { status: 500 });
    }
}
