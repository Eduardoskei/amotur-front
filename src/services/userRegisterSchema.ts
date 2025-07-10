import z from "zod"

export const userRegisterSchema = z.object({
  name: z.string()
  .min(1, {
    message: "O nome deve ser preenchido"
  })
  .max(255, {
    message: "O nome deve ter no maximo 255 caracteres"
  })
  .transform(value =>
    value
      .toLowerCase()
      .split(' ')
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')
  ),

  email: z.string()
  .min(1, {
    message: "O E-mail deve ser preenchido"
  })
  .email({
    message: "E-mail inválido"
  }),

  phone: z.string()
  .min(14, {
    message: "O número está incompleto"
  })
  .trim()
  .regex(/^\+?[\d\s()-]{10,20}$/, {
    message: "Número de telefone inválido"
  })
  .refine((val) => {
    const digitsOnly = val.replace(/\D/g, '');
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
  }, {
    message: "O telefone deve conter entre 10 e 15 dígitos"
  }),

  password: z.string()
  .min(8, {
    message: "A senha deve conter no mínimo 8 caracteres"
  }),

  passwordConfirmation: z.string()
  .min(8, {
    message: "A senha deve conter no mínimo 8 caracteres"
  })
}).refine((data) => {
  return data.password === data.passwordConfirmation
}, {
  message: "As senhas devem ser iguais",
  path: ["passwordConfirmation"]
})

export type UserRegister = z.infer<typeof userRegisterSchema>