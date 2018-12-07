import React, { Component } from 'react';

export default class Tabela extends Component {

    render() {
        
        return <table border="1">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Excluir</th>
                    <th>Editar</th>
                </tr>
            </thead>
            <tbody>
                {this.props.itens.map(
                    (produto)=><tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>R$ {produto.valor}</td>
                                <td><button
                                    onClick={()=>this.props.onExcluir(produto)}
                                    >Excluir</button></td>
                                 <td><button
                                    onClick={()=>this.props.onEditar(produto)}
                                    >Editar</button></td>
                            </tr>
                )}
                

            </tbody>
        </table>;
    }
}