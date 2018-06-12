import { Component, OnInit } from '@angular/core';
import { AdminsService } from '../../services/admins.service';
import { AdminDto } from '../../dto/admin.dto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ListResult } from '../../../../shared/data/list-result.dto';
import { UserRole } from '../../../../shared/data/user/user-roles';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit {
  public limit: number = 50;
  public admins: AdminDto[] = [];
  public UserRole = UserRole;

  constructor(
    private adminService: AdminsService,
    private router: Router 
  ) { }

  ngOnInit() {
  }

  public fetchListDataCallback(): Function{
    return this.fetchListData.bind(this);
  }

  private fetchListData(offset: number): Observable<ListResult<AdminDto>>{
    return this.adminService.getList({
      limit: this.limit,
      offset: offset
    }).pipe(map(res=> {
      this.admins = res.result;
      return res;
    }));
  }

  onUpdate(id: string){
    this.router.navigate(['admins/update/'+ id]);
  }
}
