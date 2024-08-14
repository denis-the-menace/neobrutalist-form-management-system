import { useTranslation } from "react-i18next";
import AddUserForm from "../components/AddUserForm";
import PageWrapper from "../components/PageWrapper";

export default function AddUserPage() {
  const { t } = useTranslation();

  return (
    <PageWrapper isContainer={false}>
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter mb-4">
        {t("add-user.title")}
      </h2>
      <AddUserForm />
    </PageWrapper>
  );
}
