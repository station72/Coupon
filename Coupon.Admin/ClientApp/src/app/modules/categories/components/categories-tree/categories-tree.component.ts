import { Component, OnInit } from '@angular/core';
import { ITreeOptions } from 'angular-tree-component';
import { CategoryDto } from 'src/app/modules/categories/dto/category.dto';
import { CategoriesService } from 'src/app/modules/categories/services/categories.service';

@Component({
  selector: 'app-categories-tree',
  templateUrl: './categories-tree.component.html',
  styleUrls: ['./categories-tree.component.css']
})
export class CategoriesTreeComponent implements OnInit {

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
  }

  // nodes = [
  //   {
  //     id: 1,
  //     name: 'root1',
  //     children: [
  //       { id: 2, name: 'child1' },
  //       { id: 3, name: 'child2' }
  //     ]
  //   },
  //   {
  //     id: 4,
  //     name: 'root2',
  //     children: [
  //       { id: 5, name: 'child2.1' },
  //       {
  //         id: 6,
  //         name: 'child2.2',
  //         children: [
  //           { id: 7, name: 'subsub' }
  //         ]
  //       }
  //     ]
  //   }
  // ];
  public options : ITreeOptions = {
    idField: 'id',
    getChildren: this.getChildren,
    childrenField: 'children'
  };

  nodes : CategoryDto[] = [
    {
      id: 1,
      title: 'root',
      children:[
        {
          id: 12,
          title: 'in root',
          parentId: null,
          children: []
        },
        {
          id: 12,
          title: 'in root too',
          parentId: null,
          children: []
        }
      ],
      parentId: null
    },
    {
      id: 2,
      title: 'second root',
      children: []
    }
  ]

  getChildren(parentNode: CategoryDto):Promise<CategoryDto[]>{
    return this.categoriesService.getList(parentNode.id)
      .toPromise();
  }

}
