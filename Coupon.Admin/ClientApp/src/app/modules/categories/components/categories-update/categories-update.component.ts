import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BadInputErrorsService } from "src/app/shared/services/bad-input-errors.service";
import { BaseFormComponent } from "../../../../shared/components/base-form.component";
import { CategoryDto } from "../../dto/category.dto";
import { CategoriesFormFactory } from "../../services/categories-form-factory";
import { CategoriesTreeService } from "../../services/categories-tree.service";
import { CategoriesService } from "../../services/categories.service";

@Component({
  selector: "app-categories-update",
  templateUrl: "./categories-update.component.html",
  styleUrls: ["./categories-update.component.css"]
})
export class CategoriesUpdateComponent extends BaseFormComponent
  implements OnInit {
  public loading = false;
  private category: CategoryDto;

  constructor(
    formFactory: CategoriesFormFactory,
    badInput: BadInputErrorsService,
    private categoriesService: CategoriesService,
    private treeService: CategoriesTreeService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) {
    super(formFactory, badInput);
    this.createForm();
  }

  getControlNames(): string[] {
    return ["title", "friendlyUrl"];
  }

  onSubmit() {
    this.submitClicked = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const data = this.form.getRawValue();
    this.categoriesService.update(this.category.id, data).subscribe(
      res => {
        this.loading = false;
        this.treeService.updateCategory(res);
        this.onClose();
      },
      error => {
        this.loading = false;
        this.showServerErrors(error);
      }
    );
  }

  ngOnInit(): void {
    this.actRoute.data.subscribe(data => {
      this.category = data["category"] as CategoryDto;
      this.fillFormControls(this.category);
    });
  }

  onClose() {
    this.router.navigate(
      [
        {
          outlets: {
            cat: null
          }
        }
      ],
      {
        relativeTo: this.actRoute.parent
      }
    );
  }
}
