System.register(["@angular/core","@angular/router","./item.service"],function(exports_1,context_1){"use strict";var core_1,router_1,item_service_1,ItemDetailViewComponent,__decorate=this&&this.__decorate||function(decorators,target,key,desc){var d,c=arguments.length,r=c<3?target:null===desc?desc=Object.getOwnPropertyDescriptor(target,key):desc;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)(d=decorators[i])&&(r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r);return c>3&&r&&Object.defineProperty(target,key,r),r},__metadata=this&&this.__metadata||function(k,v){if("object"==typeof Reflect&&"function"==typeof Reflect.metadata)return Reflect.metadata(k,v)};context_1&&context_1.id;return{setters:[function(core_1_1){core_1=core_1_1},function(router_1_1){router_1=router_1_1},function(item_service_1_1){item_service_1=item_service_1_1}],execute:function(){ItemDetailViewComponent=function(){function ItemDetailViewComponent(itemService,router,activatedRoute){this.itemService=itemService,this.router=router,this.activatedRoute=activatedRoute}return ItemDetailViewComponent.prototype.ngOnInit=function(){var _this=this,id=+this.activatedRoute.snapshot.params.id;id?this.itemService.get(id).subscribe(function(item){return _this.item=item}):0===id?(console.log("id is 0: switching to edit mode..."),this.router.navigate(["item/edit",0])):(console.log("Invalid id: routing back to home..."),this.router.navigate([""]))},ItemDetailViewComponent.prototype.onItemDetailEdit=function(item){this.router.navigate(["item/edit",item.Id])},ItemDetailViewComponent}(),ItemDetailViewComponent=__decorate([core_1.Component({selector:"item-detail-view",template:'\n        <div *ngIf="item" class="item-container">\n            <div class="item-tab-menu">\n                <span (click)="onItemDetailEdit(item)">Edit</span>\n                <span class="selected">View</span>\n            </div>\n            <div class="item-details">\n                <div class="mode">Display Mode</div>\n                <h2>{{item.Title}}</h2>\n                <p>{{item.Description}}</p>\n            </div>\n        </div>     \n   ',styles:["\n        .item-container {\n            width: 600px;\n        }\n        .item-tab-menu {\n            margin-right: 30px;\n        }\n        .item-tab-menu span {\n            background-color: #dddddd;\n            border: 1px solid #666666;\n            border-bottom: 0;\n            cursor: pointer;\n            float: right;\n            margin: 0 0 -1px 5px;\n            padding: 5px 10px 4px 10px;\n            text-align: center;\n            width: 60px;\n        }\n        .item-tab-menu span.selected {\n            background-color: #eeeeee;\n            cursor: auto;\n            font-weight: bold;\n            padding-bottom: 5px;\n        }\n        .item-details {\n            background-color: #eeeeee;\n            border: 1px solid black;\n            clear: both;\n            margin: 0;\n            padding: 5px 10px;\n        }\n        .item-details * {\n            vertical-align: middle;\n        }\n        .item-details .mode {\n            font-size: 0.8em;\n            color: #777777;\n        }\n        .item-details ul li {\n            padding: 5px 0;\n        }\n    "]}),__metadata("design:paramtypes",[item_service_1.ItemService,router_1.Router,router_1.ActivatedRoute])],ItemDetailViewComponent),exports_1("ItemDetailViewComponent",ItemDetailViewComponent)}}});
//# sourceMappingURL=item-detail-view.component.js.map