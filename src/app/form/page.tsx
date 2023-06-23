'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const asyncFunction = async () => {
  const myPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello');
    }, 3000);
  });
  return myPromise;
};

const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is requerid'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Password is requered')
});

const Form = () => {
  const { register, handleSubmit, reset, formState, setFocus } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const { errors, isSubmitting } = formState;

  const handleSubmitData = async (data: any) => {
    console.log('submit', data);

    await asyncFunction();
    reset();
  };

  useEffect(() => {
    setFocus('password');
  }, [setFocus]);

  return (
    <>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <h2>Formulário</h2>
        <input
          {...register('password')}
          type="password"
          placeholder="password"
        />
        {errors.password && <p>{errors.password?.message}</p>}
        <input
          {...register('confirmPassword')}
          type="password"
          placeholder="confirm password"
        />
        {errors.confirmPassword && <p>{errors.confirmPassword?.message}</p>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </>
  );
};

export default Form;
