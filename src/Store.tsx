import * as React from 'react';
import * as io from 'socket.io-client'

import { reducer, IActions } from './Reducer';

const initState = {
    general: [
        {from: 'alice', msg: 'hi!'},
        {from: 'alice', msg: 'hi!'},
        {from: 'alice', msg: 'hi!'},
    ],
    randam: [
        {from: 'bob', msg: 'hello!'},
        {from: 'bob', msg: 'hello!'},
        {from: 'bob', msg: 'hello!'},
    ],
}

export type TTopics = 'general' | 'randam';

export type TChatIitemState = {
    from: string,
    msg: string,
}

export type TChatState = {
    [key in TTopics]: TChatIitemState[];
}

export interface IState {
    allChats?: TChatState;
    sendChatAction?: (value: ISendMsg) => void;
    users?: string[];
}

export const CTX = React.createContext<IState>({});

interface ISendMsg {
    from: string;
    msg: string;
    topic: TTopics;
}

let socket: SocketIOClient.Socket;

const sendChatAction = (data: ISendMsg) => {
    socket.emit('chat message', data);
}

const Store: React.FC = ({ children }): JSX.Element => {

    if (!socket) {
        socket = io(':3000');
        socket.on('chat message', (data: ISendMsg) => {
            dispatch({ type: 'RECEIVE_MESSAGE', payload: data });
        });
    }

    const [allChats, dispatch] = React.useReducer<React.Reducer<TChatState, IActions>>(reducer, initState)

    const users = ['alice', 'bob']; // サンプルなのでユーザー固定

    return (
        <CTX.Provider value={{ allChats, sendChatAction, users }}>
            {children}
        </CTX.Provider>
    )
}

export default Store;
