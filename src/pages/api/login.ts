import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import * as argon2 from "argon2";
import { ResponseType } from "@/lib/dto";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const JWT_TOKEN = process.env.JWT_TOKEN as string;
  const { email, password } = req.body;

  const response = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!response)
    return res
      .status(404)
      .json({ success: false, status: 404, message: "User Not Found" });
  // check password
  const passwordValidate = await argon2.verify(response.password, password);
  if (!passwordValidate)
    return res
      .status(401)
      .json({ success: false, status: 401, message: "Unauthorized" });

  // create JWT token only after password validation
  const jwtToken = jwt.sign(
    {
      email: response.email,
    },
    JWT_TOKEN,
  );

  res.setHeader(
    "Set-Cookie",
    `token=${jwtToken}; HttpOnly; path="/api"; SameSite=Lax; Secure`,
  );
  return res.status(200).json({
    success: true,
    status: 200,
    message: "login successfully",
    data: {
      id: response.id,
      email: response.email,
      token: jwtToken,
      createdAt: response.createdAt,
      updatedAt: response.updatedAt,
    },
  });
}
