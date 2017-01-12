System.register(["@angular/core", "@angular/router", "./item.service"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, router_1, item_service_1, ItemListComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (item_service_1_1) {
                item_service_1 = item_service_1_1;
            }
        ],
        execute: function () {
            ItemListComponent = (function () {
                function ItemListComponent(itemService, router) {
                    this.itemService = itemService;
                    this.router = router;
                }
                ItemListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    console.log("ItemListComponent instantiated with the following type: " + this.class);
                    var s = null;
                    switch (this.class) {
                        case "most-viewed":
                            this.title = "Most Viewed Items";
                            s = this.itemService.getMostViewed();
                            break;
                        case "random":
                            this.title = "Random Items";
                            s = this.itemService.getRandom();
                            break;
                        case "latest":
                        default:
                            this.title = "Latest Items";
                            s = this.itemService.getLatest();
                            break;
                    }
                    s.subscribe(function (items) { return _this.items = items; }, function (error) { return _this.errorMessage = error; });
                };
                ItemListComponent.prototype.onSelect = function (item) {
                    this.selectedItem = item;
                    console.log("Item " + this.selectedItem.Id + " has been clicked: loading ItemDetailComponent...");
                    this.router.navigate(["item", this.selectedItem.Id]);
                };
                return ItemListComponent;
            }());
            __decorate([
                core_1.Input(),
                __metadata("design:type", String)
            ], ItemListComponent.prototype, "class", void 0);
            ItemListComponent = __decorate([
                core_1.Component({
                    selector: "item-list",
                    template: "<h2>{{title}}</h2>\n        <ul class=\"items\">\n           <li *ngFor=\"let item of items\"\n                [class.selected]=\"item === selectedItem\"\n                (click)=\"onSelect(item)\">\n                    <span>{{item.Title}}</span>\n           </li>\n        </ul>\n    ",
                    styles: ["\n        ul.items li {\n            cursor: pointer;\n        }\n        ul.items li.selected {\n            background-color: #dddddd;\n        }\n    "]
                }),
                __metadata("design:paramtypes", [item_service_1.ItemService, router_1.Router])
            ], ItemListComponent);
            exports_1("ItemListComponent", ItemListComponent);
        }
    };
});
