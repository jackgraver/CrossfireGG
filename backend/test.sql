-- INSERT INTO teams (team_id, team_name, seed, win, loss, paid, joined_tournament)
-- VALUES ('A', 'ATeam', 1, 0, 0, 1, 1), ('B', 'BTeam', 2, 0, 0, 1, 1), ('C', 'CTeam', 3, 0, 0, 1, 1), ('D', 'DTeam', 4, 0, 0, 1, 1)

update teams set win = 0, loss = 0;
delete from matches;