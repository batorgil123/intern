"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { AuthWithJwtTokenDocument } from "../../../generated/graphql";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [login] = useMutation(AuthWithJwtTokenDocument);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data } = await login({
        variables: {
          email,
          password,
        },
      });

      if (data?.login?.access_token) {
        localStorage.setItem("access_token", data.login.access_token);
        localStorage.setItem("refresh_token", data.login.refresh_token);
        setShowSuccessDialog(true);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Нэвтрэхэд алдаа гарлаа.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium">
                Нууц үг
              </label>
              <input
                id="password"
                type="password"
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="mt-4 w-full" disabled={loading}>
              {loading ? "Түр хүлээнэ үү..." : "Нэвтрэх"}
            </Button>
            {error && (
              <div className="text-red-500 text-sm text-center mt-2">
                {error}
              </div>
            )}
          </form>
        </Card>
      </div>

      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Амжилттай нэвтэрлээ!</AlertDialogTitle>
            <AlertDialogDescription>
              Та амжилттай нэвтэрлээ.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => router.push("/checkout/1")}>
              Хаах
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Login;
