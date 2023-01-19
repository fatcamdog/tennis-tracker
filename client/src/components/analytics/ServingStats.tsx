import { FC } from 'react';

import { IMatchUserProps, IPointDetails } from '../../utils/interfaces';

const ServingStats: FC<IMatchUserProps> = ({ match, user }) => {
  // calculate what percent of first serves the user makes
  const firstServePercentage = (user: boolean): string => {
    let firstServes: number = 0;
    let firstServesIn: number = 0;

    match.pointDetails.map((point) => {
      if (point.serving === user) {
        if (point.fault === 'first') firstServesIn++;
        firstServes++;
      }
    });

    return `${Math.round((firstServesIn / firstServes) * 100)}%`;
  };

  // finds win percentage when first serve goes in
  const firstServeWinPercentage = (user: boolean): string => {
    let firstServes: number = 0;
    let firstServesWon: number = 0;

    match.pointDetails.map((point) => {
      if (point.serving === user) {
        if (point.fault === 'first') {
          if (point.won === user) firstServesWon++;
          firstServes++;
        }
      }
    });

    return `${Math.round((firstServesWon / firstServes) * 100)}%`;
  };

  // calculates second serve percentage
  const secondServePercentage = (user: boolean): string => {
    let secondServes: number = 0;
    let secondServesIn: number = 0;

    match.pointDetails.map((point) => {
      if (point.serving === user) {
        if (point.fault === 'second') {
          secondServes++;
          secondServesIn++;
        }
        if (point.fault === 'double') secondServes++;
      }
    });

    return `${Math.round((secondServesIn / secondServes) * 100)}%`;
  };

  // win percentage on second serve
  const secondServeWinPercentage = (user: boolean): string => {
    let secondServes: number = 0;
    let secondServesWon: number = 0;

    match.pointDetails.map((point) => {
      if (point.serving === user) {
        if (point.fault === 'second') {
          if (point.won === user) secondServesWon++;
          secondServes++;
        }
      }
    });

    return `${Math.round((secondServesWon / secondServes) * 100)}%`;
  };

  // find amount of double faults
  const doubleFaultCount = (user: boolean): number => {
    let total: number = 0;

    match.pointDetails.map((point) => {
      if (point.serving === user) {
        if (point.fault === 'double') total++;
      }
    });

    return total;
  };

  // find amount of aces
  const aceCount = (user: boolean): number => {
    let total: number = 0;

    match.pointDetails.map((point) => {
      if (point.serving === user) {
        if (point.stroke === 'ace') total++;
      }
    });

    return total;
  };

  // find amount of breakpoints saved
  const breakPointsSaved = (user: boolean): string => {
    let totalBreakPoints: number = 0;
    let breakPointsSaved: number = 0;

    let pushedArray: IPointDetails[] = [...match.pointDetails];
    pushedArray.unshift(match.pointDetails[0]);

    match.pointDetails.map((point: IPointDetails, index: number) => {
      if (point.serving && user) {
        if (
          (point.oppDisplayPoints === '40' &&
            pushedArray[index].oppDisplayPoints === '40' &&
            pushedArray[index].userDisplayPoints !== '40' &&
            pushedArray[index].userDisplayPoints !== 'AD') ||
          pushedArray[index].oppDisplayPoints === 'AD'
        ) {
          if (point.won) breakPointsSaved++;
          totalBreakPoints++;
        } else if (
          point.userDisplayPoints === '0' &&
          point.oppDisplayPoints === '0' &&
          (pushedArray[index].oppDisplayPoints === '40' ||
            pushedArray[index].oppDisplayPoints === 'AD')
        ) {
          totalBreakPoints++;
        }
      } else if (!point.serving && !user) {
        if (
          (point.userDisplayPoints === '40' &&
            pushedArray[index].userDisplayPoints === '40' &&
            pushedArray[index].oppDisplayPoints !== '40' &&
            pushedArray[index].oppDisplayPoints !== 'AD') ||
          pushedArray[index].userDisplayPoints === 'AD'
        ) {
          if (!point.won) breakPointsSaved++;
          totalBreakPoints++;
        } else if (
          point.oppDisplayPoints === '0' &&
          point.userDisplayPoints === '0' &&
          (pushedArray[index].userDisplayPoints === '40' ||
            pushedArray[index].userDisplayPoints === 'AD')
        ) {
          totalBreakPoints++;
        }
      }
    });

    return `${breakPointsSaved}/${totalBreakPoints}`;
  };

  // find percentage of forehand returns and backhand returns
  const percentageForehandAndBackhandReturns = (
    user: boolean,
    stroke: string
  ): string => {
    let returnCount: number = 0;
    let strokeReturnCount: number = 0;

    match.pointDetails.map((point) => {
      if (point.serving === user) {
        if (point.stroke === stroke) strokeReturnCount++;
        returnCount++;
      }
    });

    return `${Math.round((strokeReturnCount / returnCount) * 100)}%`;
  };

  const percentageForehandAndBackhandReturnsWon = (
    user: boolean,
    stroke: string
  ): string => {
    let returnsHit: number = 0;
    let strokeReturnsWon: number = 0;

    match.pointDetails.map((point) => {
      if (point.serving === user) {
        if (point.stroke === stroke) {
          if (point.won) strokeReturnsWon++;
          returnsHit++;
        }
      }
    });

    return `${Math.round((strokeReturnsWon / returnsHit) * 100)}%`;
  };

  return (
    <div>
      <div>
        <h3>{user.name}:</h3>
        <div>
          <p>First serve percentage: {firstServePercentage(true)}</p>
          <p>First serve win percentage: {firstServeWinPercentage(true)}</p>
          <p>Second serve percentage: {secondServePercentage(true)}</p>
          <p>Second serve win percentage: {secondServeWinPercentage(true)}</p>
          <p>Double faults: {doubleFaultCount(true)}</p>
          <p>Aces: {aceCount(true)}</p>
          <p>Break points saved: {breakPointsSaved(true)}</p>
          <p>
            Percentage serves to forehand:{' '}
            {percentageForehandAndBackhandReturns(true, 'forehand')}
          </p>
          <p>
            Percentage serves to backhand:{' '}
            {percentageForehandAndBackhandReturns(true, 'backhand')}
          </p>
          <p>
            Percentage points won on forehand return:{' '}
            {percentageForehandAndBackhandReturnsWon(true, 'forehand')}
          </p>
          <p>
            Percentage points won on backhand return:{' '}
            {percentageForehandAndBackhandReturnsWon(true, 'backhand')}
          </p>
        </div>
      </div>
      <br />
      <div>
        <h3>{match.opponent}</h3>
        <div>
          <p>First serve percentage: {firstServePercentage(false)}</p>
          <p>First serve win percentage: {firstServeWinPercentage(false)}</p>
          <p>Second serve percentage: {secondServePercentage(false)}</p>
          <p>Second serve win percentage: {secondServeWinPercentage(false)}</p>
          <p>Double faults: {doubleFaultCount(false)}</p>
          <p>Aces: {aceCount(false)}</p>
          <p>Break points saved: {breakPointsSaved(false)}</p>
          <p>
            Percentage serves to forehand:{' '}
            {percentageForehandAndBackhandReturns(false, 'forehand')}
          </p>
          <p>
            Percentage serves to backhand:{' '}
            {percentageForehandAndBackhandReturns(false, 'backhand')}
          </p>
          <p>
            Percentage points won on forehand return:{' '}
            {percentageForehandAndBackhandReturnsWon(false, 'forehand')}
          </p>
          <p>
            Percentage points won on backhand return:{' '}
            {percentageForehandAndBackhandReturnsWon(false, 'backhand')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServingStats;
