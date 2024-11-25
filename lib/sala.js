import { validate } from "bycontract";
import { Mochila } from "../src/ferramentas/Mochila.js";
import { Engine } from "./engine.js";
import { Ferramenta } from "./ferramenta.js";
import { Chave } from "../src/ferramentas/Chave.js";
import { ChavePequena } from "../src/ferramentas/ChavePequena.js";

export class Sala {
  #nome;
  #objetos;
  #ferramentas;
  #portas;
  #engine;
  #desbloqueada;

  constructor(nome, engine, desbloqueada) {
    validate(arguments, ["String", Engine, "Boolean"]);
    this.#nome = nome;
    this.#objetos = new Map();
    this.#ferramentas = new Map();
    this.#portas = new Map();
    this.#engine = engine;
    this.#desbloqueada = desbloqueada;
  }

  get nome() {
    return this.#nome;
  }

  get objetos() {
    return this.#objetos;
  }

  get ferramentas() {
    return this.#ferramentas;
  }

  get portas() {
    return this.#portas;
  }

  get engine() {
    return this.#engine;
  }

  get desbloqueada() {
    return this.#desbloqueada;
  }

  objetosDisponiveis() {
    let arrObjs = [...this.#objetos.values()];
    return arrObjs.map((obj) => obj.nome + ":" + obj.descricao);
  }

  ferramentasDisponiveis() {
    let arrFer = [...this.#ferramentas.values()];
    return arrFer.map((f) => f.nome);
  }

  portasDisponiveis() {
    let arrPortas = [...this.#portas.values()];
    return arrPortas.map((sala) => sala.nome);
  }

  pega(nomeFerramenta) {
    validate(nomeFerramenta, "String");
    let f = this.#ferramentas.get(nomeFerramenta);
    if (f != null) {
      if (this.#engine.mochila == null && !(f instanceof Mochila)) {
        console.log("Sem mochila, não é possível pegar " + nomeFerramenta);
        return false;
      }

      let destruirItem = true;

      if (f instanceof Mochila) {
        this.#engine.mochila.expandir(f.capacidade);
        let chavePequena = new ChavePequena();
        this.#engine.mochila.adicionar(chavePequena);
        console.log("Mochila adquirida");
      } else {
        destruirItem = this.#engine.mochila.adicionar(f);
      }

      destruirItem && this.#ferramentas.delete(nomeFerramenta);
      return true;
    } else {
      console.log("Ferramenta não encontrada");
      return false;
    }
  }

  desbloquear() {
    this.#desbloqueada = true;
  }

  usaNaPorta() {
    return false;
  }

  sai(porta) {
    validate(porta, "String");
    return this.#portas.get(porta);
  }

  textoDescricao() {
    let descricao = "Você está no " + this.nome + "\n";
    if (this.objetos.size == 0) {
      descricao += "Não há objetos na sala\n";
    } else {
      descricao += "Objetos: " + this.objetosDisponiveis() + "\n";
    }
    if (this.ferramentas.size == 0) {
      descricao += "Não há ferramentas na sala\n";
    } else {
      descricao += "Ferramentas: " + this.ferramentasDisponiveis() + "\n";
    }
    descricao += "Portas: " + this.portasDisponiveis() + "\n";
    return descricao;
  }

  usa() {
    return false;
  }

  usaFracao() {
    return false;
  }

  inspeciona(objeto) {
    validate(objeto, "String");
    if (this.objetos.has(objeto) && this.objetos.get(objeto).inspecionavel) {
      return this.objetos.get(objeto).inspecionar();
    }
    return false;
  }

  acao() {
    return false;
  }
}
