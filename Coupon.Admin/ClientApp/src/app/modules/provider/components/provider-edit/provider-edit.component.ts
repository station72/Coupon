import { Component, OnInit } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-provider-edit',
  templateUrl: './provider-edit.component.html',
  styleUrls: ['./provider-edit.component.css']
})
export class ProviderEditComponent implements OnInit {
  public provider: ProviderDto;

  constructor(private route: ActivatedRoute) {
    route.data.subscribe(data => {
      this.provider = data['provider'];
    })
   }

  ngOnInit() {
  }
  
}
