import { OrderDetailsPage } from "@/pages/orders-history/ui/order-details-page";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailsRoute({ params }: Params) {
  const { id } = await params;
  return <OrderDetailsPage id={id} />;
}
