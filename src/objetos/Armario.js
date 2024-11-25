import { Objeto } from "../../lib/objeto.js";
import { Engine } from "../../lib/engine.js";
import { validate } from "bycontract";


export class Armario extends Objeto {
  constructor() {
    super("armario", "", 'Há um bilhete, nele está escrito "A hora é crucial"', true);
  }

  usar(ferramenta, engine) {
    validate(ferramenta, "String");
    validate(engine, Engine);
    return false;
  }

  inspecionar() {
    if (this.inspecionavel && !this.acaoOk) {
      this.acaoOk = true;
      return true;
    }
    return false;
  }
}
