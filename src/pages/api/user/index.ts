import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if (req.query.id) {
      handleGetMethodById(req, res);
    } else {
      handleGetMethod(req, res);
    }
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

async function handleGetMethodById(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;

  try {
    const response = await prisma.users.findUnique({
      where: {
        id: String(id),
      },
    });
    return res
      .status(200)
      .json({ sessage: "succesfully", status: 200, data: response });
  } catch (err) {
    return res
      .status(500)
      .json({ Message: "failed", status: 500, data: "error :(" });
  }
}

async function handleGetMethod(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await prisma.users.findMany();
    if (response.length === 0) {
      return res.status(200).json({ Message: "No Data Found" });
    }

    return res
      .status(200)
      .json({ sessage: "succesfully", status: 200, data: response });
  } catch (err) {
    return res
      .status(500)
      .json({ Message: "failed", status: 500, data: "error :(" });
  }
}

async function handlePostMethod(req: NextApiRequest, res: NextApiResponse) {
  const { username, avatar, email, password } = req.body;

  try {
    const response = await prisma.users.create({
      data: {
        username: username,
        avatar: avatar,
        email: email,
        password: password,
      },
    });
    return res.status(201).json({
      message: "succesfully",
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
  const { id, username, avatar, email, password } = req.body;

  try {
    const response = await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        username: username,
        avatar: avatar,
        email: email,
        password: password,
      },
    });
    return res.status(200).json({
      message: "succesfully",
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

  try {
    const response = await prisma.users.delete({
      where: {
        id: String(id),
      },
    });
    return res.status(200).json({
      message: "succesfully",
      status: 200,
      data: response,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Message: "failed", status: 500, data: "error :(" });
  }
}
