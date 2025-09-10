"use client";

import { useState, CSSProperties } from "react";
import { HashLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu ít nhất 6 ký tự"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ccc");
  const router = useRouter();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "logan@fluxweave.com",
      password: "123456",
    },
  });

  function onSubmit(values: LoginForm) {
    setLoading(true);
    if (values.password === "123456") {
      setTimeout(() => {
        router.push("/home");
        toast.success("Đăng nhập thành công", {
          duration: 2000,
        });
        setLoading(false);
      }, 3000);
    } else {
      setLoading(false);
      form.setError("password", {
        type: "manual",
        message: "Sai mật khẩu! Gợi ý: 123456 😉",
      });
    }
  }

  return (
   <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <HashLoader
            color={color}
            loading={loading}
            size={100}
          />
          <p className="mt-4 text-lg font-medium">Đang đăng nhập...</p>
        </div>
      ) : (
        <Card className="w-full max-w-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Đăng nhập
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email: </FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Đăng nhập"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
