import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { CategoryDto } from "../dto/category.dto";
import { CategoriesService } from "../services/categories.service";
import { Injectable } from "@angular/core";

@Injectable()
export class CategoryResolver implements Resolve<CategoryDto>{
constructor(
    private categoriesService: CategoriesService
) {
}
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<CategoryDto> | Promise<CategoryDto> | CategoryDto {
        const id = route.params['id'];
        return this.categoriesService.get(id);
    }
}