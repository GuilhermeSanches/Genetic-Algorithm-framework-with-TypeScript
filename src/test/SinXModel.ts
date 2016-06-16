import {AGModel} from '../framework/AGModel';
import {Individual} from '../framework/Individual';
import {SinXIndividual} from './SinXIndividual';


export class SinXModel extends AGModel{

    
	public  createIndividual() : Individual {
		return new SinXIndividual();
	}


}