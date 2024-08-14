import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useLoginMutation } from "../slices/userApiSlice";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function LogInForm() {
  const {t} = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    setError("");

    if (!username) {
      setError(t("login.username-required"));
      return;
    }
    if (!password) {
      setError(t("login.password-required"));
      return;
    }

    try {
      const res = await login({ username, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      setError(err?.error || "Failed to login");
    }
  };

  return (
    <div>
      <div className="text-dark-red text-sm text-center min-h-8">
        {error && error}
      </div>
      <form onSubmit={submitHandler}>
        <Input
          type="username"
          value={username}
          label={t("login.username")}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-4"
        />
        <Input
          type="password"
          value={password}
          label={t("login.password")}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4"
        />
        <Button
          type="submit"
          disabled={isLoading}
          className="mt-2 w-full py-2 px-4 shadow-sm text-lg disabled:opacity-50"
          bgColor="bg-light-pink"
          hoverColor="bg-dark-pink"
          activeColor="primary-dark"
        >
          {isLoading ? t("login.logging-in") : t("login.login")}
        </Button>
      </form>
    </div>
  );
}
