import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BadInputErrorsService } from "../../../../shared/services/bad-input-errors.service";
import { ProviderFormFactoryService } from "../../services/provider-form-factory.service";
import { ProviderService } from "../../services/provider.service";
import { Subject } from "rxjs";
import { BaseFormComponent } from "src/app/shared/components/base-form.component";
import { ModalConfirmComponent } from "../../../shared/components/modal-confirm/modal-confirm.component";

@Component({
  selector: "app-provider-edit",
  templateUrl: "./provider-edit.component.html",
  styleUrls: ["./provider-edit.component.css"]
})
export class ProviderEditComponent extends BaseFormComponent {
  public provider: ProviderDto;
  public loading = false;
  public deleteConfirmTrigger: Subject<any> = new Subject();
  @ViewChild('blockModal') blockModal: ModalConfirmComponent;

  constructor(
    badInputService: BadInputErrorsService,
    formFactory: ProviderFormFactoryService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private providerService: ProviderService,
  ) {
    super(formFactory, badInputService);
    
    this.createForm();
    this.form.get('password').disable();
    actRoute.data.subscribe(data => {
      const provider = data["provider"]; 
      this.provider = provider;
      this.fillFormControls(provider);
    });
  }

  getControlNames(): string[] {
    return ["title", "email", "password"];
  }

  onDelete(){
    this.deleteConfirmTrigger.next();
  }

  onConfirmDelete(){
    this.providerService.delete(this.provider.id)
      .subscribe(res=>{
        this.router.navigate(['providers']);
      });
  }

  onBlock(){
    this.blockModal.showModal();
  }

  onUnblock(){
    this.providerService.unblock(this.provider.id).subscribe(res=>{
      this.setProviderBlock(false);
    })
  }

  onConfirmBlock(){
    this.providerService.block(this.provider.id).subscribe(res=>{
      this.setProviderBlock(true);
    })
  }

  setProviderBlock(isBlocked: boolean){
    const provider = this.provider;
    provider.isBlocked = isBlocked;
    this.provider = provider;
  }

  updatePasChanged(event: any){
    const disabled = !event.target.checked;
    if(disabled === true){
      this.form.get("password").disable();
    }
    else{
      this.form.get("password").enable();
    }
  }

  onSubmit() {
    this.submitClicked = true;
    
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    let serialized = JSON.stringify(this.form.getRawValue());
    this.providerService.update(this.provider.id, serialized).subscribe(
      res => {
        this.router.navigate(["providers"]);
      },
      error => {
        this.loading = false;
        super.showServerErrors(error);
      }
    );
  }
}
