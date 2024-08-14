import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  useGetMessageQuery,
  useMarkAsReadMutation,
} from "../slices/messageApiSlice";
import LoadingMessage from "../components/util/LoadingMessage";
import ErrorMessage from "../components/util/ErrorMessage";
import Button from "../components/ui/Button";
import PageWrapper from "../components/PageWrapper";
import { useTranslation } from "react-i18next";

export default function MessageDetailsPage() {
  const { t } = useTranslation();
  const { id } = useParams();
  const {
    data: { data: { message } = {} } = {},
    isLoading,
    isError,
    error,
  } = useGetMessageQuery(id);
  const [markAsRead] = useMarkAsReadMutation();
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    if (message && !message.read === false) {
      markAsRead(id);
      setIsRead(true);
    }
  }, [message, markAsRead, id]);

  if (isLoading) return <LoadingMessage />;
  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return (
    <PageWrapper>
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter mb-4">
        {t("message-details.title")}
      </h2>
      <div className="transition duration-300 ease bg-primary-light text-primary-dark p-4 rounded">
        <p>
          <strong>{t("messages.name")}:</strong> {message.name}
        </p>
        <p>
          <strong>{t("messages.gender")}:</strong> {message.gender}
        </p>
        <p>
          <strong>{t("messages.country")}:</strong> {message.country}
        </p>
        <p>
          <strong>{t("messages.date")}:</strong>{" "}
          {new Date(message.creationDate).toLocaleDateString()}
        </p>
        <p>
          <strong>{t("message-details.message")}:</strong> {message.message}
        </p>
      </div>
      <div className="flex justify-end">
        <Link
          to="/messages"
          state={{ messageRead: isRead }}
          className="text-blue-500 hover:underline mt-4 block"
        >
          <Button
            className="text-l p-2"
            bgColor="bg-light-pink"
            hoverColor="bg-dark-pink"
            activeColor="bg-primary-dark"
          >
            {t("message-details.back")}
          </Button>
        </Link>
      </div>
    </PageWrapper>
  );
}
