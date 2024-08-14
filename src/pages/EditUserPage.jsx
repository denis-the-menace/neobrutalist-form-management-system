import { useTranslation } from "react-i18next";
import EditUserForm from "../components/EditUserForm";
import PageWrapper from "../components/PageWrapper";

export default function EditUserPage() {
  const {t} = useTranslation();

  return (
    <PageWrapper isContainer={false}>
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter mb-4">
        {t("edit-user.title")}
      </h2>
      <EditUserForm />
    </PageWrapper>
  );
}
