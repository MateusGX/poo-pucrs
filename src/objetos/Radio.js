import { Objeto } from "../../lib/objeto.js";
import { Engine } from "../../lib/engine.js";
import { validate } from "bycontract";


export class Radio extends Objeto {
  constructor() {
    super("radio", "A sagrada republica vencerá.", "", false);
  }

  usar(ferramenta, engine) {
    validate(ferramenta, "String");
    validate(engine, Engine);
    return false;
  }

  inspecionar() {
    return false;
  }
}
