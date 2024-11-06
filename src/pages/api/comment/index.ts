import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";
import { ResponseType } from "@/lib/dto";

export default async function handler(
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

  if (req.method === "POST") {
    handlePostMethod(req, res);
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
  if (req.query.postId) {
    handleGetMethodByPostId(req, res);
  } else {
    handleGetMethodDefault(req, res);
  }
}

async function handleGetMethodByPostId(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const postId = req.query.postId as string;
  try {
    const response = await prisma.comments.findMany({
      where: {
        postId: parseInt(String(postId)),
      },
    });
    if (response.length == 0) {
      return res
        .status(404)
        .json({ success: false, status: 404, message: "No Data Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Get comments by post succesfully",
      status: 200,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: "failed" });
  }
}

async function handleGetMethodDefault(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  try {
    const response = await prisma.comments.findMany({
      include: {
        users: {
          include: {
            attribute: true,
          },
        },
      },
    });
    if (response.length == 0) {
      return res
        .status(404)
        .json({ success: false, status: 404, message: "No Data Found" });
    }

    return res.status(200).json({
      success: true,
      message: "Get comments succesfully",
      status: 200,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: "failed" });
  }
}

async function handlePostMethod(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const userId = req.query.userId as string;
  const postId = req.query.postId as string;
  const { content, image } = req.body;
  try {
    const response = await prisma.comments.create({
      data: {
        userId: userId,
        postId: parseInt(String(postId)),
        content: content,
        image: image,
      },
    });
    return res.status(201).json({
      success: true,
      message: "Create comment succesfully",
      status: 201,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: "failed" });
  }
}

async function handlePutMethod(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const id = req.query.id as string;
  const userId = req.query.userId as string;
  const postId = req.query.postId as string;
  const { content, image } = req.body;
  try {
    const response = await prisma.comments.update({
      where: {
        id: parseInt(String(id)),
        userId: userId,
        postId: parseInt(String(postId)),
      },
      data: {
        content: content,
        image: image,
      },
    });
    return res.status(200).json({
      success: true,
      message: "Update comment succesfully",
      status: 200,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: "failed" });
  }
}

async function handleDeleteMethod(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const id = req.query.id as string;
  const userId = req.query.userId as string;
  const postId = req.query.postId as string;
  try {
    const response = await prisma.comments.delete({
      where: {
        id: parseInt(String(id)),
        userId: userId,
        postId: parseInt(String(postId)),
      },
    });
    return res.status(200).json({
      success: true,
      message: "Delete comment succesfully",
      status: 200,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, status: 500, message: "failed" });
  }
}
