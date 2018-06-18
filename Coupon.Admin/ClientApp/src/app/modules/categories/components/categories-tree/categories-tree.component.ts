import { Component, OnInit } from "@angular/core";
import { IActionMapping, ITreeOptions, KEYS, TreeModel, TreeNode, TREE_ACTIONS } from "angular-tree-component";
import { CategoryDto } from "src/app/modules/categories/dto/category.dto";
import { CategoriesService } from "src/app/modules/categories/services/categories.service";

const actionMapping : IActionMapping={
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
}

@Component({
  selector: "app-categories-tree",
  templateUrl: "./categories-tree.component.html",
  styleUrls: ["./categories-tree.component.css"]
})
export class CategoriesTreeComponent implements OnInit {
  nodes: CategoryDto[];
  
  customTemplateStringOptions: ITreeOptions;
  constructor(
    private categoriesService: CategoriesService
  ) {

    actionMapping.mouse = {
      contextMenu: (tree, node, $event) => {
        $event.preventDefault();
        alert(`context menu for ${node.data.name}`);
      },
      dblClick: (tree, node, $event) => {
        if (node.hasChildren) {
          TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
        }
      },
      click: (tree, node, $event) => {
        $event.shiftKey
          ? TREE_ACTIONS.TOGGLE_ACTIVE_MULTI(tree, node, $event)
          : TREE_ACTIONS.TOGGLE_ACTIVE(tree, node, $event);
      },
      drop: this.drop.bind(this)
    };

    this.customTemplateStringOptions = {
      // childrenField: 'children', //если приходит пустой массив, то думает что это дети
      hasChildrenField: 'isParent',
      displayField: 'title',
      isExpandedField: "expanded",
      idField: "id",
      getChildren: this.getChildren.bind(this),
      actionMapping,
      nodeHeight: 23,
      allowDrag: node => {
        // console.log('allowDrag?');
        return true;
      },
      allowDrop: (node: TreeNode, to: { parent: TreeNode; index: number; }, $event?: any) => {
        // if(to.parent.isDescendantOf(node)){
        //   return false;
        // }
  
        return true;
      },
      useVirtualScroll: true,
      animateExpand: true
    };

  }

  ngOnInit() {
    this.categoriesService.getList().subscribe(categories => {
      this.nodes = categories;
    });
  }

  getChildren(node: TreeNode) {
    return this.categoriesService.getList(node.id).toPromise();
  }

  drop(tree:TreeModel, node:TreeNode, $event:any, payload: {from, to}) {   
    const nodeToDrop = payload.from as TreeNode;
    const to = payload.to.parent as TreeNode;
    this.categoriesService.moveTo(nodeToDrop.id, payload.to.dropOnNode ? to.id: "").subscribe(res=>{
      TREE_ACTIONS.MOVE_NODE(tree, node, $event, {from: payload.from, to:payload.to});
     })
  }

  addNode(tree: any) {
    this.nodes[0].children.push({
      title: "a new child",
      id: Math.random(),
      isParent: false
    });
    tree.treeModel.update();
  }

  childrenCount(node: TreeNode): string {
    return node && node.children ? `(${node.children.length})` : "";
  }

  filterNodes(text: string, tree: any) {
    tree.treeModel.filterNodes(text);
  }

  activateSubSub(tree: any) {
    // tree.treeModel.getNodeBy((node) => node.data.name === 'subsub')
    tree.treeModel.getNodeById(1001).setActiveAndVisible();
  }

  onEvent(event: any) {
    // console.log(event);
  }

  onInitialized(tree: any) {
    // tree.treeModel.getNodeById('11').setActiveAndVisible();
  }

  go($event: any) {
    $event.stopPropagation();
    alert("this method is on the app component");
  }

  activeNodes(treeModel: TreeModel) {
    console.log(treeModel.activeNodes);
  }

  onMoveNode($event){
    console.log('onMoveNode');
    console.log($event);
  }
}

// getChildren(parentNode: CategoryDto): Promise<CategoryDto[]> {
//   return this.categoriesService.getList(parentNode.id).toPromise();
// }

// nodes: CategoryDto[] = [
//   {
//     id: 1,
//     title: "root",
//     children: [
//       {
//         id: 12,
//         title: "in root",
//         parentId: null,
//         children: []
//       },
//       {
//         id: 13,
//         title: "in root too",
//         parentId: null,
//         children: []
//       }
//     ],
//     parentId: null
//   },
//   {
//     id: 2,
//     title: "second root",
//     children: []
//   }
// ];
