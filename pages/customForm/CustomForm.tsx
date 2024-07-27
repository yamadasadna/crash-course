// CustomForm.tsx
import { useState } from "react";
import { useFormikContext, Form } from "formik";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Snippet } from "@nextui-org/snippet";

interface FormValues {
  email: string;
  nama: string;
  umur: string;
}

export const CustomForm = () => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormikContext<FormValues>();
  const [submittedValues, setSubmittedValues] = useState<FormValues | null>(null);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(event);
    setSubmittedValues(values);
  };

  return (
    <>
      <Form className="flex flex-col mt-4 gap-4" onSubmit={handleFormSubmit}>
        <div className="flex w-6/12 mx-auto flex-wrap gap-2">
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="Masukan Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.email && Boolean(errors.email)}
            errorMessage={touched.email && errors.email ? errors.email : ""}
            className="max-w-xs"
          />
          <Input
            type="text"
            name="nama"
            label="Nama"
            placeholder="Masukan Nama"
            value={values.nama}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.nama && Boolean(errors.nama)}
            errorMessage={touched.nama && errors.nama ? errors.nama : ""}
            className="max-w-xs"
          />
          <Input
            type="text"
            name="umur"
            label="Umur"
            placeholder="Masukan Umur"
            value={values.umur}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={touched.umur && Boolean(errors.umur)}
            errorMessage={touched.umur && errors.umur ? errors.umur : ""}
            className="max-w-xs"
          />
        </div>
        <div className="flex w-auto mx-auto flex-wrap gap-2">
          <Button type="submit" color="secondary">
            Submit
          </Button>
        </div>
      </Form>
      {submittedValues && (
         <div className="mt-8">
         <Snippet hideCopyButton hideSymbol variant="bordered">
           <span>{JSON.stringify(submittedValues, null, 2)}</span>
         </Snippet>
       </div>
      )}
    </>
  );
};
