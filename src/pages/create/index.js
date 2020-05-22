import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Create( { history } ){

    const [prodName, setProdName] = useState('');
    const [prodDesc, setProdDesc] = useState('');
    const [prodLink, setProdLink] = useState('');

    function handleProdName(event){
        setProdName(event.target.value);
    }

    function handleProdDesc(event){
        setProdDesc(event.target.value);
    }

    function handleProdLink(event){
        setProdLink(event.target.value);
    }

    async function onSaveClick(event){
        const newProduct = {    "title": prodName, 
                                "description":prodDesc,
                                "url":  prodLink}

        const res = await api.post('/products', newProduct);

        if(res.data){
            alert("Cadastrado com sucesso!");
            history.push("/");
        }
    }

    return (

        <div className='create-product'>

            <h2>Novo Produto</h2>

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
                    <button onClick={event => onSaveClick(event)}>Salvar</button>
                    <Link to={'/'}><button>Voltar</button></Link>
            </div>

        </div>

    );


}