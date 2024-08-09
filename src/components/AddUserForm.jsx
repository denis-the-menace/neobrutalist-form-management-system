import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAddReaderMutation } from "../slices/userApiSlice";
import LoadingMessage from "../components/util/LoadingMessage";
import ErrorMessage from "../components/util/ErrorMessage";
import PageWrapper from "../components/PageWrapper";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

export default function AddUserForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [error, setError] = useState("");

  const [addUser, { isLoading, isError }] = useAddReaderMutation();

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
      setError("Username is required");
      return;
    }
    if (!password) {
      setError("Password is required");
      return;
    }

    const userData = {
      username: username,
      password: password,
      base64Photo: photo,
    };

    try {
      await addUser(userData).unwrap();
      navigate("/users");
    } catch (err) {
      console.error("Failed to add the user:", err);
      // TODO handle error
      return <ErrorMessage error={err} />;
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
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        value={password}
        maxLength="10"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="min-h-24">
        <label
          className="capitalize block type-lg font-bold type-primary-dark"
          htmlFor="photo"
        >
          Photo
        </label>
        <div className="flex justify-between items-center">
          <label
            htmlFor="photo"
            className="cursor-pointer bg-primary-light p-1 border-2 border-primary-dark rounded"
            style={{ boxShadow: "2px 2.5px 0 var(--color-primary-dark)" }}
          >
            Choose File
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
            <span className="text-secondary">No file chosen</span>
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
            Back to Users
          </Button>
        </Link>
        <Button
          type="submit"
          className="px-4 py-2 rounded"
          bgColor={"bg-light-blue"}
          hoverColor={"bg-dark-blue"}
          activeColor={"bg-primary-dark"}
        >
          Add User
        </Button>
      </div>
    </form>
  );
}
