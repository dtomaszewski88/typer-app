import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {slice} from 'lodash'
import { AppThunk, RootState } from '../../app/store';

type words = [string?]

enum GameStatus {
  INIT,
  GAME_READY,
  GAME_COUNTDOWN,
  GAME_IN_PROGRESS,
  GAME_OVER,
}

type GameStatusStrings = keyof typeof GameStatus;


interface TyperState {
  status: GameStatusStrings;
  isStarted: boolean;
  isDone: boolean;
  countDown: number;
  errors: number;
  score: number;
  words: words;
  currentWord: string;
  currentWordIndex: number;
  localText: string;
  remoteText: string;
  startTime: number;
  endTime: number;
  errorTime: number;
}

export const INIT = 'INIT';
export const GAME_READY = 'GAME_READY';
export const GAME_COUNTDOWN = 'GAME_COUNTDOWN';
export const GAME_IN_PROGRESS = 'GAME_IN_PROGRESS';
export const GAME_OVER = 'GAME_OVER';

const initialState: TyperState = {
  status: INIT,
  isStarted: false,
  isDone: false,
  countDown: 0,
  errors: 0,
  score: 0,
  words: [],
  currentWord: '',
  currentWordIndex: 0,
  localText: '',
  remoteText: '',
  startTime: 0,
  endTime: 0,
  errorTime: 0,
};

const popWord = (state: TyperState) => {
  state.currentWordIndex++;
  state.startTime = Date.now();
  if (state.words.length === state.currentWordIndex) {
    state.status = GAME_OVER;
  }
  state.isDone = state.words.length === state.currentWordIndex;
}

const calcScore = (word: string, time: number, errors: number) => {
  const timeInSec = time / 1000
  const minScore = word.length * 500;
  const maxScore = Math.round((minScore * 5 / timeInSec) - errors * 100);
  console.log(minScore, maxScore, timeInSec)
  // return minScore;
  return Math.max(minScore, maxScore);
}


export const typerSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    countDownInit: (state, action: PayloadAction<number>) => {
      state.status = GAME_COUNTDOWN;
      state.countDown = action.payload;
      state.currentWordIndex = 0;
      state.isDone = false;
      state.isStarted = false;
    },
    countDownTick: (state) => {
      state.countDown--;
    },
    countDownDone: (state) => {
      state.status = GAME_IN_PROGRESS;
      state.countDown = 0;
      state.isStarted = true;
      state.startTime = Date.now();
    },
    fetchWordsSuccess: (state, action: PayloadAction<words>) => {
      state.status = GAME_READY;
      state.words = action.payload;
    },
    invalidInput: (state, action: PayloadAction<number>) => {
      state.errorTime = action.payload;
      state.errors++;
    },
    updateLocalText: (state, action: PayloadAction<string>) => {
      state.errorTime = 0;
      state.localText = action.payload;
    },
    updateRemoteText: (state, action: PayloadAction<string>) => {
      state.remoteText = action.payload;
    },
    completeWord: (state, action: PayloadAction<{ word: string, time: number }>) => {
      const { word, time } = action.payload;
      const timeDiff = time - state.startTime;
      state.score += calcScore(word, timeDiff, state.errors)
      state.localText = '';
      state.errors = 0;
      state.errorTime = 0;
      popWord(state)
      
    },
    gameReady: () => {

    }
  },
});

export const {
  updateLocalText,
  updateRemoteText,
  fetchWordsSuccess,
  completeWord,
  invalidInput,
  countDownInit,
  countDownTick,
  countDownDone
} = typerSlice.actions;

export const getStatus = (state: RootState) => state.typer.status;
export const getWords = (state: RootState) => state.typer.words;
// export const getRemainingWords = (state: RootState) => state.typer.words
export const getErrors = (state: RootState) => state.typer.errors;
export const getErrorTime = (state: RootState) => state.typer.errorTime;
export const getIsStarted = (state: RootState) => state.typer.isStarted;
export const getLocalText = (state: RootState) => state.typer.localText;
export const getRemoteText = (state: RootState) => state.typer.remoteText;
export const getCurrentWordIndex = (state: RootState) => state.typer.currentWordIndex;
export const getScore = (state: RootState) => state.typer.score;
export const getCountDown = (state: RootState) => state.typer.countDown;
export const getRemainingWords = createSelector(
  getWords,
  getCurrentWordIndex,
  (words, wordIndex) => slice(words, wordIndex + 1, wordIndex + 10)
)
export const getCurrentWord = createSelector(
  getIsStarted,
  getWords,
  getCurrentWordIndex,
  (isStarted, words, wordIndex) => {
    console.log('getCurrentWord', isStarted, words, wordIndex)
    if (!isStarted) {
      return ''
    }
    return words[wordIndex] || ''
  }
)



export const updateLocalTextGuarded = (value: string): AppThunk => (dispatch, getState) => {
  const currentWord = getCurrentWord(getState())
  if (!currentWord.startsWith(value)) {
    dispatch(invalidInput(Date.now()))
    return;
  }
  if (currentWord === value) {
    dispatch(completeWord({ word: currentWord, time: Date.now() }))
    return;
  }

  dispatch(updateLocalText(value))
};

export const updateWithKey = (key: string): AppThunk => (dispatch, getState) => {
  const state = getState();
  const currentWord = getCurrentWord(state);
  const localText = getLocalText(state);
  const isStarted = getIsStarted(state);
  if (!isStarted) {
    return;
  }

  const newVal = localText + key;
  console.log('currentWord', currentWord);
  console.log('localText', localText);
  if (!currentWord.startsWith(newVal)) {
    dispatch(invalidInput(Date.now()))
    return;
  }
  if (currentWord === newVal) {
    dispatch(completeWord({ word: currentWord, time: Date.now() }))
    return;
  }

  dispatch(updateLocalText(newVal))
};


export default typerSlice.reducer;