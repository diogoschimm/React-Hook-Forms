import React from 'react';

const ErrorMessages = ({
  errors,
  inputName, 
  registerProps,
}) => {
  if (!errors || !errors[inputName]) return '';

  const inputError = errors[inputName];

  return (
    <>
      {inputError.message && (
        <span className="error">{inputError.message}</span>
      )}
      {Object.entries(registerProps).map((property) => {
        if (property[inputError.type] && property[inputError.type].message)
          return (
            <span className="error">{property[inputError.type].message}</span>
          );

        return '';
      })}
    </>
  );
};

export default ErrorMessages;
