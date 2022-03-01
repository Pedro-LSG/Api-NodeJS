module.exports = class Usuario{
    constructor(codigo, nome, email, senha, ativo){
        if(codigo){this.codigo = codigo}
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }

    getCodigo(){return this.codigo;}
    setCodigo(codigo){return this.codigo = codigo}

    getNome(){return this.nome;}
    setNome(nome){return this.nome = nome}

    getEmail(){return this.email;}
    setEmail(email){return this.email = email}

    getSenha(){return this.senha;}
    setSenha(senha){return this.senha = senha}
}