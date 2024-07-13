import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../@/components/ui/select"
import avatarIcon from '../assets/avatar.png';  
import Cart from '../assets/shopping-cart.png'; 
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "../@/components/ui/tooltip"

  import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "../@/components/ui/sheet"
  import {Button} from '../@/components/ui/button';
import { CartContext } from "../contexts/CartContext";
import { useContext, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const BeforeLoginNav = () => {

    const {cart,setCart} = useContext(CartContext);
    const Navigator = useNavigate();

    useEffect(() => {
        localStorage.setItem('cart',JSON.stringify(cart))}
        , [cart])


    const deleteItemFromCart = (data) => {
        let temp = cart.data.filter(d=>d._id!=data._id);
        setCart({data:temp,totalQuantity:cart.totalQuantity-data.quantity,totalPrice:cart.totalPrice-(data.quantity*data.price)});
    }

    const incrementItem = (data) => {
        let temp = cart.data.map(d=>{
            if(d._id == data._id){
                d.quantity += 1;
                return d;
            }
            return d;
        })
        setCart({data:temp,totalQuantity:cart.totalQuantity+1,totalPrice:cart.totalPrice+data.price});
    }

    const decrementItem = (data) => {
        if(data.quantity===1){
            deleteItemFromCart(data);
            return;
        }

        let temp = cart.data.map(d=>{
            if(d._id == data._id){
                d.quantity -= 1;
                return d;
            }
            return d;
        })
        setCart({data:temp,totalQuantity:cart.totalQuantity-1,totalPrice:cart.totalPrice-data.price});
    }


    return (
        <>
        <TooltipProvider>
        <div className="flex justify-between w-full min-h-[100px] border-b-2 bg-white">
        <div className="flex min-h-[100px] items-center px-10 gap-4 justify-center">
            <h1 className="text-xl px-10 roboto-black text-yellow-500 bg-[#0A5BA5] border p-2 rounded-full">Smart Report</h1>
            <div className="-mt-4">
            <Select>
                <SelectTrigger className="max-w-[150px]">
                    <SelectValue placeholder="City"/>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="bsr">Bulandshahr</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Bangalore">Bangalore</SelectItem>
                </SelectContent>
            </Select>
            </div>
        </div>
        <div className="flex items-center px-10 gap-8">
            <Tooltip>
            <TooltipTrigger>
            <Sheet>
            <SheetTrigger>
            <div className="relative">
            <div className=" bg-red-500 absolute -top-4 left-6 text-white p-[2px] w-6 h-6 flex justify-center items-center text-xs rounded-full">
            {cart.totalQuantity}
            </div>
            <img src={Cart} alt="cart" className="cursor-pointer w-8 h-8 "/>
            </div>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Cart</SheetTitle>
                </SheetHeader>
                <SheetDescription>
                    {cart.totalQuantity===0?<p>Cart is Empty</p>:null}
                </SheetDescription>
                <div className="flex flex-col gap-10">

                    <div className="flex-1">

                        {cart.data.map(d=><div className="flex flex-col border-[2px] p-4">
                            <div className="flex justify-between">
                            <div>
                            <h1 className="text-xl roboto-black">{d.name}</h1>
                            <p>Price : ₹{d.quantity * d.price}</p>
                            </div>
                            <div className="flex flex-col gap-4 justify-center items-center">
                                <div 
                                onClick={()=>{
                                    deleteItemFromCart(d);
                                }
                                }
                                className="border-2 p-2 rounded-md hover:cursor-pointer hover:border-red-500 hover:border-2">
                                <MdDelete size={20} color="#ef4444" />
                                </div>
                            </div>
                        </div>
                        </div>
                        )}

                        </div>
                    <div>
                        <h1 className="text-2xl roboto-black">Total: ₹{cart.totalPrice}</h1>
                        <Button
                        onClick={()=>{
                            Navigator('/checkout');
                        }}
                        className="w-full bg-blue-700 hover:bg-blue-500 text-white">Checkout</Button>
                    </div>
                </div>
            </SheetContent>
            </Sheet>
            </TooltipTrigger>
            <TooltipContent>
                <p>Cart</p>
            </TooltipContent>
            </Tooltip>
            <Tooltip>
            <TooltipTrigger>
            <img src={avatarIcon} alt="avatar" className="cursor-pointer w-10 h-10 rounded-full"/>
            </TooltipTrigger>
            <TooltipContent>
                <p>Goto Profile</p>
            </TooltipContent>
            </Tooltip>
        </div>
        </div>
        </TooltipProvider>
        </>
    )
}


export default BeforeLoginNav;