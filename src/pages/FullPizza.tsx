import React, { FC } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useState } from 'react';

const FullPizza: FC = () => {
    const { id } = useParams()
    const [pizza,setPizza] = useState<
    {imageUrl: string,
     title: string,
     price: number
    
    }>()
    console.log(id);
    useEffect(() => {

        async function fetchPizza(){
            try {
                const {data} = await  axios.get('https://6375f41b7e93bcb006be573c.mockapi.io/pizzas/' + id)
                setPizza(data)
                console.log(data);
            } catch (error: any) {
                console.log(error.message);
            }
        }

       fetchPizza()
    }, [])
    if(!pizza){
        return <> 'loading..'</>
    }
    return (
        <div className='container'>
      <img src={pizza.imageUrl} alt="" />
      <div>{pizza.title}</div>
      <div>{pizza.price}</div>
        </div>
    )
}

export default FullPizza