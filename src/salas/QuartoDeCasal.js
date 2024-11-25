import { validate } from "bycontract";
import { Martelo } from "../ferramentas/Martelo.js";
import { Sala } from "../../lib/sala.js";
import { VenenoParaRatos } from "../ferramentas/VenenoParaRatos.js";
import { Gaiola } from "../objetos/Gaiola.js";
import { Engine } from "../../lib/engine.js";
import { Chave } from "../ferramentas/Chave.js";
import { CaixinhaDeMusica } from "../objetos/CaixinhaDeMusica.js";
import { AguaRegia } from "../ferramentas/AguaRegia.js";

export class QuartoDeCasal extends Sala {
    constructor(engine) {
        validate(engine, Engine);
        super("quarto_de_casal", engine, false);
        let caixinhaDeMusica = new CaixinhaDeMusica();
        this.objetos.set(caixinhaDeMusica.nome, caixinhaDeMusica);
    }

    usa(ferramenta, objeto) {
        validate(objeto, "String");
        validate(ferramenta, "String");
        if (!this.engine.mochila.existe(ferramenta))
            return false;

        if (!this.objetos.has(objeto))
            return false;

        let obj = this.objetos.get(objeto);
        return obj.usar(ferramenta, this.engine);
    }

    acao() {
        if (!this.engine.criterios.get("relogio_grande")) {
            this.engine.perder("Uma bomba caiu do céu! Você perdeu!")
        }
    }

    usaNaPorta(ferramenta) {
        let f = this.engine.mochila.pega(ferramenta, this.desbloqueada ? [] : [Chave, AguaRegia]);

        if (!f)
            return false;
        if (f instanceof Chave || f instanceof AguaRegia) {
            this.desbloquear();
            console.log("A porta do " + this.nome + " foi destrancada!")
            return true;
        }

        return false;
    }
}
