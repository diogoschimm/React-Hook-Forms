import React from 'react';
import ErrorMessages from './ErrorMessages';

const InputText = ({
  text,
  type = 'text',
  name,
  required,
  minLength,
  maxLength,
  register,
  errors,
  pattern,
}) => {
  const registerProps = {
    required,
    minLength,
    maxLength,
    pattern,
  };
  return (
    <>
      <label>{text}</label>
      <input type={type} name={name} ref={register(registerProps)} />
      {errors[name] && (
        <ErrorMessages
          errors={errors}
          inputName={name}
          registerProps={registerProps}
        />
      )}
    </>
  );
};

export default InputText;
