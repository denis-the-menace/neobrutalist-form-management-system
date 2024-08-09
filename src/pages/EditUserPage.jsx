import EditUserForm from "../components/EditUserForm";
import PageWrapper from "../components/PageWrapper";

export default function EditUserPage() {
  return (
    <PageWrapper isContainer={false}>
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter mb-4">
        EDIT USER
      </h2>
      <EditUserForm />
    </PageWrapper>
  );
}
