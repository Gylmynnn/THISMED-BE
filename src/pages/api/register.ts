import { NextApiRequest, NextApiResponse } from "next";
import argon2 from "argon2";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, avatar, email, password } = req.body;

  try {
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        "message ": "Email already in use",
        "status ": 400,
      });
    }
    const passHash = await argon2.hash(password as string);
    const response = await prisma.users.create({
      data: {
        username,
        avatar,
        email,
        password: passHash,
      },
      select: {
        username: true,
        avatar: true,
        email: true,
      },
    });

    return res.status(201).json({
      message: "Create user succesfully",
      status: 201,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Message: "failed", status: 500, data: "error :(" });
  }
}
