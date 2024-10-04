import { DependencyModuleFactory } from "../../simple-di-react/services/DependencyModuleFactory";
import { dependencyServiceFactory } from "../components/MicroDI";

interface PaymentAdepter {
  pay: (mesage: string) => void;
}

class PaymentStripe implements PaymentAdepter {
  pay(mesage: string) {
    console.log(mesage);
  }
}

export interface PaymentServices {
  payment: PaymentStripe;
}

const paymentServices = new DependencyModuleFactory<PaymentServices>({
  payment: new PaymentStripe(),
}).getServices();

const [DIPaymentProvider, useDIPaymentServices] =
  dependencyServiceFactory<PaymentServices>("PaymentServices");

export { DIPaymentProvider, useDIPaymentServices, paymentServices };
