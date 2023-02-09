// // Interfaces for matches
export interface IMatch {
  id: string;
  opponent: string;
  won: boolean;
  finished: boolean;
  userSets: number;
  oppSets: number;
  userGames: number[];
  oppGames: number[];
  userPoints: number;
  oppPoints: number;
  userDisplayPoints: string;
  oppDisplayPoints: string;
  pointDetails: IPointDetails[];

  createdAt: string;
  numSets: number;
  trackingMode: string;
  duration: number;
  tiebreak: boolean;
  serving: boolean;
  suddenDeath: boolean;

  pointWon?: boolean;
  pointSide?: string;
  method?: string;
  hitter?: string;
  wasServing?: boolean;
  returned?: boolean;
  fault?: string;
  side?: string;
  location?: string;
  stroke?: string;
  firstServeLocation?: string;
  secondServeLocation?: string;
  userReaction?: string;
  opponentReaction?: string;
  pointNotes?: string;
}

export interface IPointDetails {
  won?: boolean;
  method?: string;
  hitter?: string;
  serving?: boolean;
  userGames?: number[];
  oppGames?: number[];
  userDisplayPoints?: string;
  oppDisplayPoints?: string;
  returned?: boolean;
  fault?: string;
  side?: string;
  location?: string;
  stroke?: string;
  firstServeLocation?: string;
  secondServeLocation?: string;
  userReaction?: string;
  opponentReation?: string;
  pointNotes?: string;
}

export interface IMatchProps {
  match: IMatch;
}

export interface IMatchState {
  ongoingMatches: IMatch[];
  finishedMatches: IMatch[];
  match: IMatch;
}

export interface IMatchAllResponse {
  ongoingMatches: IMatch[];
  finishedMatches: IMatch[];
}

// // Interfaces for users
export interface IUser {
  name: string;
  email: string;
  password: string;
  token: string;
}

export interface IUserState {
  user: IUser | null;
}

export interface IUserProps {
  user: IUser;
}

// // Prop for user and match
export interface IMatchUserProps {
  match: IMatch;
  user: IUser;
}

// // Prop for duration/timer
export interface IDuration {
  duration: number;
}

// // Functions for updating rally point
export interface IHandleShotLocationProps {
  handleShotLocation: (arg0: string, arg1: boolean) => void;
}

export interface IHandleHitterStageProps {
  handleShotHitter: (arg0: string) => void;
  match: IMatch;
  user: IUser;
}

export interface IHandleMethodStageProps {
  handleShotMethod: (arg0: string) => void;
  hitter: string;
}

export interface IHandleSideStageProps {
  handleShotSide: (arg0: string) => void;
  hitter: string;
}

export interface IHandleTypeStageProps {
  handleShotType: (arg0: string) => void;
  hitter: string;
}

export interface IHandlePointWonStageProps {
  handlePointWon: (arg0: boolean) => void;
}

// duration state interface
export interface IMatchDurationProps {
  match: IMatch;
  duration: number;
  setDuration: any;
}

// // Functions for updating serve point
export interface IHandleServeLocationProps {
  handleServeLocation: (arg0: string, arg1: boolean) => void;
  fault: string;
}

export interface IHandleServeReturnedProps {
  handleShotReturned: (arg0: boolean) => void;
}

export interface IHandleShotStrokeProps {
  handleShotStroke: (arg0: string) => void;
  shotReturned: boolean;
}

export interface IHandleStartingPointWonProps {
  handlePointWon: (arg0: boolean) => void;
  match: IMatch;
  user: IUser;
}

// // Interfaces for updating mentality point tracker
export interface IHandleMatchUserPointWonProps {
  match: IMatch;
  user: IUser;
  handlePointWon: (arg0: boolean) => void;
}

export interface IHandleUserReactionProps {
  user: boolean;
  userName: string;
  opponentName: string;
  handleMentalReaction: (arg0: boolean, arg1: string) => void;
}

export interface IHandlePointNoteProps {
  handlePointNotes: (arg0: boolean, arg1: string) => void;
}

// // Interface for court diagram statistics
export interface IMatchUserStatsProps {
  match: IMatch;
  user: boolean;
}

export interface IUserStatsProps {
  user: string;
}
