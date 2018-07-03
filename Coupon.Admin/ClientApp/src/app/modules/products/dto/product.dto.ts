import { ImageDto } from "src/app/shared/data/image/image.dto";
import { ProductState } from "./product-state";

export interface ProductDto{
    id: number,
    title: string,
    fullTitle: string,
    validFrom: string,
    validUntil: string,
    conditions: string,
    mainImageId: string,
    mainImage: ImageDto,
    images: ImageDto[],
    providerId: string,
    provider: ProviderDto,
    oldPrice: string,
    newPrice: string,
    startAvailableCount: number,
    availableCount: number,
    onSale: boolean,
    state: ProductState
}