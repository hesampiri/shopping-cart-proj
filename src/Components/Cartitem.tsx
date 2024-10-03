import { useEffect, useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ApiCaller } from "../ApiCaller";

type CartItemProps = {
  id: number;
  quantity: number;
};

type ItemType = {
  item: CartItemProps;
};

type datatype = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export function Cartitem({ item }: ItemType) {
  const [shopdata, setshopdata] = useState<datatype[]>();
  const order = shopdata?.find((i) => i.id === item.id);
  const { removefromCart } = useShoppingCart();

  useEffect(() => {
    ApiCaller("products")
      .then((res) => {
        setshopdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="flex  gap-3 border p-3 items-center">
      <button onClick={() => removefromCart(item.id)}>
        <DeleteForeverIcon />
      </button>
      <img src={order?.image} alt="" className="rounded w-[100px] h-[100px]" />
      <div className="flex flex-col">
        <h1 className="w-full text-center line-clamp-2">{order?.title}</h1>
        <p>Quantity:{item.quantity}</p>
        <p>Price:{order?.price || 0 * item.quantity}$</p>
      </div>
    </div>
  );
}
