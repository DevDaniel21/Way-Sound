import { UsuarioModel } from "../models/Usuario.model.js";

export const usuarios = []

// CHECAR SE O EMAIL NÃO É VAZIO E SE JÁ FOI REGISTRADO
function check(email) {
    if(email === '') {
        let erro = 'Insira um email válido!';
        
        return erro
    } else {
        const jaCadastrado = usuarios.some(usuario => usuario.email === email);
        
        return !jaCadastrado
    }
}


// PROCESSO DE ADICIONAR USUÁRIO AO SITE E BANCO DE DADOS
function add() {
    event.preventDefault()
    let nome = document.getElementById('registerUsuario').value;
    let email = document.getElementById('registerEmail').value;
    let senha = document.getElementById('registerSenha').value;

    let disponivel = check(email);
    
    // console.log('Disponível: ' + disponivel)
    // console.log('Nome: ' + nome)
    // console.log('Email: ' + email)
    // console.log('Senha: ' + senha)
    
    if (nome !== '' && disponivel === true && senha !== '') {
        // Codigo de registro
        usuarios.push( new UsuarioModel( nome, email, senha))
        updateLocalStorage()
        alert('Usuário cadastrado com sucesso!')
        // window.location.href = "exemplo.html";
    } 
    // CASO DE ERRO
    else if (nome === '') {
        alert('Insira um nome válido!');
    }
    else if (disponivel === 'Insira um email válido!') {
        alert('Insira um email válido!');    
    }
    else if (disponivel != true) {
        alert('Esse email já em uso!');    
    }
    else {
        alert('Insira um senha válida!');
    }
}

// ATUALIZAR O LOCAL STORAGE
function updateLocalStorage() {
    localStorage.setItem('Usuarios', JSON.stringify(usuarios))
}

const registerBtn = document.getElementById('registerBtn').addEventListener('click', add);
usuarios.push(new UsuarioModel('','a',''))