import AddUserForm from "../components/AddUserForm";
import PageWrapper from "../components/PageWrapper";

export default function AddUserPage() {
  return (
    <PageWrapper isContainer={false}>
      <h2 className="text-3xl font-bold text-primary-dark text-center tracking-tighter mb-4">ADD USER</h2>
      <AddUserForm />
    </PageWrapper>
  );
}
