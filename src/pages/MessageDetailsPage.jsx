import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetMessageQuery,
  useMarkAsReadMutation,
} from "../slices/messageApiSlice";
import LoadingMessage from "../components/util/LoadingMessage";
import ErrorMessage from "../components/util/ErrorMessage";
import Button from "../components/ui/Button";
import PageWrapper from "../components/PageWrapper";

function MessageDetailsPage() {
  const { id } = useParams();
  const {
    data: { data: { message } = {} } = {},
    isLoading,
    isError,
    error,
  } = useGetMessageQuery(id);
  const [markAsRead] = useMarkAsReadMutation();

  useEffect(() => {
    if (message && !message.read) {
      markAsRead(id);
    }
  }, [message, markAsRead, id]);

  if (isLoading) return <LoadingMessage />;
  if (isError) {
    console.error("Error: ", error);
    return <ErrorMessage error={error} />;
  }

  return (
    <PageWrapper>
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter mb-4">
        MESSAGE DETAILS
      </h2>
      <div className="transition duration-300 ease bg-primary-light text-primary-dark p-4 rounded">
        <p>
          <strong>Name:</strong> {message.name}
        </p>
        <p>
          <strong>Gender:</strong> {message.gender}
        </p>
        <p>
          <strong>Country:</strong> {message.country}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(message.creationDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Message:</strong> {message.message}
        </p>
      </div>
      <div className="flex justify-end">
        <Link
          to="/messages"
          className="text-blue-500 hover:underline mt-4 block"
        >
          <Button
            className="text-l p-2"
            bgColor="bg-light-pink"
            hoverColor="bg-dark-pink"
            activeColor="bg-primary-dark"
          >
            Back to Messages
          </Button>
        </Link>
      </div>
    </PageWrapper>
  );
}

export default MessageDetailsPage;
