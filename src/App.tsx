import { Navigate, Route, Routes } from "react-router-dom";

import { AuthLayout } from "./layouts/AuthLayout";
import { GuestRoute } from "./layouts/GuestRoute";
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/Home";
import { LoginPage } from "./pages/public/Login";
import { RegisterPage } from "./pages/public/Register";

function App() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
