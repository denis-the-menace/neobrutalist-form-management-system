import { useState } from "react";
import { useGetCountriesQuery } from "../slices/countriesApiSlice";
import { useAddMessageMutation } from "../slices/messageApiSlice";
import { useTranslation } from "react-i18next";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import RadioButtonGroup from "./ui/RadioButtonGroup";
import TextArea from "./ui/TextArea";
import Selector from "./ui/Selector";
import notify from "../utils/notify";

export default function ContactForm() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    data: { data: { countries = [] } = {} } = {},
    error: countriesError,
    isLoading,
  } = useGetCountriesQuery();
  const [addMessage, { isLoading: isSubmitting }] = useAddMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Name is required");
      return;
    }
    if (name.length > 50) {
      setError("Name cannot exceed 50 characters");
      return;
    }
    if (!gender) {
      setError("Gender is required");
      return;
    }
    if (!country) {
      setError("Country is required");
      return;
    }
    if (!message) {
      setError("Message is required");
      return;
    }
    if (message.length > 500) {
      setError("Message cannot exceed 500 characters");
      return;
    }

    try {
      await addMessage({ name, gender, country, message }).unwrap();
      // setSuccess("Message sent successfully");
      setError("");
      setName("");
      setGender("");
      setCountry("");
      setMessage("");
      const successMessage = t("contact-form.success");
      notify(successMessage);
    } catch (err) {
      const errorMessage = t("contact-form.error");
      setError(`${errorMessage}: ${err.error}`);
    }
  };

  return (
    <div>
      <div className="text-sm min-h-8">
        {error && <div className="text-dark-red">{error}</div>}
        {success && <div className="text-dark-green">{success}</div>}
        {countriesError && (
          <div className="text-dark-red">
            {t("contact-form.failed-countries")}
          </div>
        )}
      </div>
      {isLoading ? (
        <div>{t("contact-form.loading-countries")}</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-row gap-8">
            <div className="w-full">
              <Input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label={t("contact-form.name")}
                maxLength="50"
                className="w-full"
              />
            </div>
            <div className="flex flex-col ml-auto">
              <span className="capitalize block font-bold text-primary-dark">
                {t("contact-form.gender")}
              </span>
              <RadioButtonGroup
                buttons={[
                  { value: "male", label: t("contact-form.male") },
                  { value: "female", label: t("contact-form.female") },
                ]}
                onChange={setGender}
              />
            </div>
          </div>
          <Selector
            label="country"
            placeholder={t("contact-form.select-country")}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            options={countries}
          />
          <TextArea
            value={message}
            label={t("contact-form.message")}
            onChange={(e) => setMessage(e.target.value)}
            maxLength="500"
            className="w-full"
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="mt-4 py-2 px-8 text-lg disabled:opacity-50"
              bgColor="bg-light-green"
              hoverColor="bg-dark-green"
              activeColor="bg-primary-dark"
              disabled={isSubmitting}
            >
              {t("contact-form.send")}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
