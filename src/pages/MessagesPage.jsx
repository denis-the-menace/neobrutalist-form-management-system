import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useGetMessagesQuery,
  useDeleteMessageMutation,
} from "../slices/messageApiSlice";
import LoadingMessage from "../components/util/LoadingMessage";
import ErrorMessage from "../components/util/ErrorMessage";
import Button from "../components/ui/Button";
import PageWrapper from "../components/PageWrapper";
import notify from "../utils/notify";

export default function MessagesPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: { data: { messages = [] } = {} } = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMessagesQuery();
  const [deleteMessage] = useDeleteMessageMutation();

  if (isLoading) return <LoadingMessage />;
  if (isError) {
    return <ErrorMessage error={error} />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        await deleteMessage(id).unwrap();
        notify("Message deleted successfully.");
        refetch();
      } catch (err) {
        console.error("Failed to delete the message:", err);
        notify("Failed to delete the message: ", err);
      }
    }
  };

  return (
    <PageWrapper>
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter mb-4">
        MESSAGES
      </h2>
      <div className="overflow-x-auto">
        <table className="transition duration-300 ease lg:min-w-full min-w-[1000px] bg-primary-light text-primary-dark">
          <thead>
            <tr className="border-b-2 border-primary-dark">
              <th className="py-2 px-4 text-center w-1/6">Name</th>
              <th className="py-2 px-4 text-center w-1/6">Gender</th>
              <th className="py-2 px-4 text-center w-1/6">Country</th>
              <th className="py-2 px-4 text-center w-1/6">Date</th>
              <th className="py-2 px-4 text-center w-1/6">Read</th>
              <th className="py-2 px-4 text-center w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id} className="border-b">
                <td className="py-2 px-4 text-center">{message.name}</td>
                <td className="py-2 px-4 text-center">{message.gender}</td>
                <td className="py-2 px-4 text-center">{message.country}</td>
                <td className="py-2 px-4 text-center">
                  {new Date(message.creationDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 text-center">
                  {console.log(message.read)}
                  {message.read ? "Read" : "Unread"}
                </td>
                <td className="py-2 text-center">
                  <Link to={`/messages/${message.id}`} className="mr-2">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="px-2 text-lg disabled:opacity-50"
                      bgColor="bg-light-blue"
                      hoverColor="bg-dark-blue"
                      activeColor="bg-primary-dark"
                      hasShadow={false}
                    >
                      View
                    </Button>
                  </Link>
                  {userInfo.role === "admin" && (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="px-2 text-lg disabled:opacity-50"
                      bgColor="bg-light-red"
                      hoverColor="bg-dark-red"
                      activeColor="bg-primary-dark"
                      onClick={() => handleDelete(message.id)}
                      hasShadow={false}
                    >
                      Delete
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageWrapper>
  );
}
