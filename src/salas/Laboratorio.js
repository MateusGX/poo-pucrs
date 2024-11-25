import { validate } from "bycontract";
import { Martelo } from "../ferramentas/Martelo.js";
import { Sala } from "../../lib/sala.js";
import { VenenoParaRatos } from "../ferramentas/VenenoParaRatos.js";
import { Gaiola } from "../objetos/Gaiola.js";
import { Engine } from "../../lib/engine.js";
import { ChaveDoRelogio } from "../ferramentas/ChaveDoRelogio.js"
import { AcidoNitrico } from '../ferramentas/AcidoNitrico.js'
import { AcidoCloridrico } from '../ferramentas/AcidoCloridrico.js'
import { PoteDeMistura } from "../objetos/PoteDeMistura.js"

export class SalaDeAlquimia extends Sala {
    constructor(engine) {
        validate(engine, Engine);
        super("laboratorio", engine, true);
        let poteDeMistura = new PoteDeMistura(this);
        this.objetos.set(poteDeMistura.nome, poteDeMistura);

        let chaveDoRelogio = new ChaveDoRelogio();
        this.ferramentas.set(chaveDoRelogio.nome, chaveDoRelogio);
        let acidoNtrico = new AcidoNitrico();
        this.ferramentas.set(acidoNtrico.nome, acidoNtrico);
        let acidoCloridrico = new AcidoCloridrico();
        this.ferramentas.set(acidoCloridrico.nome, acidoCloridrico);
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

    usaFracao(quantiade, ferramenta, objeto) {
        validate(objeto, "String");
        validate(ferramenta, "String");
        validate(quantiade, "String");
        const qtd = parseInt(quantiade);
        if (qtd <= 0) {
            console.log("Quantidade inválida");
            return false;
        }

        if (qtd == NaN) {
            console.log("Quantidade inválida");
            return false;
        }

        if (!this.objetos.has(objeto)) {
            console.log("Objeto não encontrado");
            return false;
        }

        if (!this.engine.mochila.existe(ferramenta)) {
            return false;
        }

        let obj = this.objetos.get(objeto);
        return obj.usarFracao(ferramenta, this.engine, qtd);
    }
}
