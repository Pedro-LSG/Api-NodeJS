module.exports = class Curso{
    constructor(codigo, nome, area, dataInicio, dataTermino, preRequisito){
        if(this.codigo = codigo){this.codigo = codigo}
        this.nome = nome;
        this.area = area;
        this.dataInicio = dataInicio;
        this.dataTermino = dataTermino;
        this.preRequisito = preRequisito;
    }

    getCodigo(){return this.codigo;}
    setCodigo(codigo){return this.codigo = codigo;}

    getNome(){return this.nome;}
    setNome(nome){return this.nome = nome;}
    
    getArea(){return this.area;}
    setArea(area){return this.area = area;}

    getDataInicio(){return this.dataInicio;}
    setDataInicio(dataInicio){return this.dataInicio = dataInicio;}

    getDataTermino(){return this.dataTermino;}
    setDataTermino(dataTermino){return this.dataTermino = dataTermino;}

    getPreRequisito(){return this.preRequisito;}
    setPreRequisito(preRequisito){return this.preRequisito = preRequisito;}
}