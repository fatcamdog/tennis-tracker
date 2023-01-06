import { IMatch } from './interfaces';

export default function matchLogic(
  won: boolean,
  match: IMatch,
  duration: number,
  unreturned: boolean,
  fault: string,
  side: string,
  location: string,
  stroke: string
): IMatch {
  // !! Declaring point, game, set, server, final set, and points for tiebreaker
  let nextPoint: number = 0;
  let nextDisplayPoint: string = '0';
  let loserPoint: number = 0;
  let loserDisplayPoint: string = '0';

  let nextGames: number[] = [0];
  let loserGames: number[] = [0];

  let nextSet: number = 0;
  let loserSet: number = 0;

  let matchWon: boolean = false;
  let matchFinished: boolean = false;

  let tiebreaker: boolean = false;
  let serving: boolean = match.serving;

  let matchSide: string;

  if (side === 'deuce') matchSide = 'ad';
  else matchSide = 'deuce';

  let finalSet: boolean = false;
  let tiebreakerPoints: number = 0;

  // !! Handle end of a game
  function gameOver() {
    nextGames = [...nextGames];
    nextGames[nextSet + loserSet]++;

    nextPoint = 0;
    nextDisplayPoint = '0';
    loserPoint = 0;
    loserDisplayPoint = '0';

    serving = !serving;
    matchSide = 'deuce';
  }

  // !! Assigning winner to the point, game, and set values
  if (won) {
    nextPoint = match.userPoints;
    loserPoint = match.oppPoints;

    nextGames = match.userGames;
    loserGames = match.oppGames;

    nextSet = match.userSets;
    loserSet = match.oppSets;
  } else {
    nextPoint = match.oppPoints;
    loserPoint = match.userPoints;

    nextGames = match.oppGames;
    loserGames = match.userGames;

    nextSet = match.oppSets;
    loserSet = match.userSets;
  }

  // !! Check if a tiebreak
  if (
    nextGames[nextSet + loserSet] === loserGames[nextSet + loserSet] &&
    nextGames[nextSet + loserSet] === 6
  ) {
    tiebreaker = true;
    tiebreakerPoints = 7;
  }

  // !! Check if a final set
  if (nextSet + loserSet + 1 === match.numSets) {
    finalSet = true;
  }

  // !! Check if a tiebreak for final set
  if (finalSet && match.tiebreak && match.numSets !== 1) {
    tiebreakerPoints = 10;
    tiebreaker = true;
  }

  // !! Increase point by one
  nextPoint++;

  // !! Check if it is not a tiebreaker and add points normally
  if (!tiebreaker) {
    if (nextPoint === 0) nextDisplayPoint = '0';
    if (nextPoint === 1) nextDisplayPoint = '15';
    if (nextPoint === 2) nextDisplayPoint = '30';
    if (nextPoint === 3) nextDisplayPoint = '40';

    if (loserPoint === 0) loserDisplayPoint = '0';
    if (loserPoint === 1) loserDisplayPoint = '15';
    if (loserPoint === 2) loserDisplayPoint = '30';
    if (loserPoint === 3) loserDisplayPoint = '40';

    // !! Check if playing with ads or sudden death
    if (!match.suddenDeath) {
      // playing with ads
      if (nextPoint > 3 && nextPoint - loserPoint === 1) {
        nextDisplayPoint = 'AD';
        loserDisplayPoint = '40';
      }
      if (nextPoint === loserPoint && nextPoint > 3) {
        nextDisplayPoint = '40';
        loserDisplayPoint = '40';
      }
      if (nextPoint >= 4 && nextPoint - loserPoint >= 2) {
        gameOver();
      }
    } else {
      // playing without ads
      if (nextPoint === 4) {
        gameOver();
      }
    }

    // !! Handle end of a set
    if (
      nextGames[nextSet + loserSet] >= 6 &&
      nextGames[nextSet + loserSet] <= 7 &&
      nextGames[nextSet + loserSet] - loserGames[nextSet + loserSet] >= 2
    ) {
      nextSet++;

      nextGames = [...nextGames, 0];
      loserGames = [...loserGames, 0];
    }

    // !! Handle a tiebreaker
  } else {
    if ((nextPoint + loserPoint) % 2 !== 0) {
      serving = !serving;
    }

    nextDisplayPoint = nextPoint.toString();
    loserDisplayPoint = loserPoint.toString();

    if (nextPoint >= tiebreakerPoints && nextPoint - loserPoint >= 2) {
      nextGames = [...nextGames];
      nextGames[nextSet + loserSet]++;

      nextSet++;
      nextGames = [...nextGames, 0];
      loserGames = [...loserGames, 0];

      nextPoint = 0;
      loserPoint = 0;
      nextDisplayPoint = '0';
      loserDisplayPoint = '0';
    }
  }

  // !! Handle end of a match
  if (nextSet === match.numSets / 2 + 0.5) {
    if (won) matchWon = true;
    else matchWon = false;

    matchFinished = true;

    nextGames.pop();
    loserGames.pop();
  }

  // !! Returning match scores, points, games, sets, and end of match
  if (won) {
    return {
      ...match,
      opponent: match.opponent,
      won: matchWon,
      finished: matchFinished,
      userSets: nextSet,
      oppSets: loserSet,
      userGames: nextGames,
      oppGames: loserGames,
      userPoints: nextPoint,
      oppPoints: loserPoint,
      userDisplayPoints: nextDisplayPoint,
      oppDisplayPoints: loserDisplayPoint,
      numSets: match.numSets,
      trackingMode: match.trackingMode,
      duration,
      tiebreak: match.tiebreak,
      serving,
      side: matchSide,
      suddenDeath: match.suddenDeath,

      pointDetails: [...match.pointDetails],
      pointWon: true,
      unreturned,
      fault,
      pointSide: side,
      location,
      stroke,
      wasServing: match.serving,
    };
  } else {
    return {
      ...match,
      opponent: match.opponent,
      won: matchWon,
      finished: matchFinished,
      userSets: loserSet,
      oppSets: nextSet,
      userGames: loserGames,
      oppGames: nextGames,
      userPoints: loserPoint,
      oppPoints: nextPoint,
      userDisplayPoints: loserDisplayPoint,
      oppDisplayPoints: nextDisplayPoint,
      numSets: match.numSets,
      trackingMode: match.trackingMode,
      duration,
      tiebreak: match.tiebreak,
      serving,
      side: matchSide,
      suddenDeath: match.suddenDeath,

      pointDetails: [...match.pointDetails],
      pointWon: won,
      unreturned,
      fault,
      pointSide: side,
      location,
      stroke,
      wasServing: match.serving,
    };
  }
}
