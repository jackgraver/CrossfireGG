CREATE TABLE metadata (
            key TEXT PRIMARY KEY,
            value TEXT
        );
CREATE TABLE sqlite_sequence(name,seq);
CREATE TABLE IF NOT EXISTS "tournament" (
            t_id STRING PRIMARY KEY,
            t_name TEXT,
            start_date INTEGER,
            end_date INTEGER
        );
CREATE TABLE IF NOT EXISTS "sub_tournament" (
            sub_t_id STRING PRIMARY KEY,
            t_id STRING,
            t_name TEXT,
            start_date INTEGER,
            end_date INTEGER,
            FOREIGN KEY (t_id) REFERENCES "tournament"(t_id)
        );
CREATE TABLE team (
	team_id_i VARCHAR NOT NULL, 
	team_id VARCHAR NOT NULL, 
	sub_t_id VARCHAR, 
	team_name VARCHAR NOT NULL, 
	team_logo VARCHAR, 
	seed INTEGER NOT NULL, 
	win INTEGER NOT NULL, 
	loss INTEGER NOT NULL, 
	paid INTEGER NOT NULL, 
	joined_tournament INTEGER NOT NULL, 
	PRIMARY KEY (team_id_i), 
	UNIQUE (team_id, sub_t_id), 
	FOREIGN KEY(sub_t_id) REFERENCES sub_tournament (sub_t_id)
);
CREATE TABLE IF NOT EXISTS "match" (
	match_id VARCHAR NOT NULL, 
	sub_t_id VARCHAR, 
	status VARCHAR, 
	scheduled_at INTEGER, 
	round VARCHAR, 
	faceit_url VARCHAR, 
	team1_id VARCHAR, 
	team2_id VARCHAR, 
	winner VARCHAR, 
	team1_score INTEGER, 
	team2_score INTEGER, 
	PRIMARY KEY (match_id), 
	FOREIGN KEY(sub_t_id) REFERENCES sub_tournament (sub_t_id)
);
CREATE TABLE player (
	player_id_i VARCHAR NOT NULL, 
	player_id VARCHAR NOT NULL, 
	team_id VARCHAR NOT NULL, 
	sub_t_id VARCHAR, 
	player_name VARCHAR NOT NULL, 
	player_logo VARCHAR, 
	PRIMARY KEY (player_id_i), 
	UNIQUE (player_id, sub_t_id), 
	FOREIGN KEY(team_id) REFERENCES team (team_id), 
	FOREIGN KEY(sub_t_id) REFERENCES sub_tournament (sub_t_id)
);
CREATE TABLE map (
	map_id VARCHAR NOT NULL, 
	match_id VARCHAR NOT NULL, 
	map_name VARCHAR NOT NULL, 
	round INTEGER NOT NULL, 
	winner_id VARCHAR NOT NULL, 
	team1_score INTEGER NOT NULL, 
	team2_score INTEGER NOT NULL, 
	PRIMARY KEY (map_id), 
	FOREIGN KEY(match_id) REFERENCES "match" (match_id), 
	FOREIGN KEY(winner_id) REFERENCES team (team_id)
);
CREATE TABLE player_stats (
	ps_id VARCHAR NOT NULL, 
	player_id VARCHAR NOT NULL, 
	match_id VARCHAR NOT NULL, 
	map_id VARCHAR NOT NULL, 
	kills INTEGER NOT NULL, 
	deaths INTEGER NOT NULL, 
	assists INTEGER NOT NULL, 
	adr INTEGER NOT NULL, 
	damage INTEGER NOT NULL, 
	PRIMARY KEY (ps_id), 
	FOREIGN KEY(player_id) REFERENCES player (player_id), 
	FOREIGN KEY(match_id) REFERENCES "match" (match_id), 
	FOREIGN KEY(map_id) REFERENCES map (map_id)
);
CREATE TABLE metadata_update (
	id INTEGER NOT NULL, 
	"key" VARCHAR NOT NULL, 
	old_value VARCHAR, 
	new_value VARCHAR NOT NULL, 
	timestamp INTEGER NOT NULL, 
	PRIMARY KEY (id)
);
CREATE INDEX ix_metadata_update_key ON metadata_update ("key");
CREATE TABLE match_caster (
	match_id VARCHAR NOT NULL, 
	caster_id INTEGER NOT NULL, 
	PRIMARY KEY (match_id, caster_id), 
	FOREIGN KEY(match_id) REFERENCES "match" (match_id), 
	FOREIGN KEY(caster_id) REFERENCES user (user_id)
);
CREATE TABLE user (
	user_id VARCHAR NOT NULL, 
	email VARCHAR NOT NULL, 
	faceit_id VARCHAR, 
	team_id VARCHAR, 
	password VARCHAR NOT NULL, 
	PRIMARY KEY (user_id)
);
CREATE UNIQUE INDEX ix_user_email ON user (email);
