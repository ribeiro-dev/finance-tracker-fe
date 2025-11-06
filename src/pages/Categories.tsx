import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from '@/components/ui/badge';

import type { Category } from "@/interfaces/category.interface";
import { Layout } from "@/components/Layout";

const Categories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const categories: Category[] = [
    { id: 1, name: 'Entretenimento' },
    { id: 2, name: 'Food' },
  ]

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Categorias</h1>
            <p className="text-muted-foreground">Organize seus gastos</p>
          </div>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Criar Categoria
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>

        <Card className="w-3xl max-w-fi m-auto">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              Categorias
              <Badge variant="outline" className="bg-success/10 text-success">
                {categories.length}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {categories.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Sem categorias registradas
              </p>
            ) : (
              <div className="space-y-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <span className="font-medium">{category.name}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );

}

export default Categories
