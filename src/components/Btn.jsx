import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { store } from '../store';

const BtnContainer = styled.button`
    font-weight: 600;
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 3px;
    background: #00A4F7;
    color: #fff;
    transition: all 0.4s;
    cursor: pointer;

    &:disabled {
        opacity: 0.25;
    }

    &:hover {
        &:disabled {
            background: #00A4F7;
        }
        
        background: #128ACE;
    }
`;

const Btn = (props) => {
    return (
        <BtnContainer>
            {props.children}
        </BtnContainer>
    )
}

export default Btn;