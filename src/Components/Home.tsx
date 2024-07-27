import TemporaryDrawer from "./TemDrawer"
import MediaCard from "./Card"
import data from '../Data/data.json'

export function Home(){
    return(
        <div>
        <TemporaryDrawer/>
        <div className='bg-blue-100 flex flex-wrap justify-center gap-3 p-3'>
          {data.map((item)=>{
            return <MediaCard key={item.id} info={item} />
          })}
        </div>
        </div>
    )
} 