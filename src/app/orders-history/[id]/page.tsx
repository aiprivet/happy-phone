import { OrderDetailsPage } from "@/pages/orders-history/ui/order-details-page";

interface Params {
  params: {
    id: string;
  };
}

export default function OrderDetailsRoute({ params }: Params) {
  return <OrderDetailsPage id={params.id} />;
}

