"use server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
// import dotenv from "dotenv";
// dotenv.config();

const key = process.env.SECRET_KEY as string
const secret = new TextEncoder().encode(key)

async function encryptToken(token: any):Promise<string>{
    return new SignJWT(token)
        .setProtectedHeader({ alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('20 sec')
        .sign(secret);
}

export async function login(form: {email: string, password: string}): Promise<{success: boolean}> {
    if(form.email === "amurf26@outlook.com") {
        if(form.password === "helloWorld"){
            const result = await encryptToken(form);
            const expires = new Date(Date.now() + 10 * 1000);
            cookies().set("authToken", result, { expires, httpOnly: true });
            return {success: true}
        }else{
            return {success: false}
        }
    }
    return {success: false};
}

export async function logout(): Promise<void>{
    cookies().set("authToken", "", {expires: new Date(0)});
}

export async function getTokenValue(key:string): Promise<any>{
    const {payload} = await jwtVerify(key, secret, {algorithms: ["HS256"]});
    return payload;
}

export async function getSession(): Promise<any>{
    const session = cookies().get("authToken")?.value;
    if(!session) return null;
    return await getTokenValue(session);
}

export async function sessionUpdate(request: NextRequest){
    const session = request.cookies.get("authToken")?.value;
    if(!session) return;

    const token = await getTokenValue(session);
    token.expires = new Date(Date.now() + 10 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: "authToken",
        value: await encryptToken(token),
        httpOnly: true,
        expires: token.expires,
    })
    return res;
}