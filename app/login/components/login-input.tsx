'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { LoginMutationVariables, useLoginMutation } from '@/generated/graphql';
import Btn from '@/components/btn';

const LoginInput = () => {
  const router = useRouter();
  const [login, { loading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginMutationVariables>();

  const onSubmit = async (formData: LoginMutationVariables) => {
    const { data } = await login({ variables: formData });
    console.log(data);
    if (data?.login.errors) {
      data?.login.errors.forEach((err) => {
        const field = 'loginInput.';
        // 상수 외 값 입력이 가능하도록 타입 강제
        setError((field + err.field) as Parameters<typeof setError>[0], {
          message: err.message,
        });
      });
    }
    if (data && data.login.accessToken) {
      localStorage.setItem('accessToken', data.login.accessToken);
      router.push('/films');
    }
  };

  return (
    <div className="card card-sm bg-base-100 w-96 shadow-sm mt-12 mb-28">
      <div className="card-body">
        <form className="flex flex-col justify-center flex-wrap gap-2" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email / Id</legend>
            <input
              type="text"
              className="w-full input hover:input-accent focus:input-primary"
              placeholder="이메일 또는 아이디를 입력해주세요."
              {...register('loginInput.emailOrUsername', {
                required: '이메일 또는 아이디를 입력해주세요.',
              })}
            />
            <p className="fieldset-label text-error">
              {errors.loginInput?.emailOrUsername && errors.loginInput.emailOrUsername.message}
            </p>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="w-full input hover:input-accent focus:input-primary"
              placeholder="********"
              {...register('loginInput.password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                  message: '비밀번호는 영문﹒숫자﹒특수문자를 포함한 8자 이상이어야 합니다.',
                },
              })}
            />
            <p className="fieldset-label text-error">
              {errors.loginInput?.password && errors.loginInput.password.message}
            </p>
          </fieldset>
          <div className="divider my-1" />
          <Btn type="submit" className="btn btn-primary mb-2" isLoading={loading}>
            로그인
          </Btn>
        </form>
      </div>
    </div>
  );
};

export default LoginInput;
