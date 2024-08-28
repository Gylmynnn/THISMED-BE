
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"
import prisma from "@/lib/prisma";
import { ResponseType } from "@/lib/types";


export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const JWT_TOKEN = process.env.JWT_TOKEN as string;

    const tokenCookie = req.cookies.token;

    const tokenHeader = req.headers.authorization?.split(' ')[1];

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


async function handleGetMethod(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    if (req.query.userId && req.query.postId) {
        handleGetMethodByUserIdAndPostId(req, res);
    } else if (req.query.userId) {
        handleGetMethodByUserId(req, res);
    } else if (req.query.postId) {
        handleGetMethodByPostId(req, res);
    } else {
        handleGetMethodDefault(req, res);
    }

}


async function handleGetMethodByPostId(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const postId = req.query.postId as string;
    try {
        const response = await prisma.intractions.findMany({
            where: {
                postId: parseInt(String(postId)),
            }
        });

        return res
            .status(200)
            .json({ success: true, message: "Get user intractions by postId succesfully", status: 200, data: response });
    } catch (err) {
        return res.status(500).json({ success: false, status: 500, message: 'failed' });
    }
}


async function handleGetMethodByUserIdAndPostId(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const userId = req.query.userId as string;
    const postId = req.query.postId as string;
    try {
        const response = await prisma.intractions.findMany({
            where: {
                userId,
                postId: parseInt(String(postId)),
            }
        });

        return res
            .status(200)
            .json({ success: true, message: "Get user intractions by userId succesfully", status: 200, data: response });
    } catch (err) {
        return res.status(500).json({ success: false, status: 500, message: 'failed' });
    }
}


async function handleGetMethodByUserId(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const userId = req.query.userId as string;
    try {
        const response = await prisma.intractions.findMany({
            where: {
                userId
            }
        });

        return res
            .status(200)
            .json({ success: true, message: "Get user intractions by userId succesfully", status: 200, data: response });
    } catch (err) {
        return res.status(500).json({ success: false, status: 500, message: 'failed' });
    }
}

async function handleGetMethodDefault(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    try {
        const response = await prisma.intractions.findMany();
        if (response.length == 0) {
            return res.status(404).json({ success: false, status: 404, message: "No Data Found" });
        }

        return res
            .status(200)
            .json({ success: true, message: "Get users intractions succesfully", status: 200, data: response });
    } catch (err) {
        return res.status(500).json({ success: false, status: 500, message: 'failed' });
    }
}

async function handlePostMethod(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const userId = req.query.userId as string;
    const { username, avatar, bio } = req.body;
    try {
        const response = await prisma.attributes.create({
            data: {
                userId,
                username,
                avatar,
                bio
            }
        });
        return res
            .status(201)
            .json({ success: true, message: "Create user attribute succesfully", status: 201, data: response });
    } catch (err) {
        return res.status(500).json({ success: false, status: 500, message: 'failed' });
    }
}

async function handlePutMethod(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const id = req.query.id as string;
    const userId = req.query.userId as string;
    const { username, avatar, bio } = req.body;
    try {
        const response = await prisma.attributes.update({
            where: {
                id: parseInt(String(id)),
                userId
            },
            data: {
                username,
                avatar,
                bio,
            }
        });
        return res
            .status(200)
            .json({ success: true, message: "Update user atribute succesfully", status: 200, data: response });
    } catch (err) {
        return res.status(500).json({ success: false, status: 500, message: 'failed' });
    }
}

async function handleDeleteMethod(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    const id = req.query.id as string;
    const userId = req.query.userId as string;
    try {
        const response = await prisma.attributes.delete({
            where: {
                id: parseInt(String(id)),
                userId
            },
        });
        return res
            .status(200)
            .json({ success: true, message: "Delete user atribute succesfully", status: 200, data: response });
    } catch (err) {
        return res.status(500).json({ success: false, status: 500, message: 'failed' });
    }
}

