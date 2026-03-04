"use client";

import { useState } from "react";
import { Stepper } from "@/shared/ui/stepper";
import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Label } from "@/shared/ui/label";
import { Input } from "@/shared/ui/input";
import { Select } from "@/shared/ui/select";
import { Checkbox } from "@/shared/ui/checkbox";
import { useOrders } from "@/entities/order/model/use-orders";
import type {
  OrderFormStep1,
  OrderFormStep2,
  Order,
} from "@/entities/order/model/types";
import {
  confirmationSchema,
  step1Schema,
  step2Schema,
} from "@/features/create-order/model/validation";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, title: "Отправитель" },
  { id: 2, title: "Получатель и посылка" },
  { id: 3, title: "Подтверждение" },
];

type ErrorMap = Record<string, string | undefined>;

interface ValidationIssue {
  path: (string | number)[];
  message: string;
}

export const CreateOrderFormWidget = () => {
  const [step, setStep] = useState(1);
  const [step1, setStep1] = useState<OrderFormStep1>({
    senderName: "",
    senderPhone: "",
    senderCity: "",
  });
  const [step2, setStep2] = useState<OrderFormStep2>({
    recipientName: "",
    recipientCity: "",
    cargoType: "regular",
    weight: 1,
  });
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<ErrorMap>({});

  const { addOrder } = useOrders();
  const router = useRouter();

  const setFieldError = (issues: ValidationIssue[]): ErrorMap =>
    Object.fromEntries(
      issues.map((issue) => [issue.path.join("."), issue.message as string]),
    );

  const handleNext = () => {
    if (step === 1) {
      const res = step1Schema.safeParse(step1);
      if (!res.success) {
        setErrors(setFieldError(res.error.issues as ValidationIssue[]));
        return;
      }
    }
    if (step === 2) {
      const res = step2Schema.safeParse({
        ...step2,
        senderCity: step1.senderCity,
      });
      if (!res.success) {
        setErrors(setFieldError(res.error.issues as ValidationIssue[]));
        return;
      }
    }
    setErrors({});
    setStep((prev) => Math.min(3, prev + 1));
  };

  const handleBack = () => {
    setErrors({});
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = () => {
    const res = confirmationSchema.safeParse({ accepted });
    if (!res.success) {
      setErrors(setFieldError(res.error.issues as ValidationIssue[]));
      return;
    }

    const order: Order = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      status: "created",
      ...step1,
      ...step2,
    };

    addOrder(order);
    router.push("/orders-history");
  };

  const step1Errors = {
    senderName: errors["senderName"],
    senderPhone: errors["senderPhone"],
    senderCity: errors["senderCity"],
  };

  const step2Errors = {
    recipientName: errors["recipientName"],
    recipientCity: errors["recipientCity"],
    cargoType: errors["cargoType"],
    weight: errors["weight"],
  };

  const confirmationError = errors["accepted"];

  return (
    <section className="space-y-4">
      <Stepper currentStep={step} steps={steps} />

      <Card className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Данные отправителя
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="senderName">Имя отправителя *</Label>
                <Input
                  id="senderName"
                  placeholder="Иван Иванов"
                  value={step1.senderName}
                  onChange={(e) =>
                    setStep1((prev) => ({
                      ...prev,
                      senderName: e.target.value,
                    }))
                  }
                  error={step1Errors.senderName}
                />
              </div>
              <div>
                <Label htmlFor="senderPhone">Телефон *</Label>
                <Input
                  id="senderPhone"
                  type="tel"
                  placeholder="+79991234567"
                  value={step1.senderPhone}
                  onChange={(e) =>
                    setStep1((prev) => ({
                      ...prev,
                      senderPhone: e.target.value,
                    }))
                  }
                  error={step1Errors.senderPhone}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="senderCity">Город отправления *</Label>
              <Input
                id="senderCity"
                placeholder="Москва"
                value={step1.senderCity}
                onChange={(e) =>
                  setStep1((prev) => ({
                    ...prev,
                    senderCity: e.target.value,
                  }))
                }
                error={step1Errors.senderCity}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Получатель и посылка
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="recipientName">Имя получателя *</Label>
                <Input
                  id="recipientName"
                  placeholder="Пётр Петров"
                  value={step2.recipientName}
                  onChange={(e) =>
                    setStep2((prev) => ({
                      ...prev,
                      recipientName: e.target.value,
                    }))
                  }
                  error={step2Errors.recipientName}
                />
              </div>
              <div>
                <Label htmlFor="recipientCity">Город назначения *</Label>
                <Input
                  id="recipientCity"
                  placeholder="Санкт-Петербург"
                  value={step2.recipientCity}
                  onChange={(e) =>
                    setStep2((prev) => ({
                      ...prev,
                      recipientCity: e.target.value,
                    }))
                  }
                  error={step2Errors.recipientCity}
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="cargoType">Тип груза</Label>
                <Select
                  id="cargoType"
                  value={step2.cargoType}
                  onChange={(e) =>
                    setStep2((prev) => ({
                      ...prev,
                      cargoType: e.target.value as OrderFormStep2["cargoType"],
                    }))
                  }
                  error={step2Errors.cargoType}
                >
                  <option value="documents">Документы</option>
                  <option value="fragile">Хрупкое</option>
                  <option value="regular">Обычное</option>
                </Select>
              </div>
              <div>
                <Label htmlFor="weight">Вес, кг *</Label>
                <Input
                  id="weight"
                  type="number"
                  min={0.1}
                  max={30}
                  step={0.1}
                  value={step2.weight}
                  onChange={(e) =>
                    setStep2((prev) => ({
                      ...prev,
                      weight: Number(e.target.value),
                    }))
                  }
                  error={step2Errors.weight}
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Подтверждение заявки
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 text-sm">
                <h3 className="font-medium text-slate-800">Отправитель</h3>
                <p className="text-slate-700">
                  <span className="font-medium">Имя:</span> {step1.senderName}
                  <br />
                  <span className="font-medium">Телефон:</span>{" "}
                  {step1.senderPhone}
                  <br />
                  <span className="font-medium">Город:</span> {step1.senderCity}
                </p>
              </div>
              <div className="space-y-2 text-sm">
                <h3 className="font-medium text-slate-800">
                  Получатель и посылка
                </h3>
                <p className="text-slate-700">
                  <span className="font-medium">Имя:</span>{" "}
                  {step2.recipientName}
                  <br />
                  <span className="font-medium">Город назначения:</span>{" "}
                  {step2.recipientCity}
                  <br />
                  <span className="font-medium">Тип груза:</span>{" "}
                  {step2.cargoType === "documents"
                    ? "Документы"
                    : step2.cargoType === "fragile"
                      ? "Хрупкое"
                      : "Обычное"}
                  <br />
                  <span className="font-medium">Вес:</span> {step2.weight} кг
                </p>
              </div>
            </div>

            <Checkbox
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              label={
                <>
                  Я соглашаюсь с условиями доставки и обработки персональных
                  данных.
                </>
              }
              error={confirmationError}
            />
          </div>
        )}

        <div className="flex border-t border-slate-100 pt-4 justify-between">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Назад
            </Button>
          </div>
          <div className="flex gap-2 md:justify-end">
            {step < 3 ? (
              <Button type="button" onClick={handleNext}>
                Далее
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit}>
                Отправить
              </Button>
            )}
          </div>
        </div>
      </Card>
    </section>
  );
};
