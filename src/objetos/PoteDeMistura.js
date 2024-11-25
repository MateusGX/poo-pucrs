import { Objeto } from "../../lib/objeto.js";
import { Engine } from "../../lib/engine.js";
import { validate } from "bycontract";
import { AcidoCloridrico } from "../ferramentas/AcidoCloridrico.js";
import { AcidoNitrico } from "../ferramentas/AcidoNitrico.js";
import { Sala } from "../../lib/sala.js";
import { AguaRegia } from "../ferramentas/AguaRegia.js";


export class PoteDeMistura extends Objeto {

  #qtdAcidoCloridrico = 0;
  #qtdAcidoNitrico = 0;
  #aguaRegia = false;
  #sala = null;
  #reagiu = false;

  constructor(sala) {
    super(
      "pote_de_mistura",
      '',
      "",
      true
    );
    validate(sala, Sala);
    this.#sala = sala;
  }

  usar(ferramenta, engine) {
    validate(ferramenta, "String");
    validate(engine, Engine);
    return false;
  }

  verificarMistura(engine) {
    this.descricaoAntesAcao = `${this.#qtdAcidoCloridrico} de ácido clorídrico e ${this.#qtdAcidoNitrico} de ácido nítrico.`;
    if (this.#qtdAcidoCloridrico == 0 || this.#qtdAcidoNitrico == 0) return;
    if (this.#qtdAcidoCloridrico > 3 && this.#qtdAcidoNitrico >= 1) {
      engine.perder("Você foi intoxicado! Você perdeu!");
      return;
    }
    if (this.#qtdAcidoCloridrico >= 3 && this.#qtdAcidoNitrico > 1) {
      engine.perder("Você foi intoxicado! Você perdeu!");
      return;
    }
    if (this.#qtdAcidoCloridrico == 3 && this.#qtdAcidoNitrico == 1) {
      console.log("Reagiu!");
      this.descricaoAntesAcao = "Uma mistura estranha se formou!";
      this.#reagiu = true;
      this.#aguaRegia = true;
    }
  }

  usarFracao(ferramenta, engine, quantidade) {
    validate(ferramenta, "String");
    validate(quantidade, "Number");
    validate(engine, Engine);

    if (this.#reagiu) return false;

    let f = engine.mochila.pega(ferramenta, [AcidoCloridrico, AcidoNitrico], quantidade);
    if (!f)
      return false;

    if (f instanceof AcidoCloridrico) {
      this.#qtdAcidoCloridrico += quantidade;
      this.verificarMistura(engine);
      return true;
    }

    if (f instanceof AcidoNitrico) {
      this.#qtdAcidoNitrico += quantidade;
      this.verificarMistura(engine);
      return true;
    }

    return false;
  }

  inspecionar() {
    if (!this.#aguaRegia) return false;
    console.log("Você encontrou água régia!");
    this.#sala.objetos.delete(this.nome);
    let aguaRegia = new AguaRegia();
    this.#sala.ferramentas.set(aguaRegia.nome, aguaRegia);
    return true;
  }
}
