import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { email, newPassword } = await request.json();

  await connect();

  try {
    // Kullanıcıyı bul
    const existingUser = await User.findOne({ email });

    // Kullanıcı bulunamazsa hata döndür
    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Yeni şifreyi hashle
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Kullanıcının şifresini güncelle
    existingUser.password = hashedPassword;

    // Kullanıcıyı kaydet
    await existingUser.save();

    return new NextResponse("Password reset successful", { status: 200 });
  } catch (error) {
    console.error("Error resetting password:", error);
    return new NextResponse("An error occurred while resetting password", { status: 500 });
  }
};