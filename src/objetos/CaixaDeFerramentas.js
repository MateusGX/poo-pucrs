import { Objeto } from "../../lib/objeto.js";
import { ChavePequena } from "../ferramentas/ChavePequena.js";
import { Engine } from "../../lib/engine.js";
import { validate } from "bycontract";
import { Martelo } from "../ferramentas/Martelo.js";


export class CaixaDeFerramentas extends Objeto {
  constructor() {
    super(
      "caixa_de_ferramentas",
      "Esta caixa de ferramentas está trancada.",
      "Há um bilhete dentro da caixa de ferramentas, nele está escrito: 'Descobri! É 3:1'",
      false
    );
  }

  usar(ferramenta, engine) {
    validate(ferramenta, "String");
    validate(engine, Engine);
    if (this.acaoOk) return false;
    let f = engine.mochila.pega(ferramenta, [ChavePequena, Martelo]);
    if (!f)
      return false;
    if (f instanceof ChavePequena && !this.acaoOk) {
      this.acaoOk = true;
      return true;
    } else if (f instanceof Martelo && !this.acaoOk) {
      this.acaoOk = true;
      this.descricaoDepoisAcao =
        "A caixa de ferramentas quebrou, liberando ácido!";
      return true;
    }
    return false;
  }

  inspecionar() {
    return false;
  }
}
