import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";

const loginSchema = z.object({
    email: z.email('Email inválido').trim(),
    password: z.string().trim(),
  });

type LoginForm = z.infer<typeof loginSchema>;


const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Bem vindo de volta!');
      navigate('/categories');

    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Falha no login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-dvw h-dvh flex justify-center content-center">

      <div className="m-auto w-md text-center">
        <Card>
            <CardHeader>
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary">
                <Wallet className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">FinTrack</CardTitle>
              <CardDescription>Insira seus dados e faça o login</CardDescription>
            </CardHeader>

            <CardContent>
              <form id="login-form" onSubmit={handleSubmit(onSubmit)} >
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@exemplo.com"
                      required
                      {...register('email')}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                      <Link to="#" className="ml-auto inline-block text-sm underline-offset-4">
                        Esqueceu sua senha?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      {...register('password')}
                    />
                    {errors.password && (
                      <p className="text-sm text-destructive">{errors.password.message}</p>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" form="login-form" disabled={isLoading}>
              {isLoading ? 'Logando...' : 'Login'}
            </Button>
            <CardDescription>
                Nao tem conta? <Link to="#">Crie aqui</Link>
            </CardDescription>
          </CardFooter>

        </Card>
      </div>

    </div>

  );
};

export default Login;
