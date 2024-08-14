import { useTranslation } from "react-i18next";
import ContactForm from "../components/ContactForm";
import PageWrapper from "../components/PageWrapper";

export default function ContactFormPage() {
  const { t } = useTranslation();

  return (
    <PageWrapper>
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter">
        {t("contact-form.title")}
      </h2>
      <ContactForm />
    </PageWrapper>
  );
}
