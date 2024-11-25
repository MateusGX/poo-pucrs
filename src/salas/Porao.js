import { validate } from "bycontract";
import { Martelo } from "../ferramentas/Martelo.js";
import { Sala } from "../../lib/sala.js";
import { VenenoParaRatos } from "../ferramentas/VenenoParaRatos.js";
import { Gaiola } from "../objetos/Gaiola.js";
import { Engine } from "../../lib/engine.js";
import { CaixaDeFerramentas } from "../objetos/CaixaDeFerramentas.js"
import { Chave } from "../ferramentas/Chave.js";

export class Porao extends Sala {
    constructor(engine) {
        validate(engine, Engine);
        super("porao", engine, false);
        let caixaDeFerramentas = new CaixaDeFerramentas();
        this.objetos.set(caixaDeFerramentas.nome, caixaDeFerramentas);
    }

    usa(ferramenta, objeto) {
        validate(objeto, "String");
        validate(ferramenta, "String");
        if (!this.engine.mochila.existe(ferramenta))
            return false;
        if (!this.objetos.has(objeto)) {
            return false;
        }
        let obj = this.objetos.get(objeto);
        return obj.usar(ferramenta, this.engine);
    }

    acao() {
        if (!this.engine.criterios.get("veneno_para_ratos")) {
            this.engine.perder("Os ratos te atacaram! Você perdeu!")
        }
    }

    usaNaPorta(ferramenta) {
        let f = this.engine.mochila.pega(ferramenta, this.desbloqueada ? [VenenoParaRatos] : [Chave, VenenoParaRatos]);

        if (!f)
            return false;
        if (f instanceof Chave) {
            this.desbloquear();
            console.log("A porta do " + this.nome + " foi destrancada!")
            return true;
        } else if (f instanceof VenenoParaRatos) {
            this.engine.criterios.set("veneno_para_ratos", true);
            return true;
        }

        return false;
    }
}
