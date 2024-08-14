import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import LogInForm from "../components/LogInForm";
import { useTranslation } from "react-i18next";

export default function LogInPage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);

  const from = new URLSearchParams(location.search).get("from") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(from);
    }
  }, [navigate, userInfo, from]);

  return (
    <div className="mx-auto p-8 mb-40 bg-primary-light border-primary-dark border-2 rounded-[2rem] solid-shadow">
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter">
        {t("login.title")}
      </h2>
      <LogInForm />
    </div>
  );
}
