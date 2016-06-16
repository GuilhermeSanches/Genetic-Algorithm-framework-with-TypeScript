import {SinXModel} from './SinXModel';
import {AGFramework} from '../framework/AGFramework';

 class SinXApp {

	 main () : void{
		
		let  model : SinXModel = new SinXModel();
		model.setPopulationSize(25);
		model.setGenerationQuantity(200);
	//	model.setCrossType('Binary');
	//	model.setMutationType('Binary');
		
		let framework : AGFramework = new AGFramework(model);
		
		framework.execute();
	}
}

let App = new SinXApp();
App.main();