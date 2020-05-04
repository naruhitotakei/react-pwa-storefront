import { CheckoutNetworkManager } from "../network";
import { LocalRepository } from "../repository";
import { CartJobs } from "./Cart";
import { CheckoutJobs } from "./Checkout";

export interface IJobs {
  cart: CartJobs;
  checkout: CheckoutJobs;
}

export class Jobs implements IJobs {
  cart: CartJobs;
  checkout: CheckoutJobs;

  constructor(
    repository: LocalRepository,
    checkoutNetworkManager: CheckoutNetworkManager
  ) {
    this.cart = new CartJobs();
    this.checkout = new CheckoutJobs(repository, checkoutNetworkManager);
  }
}
