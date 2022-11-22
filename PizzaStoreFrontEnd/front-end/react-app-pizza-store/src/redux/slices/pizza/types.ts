export interface IFetchPizzasArgs{
    currentPage:number, 
    order:string, 
    sortBy:string, 
    category:string
}

export interface IPizzaItem{
    id:number, 
    title:string, 
    price:number, 
    imageUrl:string,
    description:string,
    category:string
}

export interface IPageInfo{
    totalPages:number,
    itemsPerPage:number
}

export enum StatusList  {
    PENDING = 'pending',
    SUCCESS = 'success',
    FAIL = 'fail'
}

export interface IPizzaSliceState{
    items:IPizzaItem[],
    pageInfo:IPageInfo,
    status: StatusList
}