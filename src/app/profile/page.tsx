"use client";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { getSession } from "@/Components/logout";
import { useRouter } from 'next/navigation'
import { logout } from "@/Components/logout";

export default function Page(){
    const router = useRouter();
    const [user, setUser] = useState({email: "", password: ""});
    useEffect(function(){
        getSession().then((result) => {  
            if(!result) router.push("/");
            setUser(result);
        });
    }, [user]);
    async function handleLogout(){
        await logout();
    }
    return(
        <>
            <h2>Hello User!</h2>
            {user ? (
                <>
                    <h1>{user.email}</h1>
                    <h1>{user.password}</h1>
                </>
            ): null}
            <Link href="/" onClick={() => handleLogout()}>Logout</Link>
        </>
    )
}