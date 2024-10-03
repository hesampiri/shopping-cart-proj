import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useShoppingCart } from "../context/ShoppingCartContext";
import CardMedia from "@mui/material/CardMedia";

type datatype = {
  id: number;
  title: string;
  price: number;
  description?: string;
  category?: string;
  image: string;
};

export default function MediaCard({
  title,
  id,
  image,
  price,
  description,
}: datatype) {
  const {
    getItemQuantitiy,
    increaseItemQuantity,
    decreaseItemQuantity,
    removefromCart,
  } = useShoppingCart();

  const itemQuantity = getItemQuantitiy(id);

  return (
    <Card style={{ padding: 10 }}>
      <CardMedia
        component="img"
        image={image}
        style={{ height: 200, objectFit: "contain" }}
      />
      <CardContent style={{ height: 120, padding: 5 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          fontSize={"madium"}
        >
          <p className="line-clamp-1 ">{title}</p>
        </Typography>
        <Typography variant="body2" color="text.secondary" fontSize="small">
          <p className="line-clamp-2">{description}</p>
        </Typography>
        <p>{price}$</p>
      </CardContent>
      {itemQuantity === 0 ? (
        <button
          className="bg-cyan-900 text-white w-full rounded p-1"
          onClick={() => increaseItemQuantity(id)}
        >
          Buy
        </button>
      ) : (
        <div className="flex justify-around items-center w-full px-4">
          <div className="flex items-center w-full">
            <button
              className="bg-cyan-900 text-white px-2 rounded"
              onClick={() => increaseItemQuantity(id)}
            >
              +
            </button>
            <p className="w-9 text-center">{itemQuantity}</p>
            <button
              className="bg-cyan-900 text-white px-2 rounded"
              onClick={() => decreaseItemQuantity(id)}
            >
              -
            </button>
          </div>
          <button
            className="bg-gray-300 rounded px-4 mt-1"
            onClick={() => removefromCart(id)}
          >
            Remove
          </button>
        </div>
      )}
    </Card>
  );
}
