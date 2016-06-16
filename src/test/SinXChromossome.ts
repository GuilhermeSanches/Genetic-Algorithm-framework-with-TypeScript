import {AGModel} from '../framework/AGModel';
import {Individual} from '../framework/Individual';
import {Chromossome} from '../framework/Chromossome';

export class SinXChromossome extends Chromossome {

	private  bit : number = 0;

	 constructor(bit : number) {
		super();        
		this.bit = bit;
	}

	public  getBit() : number{
		return this.bit;
	}

	public  setBit(bit : number) : void{
		this.bit = bit;
	}


	public  equals(obj : any) : boolean{
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		let other : SinXChromossome =  obj;
		if (this.bit != other.bit)
			return false;
		return true;
	}


	public  toString() : String{
		return this.bit+"";
	}


	public  doMutation() : void{
		if(this.bit == 0) {
			this.bit = 1;
		} else {
			this.bit = 0;
		}
		
	}
}