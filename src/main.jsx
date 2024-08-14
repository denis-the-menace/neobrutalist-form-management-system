import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./utils/i18next";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import store from "./store";
import { Provider } from "react-redux";
import ProtectedRoute from "./components/util/ProtectedRoute";
import ErrorBoundary from "./pages/ErrorBoundary";
import NotFoundPage from "./pages/NotFoundPage";
import NotAuthorizedPage from "./pages/NotAuthorizedPage";
import ContactFormPage from "./pages/ContactFormPage";
import LogInPage from "./pages/LogInPage";
import MessagesPage from "./pages/MessagesPage";
import MessageDetailsPage from "./pages/MessageDetailsPage";
import UsersPage from "./pages/UsersPage";
import AddUserPage from "./pages/AddUserPage";
import EditUserPage from "./pages/EditUserPage";
import ReportsPage from "./pages/ReportsPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorBoundary />}>
      <Route index={true} path="/" element={<ContactFormPage />} />
      <Route path="/login" element={<LogInPage />} />

      <Route path="" element={<ProtectedRoute />}>
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/:id" element={<MessageDetailsPage />} />
      </Route>

      <Route path="" element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/users/" element={<UsersPage />} />
        <Route path="/users/add" element={<AddUserPage />} />
        <Route path="/users/edit/:id" element={<EditUserPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Route>

      <Route path="/not-authorized" element={<NotAuthorizedPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>,
);
