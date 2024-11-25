import { validate } from "bycontract";
import { Sala } from "../../lib/sala.js";
import { Engine } from "../../lib/engine.js";
import { Chave } from "../ferramentas/Chave.js";
import { Armario } from "../objetos/Armario.js";

export class QuartoDeVisitas extends Sala {
    constructor(engine) {
        validate(engine, Engine);
        super("quarto_de_visitas", engine, true);
        let armario = new Armario();
        this.objetos.set(armario.nome, armario);

        let chave = new Chave();
        this.ferramentas.set(chave.nome, chave);
    }

    usa(ferramenta, objeto) {
        validate(objeto, "String");
        validate(ferramenta, "String");
        return false;
    }
}
