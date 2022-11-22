export interface ICartItem  {
    id:number,
    title:string,
    price:number,
    imageUrl:string,
    count:number
}

export interface ICartSliceState{
    totalPrice:number,
    items:ICartItem[]
}