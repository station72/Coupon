import { Subject, Observable, from } from "rxjs";
import { CategoryDto } from "../dto/category.dto";
import { Injectable } from "@angular/core";

@Injectable()
export class CategoriesTreeService {
  private addCategorySubject: Subject<CategoryDto> = new Subject<CategoryDto>();
  public $addCategory: Observable<CategoryDto> = from(this.addCategorySubject);

  private updateCategorySubject: Subject<CategoryDto> = new Subject<CategoryDto>();
  public $updateCategory: Observable<CategoryDto> = from(this.updateCategorySubject);

  addCategory(category: CategoryDto) {
    this.addCategorySubject.next(category);
  }

  updateCategory(category: CategoryDto) {
    this.updateCategorySubject.next(category);
  }
}
