import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useShoppingCart } from '../context/ShoppingCartContext';


type infotype = {
    id: number 
    name:string
    price:number
    imgUrl?:string
    altText:string
}

type datatype ={
    info : infotype
}

export default function MediaCard({info}:datatype) {


  const {getItemQuantitiy , increaseItemQuantity , decreaseItemQuantity , removefromCart} = useShoppingCart();

  const itemQuantity = getItemQuantitiy(info.id)

  return (
    <Card sx={{ width: 300 , height: 370 , padding:1  }}>
      <CardMedia
        sx={{ height: 200 }}
        image={info.imgUrl}
        title="green iguana"
      />
      <CardContent style={{height:120 , padding:5}}>
        <Typography gutterBottom variant="h5" component="div">
          {info.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            {info.altText}
        </Typography>
        <p>
          {info.price}$
        </p>
      </CardContent>
          {itemQuantity === 0 ?
            <button className='bg-cyan-700 text-white w-full rounded p-1' onClick={() => increaseItemQuantity(info.id)} >Buy</button>
          :
            <div className='flex justify-around items-center w-full px-4'>
                <div className='flex items-center w-full'>
                  <button className='bg-cyan-700 text-white px-2 rounded' onClick={() => increaseItemQuantity(info.id)} >+</button>
                    <p className='w-9 text-center' >{itemQuantity}</p>
                  <button className='bg-cyan-700 text-white px-2 rounded' onClick={() => decreaseItemQuantity(info.id)} >-</button>
                </div>
                <button className='bg-gray-300 rounded px-4 mt-1' onClick={()=>removefromCart(info.id)}>Remove</button>
            </div>
          }
    </Card>
  );
}
