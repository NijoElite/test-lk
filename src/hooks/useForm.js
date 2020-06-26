import { useCallback, useState } from 'react';

export const useForm = ({ validate, defaultValues = {}, onSuccess, onError }) => {
  const [values, setValues] = useState(defaultValues);

  const onChange = useCallback(e => {
    const { target: { value, name } } = e;

    const newValues = { ...values };
    newValues[name] = value;

    setValues(newValues);
  }, [values]);

  const onFormSubmit = useCallback(e => {
    if (!validate) {
      onSuccess(e, values);
      return;
    }

    const errors = validate(values);
    const isValid = Object.values(errors).length === 0;

    if (isValid) {
      onSuccess && onSuccess(e, values);
    } else {
      onError && onError(e, values, errors);
    }
  }, [onError, onSuccess, validate, values]);

  return {
    values,
    setValues,
    onChange,
    onFormSubmit,
  };
};
