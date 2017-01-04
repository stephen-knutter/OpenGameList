/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ReflectiveInjector } from '@angular/core';
import { NG1_SCOPE } from './constants';
const INITIAL_VALUE = {
    __UNINITIALIZED__: true
};
export class DowngradeNg2ComponentAdapter {
    constructor(id, info, element, attrs, scope, parentInjector, parse, componentFactory) {
        this.id = id;
        this.info = info;
        this.element = element;
        this.attrs = attrs;
        this.scope = scope;
        this.parentInjector = parentInjector;
        this.parse = parse;
        this.componentFactory = componentFactory;
        this.component = null;
        this.inputChangeCount = 0;
        this.inputChanges = null;
        this.componentRef = null;
        this.changeDetector = null;
        this.contentInsertionPoint = null;
        this.element[0].id = id;
        this.componentScope = scope.$new();
        this.childNodes = element.contents();
    }
    bootstrapNg2() {
        var childInjector = ReflectiveInjector.resolveAndCreate([{ provide: NG1_SCOPE, useValue: this.componentScope }], this.parentInjector);
        this.contentInsertionPoint = document.createComment('ng1 insertion point');
        this.componentRef = this.componentFactory.create(childInjector, [[this.contentInsertionPoint]], this.element[0]);
        this.changeDetector = this.componentRef.changeDetectorRef;
        this.component = this.componentRef.instance;
    }
    setupInputs() {
        var attrs = this.attrs;
        var inputs = this.info.inputs;
        for (var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            var expr = null;
            if (attrs.hasOwnProperty(input.attr)) {
                var observeFn = ((prop /** TODO #9100 */) => {
                    var prevValue = INITIAL_VALUE;
                    return (value /** TODO #9100 */) => {
                        if (this.inputChanges !== null) {
                            this.inputChangeCount++;
                            this.inputChanges[prop] =
                                new Ng1Change(value, prevValue === INITIAL_VALUE ? value : prevValue);
                            prevValue = value;
                        }
                        this.component[prop] = value;
                    };
                })(input.prop);
                attrs.$observe(input.attr, observeFn);
            }
            else if (attrs.hasOwnProperty(input.bindAttr)) {
                expr = attrs[input.bindAttr];
            }
            else if (attrs.hasOwnProperty(input.bracketAttr)) {
                expr = attrs[input.bracketAttr];
            }
            else if (attrs.hasOwnProperty(input.bindonAttr)) {
                expr = attrs[input.bindonAttr];
            }
            else if (attrs.hasOwnProperty(input.bracketParenAttr)) {
                expr = attrs[input.bracketParenAttr];
            }
            if (expr != null) {
                var watchFn = ((prop /** TODO #9100 */) => (value /** TODO #9100 */, prevValue /** TODO #9100 */) => {
                    if (this.inputChanges != null) {
                        this.inputChangeCount++;
                        this.inputChanges[prop] = new Ng1Change(prevValue, value);
                    }
                    this.component[prop] = value;
                })(input.prop);
                this.componentScope.$watch(expr, watchFn);
            }
        }
        var prototype = this.info.type.prototype;
        if (prototype && prototype.ngOnChanges) {
            // Detect: OnChanges interface
            this.inputChanges = {};
            this.componentScope.$watch(() => this.inputChangeCount, () => {
                var inputChanges = this.inputChanges;
                this.inputChanges = {};
                this.component.ngOnChanges(inputChanges);
            });
        }
        this.componentScope.$watch(() => this.changeDetector && this.changeDetector.detectChanges());
    }
    projectContent() {
        var childNodes = this.childNodes;
        var parent = this.contentInsertionPoint.parentNode;
        if (parent) {
            for (var i = 0, ii = childNodes.length; i < ii; i++) {
                parent.insertBefore(childNodes[i], this.contentInsertionPoint);
            }
        }
    }
    setupOutputs() {
        var attrs = this.attrs;
        var outputs = this.info.outputs;
        for (var j = 0; j < outputs.length; j++) {
            var output = outputs[j];
            var expr = null;
            var assignExpr = false;
            var bindonAttr = output.bindonAttr ? output.bindonAttr.substring(0, output.bindonAttr.length - 6) : null;
            var bracketParenAttr = output.bracketParenAttr ?
                `[(${output.bracketParenAttr.substring(2, output.bracketParenAttr.length - 8)})]` :
                null;
            if (attrs.hasOwnProperty(output.onAttr)) {
                expr = attrs[output.onAttr];
            }
            else if (attrs.hasOwnProperty(output.parenAttr)) {
                expr = attrs[output.parenAttr];
            }
            else if (attrs.hasOwnProperty(bindonAttr)) {
                expr = attrs[bindonAttr];
                assignExpr = true;
            }
            else if (attrs.hasOwnProperty(bracketParenAttr)) {
                expr = attrs[bracketParenAttr];
                assignExpr = true;
            }
            if (expr != null && assignExpr != null) {
                var getter = this.parse(expr);
                var setter = getter.assign;
                if (assignExpr && !setter) {
                    throw new Error(`Expression '${expr}' is not assignable!`);
                }
                var emitter = this.component[output.prop];
                if (emitter) {
                    emitter.subscribe({
                        next: assignExpr ?
                            ((setter) => (v /** TODO #9100 */) => setter(this.scope, v))(setter) :
                            ((getter) => (v /** TODO #9100 */) => getter(this.scope, { $event: v }))(getter)
                    });
                }
                else {
                    throw new Error(`Missing emitter '${output.prop}' on component '${this.info.selector}'!`);
                }
            }
        }
    }
    registerCleanup() {
        this.element.bind('$destroy', () => {
            this.componentScope.$destroy();
            this.componentRef.destroy();
        });
    }
}
class Ng1Change {
    constructor(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    isFirstChange() { return this.previousValue === this.currentValue; }
}
//# sourceMappingURL=downgrade_ng2_adapter.js.map