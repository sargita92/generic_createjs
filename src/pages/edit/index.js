import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Create( props ){

    const [firstTime, setFirstTime] = useState(true);
    const [prodId]                  = useState(props.match.params.id);
    const [prodName, setProdName]   = useState('');
    const [prodDesc, setProdDesc]   = useState('');
    const [prodLink, setProdLink]   = useState('');

    async function getInfo(){

           if(firstTime){

                setFirstTime(false);
    
                const response = await api.get(`/products/${prodId}`);

                setProdName(response.data.title);
                setProdDesc(response.data.description);
                setProdLink(response.data.url);

           }
    
    };

    useEffect(() => { getInfo(); });



    function handleProdName(event){
        setProdName(event.target.value);
    }

    function handleProdDesc(event){
        setProdDesc(event.target.value);
    }

    function handleProdLink(event){
        setProdLink(event.target.value);
    }

    async function onUpdateClick(event){
        const newProduct = {    "title": prodName, 
                                "description":prodDesc,
                                "url":  prodLink}

        const response = await api.put(`/products/${prodId}`, newProduct);
        
        if(response.data){
            getInfo();
            alert("Alterado com sucesso!");
            props.history.push(`/products/${prodId}`);
        }
    }

    return (

        <div className='create-product'>

            <h2>Editar Produto</h2>

            <div className='product-form'>

                <label> Nome </label>
                    <input      type='text' 
                                name='name'
                                value={prodName}
                                onChange={event => handleProdName(event)}
                                 />
                <label> Descricao </label>
                    <textarea   type='text' 
                                name='description'
                                rows="6"
                                value={prodDesc}
                                onChange={event => handleProdDesc(event)}
                                 />
                <label> Link</label>
                    <input      type='text' 
                                name='link'
                                value={prodLink}
                                onChange={event => handleProdLink(event)}
                                 />

            </div>

            <div className="create-btns">
                    <button onClick={event => onUpdateClick(event)}>Editar</button>
                    <Link to={'/'}><button>Voltar</button></Link>
            </div>

        </div>

    );


}