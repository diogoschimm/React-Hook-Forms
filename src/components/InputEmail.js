import React from 'react';
import InputText from './InputText';

const InputEmail = (props) => {
  const registerProps = { 
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
      message: 'Informe um e-mail válido',
    }, ...props
  };
  return (
    <InputText {...registerProps} />
  );
};

export default InputEmail;
