import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { ResponseType } from "@/lib/dto";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const JWT_TOKEN = process.env.JWT_TOKEN as string;
  const tokenCookie = req.cookies.token;
  const tokenHeader = req.headers.authorization?.split(" ")[1];
  const token = tokenCookie || tokenHeader;

  if (!token) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: "Unauthorized",
    });
  }

  jwt.verify(token, JWT_TOKEN, (err) => {
    if (err)
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Unauthorized",
        data: err,
      });
  });
  if (req.method === "GET") {
    handleGetMethod(req, res);
  }
  if (req.method === "PUT") {
    handlePutMethod(req, res);
  }
  if (req.method === "DELETE") {
    handleDeleteMethod(req, res);
  }
}

async function handleGetMethod(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.query.id) {
    handleGetMethodById(req, res);
  } else {
    handleGetMethodByDefault(req, res);
  }
}

async function handleGetMethodById(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const id = req.query.id as string;

  try {
    const response = await prisma.users.findUnique({
      where: {
        id: String(id),
      },
    });
    if (!response?.id) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "user not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Get user by id succesfully",
      status: 200,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "error", status: 500 });
  }
}

async function handleGetMethodByDefault(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  try {
    const response = await prisma.users.findMany({
      include: {
        attribute: true,
      },
    });
    if (response.length === 0) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Get users succesfully",
      status: 200,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "failed", status: 500 });
  }
}

async function handlePutMethod(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { id, email, password } = req.body;

  try {
    const response = await prisma.users.update({
      where: {
        id,
      },
      data: {
        email,
        password,
      },
    });
    return res.status(200).json({
      success: true,
      message: " Update user succesfully",
      status: 200,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "failed", status: 500 });
  }
}

async function handleDeleteMethod(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const id = req.query.id as string;

  try {
    const response = await prisma.users.delete({
      where: {
        id: String(id),
      },
    });
    return res.status(200).json({
      success: true,
      message: "delete data succesfully",
      status: 200,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "failed", status: 500 });
  }
}
