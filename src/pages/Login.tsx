import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom";
import { Wallet } from "lucide-react";


export const Login = () => {
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
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <Link to="#" className="ml-auto inline-block text-sm underline-offset-4">
                      Esqueceu sua senha?
                    </Link>
                  </div>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
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
