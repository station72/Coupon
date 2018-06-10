import { PagingOutDto } from "./paging/paging-out.dto";

export interface ListResult<T>{
    result: T[];
    paging: PagingOutDto
}