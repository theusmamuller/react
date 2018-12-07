import React, { Component } from 'react';

export default class Cadastro extends Component {

    constructor(props){
        super(props);
        console.log(this.props)
        if(this.props.editar) { // props serve para acessar os metodos da classe pai
            this.state = {
                id : this.props.editar.id,
                nome : this.props.editar.nome,
                valor : this.props.editar.valor
            };
        }else{   
        this.state={nome:"", valor:""};
    }
}
    setParam(param, valor) {
        this.setState({
            [param]:valor // o dois pontos atribui o valor igual no json
            // "nome":valor
            //"valor":valor
        });
    }

    enviar() {
        if(this.state.id) {
            this.props.onEditar({
                id:this.state.id,
                nome:this.state.nome,
                valor:Number(this.state.valor)
                });
        } else { 

        this.props.onAdicionar({
            nome:this.state.nome,
            valor:Number(this.state.valor)
            });
        this.setState({
            id : "",
            nome:"",
            valor:""
        });
    }
    }
    render() {
      return (
        <div>
            <label>Nome:</label>
            <input value={this.state.nome}
                onChange={(
                        evento)=>
                            this.setParam("nome",evento.target.value)} /><br/><br/> 
            <label>Valor:</label>
            <input 
                onChange={(
                    evento)=>
                        this.setParam("valor",evento.target.value)}
                value={this.state.valor} type="number"/><br/><br/> 
            <button onClick={
                ()=>this.enviar() 
            } >Adicionar</button>
        </div>
      );
    }
  }
