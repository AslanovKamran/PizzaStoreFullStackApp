import { ICartItem } from "../redux/slices/cart/types";


export const calcTotalPrice = (items: ICartItem[]) => {
    return items.reduce((sum, obj) => {
        return (obj.price * obj.count) + sum;
    }, 0);
}

export default calcTotalPrice