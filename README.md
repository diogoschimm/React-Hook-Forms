# React-Hook-Forms
Projeto de exemplo usando o react-hook-forms

## Criando o projeto react

Para criar o projeto utilizamos o comando

```cmd
  npx create-react-app formulario-cliente
```

Após criar a aplicação vamos adicionar as seguintes dependências ao projeto

```cmd
  yarn add axios react-hook-form react-json-view  
```

Usando o hook-forms, vamos criar um componente para exibir as mensagens de erros do input

```jsx
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

```

Vamos criar um componente para o InputText, esse componente vai usar o componente de ErrorMessages e vai possuir o input do html e usar a função register do hook-forms

```jsx
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

```

Agora vamos criar um Input para E-mail, ele vai usar o InputText 

```jsx
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

```

Após isso vamos criar o formulário de cliente 

```jsx
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
 
import ReactJson from 'react-json-view';

import api from './services/api';

import InputEmail from './components/InputEmail';
import InputText from './components/InputText';

import './ClienteForm.css';

const ClienteForm = () => {
  const { register, handleSubmit, clearErrors, errors } = useForm();
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  const handleClienteFormSubmit = useCallback((data) => {
    clearErrors();
    setLoading(true);

    api
      .post('/cliente', data)
      .then((response) => {
        setResult(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit(handleClienteFormSubmit)}>
      <h2>Cadastro de Clientes</h2>
      <div>
        <InputText
          text="Nome do Cliente"
          name="nomeCliente"
          register={register}
          required="Nome do Cliente é obrigatório"
          maxLength={{
            value: 100,
            message: 'Nome não pode ser maior que 100 caracteres',
          }}
          errors={errors}
        />
      </div>
      <div>
        <InputEmail
          text="E-mail do Cliente"
          name="emailCliente"
          register={register}
          required="E-mail é obrigatório" 
          maxLength={{
            value: 100,
            message: 'E-mail não pode ser maior que 100 caracteres',
          }}
          errors={errors}
        />
      </div> 
      <button
        type="submit" 
        className={loading ? 'btn-primary disabled' : 'btn-primary'}
        disabled={loading}
      >
        {loading ? 'Carregando ....' : 'Cadastrar'}
      </button>
      <br />
      <br />
      {result.success && (
        <div className="result">
          <ReactJson src={result} />
        </div>
      )}
    </form>
  );
};

export default ClienteForm;

```
