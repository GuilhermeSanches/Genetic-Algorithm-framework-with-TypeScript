"use strict";
var Individual = (function () {
    function Individual() {
    }
    Individual.prototype.Individual = function (chromossomes) {
        this.chromossomes = chromossomes;
    };
    Individual.prototype.getValue = function () {
        return this.value;
    };
    Individual.prototype.setValue = function (value) {
        this.value = value;
    };
    Individual.prototype.getCrhomossomeQuantity = function () {
        return this.chromossomes.length;
    };
    Individual.prototype.get = function (index) {
        return this.chromossomes[index];
    };
    Individual.prototype.size = function () {
        return this.chromossomes.length;
    };
    Individual.prototype.addAll = function (c) {
        this.chromossomes = c;
    };
    Individual.prototype.toString = function () {
        return "" + this.chromossomes + " Value: " + this.value;
    };
    Individual.prototype.set = function (index, element) {
        return this.chromossomes.splice(index, 0, element);
    };
    return Individual;
}());
exports.Individual = Individual;
