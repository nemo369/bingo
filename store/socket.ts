/* eslint-disable camelcase */
import { ActionTree } from 'vuex';
import { SOCKET } from './mutations-types';

export const state = (): SocketState => ({
  connection: null,
  msgs: [],
  err: '',
});

export const getters = {
  getConnection: (state: SocketState) => state.connection,
  getMsgs: (state: SocketState) => state.msgs,
  getErr: (state: SocketState) => state.err,
};

export const mutations = {
  [SOCKET.SET_CONNECTION]: (state: SocketState, connection: WebSocket) =>
    (state.connection = connection),
  [SOCKET.ADD_MSG]: (state: SocketState, msg: SocketMsg) => {
    state.msgs = [...state.msgs, msg];
  },
  [SOCKET.ON_ERROR]: (state: SocketState, errMSg: string) => {
    state.connection = null;
    state.err = errMSg;
  },
};
export const actions: ActionTree<SocketState, SocketState> = {
  initPlayerSocket(
    { commit }: any,
    data: { game_id: number; nickname: string }
  ) {
    // this.gameSocket = new WebSocket(`wss://echo.websocket.org`);
    const gameSocket = new WebSocket(
      `${process.env.socketUrl}/ws/game/${data.game_id}/`
    );
    commit(SOCKET.SET_CONNECTION, gameSocket);

    gameSocket.onopen = () => {
      gameSocket.send(
        JSON.stringify({
          message_type: 'add.player',
          data,
        })
      );
      commit(SOCKET.ADD_MSG, 'User joined Game');
    };
    gameSocket.onmessage = (e) => {
      const msg = msgHandler(e);
      commit(SOCKET.ADD_MSG, msg);
    };
    gameSocket.onclose = () => {
      commit(SOCKET.ON_ERROR, 'Couldnt Find Server');
    };
  },
};

const msgHandler = (msg: MessageEvent): SocketMsg => {
  let data = {};
  try {
    data = JSON.parse(msg.data).message;
  } catch {
    data = { error: 'No Messege' };
  }
  const res = {
    type: msg.type,
    timeStamp: msg.timeStamp,
    data,
  };
  // NOT: cheeck https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_client_applications
  return res;
};

export interface SocketState {
  connection: WebSocket | null;
  msgs: SocketMsg[];
  err: string;
}

export interface SocketMsg {
  data: { [key: string]: any };
  timeStamp: number;
  type: string;
}
