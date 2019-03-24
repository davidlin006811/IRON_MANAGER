import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducers";
import reduxThunk from "redux-thunk";
import socketIOClient from "socket.io-client";
import { createSocketMiddleWare } from "./socketMiddleWare";
//export const socket = socketIOClient("http://localhost:3000");
const socket = socketIOClient("https://powerful-badlands-91453.herokuapp.com");
const webSocketMiddleWare = createSocketMiddleWare(socket);
const middleware = composeWithDevTools(
  applyMiddleware(webSocketMiddleWare, reduxThunk)
);

export default createStore(rootReducer, {}, middleware);
