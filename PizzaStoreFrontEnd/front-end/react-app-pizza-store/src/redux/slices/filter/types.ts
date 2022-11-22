export interface ISort{
    name:string,
    sortProperty:string

}

export interface IFilterSliceState {
    categoryId:number,
    sort : ISort
    currentPage:number,
}