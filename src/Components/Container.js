import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Matches from "../Screens/Matches";
import Standings from "../Screens/Standings";
import Scorers from "../Screens/Scorers";
import Nav from "./Nav/Nav";
import changeLeagueTheme from "../utils/changeLeagueTheme";
import { fetchData } from "../utils/fetchData";
import LeagueDetails from "../utils/leagueDetails";
import LocalStorage from "../utils/localStorage";

const leagueDetails = new LeagueDetails();

export default function Container() {
  const { league, tab } = useParams();
  const leagueId = leagueDetails.getId(league);
  const [matchDay, setMatchDay] = useState(null);
  const [shortNames, setShortNames] = useState({});
  let TabToRender = Matches;

  useEffect(() => {
    setMatchDay(null);
    setShortNames({});
    changeLeagueTheme(league);
  }, [league]);

  useEffect(() => {
    console.log({ matchDay });
    matchDay === null &&
      fetchData(null, leagueId)
        .then((leagueDetails) => {
          setMatchDay(leagueDetails.currentSeason.currentMatchday);
          return LocalStorage.prototype.isTeamNamesOnLocalStorage(
            leagueId,
            leagueDetails.currentSeason.startDate
          );
        })
        .then((response) => {
          setShortNames({ league: leagueId, data: response });
        })
        .catch((err) => console.log(err));
  }, [matchDay]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, [tab]);

  switch (tab) {
    case "scorers":
      TabToRender = Scorers;
      break;
    case "standings":
      TabToRender = Standings;
      break;
    default:
      TabToRender = Matches;
      break;
  }
  return (
    <>
      <Nav leagueName={league} selectedTab={tab} />
      {matchDay && leagueId ? (
        <TabToRender matchDay={matchDay} shortNames={shortNames} />
      ) : (
        "Loading"
      )}
    </>
  );
}
