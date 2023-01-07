import { createSlice } from '@reduxjs/toolkit';

import { IMatchState } from '../utils/interfaces';
import matchLogic from '../utils/matchLogic';

// Create initial state with empty match
const initialState: IMatchState = {
  ongoingMatches: [],
  finishedMatches: [],
  match: {
    id: '',
    won: false,
    finished: false,
    opponent: '',
    userSets: 0,
    oppSets: 0,
    userGames: [0],
    oppGames: [0],
    userPoints: 0,
    oppPoints: 0,
    userDisplayPoints: '0',
    oppDisplayPoints: '0',
    pointDetails: [{}],
    createdAt: '',
    numSets: 0,
    trackingMode: '',
    duration: 0,
    tiebreak: false,
    serving: false,
    suddenDeath: false,
  },
};

// Create slice with actions to track, create, and fetch matches
export const matchesSlice = createSlice({
  name: 'matches',
  initialState,
  reducers: {
    getOngoingMatches: (state, action) => {
      state.ongoingMatches = action.payload;
    },
    getFinishedMatches: (state, action) => {
      state.finishedMatches = action.payload;
    },
    getMatch: (state, action) => {
      state.ongoingMatches = action.payload;
    },
    createMatch: (state, action) => {
      state.ongoingMatches = [action.payload, ...state.ongoingMatches];
    },
    deleteMatch: (state) => {
      // state.match = initialState.match;
    },
    getTrackedMatch: (state, action) => {
      state.match = action.payload;
    },
    trackMatch: (state, action) => {
      state.match = matchLogic(
        action.payload.pointWon,
        action.payload.match,
        action.payload.duration,
        action.payload.unreturned,
        action.payload.fault,
        action.payload.side,
        action.payload.location,
        action.payload.stroke,
        action.payload.method
      );
    },
  },
});

export const {
  getOngoingMatches,
  getFinishedMatches,
  getMatch,
  createMatch,
  deleteMatch,
  getTrackedMatch,
  trackMatch,
} = matchesSlice.actions;
export default matchesSlice.reducer;
