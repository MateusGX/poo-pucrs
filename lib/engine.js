import { validate } from "bycontract";
import promptsync from "prompt-sync";
import { Sala } from "./sala.js";
import { Ferramenta } from "./ferramenta.js";
import { Mochila } from "../src/ferramentas/Mochila.js";
const prompt = promptsync({ sigint: true });

export class Engine {
  #mochila;
  #salaCorrente;
  #fim;
  #perda;
  #criteriosVitoria;

  constructor() {
    this.#mochila = new Mochila(1);
    this.#salaCorrente = null;
    this.#fim = false;
    this.#criteriosVitoria = new Map();
    this.criaCenario();
  }

  get criterios() {
    return this.#criteriosVitoria;
  }

  get mochila() {
    return this.#mochila;
  }

  set mochila(ferramenta) {
    validate(ferramenta, Ferramenta);
    this.#mochila = ferramenta;
  }

  get salaCorrente() {
    return this.#salaCorrente;
  }

  set salaCorrente(sala) {
    validate(sala, Sala);
    this.#salaCorrente = sala;
  }

  indicaFimDeJogo() {
    this.#fim = true;
  }

  perder(mensagem = "Você perdeu!") {
    this.#perda = true;
    console.log(mensagem);
    this.indicaFimDeJogo();
  }

  criaCenario() { }

  joga() {
    let novaSala = null;
    let acao = "";
    let tokens = null;
    while (!this.#fim) {
      console.log("-------------------------");
      console.log(this.salaCorrente.textoDescricao());
      acao = prompt("O que voce deseja fazer? ");
      tokens = acao.split(" ");
      switch (tokens[0]) {
        case "fim":
          this.#fim = true;
          break;
        case "pega":
          this.salaCorrente.pega(tokens[1])
          break;
        case "inventario":
          console.log("Itens no inventário:");
          for (let f of this.#mochila.listar()) {
            console.log(`${f.nome} (${f.quantidade})`);
          }
          break;
        case "inspeciona":
          if (!this.salaCorrente.inspeciona(tokens[1])) {
            console.log("Nada para inspecionar no " + tokens[1]);
          }
          break;
        case "usa":
          if (tokens.length < 4) {
            console.log("Comando inválido");
            break;
          }
          if (
            tokens.length == 5
              ? this.salaCorrente.usaFracao(tokens[1], tokens[2], tokens[4])
              : this.salaCorrente.usa(tokens[1], tokens[3])
          ) {
            console.log("Feito !!");
            if (this.#fim == true && this.#perda == false) {
              console.log("Parabens, voce venceu!");
            }
          } else {
            console.log("Não é possível usar " + tokens.length == 5 ? tokens[2] : tokens[1]);
          }
          break;
        case "sai":
          novaSala = this.salaCorrente.sai(tokens[1]);
          if (novaSala == null) {
            console.log("Sala desconhecida ...");
          } else {
            if (!novaSala.desbloqueada) {
              console.log("A porta do " + tokens[1] + " está trancada.")
              break;
            }
            this.#salaCorrente = novaSala;
            this.#salaCorrente.acao();
          }
          break;
        default:
          console.log("Comando desconhecido: " + tokens[0]);
          break;
      }
    }
    console.log("Jogo encerrado!");
  }
}
