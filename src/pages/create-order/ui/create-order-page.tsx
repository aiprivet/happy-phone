import { CreateOrderFormWidget } from "@/widgets/create-order-form";

export const CreateOrderPage = () => {
  return (
    <main className="min-h-screen bg-slate-50 py-6 px-4">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Оформление доставки
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Заполните данные отправителя, получателя и посылки, затем
              подтвердите заявку.
            </p>
          </div>
        </header>

        <CreateOrderFormWidget />
      </div>
    </main>
  );
};

export default CreateOrderPage;

