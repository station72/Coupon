import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesFormFactory } from "src/app/modules/categories/services/categories-form-factory";
import { BaseFormComponent } from "../../../../shared/components/base-form.component";
import { BadInputErrorsService } from "../../../../shared/services/bad-input-errors.service";
import { CategoriesTreeService } from "../../services/categories-tree.service";
import { CategoriesService } from "../../services/categories.service";

@Component({
  selector: "app-categories-create",
  templateUrl: "./categories-create.component.html",
  styleUrls: ["./categories-create.component.css"]
})
export class CategoriesCreateComponent extends BaseFormComponent {
  loading: boolean;

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

  onSubmit() {
    this.submitClicked = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    const data = this.form.getRawValue();
    this.categoriesService.create(data).subscribe(
      category => {
        this.loading = false;
        this.treeService.addCategory(category);
        this.onClose();
      },
      error => {
        this.loading = false;
        this.showServerErrors(error);
      }
    );
  }

  getControlNames(): string[] {
    return ["title", "friendlyUrl"];
  }

  //https://www.bennadel.com/blog/3351-closing-secondary-router-outlet-views-from-within-the-named-route-view-components-in-angular-4-4-4.htm
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
