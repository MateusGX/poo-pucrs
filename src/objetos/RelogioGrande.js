import { validate } from "bycontract";
import { Objeto } from "../../lib/objeto.js";
import { ChaveDoRelogio } from "../ferramentas/ChaveDoRelogio.js";
import { Engine } from "../../lib/engine.js";
import { Martelo } from "../ferramentas/Martelo.js";

export class RelogioGrande extends Objeto {
  constructor() {
    super(
      "relogio_grande",
      "Este é um relógio grande, com um mostrador de 12 horas e ponteiros grandes e pesados. Ele está parado, marcando 10:10.",
      "O relógio grande foi adiantado para 08:10.",
      false
    );
  }

  usar(ferramenta, engine) {
    validate(ferramenta, "String");
    validate(engine, Engine);
    if (this.acaoOk) return false;
    let f = engine.mochila.pega(ferramenta, [ChaveDoRelogio, Martelo]);
    if (!f)
      return false;
    if (f instanceof ChaveDoRelogio && !this.acaoOk) {
      this.acaoOk = true;
      engine.criterios.set("relogio_grande", true);
      return true;
    } else if (f instanceof Martelo && !this.acaoOk) {
      this.acaoOk = true;
      this.descricaoDepoisAcao = "O relógio grande quebrou!";
      engine.perder("O relógio grande quebrou! A realidade está se desfazendo! Você perdeu!");
      return true;
    }
    return false;
  }

  inspecionar() {
    return false;
  }
}
