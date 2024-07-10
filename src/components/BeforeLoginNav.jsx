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


const BeforeLoginNav = () => {

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
            <img src={Cart} alt="cart" className="cursor-pointer w-8 h-8 "/>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Cart</SheetTitle>
                </SheetHeader>
                <SheetDescription>
                    <p>Cart is Empty</p>
                </SheetDescription>
                <div className="flex flex-col gap-10">

                    <div className="flex-1">

                        <div className="flex flex-col border-[2px] p-4">
                            <h1 className="text-xl roboto-black">Test Name</h1>
                            <p>Price : ₹300</p>
                        </div>

                        </div>
                    <div>
                        <h1 className="text-2xl roboto-black">Total: ₹0</h1>
                        <Button className="w-full bg-blue-700 hover:bg-blue-500 text-white">Checkout</Button>
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