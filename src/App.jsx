import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { PostContextProvider } from "./features/posts/post.context";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "./features/shared/components/Loading";
import "./features/shared/global.scss";
import { ThemeProvider, useTheme } from "./features/shared/theme.context";

function AppContent() {
  const { theme } = useTheme();

  return (
    <PostContextProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>

      <ToastContainer position="top-right" autoClose={3000} theme={theme === "dark" ? "dark" : "light"} />
    </PostContextProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;