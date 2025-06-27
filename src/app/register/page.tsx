'use client'
import { useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { withMask } from "use-mask-input"
import {useForm} from "react-hook-form"
import Image from "next/image"
import Link from "next/link"

export default function RegisterPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const { handleSubmit, register } = useForm()

  async function onSubmit(data: any) {
    console.log('Form submitted')
    console.log(data)

    const res = await fetch('', {method: 'POST'})
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
              width={110}
              height={20}
            />
            Cadastro de Turista
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}
          className="w-full">
            {/* Nome */}
            <div>
              <label className="block mb-2 text-xl lg:text-lg">
                Nome
              </label>
              <input 
                className="w-full h-14 text-md mb-4 border px-5 
                py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500"
                type="text"
                id="name"
                {...register('name')}
                name="name"
                placeholder="Digite seu nome completo"
              />
            </div>
              {/* Email */}
            <div>
              <label className="block mb-2 text-xl lg:text-lg">
                Email
              </label>
              <input
                className="w-full h-14 text-md mb-4 border px-5 
                py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500"
                type="email"
                id="email"
                {...register('email')}
                placeholder="Digite seu email"
              />
            </div>
            {/* Telefone */}
            <div>
              <label className="block mb-2 text-xl lg:text-lg">
                Telefone
              </label>
              <input 
                className="w-full h-14 text-md mb-4 border px-5 
                py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500"
                type="tel"
                id="telephone"
                {...register('telephone')}
                placeholder="Digite seu telefone"
                ref={withMask("(99) 99999-9999")}
              />
            </div>
            {/* Senha */}
            <div className="relative">
              <label className="block mb-2 text-xl lg:text-lg">
                Senha
              </label>
              <input 
                className="w-full h-14 text-md mb-4 border px-5 
                py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500 pr-12"
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                {...register('password')}
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
            </div>
            <div className="relative">
              <label className="block mb-2 text-xl lg:text-lg">
                Confirme a senha
              </label>
              <input 
                className="w-full h-14 text-md mb-11 border px-5 
                py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500 pr-12"
                type={isPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                {...register('confirmPassword')}
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
            </div>
            <button className="w-full h-13 mb-4 bg-custom-blue text-xl lg:text-lg 
            text-white py-2.5 px-5 lg:px-3 lg:py-1.5 rounded-lg cursor-pointer">
              Cadastrar
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