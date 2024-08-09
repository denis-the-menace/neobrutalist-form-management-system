import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-4xl font-bold mb-4">Not Found</h1>
      <Link to="/login" className="text-blue-500">Go to home</Link>
    </div>
  );
}

export default NotFoundPage
