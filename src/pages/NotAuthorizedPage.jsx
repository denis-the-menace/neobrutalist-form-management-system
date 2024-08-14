import { Link } from "react-router-dom";

function NotAuthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">403 Not Authorized</h1>
      <h2 className="text-4xl mb-4">
        You do not have permission to view this page.
      </h2>
      <Link to="/login" className="text-blue-500">
        Go to Login
      </Link>
    </div>
  );
}

export default NotAuthorizedPage;
