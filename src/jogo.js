import { Engine } from "../lib/engine.js";
import { Cozinha } from "./salas/Cozinha.js";
import { PavimentoInferior } from "./salas/PavimentoInferior.js";
import { PavimentoSuperior } from "./salas/PavimentoSuperior.js";
import { SalaDeEstar } from "./salas/SalaDeEstar.js";
import { Artefato } from "./ferramentas/Artefato.js";
import { QuartoDeVisitas } from "./salas/QuartoDeVisitas.js";
import { QuartoDeCasal } from "./salas/QuartoDeCasal.js";
import { Porao } from "./salas/Porao.js";
import { SalaDeAlquimia } from "./salas/Laboratorio.js";
import { Chave } from "./ferramentas/Chave.js";
import { ChavePequena } from "./ferramentas/ChavePequena.js";

export class Jogo extends Engine {
  constructor() {
    super();
    let artefato = new Artefato();
    this.mochila.adicionar(artefato);

    this.criterios.set("relogio_grande", false);
    this.criterios.set("veneno_para_ratos", false);
  }

  criaCenario() {
    // Define as salas que compõem o mapa
    let sala = new SalaDeEstar(this);
    let cozinha = new Cozinha(this);
    let pavimentoInferior = new PavimentoInferior(this);
    let pavimentoSuperior = new PavimentoSuperior(this);
    let quartoDeVisitas = new QuartoDeVisitas(this);
    let quartoDeCasal = new QuartoDeCasal(this);

    // fase 2
    let porao = new Porao(this);
    let laboratorio = new SalaDeAlquimia(this);

    // Encadeia as salas através das portas
    sala.portas.set(cozinha.nome, cozinha);
    sala.portas.set(pavimentoInferior.nome, pavimentoInferior);

    cozinha.portas.set(sala.nome, sala);
    cozinha.portas.set(pavimentoInferior.nome, pavimentoInferior);

    pavimentoInferior.portas.set(sala.nome, sala);
    pavimentoInferior.portas.set(cozinha.nome, cozinha);
    pavimentoInferior.portas.set(pavimentoSuperior.nome, pavimentoSuperior);

    // fase 2
    pavimentoInferior.portas.set(porao.nome, porao);
    porao.portas.set(pavimentoInferior.nome, pavimentoInferior);
    porao.portas.set(laboratorio.nome, laboratorio);
    laboratorio.portas.set(porao.nome, porao);

    pavimentoSuperior.portas.set(pavimentoInferior.nome, pavimentoInferior);
    pavimentoSuperior.portas.set(quartoDeVisitas.nome, quartoDeVisitas);
    pavimentoSuperior.portas.set(quartoDeCasal.nome, quartoDeCasal);

    quartoDeVisitas.portas.set(pavimentoSuperior.nome, pavimentoSuperior);
    quartoDeCasal.portas.set(pavimentoSuperior.nome, pavimentoSuperior);

    // Define a sala inicial
    this.salaCorrente = sala;
  }
}
