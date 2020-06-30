import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { store } from '../store';
import Btn from './Btn';

const NotesContainer = styled.div`
    display: flex;
    flex-flow: column;
    align-items: center;
    width: 520px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    table {
        margin: 0 auto;
        border-collapse: collapse;
        width: 100%;
        table-layout: fixed;

        th, td {
            text-align: center;
            padding: 10px;
        }

        thead {
            font-size: 30px;
            opacity: 0.7;
        }

        thead th:nth-child(1) {
            width: 5%;
        }

        thead th:nth-child(2) {
            width: 45%;
        }

        thead th:nth-child(3) {
            width: 45%;
        }

        thead th:nth-child(4) {
            width: 5%;
        }
    }

    button {
        margin-top: 40px;
    }
`;

const RemoveButtom = styled.button`
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

const Item = styled.tr`
    user-select: none;
    position: relative;

    td {
        padding: 0;
        font-size: 18px;
        word-wrap: break-word;

        & > button {
            margin: 0;
        }
    }

    .open {
        color: #b614f0;
    }

    .closed {
        color: green;
    }

    .work {
        color: #00A4F7;
    }
`;

const AddButton = styled.button`
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

const Notes = () => {
    const { globalState, dispatch } = useContext(store);
    const { noteList } = globalState;

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    }

    const toggleItem = (id) => {
        dispatch({ type: 'TOGGLE_ITEM', payload: id });
    }

    const toCreateTask = () => {
        dispatch({ type: 'SET_ACTIVE_SCREEN', payload: {
            form: true,
            list: false,
        } });
    }

    return (
        <NotesContainer>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Заголовок</th>
                        <th>Описание</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        noteList.map(({ id, note, status }) => {
                            return (
                                <Item key={id}>
                                    <td onClick={() => toggleItem(id)}></td>
                                    <td onClick={() => toggleItem(id)}>
                                        <span className={status}>{note.header}</span>
                                    </td>
                                    <td onClick={() => toggleItem(id)}>
                                        <span className={status}>{note.desc}</span>
                                    </td>
                                    <td>
                                        <RemoveButtom
                                            type='button'
                                            onClick={() => removeItem(id)}                                         
                                        >
                                            &ndash;
                                        </RemoveButtom>
                                    </td>
                                </Item>
                            )
                        })
                    }
                </tbody>
            </table>

            <AddButton onClick={() => toCreateTask()}>
                Добавить задачу
            </AddButton>
        </NotesContainer>
    )
}

export default Notes;