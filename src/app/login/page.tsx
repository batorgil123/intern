"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { AUTH_WITH_JWT_TOKEN } from "@/app/graphql/products";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || !password) return;
    try {
      await login({ variables: { email, password } });
    } catch (err) {
      console.error("Login error:", err);
    }
  };
  const [login, { loading, error }] = useMutation(AUTH_WITH_JWT_TOKEN, {
    onCompleted: (data) => {
      const { access_token, refresh_token } = data.login;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      router.push("/");
    },
  });
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-8 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-center">Нэвтрэх</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Имэйл
            </label>
            <input
              id="email"
              type="email"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">
              Нууц үг
            </label>
            <input
              id="password"
              type="password"
              className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="mt-4 w-full" disabled={loading}>
            {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
          </Button>
          {error && (
            <div className="text-red-500 text-sm text-center mt-2">
              {error.message || "Нэвтрэхэд алдаа гарлаа."}
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};
export default Login;
