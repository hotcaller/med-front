import "./styles/globals.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "@/layouts";
import Login from "@/pages/Login/index.tsx";
import Notifications from "@/pages/Notifications";
import Feedback from "@/pages/Feedback";
import AdminNotifications from "@/pages/AdminNotifications"; 
import AdminFeedback from "./pages/AdminFeedback";
import AdminProtectedRoute from "./routes/AdminProtected/index.tsx";
import AdminLogin from '@/pages/AdminLogin';
import UserProtectedRoute from "./routes/UserProtected/index.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="notifications" replace />} />

            <Route
              path="notifications"
              element={
                <UserProtectedRoute>
                  <Notifications />
                </UserProtectedRoute>
              }
            />
            <Route
              path="feedback"
              element={
                <UserProtectedRoute>
                  <Feedback />
                </UserProtectedRoute>
              }
            />
            
            <Route
              path="admin/notifications"
              element={
                <AdminProtectedRoute isAdminOnly>
                  <AdminNotifications />
                </AdminProtectedRoute>
              }
            />
            <Route
              path="admin/feedback"
              element={
                <AdminProtectedRoute isAdminOnly>
                  <AdminFeedback />
                </AdminProtectedRoute>
              }
            />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="admin/login" element={<AdminLogin />}/>
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors />

    </QueryClientProvider>
  );
};

export default App;
