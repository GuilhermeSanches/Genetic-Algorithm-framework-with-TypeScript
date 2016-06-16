import {AGModel} from './AGModel';
import {Individual} from './Individual';
import {Chromossome} from './Chromossome';

export  class AGFramework {

    private model: AGModel;
    private population: Array<Individual>;
    private nextGeneration: Array<Individual>;
    private foreignQuantity: number;

    private maxValue: number = 0;

     constructor(model: AGModel) {
        this.model = model;
    }


     
    public execute(): void {

        this.population = new Array<Individual>();

        // Criando a população inicial
        for (let i = 0; i < this.model.getPopulationSize(); i++) {
            let individual: Individual = this.model.createIndividual();
            individual.calculateValue();

            this.population.push(individual);
        }

	  function compareTo( obj : any, obj2 : any) : number {
		if(obj2.getValue() == obj.getValue()) {
			return 0;
		} else if(obj2.getValue() < obj.getValue()){
			return -1;
		} else {
			return 1;
		}
	}
        for (let generation = 0; generation < this.model.getGenerationQuantity(); generation++) {

            // Classificação
            
            this.population.sort(compareTo);
            console.log("Geração: " + (generation + 1) + " // " + this.population[0]);

            // Elitísmo
            this.nextGeneration = new Array<Individual>();

            if ((this.model.getPopulationSize() % 2) == 0) {
                this.nextGeneration.push(this.population[0]);
                this.nextGeneration.push(this.population[1]);
            } else {
                this.nextGeneration.push(this.population[0]);
            }

            // Individuos Estrangeiros
            this.foreignQuantity = Math.round(this.model.getPopulationSize()
                * this.model.getForeignRate() / 100.0);

            if (this.foreignQuantity % 2 != 0) {
                this.foreignQuantity++;
            }

            for (let i = 0; i < this.foreignQuantity; i++) {
                let individual: Individual = this.model.createIndividual();
                individual.calculateValue();

                this.nextGeneration.push(individual);
            }

            // Cruzamento e Mutação
            while (this.nextGeneration.length < this.model.getPopulationSize()) {
                // Seleção
                let individual1: Individual = this.doSelection();
                let individual2: Individual = this.doSelection();

                // Cruzamento
                this.doCrossing(individual1, individual2);

                this.doMutation();

            }

            this.population = this.nextGeneration;
        }


        console.log(this.population[0]);


    }

    private doMutation(): void {

        var that = this;
        let individual1: Individual = that.nextGeneration[that.nextGeneration.length - 1];
        let individual2: Individual = that.nextGeneration[that.nextGeneration.length - 2];

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
    }


    private doPermutationMutation(individual: Individual): void {

        let rate = this.model.getMutationRate() / 100.0;

        if (Math.random() < rate) {
            let indexC1: number = parseInt(individual.getCrhomossomeQuantity() * Math.random() + "");
            let indexC2: number = parseInt(individual.getCrhomossomeQuantity() * Math.random() + "");

            let c1: Chromossome = individual.get(indexC1);
            let c2: Chromossome = individual.get(indexC2);

            individual.set(indexC1, c2);
            individual.set(indexC2, c1);

            individual.calculateValue();
        }

    }

    private doBinaryMutation(individual: Individual): void {

        let rate = this.model.getMutationRate() / 100.00;

        if (Math.random() < rate) {
            let indexC1: number = parseInt(individual.getCrhomossomeQuantity() * Math.random() + "");

            let c1: Chromossome = individual.get(indexC1);
            c1.doMutation();

            individual.calculateValue();
        }

    }

    private doCrossing(individual1: Individual, individual2: Individual): void {

        let crossPoint: number = parseInt(Math.random() * (individual1.getCrhomossomeQuantity() - 1) + "") + 1;

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
    }

    private doPermutationCrossing(first: Individual, second: Individual, crossPoint: number): Individual {
        let chromossomes: Array<Chromossome> = new Array<Chromossome>();

        function contains(a, obj) {
            var i = a.length;
            while (i--) {
                if (a[i] === obj) {
       
                    return true;
                }
               
            }
            return false;
        }

        for (let i = 0; i < crossPoint; i++) {
            chromossomes.push(first.get(i));
        }

        for (let i = 0; i < first.size(); i++) {
            if (!contains(chromossomes, second.get(i))) {
                chromossomes.push(second.get(i));
            }
        }

        let individual: Individual = this.model.createIndividual();
        individual.addAll(chromossomes);
        individual.calculateValue();

        return individual;
    }

    private doBinaryCrossing(first: Individual, second: Individual, crossPoint: number): Individual {

        let chromossomes: Array<Chromossome> = new Array<Chromossome>();

        for (let i = 0; i < crossPoint; i++) {
            chromossomes.push(first.get(i));
        }

        for (let i = crossPoint; i < first.size(); i++) {
            chromossomes.push(second.get(i));
        }

        let individual: Individual = this.model.createIndividual();
        individual.addAll(chromossomes);
        individual.calculateValue();

        return individual;
    }

    public doSelection(): Individual {

        if (this.maxValue == 0) {
            for (let i = 1; i <= this.model.getPopulationSize(); i++) {
                this.maxValue += i;
            }
        }

        //		int selection = (int) ((Math.random() * maxValue) + 1);


        let selection: number = Math.random() + 1;

        for (let i = 0; i < this.population.length; i++) {
            let index = this.population.length - i;

            if (selection > index) {
                selection -= index;
                continue;
            } else {
                return this.population[i];
            }
        }

        return null;
    }
}

