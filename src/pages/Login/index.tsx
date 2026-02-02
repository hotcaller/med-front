import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconUser } from "@tabler/icons-react";
import { useUserStore } from "@/shared/store/useUserStore";
import { useMutation } from "@tanstack/react-query";
import { getTokenForUser } from "@/shared/api"; 
import { useNavigate } from "react-router-dom"; 
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const login = useUserStore((state) => state.login);

  const tokenMutation = useMutation({
    mutationFn: (userId: number) => getTokenForUser(userId),
    onSuccess: (response, userId) => {
      login(response.token, userId);
      
      toast.success("Успешный вход", {
        description: "Вы успешно вошли в систему",
      });
      navigate("/notifications"); 
    },
    onError: (error) => {
      console.error("Login error:", error);
      
      toast.error("Ошибка входа", {
        description: "Не удалось получить токен доступа",
      });
    },
  });

  const handleUserLogin = (userId: number) => {
    tokenMutation.mutate(userId);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Войти как</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4, 5].map((userId) => (
            <Button
              key={userId}
              variant="outline"
              className="w-full justify-start rounded-full py-6 text-base"
              onClick={() => handleUserLogin(userId)}
              disabled={tokenMutation.isPending}
            >
              <div className="bg-primary/10 p-2 rounded-full mr-3">
                <IconUser className="h-5 w-5" />
              </div>
              Пользователь {userId}
            </Button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;