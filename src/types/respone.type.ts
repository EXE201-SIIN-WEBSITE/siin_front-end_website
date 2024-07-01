export interface ResponseData<TData> {
  message: string
  data: TData
}


export interface ResponseData2<TData> {
  data: {
    currentPage: number;
    listResult: TData;
    totalPage: number;
    length:number
  };
}