import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    if(req.query.postId) {
      handleGetMethodByPostId(req, res);
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


async function handleGetMethodByPostId(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.postId as string;
  try {
    const response = await prisma.comments.findMany({
      where : {
        postId : parseInt(String(postId))
      }
    });
    if (response.length == 0) {
      return res.status(404).json({ Message: "No Data Found" });
    }

    return res
      .status(200)
      .json({ sessage: "Get comments by post succesfully", status: 200, data: response });
  } catch (err) {
    return res.status(500).json({ Message: 'failed :(' });
  }
}

async function handleGetMethod(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await prisma.comments.findMany();
    if (response.length == 0) {
      return res.status(404).json({ Message: "No Data Found" });
    }

    return res
      .status(200)
      .json({ sessage: "Get comments succesfully", status: 200, data: response });
  } catch (err) {
    return res.status(500).json({ Message: 'failed :(' });
  }
}

async function handlePostMethod(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.query.userId as string;
  const postId = req.query.postId as string;
  const { content, image } = req.body;
  try {
    const response = await prisma.comments.create({
      data : {
        userId : userId,
        postId : parseInt(String(postId)),
        content : content,
        image : image
      }
    });
    return res
      .status(201)
      .json({ sessage: "Create comment succesfully", status: 201, data: response });
  } catch (err) {
    return res.status(500).json({ Message: 'failed :(' });
  }
}

async function handlePutMethod(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const userId = req.query.userId as string;
  const postId = req.query.postId as string;
  const { content, image } = req.body;
  try {
    const response = await prisma.comments.update({
      where : {
        id : parseInt(String(id)),
        userId : userId,
        postId : parseInt(String(postId)),
      },
      data : {
        content : content,
        image : image
      }
    });
    return res
      .status(200)
      .json({ sessage: "Update comment succesfully", status: 200, data: response });
  } catch (err) {
    return res.status(500).json({ Message: 'failed :(' });
  }
}

async function handleDeleteMethod(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string;
  const userId = req.query.userId as string;
  const postId = req.query.postId as string;
  try {
    const response = await prisma.comments.delete({
      where : {
        id : parseInt(String(id)),
        userId : userId,
        postId : parseInt(String(postId)),
      },
    });
    return res
      .status(200)
      .json({ sessage: "Delete comment succesfully", status: 200, data: response });
  } catch (err) {
    return res.status(500).json({ Message: 'failed :(' });
  }
}
