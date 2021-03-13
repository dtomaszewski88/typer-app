import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';

type words = [string?]

interface TyperState {
  score: number;
  words: words;
  currentWord: string;
  localText: string;
  remoteText: string;
}

const initialState: TyperState = {
  score: 0,
  words: [],
  currentWord: '',
  localText: '',
  remoteText: ''
};

const popWord = (state: TyperState, words: words) => {
  const [currentWord, ...rest] = words;
  state.words = rest;
  state.currentWord = currentWord || '';
}

export const typerSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    fetchWordsSuccess: (state, action: PayloadAction<words>) => {
      popWord(state, action.payload)
      console.log('fetchWordsSuccess words', state.words)
      console.log('fetchWordsSuccess currentWord', state.currentWord)
    },
    updateLocalText: (state, action: PayloadAction<string>) => {
      state.localText = action.payload;
    },
    updateRemoteText: (state, action: PayloadAction<string>) => {
      state.remoteText = action.payload;
    },
    completeWord: (state) => {
      console.log('completeWord')
      popWord(state, state.words)
      state.localText = '';
    },
  },
});

export const { updateLocalText, updateRemoteText, fetchWordsSuccess, completeWord } = typerSlice.actions;

export const getLocalText = (state: RootState) => state.typer.localText;
export const getRemoteText = (state: RootState) => state.typer.remoteText;
export const getCurrentWord = (state: RootState) => state.typer.currentWord;

export const updateLocalTextGuarded = (value: string): AppThunk => (dispatch, getState) => {
  const currentWord = getCurrentWord(getState())
  if (!currentWord.startsWith(value)) {
    return;
  }
  if (currentWord === value) {
    dispatch(completeWord())
    return;
  }

  dispatch(updateLocalText(value))
};


export default typerSlice.reducer;