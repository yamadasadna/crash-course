import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { Formik } from "formik";
import * as Yup from "yup";
import { CustomForm } from "./customForm/CustomForm";

// ─── Validasi Menggunakan Yup ────────────────────────────────────────────────
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  nama: Yup.string().required("Name is required"),
  umur: Yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer"),
});
// ────────────────────────────────────────────────────────────────────────────

// ─── Initialvalues Untuk Formik ──────────────────────────────────────────────
const initialValues = {
  email: "",
  nama: "",
  umur: "",
};
// ────────────────────────────────────────────────────────────────────────────

interface FormValues {
  email: string;
  nama: string;
  umur: string;
}

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>Formik&nbsp;</h1>
          <h1 className={title({ color: "violet" })}>Example&nbsp;</h1>
          <br />
        </div>

        {/* Insiasis Formik Dengan Costum Input */}
        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <CustomForm />
        </Formik>
      </section>
    </DefaultLayout>
  );
}
