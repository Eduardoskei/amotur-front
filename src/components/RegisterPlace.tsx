'use client'

import { ChevronDown, Loader } from "lucide-react"
import { useHookFormMask } from "use-mask-input"
import { FieldValues, useForm } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"
import Image from "next/image"
import React, { useEffect, useState } from "react"
import { FormPlaces } from "@/data/place"
import { postPlaces } from "@/services/placeService"

type PropsLatLng = {
  lat: number;
  lng: number;
}

export default function RegisterPlace({ lat, lng }: PropsLatLng) {
  const { handleSubmit, register, setValue, setError, clearErrors, formState: { isSubmitting, errors } } = useForm<FormPlaces>();
  const registerWithMask = useHookFormMask(register);

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showInstagram, setShowInstagram] = useState(false);
  const [showWebSite, setShowWebSite] = useState(false);

    useEffect(() => {
    register('imagens', {
      validate: (value) => {
        if (!value || value.length === 0) {
          return "Envie ao menos 1 imagem.";
        }
        if (value.length > 3) {
          return "Você só pode enviar até 3 imagens.";
        }
        return true;
      }
    });
  }, [register]);

  const handleImageCharge = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const selectedFiles = Array.from(files);

    if (images.length + selectedFiles.length > 3) {
      setError('imagens', {
        type: 'manual',
        message: 'Você só pode enviar até 3 imagens.',
      });
      return;
    }

    clearErrors('imagens');

    const newImages = [...images, ...selectedFiles];
    const newPreviews = [...previews, ...selectedFiles.map(file => URL.createObjectURL(file))];

    setImages(newImages);
    setPreviews(newPreviews);
    setValue('imagens', newImages);
  };

async function onSubmit(data: FormPlaces) {
  data.latitude = lat;
  data.longitude = lng;


  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('typePlace', data.typePlace);
  formData.append('latitude', data.latitude.toString());
  formData.append('longitude', data.longitude.toString());
  formData.append('praia', data.praia);
  formData.append('contacts', JSON.stringify(data.contacts));

  images.forEach(file => {
    formData.append('imagens', file);
  });

  const response = await postPlaces(formData);
  return response
}


  return (
    <div className="flex justify-center items-center p-4 w-full">
      <div className="w-full max-w-[95vw] sm:max-w-[480px] bg-white rounded-xl shadow-md p-4 sm:p-6 font-instrument-sans">

        <div className="flex justify-center mb-6">
          <Image
            src="https://lirp.cdn-website.com/3b6c9aee/dms3rep/multi/opt/logo-amotur+%282%29-1920w.png"
            alt="amotur-logo"
            width={150}
            height={50}
          />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">

          {/* Imagens */}
          <div>
            <label className="block text-base font-medium mb-1">
              Enviar imagens <span className="text-sm text-gray-500">(máx. 3)</span> <span className="text-red-500">*</span>
            </label>
            <label htmlFor="images" className="block w-full bg-custom-blue text-white text-center py-2 rounded-lg cursor-pointer">
              Selecionar Imagens
            </label>
            <input id="images" type="file" accept="image/*" multiple onChange={handleImageCharge} className="hidden" />
            <p className="text-sm text-red-500 mt-1">
              <ErrorMessage errors={errors} name="imagens" />
            </p>

            {previews.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-3">
                {previews.map((src, index) => (
                  <div key={index} className="relative w-full aspect-square border rounded overflow-hidden">
                    <img src={src} alt={`preview ${index}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        const updatedImages = images.filter((_, i) => i !== index);
                        const updatedPreviews = previews.filter((_, i) => i !== index);
                        setImages(updatedImages);
                        setPreviews(updatedPreviews);
                        setValue('imagens', updatedImages);

                        if (updatedImages.length === 0) {
                          setError('imagens', {
                            type: 'manual',
                            message: 'Envie ao menos 1 imagem.',
                          });
                        }
                      }}
                      className="absolute top-1 right-1 bg-black/60 text-white text-sm w-6 h-6 rounded-full flex justify-center items-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Nome */}
          <div>
            <label htmlFor="name" className="block mb-1 text-base font-medium">
              Nome do Local <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              className="w-full border rounded-lg px-4 py-2 placeholder-gray-400"
              {...register('name', {
                required: 'O campo de nome precisa ser preenchido.',
                maxLength: {
                  value: 255,
                  message: "O nome deve conter no máximo 255 caracteres."
                }
              })}
              placeholder="Digite o nome do local"
            />
            <p className="text-sm text-red-500 mt-1">
              <ErrorMessage errors={errors} name="name" />
            </p>
          </div>

          {/* Tipo */}
          <div>
            <label htmlFor="typePlace" className="block mb-1 text-base font-medium">
              Tipo de Local <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="typePlace"
                defaultValue=""
                {...register('typePlace', { required: 'Selecione o tipo de local.' })}
                className="cursor-pointer w-full border rounded-lg px-4 py-2 appearance-none"
              >
                <option value="" disabled>Selecione um tipo</option>
                <option value="Bar">Bar</option>
                <option value="Restaurante">Restaurante</option>
                <option value="Hotel">Hotel</option>
                <option value="Pousada">Pousada</option>
              </select>
              <ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-sm text-red-500 mt-1">
              <ErrorMessage errors={errors} name="typePlace" />
            </p>
          </div>

          {/* Praia */}
          <div>
            <label htmlFor="praia" className="block mb-1 text-base font-medium">
              Praia <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="praia"
                defaultValue=""
                {...register("praia", { required: "Selecione a praia." })}
                className="cursor-pointer w-full border rounded-lg px-4 py-2 appearance-none"
              >
                <option value="" disabled>Selecione a praia</option>
                <option value="Caetanos">Caetanos</option>
                <option value="Icarai">Icaraí</option>
                <option value="Moitas">Moitas</option>
              </select>
              <ChevronDown className="absolute top-1/2 right-3 transform -translate-y-1/2 pointer-events-none" />
            </div>
            <p className="text-sm text-red-500 mt-1">
              <ErrorMessage errors={errors} name="praia" />
            </p>
          </div>


          {/* WhatsApp */}
          <div>
            <label htmlFor="whatsapp" className="block mb-1 text-base font-medium">
              WhatsApp <span className="text-red-500">*</span>
            </label>
            <input
              id="whatsapp"
              type="tel"
              className="w-full border rounded-lg px-4 py-2 placeholder-gray-400"
              {...registerWithMask('contacts.whatsApp', ["(99) 99999-9999"], {
                required: "O campo de WhatsApp precisa ser preenchido.",
                pattern: {
                  value: /^\(?[1-9]{2}\)?\s?9[0-9]{4}-?[0-9]{4}$/,
                  message: "WhatsApp inválido."
                }
              })}
              placeholder="(99) 99999-9999"
            />
            <p className="text-sm text-red-500 mt-1">
              <ErrorMessage errors={errors} name="contacts.whatsApp" />
            </p>
          </div>
          {/* Campos Opcionais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              {!showEmail ? (
                <button type="button" onClick={() => setShowEmail(true)} className="cursor-pointer text-sm text-blue-600 underline">
                  + Adicionar Email
                </button>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="email" className="text-base font-medium">Email</label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowEmail(false);
                        setValue('contacts.email', '');
                      }}
                      className="cursor-pointer text-sm text-red-600 underline"
                    >
                      Remover
                    </button>
                  </div>
                  <input
                    id="email"
                    type="email"
                    className="w-full border rounded-lg px-4 py-2 placeholder-gray-400"
                    {...register('contacts.email', {
                      required: "O campo de e-mail precisa ser preenchido",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
                        message: "E-mail inválido."
                      }
                    })}
                    placeholder="exemplo@email.com"
                  />
                  <p className="text-sm text-red-500 mt-1">
                    <ErrorMessage errors={errors} name="contacts.email" />
                  </p>
                </>
              )}
            </div>

            {/* Telefone Fixo */}
            <div>
              {!showPhone ? (
                <button type="button" onClick={() => setShowPhone(true)} className="cursor-pointer text-sm text-blue-600 underline">
                  + Adicionar Telefone Fixo
                </button>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="phone" className="text-base font-medium">Telefone</label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowPhone(false);
                        setValue('contacts.phone', '');
                      }}
                      className="cursor-pointer text-sm text-red-600 underline"
                    >
                      Remover
                    </button>
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full border rounded-lg px-4 py-2 placeholder-gray-400"
                    {...registerWithMask('contacts.phone', ["(99) 9999-9999"], {
                      required: "O campo de telefone precisa ser preenchido",
                      pattern: {
                        value: /^\(?[1-9]{2}\)?\s?[2-9][0-9]{3}-?[0-9]{4}$/,
                        message: "Telefone inválido."
                      }
                    })}
                    placeholder="(85) 3456-7890"
                  />
                  <p className="text-sm text-red-500 mt-1">
                    <ErrorMessage errors={errors} name="contacts.phone" />
                  </p>
                </>
              )}
            </div>

            {/* Instagram */}
            <div>
              {!showInstagram ? (
                <button type="button" onClick={() => setShowInstagram(true)} className="cursor-pointer text-sm text-blue-600 underline">
                  + Adicionar Instagram
                </button>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="instagram" className="text-base font-medium">Instagram</label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowInstagram(false);
                        setValue('contacts.instagram', '');
                      }}
                      className="cursor-pointer text-sm text-red-600 underline"
                    >
                      Remover
                    </button>
                  </div>
                  <input
                    id="instagram"
                    type="text"
                    className="w-full border rounded-lg px-4 py-2 placeholder-gray-400"
                    {...register('contacts.instagram', {
                      required: "O campo do Instagram precisa ser preenchido",
                      pattern: {
                        value: /^@?(\w){1,30}$/,
                        message: "Instagram inválido, ex: @nomeperfil"
                      }
                    })}
                    placeholder="@perfil"
                  />
                  <p className="text-sm text-red-500 mt-1">
                    <ErrorMessage errors={errors} name="contacts.instagram" />
                  </p>
                </>
              )}
            </div>

            {/* Website */}
            <div>
              {!showWebSite ? (
                <button type="button" onClick={() => setShowWebSite(true)} className="cursor-pointer text-sm text-blue-600 underline">
                  + Adicionar Website
                </button>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-1">
                    <label htmlFor="website" className="text-base font-medium">Website</label>
                    <button
                      type="button"
                      onClick={() => {
                        setShowWebSite(false);
                        setValue('contacts.website', '');
                      }}
                      className="cursor-pointer text-sm text-red-600 underline"
                    >
                      Remover
                    </button>
                  </div>
                  <input
                    id="website"
                    type="text"
                    className="w-full border rounded-lg px-4 py-2 placeholder-gray-400"
                    {...register('contacts.website', {
                      required: "O campo de Website precisa ser preenchido",
                      pattern: {
                        value: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i,
                        message: "URL inválida. Ex: www.site.com"
                      }
                    })}
                    placeholder="https://site.com"
                  />
                  <p className="text-sm text-red-500 mt-1">
                    <ErrorMessage errors={errors} name="contacts.website" />
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Coordenadas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-base font-medium">Latitude</label>
              <input
                value={lat}
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100"
              />
            </div>
            <div>
              <label className="block mb-1 text-base font-medium">Longitude</label>
              <input
                value={lng}
                readOnly
                className="w-full border rounded-lg px-4 py-2 bg-gray-100"
              />
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full bg-custom-blue text-white py-3 rounded-lg text-lg flex items-center justify-center cursor-pointer"
          >
            {isSubmitting ? <Loader className="animate-spin" /> : "Cadastrar"}
          </button>

        </form>
      </div>
    </div>
  )
}