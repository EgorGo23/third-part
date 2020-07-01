import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { store } from '../store';

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
        color: #ff0000;
    }

    .closed {
        color: green;
    }

    .work {
        color: #00A4F7;
    }
`;

const FunctionPanel = styled.div`
    width: 400px;
    position: relative;
    height: 95px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;

    .filter-area {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .search-area {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    select {
        border: none;
        outline: none;
        height: 30px;
        width: 175px;
        border-radius: 5px;
        margin-right: 20px;
        option {
            font-size: 15px;
        }
        &:focus {
            border: none;
            outline: none;
        }
    }

    input {
        border: none;
        outline: none;
        border-bottom: 2px solid #DADADA;
        width: 274px;
        height: 30px;

        &:focus {
            border: none;
            outline: none;
            border-bottom: 2px solid #00A4F7;
        }
    }
`;

const Notes = () => {
    const { globalState, dispatch } = useContext(store);
    const { noteList } = globalState;

    const [state, setState] = useState({
        filterState: 'open',
        searchState: '',
    })

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

    const filterByStatus = () => {
        if (state.filterState === 'open' || state.filterState === 'closed' || state.filterState === 'work') {
            dispatch({ type: 'FILTER_NOTES', payload: state.filterState });
        }

        return;
    }

    const searchNote = () => {
        dispatch({ type: 'SEARCH_ITEM', payload: state.searchState });
    }

    const handelFunctionsInput = ({ target }) => {
        if (target.name === 'filter') {
            setState({
                ...state,
                filterState: target.value
            })
        }

        if (target.name === 'search') {
            setState({
                ...state,
                searchState: target.value
            })
        }
    }
    
    return (
        <>
            <FunctionPanel>
                <div className='filter-area'>
                    <select name='filter' value={state.filterState} onChange={(e) => handelFunctionsInput(e)}>
                        <option value='open'>Открытые задачи</option>
                        <option value='work'>В работе</option>
                        <option value='closed'>Закрытые задачи</option>
                    </select>
                    <button 
                        className='btn'
                        onClick={filterByStatus}
                        disabled={noteList.length === 0 || state.filterState.length === 0}
                    >
                        Фильтр по статусам
                    </button>
                </div>
                <div className='search-area'>
                    <input
                        type='text'
                        name='search'
                        value={state.searchState}
                        onChange={(e) => handelFunctionsInput(e)}
                        placeholder='Введите полное название задачи или часть'
                    />
                    <button 
                        className='btn'
                        onClick={searchNote}
                        disabled={noteList.length === 0 || state.searchState.length === 0}
                    >
                        Поиск
                    </button>
                </div>
            </FunctionPanel>
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
                                            <button
                                                type='button'
                                                className='btn'
                                                onClick={() => removeItem(id)}                                         
                                            >
                                                &ndash;
                                            </button>
                                        </td>
                                    </Item>
                                )
                            })
                        }
                    </tbody>
                </table>

                <button className='btn' onClick={() => toCreateTask()}>
                    Добавить задачу
                </button>
            </NotesContainer>
        </>
    )
}

export default Notes;