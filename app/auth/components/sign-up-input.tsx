'use client';

import React from 'react';
import Btn from '@/components/btn';
import { SignUpMutationVariables, useSignUpMutation } from '@/generated/graphql';
import { useForm } from 'react-hook-form';
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';

const SignUpInput = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [signUp, { loading }] = useSignUpMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpMutationVariables>();

  const onSubmit = async (data: SignUpMutationVariables) => {
    const { signUpInput } = data;
    return signUp({ variables: { signUpInput } })
      .then((res) => {
        if (res.data?.signUp) {
          toast({ title: '회원가입을 환영합니다!', status: 'alert-success' });
          router.push('/films');
        } else {
          toast({
            title: '회원가입 도중 문제가 발생했습니다.',
            status: 'alert-error',
          });
        }
      })
      .catch((err) => {
        toast({
          title: '이메일 또는 아이디가 중복됩니다.',
          status: 'alert-error',
        });
        return err;
      });
  };

  return (
    <div className="card card-sm bg-base-100 w-96 shadow-sm mt-12 mb-28">
      <div className="card-body">
        <form className="flex flex-col justify-center flex-wrap gap-2" onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="w-full input hover:input-accent focus:input-primary"
              placeholder="example@example.com"
              {...register('signUpInput.email', {
                required: '이메일을 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: '이메일의 형식이 올바르지 않습니다.',
                },
              })}
            />
            <p className="fieldset-label text-error">{errors.signUpInput?.email && errors.signUpInput.email.message}</p>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Id</legend>
            <input
              type="text"
              className="w-full input hover:input-accent focus:input-primary"
              placeholder="ID"
              {...register('signUpInput.username', {
                required: '아이디를 입력해주세요.',
              })}
            />
            <p className="fieldset-label text-error">
              {errors.signUpInput?.username && errors.signUpInput.username.message}
            </p>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="w-full input hover:input-accent focus:input-primary"
              placeholder="8자 이상의 영문﹒숫자﹒특문"
              {...register('signUpInput.password', {
                required: '비밀번호를 입력해주세요.',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/,
                  message: '비밀번호는 영문﹒숫자﹒특수문자를 포함한 8자 이상이어야 합니다.',
                },
              })}
            />
            <p className="fieldset-label text-error">
              {errors.signUpInput?.password && errors.signUpInput.password.message}
            </p>
          </fieldset>
          <div className="divider my-1" />
          <Btn type="submit" className="btn btn-primary mb-2" isLoading={loading}>
            계정 생성
          </Btn>
        </form>
      </div>
    </div>
  );
};

export default SignUpInput;
