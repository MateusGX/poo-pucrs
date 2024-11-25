import { Objeto } from "../../lib/objeto.js";
import { Martelo } from "../ferramentas/Martelo.js";
import { Engine } from "../../lib/engine.js";
import { validate } from "bycontract";


export class Gaiola extends Objeto {
  constructor() {
    super("gaiola", "Há um passarinho preso.", "O passarinho voou para longe.", false);
  }

  usar(ferramenta, engine) {
    validate(ferramenta, "String");
    validate(engine, Engine);
    let f = engine.mochila.pega(ferramenta, [Martelo]);
    if (!f)
      return false;
    if (f instanceof Martelo && !this.acaoOk) {
      this.acaoOk = true;
      return true;
    }
    return false;
  }

  inspecionar() {
    return false;
  }
}
