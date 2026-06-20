"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e:any) {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    if (res.ok) {
      window.location.href="/admin/dashboard";
    } else {
      setError("Invalid login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-3xl border p-8"
      >
        <h1 className="text-3xl font-bold mb-6">
          Rainbow Admin
        </h1>

        <input
          placeholder="Email"
          className="field mb-4"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="field mb-4"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        {error && (
          <p className="text-red-600 mb-4">
            {error}
          </p>
        )}

        <button
          className="btn w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
}
