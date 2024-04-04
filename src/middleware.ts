import { NextRequest } from "next/server";
import { sessionUpdate } from "./Components/logout";

export async function middleware(request: NextRequest){
    console.log("mid")
    return await sessionUpdate(request)
}