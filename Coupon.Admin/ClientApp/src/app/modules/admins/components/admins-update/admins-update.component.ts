import { AfterContentInit, Component, OnInit, TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject } from "rxjs";
import { BaseComponent } from "../../../../shared/components/base.component";
import { BadInputErrorsService } from "../../../../shared/services/bad-input-errors.service";
import { AdminDto } from "../../dto/admin.dto";
import { AdminFormFactoryService } from "../../services/admin-form-factory.service";
import { AdminsService } from "../../services/admins.service";

@Component({
  selector: "app-admins-update",
  templateUrl: "./admins-update.component.html",
  styleUrls: ["./admins-update.component.css"]
})
export class AdminsUpdateComponent extends BaseComponent
  implements OnInit, AfterContentInit {
  public form: FormGroup;
  private admin: AdminDto;
  public loading = false;

  private fieldNames: string[] = ["login", "email", "name", "role"];

  public confirmDelSubject: Subject<any> = new Subject();

  constructor(
    private adminService: AdminsService,
    private formFactory: AdminFormFactoryService,
    private route: ActivatedRoute,
    private router: Router,
    private badInputService: BadInputErrorsService
  ) {
    super();
  }

  ngAfterContentInit(): void {}

  ngOnInit() {
    this.initForm();

    this.route.data.subscribe(data => {
      const admin = data["admin"] as AdminDto;
      if (!admin) {
        throw new Error("Admin data is empty");
      }
      this.fillFormControls(admin);
      this.admin = admin;
    });
  }

  //to base class
  private initForm() {
    const formInputs = {};
    for (const fieldName of this.fieldNames) {
      formInputs[fieldName] = this.formFactory.getControl(fieldName);
    }
    this.form = new FormGroup(formInputs);
  }

  //to base class
  private fillFormControls(admin: AdminDto) {
    for (const fieldName of this.fieldNames) {
      const value = admin[fieldName];
      const control = this.form.controls[fieldName];
      control.setValue(value);
    }
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
        super.showServerErrors(error, this.form, this.badInputService);
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
