import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import rootReducer from "./reducers";
import reduxThunk from "redux-thunk";
import socketIOClient from "socket.io-client";
import { createSocketMiddleWare } from "./socketMiddleWare";
import { socket } from "../settings";
const webSocketMiddleWare = createSocketMiddleWare(socket);
const middleware = composeWithDevTools(
  applyMiddleware(webSocketMiddleWare, reduxThunk)
);

export default createStore(rootReducer, {}, middleware);
