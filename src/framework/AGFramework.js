"use strict";
var AGFramework = (function () {
    function AGFramework(model) {
        this.maxValue = 0;
        this.model = model;
    }
    AGFramework.prototype.execute = function () {
        this.population = new Array();
        // Criando a população inicial
        for (var i = 0; i < this.model.getPopulationSize(); i++) {
            var individual = this.model.createIndividual();
            individual.calculateValue();
            this.population.push(individual);
        }
        function compareTo(obj, obj2) {
            if (obj2.getValue() == obj.getValue()) {
                return 0;
            }
            else if (obj2.getValue() < obj.getValue()) {
                return -1;
            }
            else {
                return 1;
            }
        }
        for (var generation = 0; generation < this.model.getGenerationQuantity(); generation++) {
            // Classificação
            this.population.sort(compareTo);
            console.log("Geração: " + (generation + 1) + " // " + this.population[0]);
            // Elitísmo
            this.nextGeneration = new Array();
            if ((this.model.getPopulationSize() % 2) == 0) {
                this.nextGeneration.push(this.population[0]);
                this.nextGeneration.push(this.population[1]);
            }
            else {
                this.nextGeneration.push(this.population[0]);
            }
            // Individuos Estrangeiros
            this.foreignQuantity = Math.round(this.model.getPopulationSize()
                * this.model.getForeignRate() / 100.0);
            if (this.foreignQuantity % 2 != 0) {
                this.foreignQuantity++;
            }
            for (var i = 0; i < this.foreignQuantity; i++) {
                var individual = this.model.createIndividual();
                individual.calculateValue();
                this.nextGeneration.push(individual);
            }
            // Cruzamento e Mutação
            while (this.nextGeneration.length < this.model.getPopulationSize()) {
                // Seleção
                var individual1 = this.doSelection();
                var individual2 = this.doSelection();
                // Cruzamento
                this.doCrossing(individual1, individual2);
                this.doMutation();
            }
            this.population = this.nextGeneration;
        }
        console.log(this.population[0]);
    };
    AGFramework.prototype.doMutation = function () {
        var that = this;
        var individual1 = that.nextGeneration[that.nextGeneration.length - 1];
        var individual2 = that.nextGeneration[that.nextGeneration.length - 2];
        switch (that.model.getMutationType()) {
            case 'Binary':
                that.doBinaryMutation(individual1);
                that.doBinaryMutation(individual2);
                break;
            case 'Permutation':
                that.doPermutationMutation(individual1);
                that.doPermutationMutation(individual2);
                break;
        }
    };
    AGFramework.prototype.doPermutationMutation = function (individual) {
        var rate = this.model.getMutationRate() / 100.0;
        if (Math.random() < rate) {
            var indexC1 = parseInt(individual.getCrhomossomeQuantity() * Math.random() + "");
            var indexC2 = parseInt(individual.getCrhomossomeQuantity() * Math.random() + "");
            var c1 = individual.get(indexC1);
            var c2 = individual.get(indexC2);
            individual.set(indexC1, c2);
            individual.set(indexC2, c1);
            individual.calculateValue();
        }
    };
    AGFramework.prototype.doBinaryMutation = function (individual) {
        var rate = this.model.getMutationRate() / 100.00;
        if (Math.random() < rate) {
            var indexC1 = parseInt(individual.getCrhomossomeQuantity() * Math.random() + "");
            var c1 = individual.get(indexC1);
            c1.doMutation();
            individual.calculateValue();
        }
    };
    AGFramework.prototype.doCrossing = function (individual1, individual2) {
        var crossPoint = parseInt(Math.random() * (individual1.getCrhomossomeQuantity() - 1) + "") + 1;
        switch (this.model.getCrossType()) {
            case 'Binary':
                this.nextGeneration.push(this.doBinaryCrossing(individual1, individual2, crossPoint));
                this.nextGeneration.push(this.doBinaryCrossing(individual2, individual1, crossPoint));
                break;
            case 'Permutation':
                this.nextGeneration.push(this.doPermutationCrossing(individual1, individual2, crossPoint));
                this.nextGeneration.push(this.doPermutationCrossing(individual2, individual1, crossPoint));
                break;
        }
    };
    AGFramework.prototype.doPermutationCrossing = function (first, second, crossPoint) {
        var chromossomes = new Array();
        function contains(a, obj) {
            var i = a.length;
            while (i--) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }
        for (var i = 0; i < crossPoint; i++) {
            chromossomes.push(first.get(i));
        }
        for (var i = 0; i < first.size(); i++) {
            if (!contains(chromossomes, second.get(i))) {
                chromossomes.push(second.get(i));
            }
        }
        var individual = this.model.createIndividual();
        individual.addAll(chromossomes);
        individual.calculateValue();
        return individual;
    };
    AGFramework.prototype.doBinaryCrossing = function (first, second, crossPoint) {
        var chromossomes = new Array();
        for (var i = 0; i < crossPoint; i++) {
            chromossomes.push(first.get(i));
        }
        for (var i = crossPoint; i < first.size(); i++) {
            chromossomes.push(second.get(i));
        }
        var individual = this.model.createIndividual();
        individual.addAll(chromossomes);
        individual.calculateValue();
        return individual;
    };
    AGFramework.prototype.doSelection = function () {
        if (this.maxValue == 0) {
            for (var i = 1; i <= this.model.getPopulationSize(); i++) {
                this.maxValue += i;
            }
        }
        //		int selection = (int) ((Math.random() * maxValue) + 1);
        var selection = Math.random() + 1;
        for (var i = 0; i < this.population.length; i++) {
            var index = this.population.length - i;
            if (selection > index) {
                selection -= index;
                continue;
            }
            else {
                return this.population[i];
            }
        }
        return null;
    };
    return AGFramework;
}());
exports.AGFramework = AGFramework;
