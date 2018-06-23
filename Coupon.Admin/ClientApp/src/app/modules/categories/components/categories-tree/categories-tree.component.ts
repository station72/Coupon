import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { IActionMapping, ITreeOptions, KEYS, TreeComponent, TreeModel, TreeNode, TREE_ACTIONS } from "angular-tree-component";
import * as _ from "lodash";
import { ContextMenuComponent, ContextMenuService } from "ngx-contextmenu";
import { Subscription } from "rxjs";
import { CategoryDto } from "src/app/modules/categories/dto/category.dto";
import { CategoriesService } from "src/app/modules/categories/services/categories.service";
import { CategoriesTreeService } from "../../services/categories-tree.service";
import { HttpErrorResponse } from "@angular/common/http";
import { BadInputErrorsService } from "../../../../shared/services/bad-input-errors.service";
import { BadInputErrorsNoServiceComponent } from "src/app/modules/shared/components/bad-input-errors/bad-input-errors-no-service.component";
import { ModalConfirmComponent } from "../../../shared/components/modal-confirm/modal-confirm.component";

const actionMapping: IActionMapping = {
  keys: {
    [KEYS.ENTER]: (tree, node, $event) => alert(`This is ${node.data.name}`)
  }
};

@Component({
  selector: "app-categories-tree",
  templateUrl: "./categories-tree.component.html",
  styleUrls: ["./categories-tree.component.css"]
})
export class CategoriesTreeComponent implements OnInit, OnDestroy {
  nodes: CategoryDto[];
  customTemplateStringOptions: ITreeOptions;
  private subscribes: Subscription[] = [];

  @ViewChild(TreeComponent) private tree: TreeComponent;

  @ViewChild("nodeMenu") nodeMenu: ContextMenuComponent;

  @ViewChild(BadInputErrorsNoServiceComponent) badInputComponent: BadInputErrorsNoServiceComponent;

  constructor(
    private categoriesService: CategoriesService,
    private treeService: CategoriesTreeService,
    private contextService: ContextMenuService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.createSettings();
  }

  createSettings() {
    this.createActionMapping();
    this.createOptions();
  }

  private nodeUnderMenu: TreeNode;
  createActionMapping() {
    actionMapping.mouse = {
      contextMenu: this.contextMenu.bind(this),
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
  }

  contextMenu(tree, node, $event) {
    this.nodeUnderMenu = node;
    this.contextService.show.next({
      contextMenu: this.nodeMenu,
      event: $event,
      item: null
    });
    $event.preventDefault();
    $event.stopPropagation();
  }

  createOptions() {
    this.customTemplateStringOptions = {
      // childrenField: 'children', //если приходит пустой массив, то думает что это дети
      hasChildrenField: "isParent",
      displayField: "title",
      isExpandedField: "expanded",
      idField: "id",
      getChildren: this.getChildren.bind(this),
      actionMapping,
      nodeHeight: 23,
      allowDrag: node => {
        return true;
      },
      allowDrop: (
        node: TreeNode,
        to: { parent: TreeNode; index: number },
        $event?: any
      ) => {
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

    this.subscribe();
  }

  subscribe() {
    const addSub = this.treeService.$addCategory.subscribe(category => {
      this.nodes.push(category);
      this.tree.treeModel.update();
    });
    this.subscribes.push(addSub);

    const updateSub = this.treeService.$updateCategory.subscribe(category => {
      const node = this.tree.treeModel.getNodeById(category.id) as TreeNode;
      //Does not work if node.data = category
      node.data.title = category.title;
      node.data.friendlyUrl = category.friendlyUrl;
      this.tree.treeModel.update();
    });
    this.subscribes.push(updateSub);
  }

  unSubscribe() {
    for (const subscribe of this.subscribes) {
      subscribe.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unSubscribe();
  }

  getChildren(node: TreeNode) {
    return this.categoriesService.getList(node.id).toPromise();
  }

  drop(tree: TreeModel, node: TreeNode, $event: any, payload: { from; to }) {
    const nodeToDrop = payload.from as TreeNode;
    const to = payload.to.parent as TreeNode;
    this.categoriesService
      .moveTo(nodeToDrop.id, payload.to.dropOnNode ? to.id : "")
      .subscribe(res => {
        TREE_ACTIONS.MOVE_NODE(tree, node, $event, {
          from: payload.from,
          to: payload.to
        });
      });
  }

  public menuActions: any[] = [
    {
      enabled: true,
      execute: (): void => this.openUpdateComponent(),
      html: (): string => "Редактировать",
      visible: true
    },
    {
      enabled: true,
      execute: (): void => this.deleteNode(),
      html: (): string => "Удалить",
      visible: true
    }
  ];

  onConfirmedDelete(){
    this.categoriesService.delete(this.nodeUnderMenu.id).subscribe(
      res => {
        const node = this.nodeUnderMenu;
        let parentNode = node.realParent ? node.realParent : node.treeModel.virtualRoot;

        _.remove(parentNode.data.children, function(child) {
          return child === node.data;
        });

        this.tree.treeModel.update();

        if (node.parent.data.children.length === 0) {
          node.parent.data.hasChildren = false;
        }
      },
      error => this.showServerErrors(error)
    );
  }

  @ViewChild(ModalConfirmComponent) modalConfirm: ModalConfirmComponent;

  deleteNode() {
    this.modalConfirm.showModal();
  }

  onEvent(e) {}

  openUpdateComponent() {
    const category = this.nodeUnderMenu.data as CategoryDto;
    this.router.navigate([{ outlets: { cat: ["update", category.id] } }], {
      relativeTo: this.activatedRoute.parent
    });
  }

  protected showServerErrors(
    serverError
  ) {
    let httpError = serverError as HttpErrorResponse;
    if (httpError.status === 400) {
      this.badInputComponent.showHttpError(httpError);
      return;
    }
    console.error(httpError);
  }
}
