import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';



export default class Main extends Component{

    state = {
        products: [],
        productInfo: {},
    };

    componentDidMount(){
        this.loadPRoducts();
    };

    loadPRoducts = async (page = 1) =>{

        const response = await api.get(`/products?page=${page}`);

        const {docs, ...productInfo} = response.data

        this.setState({products: docs, productInfo});
    };

    prevPage = () => {        
        
    const {productInfo: {hasPrevPage,prevPage}} = this.state;
     
    if(!hasPrevPage) return;

    this.loadPRoducts(prevPage);}

    nextPage = () => {

        const { productInfo: {hasNextPage,nextPage}} = this.state;
     
        if(!hasNextPage) return;

        this.loadPRoducts(nextPage);

    };

    render(){

        const { products, productInfo: {hasPrevPage,hasNextPage} } = this.state;

        return(

            <div className='product-list'>

                <div className='newProduct'>
                    <Link to={`/create`}>
                        Cria um novo Produto
                    </Link>
                </div>

                {products.map(
                    product => (
                        <article key={product._id}>
                            <strong>{product.title}</strong>
                            <p>{product.description}</p>

                            <Link to={`/products/${product._id}`}>Acessar</Link>
                            
                        </article>   
                    )
                    )}         

                <div className='actions'>
                                
                    <button disabled={!hasPrevPage} onClick={this.prevPage}>Anterior</button>
                    <button disabled={!hasNextPage} onClick={this.nextPage}>Proximo</button>

                </div>
            </div>


        )  
    };

};