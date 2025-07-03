'use client'
import { useState } from "react"
import { EyeIcon, EyeOffIcon, Loader } from "lucide-react"
import { useHookFormMask, withMask } from "use-mask-input"
import {FieldValues, useForm} from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"

export default function RegisterPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const { handleSubmit, register, formState: { isSubmitting, errors } } = useForm()
  const registerWithMask = useHookFormMask(register)

  async function onSubmit(data: FieldValues) {
    console.log('Form submitted')
    console.log(data)

    try {
      const res = await axios.post("https://jsonplaceholder.typicode.com/posts", data)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div className="flex flex-col font-instrument-sans justify-center items-center min-h-screen
      sm:py-3 px-3 bg-gray-100">
        <div className="w-19/20 lg:w-7/20 md:w-1/2 shadow-lg rounded-md
          bg-white sm:px-11 p-6">
          <h1 className="flex flex-col justify-center items-center font-extrabold text-3xl text-center mb-6">
            <Image
              className="mb-2"
              src={"https://lirp.cdn-website.com/3b6c9aee/dms3rep/multi/opt/logo-amotur+%282%29-1920w.png"}
              alt="amotur-logo"
              width={150}
              height={20}
            />
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}
          className="w-full">
            {/* Nome */}
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-xl lg:text-lg">
                Nome
              </label>
              <input 
                className="w-full h-14 text-md border px-5 
                py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500"
                type="text"
                id="name"
                {...register('name', {
                  required: 'O campo de nome precisa ser preenchido.',
                  maxLength: {
                    value: 255,
                    message: "O nome deve conter no máximo 255 caracteres."
                  }
                })}
                placeholder="Digite seu nome completo"
              />
              <p className="text-base mt-1 text-red-400">
                <ErrorMessage errors={errors} name="name"/>
              </p>
            </div>
              {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-xl lg:text-lg">
                E-mail
              </label>
              <input
                className="w-full h-14 text-md border px-5 
                py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500"
                type="email"
                id="email"
                {...register('email', {
                  required: "O campo de e-mail precisa ser preenchido",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                    message: "E-mail inválido."
                  }
                })}
                placeholder="Digite seu email"
              />
              <p className="text-base mt-1 text-red-400">
                <ErrorMessage errors={errors} name="email"/>
              </p>
            </div>
            {/* Telefone */}
            <div className="mb-4">
              <label htmlFor="phone" className="block mb-2 text-xl lg:text-lg">
                Telefone
              </label>
              <input 
                className="w-full h-14 text-md border px-5 
                py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500"
                type="tel"
                id="phone"
                {...registerWithMask('phone', ["(99) 99999-9999"], {
                  required: "O campo de telefone precisa ser preenchido.",
                  pattern: {
                    value: /^\(?[1-9]{2}\)?\s?9[0-9]{4}-?[0-9]{4}$/,
                    message: "Número inválido."
                  }
                })}
                placeholder="Digite seu telefone"
              />
              <p className="text-base mt-1 text-red-400">
                <ErrorMessage errors={errors} name="phone"/>
              </p>
            </div>
            {/* Senha */}
            <div className="relative mb-4">
              <label htmlFor="password" className="block mb-2 text-xl lg:text-lg">
                Senha
              </label>
              <input 
                className="w-full h-14 text-md border px-5 
                py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500 pr-12"
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                {...register('password', {
                  required: 'O campo de senha precisa estar preenchido.',
                  minLength: {
                    value: 8,
                    message: "A senha deve conter no mínimo 8 caracteres."
                  }
                })}
                placeholder="Crie sua senha"
              />
              <span className="absolute right-4 top-[54px]">
                <button 
                  type="button"
                  onClick={() => {setIsPasswordVisible(!isPasswordVisible)}}
                >
                  {isPasswordVisible ? (
                    <EyeIcon size={20} className="cursor-pointer text-gray-500"/>
                  ) :
                  (
                  <EyeOffIcon size={20} className="cursor-pointer text-gray-500"/>
                  )}
                </button>
              </span>
              <p className="text-base mt-1 text-red-400">
                <ErrorMessage errors={errors} name="password"/>
              </p>
            </div>
            <div className="relative mb-11">
              <label htmlFor="confirmedPassword" className="block mb-2 text-xl lg:text-lg">
                Confirme a senha
              </label>
              <input 
                className="w-full h-14 text-md border px-5 
                py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500 pr-12"
                type={isPasswordVisible ? 'text' : 'password'}
                id="confirmedPassword"
                {...register('confirmedPassword', {
                  required: 'O campo de confirmação de senha precisa estar preenchido.',
                  minLength: {
                    value: 8,
                    message: "A senha deve conter no mínimo 8 caracteres."
                  },
                  validate(value, formValues) {
                    console.log({ value, formValues })
                    if(value === formValues.password) {
                      return true
                    } else {
                      return "As senhas devem ser iguais."
                    }
                  }
                })}
                placeholder="Confirme sua senha"
              />
              <span className="absolute right-4 top-[54px]">
                <button 
                  type="button"
                  onClick={() => {setIsPasswordVisible(!isPasswordVisible)}}
                >
                  {isPasswordVisible ? (
                    <EyeIcon size={20} className="cursor-pointer text-gray-500"/>
                  ) :
                  (
                  <EyeOffIcon size={20} className="cursor-pointer text-gray-500"/>
                  )}
                </button>
              </span>
              <p className="text-base mt-1 text-red-400">
                <ErrorMessage errors={errors} name="confirmedPassword"/>
              </p>
            </div>
            <button className="w-full h-13 mb-4 bg-custom-blue disabled:bg-cyan-900 text-xl lg:text-lg 
            text-white py-2.5 px-5 lg:px-3 lg:py-1.5 rounded-lg cursor-pointer transition duration-300
            flex justify-center items-center"
            disabled={isSubmitting}>
              {isSubmitting ? (<Loader className="animate-spin"/>) : ('Cadastrar')}
            </button>
            </form>
            <p className="text-center">
              Ja tem uma conta? <Link className="text-blue-600 underline" href="">Entre</Link>
            </p>
        </div>
      </div>
    </div>
  )
}