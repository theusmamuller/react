import React, { Component } from 'react';
import axios from 'axios';
import Cadastro from './Cadastro';
import Tabela from './Tabela';

export default class Produtos extends Component {

    constructor() {
        super();
        this.state={
            produtos:[],
            produtoParaEditar:null
        };
    }

    load()
      {
          this.setState({

            carregandoLista : true,
              produtos:[]
          })
        axios.get("/api/produtos/").then(
            (retorno)=>this.setState({
                carregandoLista : false,
                produtos:retorno.data
            }) 
        );
      }
    componentDidMount() {
      this.load();
    }


    adicionarProduto(produto) {
        axios.post("/api/produtos/",produto).then(
            (retorno)=>this.setState(
                {
                produtos:[...this.state.produtos, retorno.data]
                }
            )
        );

        /*
        this.setState(
            (estadoAntigo)=>{
                estadoAntigo.produtos.push(produto);
                return estadoAntigo;
            });
*/
        ///this.setState({produtos:[...this.state.produtos,produto] });

        }

        confirmarEdicao(produto) {
            axios.put("/api/produtos/"+produto.id,produto).then(
                (retorno)=> this.load()
                    
            );
                }


    editar (produto) { 
        this.setState({
            produtoParaEditar : produto
        });
    }
    excluir(produto) {
        axios.delete("/api/produtos/"+produto.id).then(
            ()=>this.load()
        );
            /*
        let produtos= this.state.produtos;
        let index = produtos.indexOf(produto);

        produtos.splice(index,1);
        this.setState({produtos:produtos});*/

    }    
    render() { console.log(this.state)
        /*
        let total=0;
      for (let index = 0; index < this.state.produtos.length; index++) {
        total+= this.state.produtos[index].valor;
      }*/
      return (
        <div><h1>Cadastro de produtos</h1>
        {this.state.carregandoLista?"Carregando Lista":    
       
        <Tabela 
            itens = {this.state.produtos} 
            onExcluir = {(produto)=>this.excluir(produto)}
            onEditar = {(produto) => this.editar(produto)}
      />} <br/><br/>

        Total:{this.state.produtos.reduce(
            (valorAntigo, produto)=>valorAntigo+produto.valor
        , 0)}
        <br/><br/>


         <Cadastro
         key ={this.state.produtoParaEditar?
                this.state.produtoParaEditar.id:"novo"}
                editar = {this.state.produtoParaEditar}
        onEditar ={(produto) => this.confirmarEdicao(produto)} //aqui ele apenas autoriza a classe filho(cadastro) a usar o metodo editar 
        onAdicionar={(produto)=>this.adicionarProduto(produto)} //aqui ele apenas autoriza a classe filho(cadastro) a usar o metodo adicionar  
         />
         </div>
      );
    }
  }
  