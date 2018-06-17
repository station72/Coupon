export interface CategoryDto{
    id: string | number,
    title: string,
    children?: CategoryDto[],
    parentId?: string
}