import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

function CartTotal() {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext)

    return (
        <div className='w-full max-w-md mx-auto bg-white shadow-lg rounded-xl p-6'>
            <Title text1={'CART'} text2={'TOTAL'} />

            <div className='flex flex-col gap-4 mt-4 text-gray-700'>
                <div className='flex justify-between'>
                    <p className='font-medium'>Subtotal</p>
                    <p className='font-medium'>{currency}{getCartAmount()}.00</p>
                </div>
                <div className='flex justify-between'>
                    <p className='font-medium'>Shipping Fee</p>
                    <p className='font-medium'>{currency}{delivery_fee}.00</p>
                </div>
                <hr className='my-2 border-gray-300' />
                <div className='flex justify-between text-lg text-gray-900'>
                    <b>Total</b>
                    <b>
                        {currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00
                    </b>
                </div>
            </div>

       
        </div>
    )
}

export default CartTotal
