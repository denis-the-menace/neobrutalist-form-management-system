import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useGetUserQuery, useUpdateUserMutation } from "../slices/userApiSlice";
import LoadingMessage from "../components/util/LoadingMessage";
import Input from "./ui/Input";
import Button from "./ui/Button";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export default function EditUserForm() {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  const { data: { data: { user } = {} } = {}, isLoading } = useGetUserQuery(id);
  const [updateUser, { isLoading: isEditing, isError }] =
    useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setPhoto(user.photo);
    }
  }, [user]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setError(t("add-user.username-required"));
      return;
    }
    if (!password) {
      setError(t("add-user.password-required"));
      return;
    }

    const updatedPassword =
      password && password.trim() !== "" ? password : user.password;
    const updatedPhoto =
      photo && photo.trim() !== "" ? photo : user.base64Photo;

    const userData = {
      username: user.username,
      password: updatedPassword,
      base64Photo: updatedPhoto,
    };

    try {
      await updateUser({ id, data: userData }).unwrap();
      console.log("User updated successfully.");
      // navigate("/users");
      navigate("/users", {
        state: { toastMessage: t("edit-user.success") },
      });
    } catch (err) {
      if (isError) {
        notify(`${t("edit-user.error")}: ${err.message}`);
      }
    }
  };

  if (isLoading) return <LoadingMessage />;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="text-dark-red text-sm text-center min-h-5">
        {error && error}
      </div>
      <Input
        type="username"
        value={user.username}
        label={t("add-user.username")}
        readOnly={true}
      />
      <Input
        type="password"
        value={password}
        label={t("add-user.password")}
        maxLength="10"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="min-h-24">
        <label
          className="capitalize block type-lg font-bold type-primary-dark"
          htmlFor="photo"
        >
          {t("add-user.photo")}
        </label>
        <div className="flex justify-between items-center">
          <label
            htmlFor="photo"
            className="cursor-pointer bg-primary-light p-1 border-2 border-primary-dark rounded"
            style={{ boxShadow: "2px 2.5px 0 var(--color-primary-dark)" }}
          >
            {t("add-user.choose-file")}
          </label>
          {photo ? (
            <div>
              <img
                src={photo}
                alt="User"
                className="mr-4 w-16 h-16 object-cover rounded-full border-2 border-primary-dark"
              />
            </div>
          ) : (
            <span className="text-secondary">{t("add-user.no-file")}</span>
          )}
        </div>
        <input
          type="file"
          id="photo"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
      <div className="flex gap-2">
        <Link to="/users">
          <Button
            type="submit"
            className="px-1 py-2 rounded"
            bgColor={"bg-light-pink"}
            hoverColor={"bg-dark-pink"}
            activeColor={"bg-primary-dark"}
          >
            {t("add-user.back")}
          </Button>
        </Link>
        <Button
          type="submit"
          className="px-1 py-2 rounded"
          bgColor={"bg-light-blue"}
          hoverColor={"bg-dark-blue"}
          activeColor={"bg-primary-dark"}
        >
          {t("edit-user.save")}
        </Button>
      </div>
    </form>
  );
}
