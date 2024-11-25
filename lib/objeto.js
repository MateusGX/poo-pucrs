import { validate } from "bycontract";

export class Objeto {
  #nome;
  #descricaoAntesAcao;
  #descricaoDepoisAcao;
  #acaoOk;
  #inspecionavel;

  constructor(
    nome,
    descricaoAntesAcao,
    descricaoDepoisAcao,
    inspecionavel
  ) {
    validate(arguments, ["String", "String", "String", "Boolean"]);
    this.#nome = nome;
    this.#descricaoAntesAcao = descricaoAntesAcao;
    this.#descricaoDepoisAcao = descricaoDepoisAcao;
    this.#acaoOk = false;
    this.#inspecionavel = inspecionavel
  }

  get nome() {
    return this.#nome;
  }

  get acaoOk() {
    return this.#acaoOk;
  }

  get inspecionavel() {
    return this.#inspecionavel;
  }

  set descricaoAntesAcao(descricaoAntesAcao) {
    validate(descricaoAntesAcao, "String");
    this.#descricaoAntesAcao = descricaoAntesAcao;
  }

  set acaoOk(acaoOk) {
    validate(acaoOk, "Boolean");
    this.#acaoOk = acaoOk;
  }

  set descricaoDepoisAcao(descricaoDepoisAcao) {
    validate(descricaoDepoisAcao, "String");
    this.#descricaoDepoisAcao = descricaoDepoisAcao;
  }

  get descricao() {
    if (!this.acaoOk) {
      return this.#descricaoAntesAcao;
    } else {
      return this.#descricaoDepoisAcao;
    }
  }

  usar(ferramenta, engine) { }

  usarFracao(ferramenta, engine, quantidade) { }

  inspecionar() { }
}
