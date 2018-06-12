import { Component, OnInit } from "@angular/core";
import { BaseComponent } from "../../../../shared/components/base.component";
import { FormGroup } from "@angular/forms";
import { AdminFormFactoryService } from "../../services/admin-form-factory.service";
import { ActivatedRoute, Router } from "@angular/router";
import { AdminDto } from "../../dto/admin.dto";
import { AdminsService } from "../../services/admins.service";
import { BadInputErrorsService } from "../../../../shared/services/bad-input-errors.service";

@Component({
  selector: "app-admins-update",
  templateUrl: "./admins-update.component.html",
  styleUrls: ["./admins-update.component.css"]
})
export class AdminsUpdateComponent extends BaseComponent implements OnInit {
  public form: FormGroup;
  private admin: AdminDto;
  public loading = false;

  private fieldNames: string[] = ["login", "email", "name", "role"];

  constructor(
    private adminService: AdminsService,
    private formFactory: AdminFormFactoryService,
    private route: ActivatedRoute,
    private router: Router,
    private badInputService: BadInputErrorsService
  ) {
    super();
  }

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
}
