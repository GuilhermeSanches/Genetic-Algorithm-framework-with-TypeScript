 import {AGModel} from '../framework/AGModel';
  import {AGFramework} from '../framework/AGFramework';
import {Individual} from '../framework/Individual';
import {Chromossome} from '../framework/Chromossome';
import {SinXChromossome} from './SinXChromossome';

 export class SinXIndividual extends Individual  {

	private  x : number = 0;
	
	private    BITS : number = 20; 
	private    MIN : number = 0; 
	private    MAX : number = 2*parseFloat(Math.PI+""); 

	 constructor() {
         super();
		this.chromossomes = 
				new Array<Chromossome>();

		for(let i = 0; i < this.BITS; i++) {
            let chro : SinXChromossome  =  new SinXChromossome(parseInt(Math.round(Math.random())+"")) ;
			this.chromossomes.push(chro);
		}
	}
	


	public  calculateValue() : number{
		this.value = 0;
		
		let strBuilder : String = new String();
			var chr : any;
		for(let i = 0; i < this.BITS; i++) {
		chr = this.chromossomes[i];
			strBuilder+=(chr.getBit().toString());
          
		}
	
		let xBits : number = parseInt(strBuilder.toString(), 2);
  		
		this.x  = ((xBits * (this.MAX - this.MIN)) / 
				(Math.pow(2, this.BITS) - 1) + this.MIN);

		this.value = Math.sin(this.x);
		
		return this.value;
	}


	public  toString() : String {
		return super.toString() + " x: " + this.x;
	}
}