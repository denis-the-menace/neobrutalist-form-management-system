import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { useGetUsersQuery } from "../slices/userApiSlice";
import Button from "../components/ui/Button";
import PageWrapper from "../components/PageWrapper";
import notify from "../utils/notify";

export default function UsersPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();

  if (userInfo.role !== "admin") {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    if (location.state?.toastMessage) {
      notify(location.state.toastMessage);
      location.state = {};
    }
  }, [location.state]);

  const {
    data: { data: { users = [] } = {} } = {},
    isLoading,
    isError,
    error,
  } = useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) {
    console.error("Error:", error);
    return (
      <div>
        Error: {error.status} - {error.data?.message || error.error}
      </div>
    );
  }

  return (
    <PageWrapper>
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter mb-4">
        USERS
      </h2>
      <div className="overflow-x-auto">
        <table className="transition duration-300 ease lg:min-w-full min-w-[1000px] bg-primary-light text-primary-dark">
          <thead>
            <tr className="border-b-2 border-primary-dark">
              <th className="py-2 px-4 text-center w-1/3">Username</th>
              <th className="py-2 px-4 text-center w-1/3">Role</th>
              <th className="py-2 px-4 text-center w-1/3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="py-2 px-4 text-center">{user.username}</td>
                <td className="py-2 px-4 text-center">{user.role}</td>
                <td className="py-2 px-4 text-center flex justify-center">
                  <Link to={`/users/edit/${user.id}`} className="inline-block">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="px-2 text-lg disabled:opacity-50"
                      bgColor="bg-light-blue"
                      hoverColor="bg-dark-blue"
                      activeColor="bg-primary-dark"
                      hasShadow={false}
                    >
                      Edit
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center lg:justify-end mr-2">
        <Link to="/users/add" className="mb-4 inline-block">
          <Button
            type="submit"
            className="mt-4 py-2 px-8 text-lg disabled:opacity-50"
            bgColor="bg-light-pink"
            hoverColor="bg-dark-pink"
            activeColor="bg-primary-dark"
          >
            Add New User
          </Button>
        </Link>
      </div>
    </PageWrapper>
  );
}
