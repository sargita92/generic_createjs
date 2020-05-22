import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Product( props ){

    const [firstTime, setFirstTime]     = useState(true);
    const [prodId]                      = useState(props.match.params.id);
    const [product, setProduct]         = useState({});

    async function getInfo(){

        if(firstTime){

             setFirstTime(false);

             const response = await api.get(`/products/${prodId}`);
     
             setProduct(response.data);
        }
 
    };

    useEffect(() => { getInfo(); });

    async function deleteProd(){

        const response = await api.delete(`/products/${prodId}`);

        alert("Apagado com sucesso!");

        props.history.push(`/`);
    }

    return (

        <div className='product-info'>

            <h1>{product.title}</h1>
            <p>{product.description}</p>
            
            <p>URL: 
                <a href={product.url}>
                    {product.url}>
                </a>
            </p>

            <div className="product-btns">
                    <Link to={`/edite/${prodId}`}><button >Editar</button></Link>
                    <button onClick={deleteProd} >Apagar</button>
                    <Link to={'/'}><button>Voltar</button></Link>
            </div>

        </div> 

    );
    
}