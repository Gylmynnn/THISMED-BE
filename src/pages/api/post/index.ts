import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

async function handleGetMethod(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await prisma.posts.findMany();
    if (response.length == 0) {
      res.status(200).json({ Message: "No Data Found" });
    }

    res
      .status(200)
      .json({ sessage: "succesfully", status: 200, data: response });
  } catch (err) {
    res.status(500).json({ Message: `${err} When Get Data` });
  }
}

async function handlePostMethod(req: NextApiRequest, res: NextApiResponse) {}

async function handlePutMethod(req: NextApiRequest, res: NextApiResponse) {}

async function handleDeleteMethod(req: NextApiRequest, res: NextApiResponse) {}
