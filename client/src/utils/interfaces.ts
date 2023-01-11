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
  unreturned?: boolean;
  fault?: string;
  side?: string;
  location?: string;
  stroke?: string;
}

interface IPointDetails {
  won?: boolean;
  method?: string;
  hitter?: string;
  serving?: boolean;
  userGames?: number[];
  oppGames?: number[];
  userDisplayPoints?: string;
  oppDisplayPoints?: string;
  unreturned?: boolean;
  fault?: string;
  side?: string;
  location?: string;
  stroke?: string;
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

// // Functions for updating point
export interface IHandleShotLocationProps {
  handleShotLocation: (arg0: string) => void;
}

export interface IHandleHitterStageProps {
  handleShotHitter: (arg0: string) => void;
  match: IMatch;
  user: IUser;
}

export interface IHandleMethodStageProps {
  handleShotMethod: (arg0: string) => void;
}

export interface IHandleSideStageProps {
  handleShotSide: (arg0: string) => void;
}

export interface IHandleTypeStageProps {
  handleShotType: (arg0: string) => void;
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
