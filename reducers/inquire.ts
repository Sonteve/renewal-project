import { AxiosError } from "axios";
import {
  createReducer,
  createAsyncAction,
  createAction,
  ActionType,
} from "typesafe-actions";
import { Inquire, InquireResponse } from "../interfaces/inquire";
import produce from "immer";

export const SEND_INQUIRE_REQUEST = "SEND_INQUIRE_REQUEST";
export const SEND_INQUIRE_SUCCESS = "SEND_INQUIRE_SUCCESS";
export const SEND_INQUIRE_FAILURE = "SEND_INQUIRE_FAILURE";

export const SET_INQUIRE_STATE = "SET_INQUIRE_STATE";

export const INIT_INQUIRE = "INIT_INQUIRE";

export const initInquire = createAction(INIT_INQUIRE)();
export const sendInquireAction = createAsyncAction(
  SEND_INQUIRE_REQUEST,
  SEND_INQUIRE_SUCCESS,
  SEND_INQUIRE_FAILURE
)<Inquire, InquireResponse, AxiosError>();

export const setInquireState = createAction(SET_INQUIRE_STATE)<boolean>();

type InquireAction = ActionType<
  typeof sendInquireAction | typeof initInquire | typeof setInquireState
>;

export interface InquireState {
  inquireContent: string | null;
  sendInquireLoading: boolean;
  sendInquireDone: boolean;
  sendInquireError: AxiosError | null;
  inquireState: boolean;
}

const initialState: InquireState = {
  inquireContent: null,
  sendInquireLoading: false,
  sendInquireDone: false,
  sendInquireError: null,
  inquireState: false,
};

const inquire = createReducer<InquireState, InquireAction>(initialState, {
  [SET_INQUIRE_STATE]: (state, action) =>
    produce(state, (draft) => {
      draft.inquireState = action.payload;
    }),
  [INIT_INQUIRE]: (state) =>
    produce(state, (draft) => {
      draft.inquireContent = null;
      draft.sendInquireDone = false;
      draft.sendInquireError = null;
    }),
  [SEND_INQUIRE_REQUEST]: (state) =>
    produce(state, (draft) => {
      draft.sendInquireLoading = true;
      draft.sendInquireError = null;
    }),
  [SEND_INQUIRE_SUCCESS]: (state, action) =>
    produce(state, (draft) => {
      draft.sendInquireLoading = false;
      draft.sendInquireDone = true;
      draft.inquireContent = action.payload.data;
    }),
  [SEND_INQUIRE_FAILURE]: (state, action) =>
    produce(state, (draft) => {
      draft.sendInquireLoading = false;
      draft.sendInquireError = action.payload;
    }),
});

export default inquire;
