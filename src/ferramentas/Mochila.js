import { Ferramenta } from "../../lib/ferramenta.js";

export class Mochila extends Ferramenta {
  #capacidade;
  #itens = [];

  constructor(capacidade = 8) {
    super("mochila", 1, false);
    this.#capacidade = capacidade;
  }

  get capacidade() {
    return this.#capacidade;
  }

  listar() {
    return this.#itens;
  }

  expandir(capacidade) {
    this.#capacidade += capacidade;
  }

  existe(nome) {
    let existe = this.#itens.some((i) => i.nome === nome);
    if (!existe) {
      console.log(`${nome} não está na mochila.`);
    }
    return existe;
  }

  pega(nome, classes = [], quantidade = 1) {
    let index = this.#itens.findIndex((i) => i.nome === nome);
    if (index === -1)
      return null;

    let item = this.#itens[index];

    let valido = false;
    for (let i = 0; i < classes.length; i++) {
      if (item instanceof classes[i]) {
        valido = true;
        break;
      }
    }

    if (!valido)
      return null;

    if (quantidade > item.quantidade)
      return null;

    if (quantidade === item.quantidade) {
      this.#itens.splice(index, 1);
      console.log(`${item.nome} removido da mochila.`);
      return item;
    }

    item.quantidade -= quantidade;
    this.#itens[index] = item;
    console.log(`${quantidade} ${item.nome} removido da mochila.`);
    return item;
  }

  adicionar(item) {
    const find = this.#itens.find((i) => i.nome === item.nome);
    if (find) {
      if (find.amontoado) {
        find.quantidade += item.quantidade;
        return true;
      }
      console.log(`${item.nome} já está na mochila.`);
      return false;
    }

    if (this.#itens.length >= this.#capacidade) {
      console.log("Mochila cheia.");
      return false;
    }

    this.#itens.push(item);
    console.log(`${item.nome} adicionado à mochila.`);
    return true;
  }

  remover(item, quantidade) {
    const find = this.#itens.find((i) => i.nome === item.nome);
    if (find) {
      if (find.amontoado) {
        if (quantidade > find.quantidade) {
          console.log("Quantidade inválida.");
          return false;
        }

        if (quantidade === find.quantidade) {
          this.#itens = this.#itens.filter((i) => i.nome !== item.nome);
          return true;
        }

        find.quantidade -= quantidade;
        return true;
      }

      this.#itens = this.#itens.filter((i) => i.nome !== item.nome);
      return true;
    }

    console.log(`${item.nome} não está na mochila.`);
    return false;
  }
}
