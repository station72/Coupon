import { Component, OnInit } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import { ProviderBaseComponent } from '../provider-base/provider-base.component';
import { BadInputErrorsService } from '../../../../shared/services/bad-input-errors.service';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.css']
})
export class ProviderEditComponent extends ProviderBaseComponent implements OnInit {
  public title: FormControl;
  public email: FormControl;
  public form: FormGroup;

  public provider: ProviderDto;
  public loading = false;
  
  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private badInputService: BadInputErrorsService,
    private providerService: ProviderService
  ) {
    super();
    actRoute.data.subscribe(data => {
      this.provider = data['provider'];
    });
   }

  ngOnInit() {
    this.title = super.getFormControl('title'); 
    this.email = super.getFormControl('email');
    this.form = new FormGroup({
      title: this.title,
      email: this.email
    })
  }

  onSubmit(){
    this.submitClicked = true;
    if(this.form.invalid){
      return;
    }

    this.loading = true;
    let serialized = JSON.stringify(this.form.getRawValue());
    this.providerService.update(this.provider.id, serialized)
      .subscribe(
        (res) => this.router.navigate['providers'],
        (error) => {
          this.loading = false;
          super.showServerErrors(error, this.form, this.badInputService);
        }
      )
      
  }
  
}
