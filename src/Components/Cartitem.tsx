import { useShoppingCart } from '../context/ShoppingCartContext';
import ShopData from '../Data/data.json'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

type CartItemProps = {
    id : number
    quantity : number
}

type ItemType ={
    item : CartItemProps
}


export function Cartitem({item} : ItemType){

    const order = ShopData.find(i => i.id === item.id)
    const {removefromCart} = useShoppingCart()

    return(
        <div className="flex  gap-3 border p-3 items-center">
                <button onClick={()=>removefromCart(item.id)} >
                    <DeleteForeverIcon/>
                </button>
                <img src={order?.imgUrl} alt="" className='rounded w-[100px] h-[100px]' />
            <div className='flex flex-col'>
                <h1 className='w-full text-center'>{order?.name}</h1>
                <p>Quantity:{item.quantity}</p>
                <p>Price:{order?.price || 0  * item.quantity}$</p>
            </div>
        </div>
    )
}