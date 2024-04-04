"use client";
import * as React from 'react';
import { login } from '@/Components/logout';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();
  async function handleSubmit(e: any): Promise<void> {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;
    const password = form.password.value;
    const result = await login({email, password});
    if(result.success) {  
      router.push("/home");
    }else{
      alert("Login failed");
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form onSubmit={handleSubmit}>
        <input 
          type="email"
          name="email"
          id="email"
          required 
        />
        <input 
          type="password"
          name="password"
          id="password"
          required 
        />
        <input 
          type="submit"
          title="Login" 
        />
      </form>
    </main>
  );
}
