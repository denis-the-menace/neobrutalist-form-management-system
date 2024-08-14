import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {
  useGetMessagesQuery,
  useDeleteMessageMutation,
} from "../slices/messageApiSlice";
import LoadingMessage from "../components/util/LoadingMessage";
import ErrorMessage from "../components/util/ErrorMessage";
import Button from "../components/ui/Button";
import PageWrapper from "../components/PageWrapper";
import notify from "../utils/notify";
import { useTranslation } from "react-i18next";

Modal.setAppElement("#root");

export default function MessagesPage() {
  const { t } = useTranslation();
  const { userInfo } = useSelector((state) => state.auth);
  const location = useLocation();
  const { messageRead } = location.state || {};
  const {
    data: { data: { messages = [] } = {} } = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useGetMessagesQuery();
  const [deleteMessage] = useDeleteMessageMutation();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    if (messageRead) refetch();
  }, [messageRead, refetch]);

  useEffect(() => {
    document
      .querySelector("section")
      .classList.toggle("darker-waves", modalIsOpen);
  }, [modalIsOpen]);

  if (isLoading) return <LoadingMessage />;
  if (isError) {
    return <ErrorMessage error={error} />;
  }

  const handleDelete = async () => {
    if (selectedMessage) {
      try {
        await deleteMessage(selectedMessage).unwrap();
        const successMessage = t("messages.message-deleted");
        notify(successMessage);
        refetch();
        closeModal();
      } catch (err) {
        const errorMessage = t("messages.error");
        notify(`${errorMessage}: ${err}`);
      }
    }
  };

  const openModal = (id) => {
    setSelectedMessage(id);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMessage(null);
  };

  return (
    <PageWrapper>
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter mb-4">
        {t("messages.title")}
      </h2>
      <div className="overflow-x-auto overflow-y-auto max-h-[500px]">
        <table className="transition duration-300 ease lg:min-w-full min-w-[1000px] bg-primary-light text-primary-dark">
          <thead>
            <tr className="border-b-2 border-primary-dark">
              <th className="py-2 px-4 text-center w-1/6">
                {t("messages.name")}
              </th>
              <th className="py-2 px-4 text-center w-1/6">
                {t("messages.gender")}
              </th>
              <th className="py-2 px-4 text-center w-1/6">
                {t("messages.country")}
              </th>
              <th className="py-2 px-4 text-center w-1/6">
                {t("messages.date")}
              </th>
              <th className="py-2 px-4 text-center w-1/6">
                {t("messages.read")}
              </th>
              <th className="py-2 px-4 text-center w-1/6">
                {t("messages.actions")}
              </th>
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
                  {message.read === "true"
                    ? t("messages.read")
                    : t("messages.unread")}
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
                      {t("messages.view")}
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
                      onClick={() => openModal(message.id)}
                      hasShadow={false}
                    >
                      {t("messages.delete")}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={t("messages.confirm-delete")}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "2rem",
            backgroundColor: "var(--color-primary-light)",
            border: "1px solid var(--color-primary-dark)",
            borderRadius: "1rem",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <h2 className="text-xl font-bold mb-4">
          {t("messages.confirm-delete")}
        </h2>
        <p className="mb-4">{t("messages.delete-message")}</p>
        <div className="flex justify-end">
          <Button
            className="mr-2 px-4 py-2"
            bgColor="bg-light-pink"
            hoverColor="bg-dark-pink"
            activeColor="bg-primary-dark"
            onClick={closeModal}
          >
            {t("messages.cancel")}
          </Button>
          <Button
            className="px-4 py-2"
            bgColor="bg-light-red"
            hoverColor="bg-dark-red"
            activeColor="bg-primary-dark"
            onClick={handleDelete}
          >
            {t("messages.delete")}
          </Button>
        </div>
      </Modal>
    </PageWrapper>
  );
}
