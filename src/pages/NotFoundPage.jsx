import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center mb-32">
      <h1 className="text-4xl font-bold mb-4">404 Not Found</h1>
      <h2 className="text-4xl font-bold mb-4">The page you've searched for doesn't exist.</h2>
      <Link to="/" className="text-blue-500">Go to homepage</Link>
    </div>
  );
}

export default NotFoundPage
