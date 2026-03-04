import { z } from "zod";

export const step1Schema = z.object({
  senderName: z.string().min(2, "Минимум 2 символа"),
  senderPhone: z.string().regex(/^\+?\d{10,15}$/, "Неверный формат телефона"),
  senderCity: z.string().min(1, "Укажите город отправления"),
});

export const step2Schema = z
  .object({
    recipientName: z.string().min(1, "Укажите имя получателя"),
    recipientCity: z.string().min(1, "Укажите город назначения"),
    cargoType: z.enum(["documents", "fragile", "regular"]),
    weight: z
      .number({
        error: () => ({ message: "Укажите правильный вес" }),
      })
      .min(0.1, "Минимум 0.1 кг")
      .max(30, "Максимум 30 кг"),
    senderCity: z.string(),
  })
  .refine((data) => data.senderCity !== data.recipientCity, {
    message: "Город назначения не может совпадать с городом отправления",
    path: ["recipientCity"],
  });

export const confirmationSchema = z.object({
  accepted: z.boolean().refine((value) => value, "Необходимо согласиться с условиями"),
});
