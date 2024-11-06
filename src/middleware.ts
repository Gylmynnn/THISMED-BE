import { NextResponse, NextRequest } from "next/server";

export function middleware(req: NextRequest,) {

    if (req.method === "OPTIONS") {
        const response = NextResponse.json(null, {
            status: 200,
        });
        response.headers.set("Access-Control-Allow-Credentials", "true");
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set(
            "Access-Control-Allow-Methods",
            "GET,DELETE,PATCH,POST,PUT"
        );
        response.headers.set(
            "Access-Control-Allow-Headers",
            "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        );
        response.headers.set("Access-Control-Allow-Private-Network", "true");
        return response;
    }

}
