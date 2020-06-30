import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { store } from '../store';
import Btn from './Btn';

const FormContainer = styled.form`
    margin: 0 auto;
    width: 300px;
    display: flex;
    flex-flow: column;
    align-items: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    
    input {
        border: none;
        outline: none;
        border-bottom: 2px solid #DADADA;
        width: 70%;
        height: 30px;
        margin-bottom: 20px;

        &:focus {
            border: none;
            outline: none;
            border-bottom: 2px solid #00A4F7;
        }
    }

    textarea {
        border: 2px solid #DADADA;
        outline: none;
        margin-bottom: 20px;
        width: 70%;
        height: 100px;
        resize: none;

        &:focus {
            border: 2px solid #00A4F7;
            outline: none;
        }
    }
`;

const Form = () => {
    const { globalState, dispatch } = useContext(store);
    const { noteText } = globalState;
    
    const handleChange = ({ target }) => {
        if (target.name === 'header') {
            dispatch({ type: 'CHANGE_HEADER_TEXT', payload: target.value });
        }
        
        if (target.name === 'desc') {
            dispatch({ type: 'CHANGE_DESC_TEXT', payload: target.value });
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!noteText.header) {
            return;
        }

        dispatch({ type: 'ADD_ITEM', payload: {
            id: uuidv4(), 
            note: noteText,
            status: 'open',
        } })

        dispatch({ type: 'CLEAR_FIELD' })
        dispatch({ type: 'SET_ACTIVE_SCREEN', payload: {
            form: false,
            list: true,
        } })
    }

    return (
        <FormContainer onSubmit={(e) => handleSubmit(e)}>
            <input 
                type='text'
                name='header'
                value={noteText.header}
                onChange={(e) => handleChange(e)}
                placeholder='Заголовок'
            />
            <textarea
                type='text'
                name='desc'
                value={noteText.desc}
                onChange={(e) => handleChange(e)}
                placeholder='Описание'
            />
            <Btn type='submit'>Добавить</Btn>
        </FormContainer>
    )
}

export default Form;