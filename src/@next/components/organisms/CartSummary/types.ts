import { IImage, ITaxedMoney } from "@types";
export interface ICostLine {
  name: string;
  cost: ITaxedMoney;
  last?: boolean;
}

export interface ICosts {
  subtotal?: ITaxedMoney;
  promoCode?: ITaxedMoney;
  shipping?: ITaxedMoney;
  total?: ITaxedMoney;
}

export interface IProduct {
  name: string;
  quantity: number;
  sku: string;
  price: ITaxedMoney;
  thumbnail: IImage;
}

export interface IProps extends ICosts {
  products?: IProduct[];
}
