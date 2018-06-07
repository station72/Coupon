import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { BadInputErrorsService } from 'src/app/shared/services/bad-input-errors.service';

@Component({
  selector: 'bad-input-errors',
  templateUrl: './bad-input-errors.component.html',
  styleUrls: ['./bad-input-errors.component.css']
})
export class BadInputErrorsComponent implements OnInit {

  public errors: string[] = [];
  constructor(private badInputService: BadInputErrorsService) {
   }

  ngOnInit() {
    this.badInputService.badInputErrors$.subscribe(errors=>{
      this.errors = Array.from(errors);
    });
  }

  close(){
    this.errors = [];
  }

}
