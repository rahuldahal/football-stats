import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { fetchData } from "../utils/fetchData";

const TeamInfo = ({ teamId, setSelectedTeam }) => {
  const [error, setError] = useState(null);
  const [teamInfo, setTeamInfo] = useState(null);

  console.log("team info");

  useEffect(() => {
    teamId &&
      fetchData("particularTeam", teamId).then(
        (result) => {
          console.log(result);
          setTeamInfo(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, [teamId]);

  return (
    <>
      <section className={teamInfo ? "teamInfo teamInfo--active" : "teamInfo"}>
        {teamInfo ? <Team /> : null}
      </section>
    </>
  );

  function Team() {
    const {
      activeCompetitions,
      address,
      area,
      crestUrl,
      email,
      founded,
      name,
      phone,
      shortName,
      venue,
      website,
    } = teamInfo;

    let { squad } = teamInfo;

    const goalkeepers = [],
      defenders = [],
      midfielders = [],
      attackers = [];
    let coach;

    squad.forEach((player) => {
      if (player.role === "COACH") {
        coach = player;
      }
      switch (player.position) {
        case "Goalkeeper":
          goalkeepers.push(player);
          break;
        case "Defender":
          defenders.push(player);
          break;
        case "Midfielder":
          midfielders.push(player);
          break;
        case "Attacker":
          attackers.push(player);
          break;
      }
    });

    squad = [
      {
        position: "goalkeepers",
        players: goalkeepers,
      },
      {
        position: "defenders",
        players: defenders,
      },
      {
        position: "midfielders",
        players: midfielders,
      },
      {
        position: "attackers",
        players: attackers,
      },
    ];

    return (
      <>
        <button
          className="teamInfo__collapse"
          onClick={() => {
            setSelectedTeam(null);
            setTeamInfo(null);
          }}
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <div className="teamInfo__cover"></div>
        <div
          className="teamInfo__logo"
          style={{ backgroundImage: `url(${crestUrl})` }}
        ></div>
        <h1 className="teamInfo__name">{name}</h1>
        <div className="details">
          <div className="general">
            <h2>General Info.</h2>
            <div className="general__content">
              <div className="general__info">
                <div className="general__country">
                  <h4>Country</h4>
                  <em>{area.name}</em>
                </div>
                <div className="general__activeCompetitions">
                  <h4>Active Competitions</h4>
                  {activeCompetitions.map((competition) => {
                    return <em key={competition.id}>{competition.name}</em>;
                  })}
                </div>
                <div className="general__stadium">
                  <h4>Stadium</h4>
                  <em>{venue}</em>
                </div>
                <div className="general__contact">
                  <h4>Contact</h4>
                  <address>{address}</address>
                  <a href={`mailto:${email}`} className="general__email">
                    <i className="fas fa-at"></i>
                    {email}
                  </a>
                  <a
                    href={website}
                    className="general__website"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    {website}
                  </a>
                </div>
              </div>
              <div className="general__form">
                <div className="match">
                  <h5>Penultimate Match</h5>
                  <div className="match__score">
                    <div className="match__home">
                      <h3 className="match__name">fetching...</h3>
                      <em className="match__goals"></em>
                    </div>
                    <div className="match__away">
                      <em className="match__goals"></em>
                      <h3 className="match__name">fetching...</h3>
                    </div>
                  </div>
                </div>

                <div className="match">
                  <h5>Last Match</h5>
                  <div className="match__score">
                    <div className="match__home">
                      <h3 className="match__name">fetching...</h3>
                      <em className="match__goals"></em>
                    </div>
                    <div className="match__away">
                      <em className="match__goals"></em>
                      <h3 className="match__name">fetching...</h3>
                    </div>
                  </div>
                </div>

                <div className="match">
                  <h5>Next Match</h5>
                  <div className="match__score">
                    <div className="match__home">
                      <h3 className="match__name">fetching...</h3>
                    </div>
                    <em>v/s</em>
                    <div className="match__away">
                      <h3 className="match__name">fetching...</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="teamSquad">
            <h2>Squad</h2>
            <div className="manager">
              <h3>Manager</h3>
              <div className="player">
                <h4 className="player__name">{coach.name}</h4>
                <em className="player__nationality">{coach.nationality}</em>
                <small className="player__age">
                  {new Date().getFullYear() -
                    new Date(coach.dateOfBirth).getFullYear()}{" "}
                  yrs
                </small>
              </div>
            </div>
            <div className="squad">
              {squad.map((s) => {
                return (
                  <div
                    key={`squad__${s.position}`}
                    className={`squad__${s.position}`}
                  >
                    <h3>{s.position}</h3>
                    <div className="players">
                      {s.players.map((player) => {
                        return (
                          <div key={player.id} className="player">
                            <h4 className="player__name">{player.name}</h4>
                            <em className="player__nationality">
                              {player.nationality}
                            </em>
                            <small className="player__age">
                              {new Date().getFullYear() -
                                new Date(player.dateOfBirth).getFullYear()}{" "}
                              yrs
                            </small>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default TeamInfo;
