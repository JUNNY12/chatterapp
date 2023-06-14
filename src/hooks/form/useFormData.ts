import { useState, ChangeEvent } from 'react';

interface FormValues {
   [key: string]: any;
}

export const useFormData = (initialValues: FormValues) => {
   const [values, setValues] = useState<FormValues>(initialValues);

   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
   };

   return {
      values,
      handleChange,
      setValues,
   };
};
