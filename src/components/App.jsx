import React, { useContext } from 'react';
import { store } from '../store';
import styled from 'styled-components';
import Form from './Form';
import Notes from './Notes';

const AppContainer = styled.div`
    width: 70%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-flow: column;
    align-items: center;
    position: relative;

    h1 {
        opacity: 0.7;
    }
`;



const renderScreen = (screens) => {
    for (let screen in screens) {
        if (screen === 'form' && screens[screen]) {
            return (
                <Form />
            )
        }

        if (screen === 'list' && screens[screen]) {
            return (
                <Notes />
            )
        }
    }
}

const App = () => {
    const { globalState, dispatch } = useContext(store);
    const { activeScreen } = globalState;

    return (
        <AppContainer>
            <h1>TODO LIST</h1>

            {
                renderScreen(activeScreen)
            }
        </AppContainer>
    )
}

export default App;