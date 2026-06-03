"use client";

import { useState, useTransition } from "react";
import { adminLogin } from "@/app/momo-admin/actions";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await adminLogin(fd);
      if (res.error) { setError(res.error); return; }
      router.refresh();
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="mb-1 text-center font-serif text-2xl font-bold text-gray-900">
          Dusab MakeOver 💄
        </h1>
        <p className="mb-6 text-center text-sm text-gray-500">Admin Dashboard</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="password"
            type="password"
            required
            placeholder="Enter admin password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-pink-600 py-2.5 font-bold text-white hover:bg-pink-700 disabled:opacity-60"
          >
            {isPending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
