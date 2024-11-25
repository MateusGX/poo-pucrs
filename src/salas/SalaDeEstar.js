import { validate } from "bycontract";
import { Sala } from "../../lib/sala.js";
import { Mochila } from "../ferramentas/Mochila.js";
import { Radio } from "../objetos/Radio.js";
import { RelogioGrande } from "../objetos/RelogioGrande.js";
import { Engine } from "../../lib/engine.js";
import { Chave } from "../ferramentas/Chave.js";

export class SalaDeEstar extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("sala_de_estar", engine, true);
    let relogio = new RelogioGrande();
    this.objetos.set(relogio.nome, relogio);
    let radio = new Radio();
    this.objetos.set(radio.nome, radio);

    let mochila = new Mochila();
    this.ferramentas.set(mochila.nome, mochila);
  }

  usa(ferramenta, objeto) {
    validate(objeto, "String");
    validate(ferramenta, "String");
    if (!this.objetos.has(objeto)) {
      console.log("Objeto não encontrado");
      return false;
    }
    if (!this.engine.mochila.existe(ferramenta)) {
      return false;
    }
    let obj = this.objetos.get(objeto);
    return obj.usar(ferramenta, this.engine);
  }
}
