import { Sala } from "../../lib/sala.js";
import { Engine } from "../../lib/engine.js";
import { validate } from "bycontract";

export class PavimentoInferior extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("pavimento_inferior", engine, true);
  }

  usa(ferramenta, objeto) {
    validate(objeto, "String");
    validate(ferramenta, "String");
    if (!this.engine.mochila.existe(ferramenta))
      return false;
    if (this.portas.has(objeto) && this.portas.get(objeto).usaNaPorta(ferramenta))
      return true;
    return false;
  }
}
