import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import { useMutation } from 'react-query';
import { CustomFormMutation } from '../customForm/CustomFormMutation';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  nama: Yup.string().required('Name is required'),
  umur: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
});

const initialValues = {
  email: '',
  nama: '',
  umur: '',
};

interface FormValues {
  email: string;
  nama: string;
  umur: string;
}

const postData = async (values: FormValues) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/posts', values);
  return response.data;
};

export default function UseMutationExample() {
  const {mutate, isLoading, isError, isSuccess, error} = useMutation(postData,
    {
    onSuccess: (data: any) => {
      console.log('Data submitted successfully:', data);
    },
    onError: (error: any) => {
      console.error('Error submitting data:', error);
    },
  });

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>UseMutation&nbsp;</h1>
          <h1 className={title({ color: 'violet' })}>Example&nbsp;</h1>
          <br />
        </div>

        <Formik<FormValues>
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
             mutate(values);
          }}
        >
          <CustomFormMutation isloading={isLoading} />
        </Formik>

        {/* Displaying mutation status */}
        {isLoading && <p>Submitting...</p>}
        {isError && <p>Error: {error}</p>}
        {isSuccess && <p>Submission successful!</p>} 
      </section>
    </DefaultLayout>
  );
}
