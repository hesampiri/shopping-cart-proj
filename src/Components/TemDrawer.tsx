import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Cartitem } from "./Cartitem";
import { useShoppingCart } from "../context/ShoppingCartContext";
import shopdata from "../Data/data.json";

export default function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const { cartQuantity, cartItems } = useShoppingCart();

  const DrawerList = (
    <>
      <Box
        sx={{ width: { sm: 350 } }}
        role="presentation"
        onClick={toggleDrawer(true)}
      >
        <div>
          <h1 className="text-center py-2 font-medium text-xl">Your Cart</h1>
          {cartItems.map((item) => {
            return <Cartitem key={item.id} item={item} />;
          })}
        </div>
      </Box>
      <div className="p-3 font-medium text-xl mt-auto border">
        <h1>
          Total Price :
          {cartItems.reduce((total, cartItem) => {
            const item = shopdata.find((item) => item.id === cartItem.id);
            const totalprice = total + (item?.price || 0) * cartItem.quantity;
            return Number(totalprice.toFixed(2));
          }, 0)}
          $
        </h1>
      </div>
    </>
  );

  return (
    <div className="flex bg-cyan-950 text-white h-20 items-center justify-between px-5 sticky top-0">
      <h1 className="font-bold">Home</h1>
      <Button
        onClick={toggleDrawer(true)}
        style={{ position: "relative", height: 70 }}
      >
        <ShoppingCartIcon style={{ color: "white", height: 70, width: 30 }} />
        {cartQuantity === 0 ? null : (
          <div className="bg-red-500 text-white rounded-full w-6 h-6 absolute translate-y-3 translate-x-3">
            {cartQuantity}
          </div>
        )}
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
