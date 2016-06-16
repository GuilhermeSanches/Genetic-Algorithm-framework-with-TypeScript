import {Comparable} from './lib/Comparable';
import {Chromossome} from './Chromossome';

export abstract class Individual implements Comparable {
    
 

	protected chromossomes: Array<Chromossome> ;
	protected  value : number;
	
	public abstract  calculateValue() : number;
	
	constructor(){

	}
	
	public Individual(chromossomes : Array<Chromossome>) {
		this.chromossomes = chromossomes;
	}
	
	public  getValue() : number {
		return this.value;
	}

	public  setValue(value : number) : void{
		this.value = value;
	}

	public  getCrhomossomeQuantity() : number{
		return this.chromossomes.length;
	}
	
	public  get( index : number) : Chromossome{
		return this.chromossomes[index];
	}

	public  size() : number{
		return this.chromossomes.length;
	}

	public  addAll(c : Array<Chromossome>) : void{		
		 this.chromossomes = c;
	}


	public  toString() : String{
		return "" + this.chromossomes + " Value: " + this.value;
	}

	public  set(index : number,  element : Chromossome) : any{
		return this.chromossomes.splice(index, 0, element);
	}
}