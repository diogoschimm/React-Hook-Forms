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
