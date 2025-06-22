export interface Pokemon
{
    id: number;
    nome: string;
    tipo1: string;
    tipo2?: string;
    altura: number;
    peso: number;
    habilidades: string[];
    descricao: string;
    imagemUrl: string;
}

export class Pokemon{
    id: number;
    nome: string;
    tipo1: string;
    altura: number;
    peso: number;
    habilidades: string[];
    descricao: string;
    imagemUrl: string;
    tipo2?: string;

    constructor(
        id: number,
        nome: string,
        tipo1: string,
        altura: number,
        peso: number,
        habilidades: string[],
        descricao: string,
        imagemUrl: string,
        tipo2?: string
    ) {
        this.id = id;
        this.nome = nome;
        this.tipo1 = tipo1;
        this.altura = altura;
        this.peso = peso;
        this.habilidades = habilidades;
        this.descricao = descricao;
        this.imagemUrl = imagemUrl;
        this.tipo2 = tipo2;
    }
}
    