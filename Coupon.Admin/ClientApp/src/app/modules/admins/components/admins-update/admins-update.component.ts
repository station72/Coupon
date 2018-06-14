import { AfterContentInit, Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { BadInputErrorsService } from "../../../../shared/services/bad-input-errors.service";
import { AdminDto } from "../../dto/admin.dto";
import { AdminFormFactoryService } from "../../services/admin-form-factory.service";
import { AdminsService } from "../../services/admins.service";
import { BaseFormComponent } from "src/app/shared/components/base-form.component";

@Component({
  selector: "app-admins-update",
  templateUrl: "./admins-update.component.html",
  styleUrls: ["./admins-update.component.css"]
})
export class AdminsUpdateComponent extends BaseFormComponent {
  private admin: AdminDto;
  public loading = false;

  public confirmDelSubject: Subject<any> = new Subject();

  constructor(
    formFactory: AdminFormFactoryService,
    badInputService: BadInputErrorsService,
    private adminService: AdminsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    super(formFactory, badInputService);
    this.createForm();

    this.route.data.subscribe(data => {
      const admin = data["admin"] as AdminDto;
      if (!admin) {
        throw new Error("Admin data is empty");
      }
      this.fillFormControls(admin);
      this.admin = admin;
    });
  }

  getControlNames(): string[] {
    return ['login', 'name','email', 'role'];
  }

  //to base class
  onSubmit() {
    this.submitClicked = true;
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    var serialized = JSON.stringify(this.form.getRawValue());

    this.adminService.update(this.admin.id, serialized).subscribe(
      provider => {
        this.router.navigate(["admins"]);
      },
      error => {
        this.loading = false;
        super.showServerErrors(error);
      }
    );
  }

  onDelete(template: TemplateRef<any>) {
    this.confirmDelSubject.next();
  }

  onConfirmedDelete() {
    this.adminService.delete(this.admin.id).subscribe(res => {
      this.router.navigate(["admins"]);
    });
  }

  onBlock() {}
}
