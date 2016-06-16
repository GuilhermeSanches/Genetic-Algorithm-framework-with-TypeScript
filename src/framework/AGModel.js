"use strict";
var AGModel = (function () {
    function AGModel() {
        this.populationSize = 25;
        this.generationQuantity = 10;
        this.crossPointQuantity = 1;
        this.crossType = AGModel.CrossType.Binary;
        this.mutationType = AGModel.MutationType.Binary;
        this.foreignRate = 10;
        this.mutationRate = 3;
    }
    AGModel.prototype.getPopulationSize = function () {
        return this.populationSize;
    };
    AGModel.prototype.setPopulationSize = function (populationSize) {
        this.populationSize = populationSize;
    };
    AGModel.prototype.getGenerationQuantity = function () {
        return this.generationQuantity;
    };
    AGModel.prototype.setGenerationQuantity = function (generationQuantity) {
        this.generationQuantity = generationQuantity;
    };
    AGModel.prototype.getCrossPointQuantity = function () {
        return this.crossPointQuantity;
    };
    AGModel.prototype.setCrossPointQuantity = function (crossPointQuantity) {
        this.crossPointQuantity = crossPointQuantity;
    };
    AGModel.prototype.getCrossType = function () {
        return this.crossType;
    };
    AGModel.prototype.setCrossType = function (crossType, CrossType) {
        this.crossType = crossType;
    };
    AGModel.prototype.getForeignRate = function () {
        return this.foreignRate;
    };
    AGModel.prototype.setForeignRate = function (foreignRate) {
        this.foreignRate = foreignRate;
    };
    AGModel.prototype.getMutationRate = function () {
        return this.mutationRate;
    };
    AGModel.prototype.setMutationRate = function (mutationRate) {
        this.mutationRate = mutationRate;
    };
    AGModel.prototype.getMutationType = function () {
        return this.mutationType;
    };
    AGModel.prototype.setMutationType = function (mutationType, MutationType) {
        this.mutationType = mutationType;
    };
    AGModel.CrossType = { Permutation: 'Permutation', Binary: 'Binary' };
    AGModel.MutationType = { Permutation: 'Permutation', Binary: 'Binary' };
    return AGModel;
}());
exports.AGModel = AGModel;
