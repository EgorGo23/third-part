import React, { createContext, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  activeScreen: {
    form: false,
    list: true,
  },
  noteText: {
    header: '',
    desc: '',
  },
  noteList: [
    {id: uuidv4(), note: { header: 'Покупки', desc: 'Купить продукты' }, status: 'open'},
    {id: uuidv4(), note: { header: 'Спорт', desc: 'Сходить на тренеровку' }, status: 'work'},
    {id: uuidv4(), note: { header: 'Работа', desc: 'Сделать тестовое задание' }, status: 'closed'}
  ],
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
const [globalState, dispatch] = useReducer((state, { type, payload }) => {
      switch (type) {
          case 'SET_ACTIVE_SCREEN':
            return {
              ...state,
              activeScreen: payload
            };

          case 'CHANGE_HEADER_TEXT': 
            return {
              ...state,
              noteText: {
                ...state.noteText,
                header: payload
              }
            };

          case 'CHANGE_DESC_TEXT': 
            return {
              ...state,
              noteText: {
                ...state.noteText,
                desc: payload
              }
            };

          case 'CLEAR_FIELD': 
            return {
              ...state,
              noteText: {
                header: '',
                desc: '',
              },
            };

          case 'ADD_ITEM': 
            return {
              ...state,
              noteList: [
                payload,
                ...state.noteList
              ]
            };
          
          case 'REMOVE_ITEM': 
            return {
              ...state,
              noteList: state.noteList.filter((element) => element.id !== payload)
            };

          case 'TOGGLE_ITEM':
            const currentElementIndex = state.noteList.findIndex((element) => element.id === payload);
            let newItem;

            if (state.noteList[currentElementIndex].status === 'open') {
              newItem = {
                ...state.noteList[currentElementIndex],
                status: 'work',
              };
            }

            if (state.noteList[currentElementIndex].status === 'work') {
              newItem = {
                ...state.noteList[currentElementIndex],
                status: 'closed',
              };
            }

            if (state.noteList[currentElementIndex].status === 'closed') {
              newItem = {
                ...state.noteList[currentElementIndex],
                status: 'open',
              };
            }

            return {
              ...state,
              noteList: [
                ...state.noteList.slice(0, currentElementIndex),
                newItem,
                ...state.noteList.slice(currentElementIndex + 1),
              ] 
            };
          case 'FILTER_NOTES':          
            return {
              ...state,
              noteList: state.noteList.filter((element) => element.status === payload)
            }

          case 'SEARCH_ITEM':
            console.log(state.noteList)
            return {
              ...state,
              noteList: state.noteList.filter((element) => element.note.header.toLowerCase().includes(payload.toLowerCase()))
            }   
          default:
            throw new Error();
      }
    }, initialState);

    return <Provider value={{ globalState, dispatch }}>{children}</Provider>;
};


export { store, StateProvider };