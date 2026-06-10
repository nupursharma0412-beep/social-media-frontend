import { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { PostContextProvider } from "./features/posts/post.context";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loading from "./features/shared/components/Loading";
import "./features/shared/global.scss";

function App() {
  return (
    <AuthProvider>
      <PostContextProvider>

        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>

      </PostContextProvider>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
    </AuthProvider>
  );
}

export default App;