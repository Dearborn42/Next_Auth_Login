"use client";
import Link from "next/link";
import React, { useEffect } from 'react';
import { getSession } from "@/Components/logout";
import { useRouter } from 'next/navigation'

export default function Page(){
    const router = useRouter();
    useEffect(function(){
        getSession().then((result) => {  
            if(!result) router.push("/");
        });
    }, []);
    return(
        <div>
            <h1>Home page</h1>
            <Link href="/profile">Visit profile Page</Link>
        </div>
    )
}