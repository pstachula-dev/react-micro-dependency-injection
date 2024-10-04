import { useEffect } from "react";
import {
  DIGlobalProvider,
  globalServices,
  useDIGlobalServices,
} from "./lib/MicroDI/services/GlobalServiceProvider";
import {
  DIPaymentProvider,
  paymentServices,
  useDIPaymentServices,
} from "./lib/MicroDI/services/PaymentServiceProvider";

const GlobalModule = () => {
  const { logger } = useDIGlobalServices();

  useEffect(() => {
    logger.log("Global Module");
  }, []);

  return <p>Global Module</p>;
};

const PaymentModule = () => {
  const { logger } = useDIGlobalServices();
  const { payment } = useDIPaymentServices();

  useEffect(() => {
    logger.log("Payment Module");
    payment.pay("Payment service");
  }, []);

  return <p>Payment Module</p>;
};

export const DependencyInjectionExample = () => {
  return (
    <div>
      {/* Load Global Provider */}
      <DIGlobalProvider deps={globalServices}>
        <GlobalModule />
        {/* Load Payment Provider */}
        <DIPaymentProvider deps={paymentServices}>
          <PaymentModule />
        </DIPaymentProvider>
      </DIGlobalProvider>
    </div>
  );
};
