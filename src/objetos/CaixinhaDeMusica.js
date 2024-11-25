import { Objeto } from "../../lib/objeto.js";
import { ChavePequena } from "../ferramentas/ChavePequena.js";
import { Engine } from "../../lib/engine.js";
import { validate } from "bycontract";
import { Artefato } from "../ferramentas/Artefato.js"


export class CaixinhaDeMusica extends Objeto {
  constructor() {
    super(
      "caixinha_de_musica",
      "Parece haver um encaixe para algo!",
      "",
      false
    );
  }

  usar(ferramenta, engine) {
    validate(ferramenta, "String");
    validate(engine, Engine);
    let f = engine.mochila.pega(ferramenta, [Artefato]);
    if (!f)
      return false;
    if (f instanceof Artefato && !this.acaoOk) {
      this.acaoOk = true;
      console.log("Uma bela musica começa a tocar... A realidade volta a sua origem...");
      engine.indicaFimDeJogo();
      return true;
    }
    return false;
  }

  inspecionar() {
    return false;
  }
}
