import { Link } from "react-router-dom";

function NotAuthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Not Authorized</h1>
      <p className="text-lg mb-4">
        You do not have permission to view this page.
      </p>
      <Link to="/login" className="text-blue-500">
        Go to Login
      </Link>
    </div>
  );
}

export default NotAuthorizedPage;
