import { validate } from "bycontract";
import { Martelo } from "../ferramentas/Martelo.js";
import { Sala } from "../../lib/sala.js";
import { VenenoParaRatos } from "../ferramentas/VenenoParaRatos.js";
import { Gaiola } from "../objetos/Gaiola.js";
import { Engine } from "../../lib/engine.js";

export class Cozinha extends Sala {
  constructor(engine) {
    validate(engine, Engine);
    super("cozinha", engine, true);
    let gaiola = new Gaiola();
    this.objetos.set(gaiola.nome, gaiola);

    let veneno = new VenenoParaRatos();
    this.ferramentas.set(veneno.nome, veneno);
    let martelo = new Martelo();
    this.ferramentas.set(martelo.nome, martelo);
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
