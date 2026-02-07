import { describe, expect, it, vi } from "vitest";
import { faceitImportService } from "./faceit.service";
import { FaceitAPIMatch } from "../../utils/transformFaceitData";

describe("faceit - import matches", () => {
    it("should import matches successfully", async () => {
        const matches = [
            {
                match_id: "1-2e805a21-dd46-4240-ba9a-299e1bbc3e0c",
                version: 2,
                game: "cs2",
                region: "NA",
                competition_id: "f37a1d7f-dd98-4c2b-97de-c5c4a4d541f3",
                competition_type: "championship",
                competition_name: "Group Stage - Crossfire Season 3",
                organizer_id: "1b5c9ed3-5233-4c58-8761-78f6ef5a0fd9",
                teams: {
                    faction1: {
                        faction_id: "380fbad8-5cb2-4a31-ab50-42c686034dce",
                        leader: "7fc130ea-2eba-47db-997d-baf2f17f5adc",
                        avatar: "https://distribution.faceit-cdn.net/images/e3f3bba0-0130-4c3f-b75d-d5bd38921f98.jpeg",
                        roster: [
                            {
                                player_id:
                                    "7fc130ea-2eba-47db-997d-baf2f17f5adc",
                                nickname: "fArt",
                                avatar: "https://distribution.faceit-cdn.net/images/eac2b11d-4d56-4978-b688-f4a7f3fe489b.jpeg",
                                membership: "esea",
                                game_player_id: "76561198067835427",
                                game_player_name: "fArt",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "8da05ee7-3c1d-4a7c-80c5-306d08bf6cd4",
                                nickname: "chem",
                                avatar: "https://distribution.faceit-cdn.net/images/66b66645-019a-4170-9be4-855f7930ae08.jpeg",
                                membership: "esea",
                                game_player_id: "76561198196904981",
                                game_player_name: "wyan",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "d95c7efd-6c6c-4859-b318-d8c944edb93c",
                                nickname: "Willie",
                                avatar: "https://assets.faceit-cdn.net/avatars/d95c7efd-6c6c-4859-b318-d8c944edb93c_1623859633342.jpg",
                                membership: "esea",
                                game_player_id: "76561198188349082",
                                game_player_name: "Will",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "d4aa97ac-6d1c-4997-9483-20b3ef631c84",
                                nickname: "yuush1",
                                avatar: "https://distribution.faceit-cdn.net/images/149d1087-270b-41b1-b251-57d12d44752f.jpeg",
                                membership: "esea",
                                game_player_id: "76561198123859706",
                                game_player_name: "yuush1",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "a044c4a8-ffe9-43ca-ae98-1fa3525ae5c6",
                                nickname: "-Dodge-",
                                avatar: "https://distribution.faceit-cdn.net/images/9a156d41-2f48-4ae9-a4d3-61da7768a82f.jpg",
                                membership: "premium",
                                game_player_id: "76561198164584382",
                                game_player_name: "Just Dodge",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                        ],
                        substituted: true,
                        name: "Omen Esports",
                        type: "premade",
                    },
                    faction2: {
                        faction_id: "35eebad9-3a5f-4a70-867c-287bd09d4d23",
                        leader: "d9f447b4-151b-4ca7-8d4c-1e41deb3db08",
                        avatar: "https://distribution.faceit-cdn.net/images/d90bf0b7-bdb6-4a6c-8b87-339c6ab04be9.jpg",
                        roster: [
                            {
                                player_id:
                                    "d9f447b4-151b-4ca7-8d4c-1e41deb3db08",
                                nickname: "Jachro",
                                avatar: "https://distribution.faceit-cdn.net/images/57672e99-a400-4914-b480-e3996070b16a.jpeg",
                                membership: "premium",
                                game_player_id: "76561198089558794",
                                game_player_name: "Jachro",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "de81f94f-fd21-4b68-b912-7b7ea52a63b9",
                                nickname: "--toasty",
                                avatar: "https://assets.faceit-cdn.net/avatars/de81f94f-fd21-4b68-b912-7b7ea52a63b9_1588005482316.jpg",
                                membership: "premium",
                                game_player_id: "76561198039591422",
                                game_player_name: "-.-",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "bb191d97-1e23-4aac-87aa-2b43cdf39220",
                                nickname: "Sharpie",
                                avatar: "https://distribution.faceit-cdn.net/images/09fbe0db-9c1b-4212-a131-0cd10f1a1f73.jpeg",
                                membership: "premium",
                                game_player_id: "76561198236865240",
                                game_player_name: "Simon",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "f682901b-236e-4251-893f-48b8e22226a2",
                                nickname: "brawckzz",
                                avatar: "https://distribution.faceit-cdn.net/images/bd1cf18c-9437-499c-860a-8088dda88d1d.jpeg",
                                membership: "premium",
                                game_player_id: "76561198287531107",
                                game_player_name: "brawckzz",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "d2459f75-cb62-4b43-adfe-cdff529ea823",
                                nickname: "1Cyrix",
                                avatar: "https://distribution.faceit-cdn.net/images/18d86946-0005-422d-b39a-76223d24d1eb.jpg",
                                membership: "premium",
                                game_player_id: "76561198272012791",
                                game_player_name: "BUBANZA",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                        ],
                        substituted: true,
                        name: "Mavrek",
                        type: "premade",
                    },
                },
                voting: {
                    voted_entity_types: ["location", "map"],
                    location: {
                        entities: [
                            {
                                class_name: "Chicago",
                                game_location_id: "Chicago",
                                guid: "Chicago",
                                image_lg:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
                                image_sm:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
                                name: "Chicago",
                            },
                            {
                                image_lg:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
                                image_sm:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
                                name: "Denver",
                                class_name: "Denver",
                                game_location_id: "Denver",
                                guid: "Denver",
                            },
                            {
                                image_lg:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
                                image_sm:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
                                name: "Dallas",
                                class_name: "Dallas",
                                game_location_id: "Dallas",
                                guid: "Dallas",
                            },
                        ],
                        pick: ["Chicago"],
                    },
                    map: {
                        entities: [
                            {
                                class_name: "de_dust2",
                                game_map_id: "de_dust2",
                                guid: "de_dust2",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
                                name: "Dust2",
                            },
                            {
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
                                name: "Mirage",
                                class_name: "de_mirage",
                                game_map_id: "de_mirage",
                                guid: "de_mirage",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
                            },
                            {
                                guid: "de_nuke",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
                                name: "Nuke",
                                class_name: "de_nuke",
                                game_map_id: "de_nuke",
                            },
                            {
                                class_name: "de_overpass",
                                game_map_id: "de_overpass",
                                guid: "de_overpass",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/058c4eb3-dac4-441c-a810-70afa0f3022c_1695819170133.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/6d7e8e7f-f136-49f3-a4ca-a9afffbe8022_1695819165013.jpeg",
                                name: "Overpass",
                            },
                            {
                                class_name: "de_ancient",
                                game_map_id: "de_ancient",
                                guid: "de_ancient",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
                                name: "Ancient",
                            },
                            {
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
                                name: "Train",
                                class_name: "de_train",
                                game_map_id: "de_train",
                                guid: "de_train",
                            },
                            {
                                class_name: "de_inferno",
                                game_map_id: "de_inferno",
                                guid: "de_inferno",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
                                name: "Inferno",
                            },
                        ],
                        pick: ["de_mirage", "de_nuke", "de_inferno"],
                    },
                },
                calculate_elo: false,
                scheduled_at: 1766106000,
                configured_at: 1766108572,
                started_at: 1766108996,
                finished_at: 1766113128,
                demo_url: [
                    "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-2e805a21-dd46-4240-ba9a-299e1bbc3e0c-1-1.dem.zst",
                    "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-2e805a21-dd46-4240-ba9a-299e1bbc3e0c-2-1.dem.zst",
                ],
                chat_room_id: "match-1-2e805a21-dd46-4240-ba9a-299e1bbc3e0c",
                best_of: 3,
                results: {
                    winner: "faction1",
                    score: {
                        faction1: 2,
                        faction2: 0,
                    },
                },
                detailed_results: [
                    {
                        asc_score: false,
                        winner: "faction1",
                        factions: {
                            faction2: {
                                score: 6,
                            },
                            faction1: {
                                score: 13,
                            },
                        },
                    },
                    {
                        asc_score: false,
                        winner: "faction1",
                        factions: {
                            faction1: {
                                score: 19,
                            },
                            faction2: {
                                score: 16,
                            },
                        },
                    },
                ],
                status: "FINISHED",
                round: 3,
                group: 8,
                faceit_url:
                    "https://www.faceit.com/{lang}/cs2/room/1-2e805a21-dd46-4240-ba9a-299e1bbc3e0c",
            },
            {
                match_id: "1-673afa4a-9f95-4e07-b1f1-e917fc9f9248",
                version: 2,
                game: "cs2",
                region: "NA",
                competition_id: "f37a1d7f-dd98-4c2b-97de-c5c4a4d541f3",
                competition_type: "championship",
                competition_name: "Group Stage - Crossfire Season 3",
                organizer_id: "1b5c9ed3-5233-4c58-8761-78f6ef5a0fd9",
                teams: {
                    faction1: {
                        faction_id: "be7fde88-1e05-493a-9861-02a0a48e3bc0",
                        leader: "a53eb25c-a4b6-4400-9b91-4cea9634bc4a",
                        avatar: "https://distribution.faceit-cdn.net/images/c417aaf4-d6ac-4f5b-8fe6-d3a339cb8385.jpeg",
                        roster: [
                            {
                                player_id:
                                    "a53eb25c-a4b6-4400-9b91-4cea9634bc4a",
                                nickname: "1TOASTY",
                                avatar: "https://distribution.faceit-cdn.net/images/2bcda739-2cf7-45e2-b56a-bb32f6346012.jpg",
                                membership: "esea",
                                game_player_id: "76561198122470381",
                                game_player_name: "TOASTY",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "25518de8-4f33-4b23-856f-cad03c72df0f",
                                nickname: "looke",
                                avatar: "https://distribution.faceit-cdn.net/images/5f9c6df0-d412-48ff-aa34-fe62a3cbd3fb.jpeg",
                                membership: "esea",
                                game_player_id: "76561198158186387",
                                game_player_name: "looke",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "738e5eca-bcec-43ef-9342-4d4a12891168",
                                nickname: "InsayN",
                                avatar: "https://distribution.faceit-cdn.net/images/a2b09d22-7aa0-4f52-9bfc-02ef3482c686.jpeg",
                                membership: "premium",
                                game_player_id: "76561198187979910",
                                game_player_name: "Abstract -X-",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "58d47b80-bb57-4adf-9e25-a8d306239834",
                                nickname: "Msaia",
                                avatar: "https://distribution.faceit-cdn.net/images/1b96e24b-0d3d-42f2-a3d0-19c86119e1c9.jpeg",
                                membership: "premium",
                                game_player_id: "76561198143458644",
                                game_player_name: "Msaia",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "08a4828a-5d68-4ff9-bff4-7cad4215e177",
                                nickname: "BuellcR",
                                avatar: "https://distribution.faceit-cdn.net/images/7b8c3cb8-49f8-4a28-8ff6-55cf49aacf11.jpg",
                                membership: "esea",
                                game_player_id: "76561198977900192",
                                game_player_name: "Bueller218",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                        ],
                        substituted: true,
                        name: "NuTorious",
                        type: "premade",
                    },
                    faction2: {
                        faction_id: "fdbbd1b5-5575-4adf-aa2c-e61bdc5044e9",
                        leader: "d6b3c180-abfc-40ee-9284-88c71194ecef",
                        avatar: "https://distribution.faceit-cdn.net/images/008133e1-2791-4d2e-92d1-224af0311825.jpg",
                        roster: [
                            {
                                player_id:
                                    "d6b3c180-abfc-40ee-9284-88c71194ecef",
                                nickname: "oweNra",
                                avatar: "https://distribution.faceit-cdn.net/images/71b6f5ea-065a-4651-a9b4-f3e3c3e9b08f.jpg",
                                membership: "premium",
                                game_player_id: "76561198345059295",
                                game_player_name: "Owen",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "dcbbb3b0-27fe-4022-bb91-7d61e89347f0",
                                nickname: "wundyy",
                                avatar: "https://distribution.faceit-cdn.net/images/c1f3c64b-1023-45d7-bd35-42de3db46b2c.jpg",
                                membership: "esea",
                                game_player_id: "76561198229696960",
                                game_player_name: "wundeeh",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "489138d8-b3c3-49b1-9d44-47d8fb79013d",
                                nickname: "Clum",
                                avatar: "https://distribution.faceit-cdn.net/images/92de1fad-3706-420f-8096-4d9eabac4e10.jpg",
                                membership: "esea",
                                game_player_id: "76561198819277960",
                                game_player_name: "Clumsy",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "127d0f45-7e45-4133-bfc8-8daa2aea7584",
                                nickname: "Texzera",
                                avatar: "https://distribution.faceit-cdn.net/images/fd3db2b1-80e4-4fda-a945-1b9c1dac7465.jpg",
                                membership: "esea",
                                game_player_id: "76561198353679273",
                                game_player_name: "Texzera",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "8bbf27c8-9e03-4a64-b289-172a66e3717a",
                                nickname: "texture",
                                avatar: "https://distribution.faceit-cdn.net/images/900223e2-d8e6-4e42-8291-a7ccd6ed86ea.jpg",
                                membership: "esea",
                                game_player_id: "76561199049729207",
                                game_player_name: "oh yea woo yea",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                        ],
                        substituted: true,
                        name: "Reunion",
                        type: "premade",
                    },
                },
                voting: {
                    voted_entity_types: ["location", "map"],
                    location: {
                        entities: [
                            {
                                class_name: "Chicago",
                                game_location_id: "Chicago",
                                guid: "Chicago",
                                image_lg:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
                                image_sm:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
                                name: "Chicago",
                            },
                            {
                                name: "Denver",
                                class_name: "Denver",
                                game_location_id: "Denver",
                                guid: "Denver",
                                image_lg:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
                                image_sm:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
                            },
                            {
                                image_sm:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
                                name: "Dallas",
                                class_name: "Dallas",
                                game_location_id: "Dallas",
                                guid: "Dallas",
                                image_lg:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
                            },
                        ],
                        pick: ["Dallas"],
                    },
                    map: {
                        entities: [
                            {
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
                                name: "Dust2",
                                class_name: "de_dust2",
                                game_map_id: "de_dust2",
                                guid: "de_dust2",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
                            },
                            {
                                class_name: "de_mirage",
                                game_map_id: "de_mirage",
                                guid: "de_mirage",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
                                name: "Mirage",
                            },
                            {
                                name: "Nuke",
                                class_name: "de_nuke",
                                game_map_id: "de_nuke",
                                guid: "de_nuke",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
                            },
                            {
                                guid: "de_overpass",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/058c4eb3-dac4-441c-a810-70afa0f3022c_1695819170133.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/6d7e8e7f-f136-49f3-a4ca-a9afffbe8022_1695819165013.jpeg",
                                name: "Overpass",
                                class_name: "de_overpass",
                                game_map_id: "de_overpass",
                            },
                            {
                                class_name: "de_ancient",
                                game_map_id: "de_ancient",
                                guid: "de_ancient",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
                                name: "Ancient",
                            },
                            {
                                class_name: "de_train",
                                game_map_id: "de_train",
                                guid: "de_train",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
                                name: "Train",
                            },
                            {
                                game_map_id: "de_inferno",
                                guid: "de_inferno",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
                                name: "Inferno",
                                class_name: "de_inferno",
                            },
                        ],
                        pick: ["de_ancient", "de_mirage", "de_nuke"],
                    },
                },
                calculate_elo: false,
                scheduled_at: 1766019600,
                configured_at: 1766021510,
                started_at: 1766021786,
                finished_at: 1766023962,
                demo_url: [
                    "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-673afa4a-9f95-4e07-b1f1-e917fc9f9248-1-1.dem.zst",
                    "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-673afa4a-9f95-4e07-b1f1-e917fc9f9248-2-1.dem.zst",
                ],
                chat_room_id: "match-1-673afa4a-9f95-4e07-b1f1-e917fc9f9248",
                best_of: 3,
                results: {
                    winner: "faction1",
                    score: {
                        faction1: 2,
                        faction2: 0,
                    },
                },
                detailed_results: [
                    {
                        asc_score: false,
                        winner: "faction1",
                        factions: {
                            faction1: {
                                score: 13,
                            },
                            faction2: {
                                score: 3,
                            },
                        },
                    },
                    {
                        asc_score: false,
                        winner: "faction1",
                        factions: {
                            faction1: {
                                score: 13,
                            },
                            faction2: {
                                score: 9,
                            },
                        },
                    },
                ],
                status: "FINISHED",
                round: 3,
                group: 8,
                faceit_url:
                    "https://www.faceit.com/{lang}/cs2/room/1-673afa4a-9f95-4e07-b1f1-e917fc9f9248",
            },
            {
                match_id: "1-d5a4fe83-5ba2-4af2-a849-17b139939d65",
                version: 2,
                game: "cs2",
                region: "NA",
                competition_id: "f37a1d7f-dd98-4c2b-97de-c5c4a4d541f3",
                competition_type: "championship",
                competition_name: "Group Stage - Crossfire Season 3",
                organizer_id: "1b5c9ed3-5233-4c58-8761-78f6ef5a0fd9",
                teams: {
                    faction1: {
                        faction_id: "008c1679-7183-49ad-9f67-06b320a63ee8",
                        leader: "43c43021-6ae9-4e6a-9bda-af2e84515006",
                        avatar: "https://distribution.faceit-cdn.net/images/3578b37f-be95-4696-9a17-fc8f4ebc9e61.jpg",
                        roster: [
                            {
                                player_id:
                                    "43c43021-6ae9-4e6a-9bda-af2e84515006",
                                nickname: "Philipek_",
                                avatar: "https://distribution.faceit-cdn.net/images/e31bc7ec-fa15-4015-8183-c2c3f79123e9.jpg",
                                membership: "premium",
                                game_player_id: "76561198424717372",
                                game_player_name: "Philipek",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "eaf850c6-f14a-4e92-abdd-2d6d50b776d7",
                                nickname: "Leodyn",
                                avatar: "https://distribution.faceit-cdn.net/images/b66d8d12-3eb9-4877-90cc-4a7b949cbf43.jpg",
                                membership: "premium",
                                game_player_id: "76561198142488606",
                                game_player_name: "Leodyn",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "f597a556-d5b6-464e-b0c4-00268b083b9f",
                                nickname: "Zhenn13",
                                avatar: "https://distribution.faceit-cdn.net/images/a411570f-1a24-4b26-a47e-8be8350b8e0a.jpg",
                                membership: "premium",
                                game_player_id: "76561198882773852",
                                game_player_name: "Zhenn",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "1f0e73c5-6f17-4500-b7fe-de8d283b04ec",
                                nickname: "1NoVa",
                                avatar: "https://distribution.faceit-cdn.net/images/551d93f9-880d-447d-8d0d-2763be8ec4a5.jpg",
                                membership: "premium",
                                game_player_id: "76561198074927301",
                                game_player_name: "76561198074927301",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "38688134-de1a-4b53-ab3d-dbffea68e632",
                                nickname: "aaronsfury",
                                avatar: "https://distribution.faceit-cdn.net/images/83916c2d-4eb1-4a14-ad08-8cb3f7925000.jpg",
                                membership: "esea",
                                game_player_id: "76561198075997073",
                                game_player_name: "aaronsfury",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                        ],
                        substituted: true,
                        name: "Team Factor",
                        type: "premade",
                    },
                    faction2: {
                        faction_id: "6e30925c-b959-401b-a64b-571bd81da2f7",
                        leader: "3edac84a-97a8-43ee-af57-b49b66fe8df4",
                        avatar: "https://distribution.faceit-cdn.net/images/84ed82f5-0fb1-4b40-89d4-745e2c498ee7.jpg",
                        roster: [
                            {
                                player_id:
                                    "3edac84a-97a8-43ee-af57-b49b66fe8df4",
                                nickname: "kermi",
                                avatar: "https://assets.faceit-cdn.net/avatars/3edac84a-97a8-43ee-af57-b49b66fe8df4_1598326033049.jpg",
                                membership: "premium",
                                game_player_id: "76561198212207660",
                                game_player_name: "Kermi",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "581d92b9-8310-4a29-81de-6b4057e8a6ed",
                                nickname: "Signal",
                                avatar: "https://distribution.faceit-cdn.net/images/a48cbaf2-af59-47b9-a0ae-5daec97cad61.jpeg",
                                membership: "premium",
                                game_player_id: "76561198054121335",
                                game_player_name: "Signal",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "f85fef71-d621-49c1-a6ea-d26a2ab1449a",
                                nickname: "neight",
                                avatar: "https://distribution.faceit-cdn.net/images/27362042-49cf-4e18-9ead-0d8885480b35.jpeg",
                                membership: "premium",
                                game_player_id: "76561198997404820",
                                game_player_name: "neight",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "fe0bdd59-6d8d-46f7-b008-e3071585dc53",
                                nickname: "cmrn",
                                avatar: "https://distribution.faceit-cdn.net/images/b666eccc-cf94-474c-8d71-db3c3b9c393e.jpg",
                                membership: "premium",
                                game_player_id: "76561198082046495",
                                game_player_name: "cmrn",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                            {
                                player_id:
                                    "041949f0-a34f-4246-984c-a3ec0e275145",
                                nickname: "b0nes",
                                avatar: "https://distribution.faceit-cdn.net/images/53a06c89-a5f3-49d7-a0b6-ff39802ee520.jpeg",
                                membership: "premium",
                                game_player_id: "76561198083090482",
                                game_player_name: "bones",
                                game_skill_level: 10,
                                anticheat_required: true,
                            },
                        ],
                        substituted: true,
                        name: "F5 Esports",
                        type: "premade",
                    },
                },
                voting: {
                    voted_entity_types: ["location", "map"],
                    location: {
                        entities: [
                            {
                                game_location_id: "Chicago",
                                guid: "Chicago",
                                image_lg:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
                                image_sm:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
                                name: "Chicago",
                                class_name: "Chicago",
                            },
                            {
                                image_lg:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
                                image_sm:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
                                name: "Denver",
                                class_name: "Denver",
                                game_location_id: "Denver",
                                guid: "Denver",
                            },
                            {
                                image_sm:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
                                name: "Dallas",
                                class_name: "Dallas",
                                game_location_id: "Dallas",
                                guid: "Dallas",
                                image_lg:
                                    "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
                            },
                        ],
                        pick: ["Dallas"],
                    },
                    map: {
                        entities: [
                            {
                                class_name: "de_dust2",
                                game_map_id: "de_dust2",
                                guid: "de_dust2",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
                                name: "Dust2",
                            },
                            {
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
                                name: "Mirage",
                                class_name: "de_mirage",
                                game_map_id: "de_mirage",
                                guid: "de_mirage",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
                            },
                            {
                                guid: "de_nuke",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
                                name: "Nuke",
                                class_name: "de_nuke",
                                game_map_id: "de_nuke",
                            },
                            {
                                guid: "de_overpass",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/058c4eb3-dac4-441c-a810-70afa0f3022c_1695819170133.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/6d7e8e7f-f136-49f3-a4ca-a9afffbe8022_1695819165013.jpeg",
                                name: "Overpass",
                                class_name: "de_overpass",
                                game_map_id: "de_overpass",
                            },
                            {
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
                                name: "Ancient",
                                class_name: "de_ancient",
                                game_map_id: "de_ancient",
                                guid: "de_ancient",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
                            },
                            {
                                class_name: "de_train",
                                game_map_id: "de_train",
                                guid: "de_train",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
                                name: "Train",
                            },
                            {
                                class_name: "de_inferno",
                                game_map_id: "de_inferno",
                                guid: "de_inferno",
                                image_lg:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
                                image_sm:
                                    "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
                                name: "Inferno",
                            },
                        ],
                        pick: ["de_nuke", "de_ancient", "de_mirage"],
                    },
                },
                calculate_elo: false,
                scheduled_at: 1764986400,
                configured_at: 1764988256,
                started_at: 1764988569,
                finished_at: 1764990285,
                demo_url: [
                    "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-d5a4fe83-5ba2-4af2-a849-17b139939d65-1-1.dem.zst",
                    "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-d5a4fe83-5ba2-4af2-a849-17b139939d65-2-1.dem.zst",
                ],
                chat_room_id: "match-1-d5a4fe83-5ba2-4af2-a849-17b139939d65",
                best_of: 3,
                results: {
                    winner: "faction2",
                    score: {
                        faction1: 0,
                        faction2: 2,
                    },
                },
                detailed_results: [
                    {
                        asc_score: false,
                        winner: "faction2",
                        factions: {
                            faction1: {
                                score: 2,
                            },
                            faction2: {
                                score: 13,
                            },
                        },
                    },
                    {
                        asc_score: false,
                        winner: "faction2",
                        factions: {
                            faction2: {
                                score: 13,
                            },
                            faction1: {
                                score: 4,
                            },
                        },
                    },
                ],
                status: "FINISHED",
                round: 3,
                group: 7,
                faceit_url:
                    "https://www.faceit.com/{lang}/cs2/room/1-d5a4fe83-5ba2-4af2-a849-17b139939d65",
            },
        ] as unknown as FaceitAPIMatch[];

        vi.mock("../matches/match.repository", () => ({
            upsertMatchByFaceitId: vi.fn().mockResolvedValue({ id: 1 }),
            upsertMatchParticipant: vi.fn().mockResolvedValue({ id: 1 }),
            upsertMap: vi.fn().mockResolvedValue({ id: 1 }),
        }));
        vi.mock("../players/player.repository", () => ({
            upsertPlayerByFaceitId: vi.fn().mockResolvedValue({ id: 1 }),
            findByFaceitId: vi.fn().mockResolvedValue({ id: 1 }),
            updatePlayerTeam: vi.fn().mockResolvedValue({ id: 1 }),
        }));
        vi.mock("../teams/team.repository", () => ({
            findTeamByFaceitId: vi.fn().mockResolvedValue({ id: 1 }),
            upsertTeamByFaceitId: vi.fn().mockResolvedValue({ id: 1 }),
        }));
        vi.mock("../tournaments/tournament.repository", () => ({
            tournamentRepository: {
                findStageById: vi.fn().mockResolvedValue({ id: 1 }),
                upsertStageTeam: vi.fn().mockResolvedValue({ id: 1 }),
                upsertGroupByName: vi.fn().mockResolvedValue({ id: 1 }),
            },
        }));

        const result = await faceitImportService.processNewStageMatches(
            matches,
            1,
        );

        expect(result.success).toBe(true);
        expect(result.counts.matches).toBe(1);
        expect(result.counts.players).toBe(1);
        expect(result.counts.teams).toBe(1);
        expect(result.counts.groups).toBe(1);
        expect(result.errors).toHaveLength(0);
    });

    it("should only import unprocessed matches", async () => {});

    it("should correct handle round calculation", async () => {});
});
