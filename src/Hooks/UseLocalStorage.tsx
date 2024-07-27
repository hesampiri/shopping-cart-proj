import { useEffect, useState } from "react";

export function uselocalStorage<T>(key : string , initialValue : T){
    
    const [value , setvalue] = useState<T>(()=>{
        
        const jsonValue = localStorage.getItem(key)
        if(jsonValue !== null){
            return JSON.parse(jsonValue);
        }else{
            return initialValue
        }
    })

    useEffect(()=>{
        localStorage.setItem(key , JSON.stringify(value))
        } , [key , value])

    return [value , setvalue] as [ typeof value , typeof setvalue  ]
}