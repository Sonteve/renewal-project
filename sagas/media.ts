import { takeLatest, call, put } from "redux-saga/effects";
import {
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
  GET_NEWS_FAILURE,
  getNewsAction,
  GET_YOUTUBE_REQUEST,
  GET_YOUTUBE_SUCCESS,
  GET_YOUTUBE_FAILURE,
  getYoutubeAction,
  GET_MORE_NEWS_REQUEST,
  GET_MORE_NEWS_SUCCESS,
  GET_MORE_NEWS_FAILURE,
  getMoreNewsAction,
  GET_MORE_YOUTUBE_REQUEST,
  GET_MORE_YOUTUBE_SUCCESS,
  GET_MORE_YOUTUBE_FAILURE,
  getMoreYoutubeAction,
} from "../reducers/media";
import { MediaParams } from "../interfaces/media";
import axios from "axios";
import moment from "moment";

function getNewsAPI(data: MediaParams) {
  const { itemCode, start, countPerPage } = data;
  return axios.get(
    `http://tapi.agripa.kr/media/news?itemCode=${itemCode}&baseDateTime=${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}&start=${start}&countPerPage=${countPerPage}`
  );
}

function* getNewsSaga(action: ReturnType<typeof getNewsAction.request>) {
  try {
    const result = yield call(getNewsAPI, action.payload);
    yield put({
      type: GET_NEWS_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    yield put({
      type: GET_NEWS_FAILURE,
      payload: error.response.data,
    });
  }
}

function getYoutubeAPI(data: MediaParams) {
  const { itemCode, start, countPerPage } = data;
  return axios.get(
    `http://tapi.agripa.kr/media/youtube?itemCode=${itemCode}&baseDateTime=${moment().format(
      "YYYY-MM-DD HH:mm:ss"
    )}&start=${start}&countPerPage=${countPerPage}`
  );
}

function* getYoutubeSaga(action: ReturnType<typeof getYoutubeAction.request>) {
  try {
    const result = yield call(getYoutubeAPI, action.payload);
    yield put({
      type: GET_YOUTUBE_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    yield put({
      type: GET_YOUTUBE_FAILURE,
      payload: error.response.data,
    });
  }
}

function* getMoreNewsSaga(
  action: ReturnType<typeof getMoreNewsAction.request>
) {
  try {
    const result = yield call(getNewsAPI, action.payload);
    yield put({
      type: GET_MORE_NEWS_SUCCESS,
      payload: result.data,
    });
  } catch (error) {
    yield put({
      type: GET_MORE_NEWS_FAILURE,
      payload: error.response.data,
    });
  }
}

export function* mediaSaga() {
  yield takeLatest(GET_NEWS_REQUEST, getNewsSaga);
  yield takeLatest(GET_YOUTUBE_REQUEST, getYoutubeSaga);
  yield takeLatest(GET_MORE_NEWS_REQUEST, getMoreNewsSaga);
}