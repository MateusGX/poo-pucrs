import { validate } from "bycontract";
export class Ferramenta {
  #nome;
  #quantidade;
  #amontoado;

  constructor(nome, quantidade, amontoado) {
    validate(nome, "String");
    validate(quantidade, "Number");
    this.#nome = nome;
    this.#quantidade = quantidade;
    this.#amontoado = amontoado;
  }

  get nome() {
    return this.#nome;
  }

  usar() {
    return true;
  }

  get amontoado() {
    return this.#amontoado;
  }

  get quantidade() {
    return this.#quantidade;
  }

  set quantidade(quantidade) {
    validate(quantidade, "Number");
    this.#quantidade = quantidade;
  }
}
