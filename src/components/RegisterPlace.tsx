'use client'
import { ChevronDown, Loader } from "lucide-react"
import { useHookFormMask} from "use-mask-input"
import {FieldValues, useForm} from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import Image from "next/image"
import React, { useState } from "react"

type PropsLatLng = {
    lat: number;
    lng: number;
}

export default function RegisterPlace({lat, lng} : PropsLatLng) {

  const { handleSubmit, register, setValue, setError, clearErrors, formState: { isSubmitting, errors } } = useForm();
  const registerWithMask = useHookFormMask(register);

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([])
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [showWebSite, setShowWebSite] = useState(false);

const handleImageCharge = (e: React.ChangeEvent<HTMLInputElement>) => {
  const files = e.target.files;
  if (!files) return;

  const selectedFiles = Array.from(files);

  if (images.length + selectedFiles.length > 3) {
    setError('images', {
      type: 'manual',
      message: 'Você só pode enviar até 3 imagens.',
    });
    return;
  }

  clearErrors('images');

  const newImages = [...images, ...selectedFiles];
  const newPreviews = [...previews, ...selectedFiles.map(file => URL.createObjectURL(file))];

  setImages(newImages);
  setPreviews(newPreviews);
  setValue('images', newImages);
};


  async function onSubmit(data: FieldValues) {
    console.log('Form submitted');
    console.log(data);
  }
  return (
    <div>
      <div className="flex flex-col font-instrument-sans justify-center items-center min-h-screen
      sm:py-3 px-3 bg-gray-100">
        <div className="w-19/20 lg:w-7/20 md:w-1/2 shadow-lg rounded-md
          bg-white sm:px-11 p-6">

          <h1 className="flex flex-col justify-center items-center font-extrabold text-3xl text-center mb-6">
            <Image
            src={"https://lirp.cdn-website.com/3b6c9aee/dms3rep/multi/opt/logo-amotur+%282%29-1920w.png"}
            alt="amotur-logo"
            width={150}
            height={50}
            />
          </h1>

          <form onSubmit={handleSubmit(onSubmit)}
          className="w-full">

              {/* Images */}
            <div className="mb-6">
              <label htmlFor="umages" className="block mb-2 text-xl lg:text-lg">
                Enviar imagens <span className="text-gray-500 text-sm">(máx. 3) <span className="text-red-500">*</span></span>
              </label>

                <label
                  htmlFor="images"
                  className="w-full h-13 mb-4 bg-custom-blue disabled:bg-cyan-900 text-xl lg:text-lg 
                  text-white py-2.5 px-5 lg:px-3 lg:py-1.5 rounded-lg cursor-pointer transition duration-300
                  flex justify-center items-center"
                >
                  Selecionar Imagens
                </label>

              <input 
              id="images"
              type="file" 
              accept="image/*"
              onChange={handleImageCharge}
              className="hidden"/>
              <p className="text-base mt-1 text-red-400">
                <ErrorMessage errors={errors} name="images" />
              </p>

              {previews.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
                  {previews.map((src, index) => (
                    <div key={index} className="w-28 h-28 relative rounded overflow-hidden border">
                      <img
                        src={src}
                        alt={`preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updatedImages = images.filter((_, i) => i !== index);
                          const updatedPreviews = previews.filter((_, i) => i !== index);
                          setImages(updatedImages);
                          setPreviews(updatedPreviews);
                          setValue('images', updatedImages);

                          if (updatedImages.length === 0) {
                            setError('images', {
                              type: 'manual',
                              message: 'Envie ao menos 1 imagem.',
                            });
                          }
                        }}
                        className="absolute top-1 right-1 text-white bg-black/70 w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition cursor-pointer"
                        aria-label={`Remover imagem ${index + 1}`}
                      >
                        ×
                      </button>

                    </div>
                  ))}
                </div>
              )}
            </div>

              {/* Nome */}
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-xl lg:text-lg">
                Nome do Local <span className="text-red-500">*</span>
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
                placeholder="Digite nome do local"
              />
              <p className="text-base mt-1 text-red-400">
                <ErrorMessage errors={errors} name="name"/>
              </p>
            </div>

              {/* Tipo de local */}
            <div className="mb-4">
              <label htmlFor="typePlace" className="block mb-2 text-xl lg:text-lg">
                Tipo de Local <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <select
                  id="typePlace"
                  {...register('typePlace', { 
                    required: 'Selecione o tipo de local.' 
                  })}
                  className="peer w-full h-14 text-md border px-5 pr-10
                  py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500 bg-white
                  appearance-none"
                  defaultValue=""
                >
                  <option value="" disabled>Selecione um tipo</option>
                  <option value="Bar">Bar</option>
                  <option value="Restaurante">Restaurante</option>
                  <option value="Hotel">Hotel</option>
                  <option value="Pousada">Pousada</option>
                </select>

                <ChevronDown
                  className="w-5 h-5 text-gray-700 absolute right-3 top-1/2 -translate-y-1/2 
                  transition-transform duration-200 peer-focus:rotate-180 pointer-events-none"
                />
              </div>

              <p className="text-base mt-1 text-red-400">
                <ErrorMessage errors={errors} name="typePlace"/>
              </p>
            </div>


              {/* WhatsApp */}
            <div className="mb-4">
              <label htmlFor="whatsapp" className="block mb-2 text-xl lg:text-lg">
                WhatsApp <span className="text-red-500">*</span>
              </label>
              <input 
                className="w-full h-14 text-md border px-5 
                py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500"
                type="tel"
                id="whatsapp"
                {...registerWithMask('whatsapp', ["(99) 99999-9999"], {
                  required: "O campo de telefone precisa ser preenchido.",
                  pattern: {
                    value: /^\(?[1-9]{2}\)?\s?9[0-9]{4}-?[0-9]{4}$/,
                    message: "WhatsApp inválido."
                  }
                })}
                placeholder="Digite o WhatsApp"
              />
              <p className="text-base mt-1 text-red-400">
                <ErrorMessage errors={errors} name="whatsapp"/>
              </p>
            </div>
              
              {/* Inputs Opcionais */}
            <div className="grid grid-cols-2 gap-4 mb-4">

                {/* Email */}
              <div className="mb-4">

                {!showEmail && (
                  <button
                  className="cursor-pointer"
                  onClick={() => setShowEmail(true)}
                  >+ Adicionar Email</button>
                )}

                {showEmail && (
                  <>
                    <div className="flex justify-between items-center">
                      <label htmlFor="email" className="block mb-2 text-xl lg:text-lg">
                        Email
                      </label>
                      <button
                        onClick={() => {
                          setShowEmail(false)
                          setValue('email', '')
                        }}
                        className="text-red-500 text-sm underline cursor-pointer"
                      >Remover</button>
                    </div>
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
                  </>
                )}

              </div>

              {/* Telefone Fixo*/}
              <div className="mb-4">
                
                {!showPhone && (
                  <button
                  className="cursor-pointer"
                  onClick={() => setShowPhone(true)}
                  >+ Adicionar Telefone Fixo</button>
                )}

                {showPhone && (
                  <>
                    <div className="flex justify-between items-center">
                      <label htmlFor="phone" className="block mb-2 text-xl lg:text-lg">
                        Telefone Fixo
                      </label>
                      <button
                        onClick={() => {
                          setShowPhone(false)
                          setValue('phone', '') 
                        }}
                        className="text-red-500 text-sm underline cursor-pointer"
                      >Remover</button>
                    </div>
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
                  </>

                )}
              </div>

              {/* Instagram */}
              <div className="mb-4">

                {!showInstagram && (
                  <button
                  className="cursor-pointer"
                  onClick={() => setShowInstagram(true)}
                  >+ Adicionar Instagram</button>
                )}

                {showInstagram && (
                  <>
                    <div className="flex justify-between items-center">
                      <label htmlFor="instagram" className="block mb-2 text-xl lg:text-lg">
                        Instagram
                      </label>
                      <button
                        onClick={() => {
                          setShowInstagram(false)
                          setValue('instagram', '')
                        }}
                        className="text-red-500 text-sm underline cursor-pointer"
                      >Remover</button>
                    </div>
                    <input 
                      className="w-full h-14 text-md border px-5 
                      py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500"
                      type="text"
                      id="instagram"
                      {...register('instagram', {
                        pattern: {
                          value: /^@?(\w){1,30}$/,
                          message: "Instagram inválido, deve começar opcionalmente com @ e ter até 30 caracteres.",
                        },
                      })}
                      placeholder="@perfil"
                    />
                    <p className="text-base mt-1 text-red-400">
                      <ErrorMessage errors={errors} name="instagram"/>
                    </p>
                  </>
                )}

              </div>

              {/* WebSite */}
              <div className="mb-4">

                {!showWebSite && (
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setShowWebSite(true)
                    setValue('website', '')
                  }}
                  >+ Adicionar WebSite</button>
                )}

                {showWebSite && (
                  <>
                    <div className="flex justify-between items-center">
                      <label htmlFor="website" className="block mb-2 text-xl lg:text-lg">
                        WebSite
                      </label>
                      <button
                        onClick={() => setShowWebSite(false)}
                        className="text-red-500 text-sm underline cursor-pointer"
                      >Remover</button>
                    </div>
                    <input 
                      className="w-full h-14 text-md border px-5 
                      py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500"
                      type="text"
                      id="website"
                      {...register('website', {
                        pattern: {
                          value: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i,
                          message: "URL inválida. Ex: www.site.com ou https://site.com",
                        }
                      })}
                      placeholder="www.site.com.br ou https://site.com"
                    />
                    <p className="text-base mt-1 text-red-400">
                      <ErrorMessage errors={errors} name="website"/>
                    </p>
                  </>
                )}

              </div>
            
            </div>

              {/* Latitude e Longitude*/}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                  <label className="block mb-2 text-xl lg:text-lg">Latitude</label>
                  <input
                      value={lat}
                      readOnly
                      className="w-full h-14 text-md border px-5 
                      py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500"
                  />
              </div>

              <div>
                  <label className="block mb-2 text-xl lg:text-lg">Longitude</label>
                  <input
                      value={lng}
                      readOnly
                      className="w-full h-14 text-md border px-5 
                      py-2.5 lg:px-3 lg:py-1.5 rounded-lg placeholder-gray-500"
                  />
              </div>
            </div>

            <button className="w-full h-13 mb-4 bg-custom-blue disabled:bg-cyan-900 text-xl lg:text-lg 
            text-white py-2.5 px-5 lg:px-3 lg:py-1.5 rounded-lg cursor-pointer transition duration-300
            flex justify-center items-center"
            disabled={isSubmitting}>
              {isSubmitting ? (<Loader className="animate-spin"/>) : ('Cadastrar')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}