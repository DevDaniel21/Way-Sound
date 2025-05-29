import { usuarios } from "../service/Usuario.service.js";

export class UsuarioModel {
    constructor (nome, email, senha) {
        this.id = usuarios.length + 1;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.foto = null;
    }
}
