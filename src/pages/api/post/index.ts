import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

type ResponseData = {
  success: boolean;
  message: string;
  status: number;
  data?: any;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const JWT_TOKEN = process.env.JWT_TOKEN as string;

  const token = req.cookies.token;

  if (typeof token === "undefined") {
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

function handleGetMethod(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.query.id) {
    handleGetMethodById(req, res);
  } else if (req.query.userId) {
    handleGetMethodByUserId(req, res);
  } else {
    handleGetMethodByNone(req, res);
  }
}

async function handleGetMethodById(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const id = req.query.id as string;

  try {
    const response = await prisma.posts.findUnique({
      where: {
        id: parseInt(String(id)),
      },
    });
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Get post by id succesfully",
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "failed", status: 500, data: err });
  }
}

async function handleGetMethodByUserId(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const userId = req.query.userId as string;

  try {
    const response = await prisma.posts.findMany({
      where: {
        userId: String(userId),
      },
    });
    if (response.length === 0) {
      return res
        .status(200)
        .json({ success: true, status: 200, message: "data not found" });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Get posts by id user succesfully",
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "failed", status: 500, data: err });
  }
}

async function handleGetMethodByNone(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const response = await prisma.posts.findMany();
    if (response.length === 0) {
      return res
        .status(200)
        .json({ success: true, status: 200, message: "data not found" });
    }
    return res.status(200).json({
      success: true,
      status: 200,
      message: "Get posts succesfully",
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "failed", status: 500, data: err });
  }
}

async function handlePostMethod(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;
  const { title, image, category } = req.body;

  try {
    const response = await prisma.posts.create({
      data: {
        userId: String(userId),
        title,
        image,
        category,
      },
    });
    return res.status(201).json({
      message: "Create data succesfully",
      status: 201,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Message: "failed", status: 500, data: "error :(" });
  }
}

async function handlePutMethod(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;
  const id = req.query.id as string;
  const { title, image, category } = req.body;

  if (!id && !userId) {
    return res.status(400).json({ Message: "required userId and id" });
  }

  try {
    const response = await prisma.posts.update({
      where: {
        userId: String(userId),
        id: parseInt(String(id)),
      },
      data: {
        title,
        image,
        category,
      },
    });
    return res.status(200).json({
      message: "Update data succesfully",
      status: 200,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Message: "failed", status: 500, data: "error :(" });
  }
}

async function handleDeleteMethod(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const userId = req.query.userId as string;

  if (!id && !userId) {
    return res.status(400).json({ Message: "required userId and id" });
  }

  try {
    const response = await prisma.posts.delete({
      where: {
        userId: String(userId),
        id: parseInt(String(id)),
      },
    });
    return res.status(200).json({
      message: "Delete data succesfully",
      status: 200,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Message: "failed", status: 500, data: "error :(" });
  }
}
