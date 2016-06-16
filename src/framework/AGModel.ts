import {Individual} from './Individual';

export  abstract class AGModel {

	public static   CrossType = { Permutation: 'Permutation', Binary: 'Binary' };       
	public static  MutationType = { Permutation: 'Permutation', Binary: 'Binary' };
	
	private  populationSize : number= 25;
	private  generationQuantity : number = 10;
	private  crossPointQuantity : number = 1;
	private  crossType  = AGModel.CrossType.Binary;
	private  mutationType = AGModel.MutationType.Binary;
	
	private  foreignRate : number = 10;
	private  mutationRate : number= 3;

	 abstract  createIndividual() : Individual;

	  getPopulationSize() {
		return this.populationSize;
	}

	  setPopulationSize(populationSize: number) {
		this.populationSize = populationSize;
	}

	  getGenerationQuantity() {
		return this.generationQuantity;
	}

    setGenerationQuantity(generationQuantity: number) {
		this.generationQuantity = generationQuantity;
	}

	  getCrossPointQuantity() {
		return this.crossPointQuantity;
	}

	  setCrossPointQuantity(crossPointQuantity: number) {
		this.crossPointQuantity = crossPointQuantity;
	}

	  getCrossType() {
		return this.crossType;
	}

	  setCrossType(crossType : any, CrossType) {
		this.crossType = crossType;
	}

	  getForeignRate() {
		return this.foreignRate;
	}

	  setForeignRate(foreignRate : number) {
		this.foreignRate = foreignRate;
	}

	  getMutationRate() {
		return this.mutationRate;
	}

	  setMutationRate(mutationRate : number) {
		this.mutationRate = mutationRate;
	}

	  getMutationType() {
		return this.mutationType;
	}

	  setMutationType(mutationType : any, MutationType) {
		this.mutationType = mutationType;
	}

	
}