// import type { Match, Team } from "../types/Types";

// export const FAKETEAMS: Team[] = [
//     {
//         id: "A",
//         name: "TeamA",
//         record: { win: 3, loss: 0 },
//         seed: 1,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "B",
//         name: "TeamB",
//         record: { win: 3, loss: 0 },
//         seed: 2,
//         joined_tournament: false,
//         paid: false,
//     },

//     {
//         id: "D",
//         name: "TeamD",
//         record: { win: 0, loss: 0 },
//         seed: 4,
//         joined_tournament: false,
//         paid: false,
//     },

//     {
//         id: "E",
//         name: "TeamE",
//         record: { win: 0, loss: 0 },
//         seed: 5,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "F",
//         name: "TeamF",
//         record: { win: 0, loss: 0 },
//         seed: 6,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "G",
//         name: "TeamG",
//         record: { win: 0, loss: 0 },
//         seed: 7,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "C",
//         name: "TeamC",
//         record: { win: 2, loss: 1 },
//         seed: 3,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "H",
//         name: "TeamH",
//         record: { win: 0, loss: 0 },
//         seed: 8,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "I",
//         name: "TeamI",
//         record: { win: 0, loss: 0 },
//         seed: 9,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "J",
//         name: "TeamJ",
//         record: { win: 0, loss: 0 },
//         seed: 10,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "K",
//         name: "TeamK",
//         record: { win: 0, loss: 0 },
//         seed: 11,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "L",
//         name: "TeamL",
//         record: { win: 0, loss: 0 },
//         seed: 12,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "M",
//         name: "TeamM",
//         record: { win: 0, loss: 0 },
//         seed: 13,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "N",
//         name: "TeamN",
//         record: { win: 0, loss: 0 },
//         seed: 14,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "O",
//         name: "TeamO",
//         record: { win: 0, loss: 0 },
//         seed: 15,
//         joined_tournament: false,
//         paid: false,
//     },
//     {
//         id: "P",
//         name: "TeamP",
//         record: { win: 0, loss: 3 },
//         seed: 16,
//         joined_tournament: false,
//         paid: false,
//     },
// ];

// export const FAKEMATCHES: Match[] = [
//     // --- Round 1 (0-0) ---
//     {
//         match_id: "m1",
//         round: "0-0",
//         teams: {
//             faction1: { faction_id: "A", name: "Alpha" },
//             faction2: { faction_id: "B", name: "Bravo" },
//         },
//         results: {
//             winner: "A",
//             score: { faction1: 16, faction2: 12 },
//         },
//     },
//     {
//         match_id: "m2",
//         round: "0-0",
//         teams: {
//             faction1: { faction_id: "C", name: "Charlie" },
//             faction2: { faction_id: "D", name: "Delta" },
//         },
//         results: {
//             winner: "C",
//             score: { faction1: 16, faction2: 6 },
//         },
//     },
//     {
//         match_id: "m3",
//         round: "0-0",
//         teams: {
//             faction1: { faction_id: "E", name: "Echo" },
//             faction2: { faction_id: "F", name: "Foxtrot" },
//         },
//         results: {
//             winner: "F",
//             score: { faction1: 10, faction2: 16 },
//         },
//     },
//     {
//         match_id: "m4",
//         round: "0-0",
//         teams: {
//             faction1: { faction_id: "G", name: "Golf" },
//             faction2: { faction_id: "H", name: "Hotel" },
//         },
//         results: {
//             winner: "H",
//             score: { faction1: 13, faction2: 16 },
//         },
//     },

//     // --- Round 2 ---
//     // 1-0 matches
//     {
//         match_id: "m5",
//         round: "1-0",
//         teams: {
//             faction1: { faction_id: "A", name: "Alpha" },
//             faction2: { faction_id: "C", name: "Charlie" },
//         },
//         results: {
//             winner: "C",
//             score: { faction1: 12, faction2: 16 },
//         },
//     },
//     {
//         match_id: "m6",
//         round: "1-0",
//         teams: {
//             faction1: { faction_id: "F", name: "Foxtrot" },
//             faction2: { faction_id: "H", name: "Hotel" },
//         },
//         results: {
//             winner: "F",
//             score: { faction1: 16, faction2: 14 },
//         },
//     },
//     // 0-1 matches
//     {
//         match_id: "m7",
//         round: "0-2",
//         teams: {
//             faction1: { faction_id: "B", name: "Bravo" },
//             faction2: { faction_id: "D", name: "Delta" },
//         },
//         results: {
//             winner: "B",
//             score: { faction1: 16, faction2: 13 },
//         },
//     },
//     {
//         match_id: "m8",
//         round: "0-1",
//         teams: {
//             faction1: { faction_id: "E", name: "Echo" },
//             faction2: { faction_id: "G", name: "Golf" },
//         },
//         results: {
//             winner: "E",
//             score: { faction1: 16, faction2: 8 },
//         },
//     },

//     // --- Round 3 ---
//     // 2-0 match
//     {
//         match_id: "m9",
//         round: "2-0",
//         teams: {
//             faction1: { faction_id: "C", name: "Charlie" },
//             faction2: { faction_id: "F", name: "Foxtrot" },
//         },
//         results: {
//             winner: "C",
//             score: { faction1: 16, faction2: 9 },
//         },
//     },
//     // 1-1 matches
//     {
//         match_id: "m10",
//         round: "1-1",
//         teams: {
//             faction1: { faction_id: "A", name: "Alpha" },
//             faction2: { faction_id: "H", name: "Hotel" },
//         },
//         results: {
//             winner: "A",
//             score: { faction1: 16, faction2: 14 },
//         },
//     },
//     {
//         match_id: "m11",
//         round: "1-1",
//         teams: {
//             faction1: { faction_id: "B", name: "Bravo" },
//             faction2: { faction_id: "E", name: "Echo" },
//         },
//         results: {
//             winner: "E",
//             score: { faction1: 11, faction2: 16 },
//         },
//     },
//     // 0-2 match
//     {
//         match_id: "m12",
//         round: "0-2",
//         teams: {
//             faction1: { faction_id: "D", name: "Delta" },
//             faction2: { faction_id: "G", name: "Golf" },
//         },
//         results: {
//             winner: "G",
//             score: { faction1: 12, faction2: 16 },
//         },
//     },

//     // --- Round 4 ---
//     // 2-1 match
//     {
//         match_id: "m13",
//         round: "2-1",
//         teams: {
//             faction1: { faction_id: "F", name: "Foxtrot" },
//             faction2: { faction_id: "A", name: "Alpha" },
//         },
//         results: {
//             winner: "F",
//             score: { faction1: 16, faction2: 13 },
//         },
//     },
//     {
//         match_id: "m14",
//         round: "2-1",
//         teams: {
//             faction1: { faction_id: "E", name: "Echo" },
//             faction2: { faction_id: "H", name: "Hotel" },
//         },
//         results: {
//             winner: "H",
//             score: { faction1: 9, faction2: 16 },
//         },
//     },
//     // 1-2 match
//     {
//         match_id: "m15",
//         round: "1-2",
//         teams: {
//             faction1: { faction_id: "B", name: "Bravo" },
//             faction2: { faction_id: "G", name: "Golf" },
//         },
//         results: {
//             winner: "G",
//             score: { faction1: 8, faction2: 16 },
//         },
//     },

//     // --- Round 5 ---
//     // 2-2 deciding match
//     {
//         match_id: "m16",
//         round: "2-2",
//         teams: {
//             faction1: { faction_id: "A", name: "Alpha" },
//             faction2: { faction_id: "G", name: "Golf" },
//         },
//         results: {
//             winner: "Alpha",
//             score: { faction1: 16, faction2: 14 },
//         },
//     },
// ];

// export const ROUND1P5 = [
//     {
//         match_id: "1-d0f8a7df-6fa1-47b1-853f-08b3aee555df",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "8ea90e7c-ac3e-405d-b4b5-4cd1505b6349",
//                 leader: "c8a78ccc-5f0e-44e3-b8a1-b05624cebded",
//                 avatar: "https://distribution.faceit-cdn.net/images/d14ebfec-2fa3-4858-b5d3-079ebcde2ad2.jpeg",
//                 roster: [
//                     {
//                         player_id: "c8a78ccc-5f0e-44e3-b8a1-b05624cebded",
//                         nickname: "-LOUD",
//                         avatar: "https://distribution.faceit-cdn.net/images/0e4bf728-ea4f-45ae-aab3-837c555c4a69.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198737702407",
//                         game_player_name: "bem0z",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "47939811-7497-412d-b92c-f554e6eb6742",
//                         nickname: "pizza-",
//                         avatar: "https://distribution.faceit-cdn.net/images/c75ac2e4-dfde-41af-814b-73797a3d0d72.jpg",
//                         membership: "esea",
//                         game_player_id: "76561199085884935",
//                         game_player_name: "p1zza^",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "0d291b65-3eba-41b7-8378-ed025437ec0f",
//                         nickname: "EDDIE_BICEPS",
//                         avatar: "https://distribution.faceit-cdn.net/images/0c4c8c6d-8b37-42b4-8fb0-191926bbbc8e.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198325127321",
//                         game_player_name: "eddie",
//                         game_skill_level: 4,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b9d0ef14-3d3b-4ec5-b0e6-bb73cb56e86a",
//                         nickname: "XVIIII-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/b9d0ef14-3d3b-4ec5-b0e6-bb73cb56e86a_1622486308535.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198263290199",
//                         game_player_name: "Alimo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "2ada819f-8c0b-4127-958f-75260e390d90",
//                         nickname: "valdor",
//                         avatar: "https://distribution.faceit-cdn.net/images/be73c51e-bad5-422b-9e3c-7e7980107685.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198799288088",
//                         game_player_name: "constatinvaldor",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "the pug jug",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "a1ffea77-4698-435c-aa42-53601f1d030d",
//                 leader: "cf9851ae-dadd-414c-b7af-d1b02b1a6f91",
//                 avatar: "https://distribution.faceit-cdn.net/images/dc648526-8cc2-4b83-98df-891546911e96.jpeg",
//                 roster: [
//                     {
//                         player_id: "cf9851ae-dadd-414c-b7af-d1b02b1a6f91",
//                         nickname: "ScoobX",
//                         avatar: "https://distribution.faceit-cdn.net/images/d7cadcee-0370-4447-9d76-6f79504364f3.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197960368797",
//                         game_player_name: "ScoobX",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f1eca42a-b1a2-4c66-9d10-cc5286ba40b9",
//                         nickname: "BurneyProMod",
//                         avatar: "https://distribution.faceit-cdn.net/images/2659c308-82b9-47c2-a2f6-d4f6077bf21b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198042715279",
//                         game_player_name: "ver.1.22474487139...",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "436e3c5b-49a3-4514-acef-100a8ae30417",
//                         nickname: "Zolqrx",
//                         avatar: "https://distribution.faceit-cdn.net/images/c968455c-e0a2-41a9-a390-fb479d9b5933.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561197988278145",
//                         game_player_name: "Qrx",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "37bf598d-6531-4eb4-b7b8-a039efed3eb6",
//                         nickname: "M0B",
//                         avatar: "https://distribution.faceit-cdn.net/images/5ec4842e-43c0-4d2f-9af8-83d7abd475d2.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199049747588",
//                         game_player_name: "M0B",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "171644da-6e27-4eb2-9fb3-539a55d82713",
//                         nickname: "7obyhh",
//                         avatar: "https://assets.faceit-cdn.net/avatars/171644da-6e27-4eb2-9fb3-539a55d82713_1598054996569.jpg",
//                         membership: "free",
//                         game_player_id: "76561198332929319",
//                         game_player_name: "7o",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "DEATHxGAMERS",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-d0f8a7df-6fa1-47b1-853f-08b3aee555df",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-d0f8a7df-6fa1-47b1-853f-08b3aee555df",
//     },
//     {
//         match_id: "1-e6a7a3a7-d734-4eb6-b33f-b2d9a219cfcd",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "4193add4-0389-46eb-bf2f-6effa68d4d1d",
//                 leader: "2da5a90e-664c-47bf-8f89-52024873209c",
//                 avatar: "https://distribution.faceit-cdn.net/images/7729e41b-c802-4ac5-87a1-8dd50a8260d0.jpeg",
//                 roster: [
//                     {
//                         player_id: "2da5a90e-664c-47bf-8f89-52024873209c",
//                         nickname: "epiphany",
//                         avatar: "https://distribution.faceit-cdn.net/images/2e1cd196-292a-4122-a23b-e7b105468c69.jpg",
//                         membership: "premium",
//                         game_player_id: "76561199493384958",
//                         game_player_name: "็",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ba324313-748c-4ca4-9b27-13c40a04669b",
//                         nickname: "al3k",
//                         avatar: "https://distribution.faceit-cdn.net/images/70c534ff-94ef-4c34-a3c7-d850b7cc29fd.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198276530352",
//                         game_player_name: "al3ksandar",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "415d6409-ead9-4430-8ff6-d820e51f38c9",
//                         nickname: "-_Maru_-",
//                         avatar: "https://distribution.faceit-cdn.net/images/0aef679e-037b-4e1c-af79-84389c77d618.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198211235239",
//                         game_player_name: "Gatteka",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6f4a13bb-357b-4065-9b63-359b3e26b00e",
//                         nickname: "ethex",
//                         avatar: "https://distribution.faceit-cdn.net/images/a02deaba-fd2e-4639-93cd-88a58b70e771.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198193394583",
//                         game_player_name: "october country",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "07c36397-381d-4bee-999c-370f98a4046c",
//                         nickname: "s4bre",
//                         avatar: "https://distribution.faceit-cdn.net/images/49014d2b-9a11-418e-9a81-b539bda98e45.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198155840641",
//                         game_player_name: "s4bre",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Locally Hated",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "0d1c2b67-d0b0-4ba5-94a5-935aea34affc",
//                 leader: "ff704bfb-9533-4047-9a4a-a71886397070",
//                 avatar: "https://distribution.faceit-cdn.net/images/47145329-93a6-4b01-b692-48e17e30f200.jpeg",
//                 roster: [
//                     {
//                         player_id: "ff704bfb-9533-4047-9a4a-a71886397070",
//                         nickname: "Tr1ck",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ff704bfb-9533-4047-9a4a-a71886397070_1551134874059.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198138033226",
//                         game_player_name: "Trick",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "581d92b9-8310-4a29-81de-6b4057e8a6ed",
//                         nickname: "Signal",
//                         avatar: "https://distribution.faceit-cdn.net/images/a48cbaf2-af59-47b9-a0ae-5daec97cad61.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054121335",
//                         game_player_name: "Signal",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "96acce04-abc2-4721-809f-66957f17325a",
//                         nickname: "Gibbyatl",
//                         avatar: "https://distribution.faceit-cdn.net/images/7f97de77-595e-4d68-baeb-18113f93d168.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143856840",
//                         game_player_name: "Gibby_ATL",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "470d26d1-5f5c-4403-96ed-67c0b1ac3553",
//                         nickname: "dirtydan",
//                         avatar: "https://distribution.faceit-cdn.net/images/f6cc863a-5b9d-4ba3-92a3-3556c54f3642.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054776069",
//                         game_player_name: "DirtyDan_",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9236c42e-e369-4f19-80dd-a5865791f366",
//                         nickname: "Adubs",
//                         avatar: "https://assets.faceit-cdn.net/avatars/9236c42e-e369-4f19-80dd-a5865791f366_1594090583751.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198134328879",
//                         game_player_name: "A.W.D",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "RedactedSociety",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-e6a7a3a7-d734-4eb6-b33f-b2d9a219cfcd",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-e6a7a3a7-d734-4eb6-b33f-b2d9a219cfcd",
//     },
//     {
//         match_id: "1-a8bbb45e-e07c-49a6-a67c-a9a690c21852",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "d62a3cb4-d998-4461-a8a6-a38189b8da15",
//                 leader: "7dcdcce0-0c16-4dbb-9a55-df9897114d04",
//                 avatar: "https://distribution.faceit-cdn.net/images/f931e691-76ae-4ccb-b8d7-fbd59004c30f.jpeg",
//                 roster: [
//                     {
//                         player_id: "7dcdcce0-0c16-4dbb-9a55-df9897114d04",
//                         nickname: "-VulcaN-",
//                         avatar: "https://distribution.faceit-cdn.net/images/79d14608-07ae-4add-9ccc-0ec2ef3f1b47.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198241032908",
//                         game_player_name: "-VulcaN-",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dd06bbe2-b4c6-423f-b6d8-6016c64cc3d8",
//                         nickname: "chante",
//                         avatar: "https://distribution.faceit-cdn.net/images/d70856c7-6ddd-4d8f-8749-43b5a5b2f4a0.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198823109657",
//                         game_player_name: "cc",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "84243c79-1128-43e4-9093-f330fa13f8e4",
//                         nickname: "Destro",
//                         avatar: "https://assets.faceit-cdn.net/avatars/84243c79-1128-43e4-9093-f330fa13f8e4_1565715965388.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198294768618",
//                         game_player_name: "Destro",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "98908adc-1454-4053-89d0-a89e9e641236",
//                         nickname: "den1eds",
//                         avatar: "https://distribution.faceit-cdn.net/images/5f63cc65-2e6e-4491-9154-c6ec27b5f95a.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198202694584",
//                         game_player_name: "denied",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a571df6a-2b5e-4e5f-ba87-8b4894fb11dd",
//                         nickname: "no1nx",
//                         avatar: "https://distribution.faceit-cdn.net/images/41f5df0d-1c1e-4db1-99e1-f8c4349d994a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198089583895",
//                         game_player_name: "no1nx",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "TSG",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "a5b0e409-ec9e-4047-a159-3b3c3fffb2b4",
//                 leader: "ba33b925-72b6-4fd0-9030-e25dafaf3818",
//                 avatar: "https://distribution.faceit-cdn.net/images/38a1cea1-9253-40c8-9e46-c8fb962b795e.jpeg",
//                 roster: [
//                     {
//                         player_id: "ba33b925-72b6-4fd0-9030-e25dafaf3818",
//                         nickname: "SarkasM",
//                         avatar: "https://distribution.faceit-cdn.net/images/0fafb2cb-0db1-4e72-a8fc-8694079aa566.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198346556982",
//                         game_player_name: "Sarky",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "50b9cc25-7391-46a6-86ae-3218eb34c373",
//                         nickname: "kicking",
//                         avatar: "https://distribution.faceit-cdn.net/images/4f68a5af-1387-405a-b624-f784f39e5943.jpg",
//                         membership: "premium",
//                         game_player_id: "76561197982077686",
//                         game_player_name: "KiCk!nG",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cc9e4bc1-eeec-42da-8a38-7e12bab11d2b",
//                         nickname: "HAMBOOGA",
//                         avatar: "https://distribution.faceit-cdn.net/images/0fc54746-c1ab-4dba-9c03-74e05686da15.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198147116054",
//                         game_player_name: "hambooga",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "77f4b01a-f74e-4efd-8d25-e90a8ff0d5a2",
//                         nickname: "NaRo",
//                         avatar: "https://distribution.faceit-cdn.net/images/4a2aaa4d-dbbf-450f-b17f-2ac2f9e0f2f6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198243212278",
//                         game_player_name: "NaRo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "fe0bdd59-6d8d-46f7-b008-e3071585dc53",
//                         nickname: "cmrn",
//                         avatar: "https://distribution.faceit-cdn.net/images/ca057274-9701-4893-8ccc-0e8ae7e9820b.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198082046495",
//                         game_player_name: "cmrn.",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Kooking Esports",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-a8bbb45e-e07c-49a6-a67c-a9a690c21852",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-a8bbb45e-e07c-49a6-a67c-a9a690c21852",
//     },
//     {
//         match_id: "1-0b72b60b-5778-44b4-a1db-ecb050fac4b2",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "46e6a1e1-6dd2-4fc7-a496-3fa2cd0f4c0a",
//                 leader: "a36af305-a28e-4486-9714-4d39a89d3a46",
//                 avatar: "https://distribution.faceit-cdn.net/images/759c634b-0012-4811-8cab-68b71419e62e.jpg",
//                 roster: [
//                     {
//                         player_id: "a36af305-a28e-4486-9714-4d39a89d3a46",
//                         nickname: "OBCD",
//                         avatar: "https://distribution.faceit-cdn.net/images/759c634b-0012-4811-8cab-68b71419e62e.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198366719875",
//                         game_player_name: "Debrsi2k",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ca958026-d529-42ad-b9b7-4d50dca1b7e8",
//                         nickname: "false",
//                         avatar: "https://distribution.faceit-cdn.net/images/2366e9c2-3fd3-43a9-b9ec-0beca86bda17.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198116139033",
//                         game_player_name: "false",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "3f73761a-6f93-46e4-a944-94be58dc1bd3",
//                         nickname: "chroma",
//                         avatar: "https://distribution.faceit-cdn.net/images/cd286848-0e2b-4d4e-8b16-0ecefb68645f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198875847072",
//                         game_player_name: "chrommaa",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9fe61c59-ccc2-45da-bd75-64032077bade",
//                         nickname: "sharkboy",
//                         avatar: "https://distribution.faceit-cdn.net/images/a3c72f3d-6eb9-49de-8a87-0bc7b943cf45.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198264699326",
//                         game_player_name: "water",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "faea4e59-670b-4663-960d-2bb2734c552d",
//                         nickname: "BustAnutt",
//                         avatar: "https://distribution.faceit-cdn.net/images/ccc80793-0d50-4873-84db-af341b21a9e8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198262556572",
//                         game_player_name: "BustAnut",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Demolition",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "5d604891-ffa5-4137-ac33-1927e1375435",
//                 leader: "b3a76f98-c7af-4b0d-b6ec-6cdb26868513",
//                 avatar: "https://distribution.faceit-cdn.net/images/4b210d80-6572-42cf-9bc3-ecf3cc40c0d8.jpeg",
//                 roster: [
//                     {
//                         player_id: "b3a76f98-c7af-4b0d-b6ec-6cdb26868513",
//                         nickname: "Qestar",
//                         avatar: "https://distribution.faceit-cdn.net/images/c455d2e1-ed19-403e-bfe4-b5b4e8c63640.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197962231216",
//                         game_player_name: "Qester",
//                         game_skill_level: 8,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "53ede7bc-0698-4958-b2bf-77ef0eafa985",
//                         nickname: "perk",
//                         avatar: "https://distribution.faceit-cdn.net/images/c5ef6038-1110-42f0-b05e-52112d0dc5f0.jpg",
//                         membership: "plus",
//                         game_player_id: "76561198911606667",
//                         game_player_name: "p",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "41de0a1e-ce20-4aca-81d4-60a4f672c4d9",
//                         nickname: "ssilG",
//                         avatar: "https://distribution.faceit-cdn.net/images/c8659832-2f08-495b-9c6d-7a8d31c8cc9c.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198231404976",
//                         game_player_name: "Gliss",
//                         game_skill_level: 8,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ed0cf311-42db-43ff-90a1-fd84c98fbbc0",
//                         nickname: "-Gary",
//                         avatar: "https://distribution.faceit-cdn.net/images/4f273cec-9f21-48c2-a830-5e69e03a290b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198438770316",
//                         game_player_name: "Gary",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cca556f9-31c8-4a32-82ca-bd4b2e1f71ab",
//                         nickname: "ToasTy1",
//                         avatar: "https://distribution.faceit-cdn.net/images/1b6d0304-2fa6-412d-8ffd-f30dade2548c.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198169387869",
//                         game_player_name: "ToasT",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "DxG Omega",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-0b72b60b-5778-44b4-a1db-ecb050fac4b2",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-0b72b60b-5778-44b4-a1db-ecb050fac4b2",
//     },
//     {
//         match_id: "1-ad0c8c00-232a-44e1-8b6f-6d17d26ced5e",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "073642d6-b4cb-4baa-b125-26384a7cfac2",
//                 leader: "3cc00843-1290-4ad3-88ee-1e9e2b67521d",
//                 avatar: "https://distribution.faceit-cdn.net/images/1335aa96-841e-4540-8ed5-ccaf271f1f5b.jpg",
//                 roster: [
//                     {
//                         player_id: "3cc00843-1290-4ad3-88ee-1e9e2b67521d",
//                         nickname: "stormie",
//                         avatar: "https://distribution.faceit-cdn.net/images/d50ba705-f4bb-4e62-9614-1bbdb97f6778.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198288821008",
//                         game_player_name: "noob",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "378528b9-727f-44a9-bfa7-fd762033eb4e",
//                         nickname: "Enzo",
//                         avatar: "https://distribution.faceit-cdn.net/images/bf6718db-f89a-47c9-a403-02ec6367b1f2.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198234421716",
//                         game_player_name: "Enzo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "64153391-15e5-4886-b96d-7a3fbc9c6066",
//                         nickname: "jsp",
//                         avatar: "https://distribution.faceit-cdn.net/images/6ad907f7-a4fb-4957-8bf7-5c51231993b0.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198172880971",
//                         game_player_name: "jsp",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "291e4082-5f46-46f6-b424-a63d9b8bdee9",
//                         nickname: "-Nks",
//                         avatar: "https://distribution.faceit-cdn.net/images/20fe2b96-7dd9-4818-9d9a-a3e087b93b69.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198047492494",
//                         game_player_name: "76561198047492494",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ae2c7be5-36e4-414a-a4ba-e9324ce7d3a9",
//                         nickname: "JAM",
//                         avatar: "https://distribution.faceit-cdn.net/images/5879febf-a42a-4947-adcd-1797761f7e61.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198157693983",
//                         game_player_name: "JAM",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "F5 Esports",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "ed859799-05cb-4b7a-9c6c-e56bd2133958",
//                 leader: "1f0e73c5-6f17-4500-b7fe-de8d283b04ec",
//                 avatar: "https://distribution.faceit-cdn.net/images/b159e713-40e6-4bf7-ad8f-42b34fa6433f.jpeg",
//                 roster: [
//                     {
//                         player_id: "1f0e73c5-6f17-4500-b7fe-de8d283b04ec",
//                         nickname: "1NoVa",
//                         avatar: "https://distribution.faceit-cdn.net/images/4b218e88-6225-4198-8643-c5e7699b28d5.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198074927301",
//                         game_player_name: "76561198074927301",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b3126bad-a9b0-452c-aa51-5df2c95088e5",
//                         nickname: "-dug",
//                         avatar: "https://distribution.faceit-cdn.net/images/cf975c06-c01c-415e-b8a7-c7c083190dab.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198305290193",
//                         game_player_name: "dug",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4eb553f6-02cb-4769-b38e-c4efd9e9cc34",
//                         nickname: "c0ntr01",
//                         avatar: "https://assets.faceit-cdn.net/avatars/4eb553f6-02cb-4769-b38e-c4efd9e9cc34_1615332273980.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198110955475",
//                         game_player_name: "c0ntr01",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "43c43021-6ae9-4e6a-9bda-af2e84515006",
//                         nickname: "Philipek_",
//                         avatar: "https://distribution.faceit-cdn.net/images/7dba2ec1-b21d-45bf-80f2-0c3648fc9be8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198424717372",
//                         game_player_name: "Philipek",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "03f83489-5c07-4d6d-86e9-1257dff51ca9",
//                         nickname: "1drew",
//                         avatar: "https://assets.faceit-cdn.net/avatars/03f83489-5c07-4d6d-86e9-1257dff51ca9_1614717292381.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198147414643",
//                         game_player_name: "1drew",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Jersey Jits",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-ad0c8c00-232a-44e1-8b6f-6d17d26ced5e",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-ad0c8c00-232a-44e1-8b6f-6d17d26ced5e",
//     },
//     {
//         match_id: "1-1301f456-fe9d-412e-9673-ec242667dd36",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "fdbbd1b5-5575-4adf-aa2c-e61bdc5044e9",
//                 leader: "7e87978c-5136-4594-b1be-90813f438689",
//                 avatar: "https://distribution.faceit-cdn.net/images/8ac8da75-a462-4626-abe9-2b5b5b4bf6f9.jpeg",
//                 roster: [
//                     {
//                         player_id: "7e87978c-5136-4594-b1be-90813f438689",
//                         nickname: "sascha",
//                         avatar: "https://distribution.faceit-cdn.net/images/5045bf55-6f2f-400c-819e-30cf320eda09.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198368540894",
//                         game_player_name: "sascha",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dcbbb3b0-27fe-4022-bb91-7d61e89347f0",
//                         nickname: "wundeeh",
//                         avatar: "https://distribution.faceit-cdn.net/images/c1f3c64b-1023-45d7-bd35-42de3db46b2c.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198229696960",
//                         game_player_name: "wundeeh",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a548a57e-5e21-4fc2-b528-68495f5af9e5",
//                         nickname: "squidward_2",
//                         avatar: "https://distribution.faceit-cdn.net/images/4ba914ec-753b-41e0-8ec2-b07d1a5dde60.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198175833343",
//                         game_player_name: "squidward_2",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d6b3c180-abfc-40ee-9284-88c71194ecef",
//                         nickname: "0wenzera",
//                         avatar: "https://distribution.faceit-cdn.net/images/44090c93-4326-4a77-b1ac-3e2f2e0eb488.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198345059295",
//                         game_player_name: "Owen",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "127d0f45-7e45-4133-bfc8-8daa2aea7584",
//                         nickname: "Hebizera",
//                         avatar: "https://distribution.faceit-cdn.net/images/fd3db2b1-80e4-4fda-a945-1b9c1dac7465.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198353679273",
//                         game_player_name: "Texzera",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "NextGenEsports",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "07800f60-6b0e-48d8-8f8f-7dcfe976e154",
//                 leader: "cba2d2f8-218b-452b-870f-34fb19737095",
//                 avatar: "https://distribution.faceit-cdn.net/images/ab011dae-9f90-4e2f-8784-ec182961cc2b.jpg",
//                 roster: [
//                     {
//                         player_id: "cba2d2f8-218b-452b-870f-34fb19737095",
//                         nickname: "mag-",
//                         avatar: "https://distribution.faceit-cdn.net/images/bc4ae703-8347-4416-a6ca-72975ba2002e.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198255775195",
//                         game_player_name: "dopeboy210",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ed8cc64f-baab-48ab-879e-ed66ca14c227",
//                         nickname: "wist",
//                         avatar: "https://distribution.faceit-cdn.net/images/626d6bfd-cad0-41d4-bda4-b2e87d618bd0.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198203702795",
//                         game_player_name: "wist",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a951172a-88cd-4b59-b71a-6922c69d4e9f",
//                         nickname: "Fightninja",
//                         avatar: "https://distribution.faceit-cdn.net/images/4aa97166-5419-4da0-9f05-31c5c41d4623.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198891533921",
//                         game_player_name: "GZ",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "fcfa3c2d-5da0-42fe-a5bf-f30044710377",
//                         nickname: "dnr",
//                         avatar: "https://distribution.faceit-cdn.net/images/af16b95b-eb97-4427-9145-7e26aedcafb3.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198376655334",
//                         game_player_name: "luci",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c6363339-e90f-491c-91ee-0795ca973f77",
//                         nickname: "bezymec",
//                         avatar: "https://distribution.faceit-cdn.net/images/c7b47f83-944c-4e41-868c-77790a627ea6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198362752793",
//                         game_player_name: "zaccy",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "VNT",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-1301f456-fe9d-412e-9673-ec242667dd36",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-1301f456-fe9d-412e-9673-ec242667dd36",
//     },
//     {
//         match_id: "1-fd00bbfb-7f83-4575-adfa-6e8882da67b9",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "ea5e1a5f-3d95-419e-b926-0c39e8c3d8dd",
//                 leader: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                 avatar: "https://distribution.faceit-cdn.net/images/f0a92fc2-c0ab-47a2-b7ff-ee855b0960b5.jpeg",
//                 roster: [
//                     {
//                         player_id: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                         nickname: "aelor",
//                         avatar: "https://distribution.faceit-cdn.net/images/d786937e-0934-4ac4-8445-e0486a9969be.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198231092204",
//                         game_player_name: "aelor",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dcea95af-d945-426c-9b22-3bb3b8fb5441",
//                         nickname: "ayaneuu",
//                         avatar: "https://distribution.faceit-cdn.net/images/b7baa66b-c1d8-49dd-b0b1-d85cc30b69fb.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198341370795",
//                         game_player_name: "ayaneuu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1c8f885a-3d9a-4d64-801f-68a336a745ea",
//                         nickname: "Sanzh1k33",
//                         avatar: "https://distribution.faceit-cdn.net/images/d5b012e8-2c4d-43de-aae0-82bd42452827.jpg",
//                         membership: "premium",
//                         game_player_id: "76561199243647648",
//                         game_player_name: "🖤🖤🖤🖤🖤",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "04924ee1-65bf-4424-b4d2-f82657133f53",
//                         nickname: "traekS",
//                         avatar: "https://distribution.faceit-cdn.net/images/b5b3d76f-d794-49db-8601-b0d7418e7b50.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198057008814",
//                         game_player_name: "traekS",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bc7cd9c2-0b37-47c6-9b19-4ccd90c63f44",
//                         nickname: "sathsea",
//                         avatar: "https://distribution.faceit-cdn.net/images/3f718498-ec92-4f6e-bc5b-4bd6d369f956.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198401647782",
//                         game_player_name: "king",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Zomblers",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "85193f96-601d-4118-a267-c19dc855f93a",
//                 leader: "1dbdfbdb-1fdd-45d1-84f4-268fde6419a4",
//                 avatar: "https://distribution.faceit-cdn.net/images/c2475097-069e-475e-a209-85e24be74e12.jpeg",
//                 roster: [
//                     {
//                         player_id: "1dbdfbdb-1fdd-45d1-84f4-268fde6419a4",
//                         nickname: "myline",
//                         avatar: "https://distribution.faceit-cdn.net/images/df8329a1-fccc-4abb-b8b2-fcd81a990bbd.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199188194908",
//                         game_player_name: "sigma boy",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "791be159-025d-452c-8d3b-c5ae66307032",
//                         nickname: "5LAZY",
//                         avatar: "https://distribution.faceit-cdn.net/images/9c450d5d-b513-4ca8-8e58-c11e9129e906.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561199008914020",
//                         game_player_name: "lazyyyyyyy",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "83d32ce9-2e19-46b8-b981-4a1a557ac397",
//                         nickname: "knifa",
//                         avatar: "https://distribution.faceit-cdn.net/images/f1ee4abc-b653-4edf-b71c-525cac94b254.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198864228868",
//                         game_player_name: "TheKnife",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f3c9e263-a540-40fa-816c-cb4560835140",
//                         nickname: "sential",
//                         avatar: "https://distribution.faceit-cdn.net/images/a12e08c2-1fac-4b79-ab10-b2fda2ce9560.jpg",
//                         membership: "premium",
//                         game_player_id: "76561199066681170",
//                         game_player_name: "mmmmm",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e2e8664c-738d-4b9a-b331-201f9c0b0ba4",
//                         nickname: "AbbyDog",
//                         avatar: "https://distribution.faceit-cdn.net/images/75bb34f6-fcc6-4c1d-ac17-20b94cd2d10b.jpeg",
//                         membership: "plus",
//                         game_player_id: "76561198134841895",
//                         game_player_name: "Alpha",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "antigrind",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-fd00bbfb-7f83-4575-adfa-6e8882da67b9",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-fd00bbfb-7f83-4575-adfa-6e8882da67b9",
//     },
//     {
//         match_id: "1-fe601c2b-941e-4b5d-b1b6-d9c045cd9a1c",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "7c162f95-c40c-425f-94d5-4dff61e3ac62",
//                 leader: "cdc3e08f-e87f-4ac3-9f3e-ba864a6f544e",
//                 avatar: "https://distribution.faceit-cdn.net/images/2eeaa68e-4ddf-45fb-98da-f454092f06ca.jpeg",
//                 roster: [
//                     {
//                         player_id: "cdc3e08f-e87f-4ac3-9f3e-ba864a6f544e",
//                         nickname: "---Beast",
//                         avatar: "https://distribution.faceit-cdn.net/images/48b21bec-a3bb-41a7-aa73-8776aa8cb30a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198057153682",
//                         game_player_name: "Beast",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e3c533ef-e677-4724-b179-e2dc17ff9aae",
//                         nickname: "Oczarka",
//                         avatar: "https://distribution.faceit-cdn.net/images/c2ebed78-f21f-4cc3-bb52-15b8e9479926.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198347516938",
//                         game_player_name: "Oczarka",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1fbd13d4-a36e-4476-8e4c-691f29ab5802",
//                         nickname: "1TyRa",
//                         avatar: "https://distribution.faceit-cdn.net/images/d84c3009-9164-4e14-bf6f-a832760a8fef.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198837643069",
//                         game_player_name: "DEMON",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "55c2136f-22c1-41f5-b0da-88978eb8fc56",
//                         nickname: "Scorchyy",
//                         avatar: "https://distribution.faceit-cdn.net/images/12cb6c3a-5366-4c82-9691-c1a5581e8383.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198173968051",
//                         game_player_name: "Scorchyy",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "3d941bf2-c1a0-40d1-a831-7c61438b1ad8",
//                         nickname: "jsfeltner",
//                         avatar: "https://distribution.faceit-cdn.net/images/2a96f7c9-19d2-4dcf-81b7-4d7cfcf2e33b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198052394260",
//                         game_player_name: "jsfeltner",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "InControl",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "8057795f-fab5-49a1-b03c-6a33175a649a",
//                 leader: "7e7cc507-b154-4054-bcc5-346bec28817b",
//                 avatar: "https://distribution.faceit-cdn.net/images/a1cdf56f-6c1d-4fd2-8091-e7aa46ccbd04.jpeg",
//                 roster: [
//                     {
//                         player_id: "7e7cc507-b154-4054-bcc5-346bec28817b",
//                         nickname: "Kr0wbar",
//                         avatar: "https://distribution.faceit-cdn.net/images/3afe180e-8cfa-4a90-afb9-2baf7ddb0416.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198201095514",
//                         game_player_name: "Kr0wbar",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e616163e-ab09-470e-b7d9-6cf1ddaec09f",
//                         nickname: "MentalBr0ken",
//                         avatar: "https://distribution.faceit-cdn.net/images/0dfcc5d4-974d-4f73-ac83-fb63aacc007d.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198090311351",
//                         game_player_name: ".-",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "31cefffa-d8ea-44ee-abcf-32859335bfb6",
//                         nickname: "Willis",
//                         avatar: "https://distribution.faceit-cdn.net/images/15b05308-e281-4f11-9275-7b42e3b2dfe9.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198053680338",
//                         game_player_name: "Willis",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e28dc7fd-4bd8-4636-a6cc-6dc8da99be35",
//                         nickname: "_Beastm0de",
//                         avatar: "https://assets.faceit-cdn.net/avatars/e28dc7fd-4bd8-4636-a6cc-6dc8da99be35_1550800831726.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198204215532",
//                         game_player_name: "76561198204215532",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bc393ef1-7eb1-43fe-ab8e-188566079308",
//                         nickname: "swagmachine7",
//                         avatar: "https://distribution.faceit-cdn.net/images/684a12dc-84db-4717-ab23-45c46c484508.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198829015699",
//                         game_player_name: "♡",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Padding Egos",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-fe601c2b-941e-4b5d-b1b6-d9c045cd9a1c",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-fe601c2b-941e-4b5d-b1b6-d9c045cd9a1c",
//     },
//     {
//         match_id: "1-6ddefdb8-a8d6-41dc-8463-505d0a11e98e",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "e2d530ae-2ce6-491c-9213-0edf2027f802",
//                 leader: "5aee7aeb-dbb0-4fe4-a7d0-95f0eb970dd8",
//                 avatar: "",
//                 roster: [
//                     {
//                         player_id: "5aee7aeb-dbb0-4fe4-a7d0-95f0eb970dd8",
//                         nickname: "Owen",
//                         avatar: "",
//                         membership: "premium",
//                         game_player_id: "76561198251208570",
//                         game_player_name: "Owen sinseriously cs.money",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8f8d4036-4ea4-413e-83bc-29c0fad4e588",
//                         nickname: "jax",
//                         avatar: "https://distribution.faceit-cdn.net/images/deb9f1bb-5a13-4c0c-8e26-0e2ee91c2cfd.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198370554798",
//                         game_player_name: "Jax",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "36af3b60-8d06-496f-ac8f-cc0d3fa9511b",
//                         nickname: "Jaid",
//                         avatar: "https://distribution.faceit-cdn.net/images/091d740b-b6e0-4fdb-a280-daa7a6416e08.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198102249566",
//                         game_player_name: "POWNAGE",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6d88d2ac-7b06-4b1a-9e28-a0187be60ea6",
//                         nickname: "nova_iwl",
//                         avatar: "https://distribution.faceit-cdn.net/images/b84682ca-ec6b-4a2f-aeb1-d3b83d29d50a.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198085546543",
//                         game_player_name: "Nova",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "81c6614e-82b5-4f04-93f4-6dbc987cb013",
//                         nickname: "t0pshadow",
//                         avatar: "https://distribution.faceit-cdn.net/images/b710d085-9a3f-4153-a9d2-7486f1522fa8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198842482263",
//                         game_player_name: "topshadow",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Sleepless_Gaming",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "be7fde88-1e05-493a-9861-02a0a48e3bc0",
//                 leader: "25518de8-4f33-4b23-856f-cad03c72df0f",
//                 avatar: "https://distribution.faceit-cdn.net/images/c417aaf4-d6ac-4f5b-8fe6-d3a339cb8385.jpeg",
//                 roster: [
//                     {
//                         player_id: "25518de8-4f33-4b23-856f-cad03c72df0f",
//                         nickname: "looke",
//                         avatar: "https://distribution.faceit-cdn.net/images/5f9c6df0-d412-48ff-aa34-fe62a3cbd3fb.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198158186387",
//                         game_player_name: "looke",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bb23263e-b3d5-4c47-b523-4cd7ce19b4c9",
//                         nickname: "jr24racing",
//                         avatar: "https://assets.faceit-cdn.net/avatars/bb23263e-b3d5-4c47-b523-4cd7ce19b4c9_1550612506647.png",
//                         membership: "premium",
//                         game_player_id: "76561198063907749",
//                         game_player_name: "Jr24racing",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "58d47b80-bb57-4adf-9e25-a8d306239834",
//                         nickname: "Msaia",
//                         avatar: "https://distribution.faceit-cdn.net/images/1b96e24b-0d3d-42f2-a3d0-19c86119e1c9.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143458644",
//                         game_player_name: "Msaia",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "2ee3927f-69a4-4277-85f8-5914a6f07cf7",
//                         nickname: "KURIMAKOV",
//                         avatar: "https://distribution.faceit-cdn.net/images/ac4c2413-342c-4278-8c02-84ea8f73a586.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198210861457",
//                         game_player_name: "KURIMAKOV",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a53eb25c-a4b6-4400-9b91-4cea9634bc4a",
//                         nickname: "1TOASTY",
//                         avatar: "https://distribution.faceit-cdn.net/images/0311d9d1-8ce0-4459-bdac-378931c33193.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198122470381",
//                         game_player_name: "TOASTY",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "NuTorious",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-6ddefdb8-a8d6-41dc-8463-505d0a11e98e",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-6ddefdb8-a8d6-41dc-8463-505d0a11e98e",
//     },
//     {
//         match_id: "1-e5d79f07-e32b-43af-85b7-d48712604d02",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "9da3249b-9cd7-4157-88b8-0925d05207b3",
//                 leader: "554f41c0-54c4-484d-a516-cbfbf086b7f9",
//                 avatar: "https://distribution.faceit-cdn.net/images/f56ae265-8eb0-4697-986c-8e4328f5d1a6.jpeg",
//                 roster: [
//                     {
//                         player_id: "554f41c0-54c4-484d-a516-cbfbf086b7f9",
//                         nickname: "Sanity",
//                         avatar: "https://distribution.faceit-cdn.net/images/f6bac326-f895-422d-ad5b-304ee07efdaf.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198506019999",
//                         game_player_name: "Sanity",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "04427b3b-cd1e-4116-aabe-a6fe929586b2",
//                         nickname: "Lotkix",
//                         avatar: "https://distribution.faceit-cdn.net/images/4ca23fc5-b64c-451b-8e65-e1bf5b855130.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198081280863",
//                         game_player_name: "Lotkix",
//                         game_skill_level: 7,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "fd8927ff-b9f7-46fc-8bee-531b206795e2",
//                         nickname: "JAVVY",
//                         avatar: "https://distribution.faceit-cdn.net/images/89010ed3-74a2-4690-8895-19796494aead.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198263387426",
//                         game_player_name: "J4V!X",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ea314286-1ad6-4f62-9cbd-4439f10d8b76",
//                         nickname: "JTILL",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ea314286-1ad6-4f62-9cbd-4439f10d8b76_1593578564477.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198141386857",
//                         game_player_name: "JTILL",
//                         game_skill_level: 8,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4e0513e3-62ac-4a9a-a86f-0207b2e7035c",
//                         nickname: "CY0NiK",
//                         avatar: "https://assets.faceit-cdn.net/avatars/4e0513e3-62ac-4a9a-a86f-0207b2e7035c_1551228532561.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198105793675",
//                         game_player_name: "CY0NiK",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "4US",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "c7b45641-cc98-4377-88fa-09f3e577e997",
//                 leader: "e100e643-d932-49e8-8ead-7528e5e298ad",
//                 avatar: "https://distribution.faceit-cdn.net/images/0e1b481f-3d9a-4ece-a3f7-b0575d3a3a7b.jpeg",
//                 roster: [
//                     {
//                         player_id: "e100e643-d932-49e8-8ead-7528e5e298ad",
//                         nickname: "LevelDown",
//                         avatar: "https://distribution.faceit-cdn.net/images/53a725a8-aa2e-4bc3-9756-77466f613ccd.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198119200921",
//                         game_player_name: "LevelDown",
//                         game_skill_level: 8,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "882a6a3d-efea-4400-b922-b0f38bd93508",
//                         nickname: "FangZzZ",
//                         avatar: "https://distribution.faceit-cdn.net/images/2e77bf49-8c59-4725-9bee-8ce431943cc2.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198103630258",
//                         game_player_name: "FangZzZ",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d399da51-dda5-4eaf-9394-1d3d342e25f6",
//                         nickname: "wutdowutdo",
//                         avatar: "https://distribution.faceit-cdn.net/images/714c312c-08c6-4397-9607-009325db82fc.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198874383776",
//                         game_player_name: "✧wut-do-wut-do✧",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c9be2e28-7379-4751-9680-127c59a26846",
//                         nickname: "Radarorleo",
//                         avatar: "https://distribution.faceit-cdn.net/images/663278dd-1ec6-4e6d-b0ec-ddb88888e6db.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198088146102",
//                         game_player_name: "Radar",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "2a8fe63b-859e-4d36-835f-5cf93ab89331",
//                         nickname: "Jay_",
//                         avatar: "https://distribution.faceit-cdn.net/images/6c615743-55cb-430c-b1e3-efa8d4a94fed.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198203193489",
//                         game_player_name: "YEP block",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Arrival Seven",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-e5d79f07-e32b-43af-85b7-d48712604d02",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-e5d79f07-e32b-43af-85b7-d48712604d02",
//     },
//     {
//         match_id: "1-eb70034b-85d9-4844-aa11-02ee728018c8",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "a4b1806e-9cd9-4ffb-95a6-ca0e7a26b6fb",
//                 leader: "0dcae56f-4a84-4c1d-84c3-b83cca9bfe27",
//                 avatar: "https://distribution.faceit-cdn.net/images/7b4eddcb-d0d4-4658-92da-0e7e4b9c71f1.jpeg",
//                 roster: [
//                     {
//                         player_id: "0dcae56f-4a84-4c1d-84c3-b83cca9bfe27",
//                         nickname: "jBREEEZY",
//                         avatar: "https://assets.faceit-cdn.net/avatars/0dcae56f-4a84-4c1d-84c3-b83cca9bfe27_1550845706365.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198201964492",
//                         game_player_name: "76561198201964492",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c5d76817-97cc-4d24-8d87-aa9259b78783",
//                         nickname: "absolut-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/c5d76817-97cc-4d24-8d87-aa9259b78783_1550791984162.png",
//                         membership: "premium",
//                         game_player_id: "76561198205116051",
//                         game_player_name: "Absolute",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "aaba5bad-82a6-4444-ab6c-60e9fa3b0fc8",
//                         nickname: "hype-_-",
//                         avatar: "https://distribution.faceit-cdn.net/images/32adf89a-e4d6-4e84-9be6-7877987d0fc5.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198083756391",
//                         game_player_name: "shrimplord777",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "117441a9-2a83-424f-a740-9463cecb5cc4",
//                         nickname: "Sunk_",
//                         avatar: "https://distribution.faceit-cdn.net/images/338d1a6c-4add-4f28-b497-67964266260e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198174932007",
//                         game_player_name: "Sunk",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "952b0c28-efb2-4ca0-b74a-a4bb2843c2ae",
//                         nickname: "s3rum_",
//                         avatar: "https://distribution.faceit-cdn.net/images/7b51e0b0-de13-4a1f-8231-2e0003215903.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198415592916",
//                         game_player_name: "s3rum",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "drugs n pugs",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "380fbad8-5cb2-4a31-ab50-42c686034dce",
//                 leader: "7fc130ea-2eba-47db-997d-baf2f17f5adc",
//                 avatar: "https://distribution.faceit-cdn.net/images/e3f3bba0-0130-4c3f-b75d-d5bd38921f98.jpeg",
//                 roster: [
//                     {
//                         player_id: "7fc130ea-2eba-47db-997d-baf2f17f5adc",
//                         nickname: "fArt",
//                         avatar: "https://distribution.faceit-cdn.net/images/eac2b11d-4d56-4978-b688-f4a7f3fe489b.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198067835427",
//                         game_player_name: "fArt",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8da05ee7-3c1d-4a7c-80c5-306d08bf6cd4",
//                         nickname: "-Roo",
//                         avatar: "https://distribution.faceit-cdn.net/images/66b66645-019a-4170-9be4-855f7930ae08.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198196904981",
//                         game_player_name: "wyan",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "894be8b7-9184-4b73-957d-61f9f4886796",
//                         nickname: "dinner",
//                         avatar: "https://distribution.faceit-cdn.net/images/81c9b443-1b33-476e-907a-87fb61ea3166.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198106604547",
//                         game_player_name: "dinner",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8d93ee2e-dc58-4d99-b9cd-fe8746f2925d",
//                         nickname: "bingus",
//                         avatar: "https://distribution.faceit-cdn.net/images/c878b55a-ee41-4cad-9881-d35543291d50.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561199033266459",
//                         game_player_name: "bingus",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "80c2ccaf-3684-4a50-b587-1ed964299149",
//                         nickname: "weine",
//                         avatar: "https://distribution.faceit-cdn.net/images/ac3d3080-1d4a-43d4-8d2e-72caea3e6c6e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198044739114",
//                         game_player_name: "weine",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Omen Esports",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-eb70034b-85d9-4844-aa11-02ee728018c8",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-eb70034b-85d9-4844-aa11-02ee728018c8",
//     },
//     {
//         match_id: "1-fb79d7ee-1841-424e-99e8-10dced1fd27f",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "e71b58f3-2f0d-4f4e-a2ce-79e7b4847599",
//                 leader: "8d322d40-0a9e-41f6-8195-39183c73fe1e",
//                 avatar: "https://distribution.faceit-cdn.net/images/98711d00-5d4c-45cc-8f46-c1d3cd968d3f.jpeg",
//                 roster: [
//                     {
//                         player_id: "8d322d40-0a9e-41f6-8195-39183c73fe1e",
//                         nickname: "micro",
//                         avatar: "https://distribution.faceit-cdn.net/images/d1c46172-bb6f-46a6-a2e1-d8c914fa6e82.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198072040762",
//                         game_player_name: "micro",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "55dac018-93a9-4d73-adca-0aea7f6b80b7",
//                         nickname: "Arias",
//                         avatar: "https://distribution.faceit-cdn.net/images/8d80fffc-5da3-401a-b5f7-b7ed4eab2662.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198161279781",
//                         game_player_name: "✪ Arias",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4dfa76fd-23a2-4dcf-89a4-25e3d3704cc0",
//                         nickname: "tender272",
//                         avatar: "https://distribution.faceit-cdn.net/images/c73d410b-6df4-4d3e-be39-33bdddb367e6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197993724724",
//                         game_player_name: "tender",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a4deda37-cddb-4424-801c-f83f82013a9a",
//                         nickname: "flow",
//                         avatar: "https://distribution.faceit-cdn.net/images/7ae107c9-c511-400d-83ca-d7890b9abba5.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198086662677",
//                         game_player_name: "flow",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4137ee42-971c-4874-8ec8-688dcc779aa3",
//                         nickname: "clipzera",
//                         avatar: "https://distribution.faceit-cdn.net/images/8fb65a6a-ba3b-4086-b783-a50b3a62fdae.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198859037781",
//                         game_player_name: "clipzera",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "SUPER EVIL GANG",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "4a21e366-941d-4ab3-9af6-116c6f35ce85",
//                 leader: "bdfcc2e9-3ba3-4dc7-96d5-f9cba937fd3d",
//                 avatar: "https://distribution.faceit-cdn.net/images/d7cb041e-449a-4c23-b8a6-3a9029c792fc.jpg",
//                 roster: [
//                     {
//                         player_id: "bdfcc2e9-3ba3-4dc7-96d5-f9cba937fd3d",
//                         nickname: "catoire",
//                         avatar: "https://distribution.faceit-cdn.net/images/e027cbd6-6a70-463f-979b-b7eb40ad42a8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198836984247",
//                         game_player_name: "catoire",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d9b26020-61a6-4774-b206-13c49c6555c8",
//                         nickname: "mob",
//                         avatar: "https://distribution.faceit-cdn.net/images/540e824a-1538-4693-98e7-0ae121c43c75.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199016429540",
//                         game_player_name: "Mob",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "32e84e2c-92dc-4532-b9a7-22b7c94b2fee",
//                         nickname: "Coco",
//                         avatar: "https://distribution.faceit-cdn.net/images/9d8f9035-3057-43a6-a365-3ceb81c17b88.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198892187723",
//                         game_player_name: "<3 pancake",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "794376ff-b711-4a9d-a3a6-0ca546818aa1",
//                         nickname: "Vipum",
//                         avatar: "https://distribution.faceit-cdn.net/images/10e5b308-3f08-402d-85ff-bca0d7659362.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198120911458",
//                         game_player_name: "Vipum",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "daeafcf6-e0e6-4a28-b1fb-403607230ee0",
//                         nickname: "pancake",
//                         avatar: "https://distribution.faceit-cdn.net/images/7a537ffc-3fa6-4168-97ad-dad35086c1d1.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198377297186",
//                         game_player_name: "<3 Coco",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Desolate",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-fb79d7ee-1841-424e-99e8-10dced1fd27f",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-fb79d7ee-1841-424e-99e8-10dced1fd27f",
//     },
//     {
//         match_id: "1-f78aab0b-7509-4824-831a-d8ade3143993",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "1bf2f5d2-996c-409f-8607-c9019193daa6",
//                 leader: "6898a003-4255-45b2-8250-bd22fc80a8a8",
//                 avatar: "https://distribution.faceit-cdn.net/images/31c1866c-4a0d-45aa-b1d7-a3e16e290b68.jpg",
//                 roster: [
//                     {
//                         player_id: "6898a003-4255-45b2-8250-bd22fc80a8a8",
//                         nickname: "fatguy",
//                         avatar: "https://assets.faceit-cdn.net/avatars/6898a003-4255-45b2-8250-bd22fc80a8a8_1579401144029.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198920156745",
//                         game_player_name: "FATGUY",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "02ddf289-4dea-432f-b52c-ba022677b0c1",
//                         nickname: "SeRCEra",
//                         avatar: "https://distribution.faceit-cdn.net/images/0b0cec21-9c85-4d02-bc82-381642f53c86.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198084094542",
//                         game_player_name: "Serce",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f6ff5894-6db0-4110-b075-d731c9477e89",
//                         nickname: "woah",
//                         avatar: "https://assets.faceit-cdn.net/avatars/f6ff5894-6db0-4110-b075-d731c9477e89_1550972795861.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198070915284",
//                         game_player_name: "Daddy Issues",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c6649075-a591-4a3d-8bde-22e59e3e637f",
//                         nickname: "coIin",
//                         avatar: "https://distribution.faceit-cdn.net/images/6348e328-701a-437b-a386-6d4329ba1a8e.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198303033177",
//                         game_player_name: "colin",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1e0c99e0-9fd8-451b-8847-63d2b6eac7da",
//                         nickname: "-dinky-",
//                         avatar: "https://distribution.faceit-cdn.net/images/5a2bbec9-cf19-445e-9d68-016d2a375d8d.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198086139579",
//                         game_player_name: "dinky",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "i hate sand",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "15c9a36f-8169-49eb-a41b-0a0e7567ed37",
//                 leader: "e7aa2313-f911-41f5-9508-ffac9964e6c1",
//                 avatar: "https://distribution.faceit-cdn.net/images/ba824d33-a4bb-4ed7-92b7-f73439496f3a.jpeg",
//                 roster: [
//                     {
//                         player_id: "e7aa2313-f911-41f5-9508-ffac9964e6c1",
//                         nickname: "-MJB",
//                         avatar: "https://distribution.faceit-cdn.net/images/ba824d33-a4bb-4ed7-92b7-f73439496f3a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198211483115",
//                         game_player_name: "BJM",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "0b17828f-6879-41ea-a6b5-ffbdb6a0daa5",
//                         nickname: "yatos",
//                         avatar: "https://distribution.faceit-cdn.net/images/becbe82a-7d7b-45d6-8d70-cb0d676b9115.jpeg",
//                         membership: "free",
//                         game_player_id: "76561198110256430",
//                         game_player_name: "Yatos",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "96b2d316-3289-4e38-9f58-7b6e5efff4a3",
//                         nickname: "hoax",
//                         avatar: "https://distribution.faceit-cdn.net/images/930bef54-7eb4-42dd-a968-05e2281af4d8.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198855633260",
//                         game_player_name: "hoax",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1f05ff73-d407-43bb-bb64-a6f33f9cc65d",
//                         nickname: "xCaptain",
//                         avatar: "https://distribution.faceit-cdn.net/images/2bd0d56e-8f84-44e6-ad75-d34fbf409e3d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198209992732",
//                         game_player_name: "Xcaptain",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dffebb52-77c9-4380-bbe6-32bf59107ebd",
//                         nickname: "stuffing",
//                         avatar: "https://distribution.faceit-cdn.net/images/c4aa33ae-e026-4b44-b60d-23a34c34412d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198213927241",
//                         game_player_name: "stuffing",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Gremlin Gang",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-f78aab0b-7509-4824-831a-d8ade3143993",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-f78aab0b-7509-4824-831a-d8ade3143993",
//     },
//     {
//         match_id: "1-f7311f36-da1c-4f62-b1ec-1dd919058e22",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "8ab8e348-085d-473b-9084-a67a0d26281a",
//                 leader: "1e627857-8cca-4b62-8934-925610ec2ba9",
//                 avatar: "https://distribution.faceit-cdn.net/images/fb300145-0b96-49d0-8642-f45c5892f342.jpeg",
//                 roster: [
//                     {
//                         player_id: "1e627857-8cca-4b62-8934-925610ec2ba9",
//                         nickname: "syper",
//                         avatar: "https://distribution.faceit-cdn.net/images/0808bfa3-addd-4e9f-8770-5c44dfc22e25.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198132457883",
//                         game_player_name: "syper",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "edd27f56-7644-4b84-ae29-b3f3951c92b0",
//                         nickname: "-linK",
//                         avatar: "https://distribution.faceit-cdn.net/images/acc206a1-fa69-42dc-939a-7bb86fb1237f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198203353310",
//                         game_player_name: "linK",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dac8fada-ddfd-4977-bf03-dfd56962976d",
//                         nickname: "wilbert",
//                         avatar: "https://distribution.faceit-cdn.net/images/65bbe6e3-4936-47f1-94fc-1a98d2940eb6.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198039661263",
//                         game_player_name: "Wilson",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d3b17c3e-7854-4c00-8f4f-a94b06206764",
//                         nickname: "sephB",
//                         avatar: "https://distribution.faceit-cdn.net/images/18d027fa-4aa5-46d2-8b2d-11e848a35196.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198103827365",
//                         game_player_name: "JoeyTheBiggest",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4e2762da-99e1-4c12-abd4-92576156ee13",
//                         nickname: "Killj0y",
//                         avatar: "https://distribution.faceit-cdn.net/images/26835299-93dd-40d1-b38c-59ee9d1688cb.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198114593821",
//                         game_player_name: "Killj0y",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Chuck E Cheese",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "aa5b4bc5-60a2-4ef4-8c52-39786563d4c0",
//                 leader: "a5a8c2be-796d-4432-a4fb-c0a6cf7cefa7",
//                 avatar: "https://distribution.faceit-cdn.net/images/5505f7ec-0d01-455f-91b5-90a8c286e755.jpeg",
//                 roster: [
//                     {
//                         player_id: "a5a8c2be-796d-4432-a4fb-c0a6cf7cefa7",
//                         nickname: "Neeks",
//                         avatar: "https://distribution.faceit-cdn.net/images/39ed15e8-63ae-4a27-bb76-fb649ca8265b.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198858060704",
//                         game_player_name: "Neeks",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "46e2e9aa-db98-4bcf-a5df-9040b9dfacc3",
//                         nickname: "zaetep",
//                         avatar: "https://distribution.faceit-cdn.net/images/e9883ab7-6906-42f9-b5ea-4b6f14f6b416.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198272002327",
//                         game_player_name: "zaetep",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "89b4e16e-877a-4f1a-9601-e7832ca49d5f",
//                         nickname: "nass",
//                         avatar: "https://distribution.faceit-cdn.net/images/94498ae2-b562-4825-b448-c7da921dba69.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198182298625",
//                         game_player_name: "nass",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d990be14-caf6-49f6-a036-7a2f31803db8",
//                         nickname: "Just_Jesse",
//                         avatar: "https://distribution.faceit-cdn.net/images/ce364186-7521-48f9-9245-74297f2d65d7.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198186465426",
//                         game_player_name: "Just Jesse",
//                         game_skill_level: 7,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6110ba82-25c7-48eb-80e8-dcf828956b0f",
//                         nickname: "Kole24",
//                         avatar: "https://distribution.faceit-cdn.net/images/7398b8d9-b1c7-4301-a961-b051a8fdd3b6.jpg",
//                         membership: "esea",
//                         game_player_id: "76561197986299805",
//                         game_player_name: "Kole",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "FoxTrot",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-f7311f36-da1c-4f62-b1ec-1dd919058e22",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-f7311f36-da1c-4f62-b1ec-1dd919058e22",
//     },
//     {
//         match_id: "1-58d1e9eb-4e08-416b-9798-def3b53b6885",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "c500642a-479e-41f4-b75b-39784c6ecf0b",
//                 leader: "85b0498e-15f4-4641-9ad4-bf239b0d6534",
//                 avatar: "https://distribution.faceit-cdn.net/images/82b21d21-29e8-4f15-bfe5-cdc8b92eea7c.jpg",
//                 roster: [
//                     {
//                         player_id: "85b0498e-15f4-4641-9ad4-bf239b0d6534",
//                         nickname: "zBanss",
//                         avatar: "https://distribution.faceit-cdn.net/images/6c6a7e3b-784e-4f2f-8b17-d6e6d17d2946.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198803881281",
//                         game_player_name: "Banss",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "91b947bc-c1ba-49e1-84d0-75448f79ff40",
//                         nickname: "JTrops",
//                         avatar: "https://assets.faceit-cdn.net/avatars/91b947bc-c1ba-49e1-84d0-75448f79ff40_1550999535821.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198250018852",
//                         game_player_name: "JTrops",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "97efd820-f2ec-4d2b-83d2-21b04e16db88",
//                         nickname: "LoneStarrr",
//                         avatar: "https://assets.faceit-cdn.net/avatars/97efd820-f2ec-4d2b-83d2-21b04e16db88_1570489716505.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198093357053",
//                         game_player_name: "LoneStarrr",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "50440888-707d-400d-9bf7-9923c40fdd81",
//                         nickname: "-DacS-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/50440888-707d-400d-9bf7-9923c40fdd81_1551291225689.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198175815589",
//                         game_player_name: "✪ DacS",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a2beb030-46fb-4842-9843-a153cb15666c",
//                         nickname: "Meechu",
//                         avatar: "https://assets.faceit-cdn.net/avatars/a2beb030-46fb-4842-9843-a153cb15666c_1550735038360.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198020611300",
//                         game_player_name: "Meechu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Neon Lights",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "d34be1b4-bbd1-4076-9e5e-fadcdbc70f51",
//                 leader: "6cae9693-8d89-4183-abe1-2d4cc13e9d88",
//                 avatar: "https://distribution.faceit-cdn.net/images/ad6c27c2-dffa-4440-b968-a1ebb520c878.jpeg",
//                 roster: [
//                     {
//                         player_id: "6cae9693-8d89-4183-abe1-2d4cc13e9d88",
//                         nickname: "fa0",
//                         avatar: "https://distribution.faceit-cdn.net/images/142a4924-8312-46bb-8724-7b16449aae6d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198244217162",
//                         game_player_name: "fa0",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "41bf611a-94d9-4b4e-8512-1a047fd2374f",
//                         nickname: "detoxd",
//                         avatar: "https://assets.faceit-cdn.net/avatars/41bf611a-94d9-4b4e-8512-1a047fd2374f_1595567018533.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198242063304",
//                         game_player_name: "detox7",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "7856aa27-c29a-46b2-84b2-2677070f9c5b",
//                         nickname: "Sickeningbre",
//                         avatar: "https://assets.faceit-cdn.net/avatars/7856aa27-c29a-46b2-84b2-2677070f9c5b_1550761873959.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198053617856",
//                         game_player_name: "76561198053617856",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5441c421-1d7a-48ff-ae78-f54cefd62f27",
//                         nickname: "spl1ce",
//                         avatar: "https://distribution.faceit-cdn.net/images/8f93dd2f-2b98-4649-8b23-40e31b210b11.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199122127558",
//                         game_player_name: "spl1ce",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "26cb8ebf-b679-4fc5-b8f0-e2d29f0cb1cf",
//                         nickname: "Kaema-_-",
//                         avatar: "https://distribution.faceit-cdn.net/images/46a4df19-5b16-49ca-9d8c-076d69b5aae0.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198801271639",
//                         game_player_name: "KaemaNANI",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Asoka",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749778200,
//         chat_room_id: "match-1-58d1e9eb-4e08-416b-9798-def3b53b6885",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-58d1e9eb-4e08-416b-9798-def3b53b6885",
//     },
//     {
//         match_id: "1-24a33058-fb1d-4079-9fd2-9a38f0ebfa06",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "932eb89c-1db6-4529-9b9d-ff920477081d",
//                 leader: "a82fb9f2-a7cd-42b1-b7c3-1ed8e21ae78a",
//                 avatar: "https://distribution.faceit-cdn.net/images/8d850577-772a-4965-a5a1-6e98a544a163.jpeg",
//                 roster: [
//                     {
//                         player_id: "a82fb9f2-a7cd-42b1-b7c3-1ed8e21ae78a",
//                         nickname: "sveetea",
//                         avatar: "https://distribution.faceit-cdn.net/images/04fac171-d84d-4a1c-999e-5a270f59bf68.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198031153660",
//                         game_player_name: "mac",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cbff9326-7403-420c-8820-2ab3524e38d7",
//                         nickname: "omoo",
//                         avatar: "https://assets.faceit-cdn.net/avatars/cbff9326-7403-420c-8820-2ab3524e38d7_1576908812216.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198129662585",
//                         game_player_name: "omoo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f185cf7c-ac29-48c1-98f3-5ae5dbf74e4f",
//                         nickname: "emblem",
//                         avatar: "https://assets.faceit-cdn.net/avatars/f185cf7c-ac29-48c1-98f3-5ae5dbf74e4f_1605776128837.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198262349134",
//                         game_player_name: "emblem",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8153acc4-fe7a-4caa-8feb-c6639b7303f7",
//                         nickname: "FlashET",
//                         avatar: "https://distribution.faceit-cdn.net/images/f774e356-8b56-4126-ad16-93dd2368b85e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198164978045",
//                         game_player_name: "76561198164978045",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5db9b4be-be77-458f-9a1d-9e49e53873ff",
//                         nickname: "Larryw1k",
//                         avatar: "https://assets.faceit-cdn.net/avatars/5db9b4be-be77-458f-9a1d-9e49e53873ff_1551225205576.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198807221293",
//                         game_player_name: "Larry5k",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Holly Molly",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "7f44aa73-bc8e-4847-b4a0-cff295de73d4",
//                 leader: "aad67473-fe53-4ac6-9db8-0f901211eb77",
//                 avatar: "https://distribution.faceit-cdn.net/images/0eb7ccf1-91b6-44f7-9ef5-178eda3797ec.jpg",
//                 roster: [
//                     {
//                         player_id: "aad67473-fe53-4ac6-9db8-0f901211eb77",
//                         nickname: "metallica",
//                         avatar: "https://distribution.faceit-cdn.net/images/78bbdf84-a801-4a96-b20d-07b48b615165.jpg",
//                         membership: "esea",
//                         game_player_id: "76561199301313701",
//                         game_player_name: "metallica",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1861fbb2-1376-4cc6-a2a1-9ae67e6ac9ce",
//                         nickname: "Valter0k",
//                         avatar: "https://distribution.faceit-cdn.net/images/f52e3261-f731-49e1-8774-f723a7af0b52.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198880100341",
//                         game_player_name: "egoisto (selfish)",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "666073f2-e2b3-4912-a212-1ee32a36f8ab",
//                         nickname: "mao-",
//                         avatar: "https://distribution.faceit-cdn.net/images/13a96eba-ab56-4453-8c6a-f81599672de3.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198989474093",
//                         game_player_name: "семнадцать",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "fc0e341e-c443-4cd3-9bb7-3fb65bd37166",
//                         nickname: "iceezze-",
//                         avatar: "https://distribution.faceit-cdn.net/images/acb6af0b-c301-4b08-8c18-733611da7a14.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198133773586",
//                         game_player_name: "iceezze",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "7afdd81a-cccd-4f43-9d8c-4961bf49714a",
//                         nickname: "H0NeST",
//                         avatar: "https://distribution.faceit-cdn.net/images/bd095272-a4f3-4285-8edf-0db9b748053a.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198404474914",
//                         game_player_name: "H0NeST",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "hryvnia squad",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749780000,
//         chat_room_id: "match-1-24a33058-fb1d-4079-9fd2-9a38f0ebfa06",
//         best_of: 3,
//         status: "SCHEDULED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-24a33058-fb1d-4079-9fd2-9a38f0ebfa06",
//     },
//     {
//         match_id: "1-9fbabda6-5ad7-4209-8a24-8eb80e8b4ea6",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "85193f96-601d-4118-a267-c19dc855f93a",
//                 leader: "1dbdfbdb-1fdd-45d1-84f4-268fde6419a4",
//                 avatar: "https://distribution.faceit-cdn.net/images/c2475097-069e-475e-a209-85e24be74e12.jpeg",
//                 roster: [
//                     {
//                         player_id: "1dbdfbdb-1fdd-45d1-84f4-268fde6419a4",
//                         nickname: "myline",
//                         avatar: "https://distribution.faceit-cdn.net/images/df8329a1-fccc-4abb-b8b2-fcd81a990bbd.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199188194908",
//                         game_player_name: "sigma boy",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "791be159-025d-452c-8d3b-c5ae66307032",
//                         nickname: "5LAZY",
//                         avatar: "https://distribution.faceit-cdn.net/images/9c450d5d-b513-4ca8-8e58-c11e9129e906.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561199008914020",
//                         game_player_name: "lazyyyyyyy",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "83d32ce9-2e19-46b8-b981-4a1a557ac397",
//                         nickname: "knifa",
//                         avatar: "https://distribution.faceit-cdn.net/images/f1ee4abc-b653-4edf-b71c-525cac94b254.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198864228868",
//                         game_player_name: "TheKnife",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f3c9e263-a540-40fa-816c-cb4560835140",
//                         nickname: "sentiallll",
//                         avatar: "https://distribution.faceit-cdn.net/images/a12e08c2-1fac-4b79-ab10-b2fda2ce9560.jpg",
//                         membership: "premium",
//                         game_player_id: "76561199066681170",
//                         game_player_name: "mmmmm",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "58a89996-7791-4e45-924d-6e3cc4e7bd90",
//                         nickname: "Zoker",
//                         avatar: "https://distribution.faceit-cdn.net/images/a908e850-1a9e-4aee-90e9-52a10ccd6af0.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198988113622",
//                         game_player_name: "Zoker",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "antigrind",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "46e6a1e1-6dd2-4fc7-a496-3fa2cd0f4c0a",
//                 leader: "a36af305-a28e-4486-9714-4d39a89d3a46",
//                 avatar: "https://distribution.faceit-cdn.net/images/759c634b-0012-4811-8cab-68b71419e62e.jpg",
//                 roster: [
//                     {
//                         player_id: "a36af305-a28e-4486-9714-4d39a89d3a46",
//                         nickname: "OBCD",
//                         avatar: "https://distribution.faceit-cdn.net/images/759c634b-0012-4811-8cab-68b71419e62e.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198366719875",
//                         game_player_name: "Debrsi2k",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ca958026-d529-42ad-b9b7-4d50dca1b7e8",
//                         nickname: "false",
//                         avatar: "https://distribution.faceit-cdn.net/images/2366e9c2-3fd3-43a9-b9ec-0beca86bda17.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198116139033",
//                         game_player_name: "false",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "3f73761a-6f93-46e4-a944-94be58dc1bd3",
//                         nickname: "chroma",
//                         avatar: "https://distribution.faceit-cdn.net/images/cd286848-0e2b-4d4e-8b16-0ecefb68645f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198875847072",
//                         game_player_name: "chrommaa",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9fe61c59-ccc2-45da-bd75-64032077bade",
//                         nickname: "sharkboy",
//                         avatar: "https://distribution.faceit-cdn.net/images/a3c72f3d-6eb9-49de-8a87-0bc7b943cf45.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198264699326",
//                         game_player_name: "water",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "faea4e59-670b-4663-960d-2bb2734c552d",
//                         nickname: "BustAnutt",
//                         avatar: "https://distribution.faceit-cdn.net/images/ccc80793-0d50-4873-84db-af341b21a9e8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198262556572",
//                         game_player_name: "BustAnut",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Demolition",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                     },
//                     {
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                     },
//                     {
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_mirage", "de_anubis", "de_ancient"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749605400,
//         configured_at: 1749611006,
//         started_at: 1749611433,
//         finished_at: 1749614031,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-9fbabda6-5ad7-4209-8a24-8eb80e8b4ea6-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-9fbabda6-5ad7-4209-8a24-8eb80e8b4ea6-2-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-9fbabda6-5ad7-4209-8a24-8eb80e8b4ea6-3-1.dem.zst",
//         ],
//         chat_room_id: "match-1-9fbabda6-5ad7-4209-8a24-8eb80e8b4ea6",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction2: 1,
//                 faction1: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-9fbabda6-5ad7-4209-8a24-8eb80e8b4ea6",
//     },
//     {
//         match_id: "1-deb88d67-0420-4401-9a28-a7e0b288f95f",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "7c162f95-c40c-425f-94d5-4dff61e3ac62",
//                 leader: "cdc3e08f-e87f-4ac3-9f3e-ba864a6f544e",
//                 avatar: "https://distribution.faceit-cdn.net/images/2eeaa68e-4ddf-45fb-98da-f454092f06ca.jpeg",
//                 roster: [
//                     {
//                         player_id: "cdc3e08f-e87f-4ac3-9f3e-ba864a6f544e",
//                         nickname: "---Beast",
//                         avatar: "https://distribution.faceit-cdn.net/images/48b21bec-a3bb-41a7-aa73-8776aa8cb30a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198057153682",
//                         game_player_name: "Beast",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e3c533ef-e677-4724-b179-e2dc17ff9aae",
//                         nickname: "Oczarka",
//                         avatar: "https://distribution.faceit-cdn.net/images/c2ebed78-f21f-4cc3-bb52-15b8e9479926.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198347516938",
//                         game_player_name: "Oczarka",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1fbd13d4-a36e-4476-8e4c-691f29ab5802",
//                         nickname: "1TyRa",
//                         avatar: "https://distribution.faceit-cdn.net/images/d84c3009-9164-4e14-bf6f-a832760a8fef.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198837643069",
//                         game_player_name: "DEMON",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "55c2136f-22c1-41f5-b0da-88978eb8fc56",
//                         nickname: "Scorchyy",
//                         avatar: "https://distribution.faceit-cdn.net/images/12cb6c3a-5366-4c82-9691-c1a5581e8383.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198173968051",
//                         game_player_name: "Scorchyy",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "3d941bf2-c1a0-40d1-a831-7c61438b1ad8",
//                         nickname: "jsfeltner",
//                         avatar: "https://distribution.faceit-cdn.net/images/2a96f7c9-19d2-4dcf-81b7-4d7cfcf2e33b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198052394260",
//                         game_player_name: "jsfeltner",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "InControl",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "15c9a36f-8169-49eb-a41b-0a0e7567ed37",
//                 leader: "e7aa2313-f911-41f5-9508-ffac9964e6c1",
//                 avatar: "https://distribution.faceit-cdn.net/images/ba824d33-a4bb-4ed7-92b7-f73439496f3a.jpeg",
//                 roster: [
//                     {
//                         player_id: "e7aa2313-f911-41f5-9508-ffac9964e6c1",
//                         nickname: "-MJB",
//                         avatar: "https://distribution.faceit-cdn.net/images/ba824d33-a4bb-4ed7-92b7-f73439496f3a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198211483115",
//                         game_player_name: "BJM",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "0b17828f-6879-41ea-a6b5-ffbdb6a0daa5",
//                         nickname: "yatos",
//                         avatar: "https://distribution.faceit-cdn.net/images/becbe82a-7d7b-45d6-8d70-cb0d676b9115.jpeg",
//                         membership: "free",
//                         game_player_id: "76561198110256430",
//                         game_player_name: "Yatos",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "96b2d316-3289-4e38-9f58-7b6e5efff4a3",
//                         nickname: "hoax",
//                         avatar: "https://distribution.faceit-cdn.net/images/930bef54-7eb4-42dd-a968-05e2281af4d8.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198855633260",
//                         game_player_name: "hoax",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1f05ff73-d407-43bb-bb64-a6f33f9cc65d",
//                         nickname: "xCaptain",
//                         avatar: "https://distribution.faceit-cdn.net/images/2bd0d56e-8f84-44e6-ad75-d34fbf409e3d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198209992732",
//                         game_player_name: "Xcaptain",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "0cdce91c-7915-4e2b-ac82-2179fd9ec51b",
//                         nickname: "Fraq",
//                         avatar: "https://distribution.faceit-cdn.net/images/7e8a11ad-5245-48b0-901e-845bfe1b636f.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198345285843",
//                         game_player_name: "fraq",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Gremlin Gang",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_anubis", "de_nuke", "de_mirage"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749605400,
//         configured_at: 1749608030,
//         started_at: 1749608594,
//         finished_at: 1749610357,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-deb88d67-0420-4401-9a28-a7e0b288f95f-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-deb88d67-0420-4401-9a28-a7e0b288f95f-2-1.dem.zst",
//         ],
//         chat_room_id: "match-1-deb88d67-0420-4401-9a28-a7e0b288f95f",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-deb88d67-0420-4401-9a28-a7e0b288f95f",
//     },
//     {
//         match_id: "1-31a1f4c5-df50-45c3-aae8-96bf7bb94fa9",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "7f44aa73-bc8e-4847-b4a0-cff295de73d4",
//                 leader: "aad67473-fe53-4ac6-9db8-0f901211eb77",
//                 avatar: "https://distribution.faceit-cdn.net/images/0eb7ccf1-91b6-44f7-9ef5-178eda3797ec.jpg",
//                 roster: [
//                     {
//                         player_id: "aad67473-fe53-4ac6-9db8-0f901211eb77",
//                         nickname: "metallica",
//                         avatar: "https://distribution.faceit-cdn.net/images/78bbdf84-a801-4a96-b20d-07b48b615165.jpg",
//                         membership: "esea",
//                         game_player_id: "76561199301313701",
//                         game_player_name: "metallica",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1861fbb2-1376-4cc6-a2a1-9ae67e6ac9ce",
//                         nickname: "Valter0k",
//                         avatar: "https://distribution.faceit-cdn.net/images/f52e3261-f731-49e1-8774-f723a7af0b52.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198880100341",
//                         game_player_name: "egoisto (selfish)",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "666073f2-e2b3-4912-a212-1ee32a36f8ab",
//                         nickname: "mao-",
//                         avatar: "https://distribution.faceit-cdn.net/images/13a96eba-ab56-4453-8c6a-f81599672de3.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198989474093",
//                         game_player_name: "семнадцать",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "fc0e341e-c443-4cd3-9bb7-3fb65bd37166",
//                         nickname: "iceezze-",
//                         avatar: "https://distribution.faceit-cdn.net/images/acb6af0b-c301-4b08-8c18-733611da7a14.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198133773586",
//                         game_player_name: "iceezze",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "7afdd81a-cccd-4f43-9d8c-4961bf49714a",
//                         nickname: "H0NeST",
//                         avatar: "https://distribution.faceit-cdn.net/images/bd095272-a4f3-4285-8edf-0db9b748053a.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198404474914",
//                         game_player_name: "H0NeST",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "hryvnia squad",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "c7b45641-cc98-4377-88fa-09f3e577e997",
//                 leader: "c9be2e28-7379-4751-9680-127c59a26846",
//                 avatar: "https://distribution.faceit-cdn.net/images/0e1b481f-3d9a-4ece-a3f7-b0575d3a3a7b.jpeg",
//                 roster: [
//                     {
//                         player_id: "c9be2e28-7379-4751-9680-127c59a26846",
//                         nickname: "Radarorleo",
//                         avatar: "https://distribution.faceit-cdn.net/images/663278dd-1ec6-4e6d-b0ec-ddb88888e6db.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198088146102",
//                         game_player_name: "Radar",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e100e643-d932-49e8-8ead-7528e5e298ad",
//                         nickname: "LevelDown",
//                         avatar: "https://distribution.faceit-cdn.net/images/53a725a8-aa2e-4bc3-9756-77466f613ccd.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198119200921",
//                         game_player_name: "LevelDown",
//                         game_skill_level: 8,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "882a6a3d-efea-4400-b922-b0f38bd93508",
//                         nickname: "FangZzZ",
//                         avatar: "https://distribution.faceit-cdn.net/images/2e77bf49-8c59-4725-9bee-8ce431943cc2.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198103630258",
//                         game_player_name: "FangZzZ",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d399da51-dda5-4eaf-9394-1d3d342e25f6",
//                         nickname: "wutdowutdo",
//                         avatar: "https://distribution.faceit-cdn.net/images/714c312c-08c6-4397-9607-009325db82fc.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198874383776",
//                         game_player_name: "✧wut-do-wut-do✧",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "2a8fe63b-859e-4d36-835f-5cf93ab89331",
//                         nickname: "Jay_",
//                         avatar: "https://distribution.faceit-cdn.net/images/6c615743-55cb-430c-b1e3-efa8d4a94fed.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198203193489",
//                         game_player_name: "YEP block",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Arrival Seven",
//                 type: "premade",
//             },
//         },
//         voting: {
//             location: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                     },
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                     },
//                     {
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                     },
//                     {
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                     },
//                     {
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                     },
//                     {
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_nuke", "de_anubis", "de_dust2"],
//             },
//             voted_entity_types: ["location", "map"],
//         },
//         calculate_elo: false,
//         scheduled_at: 1749605400,
//         configured_at: 1749607943,
//         started_at: 1749608314,
//         finished_at: 1749610127,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-31a1f4c5-df50-45c3-aae8-96bf7bb94fa9-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-31a1f4c5-df50-45c3-aae8-96bf7bb94fa9-2-1.dem.zst",
//         ],
//         chat_room_id: "match-1-31a1f4c5-df50-45c3-aae8-96bf7bb94fa9",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction2: 0,
//                 faction1: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-31a1f4c5-df50-45c3-aae8-96bf7bb94fa9",
//     },
//     {
//         match_id: "1-e261adfe-fe3e-44be-8e6e-9755413b0238",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "e71b58f3-2f0d-4f4e-a2ce-79e7b4847599",
//                 leader: "8d322d40-0a9e-41f6-8195-39183c73fe1e",
//                 avatar: "https://distribution.faceit-cdn.net/images/98711d00-5d4c-45cc-8f46-c1d3cd968d3f.jpeg",
//                 roster: [
//                     {
//                         player_id: "8d322d40-0a9e-41f6-8195-39183c73fe1e",
//                         nickname: "micro",
//                         avatar: "https://distribution.faceit-cdn.net/images/d1c46172-bb6f-46a6-a2e1-d8c914fa6e82.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198072040762",
//                         game_player_name: "micro",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "55dac018-93a9-4d73-adca-0aea7f6b80b7",
//                         nickname: "Arias",
//                         avatar: "https://distribution.faceit-cdn.net/images/8d80fffc-5da3-401a-b5f7-b7ed4eab2662.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198161279781",
//                         game_player_name: "✪ Arias",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4dfa76fd-23a2-4dcf-89a4-25e3d3704cc0",
//                         nickname: "tender272",
//                         avatar: "https://distribution.faceit-cdn.net/images/c73d410b-6df4-4d3e-be39-33bdddb367e6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197993724724",
//                         game_player_name: "tender",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4137ee42-971c-4874-8ec8-688dcc779aa3",
//                         nickname: "clipzera",
//                         avatar: "https://distribution.faceit-cdn.net/images/8fb65a6a-ba3b-4086-b783-a50b3a62fdae.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198859037781",
//                         game_player_name: "clipzera",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "256f4ed6-5b73-4a3f-a435-4f5f6ad2acd0",
//                         nickname: "Jeebs",
//                         avatar: "https://distribution.faceit-cdn.net/images/ab698877-902a-4777-945f-ca131ea13366.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198288420173",
//                         game_player_name: "Jeebs",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "SUPER EVIL GANG",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "ed859799-05cb-4b7a-9c6c-e56bd2133958",
//                 leader: "1f0e73c5-6f17-4500-b7fe-de8d283b04ec",
//                 avatar: "https://distribution.faceit-cdn.net/images/b159e713-40e6-4bf7-ad8f-42b34fa6433f.jpeg",
//                 roster: [
//                     {
//                         player_id: "1f0e73c5-6f17-4500-b7fe-de8d283b04ec",
//                         nickname: "1NoVa",
//                         avatar: "https://distribution.faceit-cdn.net/images/4b218e88-6225-4198-8643-c5e7699b28d5.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198074927301",
//                         game_player_name: "76561198074927301",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b3126bad-a9b0-452c-aa51-5df2c95088e5",
//                         nickname: "-dug",
//                         avatar: "https://distribution.faceit-cdn.net/images/cf975c06-c01c-415e-b8a7-c7c083190dab.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198305290193",
//                         game_player_name: "dug",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4eb553f6-02cb-4769-b38e-c4efd9e9cc34",
//                         nickname: "c0ntr01",
//                         avatar: "https://assets.faceit-cdn.net/avatars/4eb553f6-02cb-4769-b38e-c4efd9e9cc34_1615332273980.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198110955475",
//                         game_player_name: "c0ntr01",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "43c43021-6ae9-4e6a-9bda-af2e84515006",
//                         nickname: "Philipek_",
//                         avatar: "https://distribution.faceit-cdn.net/images/7dba2ec1-b21d-45bf-80f2-0c3648fc9be8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198424717372",
//                         game_player_name: "Philipek",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "09fe66c1-f408-471f-9502-f94611f46213",
//                         nickname: "Orb1t-CS",
//                         avatar: "https://distribution.faceit-cdn.net/images/4f0b4f4f-d7de-4b4a-928e-ecb2b157e4d6.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198189880031",
//                         game_player_name: "Orb1t",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Jersey Jits",
//                 type: "premade",
//             },
//         },
//         voting: {
//             map: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                     },
//                     {
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                     },
//                     {
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                     },
//                 ],
//                 pick: ["de_mirage", "de_train", "de_anubis"],
//             },
//             voted_entity_types: ["location", "map"],
//             location: {
//                 pick: ["Chicago"],
//                 entities: [
//                     {
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749605400,
//         configured_at: 1749607857,
//         started_at: 1749608358,
//         finished_at: 1749610065,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-e261adfe-fe3e-44be-8e6e-9755413b0238-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-e261adfe-fe3e-44be-8e6e-9755413b0238-2-1.dem.zst",
//         ],
//         chat_room_id: "match-1-e261adfe-fe3e-44be-8e6e-9755413b0238",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-e261adfe-fe3e-44be-8e6e-9755413b0238",
//     },
//     {
//         match_id: "1-29b97566-6514-4644-8ca9-9439ad98f4f1",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "d34be1b4-bbd1-4076-9e5e-fadcdbc70f51",
//                 leader: "6cae9693-8d89-4183-abe1-2d4cc13e9d88",
//                 avatar: "https://distribution.faceit-cdn.net/images/ad6c27c2-dffa-4440-b968-a1ebb520c878.jpeg",
//                 roster: [
//                     {
//                         player_id: "6cae9693-8d89-4183-abe1-2d4cc13e9d88",
//                         nickname: "fa0",
//                         avatar: "https://distribution.faceit-cdn.net/images/142a4924-8312-46bb-8724-7b16449aae6d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198244217162",
//                         game_player_name: "fa0",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "41bf611a-94d9-4b4e-8512-1a047fd2374f",
//                         nickname: "detoxd",
//                         avatar: "https://assets.faceit-cdn.net/avatars/41bf611a-94d9-4b4e-8512-1a047fd2374f_1595567018533.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198242063304",
//                         game_player_name: "detox7",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "7856aa27-c29a-46b2-84b2-2677070f9c5b",
//                         nickname: "Sickeningbre",
//                         avatar: "https://assets.faceit-cdn.net/avatars/7856aa27-c29a-46b2-84b2-2677070f9c5b_1550761873959.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198053617856",
//                         game_player_name: "76561198053617856",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5441c421-1d7a-48ff-ae78-f54cefd62f27",
//                         nickname: "spl1ce",
//                         avatar: "https://distribution.faceit-cdn.net/images/8f93dd2f-2b98-4649-8b23-40e31b210b11.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199122127558",
//                         game_player_name: "spl1ce",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "26cb8ebf-b679-4fc5-b8f0-e2d29f0cb1cf",
//                         nickname: "Kaema-_-",
//                         avatar: "https://distribution.faceit-cdn.net/images/46a4df19-5b16-49ca-9d8c-076d69b5aae0.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198801271639",
//                         game_player_name: "KaemaNANI",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Asoka",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "d62a3cb4-d998-4461-a8a6-a38189b8da15",
//                 leader: "7dcdcce0-0c16-4dbb-9a55-df9897114d04",
//                 avatar: "https://distribution.faceit-cdn.net/images/f931e691-76ae-4ccb-b8d7-fbd59004c30f.jpeg",
//                 roster: [
//                     {
//                         player_id: "7dcdcce0-0c16-4dbb-9a55-df9897114d04",
//                         nickname: "-VulcaN-",
//                         avatar: "https://distribution.faceit-cdn.net/images/79d14608-07ae-4add-9ccc-0ec2ef3f1b47.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198241032908",
//                         game_player_name: "-VulcaN-",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "84243c79-1128-43e4-9093-f330fa13f8e4",
//                         nickname: "Destro",
//                         avatar: "https://assets.faceit-cdn.net/avatars/84243c79-1128-43e4-9093-f330fa13f8e4_1565715965388.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198294768618",
//                         game_player_name: "Destro",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "98908adc-1454-4053-89d0-a89e9e641236",
//                         nickname: "den1eds",
//                         avatar: "https://distribution.faceit-cdn.net/images/5f63cc65-2e6e-4491-9154-c6ec27b5f95a.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198202694584",
//                         game_player_name: "denied",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f49f2907-e11c-48ac-9455-4581808f138e",
//                         nickname: "Brashi",
//                         avatar: "https://distribution.faceit-cdn.net/images/e5e6203b-4ac3-420b-a1d1-2e211f0c2530.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198950618781",
//                         game_player_name: "Brashi",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "412d1d4a-887b-4fd1-978e-18b22f5320a7",
//                         nickname: "HorizoN",
//                         avatar: "https://distribution.faceit-cdn.net/images/a9d10450-35ad-46f4-a8eb-1b4fbf50260c.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198101124279",
//                         game_player_name: "HorizoN",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "TSG",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Dallas"],
//             },
//             map: {
//                 entities: [
//                     {
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                     },
//                     {
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                     },
//                     {
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_mirage", "de_anubis", "de_dust2"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749605400,
//         configured_at: 1749607828,
//         started_at: 1749608090,
//         finished_at: 1749609965,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-29b97566-6514-4644-8ca9-9439ad98f4f1-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-29b97566-6514-4644-8ca9-9439ad98f4f1-2-1.dem.zst",
//         ],
//         chat_room_id: "match-1-29b97566-6514-4644-8ca9-9439ad98f4f1",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-29b97566-6514-4644-8ca9-9439ad98f4f1",
//     },
//     {
//         match_id: "1-10e84097-888a-48a0-8cdd-ea07a0628fb8",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "0d1c2b67-d0b0-4ba5-94a5-935aea34affc",
//                 leader: "ff704bfb-9533-4047-9a4a-a71886397070",
//                 avatar: "https://distribution.faceit-cdn.net/images/47145329-93a6-4b01-b692-48e17e30f200.jpeg",
//                 roster: [
//                     {
//                         player_id: "ff704bfb-9533-4047-9a4a-a71886397070",
//                         nickname: "Tr1ck",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ff704bfb-9533-4047-9a4a-a71886397070_1551134874059.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198138033226",
//                         game_player_name: "Trick",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "581d92b9-8310-4a29-81de-6b4057e8a6ed",
//                         nickname: "Signal",
//                         avatar: "https://distribution.faceit-cdn.net/images/a48cbaf2-af59-47b9-a0ae-5daec97cad61.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054121335",
//                         game_player_name: "Signal",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "96acce04-abc2-4721-809f-66957f17325a",
//                         nickname: "Gibbyatl",
//                         avatar: "https://distribution.faceit-cdn.net/images/7f97de77-595e-4d68-baeb-18113f93d168.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143856840",
//                         game_player_name: "Gibby_ATL",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "470d26d1-5f5c-4403-96ed-67c0b1ac3553",
//                         nickname: "dirtydan",
//                         avatar: "https://distribution.faceit-cdn.net/images/f6cc863a-5b9d-4ba3-92a3-3556c54f3642.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054776069",
//                         game_player_name: "DirtyDan_",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9236c42e-e369-4f19-80dd-a5865791f366",
//                         nickname: "Adubs",
//                         avatar: "https://assets.faceit-cdn.net/avatars/9236c42e-e369-4f19-80dd-a5865791f366_1594090583751.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198134328879",
//                         game_player_name: "A.W.D",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "RedactedSociety",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "8ab8e348-085d-473b-9084-a67a0d26281a",
//                 leader: "1e627857-8cca-4b62-8934-925610ec2ba9",
//                 avatar: "https://distribution.faceit-cdn.net/images/fb300145-0b96-49d0-8642-f45c5892f342.jpeg",
//                 roster: [
//                     {
//                         player_id: "1e627857-8cca-4b62-8934-925610ec2ba9",
//                         nickname: "syper",
//                         avatar: "https://distribution.faceit-cdn.net/images/0808bfa3-addd-4e9f-8770-5c44dfc22e25.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198132457883",
//                         game_player_name: "syper",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "edd27f56-7644-4b84-ae29-b3f3951c92b0",
//                         nickname: "-linK",
//                         avatar: "https://distribution.faceit-cdn.net/images/acc206a1-fa69-42dc-939a-7bb86fb1237f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198203353310",
//                         game_player_name: "linK",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d3b17c3e-7854-4c00-8f4f-a94b06206764",
//                         nickname: "sephB",
//                         avatar: "https://distribution.faceit-cdn.net/images/18d027fa-4aa5-46d2-8b2d-11e848a35196.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198103827365",
//                         game_player_name: "JoeyTheBiggest",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4e2762da-99e1-4c12-abd4-92576156ee13",
//                         nickname: "Killj0y",
//                         avatar: "https://distribution.faceit-cdn.net/images/26835299-93dd-40d1-b38c-59ee9d1688cb.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198114593821",
//                         game_player_name: "Killj0y",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "de0b1765-6578-4165-9b26-aa8142d1cfa6",
//                         nickname: "Jetz_",
//                         avatar: "https://distribution.faceit-cdn.net/images/dcdaeda9-9877-4773-af08-b9797df5b8e9.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198062613863",
//                         game_player_name: "Maverick",
//                         game_skill_level: 8,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Chuck E Cheese",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                     },
//                     {
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                     },
//                     {
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                     },
//                     {
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_anubis", "de_mirage", "de_inferno"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749605400,
//         configured_at: 1749607485,
//         started_at: 1749607689,
//         finished_at: 1749609529,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-10e84097-888a-48a0-8cdd-ea07a0628fb8-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-10e84097-888a-48a0-8cdd-ea07a0628fb8-2-1.dem.zst",
//         ],
//         chat_room_id: "match-1-10e84097-888a-48a0-8cdd-ea07a0628fb8",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-10e84097-888a-48a0-8cdd-ea07a0628fb8",
//     },
//     {
//         match_id: "1-ff1fd7bb-fa6a-405f-8fbb-63ab5046a723",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "ea5e1a5f-3d95-419e-b926-0c39e8c3d8dd",
//                 leader: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                 avatar: "https://distribution.faceit-cdn.net/images/f0a92fc2-c0ab-47a2-b7ff-ee855b0960b5.jpeg",
//                 roster: [
//                     {
//                         player_id: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                         nickname: "aelor",
//                         avatar: "https://distribution.faceit-cdn.net/images/d786937e-0934-4ac4-8445-e0486a9969be.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198231092204",
//                         game_player_name: "aelor",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dcea95af-d945-426c-9b22-3bb3b8fb5441",
//                         nickname: "ayaneuu",
//                         avatar: "https://distribution.faceit-cdn.net/images/b7baa66b-c1d8-49dd-b0b1-d85cc30b69fb.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198341370795",
//                         game_player_name: "ayaneuu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1c8f885a-3d9a-4d64-801f-68a336a745ea",
//                         nickname: "Sanzh1k33",
//                         avatar: "https://distribution.faceit-cdn.net/images/e653f44a-96c8-4e70-b944-d53540c2fa46.jpg",
//                         membership: "premium",
//                         game_player_id: "76561199243647648",
//                         game_player_name: "🖤🖤🖤🖤🖤",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "04924ee1-65bf-4424-b4d2-f82657133f53",
//                         nickname: "traekS",
//                         avatar: "https://distribution.faceit-cdn.net/images/b5b3d76f-d794-49db-8601-b0d7418e7b50.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198057008814",
//                         game_player_name: "traekS",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bc7cd9c2-0b37-47c6-9b19-4ccd90c63f44",
//                         nickname: "sathsea",
//                         avatar: "https://distribution.faceit-cdn.net/images/3f718498-ec92-4f6e-bc5b-4bd6d369f956.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198401647782",
//                         game_player_name: "king",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Zomblers",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "5d604891-ffa5-4137-ac33-1927e1375435",
//                 leader: "b3a76f98-c7af-4b0d-b6ec-6cdb26868513",
//                 avatar: "https://distribution.faceit-cdn.net/images/4b210d80-6572-42cf-9bc3-ecf3cc40c0d8.jpeg",
//                 roster: [
//                     {
//                         player_id: "b3a76f98-c7af-4b0d-b6ec-6cdb26868513",
//                         nickname: "Qestar",
//                         avatar: "https://distribution.faceit-cdn.net/images/c455d2e1-ed19-403e-bfe4-b5b4e8c63640.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197962231216",
//                         game_player_name: "Qester",
//                         game_skill_level: 8,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "53ede7bc-0698-4958-b2bf-77ef0eafa985",
//                         nickname: "perk",
//                         avatar: "https://distribution.faceit-cdn.net/images/c5ef6038-1110-42f0-b05e-52112d0dc5f0.jpg",
//                         membership: "plus",
//                         game_player_id: "76561198911606667",
//                         game_player_name: "p",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "41de0a1e-ce20-4aca-81d4-60a4f672c4d9",
//                         nickname: "ssilG",
//                         avatar: "https://distribution.faceit-cdn.net/images/c8659832-2f08-495b-9c6d-7a8d31c8cc9c.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198231404976",
//                         game_player_name: "Gliss",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ed0cf311-42db-43ff-90a1-fd84c98fbbc0",
//                         nickname: "-Gary",
//                         avatar: "https://distribution.faceit-cdn.net/images/4f273cec-9f21-48c2-a830-5e69e03a290b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198438770316",
//                         game_player_name: "Gary",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cca556f9-31c8-4a32-82ca-bd4b2e1f71ab",
//                         nickname: "ToasTy1",
//                         avatar: "https://distribution.faceit-cdn.net/images/1b6d0304-2fa6-412d-8ffd-f30dade2548c.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198169387869",
//                         game_player_name: "ToasT",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "DxG Omega",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 pick: ["Chicago"],
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//             },
//             map: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                     },
//                     {
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                     },
//                     {
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                     },
//                     {
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                     },
//                 ],
//                 pick: ["de_ancient", "de_dust2", "de_anubis"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749691800,
//         configured_at: 1749694197,
//         started_at: 1749694558,
//         finished_at: 1749696873,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-ff1fd7bb-fa6a-405f-8fbb-63ab5046a723-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-ff1fd7bb-fa6a-405f-8fbb-63ab5046a723-2-1.dem.zst",
//         ],
//         chat_room_id: "match-1-ff1fd7bb-fa6a-405f-8fbb-63ab5046a723",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction2: 0,
//                 faction1: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-ff1fd7bb-fa6a-405f-8fbb-63ab5046a723",
//     },
//     {
//         match_id: "1-1d12d83d-d105-49a3-8836-5e8fe79e7922",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "4a21e366-941d-4ab3-9af6-116c6f35ce85",
//                 leader: "bdfcc2e9-3ba3-4dc7-96d5-f9cba937fd3d",
//                 avatar: "https://distribution.faceit-cdn.net/images/c5ad267e-b3c1-4896-af8c-11820b9d494c.jpg",
//                 roster: [
//                     {
//                         player_id: "bdfcc2e9-3ba3-4dc7-96d5-f9cba937fd3d",
//                         nickname: "catoire",
//                         avatar: "https://distribution.faceit-cdn.net/images/e027cbd6-6a70-463f-979b-b7eb40ad42a8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198836984247",
//                         game_player_name: "catoire",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d9b26020-61a6-4774-b206-13c49c6555c8",
//                         nickname: "mob",
//                         avatar: "https://distribution.faceit-cdn.net/images/540e824a-1538-4693-98e7-0ae121c43c75.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199016429540",
//                         game_player_name: "Mob",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "32e84e2c-92dc-4532-b9a7-22b7c94b2fee",
//                         nickname: "Coco",
//                         avatar: "https://distribution.faceit-cdn.net/images/9d8f9035-3057-43a6-a365-3ceb81c17b88.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198892187723",
//                         game_player_name: "<3 pancake",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "794376ff-b711-4a9d-a3a6-0ca546818aa1",
//                         nickname: "Vipum",
//                         avatar: "https://distribution.faceit-cdn.net/images/10e5b308-3f08-402d-85ff-bca0d7659362.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198120911458",
//                         game_player_name: "Vipum",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "daeafcf6-e0e6-4a28-b1fb-403607230ee0",
//                         nickname: "pancake",
//                         avatar: "https://distribution.faceit-cdn.net/images/7a537ffc-3fa6-4168-97ad-dad35086c1d1.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198377297186",
//                         game_player_name: "<3 Coco",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Desolate",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "073642d6-b4cb-4baa-b125-26384a7cfac2",
//                 leader: "3cc00843-1290-4ad3-88ee-1e9e2b67521d",
//                 avatar: "https://distribution.faceit-cdn.net/images/1335aa96-841e-4540-8ed5-ccaf271f1f5b.jpg",
//                 roster: [
//                     {
//                         player_id: "3cc00843-1290-4ad3-88ee-1e9e2b67521d",
//                         nickname: "stormie",
//                         avatar: "https://distribution.faceit-cdn.net/images/d50ba705-f4bb-4e62-9614-1bbdb97f6778.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198288821008",
//                         game_player_name: "noob",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "378528b9-727f-44a9-bfa7-fd762033eb4e",
//                         nickname: "Enzo",
//                         avatar: "https://distribution.faceit-cdn.net/images/bf6718db-f89a-47c9-a403-02ec6367b1f2.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198234421716",
//                         game_player_name: "Enzo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "64153391-15e5-4886-b96d-7a3fbc9c6066",
//                         nickname: "jsp",
//                         avatar: "https://distribution.faceit-cdn.net/images/6ad907f7-a4fb-4957-8bf7-5c51231993b0.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198172880971",
//                         game_player_name: "jsp",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "291e4082-5f46-46f6-b424-a63d9b8bdee9",
//                         nickname: "-Nks",
//                         avatar: "https://distribution.faceit-cdn.net/images/20fe2b96-7dd9-4818-9d9a-a3e087b93b69.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198047492494",
//                         game_player_name: "76561198047492494",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1aacc2d9-38fb-4cbb-8ddc-d826438af160",
//                         nickname: "evo3K",
//                         avatar: "https://distribution.faceit-cdn.net/images/1c6bc8f1-0509-4ec8-86b2-67311cb0cc6f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198111774367",
//                         game_player_name: "eVo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "F5 Esports",
//                 type: "premade",
//             },
//         },
//         voting: {
//             location: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                     },
//                     {
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                     },
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                     },
//                     {
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                     },
//                     {
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                     },
//                     {
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_mirage", "de_nuke", "de_dust2"],
//             },
//             voted_entity_types: ["location", "map"],
//         },
//         calculate_elo: false,
//         scheduled_at: 1749605400,
//         configured_at: 1749608056,
//         started_at: 1749608388,
//         finished_at: 1749610611,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-1d12d83d-d105-49a3-8836-5e8fe79e7922-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-1d12d83d-d105-49a3-8836-5e8fe79e7922-2-1.dem.zst",
//         ],
//         chat_room_id: "match-1-1d12d83d-d105-49a3-8836-5e8fe79e7922",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction2: 2,
//                 faction1: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-1d12d83d-d105-49a3-8836-5e8fe79e7922",
//     },
//     {
//         match_id: "1-a9297dd6-ad69-4b7f-9a1f-ca40003c4369",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "fdbbd1b5-5575-4adf-aa2c-e61bdc5044e9",
//                 leader: "7e87978c-5136-4594-b1be-90813f438689",
//                 avatar: "https://distribution.faceit-cdn.net/images/8ac8da75-a462-4626-abe9-2b5b5b4bf6f9.jpeg",
//                 roster: [
//                     {
//                         player_id: "7e87978c-5136-4594-b1be-90813f438689",
//                         nickname: "sascha",
//                         avatar: "https://distribution.faceit-cdn.net/images/5045bf55-6f2f-400c-819e-30cf320eda09.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198368540894",
//                         game_player_name: "sascha",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dcbbb3b0-27fe-4022-bb91-7d61e89347f0",
//                         nickname: "wundeeh",
//                         avatar: "https://distribution.faceit-cdn.net/images/c1f3c64b-1023-45d7-bd35-42de3db46b2c.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198229696960",
//                         game_player_name: "wundeeh",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a548a57e-5e21-4fc2-b528-68495f5af9e5",
//                         nickname: "squidward_2",
//                         avatar: "https://distribution.faceit-cdn.net/images/4ba914ec-753b-41e0-8ec2-b07d1a5dde60.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198175833343",
//                         game_player_name: "squidward_2",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d6b3c180-abfc-40ee-9284-88c71194ecef",
//                         nickname: "0wenzera",
//                         avatar: "https://distribution.faceit-cdn.net/images/44090c93-4326-4a77-b1ac-3e2f2e0eb488.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198345059295",
//                         game_player_name: "Owen",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "127d0f45-7e45-4133-bfc8-8daa2aea7584",
//                         nickname: "Hebizera",
//                         avatar: "https://distribution.faceit-cdn.net/images/fd3db2b1-80e4-4fda-a945-1b9c1dac7465.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198353679273",
//                         game_player_name: "Texzera",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "NextGenEsports",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "a4b1806e-9cd9-4ffb-95a6-ca0e7a26b6fb",
//                 leader: "0dcae56f-4a84-4c1d-84c3-b83cca9bfe27",
//                 avatar: "https://distribution.faceit-cdn.net/images/7b4eddcb-d0d4-4658-92da-0e7e4b9c71f1.jpeg",
//                 roster: [
//                     {
//                         player_id: "0dcae56f-4a84-4c1d-84c3-b83cca9bfe27",
//                         nickname: "jBREEEZY",
//                         avatar: "https://assets.faceit-cdn.net/avatars/0dcae56f-4a84-4c1d-84c3-b83cca9bfe27_1550845706365.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198201964492",
//                         game_player_name: "76561198201964492",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c5d76817-97cc-4d24-8d87-aa9259b78783",
//                         nickname: "absolut-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/c5d76817-97cc-4d24-8d87-aa9259b78783_1550791984162.png",
//                         membership: "premium",
//                         game_player_id: "76561198205116051",
//                         game_player_name: "Absolute",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "aaba5bad-82a6-4444-ab6c-60e9fa3b0fc8",
//                         nickname: "hype-_-",
//                         avatar: "https://distribution.faceit-cdn.net/images/32adf89a-e4d6-4e84-9be6-7877987d0fc5.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198083756391",
//                         game_player_name: "shrimplord777",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "117441a9-2a83-424f-a740-9463cecb5cc4",
//                         nickname: "Sunk_",
//                         avatar: "https://distribution.faceit-cdn.net/images/338d1a6c-4add-4f28-b497-67964266260e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198174932007",
//                         game_player_name: "Sunk",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "952b0c28-efb2-4ca0-b74a-a4bb2843c2ae",
//                         nickname: "s3rum_",
//                         avatar: "https://distribution.faceit-cdn.net/images/7b51e0b0-de13-4a1f-8231-2e0003215903.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198415592916",
//                         game_player_name: "s3rum",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "drugs n pugs",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                     },
//                     {
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                     },
//                     {
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                     },
//                     {
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                     },
//                 ],
//                 pick: ["de_inferno", "de_nuke", "de_anubis"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749605400,
//         configured_at: 1749612042,
//         started_at: 1749612792,
//         finished_at: 1749615461,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-a9297dd6-ad69-4b7f-9a1f-ca40003c4369-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-a9297dd6-ad69-4b7f-9a1f-ca40003c4369-2-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-a9297dd6-ad69-4b7f-9a1f-ca40003c4369-3-1.dem.zst",
//         ],
//         chat_room_id: "match-1-a9297dd6-ad69-4b7f-9a1f-ca40003c4369",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction2: 1,
//                 faction1: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-a9297dd6-ad69-4b7f-9a1f-ca40003c4369",
//     },
//     {
//         match_id: "1-19f5f069-0c00-460d-8dd9-73a937146d81",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "8057795f-fab5-49a1-b03c-6a33175a649a",
//                 leader: "7e7cc507-b154-4054-bcc5-346bec28817b",
//                 avatar: "https://distribution.faceit-cdn.net/images/a1cdf56f-6c1d-4fd2-8091-e7aa46ccbd04.jpeg",
//                 roster: [
//                     {
//                         player_id: "7e7cc507-b154-4054-bcc5-346bec28817b",
//                         nickname: "Kr0wbar",
//                         avatar: "https://distribution.faceit-cdn.net/images/3afe180e-8cfa-4a90-afb9-2baf7ddb0416.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198201095514",
//                         game_player_name: "Kr0wbar",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e616163e-ab09-470e-b7d9-6cf1ddaec09f",
//                         nickname: "MentalBr0ken",
//                         avatar: "https://distribution.faceit-cdn.net/images/0dfcc5d4-974d-4f73-ac83-fb63aacc007d.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198090311351",
//                         game_player_name: ".-",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "31cefffa-d8ea-44ee-abcf-32859335bfb6",
//                         nickname: "Willis",
//                         avatar: "https://distribution.faceit-cdn.net/images/15b05308-e281-4f11-9275-7b42e3b2dfe9.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198053680338",
//                         game_player_name: "Willis",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e28dc7fd-4bd8-4636-a6cc-6dc8da99be35",
//                         nickname: "_Beastm0de",
//                         avatar: "https://assets.faceit-cdn.net/avatars/e28dc7fd-4bd8-4636-a6cc-6dc8da99be35_1550800831726.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198204215532",
//                         game_player_name: "76561198204215532",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bc393ef1-7eb1-43fe-ab8e-188566079308",
//                         nickname: "swagmachine7",
//                         avatar: "https://distribution.faceit-cdn.net/images/684a12dc-84db-4717-ab23-45c46c484508.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198829015699",
//                         game_player_name: "♡",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Padding Egos",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "1bf2f5d2-996c-409f-8607-c9019193daa6",
//                 leader: "6898a003-4255-45b2-8250-bd22fc80a8a8",
//                 avatar: "https://distribution.faceit-cdn.net/images/31c1866c-4a0d-45aa-b1d7-a3e16e290b68.jpg",
//                 roster: [
//                     {
//                         player_id: "6898a003-4255-45b2-8250-bd22fc80a8a8",
//                         nickname: "fatguy",
//                         avatar: "https://assets.faceit-cdn.net/avatars/6898a003-4255-45b2-8250-bd22fc80a8a8_1579401144029.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198920156745",
//                         game_player_name: "FATGUY",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "02ddf289-4dea-432f-b52c-ba022677b0c1",
//                         nickname: "SeRCEra",
//                         avatar: "https://distribution.faceit-cdn.net/images/0b0cec21-9c85-4d02-bc82-381642f53c86.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198084094542",
//                         game_player_name: "Serce",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f6ff5894-6db0-4110-b075-d731c9477e89",
//                         nickname: "woah",
//                         avatar: "https://assets.faceit-cdn.net/avatars/f6ff5894-6db0-4110-b075-d731c9477e89_1550972795861.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198070915284",
//                         game_player_name: "Daddy Issues",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c6649075-a591-4a3d-8bde-22e59e3e637f",
//                         nickname: "coIin",
//                         avatar: "https://distribution.faceit-cdn.net/images/6348e328-701a-437b-a386-6d4329ba1a8e.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198303033177",
//                         game_player_name: "colin",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1e0c99e0-9fd8-451b-8847-63d2b6eac7da",
//                         nickname: "-dinky-",
//                         avatar: "https://distribution.faceit-cdn.net/images/5a2bbec9-cf19-445e-9d68-016d2a375d8d.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198086139579",
//                         game_player_name: "dinky",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "i hate sand",
//                 type: "premade",
//             },
//         },
//         voting: {
//             location: {
//                 entities: [
//                     {
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                     },
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                     },
//                 ],
//                 pick: ["Dallas"],
//             },
//             map: {
//                 entities: [
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                     },
//                     {
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                     },
//                 ],
//                 pick: ["de_anubis", "de_train", "de_ancient"],
//             },
//             voted_entity_types: ["location", "map"],
//         },
//         calculate_elo: false,
//         scheduled_at: 1749605400,
//         configured_at: 1749608372,
//         started_at: 1749608916,
//         finished_at: 1749611075,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-19f5f069-0c00-460d-8dd9-73a937146d81-1-2.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-19f5f069-0c00-460d-8dd9-73a937146d81-2-1.dem.zst",
//         ],
//         chat_room_id: "match-1-19f5f069-0c00-460d-8dd9-73a937146d81",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction2: 2,
//                 faction1: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction1: {
//                         score: 0,
//                     },
//                     faction2: {
//                         score: 1,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-19f5f069-0c00-460d-8dd9-73a937146d81",
//     },
//     {
//         match_id: "1-ad12c3d5-e361-49bb-b511-42a5206aa5be",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "380fbad8-5cb2-4a31-ab50-42c686034dce",
//                 leader: "7fc130ea-2eba-47db-997d-baf2f17f5adc",
//                 avatar: "https://distribution.faceit-cdn.net/images/e3f3bba0-0130-4c3f-b75d-d5bd38921f98.jpeg",
//                 roster: [
//                     {
//                         player_id: "7fc130ea-2eba-47db-997d-baf2f17f5adc",
//                         nickname: "fArt",
//                         avatar: "https://distribution.faceit-cdn.net/images/eac2b11d-4d56-4978-b688-f4a7f3fe489b.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198067835427",
//                         game_player_name: "fArt",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8da05ee7-3c1d-4a7c-80c5-306d08bf6cd4",
//                         nickname: "-Roo",
//                         avatar: "https://distribution.faceit-cdn.net/images/66b66645-019a-4170-9be4-855f7930ae08.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198196904981",
//                         game_player_name: "wyan",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "894be8b7-9184-4b73-957d-61f9f4886796",
//                         nickname: "dinner",
//                         avatar: "https://distribution.faceit-cdn.net/images/81c9b443-1b33-476e-907a-87fb61ea3166.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198106604547",
//                         game_player_name: "dinner",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8d93ee2e-dc58-4d99-b9cd-fe8746f2925d",
//                         nickname: "bingus",
//                         avatar: "https://distribution.faceit-cdn.net/images/c878b55a-ee41-4cad-9881-d35543291d50.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561199033266459",
//                         game_player_name: "bingus",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "80c2ccaf-3684-4a50-b587-1ed964299149",
//                         nickname: "weine",
//                         avatar: "https://distribution.faceit-cdn.net/images/ac3d3080-1d4a-43d4-8d2e-72caea3e6c6e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198044739114",
//                         game_player_name: "weine",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Omen Esports",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "07800f60-6b0e-48d8-8f8f-7dcfe976e154",
//                 leader: "cba2d2f8-218b-452b-870f-34fb19737095",
//                 avatar: "https://distribution.faceit-cdn.net/images/ab011dae-9f90-4e2f-8784-ec182961cc2b.jpg",
//                 roster: [
//                     {
//                         player_id: "cba2d2f8-218b-452b-870f-34fb19737095",
//                         nickname: "mag-",
//                         avatar: "https://distribution.faceit-cdn.net/images/bc4ae703-8347-4416-a6ca-72975ba2002e.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198255775195",
//                         game_player_name: "dopeboy210",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ed8cc64f-baab-48ab-879e-ed66ca14c227",
//                         nickname: "wist",
//                         avatar: "https://distribution.faceit-cdn.net/images/626d6bfd-cad0-41d4-bda4-b2e87d618bd0.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198203702795",
//                         game_player_name: "wist",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a951172a-88cd-4b59-b71a-6922c69d4e9f",
//                         nickname: "Fightninja",
//                         avatar: "https://distribution.faceit-cdn.net/images/4aa97166-5419-4da0-9f05-31c5c41d4623.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198891533921",
//                         game_player_name: "GZ",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "fcfa3c2d-5da0-42fe-a5bf-f30044710377",
//                         nickname: "dnr",
//                         avatar: "https://distribution.faceit-cdn.net/images/af16b95b-eb97-4427-9145-7e26aedcafb3.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198376655334",
//                         game_player_name: "luci",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c6363339-e90f-491c-91ee-0795ca973f77",
//                         nickname: "bezymec",
//                         avatar: "https://distribution.faceit-cdn.net/images/c7b47f83-944c-4e41-868c-77790a627ea6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198362752793",
//                         game_player_name: "zaccy",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "VNT",
//                 type: "premade",
//             },
//         },
//         voting: {
//             map: {
//                 entities: [
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                     },
//                     {
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_dust2", "de_anubis", "de_mirage"],
//             },
//             voted_entity_types: ["location", "map"],
//             location: {
//                 pick: ["Chicago"],
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749605400,
//         configured_at: 1749611407,
//         started_at: 1749611929,
//         finished_at: 1749614504,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-ad12c3d5-e361-49bb-b511-42a5206aa5be-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-ad12c3d5-e361-49bb-b511-42a5206aa5be-2-1.dem.zst",
//         ],
//         chat_room_id: "match-1-ad12c3d5-e361-49bb-b511-42a5206aa5be",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-ad12c3d5-e361-49bb-b511-42a5206aa5be",
//     },
//     {
//         match_id: "1-73ccea7b-f0e0-4d41-96fa-6880bd8ff1cb",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "e2d530ae-2ce6-491c-9213-0edf2027f802",
//                 leader: "5aee7aeb-dbb0-4fe4-a7d0-95f0eb970dd8",
//                 avatar: "",
//                 roster: [
//                     {
//                         player_id: "5aee7aeb-dbb0-4fe4-a7d0-95f0eb970dd8",
//                         nickname: "Owen",
//                         avatar: "",
//                         membership: "premium",
//                         game_player_id: "76561198251208570",
//                         game_player_name: "Owen sinseriously cs.money",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8f8d4036-4ea4-413e-83bc-29c0fad4e588",
//                         nickname: "jax",
//                         avatar: "https://distribution.faceit-cdn.net/images/deb9f1bb-5a13-4c0c-8e26-0e2ee91c2cfd.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198370554798",
//                         game_player_name: "Jax",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "36af3b60-8d06-496f-ac8f-cc0d3fa9511b",
//                         nickname: "Jaid",
//                         avatar: "https://distribution.faceit-cdn.net/images/091d740b-b6e0-4fdb-a280-daa7a6416e08.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198102249566",
//                         game_player_name: "POWNAGE",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6d88d2ac-7b06-4b1a-9e28-a0187be60ea6",
//                         nickname: "nova_iwl",
//                         avatar: "https://distribution.faceit-cdn.net/images/b84682ca-ec6b-4a2f-aeb1-d3b83d29d50a.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198085546543",
//                         game_player_name: "Nova",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "104a4fa2-14ef-4312-9a9e-94838633e5f4",
//                         nickname: "prospekt-",
//                         avatar: "https://distribution.faceit-cdn.net/images/1cafa519-3711-4698-89f8-2a99a8a30129.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198248410766",
//                         game_player_name: "prospektion",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Sleepless_Gaming",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "8ea90e7c-ac3e-405d-b4b5-4cd1505b6349",
//                 leader: "c8a78ccc-5f0e-44e3-b8a1-b05624cebded",
//                 avatar: "https://distribution.faceit-cdn.net/images/d14ebfec-2fa3-4858-b5d3-079ebcde2ad2.jpeg",
//                 roster: [
//                     {
//                         player_id: "c8a78ccc-5f0e-44e3-b8a1-b05624cebded",
//                         nickname: "-LOUD",
//                         avatar: "https://distribution.faceit-cdn.net/images/0e4bf728-ea4f-45ae-aab3-837c555c4a69.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198737702407",
//                         game_player_name: "bem0z",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "47939811-7497-412d-b92c-f554e6eb6742",
//                         nickname: "pizza-",
//                         avatar: "https://distribution.faceit-cdn.net/images/c75ac2e4-dfde-41af-814b-73797a3d0d72.jpg",
//                         membership: "esea",
//                         game_player_id: "76561199085884935",
//                         game_player_name: "p1zza^",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "0d291b65-3eba-41b7-8378-ed025437ec0f",
//                         nickname: "eddiekiller",
//                         avatar: "https://distribution.faceit-cdn.net/images/f2a88b03-bde8-4804-9b39-38f8685132c8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198325127321",
//                         game_player_name: "eddie",
//                         game_skill_level: 4,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b9d0ef14-3d3b-4ec5-b0e6-bb73cb56e86a",
//                         nickname: "XVIIII-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/b9d0ef14-3d3b-4ec5-b0e6-bb73cb56e86a_1622486308535.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198263290199",
//                         game_player_name: "Alimo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "2ada819f-8c0b-4127-958f-75260e390d90",
//                         nickname: "valdor",
//                         avatar: "https://distribution.faceit-cdn.net/images/be73c51e-bad5-422b-9e3c-7e7980107685.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198799288088",
//                         game_player_name: "constatinvaldor",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "the pug jug",
//                 type: "premade",
//             },
//         },
//         voting: {
//             location: {
//                 entities: [
//                     {
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                     },
//                     {
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                     },
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                 ],
//                 pick: ["Dallas"],
//             },
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                     },
//                     {
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_mirage", "de_anubis", "de_inferno"],
//             },
//             voted_entity_types: ["location", "map"],
//         },
//         calculate_elo: false,
//         scheduled_at: 1749607200,
//         configured_at: 1749610000,
//         started_at: 1749610500,
//         finished_at: 1749612190,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-73ccea7b-f0e0-4d41-96fa-6880bd8ff1cb-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-73ccea7b-f0e0-4d41-96fa-6880bd8ff1cb-2-1.dem.zst",
//         ],
//         chat_room_id: "match-1-73ccea7b-f0e0-4d41-96fa-6880bd8ff1cb",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction2: 0,
//                 faction1: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-73ccea7b-f0e0-4d41-96fa-6880bd8ff1cb",
//     },
//     {
//         match_id: "1-b771a591-0489-4bd1-8b4b-a90d8dad53e5",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "aa5b4bc5-60a2-4ef4-8c52-39786563d4c0",
//                 leader: "a5a8c2be-796d-4432-a4fb-c0a6cf7cefa7",
//                 avatar: "https://distribution.faceit-cdn.net/images/5505f7ec-0d01-455f-91b5-90a8c286e755.jpeg",
//                 roster: [
//                     {
//                         player_id: "a5a8c2be-796d-4432-a4fb-c0a6cf7cefa7",
//                         nickname: "Neeks",
//                         avatar: "https://distribution.faceit-cdn.net/images/39ed15e8-63ae-4a27-bb76-fb649ca8265b.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198858060704",
//                         game_player_name: "Neeks",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "46e2e9aa-db98-4bcf-a5df-9040b9dfacc3",
//                         nickname: "zaetep",
//                         avatar: "https://distribution.faceit-cdn.net/images/e9883ab7-6906-42f9-b5ea-4b6f14f6b416.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198272002327",
//                         game_player_name: "zaetep",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "89b4e16e-877a-4f1a-9601-e7832ca49d5f",
//                         nickname: "nass",
//                         avatar: "https://distribution.faceit-cdn.net/images/94498ae2-b562-4825-b448-c7da921dba69.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198182298625",
//                         game_player_name: "nass",
//                         game_skill_level: 8,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d990be14-caf6-49f6-a036-7a2f31803db8",
//                         nickname: "Just_Jesse",
//                         avatar: "https://distribution.faceit-cdn.net/images/ce364186-7521-48f9-9245-74297f2d65d7.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198186465426",
//                         game_player_name: "Just Jesse",
//                         game_skill_level: 7,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6110ba82-25c7-48eb-80e8-dcf828956b0f",
//                         nickname: "Kole24",
//                         avatar: "https://distribution.faceit-cdn.net/images/7398b8d9-b1c7-4301-a961-b051a8fdd3b6.jpg",
//                         membership: "esea",
//                         game_player_id: "76561197986299805",
//                         game_player_name: "Kole",
//                         game_skill_level: 8,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "FoxTrot",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "4193add4-0389-46eb-bf2f-6effa68d4d1d",
//                 leader: "2da5a90e-664c-47bf-8f89-52024873209c",
//                 avatar: "https://distribution.faceit-cdn.net/images/7729e41b-c802-4ac5-87a1-8dd50a8260d0.jpeg",
//                 roster: [
//                     {
//                         player_id: "2da5a90e-664c-47bf-8f89-52024873209c",
//                         nickname: "epiphany",
//                         avatar: "https://distribution.faceit-cdn.net/images/2e1cd196-292a-4122-a23b-e7b105468c69.jpg",
//                         membership: "premium",
//                         game_player_id: "76561199493384958",
//                         game_player_name: "็",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ba324313-748c-4ca4-9b27-13c40a04669b",
//                         nickname: "al3k",
//                         avatar: "https://distribution.faceit-cdn.net/images/70c534ff-94ef-4c34-a3c7-d850b7cc29fd.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198276530352",
//                         game_player_name: "al3ksandar",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "415d6409-ead9-4430-8ff6-d820e51f38c9",
//                         nickname: "-_Maru_-",
//                         avatar: "https://distribution.faceit-cdn.net/images/0aef679e-037b-4e1c-af79-84389c77d618.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198211235239",
//                         game_player_name: "Gatteka",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6f4a13bb-357b-4065-9b63-359b3e26b00e",
//                         nickname: "ethex",
//                         avatar: "https://distribution.faceit-cdn.net/images/a02deaba-fd2e-4639-93cd-88a58b70e771.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198193394583",
//                         game_player_name: "october country",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "07c36397-381d-4bee-999c-370f98a4046c",
//                         nickname: "s4bre",
//                         avatar: "https://distribution.faceit-cdn.net/images/49014d2b-9a11-418e-9a81-b539bda98e45.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198155840641",
//                         game_player_name: "s4bre",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Locally Hated",
//                 type: "premade",
//             },
//         },
//         voting: {
//             location: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                     },
//                     {
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                     },
//                     {
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                     },
//                     {
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                     },
//                     {
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_ancient", "de_nuke", "de_mirage"],
//             },
//             voted_entity_types: ["location", "map"],
//         },
//         calculate_elo: false,
//         scheduled_at: 1749603600,
//         configured_at: 1749609766,
//         started_at: 1749610164,
//         finished_at: 1749613353,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-b771a591-0489-4bd1-8b4b-a90d8dad53e5-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-b771a591-0489-4bd1-8b4b-a90d8dad53e5-2-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-b771a591-0489-4bd1-8b4b-a90d8dad53e5-3-1.dem.zst",
//         ],
//         chat_room_id: "match-1-b771a591-0489-4bd1-8b4b-a90d8dad53e5",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction2: 1,
//                 faction1: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction1: {
//                         score: 0,
//                     },
//                     faction2: {
//                         score: 1,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-b771a591-0489-4bd1-8b4b-a90d8dad53e5",
//     },
//     {
//         match_id: "1-471da116-1625-4166-afca-5ac6e9417b83",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "a5b0e409-ec9e-4047-a159-3b3c3fffb2b4",
//                 leader: "ba33b925-72b6-4fd0-9030-e25dafaf3818",
//                 avatar: "https://distribution.faceit-cdn.net/images/38a1cea1-9253-40c8-9e46-c8fb962b795e.jpeg",
//                 roster: [
//                     {
//                         player_id: "ba33b925-72b6-4fd0-9030-e25dafaf3818",
//                         nickname: "SarkasM",
//                         avatar: "https://distribution.faceit-cdn.net/images/0fafb2cb-0db1-4e72-a8fc-8694079aa566.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198346556982",
//                         game_player_name: "Sarky",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "50b9cc25-7391-46a6-86ae-3218eb34c373",
//                         nickname: "kicking",
//                         avatar: "https://distribution.faceit-cdn.net/images/4f68a5af-1387-405a-b624-f784f39e5943.jpg",
//                         membership: "premium",
//                         game_player_id: "76561197982077686",
//                         game_player_name: "KiCk!nG",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cc9e4bc1-eeec-42da-8a38-7e12bab11d2b",
//                         nickname: "HAMBOOGA",
//                         avatar: "https://distribution.faceit-cdn.net/images/0fc54746-c1ab-4dba-9c03-74e05686da15.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198147116054",
//                         game_player_name: "hambooga",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "77f4b01a-f74e-4efd-8d25-e90a8ff0d5a2",
//                         nickname: "NaRo",
//                         avatar: "https://distribution.faceit-cdn.net/images/4a2aaa4d-dbbf-450f-b17f-2ac2f9e0f2f6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198243212278",
//                         game_player_name: "NaRo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "fe0bdd59-6d8d-46f7-b008-e3071585dc53",
//                         nickname: "cmrn",
//                         avatar: "https://distribution.faceit-cdn.net/images/ca057274-9701-4893-8ccc-0e8ae7e9820b.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198082046495",
//                         game_player_name: "cmrn.",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Kooking Esports",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "c500642a-479e-41f4-b75b-39784c6ecf0b",
//                 leader: "85b0498e-15f4-4641-9ad4-bf239b0d6534",
//                 avatar: "https://distribution.faceit-cdn.net/images/82b21d21-29e8-4f15-bfe5-cdc8b92eea7c.jpg",
//                 roster: [
//                     {
//                         player_id: "85b0498e-15f4-4641-9ad4-bf239b0d6534",
//                         nickname: "zBanss",
//                         avatar: "https://distribution.faceit-cdn.net/images/6c6a7e3b-784e-4f2f-8b17-d6e6d17d2946.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198803881281",
//                         game_player_name: "Banss",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "91b947bc-c1ba-49e1-84d0-75448f79ff40",
//                         nickname: "JTrops",
//                         avatar: "https://assets.faceit-cdn.net/avatars/91b947bc-c1ba-49e1-84d0-75448f79ff40_1550999535821.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198250018852",
//                         game_player_name: "JTrops",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "97efd820-f2ec-4d2b-83d2-21b04e16db88",
//                         nickname: "LoneStarrr",
//                         avatar: "https://assets.faceit-cdn.net/avatars/97efd820-f2ec-4d2b-83d2-21b04e16db88_1570489716505.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198093357053",
//                         game_player_name: "LoneStarrr",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "50440888-707d-400d-9bf7-9923c40fdd81",
//                         nickname: "-DacS-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/50440888-707d-400d-9bf7-9923c40fdd81_1551291225689.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198175815589",
//                         game_player_name: "✪ DacS",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a2beb030-46fb-4842-9843-a153cb15666c",
//                         nickname: "Meechu",
//                         avatar: "https://assets.faceit-cdn.net/avatars/a2beb030-46fb-4842-9843-a153cb15666c_1550735038360.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198020611300",
//                         game_player_name: "Meechu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Neon Lights",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                     },
//                     {
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                     },
//                     {
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                     },
//                     {
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                     },
//                     {
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                     },
//                     {
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                     },
//                     {
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                     },
//                     {
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                     },
//                 ],
//                 pick: ["de_nuke", "de_dust2", "de_ancient"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749606300,
//         configured_at: 1749609947,
//         started_at: 1749610497,
//         finished_at: 1749612828,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-471da116-1625-4166-afca-5ac6e9417b83-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-471da116-1625-4166-afca-5ac6e9417b83-2-2.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-471da116-1625-4166-afca-5ac6e9417b83-3-1.dem.zst",
//         ],
//         chat_room_id: "match-1-471da116-1625-4166-afca-5ac6e9417b83",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 1,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-471da116-1625-4166-afca-5ac6e9417b83",
//     },
//     {
//         match_id: "1-249d4006-92ad-4e90-b00f-0af269584b33",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "932eb89c-1db6-4529-9b9d-ff920477081d",
//                 leader: "a82fb9f2-a7cd-42b1-b7c3-1ed8e21ae78a",
//                 avatar: "https://distribution.faceit-cdn.net/images/8d850577-772a-4965-a5a1-6e98a544a163.jpeg",
//                 roster: [
//                     {
//                         player_id: "a82fb9f2-a7cd-42b1-b7c3-1ed8e21ae78a",
//                         nickname: "sveetea",
//                         avatar: "https://distribution.faceit-cdn.net/images/04fac171-d84d-4a1c-999e-5a270f59bf68.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198031153660",
//                         game_player_name: "mac",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cbff9326-7403-420c-8820-2ab3524e38d7",
//                         nickname: "omoo",
//                         avatar: "https://assets.faceit-cdn.net/avatars/cbff9326-7403-420c-8820-2ab3524e38d7_1576908812216.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198129662585",
//                         game_player_name: "omoo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f185cf7c-ac29-48c1-98f3-5ae5dbf74e4f",
//                         nickname: "emblem",
//                         avatar: "https://assets.faceit-cdn.net/avatars/f185cf7c-ac29-48c1-98f3-5ae5dbf74e4f_1605776128837.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198262349134",
//                         game_player_name: "emblem",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8153acc4-fe7a-4caa-8feb-c6639b7303f7",
//                         nickname: "FlashET",
//                         avatar: "https://distribution.faceit-cdn.net/images/f774e356-8b56-4126-ad16-93dd2368b85e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198164978045",
//                         game_player_name: "76561198164978045",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5db9b4be-be77-458f-9a1d-9e49e53873ff",
//                         nickname: "Larryw1k",
//                         avatar: "https://assets.faceit-cdn.net/avatars/5db9b4be-be77-458f-9a1d-9e49e53873ff_1551225205576.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198807221293",
//                         game_player_name: "Larry5k",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Holly Molly",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "9da3249b-9cd7-4157-88b8-0925d05207b3",
//                 leader: "554f41c0-54c4-484d-a516-cbfbf086b7f9",
//                 avatar: "https://distribution.faceit-cdn.net/images/f56ae265-8eb0-4697-986c-8e4328f5d1a6.jpeg",
//                 roster: [
//                     {
//                         player_id: "554f41c0-54c4-484d-a516-cbfbf086b7f9",
//                         nickname: "Sanity",
//                         avatar: "https://distribution.faceit-cdn.net/images/f6bac326-f895-422d-ad5b-304ee07efdaf.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198506019999",
//                         game_player_name: "Sanity",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "04427b3b-cd1e-4116-aabe-a6fe929586b2",
//                         nickname: "Lotkix",
//                         avatar: "https://distribution.faceit-cdn.net/images/4ca23fc5-b64c-451b-8e65-e1bf5b855130.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198081280863",
//                         game_player_name: "Lotkix",
//                         game_skill_level: 7,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "fd8927ff-b9f7-46fc-8bee-531b206795e2",
//                         nickname: "JAVVY",
//                         avatar: "https://distribution.faceit-cdn.net/images/89010ed3-74a2-4690-8895-19796494aead.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198263387426",
//                         game_player_name: "J4V!X",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ea314286-1ad6-4f62-9cbd-4439f10d8b76",
//                         nickname: "JTILL",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ea314286-1ad6-4f62-9cbd-4439f10d8b76_1593578564477.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198141386857",
//                         game_player_name: "JTILL",
//                         game_skill_level: 8,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4e0513e3-62ac-4a9a-a86f-0207b2e7035c",
//                         nickname: "CY0NiK",
//                         avatar: "https://assets.faceit-cdn.net/avatars/4e0513e3-62ac-4a9a-a86f-0207b2e7035c_1551228532561.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198105793675",
//                         game_player_name: "CY0NiK",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "4US",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Dallas"],
//             },
//             map: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                     },
//                     {
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                     },
//                     {
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                     },
//                 ],
//                 pick: ["de_dust2", "de_nuke", "de_train"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749605400,
//         configured_at: 1749608066,
//         started_at: 1749608581,
//         finished_at: 1749610422,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-249d4006-92ad-4e90-b00f-0af269584b33-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-249d4006-92ad-4e90-b00f-0af269584b33-2-1.dem.zst",
//         ],
//         chat_room_id: "match-1-249d4006-92ad-4e90-b00f-0af269584b33",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-249d4006-92ad-4e90-b00f-0af269584b33",
//     },
//     {
//         match_id: "1-c4819079-591f-40bd-9313-1706a9ebf8c1",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "f56331e8-131a-4c50-b7db-eec8b010ff98",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans S8",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "be7fde88-1e05-493a-9861-02a0a48e3bc0",
//                 leader: "25518de8-4f33-4b23-856f-cad03c72df0f",
//                 avatar: "https://distribution.faceit-cdn.net/images/c417aaf4-d6ac-4f5b-8fe6-d3a339cb8385.jpeg",
//                 roster: [
//                     {
//                         player_id: "25518de8-4f33-4b23-856f-cad03c72df0f",
//                         nickname: "looke",
//                         avatar: "https://distribution.faceit-cdn.net/images/5f9c6df0-d412-48ff-aa34-fe62a3cbd3fb.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198158186387",
//                         game_player_name: "looke",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bb23263e-b3d5-4c47-b523-4cd7ce19b4c9",
//                         nickname: "jr24racing",
//                         avatar: "https://assets.faceit-cdn.net/avatars/bb23263e-b3d5-4c47-b523-4cd7ce19b4c9_1550612506647.png",
//                         membership: "premium",
//                         game_player_id: "76561198063907749",
//                         game_player_name: "Jr24racing",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "58d47b80-bb57-4adf-9e25-a8d306239834",
//                         nickname: "Msaia",
//                         avatar: "https://distribution.faceit-cdn.net/images/1b96e24b-0d3d-42f2-a3d0-19c86119e1c9.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143458644",
//                         game_player_name: "Msaia",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "2ee3927f-69a4-4277-85f8-5914a6f07cf7",
//                         nickname: "KURIMAKOV",
//                         avatar: "https://distribution.faceit-cdn.net/images/ac4c2413-342c-4278-8c02-84ea8f73a586.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198210861457",
//                         game_player_name: "KURIMAKOV",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a53eb25c-a4b6-4400-9b91-4cea9634bc4a",
//                         nickname: "1TOASTY",
//                         avatar: "https://distribution.faceit-cdn.net/images/0311d9d1-8ce0-4459-bdac-378931c33193.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198122470381",
//                         game_player_name: "TOASTY",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "NuTorious",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "a1ffea77-4698-435c-aa42-53601f1d030d",
//                 leader: "cf9851ae-dadd-414c-b7af-d1b02b1a6f91",
//                 avatar: "https://distribution.faceit-cdn.net/images/dc648526-8cc2-4b83-98df-891546911e96.jpeg",
//                 roster: [
//                     {
//                         player_id: "cf9851ae-dadd-414c-b7af-d1b02b1a6f91",
//                         nickname: "ScoobX",
//                         avatar: "https://distribution.faceit-cdn.net/images/d7cadcee-0370-4447-9d76-6f79504364f3.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197960368797",
//                         game_player_name: "ScoobX",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f1eca42a-b1a2-4c66-9d10-cc5286ba40b9",
//                         nickname: "BurneyProMod",
//                         avatar: "https://distribution.faceit-cdn.net/images/2659c308-82b9-47c2-a2f6-d4f6077bf21b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198042715279",
//                         game_player_name: "ver.1.22474487139...",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "436e3c5b-49a3-4514-acef-100a8ae30417",
//                         nickname: "Zolqrx",
//                         avatar: "https://distribution.faceit-cdn.net/images/c968455c-e0a2-41a9-a390-fb479d9b5933.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561197988278145",
//                         game_player_name: "Qrx",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "37bf598d-6531-4eb4-b7b8-a039efed3eb6",
//                         nickname: "M0B",
//                         avatar: "https://distribution.faceit-cdn.net/images/5ec4842e-43c0-4d2f-9af8-83d7abd475d2.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199049747588",
//                         game_player_name: "M0B",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "171644da-6e27-4eb2-9fb3-539a55d82713",
//                         nickname: "7obyhh",
//                         avatar: "https://assets.faceit-cdn.net/avatars/171644da-6e27-4eb2-9fb3-539a55d82713_1598054996569.jpg",
//                         membership: "free",
//                         game_player_id: "76561198332929319",
//                         game_player_name: "7o",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "DEATHxGAMERS",
//                 type: "premade",
//             },
//         },
//         voting: {
//             map: {
//                 entities: [
//                     {
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                     },
//                     {
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                     },
//                 ],
//                 pick: ["de_dust2", "de_ancient", "de_mirage"],
//             },
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1749603600,
//         configured_at: 1749606039,
//         started_at: 1749606562,
//         finished_at: 1749608213,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-c4819079-591f-40bd-9313-1706a9ebf8c1-1-1.dem.zst",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-c4819079-591f-40bd-9313-1706a9ebf8c1-2-1.dem.zst",
//         ],
//         chat_room_id: "match-1-c4819079-591f-40bd-9313-1706a9ebf8c1",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-c4819079-591f-40bd-9313-1706a9ebf8c1",
//     },
// ];

// export const PLAYOFFS = [
//     {
//         match_id: "1-f7432c39-8da0-4bce-9a37-b5040d34dfb5",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "ea5e1a5f-3d95-419e-b926-0c39e8c3d8dd",
//                 leader: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                 avatar: "https://distribution.faceit-cdn.net/images/f0a92fc2-c0ab-47a2-b7ff-ee855b0960b5.jpeg",
//                 roster: [
//                     {
//                         player_id: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                         nickname: "aelor",
//                         avatar: "https://distribution.faceit-cdn.net/images/d786937e-0934-4ac4-8445-e0486a9969be.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198231092204",
//                         game_player_name: "aelor",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dcea95af-d945-426c-9b22-3bb3b8fb5441",
//                         nickname: "ayaneuu",
//                         avatar: "https://distribution.faceit-cdn.net/images/2d4a383f-e2ed-4061-9f6d-373b5ec55c99.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198341370795",
//                         game_player_name: "ayaneuu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "01065362-d1c2-447d-bf5a-9dd22714e0ab",
//                         nickname: "Grimblee",
//                         avatar: "https://distribution.faceit-cdn.net/images/c78a532c-0295-4137-9154-854407509ca6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198438447144",
//                         game_player_name: "eelbmirG",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1c8f885a-3d9a-4d64-801f-68a336a745ea",
//                         nickname: "Sanzh1k33",
//                         avatar: "https://distribution.faceit-cdn.net/images/28ebd39b-2d86-4918-91eb-5cad64469810.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199243647648",
//                         game_player_name: "Djon",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bc7cd9c2-0b37-47c6-9b19-4ccd90c63f44",
//                         nickname: "sathsea",
//                         avatar: "https://distribution.faceit-cdn.net/images/ade2d28e-e29d-4353-a72e-87f777bce66d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198401647782",
//                         game_player_name: "sathsea",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Zomblers",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "e71b58f3-2f0d-4f4e-a2ce-79e7b4847599",
//                 leader: "1eaf0c3b-b1e5-40d3-bf87-6c993c7b9648",
//                 avatar: "https://distribution.faceit-cdn.net/images/98711d00-5d4c-45cc-8f46-c1d3cd968d3f.jpeg",
//                 roster: [
//                     {
//                         player_id: "1eaf0c3b-b1e5-40d3-bf87-6c993c7b9648",
//                         nickname: "Talen",
//                         avatar: "https://distribution.faceit-cdn.net/images/d1d8b51b-b252-4d1d-b17b-d7a014972682.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054774651",
//                         game_player_name: "Talen",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "55dac018-93a9-4d73-adca-0aea7f6b80b7",
//                         nickname: "Arias",
//                         avatar: "https://assets.faceit-cdn.net/avatars/55dac018-93a9-4d73-adca-0aea7f6b80b7_1577236441548.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198161279781",
//                         game_player_name: "✪ Arias",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4137ee42-971c-4874-8ec8-688dcc779aa3",
//                         nickname: "clipzera",
//                         avatar: "https://distribution.faceit-cdn.net/images/703e072a-8189-455e-ae75-97db5ebd68d7.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198859037781",
//                         game_player_name: "clipzera",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a4deda37-cddb-4424-801c-f83f82013a9a",
//                         nickname: "flow",
//                         avatar: "https://distribution.faceit-cdn.net/images/7ae107c9-c511-400d-83ca-d7890b9abba5.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198086662677",
//                         game_player_name: "flow",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "89f789b6-327d-4558-a583-deaf542ddce0",
//                         nickname: "mxxxsha",
//                         avatar: "https://distribution.faceit-cdn.net/images/14ae6b37-2428-45ca-9a31-bf1e9d7f78bf.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199373196281",
//                         game_player_name: "xx",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "SUPER EVIL GANG",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         finished_at: 1745381099,
//         chat_room_id: "match-1-f7432c39-8da0-4bce-9a37-b5040d34dfb5",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction2: 2,
//                 faction1: 1,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 4,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-f7432c39-8da0-4bce-9a37-b5040d34dfb5",
//     },
//     {
//         match_id: "1-9d358129-324a-45df-8013-2bd66a35c62b",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "ea5e1a5f-3d95-419e-b926-0c39e8c3d8dd",
//                 leader: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                 avatar: "https://distribution.faceit-cdn.net/images/f0a92fc2-c0ab-47a2-b7ff-ee855b0960b5.jpeg",
//                 roster: [
//                     {
//                         player_id: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                         nickname: "aelor",
//                         avatar: "https://distribution.faceit-cdn.net/images/d786937e-0934-4ac4-8445-e0486a9969be.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198231092204",
//                         game_player_name: "aelor",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dcea95af-d945-426c-9b22-3bb3b8fb5441",
//                         nickname: "ayaneuu",
//                         avatar: "https://distribution.faceit-cdn.net/images/2d4a383f-e2ed-4061-9f6d-373b5ec55c99.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198341370795",
//                         game_player_name: "ayaneuu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "01065362-d1c2-447d-bf5a-9dd22714e0ab",
//                         nickname: "Grimblee",
//                         avatar: "https://distribution.faceit-cdn.net/images/c78a532c-0295-4137-9154-854407509ca6.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198438447144",
//                         game_player_name: "eelbmirG",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1c8f885a-3d9a-4d64-801f-68a336a745ea",
//                         nickname: "Sanzh1K33",
//                         avatar: "https://distribution.faceit-cdn.net/images/714b98a8-f174-48af-952f-c88dc0734cb1.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199243647648",
//                         game_player_name: "-chicago",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bc7cd9c2-0b37-47c6-9b19-4ccd90c63f44",
//                         nickname: "sathsea",
//                         avatar: "https://distribution.faceit-cdn.net/images/ade2d28e-e29d-4353-a72e-87f777bce66d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198401647782",
//                         game_player_name: "sathsea",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Zomblers",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "a66135fc-3aa1-4af9-97fb-8603902d2229",
//                 leader: "5c09d4aa-ccbc-42fa-b2fc-d1e8bd8929fd",
//                 avatar: "https://distribution.faceit-cdn.net/images/56a575c4-a3f9-4324-adfe-d88e142966b7.jpeg",
//                 roster: [
//                     {
//                         player_id: "5c09d4aa-ccbc-42fa-b2fc-d1e8bd8929fd",
//                         nickname: "gln",
//                         avatar: "https://distribution.faceit-cdn.net/images/ece0ce2d-45ba-4044-96e3-d59519d411bb.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197962113920",
//                         game_player_name: "038930938308",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "85d942ce-f00f-4a46-ae38-0942f5beb635",
//                         nickname: "roca",
//                         avatar: "https://distribution.faceit-cdn.net/images/1f92e037-48d2-4027-87bf-d1ce3f190c4c.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197966107627",
//                         game_player_name: "roca",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b8a767cf-f901-46a7-8cc6-df7ce6532fb7",
//                         nickname: "S5J",
//                         avatar: "https://distribution.faceit-cdn.net/images/1e16b97e-48ba-4b9a-b933-d9f0d9d23eef.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198079508311",
//                         game_player_name: "S5J",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ce383cc9-47d7-4bd4-8ad0-138d57dc810e",
//                         nickname: "oreosss",
//                         avatar: "https://distribution.faceit-cdn.net/images/63e7e272-d690-4b17-bb42-1a2bfed8d408.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198145355632",
//                         game_player_name: "oreosss",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9c63efa1-7e26-4db9-aed6-77a031b40a93",
//                         nickname: "-Dante-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/9c63efa1-7e26-4db9-aed6-77a031b40a93_1620708740987.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198016155683",
//                         game_player_name: "Dante",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "VitaPLUR plasma",
//                 type: "premade",
//             },
//         },
//         voting: {
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                     },
//                     {
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                     },
//                     {
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                     },
//                 ],
//                 pick: ["de_dust2", "de_anubis", "de_train"],
//             },
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                 ],
//                 pick: ["Denver"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1744938000,
//         configured_at: 1744944584,
//         started_at: 1744945331,
//         finished_at: 1744947696,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-9d358129-324a-45df-8013-2bd66a35c62b-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-9d358129-324a-45df-8013-2bd66a35c62b-2-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-9d358129-324a-45df-8013-2bd66a35c62b-3-1.dem.gz",
//         ],
//         chat_room_id: "match-1-9d358129-324a-45df-8013-2bd66a35c62b",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 1,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 3,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-9d358129-324a-45df-8013-2bd66a35c62b",
//     },
//     {
//         match_id: "1-569dd283-0cde-4924-89bf-563ba1d3a35c",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "e71b58f3-2f0d-4f4e-a2ce-79e7b4847599",
//                 leader: "1eaf0c3b-b1e5-40d3-bf87-6c993c7b9648",
//                 avatar: "https://distribution.faceit-cdn.net/images/98711d00-5d4c-45cc-8f46-c1d3cd968d3f.jpeg",
//                 roster: [
//                     {
//                         player_id: "1eaf0c3b-b1e5-40d3-bf87-6c993c7b9648",
//                         nickname: "Talen",
//                         avatar: "https://distribution.faceit-cdn.net/images/d1d8b51b-b252-4d1d-b17b-d7a014972682.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054774651",
//                         game_player_name: "Talen",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "55dac018-93a9-4d73-adca-0aea7f6b80b7",
//                         nickname: "Arias",
//                         avatar: "https://assets.faceit-cdn.net/avatars/55dac018-93a9-4d73-adca-0aea7f6b80b7_1577236441548.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198161279781",
//                         game_player_name: "✪ Arias",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4137ee42-971c-4874-8ec8-688dcc779aa3",
//                         nickname: "clipzera",
//                         avatar: "https://distribution.faceit-cdn.net/images/703e072a-8189-455e-ae75-97db5ebd68d7.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198859037781",
//                         game_player_name: "clipzera",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a4deda37-cddb-4424-801c-f83f82013a9a",
//                         nickname: "flow",
//                         avatar: "https://distribution.faceit-cdn.net/images/7ae107c9-c511-400d-83ca-d7890b9abba5.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198086662677",
//                         game_player_name: "flow",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "89f789b6-327d-4558-a583-deaf542ddce0",
//                         nickname: "mxxxsha",
//                         avatar: "https://distribution.faceit-cdn.net/images/14ae6b37-2428-45ca-9a31-bf1e9d7f78bf.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199373196281",
//                         game_player_name: "xx",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "SUPER EVIL GANG",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "d1178f81-f0dd-4ef1-914f-92cbaeba1e6b",
//                 leader: "ad04bba1-7bf7-4840-8f26-f841d874343c",
//                 avatar: "https://distribution.faceit-cdn.net/images/e28c101c-80d6-4fac-96d0-a2a7fe17585c.jpeg",
//                 roster: [
//                     {
//                         player_id: "ad04bba1-7bf7-4840-8f26-f841d874343c",
//                         nickname: "SolGoat",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ad04bba1-7bf7-4840-8f26-f841d874343c_1614818072062.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198076324571",
//                         game_player_name: "SolGoat",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e883b1f5-5895-4fbe-b766-7e48d3f5715a",
//                         nickname: "Equalizer",
//                         avatar: "https://distribution.faceit-cdn.net/images/b35c782f-5529-4a01-8cb5-4b7a717a4366.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198138606223",
//                         game_player_name: "denz",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "483540a8-540a-40cf-b7fd-cd5ce2b5f08d",
//                         nickname: "AtomiK",
//                         avatar: "https://assets.faceit-cdn.net/avatars/483540a8-540a-40cf-b7fd-cd5ce2b5f08d_1623345958235.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198048174130",
//                         game_player_name: "AtomiK",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e7aa2313-f911-41f5-9508-ffac9964e6c1",
//                         nickname: "-MJB",
//                         avatar: "https://distribution.faceit-cdn.net/images/ba824d33-a4bb-4ed7-92b7-f73439496f3a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198211483115",
//                         game_player_name: "BJM",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b4dcdff2-b72a-4e34-8766-35ef7c185ae4",
//                         nickname: "Pr0misee",
//                         avatar: "https://distribution.faceit-cdn.net/images/a7898ec4-6fb3-4f66-8d1e-bedc30fa1a3c.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198069162751",
//                         game_player_name: "Pr0mise | SSJ God",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Aether",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                     },
//                     {
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                     },
//                     {
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                     },
//                     {
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                     },
//                 ],
//                 pick: ["de_dust2", "de_ancient", "de_train"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1744329600,
//         configured_at: 1744333206,
//         started_at: 1744333764,
//         finished_at: 1744335674,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-569dd283-0cde-4924-89bf-563ba1d3a35c-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-569dd283-0cde-4924-89bf-563ba1d3a35c-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-569dd283-0cde-4924-89bf-563ba1d3a35c",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 3,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-569dd283-0cde-4924-89bf-563ba1d3a35c",
//     },
//     {
//         match_id: "1-0b0443e0-d263-4cdd-8cea-8aed30bb785e",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "a66135fc-3aa1-4af9-97fb-8603902d2229",
//                 leader: "5c09d4aa-ccbc-42fa-b2fc-d1e8bd8929fd",
//                 avatar: "https://distribution.faceit-cdn.net/images/56a575c4-a3f9-4324-adfe-d88e142966b7.jpeg",
//                 roster: [
//                     {
//                         player_id: "5c09d4aa-ccbc-42fa-b2fc-d1e8bd8929fd",
//                         nickname: "gln",
//                         avatar: "https://distribution.faceit-cdn.net/images/ece0ce2d-45ba-4044-96e3-d59519d411bb.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197962113920",
//                         game_player_name: "038930938308",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "85d942ce-f00f-4a46-ae38-0942f5beb635",
//                         nickname: "roca",
//                         avatar: "https://distribution.faceit-cdn.net/images/1f92e037-48d2-4027-87bf-d1ce3f190c4c.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197966107627",
//                         game_player_name: "roca",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b8a767cf-f901-46a7-8cc6-df7ce6532fb7",
//                         nickname: "S5J",
//                         avatar: "https://distribution.faceit-cdn.net/images/1e16b97e-48ba-4b9a-b933-d9f0d9d23eef.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198079508311",
//                         game_player_name: "S5J",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ce383cc9-47d7-4bd4-8ad0-138d57dc810e",
//                         nickname: "oreosss",
//                         avatar: "https://distribution.faceit-cdn.net/images/63e7e272-d690-4b17-bb42-1a2bfed8d408.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198145355632",
//                         game_player_name: "oreosss",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9c63efa1-7e26-4db9-aed6-77a031b40a93",
//                         nickname: "-Dante-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/9c63efa1-7e26-4db9-aed6-77a031b40a93_1620708740987.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198016155683",
//                         game_player_name: "Dante",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Vitaplur",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "32576607-8cae-4b2a-8792-a4af8ff6021b",
//                 leader: "daadb189-6a1c-4639-b82e-85e8ed8f10b3",
//                 avatar: "https://distribution.faceit-cdn.net/images/430b49e6-f557-4d43-a1ea-9dce815a07d3.jpeg",
//                 roster: [
//                     {
//                         player_id: "daadb189-6a1c-4639-b82e-85e8ed8f10b3",
//                         nickname: "taben",
//                         avatar: "https://distribution.faceit-cdn.net/images/ce8ca642-1055-49b9-b897-582c829e8a8e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198064555959",
//                         game_player_name: "taben",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "442b47ee-ad07-4dbb-ba2d-ae117d4ad21a",
//                         nickname: "Evancaw",
//                         avatar: "https://distribution.faceit-cdn.net/images/fd0361de-b058-42c4-a7d0-c69161113b9b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198092381756",
//                         game_player_name: "Evan",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "835e0de9-1c68-4675-afe6-0fb0a967371f",
//                         nickname: "-Merl-",
//                         avatar: "https://distribution.faceit-cdn.net/images/1b70626e-1fd7-4e8c-8592-4fe0c9f86de3.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198242053918",
//                         game_player_name: "twitch.tv/merl_tv",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bdf138da-a287-490e-a7c8-1f655f454380",
//                         nickname: "lost666",
//                         avatar: "https://distribution.faceit-cdn.net/images/f71df303-773c-4af4-aba3-3f088bccadb7.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198832317290",
//                         game_player_name: "LAZY JERMAN",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d358b159-38e7-4620-9f5e-70101a00eb5c",
//                         nickname: "-MagiiC",
//                         avatar: "https://distribution.faceit-cdn.net/images/44bcd158-acee-4b84-bf43-571fd089ae4e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198055958028",
//                         game_player_name: "^MagiC",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "LookingIVOrg",
//                 type: "premade",
//             },
//         },
//         voting: {
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                     },
//                     {
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                     },
//                 ],
//                 pick: ["de_anubis", "de_train", "de_dust2"],
//             },
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                     },
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                     },
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                 ],
//                 pick: ["Dallas"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1744335000,
//         configured_at: 1744340176,
//         started_at: 1744340743,
//         finished_at: 1744343624,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-0b0443e0-d263-4cdd-8cea-8aed30bb785e-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-0b0443e0-d263-4cdd-8cea-8aed30bb785e-2-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-0b0443e0-d263-4cdd-8cea-8aed30bb785e-3-1.dem.gz",
//         ],
//         chat_room_id: "match-1-0b0443e0-d263-4cdd-8cea-8aed30bb785e",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction2: 2,
//                 faction1: 1,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-0b0443e0-d263-4cdd-8cea-8aed30bb785e",
//     },
//     {
//         match_id: "1-932bfd41-e229-4122-b13b-487bf89ea338",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "ba165b6b-97b0-4f34-95fd-d5c188460aff",
//                 leader: "8b21b059-4ea2-4d0f-9f5e-61210c1728c4",
//                 avatar: "https://distribution.faceit-cdn.net/images/502e7208-9fcb-48ea-92cc-39d48d46de7a.jpeg",
//                 roster: [
//                     {
//                         player_id: "8b21b059-4ea2-4d0f-9f5e-61210c1728c4",
//                         nickname: "HUNCHO",
//                         avatar: "https://distribution.faceit-cdn.net/images/8b3f2d69-2746-4a02-b756-21a15b10665f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198202870314",
//                         game_player_name: "huncho",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bb191d97-1e23-4aac-87aa-2b43cdf39220",
//                         nickname: "SharpieeCS",
//                         avatar: "https://distribution.faceit-cdn.net/images/09fbe0db-9c1b-4212-a131-0cd10f1a1f73.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198236865240",
//                         game_player_name: "Simon",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a2bc4cea-40d1-4d62-9644-7873ca1d0530",
//                         nickname: "Crisp",
//                         avatar: "https://distribution.faceit-cdn.net/images/2c20a6d3-c6bc-4900-9212-9a245580759c.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198262416232",
//                         game_player_name: "Crisp",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "47e634f7-fadc-47b8-b6a6-12bf70ed599d",
//                         nickname: "2Panic",
//                         avatar: "https://distribution.faceit-cdn.net/images/12c820d1-692d-4b81-a41b-528aa61f1e3f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198026803455",
//                         game_player_name: "2Panic",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8894131d-293e-4d07-a68e-8726576f5cba",
//                         nickname: "REKMEISTERxD",
//                         avatar: "https://distribution.faceit-cdn.net/images/c8535f71-19c5-47f3-9d11-465e3a99f03a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198135139200",
//                         game_player_name: "REKMEISTER",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "TakeFlyte",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "ea5e1a5f-3d95-419e-b926-0c39e8c3d8dd",
//                 leader: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                 avatar: "https://distribution.faceit-cdn.net/images/f0a92fc2-c0ab-47a2-b7ff-ee855b0960b5.jpeg",
//                 roster: [
//                     {
//                         player_id: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                         nickname: "aelor",
//                         avatar: "https://distribution.faceit-cdn.net/images/d786937e-0934-4ac4-8445-e0486a9969be.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198231092204",
//                         game_player_name: "aelor",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dcea95af-d945-426c-9b22-3bb3b8fb5441",
//                         nickname: "ayaneuu",
//                         avatar: "https://distribution.faceit-cdn.net/images/2d4a383f-e2ed-4061-9f6d-373b5ec55c99.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198341370795",
//                         game_player_name: "ayaneuu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "01065362-d1c2-447d-bf5a-9dd22714e0ab",
//                         nickname: "Grimblee",
//                         avatar: "https://distribution.faceit-cdn.net/images/c78a532c-0295-4137-9154-854407509ca6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198438447144",
//                         game_player_name: "eelbmirG",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1c8f885a-3d9a-4d64-801f-68a336a745ea",
//                         nickname: "Sanzh1K33",
//                         avatar: "https://distribution.faceit-cdn.net/images/5ac254cc-ab2c-4390-ab7a-f6d9111af28d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199243647648",
//                         game_player_name: "Ну, погоди!",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bc7cd9c2-0b37-47c6-9b19-4ccd90c63f44",
//                         nickname: "sathsea",
//                         avatar: "https://distribution.faceit-cdn.net/images/ade2d28e-e29d-4353-a72e-87f777bce66d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198401647782",
//                         game_player_name: "sathsea",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Zomblers",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                     },
//                     {
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_ancient", "de_anubis", "de_train"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1744162200,
//         configured_at: 1744165001,
//         started_at: 1744165688,
//         finished_at: 1744167699,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-932bfd41-e229-4122-b13b-487bf89ea338-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-932bfd41-e229-4122-b13b-487bf89ea338-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-932bfd41-e229-4122-b13b-487bf89ea338",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-932bfd41-e229-4122-b13b-487bf89ea338",
//     },
//     {
//         match_id: "1-f75e977d-264d-4071-b139-7dc7f25ccf96",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "932eb89c-1db6-4529-9b9d-ff920477081d",
//                 leader: "a82fb9f2-a7cd-42b1-b7c3-1ed8e21ae78a",
//                 avatar: "https://distribution.faceit-cdn.net/images/8d850577-772a-4965-a5a1-6e98a544a163.jpeg",
//                 roster: [
//                     {
//                         player_id: "a82fb9f2-a7cd-42b1-b7c3-1ed8e21ae78a",
//                         nickname: "sveetea",
//                         avatar: "https://distribution.faceit-cdn.net/images/04fac171-d84d-4a1c-999e-5a270f59bf68.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198031153660",
//                         game_player_name: "mac",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cbff9326-7403-420c-8820-2ab3524e38d7",
//                         nickname: "omoo",
//                         avatar: "https://assets.faceit-cdn.net/avatars/cbff9326-7403-420c-8820-2ab3524e38d7_1576908812216.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198129662585",
//                         game_player_name: "omoo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f185cf7c-ac29-48c1-98f3-5ae5dbf74e4f",
//                         nickname: "emblem",
//                         avatar: "https://assets.faceit-cdn.net/avatars/f185cf7c-ac29-48c1-98f3-5ae5dbf74e4f_1605776128837.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198262349134",
//                         game_player_name: "emblem",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8153acc4-fe7a-4caa-8feb-c6639b7303f7",
//                         nickname: "FlashET",
//                         avatar: "https://distribution.faceit-cdn.net/images/f774e356-8b56-4126-ad16-93dd2368b85e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198164978045",
//                         game_player_name: "76561198164978045",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5db9b4be-be77-458f-9a1d-9e49e53873ff",
//                         nickname: "Larryw1k",
//                         avatar: "https://assets.faceit-cdn.net/avatars/5db9b4be-be77-458f-9a1d-9e49e53873ff_1551225205576.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198807221293",
//                         game_player_name: "Larry5k",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Holly Molly",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "d1178f81-f0dd-4ef1-914f-92cbaeba1e6b",
//                 leader: "ad04bba1-7bf7-4840-8f26-f841d874343c",
//                 avatar: "https://distribution.faceit-cdn.net/images/e28c101c-80d6-4fac-96d0-a2a7fe17585c.jpeg",
//                 roster: [
//                     {
//                         player_id: "ad04bba1-7bf7-4840-8f26-f841d874343c",
//                         nickname: "SolGoat",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ad04bba1-7bf7-4840-8f26-f841d874343c_1614818072062.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198076324571",
//                         game_player_name: "SolGoat",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e883b1f5-5895-4fbe-b766-7e48d3f5715a",
//                         nickname: "Equalizer",
//                         avatar: "https://distribution.faceit-cdn.net/images/b35c782f-5529-4a01-8cb5-4b7a717a4366.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198138606223",
//                         game_player_name: "denz",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "483540a8-540a-40cf-b7fd-cd5ce2b5f08d",
//                         nickname: "AtomiK",
//                         avatar: "https://assets.faceit-cdn.net/avatars/483540a8-540a-40cf-b7fd-cd5ce2b5f08d_1623345958235.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198048174130",
//                         game_player_name: "AtomiK",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e7aa2313-f911-41f5-9508-ffac9964e6c1",
//                         nickname: "-MJB",
//                         avatar: "https://distribution.faceit-cdn.net/images/ba824d33-a4bb-4ed7-92b7-f73439496f3a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198211483115",
//                         game_player_name: "BJM",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b4dcdff2-b72a-4e34-8766-35ef7c185ae4",
//                         nickname: "Pr0misee",
//                         avatar: "https://distribution.faceit-cdn.net/images/a7898ec4-6fb3-4f66-8d1e-bedc30fa1a3c.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198069162751",
//                         game_player_name: "Pr0mise | SSJ God",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Aether",
//                 type: "premade",
//             },
//         },
//         voting: {
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                     },
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                     },
//                 ],
//                 pick: ["Dallas"],
//             },
//             map: {
//                 entities: [
//                     {
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_nuke", "de_inferno", "de_train"],
//             },
//             voted_entity_types: ["location", "map"],
//         },
//         calculate_elo: false,
//         scheduled_at: 1743987600,
//         configured_at: 1743994665,
//         started_at: 1743995191,
//         finished_at: 1743997135,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-f75e977d-264d-4071-b139-7dc7f25ccf96-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-f75e977d-264d-4071-b139-7dc7f25ccf96-2-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-f75e977d-264d-4071-b139-7dc7f25ccf96-3-1.dem.gz",
//         ],
//         chat_room_id: "match-1-f75e977d-264d-4071-b139-7dc7f25ccf96",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 1,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-f75e977d-264d-4071-b139-7dc7f25ccf96",
//     },
//     {
//         match_id: "1-dea1a612-beb5-4673-870e-a2ec3e711ce1",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "e71b58f3-2f0d-4f4e-a2ce-79e7b4847599",
//                 leader: "1eaf0c3b-b1e5-40d3-bf87-6c993c7b9648",
//                 avatar: "https://distribution.faceit-cdn.net/images/98711d00-5d4c-45cc-8f46-c1d3cd968d3f.jpeg",
//                 roster: [
//                     {
//                         player_id: "1eaf0c3b-b1e5-40d3-bf87-6c993c7b9648",
//                         nickname: "Talen",
//                         avatar: "https://distribution.faceit-cdn.net/images/d1d8b51b-b252-4d1d-b17b-d7a014972682.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054774651",
//                         game_player_name: "Talen",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "55dac018-93a9-4d73-adca-0aea7f6b80b7",
//                         nickname: "Arias",
//                         avatar: "https://assets.faceit-cdn.net/avatars/55dac018-93a9-4d73-adca-0aea7f6b80b7_1577236441548.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198161279781",
//                         game_player_name: "✪ Arias",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4137ee42-971c-4874-8ec8-688dcc779aa3",
//                         nickname: "clipzera",
//                         avatar: "https://distribution.faceit-cdn.net/images/703e072a-8189-455e-ae75-97db5ebd68d7.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198859037781",
//                         game_player_name: "clipzera    𓆰 𓆪",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a4deda37-cddb-4424-801c-f83f82013a9a",
//                         nickname: "flow",
//                         avatar: "https://distribution.faceit-cdn.net/images/7ae107c9-c511-400d-83ca-d7890b9abba5.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198086662677",
//                         game_player_name: "flow",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "89f789b6-327d-4558-a583-deaf542ddce0",
//                         nickname: "mxxxsha",
//                         avatar: "https://distribution.faceit-cdn.net/images/14ae6b37-2428-45ca-9a31-bf1e9d7f78bf.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199373196281",
//                         game_player_name: "xx",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "SUPER EVIL GANG",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "a5b0e409-ec9e-4047-a159-3b3c3fffb2b4",
//                 leader: "ba33b925-72b6-4fd0-9030-e25dafaf3818",
//                 avatar: "https://distribution.faceit-cdn.net/images/38a1cea1-9253-40c8-9e46-c8fb962b795e.jpeg",
//                 roster: [
//                     {
//                         player_id: "ba33b925-72b6-4fd0-9030-e25dafaf3818",
//                         nickname: "SarkasM",
//                         avatar: "https://distribution.faceit-cdn.net/images/80bef79a-351b-4168-a21b-bff413ca95ae.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198346556982",
//                         game_player_name: "Sarky",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "50b9cc25-7391-46a6-86ae-3218eb34c373",
//                         nickname: "kicking",
//                         avatar: "https://distribution.faceit-cdn.net/images/48069b21-5385-4d09-9baf-90a4934d8033.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197982077686",
//                         game_player_name: "KiCk!nG",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bc5ff963-a18a-4de9-862e-b530389a383b",
//                         nickname: "-Jord-",
//                         avatar: "https://distribution.faceit-cdn.net/images/deb36e34-caf0-4c2f-a441-19d1295bf4de.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561199030894926",
//                         game_player_name: "MaitreSenpaiJR",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9d5f8db3-c8b8-48dc-a3e4-d38cbb3735d2",
//                         nickname: "CRN-",
//                         avatar: "https://distribution.faceit-cdn.net/images/e4dbe21d-0fdf-44fa-8acb-dad3b1ec3ddf.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143056078",
//                         game_player_name: "CRN",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "77f4b01a-f74e-4efd-8d25-e90a8ff0d5a2",
//                         nickname: "NaRo",
//                         avatar: "https://distribution.faceit-cdn.net/images/4a2aaa4d-dbbf-450f-b17f-2ac2f9e0f2f6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198243212278",
//                         game_player_name: "NaRo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Kooking Esports",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                     {
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                     },
//                     {
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                     },
//                 ],
//                 pick: ["de_mirage", "de_anubis", "de_ancient"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743984000,
//         configured_at: 1743987028,
//         started_at: 1743987553,
//         finished_at: 1743989081,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-dea1a612-beb5-4673-870e-a2ec3e711ce1-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-dea1a612-beb5-4673-870e-a2ec3e711ce1-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-dea1a612-beb5-4673-870e-a2ec3e711ce1",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction2: 0,
//                 faction1: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 2,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-dea1a612-beb5-4673-870e-a2ec3e711ce1",
//     },
//     {
//         match_id: "1-837d38b6-6f3b-41c2-8d04-db850a6a5933",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "ea5e1a5f-3d95-419e-b926-0c39e8c3d8dd",
//                 leader: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                 avatar: "https://distribution.faceit-cdn.net/images/f0a92fc2-c0ab-47a2-b7ff-ee855b0960b5.jpeg",
//                 roster: [
//                     {
//                         player_id: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                         nickname: "aelor",
//                         avatar: "https://distribution.faceit-cdn.net/images/d786937e-0934-4ac4-8445-e0486a9969be.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198231092204",
//                         game_player_name: "aelor",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dcea95af-d945-426c-9b22-3bb3b8fb5441",
//                         nickname: "ayaneuu",
//                         avatar: "https://distribution.faceit-cdn.net/images/2d4a383f-e2ed-4061-9f6d-373b5ec55c99.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198341370795",
//                         game_player_name: "ayaneuu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "01065362-d1c2-447d-bf5a-9dd22714e0ab",
//                         nickname: "Grimblee",
//                         avatar: "https://distribution.faceit-cdn.net/images/c78a532c-0295-4137-9154-854407509ca6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198438447144",
//                         game_player_name: "eelbmirG",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1c8f885a-3d9a-4d64-801f-68a336a745ea",
//                         nickname: "Sanzh1K33",
//                         avatar: "https://distribution.faceit-cdn.net/images/7d513195-080f-4c85-b0f7-da5810154d36.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199243647648",
//                         game_player_name: "i need lobotomia",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bc7cd9c2-0b37-47c6-9b19-4ccd90c63f44",
//                         nickname: "sathsea",
//                         avatar: "https://distribution.faceit-cdn.net/images/ade2d28e-e29d-4353-a72e-87f777bce66d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198401647782",
//                         game_player_name: "sathsea",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Zomblers",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "a4b1806e-9cd9-4ffb-95a6-ca0e7a26b6fb",
//                 leader: "0dcae56f-4a84-4c1d-84c3-b83cca9bfe27",
//                 avatar: "https://distribution.faceit-cdn.net/images/7b4eddcb-d0d4-4658-92da-0e7e4b9c71f1.jpeg",
//                 roster: [
//                     {
//                         player_id: "0dcae56f-4a84-4c1d-84c3-b83cca9bfe27",
//                         nickname: "jBREEEZY",
//                         avatar: "https://assets.faceit-cdn.net/avatars/0dcae56f-4a84-4c1d-84c3-b83cca9bfe27_1550845706365.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198201964492",
//                         game_player_name: "76561198201964492",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "2abbf5d5-ae35-40a1-bf6c-cf19c844168d",
//                         nickname: "duw",
//                         avatar: "https://assets.faceit-cdn.net/avatars/2abbf5d5-ae35-40a1-bf6c-cf19c844168d_1550686836060.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198154531560",
//                         game_player_name: "duw",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c5d76817-97cc-4d24-8d87-aa9259b78783",
//                         nickname: "absolut-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/c5d76817-97cc-4d24-8d87-aa9259b78783_1550791984162.png",
//                         membership: "esea",
//                         game_player_id: "76561198205116051",
//                         game_player_name: "Absolute",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "aaba5bad-82a6-4444-ab6c-60e9fa3b0fc8",
//                         nickname: "hypek1ng-_-",
//                         avatar: "https://distribution.faceit-cdn.net/images/32adf89a-e4d6-4e84-9be6-7877987d0fc5.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198083756391",
//                         game_player_name: "shrimplord777",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "117441a9-2a83-424f-a740-9463cecb5cc4",
//                         nickname: "Sunk_",
//                         avatar: "https://distribution.faceit-cdn.net/images/338d1a6c-4add-4f28-b497-67964266260e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198174932007",
//                         game_player_name: "Sunk",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "drugs n pugs",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 pick: ["de_nuke", "de_anubis", "de_mirage"],
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                     },
//                 ],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743816600,
//         configured_at: 1743819918,
//         started_at: 1743820652,
//         finished_at: 1743823468,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-837d38b6-6f3b-41c2-8d04-db850a6a5933-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-837d38b6-6f3b-41c2-8d04-db850a6a5933-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-837d38b6-6f3b-41c2-8d04-db850a6a5933",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction2: 0,
//                 faction1: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-837d38b6-6f3b-41c2-8d04-db850a6a5933",
//     },
//     {
//         match_id: "1-ab221eaa-a14b-4ffe-987b-56b7480d0bfd",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "0d34139e-b056-4056-8ddc-798200722046",
//                 leader: "b9556255-f711-48af-9fa3-981d864f01f7",
//                 avatar: "https://distribution.faceit-cdn.net/images/64f7b971-7fcd-4cb8-a7cd-7fcf5c21f77a.jpeg",
//                 roster: [
//                     {
//                         player_id: "b9556255-f711-48af-9fa3-981d864f01f7",
//                         nickname: "FRIZZY",
//                         avatar: "https://distribution.faceit-cdn.net/images/6a8c6a03-2650-4b57-b464-29dd374b6e53.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561197982819923",
//                         game_player_name: "FRIZZY",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "101fec20-c366-4946-8c59-d0d83f592c66",
//                         nickname: "taggy",
//                         avatar: "https://distribution.faceit-cdn.net/images/ea8c33f1-f6e8-4526-a4e0-f6a9112f5c3b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198344066364",
//                         game_player_name: "taggy",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "938411e0-f3d2-4ae7-9f59-f84de05d2b04",
//                         nickname: "BAGEL",
//                         avatar: "https://distribution.faceit-cdn.net/images/5076ec7a-cac6-4738-a28c-722af3395c53.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198315699479",
//                         game_player_name: "BAGEL",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8341c3e9-6a39-4fa7-9afa-502ee1e80a43",
//                         nickname: "BiNoX",
//                         avatar: "https://distribution.faceit-cdn.net/images/e2131be8-d059-40b7-82aa-b3c7321e6728.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198804652588",
//                         game_player_name: "BiNoX",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "473cf57e-c858-4c91-83b4-1aa07bd89b0b",
//                         nickname: "LittleBEER",
//                         avatar: "https://distribution.faceit-cdn.net/images/e570a02e-64bf-4766-85bf-ac3709880377.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197961136645",
//                         game_player_name: "LittleBEER",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Chicken Coop",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "ba165b6b-97b0-4f34-95fd-d5c188460aff",
//                 leader: "8b21b059-4ea2-4d0f-9f5e-61210c1728c4",
//                 avatar: "https://distribution.faceit-cdn.net/images/502e7208-9fcb-48ea-92cc-39d48d46de7a.jpeg",
//                 roster: [
//                     {
//                         player_id: "8b21b059-4ea2-4d0f-9f5e-61210c1728c4",
//                         nickname: "HUNCHO",
//                         avatar: "https://distribution.faceit-cdn.net/images/8b3f2d69-2746-4a02-b756-21a15b10665f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198202870314",
//                         game_player_name: "huncho",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bb191d97-1e23-4aac-87aa-2b43cdf39220",
//                         nickname: "SharpieeCS",
//                         avatar: "https://distribution.faceit-cdn.net/images/09fbe0db-9c1b-4212-a131-0cd10f1a1f73.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198236865240",
//                         game_player_name: "Simon",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a2bc4cea-40d1-4d62-9644-7873ca1d0530",
//                         nickname: "Crisp",
//                         avatar: "https://distribution.faceit-cdn.net/images/2c20a6d3-c6bc-4900-9212-9a245580759c.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198262416232",
//                         game_player_name: "Crisp",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "47e634f7-fadc-47b8-b6a6-12bf70ed599d",
//                         nickname: "2Panic",
//                         avatar: "https://distribution.faceit-cdn.net/images/12c820d1-692d-4b81-a41b-528aa61f1e3f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198026803455",
//                         game_player_name: "2Panic",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8894131d-293e-4d07-a68e-8726576f5cba",
//                         nickname: "REKMEISTERxD",
//                         avatar: "https://distribution.faceit-cdn.net/images/c8535f71-19c5-47f3-9d11-465e3a99f03a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198135139200",
//                         game_player_name: "REKMEISTER",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "TakeFlyte",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                     },
//                     {
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_ancient", "de_train", "de_dust2"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743730200,
//         configured_at: 1743732390,
//         started_at: 1743732883,
//         finished_at: 1743735105,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-ab221eaa-a14b-4ffe-987b-56b7480d0bfd-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-ab221eaa-a14b-4ffe-987b-56b7480d0bfd-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-ab221eaa-a14b-4ffe-987b-56b7480d0bfd",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction2: 2,
//                 faction1: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction1: {
//                         score: 0,
//                     },
//                     faction2: {
//                         score: 1,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-ab221eaa-a14b-4ffe-987b-56b7480d0bfd",
//     },
//     {
//         match_id: "1-1b7681ec-8c47-4e32-9cbe-bac32d057286",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "ed2c71c5-0ec3-4ada-a9f5-5f555efdaf9e",
//                 leader: "0b9ca294-fe7c-4808-a25c-ee0ffac8f25c",
//                 avatar: "https://distribution.faceit-cdn.net/images/a5eb6b4f-dd54-4517-8c07-732fc36f3b8b.jpeg",
//                 roster: [
//                     {
//                         player_id: "0b9ca294-fe7c-4808-a25c-ee0ffac8f25c",
//                         nickname: "Ridge",
//                         avatar: "https://distribution.faceit-cdn.net/images/5544b027-5454-4367-9fd6-dd3846ed7dd8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197996934983",
//                         game_player_name: "Ridge",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9f3c126b-1714-4c1b-8585-8bc47db4d5c8",
//                         nickname: "raven",
//                         avatar: "https://distribution.faceit-cdn.net/images/5ab7784a-a9f6-4e01-bfa0-6d6701106395.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198197875274",
//                         game_player_name: "raven",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dd8d87e4-496c-43a7-bcf3-43f12e001e63",
//                         nickname: "Serendipity",
//                         avatar: "https://distribution.faceit-cdn.net/images/9cfa41a6-bd8a-4c5b-aa32-c872a64475d8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198062706062",
//                         game_player_name: "serendipity",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5e5550a9-034b-4b96-bd7a-8086f836454c",
//                         nickname: "Fawx",
//                         avatar: "https://distribution.faceit-cdn.net/images/d363cf39-843c-4750-b522-f57157020e7b.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198001782167",
//                         game_player_name: "Fawx ♥",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "54b178e7-5dc3-4170-9fc2-2f83e78dcd23",
//                         nickname: "Stx",
//                         avatar: "https://assets.faceit-cdn.net/avatars/54b178e7-5dc3-4170-9fc2-2f83e78dcd23_1564784510990.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198079420802",
//                         game_player_name: "Stx",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "SN Comets",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "a66135fc-3aa1-4af9-97fb-8603902d2229",
//                 leader: "5c09d4aa-ccbc-42fa-b2fc-d1e8bd8929fd",
//                 avatar: "https://distribution.faceit-cdn.net/images/4a734824-000f-4bbb-a4bc-6114f85ff7c1.jpeg",
//                 roster: [
//                     {
//                         player_id: "5c09d4aa-ccbc-42fa-b2fc-d1e8bd8929fd",
//                         nickname: "gln",
//                         avatar: "https://distribution.faceit-cdn.net/images/ece0ce2d-45ba-4044-96e3-d59519d411bb.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197962113920",
//                         game_player_name: "038930938308",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "85d942ce-f00f-4a46-ae38-0942f5beb635",
//                         nickname: "roca",
//                         avatar: "https://distribution.faceit-cdn.net/images/1f92e037-48d2-4027-87bf-d1ce3f190c4c.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197966107627",
//                         game_player_name: "roca",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b8a767cf-f901-46a7-8cc6-df7ce6532fb7",
//                         nickname: "S5J",
//                         avatar: "https://distribution.faceit-cdn.net/images/1e16b97e-48ba-4b9a-b933-d9f0d9d23eef.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198079508311",
//                         game_player_name: "S5J",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ce383cc9-47d7-4bd4-8ad0-138d57dc810e",
//                         nickname: "oreosss",
//                         avatar: "https://distribution.faceit-cdn.net/images/63e7e272-d690-4b17-bb42-1a2bfed8d408.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198145355632",
//                         game_player_name: "oreosss",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9c63efa1-7e26-4db9-aed6-77a031b40a93",
//                         nickname: "-Dante-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/9c63efa1-7e26-4db9-aed6-77a031b40a93_1620708740987.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198016155683",
//                         game_player_name: "Dante",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "HoleSmokers",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                     },
//                     {
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                     },
//                     {
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                     },
//                 ],
//                 pick: ["Dallas"],
//             },
//             map: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                     },
//                 ],
//                 pick: ["de_dust2", "de_inferno", "de_nuke"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743989400,
//         configured_at: 1743992917,
//         started_at: 1743993601,
//         finished_at: 1743995799,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-1b7681ec-8c47-4e32-9cbe-bac32d057286-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-1b7681ec-8c47-4e32-9cbe-bac32d057286-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-1b7681ec-8c47-4e32-9cbe-bac32d057286",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-1b7681ec-8c47-4e32-9cbe-bac32d057286",
//     },
//     {
//         match_id: "1-51fcf578-68df-4f0b-8619-e9a59a8feebb",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "32576607-8cae-4b2a-8792-a4af8ff6021b",
//                 leader: "daadb189-6a1c-4639-b82e-85e8ed8f10b3",
//                 avatar: "https://distribution.faceit-cdn.net/images/430b49e6-f557-4d43-a1ea-9dce815a07d3.jpeg",
//                 roster: [
//                     {
//                         player_id: "daadb189-6a1c-4639-b82e-85e8ed8f10b3",
//                         nickname: "taben",
//                         avatar: "https://distribution.faceit-cdn.net/images/ce8ca642-1055-49b9-b897-582c829e8a8e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198064555959",
//                         game_player_name: "taben",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "442b47ee-ad07-4dbb-ba2d-ae117d4ad21a",
//                         nickname: "Evancaw",
//                         avatar: "https://distribution.faceit-cdn.net/images/fd0361de-b058-42c4-a7d0-c69161113b9b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198092381756",
//                         game_player_name: "Evan",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "835e0de9-1c68-4675-afe6-0fb0a967371f",
//                         nickname: "-Merl-",
//                         avatar: "https://distribution.faceit-cdn.net/images/1b70626e-1fd7-4e8c-8592-4fe0c9f86de3.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198242053918",
//                         game_player_name: "twitch.tv/merl_tv",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bdf138da-a287-490e-a7c8-1f655f454380",
//                         nickname: "lost666",
//                         avatar: "https://distribution.faceit-cdn.net/images/f71df303-773c-4af4-aba3-3f088bccadb7.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198832317290",
//                         game_player_name: "LAZY JERMAN",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d358b159-38e7-4620-9f5e-70101a00eb5c",
//                         nickname: "-MagiiC",
//                         avatar: "https://distribution.faceit-cdn.net/images/44bcd158-acee-4b84-bf43-571fd089ae4e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198055958028",
//                         game_player_name: "^MagiC",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "LookingIVOrg",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "be7fde88-1e05-493a-9861-02a0a48e3bc0",
//                 leader: "25518de8-4f33-4b23-856f-cad03c72df0f",
//                 avatar: "https://distribution.faceit-cdn.net/images/c417aaf4-d6ac-4f5b-8fe6-d3a339cb8385.jpeg",
//                 roster: [
//                     {
//                         player_id: "25518de8-4f33-4b23-856f-cad03c72df0f",
//                         nickname: "looke",
//                         avatar: "https://distribution.faceit-cdn.net/images/5f9c6df0-d412-48ff-aa34-fe62a3cbd3fb.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198158186387",
//                         game_player_name: "looke",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bb23263e-b3d5-4c47-b523-4cd7ce19b4c9",
//                         nickname: "jr24racing",
//                         avatar: "https://assets.faceit-cdn.net/avatars/bb23263e-b3d5-4c47-b523-4cd7ce19b4c9_1550612506647.png",
//                         membership: "premium",
//                         game_player_id: "76561198063907749",
//                         game_player_name: "Jr24racing",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "58d47b80-bb57-4adf-9e25-a8d306239834",
//                         nickname: "Msaia-btw",
//                         avatar: "https://distribution.faceit-cdn.net/images/5c83e7e8-24ca-40cd-9e1b-ad3111ad60ae.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143458644",
//                         game_player_name: "Msaia",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "2ee3927f-69a4-4277-85f8-5914a6f07cf7",
//                         nickname: "KURI",
//                         avatar: "https://distribution.faceit-cdn.net/images/ac4c2413-342c-4278-8c02-84ea8f73a586.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198210861457",
//                         game_player_name: "KURIMAKOV",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a53eb25c-a4b6-4400-9b91-4cea9634bc4a",
//                         nickname: "1TOASTY",
//                         avatar: "https://distribution.faceit-cdn.net/images/0311d9d1-8ce0-4459-bdac-378931c33193.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198122470381",
//                         game_player_name: "TOASTY",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "NuTorious",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                     },
//                     {
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                     },
//                 ],
//                 pick: ["de_ancient", "de_train", "de_anubis"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743728400,
//         configured_at: 1743731575,
//         started_at: 1743732284,
//         finished_at: 1743734015,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-51fcf578-68df-4f0b-8619-e9a59a8feebb-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-51fcf578-68df-4f0b-8619-e9a59a8feebb-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-51fcf578-68df-4f0b-8619-e9a59a8feebb",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-51fcf578-68df-4f0b-8619-e9a59a8feebb",
//     },
//     {
//         match_id: "1-b66d2838-fe25-407d-b683-31cb569cb3d3",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "3523360c-7235-452a-b9d9-e587e97ba4b5",
//                 leader: "6d10dac4-b0cf-473d-b5a8-a34c53aefade",
//                 avatar: "https://distribution.faceit-cdn.net/images/d7c079aa-6395-4ad4-922c-2c0470bb350a.jpeg",
//                 roster: [
//                     {
//                         player_id: "6d10dac4-b0cf-473d-b5a8-a34c53aefade",
//                         nickname: "sasha",
//                         avatar: "https://distribution.faceit-cdn.net/images/39a79231-36c3-4066-b123-3860d55e1fb2.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198140847869",
//                         game_player_name: "sasha",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c7b709f5-281b-4133-859e-0d545c4c58d0",
//                         nickname: "Halen",
//                         avatar: "https://distribution.faceit-cdn.net/images/1482288c-ef21-491f-843e-a2da58ebb772.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198060497750",
//                         game_player_name: "Halen",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "01950e33-89f8-40f1-8839-db3771ddd136",
//                         nickname: "Zucar",
//                         avatar: "https://distribution.faceit-cdn.net/images/de55163d-77e6-451d-8ae1-3faed1cf15c0.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198119331267",
//                         game_player_name: "zucc",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "da7422ec-e62a-4df2-87fd-5f3c29f478b7",
//                         nickname: "1dvrk",
//                         avatar: "https://distribution.faceit-cdn.net/images/fa429887-8bb2-4ada-a876-1c5e46444b8f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198358249075",
//                         game_player_name: "Donnie Dvrko",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f10486e8-6197-4bbc-928d-5060e7be9657",
//                         nickname: "fuz3Nk0",
//                         avatar: "https://distribution.faceit-cdn.net/images/5ab3c395-9a62-4a3e-bdd1-4a3784bf7c63.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198929253202",
//                         game_player_name: ")",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "regain",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "d1178f81-f0dd-4ef1-914f-92cbaeba1e6b",
//                 leader: "ad04bba1-7bf7-4840-8f26-f841d874343c",
//                 avatar: "https://distribution.faceit-cdn.net/images/e28c101c-80d6-4fac-96d0-a2a7fe17585c.jpeg",
//                 roster: [
//                     {
//                         player_id: "ad04bba1-7bf7-4840-8f26-f841d874343c",
//                         nickname: "SolGoat",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ad04bba1-7bf7-4840-8f26-f841d874343c_1614818072062.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198076324571",
//                         game_player_name: "SolGoat",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e883b1f5-5895-4fbe-b766-7e48d3f5715a",
//                         nickname: "Equalizer",
//                         avatar: "https://distribution.faceit-cdn.net/images/b35c782f-5529-4a01-8cb5-4b7a717a4366.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198138606223",
//                         game_player_name: "denz",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "483540a8-540a-40cf-b7fd-cd5ce2b5f08d",
//                         nickname: "AtomiK",
//                         avatar: "https://assets.faceit-cdn.net/avatars/483540a8-540a-40cf-b7fd-cd5ce2b5f08d_1623345958235.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198048174130",
//                         game_player_name: "AtomiK",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e7aa2313-f911-41f5-9508-ffac9964e6c1",
//                         nickname: "-MJB",
//                         avatar: "https://distribution.faceit-cdn.net/images/ba824d33-a4bb-4ed7-92b7-f73439496f3a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198211483115",
//                         game_player_name: "BJM",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b4dcdff2-b72a-4e34-8766-35ef7c185ae4",
//                         nickname: "Pr0misee",
//                         avatar: "https://distribution.faceit-cdn.net/images/a7898ec4-6fb3-4f66-8d1e-bedc30fa1a3c.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198069162751",
//                         game_player_name: "Pr0mise | SSJ God",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Aether",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                     {
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                     },
//                     {
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_dust2", "de_inferno", "de_ancient"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743726480,
//         configured_at: 1743730234,
//         started_at: 1743730718,
//         finished_at: 1743732949,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-b66d2838-fe25-407d-b683-31cb569cb3d3-1-2.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-b66d2838-fe25-407d-b683-31cb569cb3d3-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-b66d2838-fe25-407d-b683-31cb569cb3d3",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction2: 2,
//                 faction1: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-b66d2838-fe25-407d-b683-31cb569cb3d3",
//     },
//     {
//         match_id: "1-52be2dc0-d2ea-4f0b-8943-c6082539a97b",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "932eb89c-1db6-4529-9b9d-ff920477081d",
//                 leader: "a82fb9f2-a7cd-42b1-b7c3-1ed8e21ae78a",
//                 avatar: "https://distribution.faceit-cdn.net/images/8d850577-772a-4965-a5a1-6e98a544a163.jpeg",
//                 roster: [
//                     {
//                         player_id: "a82fb9f2-a7cd-42b1-b7c3-1ed8e21ae78a",
//                         nickname: "sveetea",
//                         avatar: "https://distribution.faceit-cdn.net/images/04fac171-d84d-4a1c-999e-5a270f59bf68.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198031153660",
//                         game_player_name: "mac",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cbff9326-7403-420c-8820-2ab3524e38d7",
//                         nickname: "omoo",
//                         avatar: "https://assets.faceit-cdn.net/avatars/cbff9326-7403-420c-8820-2ab3524e38d7_1576908812216.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198129662585",
//                         game_player_name: "omoo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f185cf7c-ac29-48c1-98f3-5ae5dbf74e4f",
//                         nickname: "emblem",
//                         avatar: "https://assets.faceit-cdn.net/avatars/f185cf7c-ac29-48c1-98f3-5ae5dbf74e4f_1605776128837.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198262349134",
//                         game_player_name: "emblem",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8153acc4-fe7a-4caa-8feb-c6639b7303f7",
//                         nickname: "FlashET",
//                         avatar: "https://distribution.faceit-cdn.net/images/f774e356-8b56-4126-ad16-93dd2368b85e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198164978045",
//                         game_player_name: "76561198164978045",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5db9b4be-be77-458f-9a1d-9e49e53873ff",
//                         nickname: "Larryw1k",
//                         avatar: "https://assets.faceit-cdn.net/avatars/5db9b4be-be77-458f-9a1d-9e49e53873ff_1551225205576.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198807221293",
//                         game_player_name: "Larry5k",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Holly Molly",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "8a9c9fce-fcf3-404d-ac3b-42d750f875df",
//                 leader: "041949f0-a34f-4246-984c-a3ec0e275145",
//                 avatar: "https://distribution.faceit-cdn.net/images/0ddf693e-d922-4238-ac0f-a44a217e3141.jpeg",
//                 roster: [
//                     {
//                         player_id: "041949f0-a34f-4246-984c-a3ec0e275145",
//                         nickname: "b0nes",
//                         avatar: "https://distribution.faceit-cdn.net/images/53a06c89-a5f3-49d7-a0b6-ff39802ee520.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198083090482",
//                         game_player_name: "bones",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e10e672b-95ca-4882-88ef-c3615f23172c",
//                         nickname: "coley",
//                         avatar: "https://assets.faceit-cdn.net/avatars/e10e672b-95ca-4882-88ef-c3615f23172c_1551085798081.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198161909891",
//                         game_player_name: "coley",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9dc50b1f-0980-4c47-a983-c276d3b8b781",
//                         nickname: "-_AJ",
//                         avatar: "https://distribution.faceit-cdn.net/images/1ca9b904-6809-420f-9355-ad3262005e8f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198079695926",
//                         game_player_name: ".AJ",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e865b017-5152-4898-90d1-03f49937c648",
//                         nickname: "_Wilson_",
//                         avatar: "https://distribution.faceit-cdn.net/images/d133d022-3d3c-45f1-b881-27c21af46093.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198068704558",
//                         game_player_name: "Wilson",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ae4b6134-4a8e-4865-aa44-a2d46599d39a",
//                         nickname: "snufaffu",
//                         avatar: "https://distribution.faceit-cdn.net/images/767217b0-b517-473c-902f-a076d9b39793.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198127408500",
//                         game_player_name: "snufaffu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Amped eSports",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                     },
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                     },
//                 ],
//                 pick: ["Dallas"],
//             },
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                     },
//                     {
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                     },
//                     {
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                     },
//                     {
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_nuke", "de_ancient", "de_anubis"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743731400,
//         configured_at: 1743735371,
//         started_at: 1743735887,
//         finished_at: 1743737933,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-52be2dc0-d2ea-4f0b-8943-c6082539a97b-1-2.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-52be2dc0-d2ea-4f0b-8943-c6082539a97b-2-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-52be2dc0-d2ea-4f0b-8943-c6082539a97b-3-1.dem.gz",
//         ],
//         chat_room_id: "match-1-52be2dc0-d2ea-4f0b-8943-c6082539a97b",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction1: 1,
//                 faction2: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-52be2dc0-d2ea-4f0b-8943-c6082539a97b",
//     },
//     {
//         match_id: "1-2bf49d35-f91d-4af4-a3d7-fbb651dcfb6b",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "0d1c2b67-d0b0-4ba5-94a5-935aea34affc",
//                 leader: "ff704bfb-9533-4047-9a4a-a71886397070",
//                 avatar: "https://distribution.faceit-cdn.net/images/47145329-93a6-4b01-b692-48e17e30f200.jpeg",
//                 roster: [
//                     {
//                         player_id: "ff704bfb-9533-4047-9a4a-a71886397070",
//                         nickname: "Tr1ck",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ff704bfb-9533-4047-9a4a-a71886397070_1551134874059.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198138033226",
//                         game_player_name: "Trick",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6db40a58-e65e-4907-82a2-7ec364999be1",
//                         nickname: "Go0dby3",
//                         avatar: "https://assets.faceit-cdn.net/avatars/6db40a58-e65e-4907-82a2-7ec364999be1_1550858524552.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198096532399",
//                         game_player_name: "Goodbye",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "581d92b9-8310-4a29-81de-6b4057e8a6ed",
//                         nickname: "Signal",
//                         avatar: "https://distribution.faceit-cdn.net/images/a48cbaf2-af59-47b9-a0ae-5daec97cad61.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054121335",
//                         game_player_name: "Signal",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "96acce04-abc2-4721-809f-66957f17325a",
//                         nickname: "Gibbyatl",
//                         avatar: "https://distribution.faceit-cdn.net/images/7f97de77-595e-4d68-baeb-18113f93d168.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143856840",
//                         game_player_name: "Gibby_ATL",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "470d26d1-5f5c-4403-96ed-67c0b1ac3553",
//                         nickname: "dirtydan",
//                         avatar: "https://distribution.faceit-cdn.net/images/f6cc863a-5b9d-4ba3-92a3-3556c54f3642.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054776069",
//                         game_player_name: "DirtyDan_",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "RedactedSociety",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "a5b0e409-ec9e-4047-a159-3b3c3fffb2b4",
//                 leader: "ba33b925-72b6-4fd0-9030-e25dafaf3818",
//                 avatar: "https://distribution.faceit-cdn.net/images/38a1cea1-9253-40c8-9e46-c8fb962b795e.jpeg",
//                 roster: [
//                     {
//                         player_id: "ba33b925-72b6-4fd0-9030-e25dafaf3818",
//                         nickname: "SarkasM",
//                         avatar: "https://distribution.faceit-cdn.net/images/80bef79a-351b-4168-a21b-bff413ca95ae.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198346556982",
//                         game_player_name: "Sarky",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "50b9cc25-7391-46a6-86ae-3218eb34c373",
//                         nickname: "kicking",
//                         avatar: "https://distribution.faceit-cdn.net/images/48069b21-5385-4d09-9baf-90a4934d8033.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197982077686",
//                         game_player_name: "KiCk!nG",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bc5ff963-a18a-4de9-862e-b530389a383b",
//                         nickname: "-Jord-",
//                         avatar: "https://distribution.faceit-cdn.net/images/deb36e34-caf0-4c2f-a441-19d1295bf4de.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561199030894926",
//                         game_player_name: "MaitreSenpaiJR",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9d5f8db3-c8b8-48dc-a3e4-d38cbb3735d2",
//                         nickname: "CRN-",
//                         avatar: "https://distribution.faceit-cdn.net/images/e4dbe21d-0fdf-44fa-8acb-dad3b1ec3ddf.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143056078",
//                         game_player_name: "CRN",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "77f4b01a-f74e-4efd-8d25-e90a8ff0d5a2",
//                         nickname: "NaRo",
//                         avatar: "https://distribution.faceit-cdn.net/images/4a2aaa4d-dbbf-450f-b17f-2ac2f9e0f2f6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198243212278",
//                         game_player_name: "NaRo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Kooking Esports",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                     },
//                     {
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                     },
//                     {
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_mirage", "de_nuke", "de_ancient"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743729360,
//         configured_at: 1743731920,
//         started_at: 1743732384,
//         finished_at: 1743734696,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-2bf49d35-f91d-4af4-a3d7-fbb651dcfb6b-1-2.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-2bf49d35-f91d-4af4-a3d7-fbb651dcfb6b-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-2bf49d35-f91d-4af4-a3d7-fbb651dcfb6b",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-2bf49d35-f91d-4af4-a3d7-fbb651dcfb6b",
//     },
//     {
//         match_id: "1-c56a9f29-ac8b-46c5-809e-f595722aaec6",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "b4cb8915-2a74-4899-b7df-220cb85f3916",
//         competition_type: "championship",
//         competition_name: "OSS Season 7 Playoffs",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "35eebad9-3a5f-4a70-867c-287bd09d4d23",
//                 leader: "d9f447b4-151b-4ca7-8d4c-1e41deb3db08",
//                 avatar: "https://distribution.faceit-cdn.net/images/89c54a99-4e40-40ca-852e-cfc40a5e75ae.jpeg",
//                 roster: [
//                     {
//                         player_id: "d9f447b4-151b-4ca7-8d4c-1e41deb3db08",
//                         nickname: "Jachro",
//                         avatar: "https://distribution.faceit-cdn.net/images/57672e99-a400-4914-b480-e3996070b16a.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198089558794",
//                         game_player_name: "Jachro",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "de81f94f-fd21-4b68-b912-7b7ea52a63b9",
//                         nickname: "--toasty",
//                         avatar: "https://assets.faceit-cdn.net/avatars/de81f94f-fd21-4b68-b912-7b7ea52a63b9_1588005482316.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198039591422",
//                         game_player_name: "-.-",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f682901b-236e-4251-893f-48b8e22226a2",
//                         nickname: "brawckzz",
//                         avatar: "https://distribution.faceit-cdn.net/images/bd1cf18c-9437-499c-860a-8088dda88d1d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198287531107",
//                         game_player_name: "brawckzz",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9a2f5122-350d-4472-b13c-197d7aa23294",
//                         nickname: "P3nnyCS",
//                         avatar: "https://distribution.faceit-cdn.net/images/0a5ddfb0-ee59-4072-90f1-b94ba9558eaa.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198072585465",
//                         game_player_name: "P3nny",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6a241fa7-6d5a-49ed-8a41-77a50d2819e7",
//                         nickname: "madss",
//                         avatar: "https://distribution.faceit-cdn.net/images/82510e7d-5a9e-413e-98ca-67888ec90aab.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198174431453",
//                         game_player_name: "madss",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Revel",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "e71b58f3-2f0d-4f4e-a2ce-79e7b4847599",
//                 leader: "1eaf0c3b-b1e5-40d3-bf87-6c993c7b9648",
//                 avatar: "https://distribution.faceit-cdn.net/images/98711d00-5d4c-45cc-8f46-c1d3cd968d3f.jpeg",
//                 roster: [
//                     {
//                         player_id: "1eaf0c3b-b1e5-40d3-bf87-6c993c7b9648",
//                         nickname: "Talen",
//                         avatar: "https://distribution.faceit-cdn.net/images/d1d8b51b-b252-4d1d-b17b-d7a014972682.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054774651",
//                         game_player_name: "Talen",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4137ee42-971c-4874-8ec8-688dcc779aa3",
//                         nickname: "clipzera",
//                         avatar: "https://distribution.faceit-cdn.net/images/703e072a-8189-455e-ae75-97db5ebd68d7.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198859037781",
//                         game_player_name: "clipzera    𓆰 𓆪",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a4deda37-cddb-4424-801c-f83f82013a9a",
//                         nickname: "flow",
//                         avatar: "https://distribution.faceit-cdn.net/images/7ae107c9-c511-400d-83ca-d7890b9abba5.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198086662677",
//                         game_player_name: "flow",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "89f789b6-327d-4558-a583-deaf542ddce0",
//                         nickname: "mxxxsha",
//                         avatar: "https://distribution.faceit-cdn.net/images/14ae6b37-2428-45ca-9a31-bf1e9d7f78bf.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199373196281",
//                         game_player_name: "xx",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c02667ae-4b69-4c3b-977d-6d63069b5765",
//                         nickname: "L0NER",
//                         avatar: "https://assets.faceit-cdn.net/avatars/c02667ae-4b69-4c3b-977d-6d63069b5765_1550515031740.jpg",
//                         membership: "esea",
//                         game_player_id: "76561197971651694",
//                         game_player_name: "L0NER",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "SUPER EVIL GANG",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 pick: ["Chicago"],
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//             },
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                     },
//                     {
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                     },
//                     {
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                     },
//                     {
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                     },
//                     {
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_anubis", "de_ancient", "de_mirage"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743730320,
//         configured_at: 1743732539,
//         started_at: 1743732963,
//         finished_at: 1743735130,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-c56a9f29-ac8b-46c5-809e-f595722aaec6-1-2.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-c56a9f29-ac8b-46c5-809e-f595722aaec6-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-c56a9f29-ac8b-46c5-809e-f595722aaec6",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 1,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-c56a9f29-ac8b-46c5-809e-f595722aaec6",
//     },
// ];

// export const REGSEASON = [
//     {
//         match_id: "1-3f5ae3a2-c6b6-40f0-9268-b4acb09306ae",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "a66135fc-3aa1-4af9-97fb-8603902d2229",
//                 leader: "5c09d4aa-ccbc-42fa-b2fc-d1e8bd8929fd",
//                 avatar: "https://distribution.faceit-cdn.net/images/4a734824-000f-4bbb-a4bc-6114f85ff7c1.jpeg",
//                 roster: [
//                     {
//                         player_id: "5c09d4aa-ccbc-42fa-b2fc-d1e8bd8929fd",
//                         nickname: "gln",
//                         avatar: "https://distribution.faceit-cdn.net/images/ece0ce2d-45ba-4044-96e3-d59519d411bb.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197962113920",
//                         game_player_name: "038930938308",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "85d942ce-f00f-4a46-ae38-0942f5beb635",
//                         nickname: "roca",
//                         avatar: "https://distribution.faceit-cdn.net/images/1f92e037-48d2-4027-87bf-d1ce3f190c4c.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197966107627",
//                         game_player_name: "roca",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9c63efa1-7e26-4db9-aed6-77a031b40a93",
//                         nickname: "Dantes_Oni",
//                         avatar: "https://assets.faceit-cdn.net/avatars/9c63efa1-7e26-4db9-aed6-77a031b40a93_1620708740987.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198016155683",
//                         game_player_name: "Dante",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f690f304-df3f-4555-b8e5-e4e48a48a3f3",
//                         nickname: "Mexi",
//                         avatar: "https://assets.faceit-cdn.net/avatars/f690f304-df3f-4555-b8e5-e4e48a48a3f3_1560560718391.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198203255642",
//                         game_player_name: "Mexican",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9077f367-b574-4295-bbda-83c177eca53d",
//                         nickname: "duhck",
//                         avatar: "https://distribution.faceit-cdn.net/images/a6e2b084-04e6-46a5-8eed-abae6dc1c1b0.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198126842444",
//                         game_player_name: "DUCK-SAN",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "HoleSmokers",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "ea5e1a5f-3d95-419e-b926-0c39e8c3d8dd",
//                 leader: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                 avatar: "https://distribution.faceit-cdn.net/images/6cc03db7-7065-497f-82cf-c788ec6035c3.jpeg",
//                 roster: [
//                     {
//                         player_id: "b934fa1f-79ac-4410-84cd-06a6eca64423",
//                         nickname: "aelor",
//                         avatar: "https://distribution.faceit-cdn.net/images/d786937e-0934-4ac4-8445-e0486a9969be.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198231092204",
//                         game_player_name: "aelor",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dcea95af-d945-426c-9b22-3bb3b8fb5441",
//                         nickname: "ayaneuu",
//                         avatar: "https://distribution.faceit-cdn.net/images/2e4f1885-bca0-4d0a-be44-36711877acd1.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198341370795",
//                         game_player_name: "ayaneuu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1c8f885a-3d9a-4d64-801f-68a336a745ea",
//                         nickname: "Sanzh1k33-_",
//                         avatar: "https://distribution.faceit-cdn.net/images/3821e468-6100-4a75-9126-b418aa524c3c.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199243647648",
//                         game_player_name: "MCGREGOR FOREVER",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bc7cd9c2-0b37-47c6-9b19-4ccd90c63f44",
//                         nickname: "sathsea",
//                         avatar: "https://distribution.faceit-cdn.net/images/ade2d28e-e29d-4353-a72e-87f777bce66d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198401647782",
//                         game_player_name: "sathsea",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6579805a-f0cc-4ab5-9e00-6b829398ae82",
//                         nickname: "1Static",
//                         avatar: "https://distribution.faceit-cdn.net/images/bcc7b5f0-aab6-4bda-9f85-e936fefd1367.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198304965135",
//                         game_player_name: "Static",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Zomblers",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Dallas"],
//             },
//             map: {
//                 entities: [
//                     {
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                     },
//                 ],
//                 pick: ["de_train", "de_anubis", "de_mirage"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743132720,
//         configured_at: 1743132764,
//         started_at: 1743133035,
//         finished_at: 1743135160,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-3f5ae3a2-c6b6-40f0-9268-b4acb09306ae-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-3f5ae3a2-c6b6-40f0-9268-b4acb09306ae-2-2.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-3f5ae3a2-c6b6-40f0-9268-b4acb09306ae-3-2.dem.gz",
//         ],
//         chat_room_id: "match-1-3f5ae3a2-c6b6-40f0-9268-b4acb09306ae",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 1,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction1: {
//                         score: 0,
//                     },
//                     faction2: {
//                         score: 1,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-3f5ae3a2-c6b6-40f0-9268-b4acb09306ae",
//     },
//     {
//         match_id: "1-95744a34-534f-4cfe-99d3-18b00cf93eeb",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "34f4cba1-3158-4e86-87e1-32570008a739",
//                 leader: "eb950d80-3c71-4677-9117-31d4b53020e6",
//                 avatar: "https://distribution.faceit-cdn.net/images/48506802-0dd0-4290-bb3c-798162de128e.jpeg",
//                 roster: [
//                     {
//                         player_id: "eb950d80-3c71-4677-9117-31d4b53020e6",
//                         nickname: "Eternal-1",
//                         avatar: "https://distribution.faceit-cdn.net/images/c0f25e7b-0d6c-498c-9d34-6677a8645b67.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198068334298",
//                         game_player_name: "ICON | Eternal-",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bf96f71b-393b-413e-98b4-4fbc62c846f7",
//                         nickname: "blakert-",
//                         avatar: "https://distribution.faceit-cdn.net/images/1c7f5fc2-10f2-42bd-ae55-403396e7be29.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198318845922",
//                         game_player_name: "blakert-",
//                         game_skill_level: 8,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "1c4e2edd-0fb0-4b23-9cf2-f6759a40a3bf",
//                         nickname: "Luxion",
//                         avatar: "https://distribution.faceit-cdn.net/images/fb07281c-18ff-4329-b475-60cfcb05c51f.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198858129961",
//                         game_player_name: "Luxion",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4003c29a-aeeb-4e24-abee-89d45e10787d",
//                         nickname: "OceanMan",
//                         avatar: "https://distribution.faceit-cdn.net/images/3f9fac7e-2869-47e5-ad47-752f71e06d3c.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198306923403",
//                         game_player_name: "OCEANMAN",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "171644da-6e27-4eb2-9fb3-539a55d82713",
//                         nickname: "7obyhh",
//                         avatar: "https://assets.faceit-cdn.net/avatars/171644da-6e27-4eb2-9fb3-539a55d82713_1598054996569.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198332929319",
//                         game_player_name: "7o",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Locally Hated",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "0fbf5028-d99b-446f-a482-ab9048fd4abc",
//                 leader: "314bd143-e267-48a2-93aa-7bc4619c2e46",
//                 avatar: "https://distribution.faceit-cdn.net/images/7b0515e5-b909-4ba8-87f8-205a8d21bd0f.jpeg",
//                 roster: [
//                     {
//                         player_id: "314bd143-e267-48a2-93aa-7bc4619c2e46",
//                         nickname: "KingVinci",
//                         avatar: "https://distribution.faceit-cdn.net/images/56be3527-869a-4660-ab91-4178099a5256.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198276175000",
//                         game_player_name: "Vinci☢",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c24a85b9-45e1-4241-b6b1-e2061094245b",
//                         nickname: "dotz14",
//                         avatar: "https://distribution.faceit-cdn.net/images/d664403b-8fd7-494d-951c-5370f75d4402.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198201447199",
//                         game_player_name: "DotZ.",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6595589a-c31c-4d50-9348-5b1a97423aa1",
//                         nickname: "-SayHey-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/6595589a-c31c-4d50-9348-5b1a97423aa1_1614212975216.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198401862898",
//                         game_player_name: "Say_Hey",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e8a6b5ba-fa83-47a5-a840-1889f4e63dcf",
//                         nickname: "reamerr",
//                         avatar: "https://assets.faceit-cdn.net/avatars/e8a6b5ba-fa83-47a5-a840-1889f4e63dcf_1550804194561.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198179548095",
//                         game_player_name: "76561198179548095",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8e43e4d0-4947-4530-82d8-49ef996d5b9a",
//                         nickname: "Ostrich",
//                         avatar: "https://distribution.faceit-cdn.net/images/64083b70-865b-4ab9-a128-5012160342e7.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198157582599",
//                         game_player_name: "Ostrich",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Prone",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         finished_at: 1743044357,
//         chat_room_id: "match-1-95744a34-534f-4cfe-99d3-18b00cf93eeb",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction2: 2,
//                 faction1: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 13,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 13,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-95744a34-534f-4cfe-99d3-18b00cf93eeb",
//     },
//     {
//         match_id: "1-8d54b7bb-f1d0-4620-9439-6299d9cb4897",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "0d1c2b67-d0b0-4ba5-94a5-935aea34affc",
//                 leader: "ff704bfb-9533-4047-9a4a-a71886397070",
//                 avatar: "https://distribution.faceit-cdn.net/images/47145329-93a6-4b01-b692-48e17e30f200.jpeg",
//                 roster: [
//                     {
//                         player_id: "ff704bfb-9533-4047-9a4a-a71886397070",
//                         nickname: "Tr1ck",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ff704bfb-9533-4047-9a4a-a71886397070_1551134874059.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198138033226",
//                         game_player_name: "Trick",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6db40a58-e65e-4907-82a2-7ec364999be1",
//                         nickname: "Go0dby3",
//                         avatar: "https://assets.faceit-cdn.net/avatars/6db40a58-e65e-4907-82a2-7ec364999be1_1550858524552.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198096532399",
//                         game_player_name: "Goodbye",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "581d92b9-8310-4a29-81de-6b4057e8a6ed",
//                         nickname: "Signal",
//                         avatar: "https://distribution.faceit-cdn.net/images/a48cbaf2-af59-47b9-a0ae-5daec97cad61.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054121335",
//                         game_player_name: "Signal",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "96acce04-abc2-4721-809f-66957f17325a",
//                         nickname: "Gibbyatl",
//                         avatar: "https://distribution.faceit-cdn.net/images/7f97de77-595e-4d68-baeb-18113f93d168.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143856840",
//                         game_player_name: "Gibby_ATL",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "470d26d1-5f5c-4403-96ed-67c0b1ac3553",
//                         nickname: "dirtydan",
//                         avatar: "https://distribution.faceit-cdn.net/images/f6cc863a-5b9d-4ba3-92a3-3556c54f3642.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054776069",
//                         game_player_name: "DirtyDan_",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "RedactedSociety",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "07800f60-6b0e-48d8-8f8f-7dcfe976e154",
//                 leader: "ed8cc64f-baab-48ab-879e-ed66ca14c227",
//                 avatar: "https://distribution.faceit-cdn.net/images/f88233b8-f7b3-4160-ac05-a5baa77f0d08.jpeg",
//                 roster: [
//                     {
//                         player_id: "ed8cc64f-baab-48ab-879e-ed66ca14c227",
//                         nickname: "wist",
//                         avatar: "https://distribution.faceit-cdn.net/images/c3f61656-c4c7-4152-8e02-9127e23e3b10.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198203702795",
//                         game_player_name: "wist",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5003d9ae-8813-4e2a-ad84-3117acf11d1a",
//                         nickname: "t4urtus",
//                         avatar: "https://assets.faceit-cdn.net/avatars/5003d9ae-8813-4e2a-ad84-3117acf11d1a_1593468009894.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198073172300",
//                         game_player_name: "t4urtus",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cba2d2f8-218b-452b-870f-34fb19737095",
//                         nickname: "mag-",
//                         avatar: "https://distribution.faceit-cdn.net/images/dd5e25d0-a502-4cc4-a91b-4cbdfbfbfd90.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198255775195",
//                         game_player_name: "dopeboy210",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c6363339-e90f-491c-91ee-0795ca973f77",
//                         nickname: "bezymec",
//                         avatar: "https://distribution.faceit-cdn.net/images/c7b47f83-944c-4e41-868c-77790a627ea6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198362752793",
//                         game_player_name: "zaccy",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9236c42e-e369-4f19-80dd-a5865791f366",
//                         nickname: "A_W_D",
//                         avatar: "https://assets.faceit-cdn.net/avatars/9236c42e-e369-4f19-80dd-a5865791f366_1594090583751.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198134328879",
//                         game_player_name: "A.W.D",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "VNT",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                     },
//                     {
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                     },
//                 ],
//                 pick: ["de_inferno", "de_anubis", "de_mirage"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743123600,
//         configured_at: 1743128071,
//         started_at: 1743128508,
//         finished_at: 1743130585,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-8d54b7bb-f1d0-4620-9439-6299d9cb4897-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-8d54b7bb-f1d0-4620-9439-6299d9cb4897-2-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-8d54b7bb-f1d0-4620-9439-6299d9cb4897-3-1.dem.gz",
//         ],
//         chat_room_id: "match-1-8d54b7bb-f1d0-4620-9439-6299d9cb4897",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 1,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction1: {
//                         score: 0,
//                     },
//                     faction2: {
//                         score: 1,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-8d54b7bb-f1d0-4620-9439-6299d9cb4897",
//     },
//     {
//         match_id: "1-ade204e1-a89f-4f41-be62-ae3c1792080c",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "ed2c71c5-0ec3-4ada-a9f5-5f555efdaf9e",
//                 leader: "0b9ca294-fe7c-4808-a25c-ee0ffac8f25c",
//                 avatar: "https://distribution.faceit-cdn.net/images/a5eb6b4f-dd54-4517-8c07-732fc36f3b8b.jpeg",
//                 roster: [
//                     {
//                         player_id: "0b9ca294-fe7c-4808-a25c-ee0ffac8f25c",
//                         nickname: "Ridge",
//                         avatar: "https://distribution.faceit-cdn.net/images/5544b027-5454-4367-9fd6-dd3846ed7dd8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197996934983",
//                         game_player_name: "Ridge",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9f3c126b-1714-4c1b-8585-8bc47db4d5c8",
//                         nickname: "raven",
//                         avatar: "https://distribution.faceit-cdn.net/images/5ab7784a-a9f6-4e01-bfa0-6d6701106395.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198197875274",
//                         game_player_name: "raven",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "dd8d87e4-496c-43a7-bcf3-43f12e001e63",
//                         nickname: "Serendipity",
//                         avatar: "https://distribution.faceit-cdn.net/images/9cfa41a6-bd8a-4c5b-aa32-c872a64475d8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198062706062",
//                         game_player_name: "serendipity",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5e5550a9-034b-4b96-bd7a-8086f836454c",
//                         nickname: "Fawx",
//                         avatar: "https://distribution.faceit-cdn.net/images/d363cf39-843c-4750-b522-f57157020e7b.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198001782167",
//                         game_player_name: "Fawx ♥",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "54b178e7-5dc3-4170-9fc2-2f83e78dcd23",
//                         nickname: "Stx",
//                         avatar: "https://assets.faceit-cdn.net/avatars/54b178e7-5dc3-4170-9fc2-2f83e78dcd23_1564784510990.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198079420802",
//                         game_player_name: "Stx",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "SN Comets",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "46e6a1e1-6dd2-4fc7-a496-3fa2cd0f4c0a",
//                 leader: "a36af305-a28e-4486-9714-4d39a89d3a46",
//                 avatar: "https://distribution.faceit-cdn.net/images/231fd063-79f5-4e07-830c-d22305c3e7ef.jpeg",
//                 roster: [
//                     {
//                         player_id: "a36af305-a28e-4486-9714-4d39a89d3a46",
//                         nickname: "ilssuN",
//                         avatar: "https://distribution.faceit-cdn.net/images/231fd063-79f5-4e07-830c-d22305c3e7ef.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198366719875",
//                         game_player_name: "Debrsi2k",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ca958026-d529-42ad-b9b7-4d50dca1b7e8",
//                         nickname: "false",
//                         avatar: "https://distribution.faceit-cdn.net/images/2366e9c2-3fd3-43a9-b9ec-0beca86bda17.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198116139033",
//                         game_player_name: "false",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "3f73761a-6f93-46e4-a944-94be58dc1bd3",
//                         nickname: "chroma",
//                         avatar: "https://distribution.faceit-cdn.net/images/cd286848-0e2b-4d4e-8b16-0ecefb68645f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198875847072",
//                         game_player_name: "chrommaa",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9fe61c59-ccc2-45da-bd75-64032077bade",
//                         nickname: "unholy",
//                         avatar: "https://distribution.faceit-cdn.net/images/ae1e54b1-1106-471d-9250-ef7490c73045.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198264699326",
//                         game_player_name: "eg",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "faea4e59-670b-4663-960d-2bb2734c552d",
//                         nickname: "BustAnutt",
//                         avatar: "https://distribution.faceit-cdn.net/images/ccc80793-0d50-4873-84db-af341b21a9e8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198262556572",
//                         game_player_name: "BustAnut",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Demolition",
//                 type: "premade",
//             },
//         },
//         voting: {
//             location: {
//                 entities: [
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                     {
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                     },
//                     {
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                     },
//                 ],
//                 pick: ["de_anubis", "de_dust2", "de_nuke"],
//             },
//             voted_entity_types: ["location", "map"],
//         },
//         calculate_elo: false,
//         scheduled_at: 1743382800,
//         configured_at: 1743386079,
//         started_at: 1743386552,
//         finished_at: 1743389316,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-ade204e1-a89f-4f41-be62-ae3c1792080c-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-ade204e1-a89f-4f41-be62-ae3c1792080c-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-ade204e1-a89f-4f41-be62-ae3c1792080c",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction2: 0,
//                 faction1: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-ade204e1-a89f-4f41-be62-ae3c1792080c",
//     },
//     {
//         match_id: "1-26b51923-b11f-40d9-9a1f-311f5b4be2f2",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "e2d530ae-2ce6-491c-9213-0edf2027f802",
//                 leader: "6d88d2ac-7b06-4b1a-9e28-a0187be60ea6",
//                 avatar: "https://distribution.faceit-cdn.net/images/b84682ca-ec6b-4a2f-aeb1-d3b83d29d50a.jpeg",
//                 roster: [
//                     {
//                         player_id: "6d88d2ac-7b06-4b1a-9e28-a0187be60ea6",
//                         nickname: "nova_iwl",
//                         avatar: "https://distribution.faceit-cdn.net/images/b84682ca-ec6b-4a2f-aeb1-d3b83d29d50a.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198085546543",
//                         game_player_name: "Nova",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "36af3b60-8d06-496f-ac8f-cc0d3fa9511b",
//                         nickname: "Jaid",
//                         avatar: "https://distribution.faceit-cdn.net/images/091d740b-b6e0-4fdb-a280-daa7a6416e08.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198102249566",
//                         game_player_name: "POWNAGE",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5aee7aeb-dbb0-4fe4-a7d0-95f0eb970dd8",
//                         nickname: "Owen",
//                         avatar: "",
//                         membership: "premium",
//                         game_player_id: "76561198251208570",
//                         game_player_name: "Owen sinseriously cs.money",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "81c6614e-82b5-4f04-93f4-6dbc987cb013",
//                         nickname: "t0pshadow",
//                         avatar: "https://distribution.faceit-cdn.net/images/b710d085-9a3f-4153-a9d2-7486f1522fa8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198842482263",
//                         game_player_name: "topshadow",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "104a4fa2-14ef-4312-9a9e-94838633e5f4",
//                         nickname: "prospekt-",
//                         avatar: "https://distribution.faceit-cdn.net/images/1cafa519-3711-4698-89f8-2a99a8a30129.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198248410766",
//                         game_player_name: "prospektion",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Sleepless_Gaming",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "4b38c439-0900-43de-a4ff-4962efaac86e",
//                 leader: "74bdd049-3194-458f-90a0-860e5c395b29",
//                 avatar: "https://distribution.faceit-cdn.net/images/b23d2a20-703e-46b8-9167-a15a14d9205e.jpeg",
//                 roster: [
//                     {
//                         player_id: "74bdd049-3194-458f-90a0-860e5c395b29",
//                         nickname: "K1NG-",
//                         avatar: "https://distribution.faceit-cdn.net/images/e973a7cf-4d5d-4e76-8cc4-90188e0102c9.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198092646839",
//                         game_player_name: "✪ Pepo King",
//                         game_skill_level: 9,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "7e437800-0543-4776-8cfd-4749d0f7f59c",
//                         nickname: "_bIitz",
//                         avatar: "https://distribution.faceit-cdn.net/images/a31a1469-f63b-4b90-b70d-9fce04757b8e.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198388972096",
//                         game_player_name: "blitz",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b69419bc-616f-43b4-94f2-3c15f602b1a2",
//                         nickname: "_C4M_",
//                         avatar: "https://assets.faceit-cdn.net/avatars/b69419bc-616f-43b4-94f2-3c15f602b1a2_1550791713708.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198208996367",
//                         game_player_name: "_C4M_",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b757eeaf-0ab8-40c9-b9fc-6a491541842c",
//                         nickname: "MatrixPw",
//                         avatar: "https://distribution.faceit-cdn.net/images/100cd767-d900-454a-9c98-8a9b5832e09b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198874188050",
//                         game_player_name: "mpw",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "de3d0b00-bdbb-4a35-8557-bfc094891b0b",
//                         nickname: "BaII",
//                         avatar: "https://distribution.faceit-cdn.net/images/806819ab-b87b-45b8-be0c-463af63129af.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198183876587",
//                         game_player_name: "Ball",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Tsunami Rising",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743127200,
//         configured_at: 1743134457,
//         started_at: 1743134619,
//         finished_at: 1743137001,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-26b51923-b11f-40d9-9a1f-311f5b4be2f2-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-26b51923-b11f-40d9-9a1f-311f5b4be2f2-2-2.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-26b51923-b11f-40d9-9a1f-311f5b4be2f2-3-3.dem.gz",
//         ],
//         chat_room_id: "match-1-26b51923-b11f-40d9-9a1f-311f5b4be2f2",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction2: 1,
//                 faction1: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction1: {
//                         score: 0,
//                     },
//                     faction2: {
//                         score: 1,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-26b51923-b11f-40d9-9a1f-311f5b4be2f2",
//     },
//     {
//         match_id: "1-2b461029-0457-4c7c-b4e2-e982e08c9e38",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "35eebad9-3a5f-4a70-867c-287bd09d4d23",
//                 leader: "d9f447b4-151b-4ca7-8d4c-1e41deb3db08",
//                 avatar: "https://distribution.faceit-cdn.net/images/89c54a99-4e40-40ca-852e-cfc40a5e75ae.jpeg",
//                 roster: [
//                     {
//                         player_id: "d9f447b4-151b-4ca7-8d4c-1e41deb3db08",
//                         nickname: "Jachro",
//                         avatar: "https://distribution.faceit-cdn.net/images/57672e99-a400-4914-b480-e3996070b16a.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198089558794",
//                         game_player_name: "Jachro",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "de81f94f-fd21-4b68-b912-7b7ea52a63b9",
//                         nickname: "--toasty",
//                         avatar: "https://assets.faceit-cdn.net/avatars/de81f94f-fd21-4b68-b912-7b7ea52a63b9_1588005482316.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198039591422",
//                         game_player_name: "-.-",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f682901b-236e-4251-893f-48b8e22226a2",
//                         nickname: "brawckzz",
//                         avatar: "https://distribution.faceit-cdn.net/images/bd1cf18c-9437-499c-860a-8088dda88d1d.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198287531107",
//                         game_player_name: "brawckzz",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9a2f5122-350d-4472-b13c-197d7aa23294",
//                         nickname: "P3nnyCS",
//                         avatar: "https://distribution.faceit-cdn.net/images/0a5ddfb0-ee59-4072-90f1-b94ba9558eaa.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198072585465",
//                         game_player_name: "P3nny",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6a241fa7-6d5a-49ed-8a41-77a50d2819e7",
//                         nickname: "madss",
//                         avatar: "https://distribution.faceit-cdn.net/images/82510e7d-5a9e-413e-98ca-67888ec90aab.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198174431453",
//                         game_player_name: "madss",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Revel",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "0be1d0a8-52c8-40f1-a178-211afa4f2151",
//                 leader: "1f049ab3-806a-43dc-b60b-78f9687f10b9",
//                 avatar: "https://distribution.faceit-cdn.net/images/f93dfd0f-4411-4efb-b0a7-fe3c39e5ae98.jpeg",
//                 roster: [
//                     {
//                         player_id: "1f049ab3-806a-43dc-b60b-78f9687f10b9",
//                         nickname: "dopplahs",
//                         avatar: "https://distribution.faceit-cdn.net/images/f93dfd0f-4411-4efb-b0a7-fe3c39e5ae98.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198149019007",
//                         game_player_name: "professional sex haver",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "64153391-15e5-4886-b96d-7a3fbc9c6066",
//                         nickname: "jsp",
//                         avatar: "https://distribution.faceit-cdn.net/images/6ad907f7-a4fb-4957-8bf7-5c51231993b0.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198172880971",
//                         game_player_name: "jsp",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "3cc00843-1290-4ad3-88ee-1e9e2b67521d",
//                         nickname: "stormie",
//                         avatar: "https://distribution.faceit-cdn.net/images/d50ba705-f4bb-4e62-9614-1bbdb97f6778.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198288821008",
//                         game_player_name: "noob",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "09fe66c1-f408-471f-9502-f94611f46213",
//                         nickname: "Orb1t-CS",
//                         avatar: "https://distribution.faceit-cdn.net/images/4f0b4f4f-d7de-4b4a-928e-ecb2b157e4d6.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198189880031",
//                         game_player_name: "Orb1t",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ae2c7be5-36e4-414a-a4ba-e9324ce7d3a9",
//                         nickname: "JAM",
//                         avatar: "https://distribution.faceit-cdn.net/images/5879febf-a42a-4947-adcd-1797761f7e61.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198157693983",
//                         game_player_name: "JAM",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Lycus",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743121800,
//         configured_at: 1743127904,
//         started_at: 1743128098,
//         finished_at: 1743129827,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-2b461029-0457-4c7c-b4e2-e982e08c9e38-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-2b461029-0457-4c7c-b4e2-e982e08c9e38-2-5.dem.gz",
//         ],
//         chat_room_id: "match-1-2b461029-0457-4c7c-b4e2-e982e08c9e38",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction2: 2,
//                 faction1: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-2b461029-0457-4c7c-b4e2-e982e08c9e38",
//     },
//     {
//         match_id: "1-a5aa8245-bef5-447c-969a-00b05693dc75",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "0d34139e-b056-4056-8ddc-798200722046",
//                 leader: "b9556255-f711-48af-9fa3-981d864f01f7",
//                 avatar: "https://distribution.faceit-cdn.net/images/64f7b971-7fcd-4cb8-a7cd-7fcf5c21f77a.jpeg",
//                 roster: [
//                     {
//                         player_id: "b9556255-f711-48af-9fa3-981d864f01f7",
//                         nickname: "FRIZZY",
//                         avatar: "https://distribution.faceit-cdn.net/images/6a8c6a03-2650-4b57-b464-29dd374b6e53.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561197982819923",
//                         game_player_name: "FRIZZY",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "101fec20-c366-4946-8c59-d0d83f592c66",
//                         nickname: "taggy",
//                         avatar: "https://distribution.faceit-cdn.net/images/ea8c33f1-f6e8-4526-a4e0-f6a9112f5c3b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198344066364",
//                         game_player_name: "taggy",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "938411e0-f3d2-4ae7-9f59-f84de05d2b04",
//                         nickname: "BAGEL",
//                         avatar: "https://distribution.faceit-cdn.net/images/5076ec7a-cac6-4738-a28c-722af3395c53.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198315699479",
//                         game_player_name: "BAGEL",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8341c3e9-6a39-4fa7-9afa-502ee1e80a43",
//                         nickname: "BiNoX",
//                         avatar: "https://distribution.faceit-cdn.net/images/e2131be8-d059-40b7-82aa-b3c7321e6728.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198804652588",
//                         game_player_name: "BiNoX",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "473cf57e-c858-4c91-83b4-1aa07bd89b0b",
//                         nickname: "LittleBEER",
//                         avatar: "https://distribution.faceit-cdn.net/images/e570a02e-64bf-4766-85bf-ac3709880377.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197961136645",
//                         game_player_name: "LittleBEER",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Chicken Coop",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "d1178f81-f0dd-4ef1-914f-92cbaeba1e6b",
//                 leader: "ad04bba1-7bf7-4840-8f26-f841d874343c",
//                 avatar: "https://distribution.faceit-cdn.net/images/e28c101c-80d6-4fac-96d0-a2a7fe17585c.jpeg",
//                 roster: [
//                     {
//                         player_id: "ad04bba1-7bf7-4840-8f26-f841d874343c",
//                         nickname: "SolGoat",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ad04bba1-7bf7-4840-8f26-f841d874343c_1614818072062.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198076324571",
//                         game_player_name: "SolGoat",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e883b1f5-5895-4fbe-b766-7e48d3f5715a",
//                         nickname: "Equalizer",
//                         avatar: "https://distribution.faceit-cdn.net/images/b35c782f-5529-4a01-8cb5-4b7a717a4366.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198138606223",
//                         game_player_name: "denz",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "483540a8-540a-40cf-b7fd-cd5ce2b5f08d",
//                         nickname: "AtomiK",
//                         avatar: "https://assets.faceit-cdn.net/avatars/483540a8-540a-40cf-b7fd-cd5ce2b5f08d_1623345958235.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198048174130",
//                         game_player_name: "AtomiK",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e7aa2313-f911-41f5-9508-ffac9964e6c1",
//                         nickname: "-MJB",
//                         avatar: "https://distribution.faceit-cdn.net/images/ba824d33-a4bb-4ed7-92b7-f73439496f3a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198211483115",
//                         game_player_name: "BJM",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b4dcdff2-b72a-4e34-8766-35ef7c185ae4",
//                         nickname: "Pr0misee",
//                         avatar: "https://distribution.faceit-cdn.net/images/a7898ec4-6fb3-4f66-8d1e-bedc30fa1a3c.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198069162751",
//                         game_player_name: "Pr0mise | SSJ God",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Aether",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                     {
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                     },
//                     {
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                     },
//                     {
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                     },
//                     {
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                     },
//                     {
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                     },
//                     {
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                     },
//                     {
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                     },
//                     {
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                     },
//                 ],
//                 pick: ["de_train", "de_nuke", "de_inferno"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743278400,
//         configured_at: 1743281566,
//         started_at: 1743282045,
//         finished_at: 1743286521,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-a5aa8245-bef5-447c-969a-00b05693dc75-1-2.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-a5aa8245-bef5-447c-969a-00b05693dc75-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-a5aa8245-bef5-447c-969a-00b05693dc75",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-a5aa8245-bef5-447c-969a-00b05693dc75",
//     },
//     {
//         match_id: "1-7b24d31f-7785-4da4-8c49-a61ec89555a3",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "932eb89c-1db6-4529-9b9d-ff920477081d",
//                 leader: "a82fb9f2-a7cd-42b1-b7c3-1ed8e21ae78a",
//                 avatar: "https://distribution.faceit-cdn.net/images/8d850577-772a-4965-a5a1-6e98a544a163.jpeg",
//                 roster: [
//                     {
//                         player_id: "a82fb9f2-a7cd-42b1-b7c3-1ed8e21ae78a",
//                         nickname: "sveetea",
//                         avatar: "https://distribution.faceit-cdn.net/images/04fac171-d84d-4a1c-999e-5a270f59bf68.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198031153660",
//                         game_player_name: "mac",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cbff9326-7403-420c-8820-2ab3524e38d7",
//                         nickname: "omoo",
//                         avatar: "https://assets.faceit-cdn.net/avatars/cbff9326-7403-420c-8820-2ab3524e38d7_1576908812216.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198129662585",
//                         game_player_name: "omoo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f185cf7c-ac29-48c1-98f3-5ae5dbf74e4f",
//                         nickname: "emblem",
//                         avatar: "https://assets.faceit-cdn.net/avatars/f185cf7c-ac29-48c1-98f3-5ae5dbf74e4f_1605776128837.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198262349134",
//                         game_player_name: "emblem",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8153acc4-fe7a-4caa-8feb-c6639b7303f7",
//                         nickname: "FlashET",
//                         avatar: "https://distribution.faceit-cdn.net/images/f774e356-8b56-4126-ad16-93dd2368b85e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198164978045",
//                         game_player_name: "76561198164978045",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5db9b4be-be77-458f-9a1d-9e49e53873ff",
//                         nickname: "Larryw1k",
//                         avatar: "https://assets.faceit-cdn.net/avatars/5db9b4be-be77-458f-9a1d-9e49e53873ff_1551225205576.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198807221293",
//                         game_player_name: "Larry5k",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Holly Molly",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "c500642a-479e-41f4-b75b-39784c6ecf0b",
//                 leader: "85b0498e-15f4-4641-9ad4-bf239b0d6534",
//                 avatar: "https://distribution.faceit-cdn.net/images/fcbf4679-41a4-43f4-a188-a3c2912f5b59.jpeg",
//                 roster: [
//                     {
//                         player_id: "85b0498e-15f4-4641-9ad4-bf239b0d6534",
//                         nickname: "zBanss",
//                         avatar: "https://distribution.faceit-cdn.net/images/6c6a7e3b-784e-4f2f-8b17-d6e6d17d2946.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198803881281",
//                         game_player_name: "Banss",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "50c8dbec-3c5e-4852-9bff-80464e504a41",
//                         nickname: "Angry-_-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/50c8dbec-3c5e-4852-9bff-80464e504a41_1578629852540.jpg",
//                         membership: "esea",
//                         game_player_id: "76561197987763842",
//                         game_player_name: "Angry Noob",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "97efd820-f2ec-4d2b-83d2-21b04e16db88",
//                         nickname: "LoneStarrr",
//                         avatar: "https://assets.faceit-cdn.net/avatars/97efd820-f2ec-4d2b-83d2-21b04e16db88_1570489716505.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198093357053",
//                         game_player_name: "LoneStarrr",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a2beb030-46fb-4842-9843-a153cb15666c",
//                         nickname: "Meechu",
//                         avatar: "https://assets.faceit-cdn.net/avatars/a2beb030-46fb-4842-9843-a153cb15666c_1550735038360.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198020611300",
//                         game_player_name: "Meechu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5040ebbf-0765-40de-bdec-bfedf94af0bd",
//                         nickname: "777RONIN",
//                         avatar: "https://distribution.faceit-cdn.net/images/7c3bebed-806f-44ba-8f89-6cc5e54867cf.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198089516124",
//                         game_player_name: "ronin",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Phase3",
//                 type: "premade",
//             },
//         },
//         voting: {
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                     },
//                     {
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                     },
//                     {
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                     },
//                     {
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_ancient", "de_nuke", "de_train"],
//             },
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Dallas"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743125400,
//         configured_at: 1743130687,
//         started_at: 1743131363,
//         finished_at: 1743134053,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-7b24d31f-7785-4da4-8c49-a61ec89555a3-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-7b24d31f-7785-4da4-8c49-a61ec89555a3-2-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-7b24d31f-7785-4da4-8c49-a61ec89555a3-3-1.dem.gz",
//         ],
//         chat_room_id: "match-1-7b24d31f-7785-4da4-8c49-a61ec89555a3",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 1,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-7b24d31f-7785-4da4-8c49-a61ec89555a3",
//     },
//     {
//         match_id: "1-7a156613-06dd-4a88-866a-6b1c15c1401f",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "3523360c-7235-452a-b9d9-e587e97ba4b5",
//                 leader: "6d10dac4-b0cf-473d-b5a8-a34c53aefade",
//                 avatar: "https://distribution.faceit-cdn.net/images/d7c079aa-6395-4ad4-922c-2c0470bb350a.jpeg",
//                 roster: [
//                     {
//                         player_id: "6d10dac4-b0cf-473d-b5a8-a34c53aefade",
//                         nickname: "sasha",
//                         avatar: "https://distribution.faceit-cdn.net/images/39a79231-36c3-4066-b123-3860d55e1fb2.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198140847869",
//                         game_player_name: "sasha",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c7b709f5-281b-4133-859e-0d545c4c58d0",
//                         nickname: "Halen",
//                         avatar: "https://distribution.faceit-cdn.net/images/7677dc6f-f0e6-4c8d-8e5a-fa811adb2464.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198060497750",
//                         game_player_name: "Halen",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "01950e33-89f8-40f1-8839-db3771ddd136",
//                         nickname: "Zucar",
//                         avatar: "https://distribution.faceit-cdn.net/images/de55163d-77e6-451d-8ae1-3faed1cf15c0.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198119331267",
//                         game_player_name: "zucc",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "da7422ec-e62a-4df2-87fd-5f3c29f478b7",
//                         nickname: "1dvrk",
//                         avatar: "https://distribution.faceit-cdn.net/images/fa429887-8bb2-4ada-a876-1c5e46444b8f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198358249075",
//                         game_player_name: "Donnie Dvrko",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f10486e8-6197-4bbc-928d-5060e7be9657",
//                         nickname: "fuz3Nk0",
//                         avatar: "https://distribution.faceit-cdn.net/images/5ab3c395-9a62-4a3e-bdd1-4a3784bf7c63.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198929253202",
//                         game_player_name: ")",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "regain",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "a5b0e409-ec9e-4047-a159-3b3c3fffb2b4",
//                 leader: "ba33b925-72b6-4fd0-9030-e25dafaf3818",
//                 avatar: "https://distribution.faceit-cdn.net/images/38a1cea1-9253-40c8-9e46-c8fb962b795e.jpeg",
//                 roster: [
//                     {
//                         player_id: "ba33b925-72b6-4fd0-9030-e25dafaf3818",
//                         nickname: "SarkasM",
//                         avatar: "https://distribution.faceit-cdn.net/images/80bef79a-351b-4168-a21b-bff413ca95ae.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198346556982",
//                         game_player_name: "Sarky",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "50b9cc25-7391-46a6-86ae-3218eb34c373",
//                         nickname: "kicking",
//                         avatar: "https://distribution.faceit-cdn.net/images/48069b21-5385-4d09-9baf-90a4934d8033.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197982077686",
//                         game_player_name: "KiCk!nG",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bc5ff963-a18a-4de9-862e-b530389a383b",
//                         nickname: "-Jord-",
//                         avatar: "https://distribution.faceit-cdn.net/images/deb36e34-caf0-4c2f-a441-19d1295bf4de.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561199030894926",
//                         game_player_name: "MaitreSenpaiJR",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9d5f8db3-c8b8-48dc-a3e4-d38cbb3735d2",
//                         nickname: "CRN-",
//                         avatar: "https://distribution.faceit-cdn.net/images/e4dbe21d-0fdf-44fa-8acb-dad3b1ec3ddf.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143056078",
//                         game_player_name: "CRN",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "77f4b01a-f74e-4efd-8d25-e90a8ff0d5a2",
//                         nickname: "NaRo",
//                         avatar: "https://distribution.faceit-cdn.net/images/4a2aaa4d-dbbf-450f-b17f-2ac2f9e0f2f6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198243212278",
//                         game_player_name: "NaRo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Kooking Esports",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                     },
//                     {
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 pick: ["de_mirage", "de_inferno", "de_ancient"],
//                 entities: [
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                     },
//                     {
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                     },
//                     {
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                     },
//                     {
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                     },
//                 ],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743125400,
//         configured_at: 1743130093,
//         started_at: 1743130630,
//         finished_at: 1743133504,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-7a156613-06dd-4a88-866a-6b1c15c1401f-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-7a156613-06dd-4a88-866a-6b1c15c1401f-2-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-7a156613-06dd-4a88-866a-6b1c15c1401f-3-1.dem.gz",
//         ],
//         chat_room_id: "match-1-7a156613-06dd-4a88-866a-6b1c15c1401f",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction2: 1,
//                 faction1: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-7a156613-06dd-4a88-866a-6b1c15c1401f",
//     },
//     {
//         match_id: "1-0176c1e3-55ad-442a-bf6b-77a416ec2e9e",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction2: {
//                 faction_id: "8a9c9fce-fcf3-404d-ac3b-42d750f875df",
//                 leader: "041949f0-a34f-4246-984c-a3ec0e275145",
//                 avatar: "https://distribution.faceit-cdn.net/images/0ddf693e-d922-4238-ac0f-a44a217e3141.jpeg",
//                 roster: [
//                     {
//                         player_id: "041949f0-a34f-4246-984c-a3ec0e275145",
//                         nickname: "b0nes",
//                         avatar: "https://distribution.faceit-cdn.net/images/53a06c89-a5f3-49d7-a0b6-ff39802ee520.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198083090482",
//                         game_player_name: "bones",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e10e672b-95ca-4882-88ef-c3615f23172c",
//                         nickname: "coley",
//                         avatar: "https://assets.faceit-cdn.net/avatars/e10e672b-95ca-4882-88ef-c3615f23172c_1551085798081.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198161909891",
//                         game_player_name: "coley",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9dc50b1f-0980-4c47-a983-c276d3b8b781",
//                         nickname: "-_AJ",
//                         avatar: "https://distribution.faceit-cdn.net/images/1ca9b904-6809-420f-9355-ad3262005e8f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198079695926",
//                         game_player_name: ".AJ",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e865b017-5152-4898-90d1-03f49937c648",
//                         nickname: "_Wilson_",
//                         avatar: "https://distribution.faceit-cdn.net/images/d133d022-3d3c-45f1-b881-27c21af46093.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198068704558",
//                         game_player_name: "Wilson",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ae4b6134-4a8e-4865-aa44-a2d46599d39a",
//                         nickname: "snufaffu",
//                         avatar: "https://distribution.faceit-cdn.net/images/767217b0-b517-473c-902f-a076d9b39793.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198127408500",
//                         game_player_name: "snufaffu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Amped eSports",
//                 type: "premade",
//             },
//             faction1: {
//                 faction_id: "ba165b6b-97b0-4f34-95fd-d5c188460aff",
//                 leader: "8b21b059-4ea2-4d0f-9f5e-61210c1728c4",
//                 avatar: "https://distribution.faceit-cdn.net/images/502e7208-9fcb-48ea-92cc-39d48d46de7a.jpeg",
//                 roster: [
//                     {
//                         player_id: "8b21b059-4ea2-4d0f-9f5e-61210c1728c4",
//                         nickname: "HUNCHO",
//                         avatar: "https://distribution.faceit-cdn.net/images/8b3f2d69-2746-4a02-b756-21a15b10665f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198202870314",
//                         game_player_name: "huncho",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a2bc4cea-40d1-4d62-9644-7873ca1d0530",
//                         nickname: "Crisp",
//                         avatar: "https://distribution.faceit-cdn.net/images/2c20a6d3-c6bc-4900-9212-9a245580759c.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198262416232",
//                         game_player_name: "Crisp",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bb191d97-1e23-4aac-87aa-2b43cdf39220",
//                         nickname: "SharpieeCS",
//                         avatar: "https://distribution.faceit-cdn.net/images/09fbe0db-9c1b-4212-a131-0cd10f1a1f73.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198236865240",
//                         game_player_name: "Simon",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "47e634f7-fadc-47b8-b6a6-12bf70ed599d",
//                         nickname: "2Panic",
//                         avatar: "https://distribution.faceit-cdn.net/images/12c820d1-692d-4b81-a41b-528aa61f1e3f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198026803455",
//                         game_player_name: "2Panic",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8894131d-293e-4d07-a68e-8726576f5cba",
//                         nickname: "REKMEISTERxD",
//                         avatar: "https://distribution.faceit-cdn.net/images/c8535f71-19c5-47f3-9d11-465e3a99f03a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198135139200",
//                         game_player_name: "REKMEISTER",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "TakeFlyte",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                     },
//                     {
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_ancient", "de_train", "de_anubis"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743125400,
//         configured_at: 1743129228,
//         started_at: 1743129820,
//         finished_at: 1743131909,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-0176c1e3-55ad-442a-bf6b-77a416ec2e9e-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-0176c1e3-55ad-442a-bf6b-77a416ec2e9e-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-0176c1e3-55ad-442a-bf6b-77a416ec2e9e",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction2: 2,
//                 faction1: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-0176c1e3-55ad-442a-bf6b-77a416ec2e9e",
//     },
//     {
//         match_id: "1-edc8e133-df07-442f-bfcf-dcf7cc1e8ff6",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "be7fde88-1e05-493a-9861-02a0a48e3bc0",
//                 leader: "25518de8-4f33-4b23-856f-cad03c72df0f",
//                 avatar: "https://distribution.faceit-cdn.net/images/c417aaf4-d6ac-4f5b-8fe6-d3a339cb8385.jpeg",
//                 roster: [
//                     {
//                         player_id: "25518de8-4f33-4b23-856f-cad03c72df0f",
//                         nickname: "looke",
//                         avatar: "https://distribution.faceit-cdn.net/images/5f9c6df0-d412-48ff-aa34-fe62a3cbd3fb.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198158186387",
//                         game_player_name: "looke",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bb23263e-b3d5-4c47-b523-4cd7ce19b4c9",
//                         nickname: "jr24racing",
//                         avatar: "https://assets.faceit-cdn.net/avatars/bb23263e-b3d5-4c47-b523-4cd7ce19b4c9_1550612506647.png",
//                         membership: "premium",
//                         game_player_id: "76561198063907749",
//                         game_player_name: "Jr24racing",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "58d47b80-bb57-4adf-9e25-a8d306239834",
//                         nickname: "Msaia-btw",
//                         avatar: "https://distribution.faceit-cdn.net/images/5c83e7e8-24ca-40cd-9e1b-ad3111ad60ae.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143458644",
//                         game_player_name: "Msaia",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "2ee3927f-69a4-4277-85f8-5914a6f07cf7",
//                         nickname: "KURI",
//                         avatar: "https://distribution.faceit-cdn.net/images/ac4c2413-342c-4278-8c02-84ea8f73a586.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198210861457",
//                         game_player_name: "KURIMAKOV",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a53eb25c-a4b6-4400-9b91-4cea9634bc4a",
//                         nickname: "1TOASTY",
//                         avatar: "https://distribution.faceit-cdn.net/images/0311d9d1-8ce0-4459-bdac-378931c33193.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198122470381",
//                         game_player_name: "TOASTY",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "NuTorious",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "861f3821-b495-4b34-a98d-b838b4346721",
//                 leader: "f597a556-d5b6-464e-b0c4-00268b083b9f",
//                 avatar: "https://distribution.faceit-cdn.net/images/d919cede-1c74-4dd5-897f-709587eaafbf.jpeg",
//                 roster: [
//                     {
//                         player_id: "f597a556-d5b6-464e-b0c4-00268b083b9f",
//                         nickname: "Zhenn13",
//                         avatar: "https://distribution.faceit-cdn.net/images/c18a3d27-d40f-4d38-8fe6-0a97f53cd087.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198882773852",
//                         game_player_name: "Zhenn",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cf83d1f3-0f3b-44bd-a782-259859582db6",
//                         nickname: "AEROj",
//                         avatar: "https://distribution.faceit-cdn.net/images/03b1253e-27a1-4369-948e-7da50b24e806.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199033710731",
//                         game_player_name: "absolute worst",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "84243c79-1128-43e4-9093-f330fa13f8e4",
//                         nickname: "Destro",
//                         avatar: "https://assets.faceit-cdn.net/avatars/84243c79-1128-43e4-9093-f330fa13f8e4_1565715965388.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198294768618",
//                         game_player_name: "Destro",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "13ef45a5-3a9d-47ac-987d-8c6319a94a9e",
//                         nickname: "-TeXaSs",
//                         avatar: "https://distribution.faceit-cdn.net/images/a97f49d1-1d25-4826-8c41-ef900bf93602.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198150012805",
//                         game_player_name: "texico",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ad7b2119-e0e4-4b51-acd8-fc1aad034629",
//                         nickname: "learsi",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ad7b2119-e0e4-4b51-acd8-fc1aad034629_1627939251518.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198193827359",
//                         game_player_name: "learsi",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "AntiEco Club v3",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                     {
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                     },
//                     {
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                     },
//                     {
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_dust2", "de_ancient", "de_anubis"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743473460,
//         configured_at: 1743473536,
//         started_at: 1743474086,
//         finished_at: 1743475858,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-edc8e133-df07-442f-bfcf-dcf7cc1e8ff6-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-edc8e133-df07-442f-bfcf-dcf7cc1e8ff6-2-2.dem.gz",
//         ],
//         chat_room_id: "match-1-edc8e133-df07-442f-bfcf-dcf7cc1e8ff6",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-edc8e133-df07-442f-bfcf-dcf7cc1e8ff6",
//     },
//     {
//         match_id: "1-c39e6873-6eb4-4139-ae9d-b26676b8f885",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "e50fc773-3573-4eaa-bedf-b552b71462a3",
//                 leader: "734aea96-9efe-40a8-b911-34de440e8417",
//                 avatar: "https://distribution.faceit-cdn.net/images/7ad61623-e052-464d-b5b2-6b84ddb83bf3.jpeg",
//                 roster: [
//                     {
//                         player_id: "734aea96-9efe-40a8-b911-34de440e8417",
//                         nickname: "arush",
//                         avatar: "https://distribution.faceit-cdn.net/images/531b44ee-51b7-4b08-afa3-228ca98332cd.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198074346701",
//                         game_player_name: "red bull guzzler",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c8d38855-b2f3-42c0-8be6-7a2d71ea2c3d",
//                         nickname: "704",
//                         avatar: "https://distribution.faceit-cdn.net/images/0c7524a2-b9e1-409c-b52e-3f392dfb84c0.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198173625570",
//                         game_player_name: "ezy",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d05df295-f2f2-4810-8edc-d90fc019a19e",
//                         nickname: "stattik",
//                         avatar: "https://distribution.faceit-cdn.net/images/28dfbd62-ea78-4c93-ae8b-6007ad7e2e7a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198264048367",
//                         game_player_name: "stattik",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5208b6a5-8bbd-4eec-befc-9d80be7fb329",
//                         nickname: "GoShadow",
//                         avatar: "https://distribution.faceit-cdn.net/images/56c5f52c-cbf7-4853-aff3-b2081ba7c55e.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198131721075",
//                         game_player_name: "Shadow",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ab94f8f2-5736-4c4d-a0ea-157568330b7d",
//                         nickname: "Heavier-God",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ab94f8f2-5736-4c4d-a0ea-157568330b7d_1613853751615.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198059820063",
//                         game_player_name: "☹ | AdamRS",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Vox Victorum",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "8057795f-fab5-49a1-b03c-6a33175a649a",
//                 leader: "7e7cc507-b154-4054-bcc5-346bec28817b",
//                 avatar: "https://distribution.faceit-cdn.net/images/6a85b6a5-343c-40c1-bd8f-614dfc09d0e2.jpeg",
//                 roster: [
//                     {
//                         player_id: "7e7cc507-b154-4054-bcc5-346bec28817b",
//                         nickname: "Kr0wbar",
//                         avatar: "https://distribution.faceit-cdn.net/images/502b4dc5-f31f-4710-a4fc-0563ac57d1fa.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198201095514",
//                         game_player_name: "Kr0wbar",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "2ecee9b3-0c0f-4419-9ff4-26122504292d",
//                         nickname: "cor_vo",
//                         avatar: "https://distribution.faceit-cdn.net/images/061ac1a0-f09a-44b6-80ea-59d2d969d0e9.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198124439398",
//                         game_player_name: "homeless pete",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6bdfb065-70c9-422c-b45c-596d4523f6af",
//                         nickname: "Dr_Nurse",
//                         avatar: "https://distribution.faceit-cdn.net/images/10d6283c-ca44-4f3f-9784-18fae61fbaa4.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198345773277",
//                         game_player_name: "Scoot",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "49591d82-a50d-410e-83e9-d1e1b993ab1d",
//                         nickname: "eutopia",
//                         avatar: "https://distribution.faceit-cdn.net/images/e5ccdbab-8310-4048-ae0b-7732674a3455.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198125462290",
//                         game_player_name: "eutopia",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "30524d41-e406-41b1-8d4e-738cccffd84b",
//                         nickname: "replacedcar",
//                         avatar: "https://distribution.faceit-cdn.net/images/994d4930-ce82-4b47-9953-81f6a1d21a88.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198194218126",
//                         game_player_name: "replacedcar",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "Wily Ninjas",
//                 type: "premade",
//             },
//         },
//         calculate_elo: false,
//         finished_at: 1743044287,
//         chat_room_id: "match-1-c39e6873-6eb4-4139-ae9d-b26676b8f885",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 13,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 13,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-c39e6873-6eb4-4139-ae9d-b26676b8f885",
//     },
//     {
//         match_id: "1-a7bab994-651f-4c23-b779-858184afdf53",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "98191dfb-e9ad-4cdd-9d9c-65ae70d31f99",
//                 leader: "f8ee6fb9-157c-4e9d-90dd-b210ed39b938",
//                 avatar: "https://distribution.faceit-cdn.net/images/b2a1fe5a-9633-4f91-9ca4-40bf348d0a4c.jpeg",
//                 roster: [
//                     {
//                         player_id: "f8ee6fb9-157c-4e9d-90dd-b210ed39b938",
//                         nickname: "celery",
//                         avatar: "https://distribution.faceit-cdn.net/images/161b70d2-10df-44b5-96ed-778266b41573.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198285605662",
//                         game_player_name: "celery",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b3f42547-2197-40e8-97aa-581c39db8bc8",
//                         nickname: "alwayslucky-",
//                         avatar: "https://distribution.faceit-cdn.net/images/a1ea645d-e0d9-415c-90fa-fa305189c0ea.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198106445453",
//                         game_player_name: "alwayslucky<3",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bd90c007-af71-42a8-b62c-219bf6a93b1f",
//                         nickname: "Beaniehut",
//                         avatar: "https://distribution.faceit-cdn.net/images/dd75659b-ef60-4de6-8de5-c9595c72d741.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198165697626",
//                         game_player_name: "Beaniehut",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "860fa219-2a87-46a2-8a84-52b0857c28a7",
//                         nickname: "enfohip",
//                         avatar: "https://distribution.faceit-cdn.net/images/76679439-3bfb-4ffd-bf64-fe62f8296728.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198051849337",
//                         game_player_name: "enfohip",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f8a344d4-0395-4157-8aba-47758ac7b52c",
//                         nickname: "kiss",
//                         avatar: "https://distribution.faceit-cdn.net/images/29eecd90-7e5b-4ead-9c98-5e4376e027f0.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199111773441",
//                         game_player_name: "< blank >",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "VireoPro",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "ffdd3318-2a66-415d-98a5-2c2906321a4a",
//                 leader: "fe0df12a-a844-412d-a87c-30ecc7c8f609",
//                 avatar: "https://distribution.faceit-cdn.net/images/b9e6a7fa-439f-4930-ac33-c67b97a02cac.jpeg",
//                 roster: [
//                     {
//                         player_id: "fe0df12a-a844-412d-a87c-30ecc7c8f609",
//                         nickname: "tkM-",
//                         avatar: "https://distribution.faceit-cdn.net/images/4d576d31-1bee-4439-a278-a0698184e3c5.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198085024155",
//                         game_player_name: "tkM^ ツ",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "fa23284c-ec01-4264-93dd-8ecbe3555c16",
//                         nickname: "1jaxen",
//                         avatar: "https://distribution.faceit-cdn.net/images/22bc3a70-849b-4b2e-830a-a1bcb71fd278.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198799201024",
//                         game_player_name: "Jaxen",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e207cb92-adc2-4319-b510-751f1fed58bf",
//                         nickname: "RealSnw",
//                         avatar: "https://distribution.faceit-cdn.net/images/12d1d6d6-07f2-4bd3-a9d7-a764a354a852.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198929043011",
//                         game_player_name: "Snw",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b591533f-a7a9-4d07-8c17-2dee96aabb70",
//                         nickname: "J4kenator",
//                         avatar: "https://distribution.faceit-cdn.net/images/cfb9db73-387a-4af0-a3ee-d66528a2bb6b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198088610124",
//                         game_player_name: "J4kenator",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ff20dd60-d8b5-44f2-a0c3-0c1a0b9ba1e6",
//                         nickname: "Justirack",
//                         avatar: "https://distribution.faceit-cdn.net/images/e7392872-d086-43a3-85c6-b6cfaeb4a7ed.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198127482054",
//                         game_player_name: "Justirack",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "freaky five",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                     },
//                     {
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                     },
//                     {
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                     },
//                     {
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                     },
//                     {
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                     },
//                     {
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                     },
//                 ],
//                 pick: ["de_train", "de_anubis", "de_mirage"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743123600,
//         configured_at: 1743125752,
//         started_at: 1743126078,
//         finished_at: 1743127839,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-a7bab994-651f-4c23-b779-858184afdf53-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-a7bab994-651f-4c23-b779-858184afdf53-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-a7bab994-651f-4c23-b779-858184afdf53",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-a7bab994-651f-4c23-b779-858184afdf53",
//     },
//     {
//         match_id: "1-e1651be2-0e45-4424-aa5d-ea4b7ab28af0",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "a4b1806e-9cd9-4ffb-95a6-ca0e7a26b6fb",
//                 leader: "0dcae56f-4a84-4c1d-84c3-b83cca9bfe27",
//                 avatar: "https://distribution.faceit-cdn.net/images/7b4eddcb-d0d4-4658-92da-0e7e4b9c71f1.jpeg",
//                 roster: [
//                     {
//                         player_id: "0dcae56f-4a84-4c1d-84c3-b83cca9bfe27",
//                         nickname: "jBREEEZY",
//                         avatar: "https://assets.faceit-cdn.net/avatars/0dcae56f-4a84-4c1d-84c3-b83cca9bfe27_1550845706365.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198201964492",
//                         game_player_name: "76561198201964492",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "2abbf5d5-ae35-40a1-bf6c-cf19c844168d",
//                         nickname: "duw",
//                         avatar: "https://assets.faceit-cdn.net/avatars/2abbf5d5-ae35-40a1-bf6c-cf19c844168d_1550686836060.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198154531560",
//                         game_player_name: "duw",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c5d76817-97cc-4d24-8d87-aa9259b78783",
//                         nickname: "absolut-",
//                         avatar: "https://assets.faceit-cdn.net/avatars/c5d76817-97cc-4d24-8d87-aa9259b78783_1550791984162.png",
//                         membership: "esea",
//                         game_player_id: "76561198205116051",
//                         game_player_name: "Absolute",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "aaba5bad-82a6-4444-ab6c-60e9fa3b0fc8",
//                         nickname: "hypek1ng-_-",
//                         avatar: "https://distribution.faceit-cdn.net/images/32adf89a-e4d6-4e84-9be6-7877987d0fc5.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198083756391",
//                         game_player_name: "shrimplord777",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "79380534-4eea-4452-a6e1-6867148e1642",
//                         nickname: "MSG",
//                         avatar: "https://distribution.faceit-cdn.net/images/8625b782-6838-4c64-9a78-dd35a9bb5343.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198042539410",
//                         game_player_name: "michael",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "drugs n pugs",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "8ea90e7c-ac3e-405d-b4b5-4cd1505b6349",
//                 leader: "c8a78ccc-5f0e-44e3-b8a1-b05624cebded",
//                 avatar: "https://distribution.faceit-cdn.net/images/d14ebfec-2fa3-4858-b5d3-079ebcde2ad2.jpeg",
//                 roster: [
//                     {
//                         player_id: "c8a78ccc-5f0e-44e3-b8a1-b05624cebded",
//                         nickname: "bem0z",
//                         avatar: "https://distribution.faceit-cdn.net/images/5f5f7c20-4719-46e4-b9df-6efc838ae6c6.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198737702407",
//                         game_player_name: "LOUD",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "66f09261-f183-48d8-baad-599ce580996f",
//                         nickname: "m0so",
//                         avatar: "https://distribution.faceit-cdn.net/images/fbae92e5-8af2-49c2-8c1e-bb1cfaf075de.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198143002318",
//                         game_player_name: "m0so^^",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "77f1467b-144b-41f9-a1ba-0851adede318",
//                         nickname: "MattJP",
//                         avatar: "https://distribution.faceit-cdn.net/images/d0e97322-85ed-4a42-8bd8-8a57064020ad.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198038329659",
//                         game_player_name: "Matt",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a51e8adb-b713-4624-9b7d-1e64629a6187",
//                         nickname: "Blurted",
//                         avatar: "https://assets.faceit-cdn.net/avatars/a51e8adb-b713-4624-9b7d-1e64629a6187_1621969138209.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198183705558",
//                         game_player_name: "blurted",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "0b75fc0e-b496-421c-b25d-0eb9fa6dd54c",
//                         nickname: "1Autumn",
//                         avatar: "https://distribution.faceit-cdn.net/images/4cb01974-73b1-4645-9cfb-45fb72735913.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198277368735",
//                         game_player_name: "1Autumn",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "the pug jug",
//                 type: "premade",
//             },
//         },
//         voting: {
//             map: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                     },
//                     {
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                     },
//                     {
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                     },
//                     {
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                     },
//                 ],
//                 pick: ["de_mirage", "de_anubis", "de_inferno"],
//             },
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                     },
//                     {
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                     },
//                     {
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743125400,
//         configured_at: 1743133647,
//         started_at: 1743134219,
//         finished_at: 1743137250,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-e1651be2-0e45-4424-aa5d-ea4b7ab28af0-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-e1651be2-0e45-4424-aa5d-ea4b7ab28af0-2-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-e1651be2-0e45-4424-aa5d-ea4b7ab28af0-3-1.dem.gz",
//         ],
//         chat_room_id: "match-1-e1651be2-0e45-4424-aa5d-ea4b7ab28af0",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 1,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-e1651be2-0e45-4424-aa5d-ea4b7ab28af0",
//     },
//     {
//         match_id: "1-60cc580e-53c1-4619-a84f-d6042ff3b082",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "32576607-8cae-4b2a-8792-a4af8ff6021b",
//                 leader: "daadb189-6a1c-4639-b82e-85e8ed8f10b3",
//                 avatar: "https://distribution.faceit-cdn.net/images/430b49e6-f557-4d43-a1ea-9dce815a07d3.jpeg",
//                 roster: [
//                     {
//                         player_id: "daadb189-6a1c-4639-b82e-85e8ed8f10b3",
//                         nickname: "taben",
//                         avatar: "https://distribution.faceit-cdn.net/images/ce8ca642-1055-49b9-b897-582c829e8a8e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198064555959",
//                         game_player_name: "taben",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "442b47ee-ad07-4dbb-ba2d-ae117d4ad21a",
//                         nickname: "Evancaw",
//                         avatar: "https://distribution.faceit-cdn.net/images/fd0361de-b058-42c4-a7d0-c69161113b9b.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198092381756",
//                         game_player_name: "Evan",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "835e0de9-1c68-4675-afe6-0fb0a967371f",
//                         nickname: "-Merl-",
//                         avatar: "https://distribution.faceit-cdn.net/images/1b70626e-1fd7-4e8c-8592-4fe0c9f86de3.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198242053918",
//                         game_player_name: "twitch.tv/merl_tv",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bdf138da-a287-490e-a7c8-1f655f454380",
//                         nickname: "lost666",
//                         avatar: "https://distribution.faceit-cdn.net/images/f71df303-773c-4af4-aba3-3f088bccadb7.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198832317290",
//                         game_player_name: "LAZY JERMAN",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "d358b159-38e7-4620-9f5e-70101a00eb5c",
//                         nickname: "-MagiiC",
//                         avatar: "https://distribution.faceit-cdn.net/images/44bcd158-acee-4b84-bf43-571fd089ae4e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198055958028",
//                         game_player_name: "^MagiC",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "LookingIVOrg",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "e71b58f3-2f0d-4f4e-a2ce-79e7b4847599",
//                 leader: "1eaf0c3b-b1e5-40d3-bf87-6c993c7b9648",
//                 avatar: "https://distribution.faceit-cdn.net/images/98711d00-5d4c-45cc-8f46-c1d3cd968d3f.jpeg",
//                 roster: [
//                     {
//                         player_id: "1eaf0c3b-b1e5-40d3-bf87-6c993c7b9648",
//                         nickname: "Talen",
//                         avatar: "https://distribution.faceit-cdn.net/images/d1d8b51b-b252-4d1d-b17b-d7a014972682.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054774651",
//                         game_player_name: "Talen",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "55dac018-93a9-4d73-adca-0aea7f6b80b7",
//                         nickname: "Arias",
//                         avatar: "https://assets.faceit-cdn.net/avatars/55dac018-93a9-4d73-adca-0aea7f6b80b7_1577236441548.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198161279781",
//                         game_player_name: "✪ Arias",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "4137ee42-971c-4874-8ec8-688dcc779aa3",
//                         nickname: "clipzera",
//                         avatar: "https://distribution.faceit-cdn.net/images/703e072a-8189-455e-ae75-97db5ebd68d7.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198859037781",
//                         game_player_name: "clipzera    𓆰 𓆪",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a4deda37-cddb-4424-801c-f83f82013a9a",
//                         nickname: "flow",
//                         avatar: "https://distribution.faceit-cdn.net/images/7ae107c9-c511-400d-83ca-d7890b9abba5.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198086662677",
//                         game_player_name: "flow",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "89f789b6-327d-4558-a583-deaf542ddce0",
//                         nickname: "mxxxsha",
//                         avatar: "https://distribution.faceit-cdn.net/images/14ae6b37-2428-45ca-9a31-bf1e9d7f78bf.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199373196281",
//                         game_player_name: "xx",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: false,
//                 name: "SUPER EVIL GANG",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                     },
//                     {
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                     },
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                     },
//                 ],
//                 pick: ["Dallas"],
//             },
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                     },
//                     {
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                     },
//                 ],
//                 pick: ["de_inferno", "de_dust2", "de_mirage"],
//             },
//         },
//         calculate_elo: false,
//         configured_at: 1743126127,
//         finished_at: 1743130423,
//         chat_room_id: "match-1-60cc580e-53c1-4619-a84f-d6042ff3b082",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction2: 2,
//                 faction1: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction1: {
//                         score: 0,
//                     },
//                     faction2: {
//                         score: 13,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction1: {
//                         score: 0,
//                     },
//                     faction2: {
//                         score: 13,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-60cc580e-53c1-4619-a84f-d6042ff3b082",
//     },
//     {
//         match_id: "1-0f335eef-31cb-4449-8963-86b54763dd25",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "4ce68d27-3155-424f-8868-14bb26b4b612",
//                 leader: "7fc130ea-2eba-47db-997d-baf2f17f5adc",
//                 avatar: "https://distribution.faceit-cdn.net/images/8fba3dc4-4fe5-4669-a820-6f2587404ca9.jpeg",
//                 roster: [
//                     {
//                         player_id: "7fc130ea-2eba-47db-997d-baf2f17f5adc",
//                         nickname: "mp9",
//                         avatar: "https://assets.faceit-cdn.net/avatars/7fc130ea-2eba-47db-997d-baf2f17f5adc_1614894195229.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198067835427",
//                         game_player_name: "fArt",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8da05ee7-3c1d-4a7c-80c5-306d08bf6cd4",
//                         nickname: "-Roo",
//                         avatar: "https://distribution.faceit-cdn.net/images/596f74c0-3dca-49bd-af4f-ec1ca1963668.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198196904981",
//                         game_player_name: "wyan",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "894be8b7-9184-4b73-957d-61f9f4886796",
//                         nickname: "--Chris",
//                         avatar: "https://distribution.faceit-cdn.net/images/83da0ff4-983e-4dc4-8749-570329aa7ec9.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198106604547",
//                         game_player_name: "dinner",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8d93ee2e-dc58-4d99-b9cd-fe8746f2925d",
//                         nickname: "bingus",
//                         avatar: "https://distribution.faceit-cdn.net/images/50e31170-067f-4831-a662-0c151a4de3ec.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561199033266459",
//                         game_player_name: "bingus",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bf377af7-cd56-42a4-a4b2-9c60be3c863e",
//                         nickname: "trad",
//                         avatar: "https://distribution.faceit-cdn.net/images/0971ad01-8bd2-407a-934f-715c64d964ca.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198087103158",
//                         game_player_name: "𝖙",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "SquadUp Esports",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "59e2b0ae-00fe-4d31-9563-ad985d50d145",
//                 leader: "3ee4681f-61a0-40a5-ba78-6f3bee9abecd",
//                 avatar: "https://distribution.faceit-cdn.net/images/c2cc1483-c88c-4bc1-959e-6f506b166533.jpeg",
//                 roster: [
//                     {
//                         player_id: "3ee4681f-61a0-40a5-ba78-6f3bee9abecd",
//                         nickname: "charmer",
//                         avatar: "https://distribution.faceit-cdn.net/images/f535fe70-cfca-4d96-a257-1d6825aab795.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198351224898",
//                         game_player_name: "charmer",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "21fe152e-4a93-45db-8cf4-d5e65577cbaf",
//                         nickname: "TakFuj1wara",
//                         avatar: "https://assets.faceit-cdn.net/avatars/21fe152e-4a93-45db-8cf4-d5e65577cbaf_1550577640333.jpg",
//                         membership: "esea",
//                         game_player_id: "76561197962018740",
//                         game_player_name: "Takumi",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c12740e9-3565-4125-93bd-2a4bed94aa7f",
//                         nickname: "bugsthebunny",
//                         avatar: "https://assets.faceit-cdn.net/avatars/c12740e9-3565-4125-93bd-2a4bed94aa7f_1550660399250.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198038314898",
//                         game_player_name: "bugsthebunny",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "71002576-9191-47c3-98c6-6e7a365f248d",
//                         nickname: "waxmyjUgs",
//                         avatar: "https://distribution.faceit-cdn.net/images/7ba5a020-53b8-44a4-991d-b501f80b91d8.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198131981238",
//                         game_player_name: "br0ck-",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "0e538767-03d8-4af6-bd7f-84a61bfe1658",
//                         nickname: "munchyNAPKIN",
//                         avatar: "https://assets.faceit-cdn.net/avatars/0e538767-03d8-4af6-bd7f-84a61bfe1658_1602810953269.jpg",
//                         membership: "free",
//                         game_player_id: "76561198083144999",
//                         game_player_name: "munchyNAPKINS",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Zero Bomb",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                     },
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                     },
//                     {
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                     },
//                     {
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                     },
//                     {
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_inferno", "de_anubis", "de_dust2"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743125400,
//         configured_at: 1743129089,
//         started_at: 1743129544,
//         finished_at: 1743131206,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-0f335eef-31cb-4449-8963-86b54763dd25-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-0f335eef-31cb-4449-8963-86b54763dd25-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-0f335eef-31cb-4449-8963-86b54763dd25",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction2: 0,
//                 faction1: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction2: {
//                         score: 0,
//                     },
//                     faction1: {
//                         score: 1,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 5,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-0f335eef-31cb-4449-8963-86b54763dd25",
//     },
//     {
//         match_id: "1-ca837974-ae42-4e0a-955b-98a10426be1f",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "be7fde88-1e05-493a-9861-02a0a48e3bc0",
//                 leader: "25518de8-4f33-4b23-856f-cad03c72df0f",
//                 avatar: "https://distribution.faceit-cdn.net/images/c417aaf4-d6ac-4f5b-8fe6-d3a339cb8385.jpeg",
//                 roster: [
//                     {
//                         player_id: "25518de8-4f33-4b23-856f-cad03c72df0f",
//                         nickname: "looke",
//                         avatar: "https://distribution.faceit-cdn.net/images/5f9c6df0-d412-48ff-aa34-fe62a3cbd3fb.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198158186387",
//                         game_player_name: "looke",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bb23263e-b3d5-4c47-b523-4cd7ce19b4c9",
//                         nickname: "jr24racing",
//                         avatar: "https://assets.faceit-cdn.net/avatars/bb23263e-b3d5-4c47-b523-4cd7ce19b4c9_1550612506647.png",
//                         membership: "premium",
//                         game_player_id: "76561198063907749",
//                         game_player_name: "Jr24racing",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "58d47b80-bb57-4adf-9e25-a8d306239834",
//                         nickname: "Msaia-btw",
//                         avatar: "https://distribution.faceit-cdn.net/images/5c83e7e8-24ca-40cd-9e1b-ad3111ad60ae.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143458644",
//                         game_player_name: "Msaia",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b94bfc8b-a3ea-4399-9a3c-df8530099e48",
//                         nickname: "Tyler69_",
//                         avatar: "https://distribution.faceit-cdn.net/images/a80ea8ef-9924-4454-ac1e-481b94a04bf9.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198164881261",
//                         game_player_name: "76561198164881261",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a53eb25c-a4b6-4400-9b91-4cea9634bc4a",
//                         nickname: "1TOASTY",
//                         avatar: "https://distribution.faceit-cdn.net/images/0311d9d1-8ce0-4459-bdac-378931c33193.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198122470381",
//                         game_player_name: "TOASTY",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "NuTorious",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "a66135fc-3aa1-4af9-97fb-8603902d2229",
//                 leader: "5c09d4aa-ccbc-42fa-b2fc-d1e8bd8929fd",
//                 avatar: "https://distribution.faceit-cdn.net/images/4a734824-000f-4bbb-a4bc-6114f85ff7c1.jpeg",
//                 roster: [
//                     {
//                         player_id: "5c09d4aa-ccbc-42fa-b2fc-d1e8bd8929fd",
//                         nickname: "gln",
//                         avatar: "https://distribution.faceit-cdn.net/images/ece0ce2d-45ba-4044-96e3-d59519d411bb.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197962113920",
//                         game_player_name: "038930938308",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "85d942ce-f00f-4a46-ae38-0942f5beb635",
//                         nickname: "roca",
//                         avatar: "https://distribution.faceit-cdn.net/images/1f92e037-48d2-4027-87bf-d1ce3f190c4c.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561197966107627",
//                         game_player_name: "roca",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b8a767cf-f901-46a7-8cc6-df7ce6532fb7",
//                         nickname: "S5J",
//                         avatar: "https://distribution.faceit-cdn.net/images/1e16b97e-48ba-4b9a-b933-d9f0d9d23eef.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198079508311",
//                         game_player_name: "S5J",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9c63efa1-7e26-4db9-aed6-77a031b40a93",
//                         nickname: "Dantes_Oni",
//                         avatar: "https://assets.faceit-cdn.net/avatars/9c63efa1-7e26-4db9-aed6-77a031b40a93_1620708740987.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198016155683",
//                         game_player_name: "Dante",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f690f304-df3f-4555-b8e5-e4e48a48a3f3",
//                         nickname: "Mexi",
//                         avatar: "https://assets.faceit-cdn.net/avatars/f690f304-df3f-4555-b8e5-e4e48a48a3f3_1560560718391.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198203255642",
//                         game_player_name: "Mexican",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "HoleSmokers",
//                 type: "premade",
//             },
//         },
//         voting: {
//             location: {
//                 entities: [
//                     {
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                     },
//                     {
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                     },
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                     },
//                 ],
//                 pick: ["Denver"],
//             },
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                     },
//                     {
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                     },
//                     {
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                     },
//                 ],
//                 pick: ["de_nuke", "de_train", "de_anubis"],
//             },
//             voted_entity_types: ["location", "map"],
//         },
//         calculate_elo: false,
//         scheduled_at: 1742952600,
//         configured_at: 1742955800,
//         started_at: 1742956414,
//         finished_at: 1742958352,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-ca837974-ae42-4e0a-955b-98a10426be1f-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-ca837974-ae42-4e0a-955b-98a10426be1f-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-ca837974-ae42-4e0a-955b-98a10426be1f",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction2: 2,
//                 faction1: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 4,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-ca837974-ae42-4e0a-955b-98a10426be1f",
//     },
//     {
//         match_id: "1-fb346021-fb4e-407e-8a28-a77e90af3375",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "98191dfb-e9ad-4cdd-9d9c-65ae70d31f99",
//                 leader: "f8ee6fb9-157c-4e9d-90dd-b210ed39b938",
//                 avatar: "https://distribution.faceit-cdn.net/images/b2a1fe5a-9633-4f91-9ca4-40bf348d0a4c.jpeg",
//                 roster: [
//                     {
//                         player_id: "f8ee6fb9-157c-4e9d-90dd-b210ed39b938",
//                         nickname: "celery",
//                         avatar: "https://distribution.faceit-cdn.net/images/161b70d2-10df-44b5-96ed-778266b41573.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198285605662",
//                         game_player_name: "celery",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "b3f42547-2197-40e8-97aa-581c39db8bc8",
//                         nickname: "alwayslucky-",
//                         avatar: "https://distribution.faceit-cdn.net/images/a1ea645d-e0d9-415c-90fa-fa305189c0ea.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198106445453",
//                         game_player_name: "alwayslucky<3",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bd90c007-af71-42a8-b62c-219bf6a93b1f",
//                         nickname: "Beaniehut",
//                         avatar: "https://distribution.faceit-cdn.net/images/dd75659b-ef60-4de6-8de5-c9595c72d741.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198165697626",
//                         game_player_name: "Beaniehut",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "860fa219-2a87-46a2-8a84-52b0857c28a7",
//                         nickname: "enfohip",
//                         avatar: "https://distribution.faceit-cdn.net/images/76679439-3bfb-4ffd-bf64-fe62f8296728.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198051849337",
//                         game_player_name: "enfohip",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f8a344d4-0395-4157-8aba-47758ac7b52c",
//                         nickname: "kiss",
//                         avatar: "https://distribution.faceit-cdn.net/images/29eecd90-7e5b-4ead-9c98-5e4376e027f0.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199111773441",
//                         game_player_name: "< blank >",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "VireoPro",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "861f3821-b495-4b34-a98d-b838b4346721",
//                 leader: "84243c79-1128-43e4-9093-f330fa13f8e4",
//                 avatar: "https://distribution.faceit-cdn.net/images/d919cede-1c74-4dd5-897f-709587eaafbf.jpeg",
//                 roster: [
//                     {
//                         player_id: "84243c79-1128-43e4-9093-f330fa13f8e4",
//                         nickname: "Destro",
//                         avatar: "https://assets.faceit-cdn.net/avatars/84243c79-1128-43e4-9093-f330fa13f8e4_1565715965388.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198294768618",
//                         game_player_name: "Destro",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cf83d1f3-0f3b-44bd-a782-259859582db6",
//                         nickname: "AEROj",
//                         avatar: "https://distribution.faceit-cdn.net/images/03b1253e-27a1-4369-948e-7da50b24e806.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199033710731",
//                         game_player_name: "absolute worst",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "c7c5453f-cb8b-4a38-a76d-736a4420d18d",
//                         nickname: "sleepz0rk",
//                         avatar: "https://distribution.faceit-cdn.net/images/820884e8-a7b7-4855-b528-cfdd84fcad40.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561199622988464",
//                         game_player_name: "poebisto``",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "13ef45a5-3a9d-47ac-987d-8c6319a94a9e",
//                         nickname: "-TeXaSs",
//                         avatar: "https://distribution.faceit-cdn.net/images/a97f49d1-1d25-4826-8c41-ef900bf93602.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198150012805",
//                         game_player_name: "texico",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ede63199-bd0e-493b-b915-5b084ff5cfe9",
//                         nickname: "Spectur-",
//                         avatar: "https://distribution.faceit-cdn.net/images/bc84ce7c-ba00-458e-807b-edf31661c6a7.jpeg",
//                         membership: "esea",
//                         game_player_id: "76561198196048570",
//                         game_player_name: "Specter",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "AntiEco Club v3",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                     },
//                     {
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                     },
//                     {
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                     },
//                     {
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                     },
//                     {
//                         game_map_id: "de_anubis",
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_anubis", "de_mirage", "de_dust2"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1742952600,
//         configured_at: 1742958063,
//         started_at: 1742958725,
//         finished_at: 1742960785,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-fb346021-fb4e-407e-8a28-a77e90af3375-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-fb346021-fb4e-407e-8a28-a77e90af3375-2-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-fb346021-fb4e-407e-8a28-a77e90af3375-3-1.dem.gz",
//         ],
//         chat_room_id: "match-1-fb346021-fb4e-407e-8a28-a77e90af3375",
//         best_of: 3,
//         results: {
//             winner: "faction2",
//             score: {
//                 faction1: 1,
//                 faction2: 2,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 4,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-fb346021-fb4e-407e-8a28-a77e90af3375",
//     },
//     {
//         match_id: "1-a773686d-bf2f-4e19-90ee-5fe513a716ec",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "ba165b6b-97b0-4f34-95fd-d5c188460aff",
//                 leader: "8b21b059-4ea2-4d0f-9f5e-61210c1728c4",
//                 avatar: "https://distribution.faceit-cdn.net/images/502e7208-9fcb-48ea-92cc-39d48d46de7a.jpeg",
//                 roster: [
//                     {
//                         player_id: "8b21b059-4ea2-4d0f-9f5e-61210c1728c4",
//                         nickname: "HUNCHO",
//                         avatar: "https://distribution.faceit-cdn.net/images/8b3f2d69-2746-4a02-b756-21a15b10665f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198202870314",
//                         game_player_name: "huncho",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "a2bc4cea-40d1-4d62-9644-7873ca1d0530",
//                         nickname: "Crisp",
//                         avatar: "https://distribution.faceit-cdn.net/images/2c20a6d3-c6bc-4900-9212-9a245580759c.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198262416232",
//                         game_player_name: "Crisp",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "bb191d97-1e23-4aac-87aa-2b43cdf39220",
//                         nickname: "SharpieeCS",
//                         avatar: "https://distribution.faceit-cdn.net/images/09fbe0db-9c1b-4212-a131-0cd10f1a1f73.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198236865240",
//                         game_player_name: "Simon",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "47e634f7-fadc-47b8-b6a6-12bf70ed599d",
//                         nickname: "2Panic",
//                         avatar: "https://distribution.faceit-cdn.net/images/12c820d1-692d-4b81-a41b-528aa61f1e3f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198026803455",
//                         game_player_name: "2Panic",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8894131d-293e-4d07-a68e-8726576f5cba",
//                         nickname: "REKMEISTERxD",
//                         avatar: "https://distribution.faceit-cdn.net/images/c8535f71-19c5-47f3-9d11-465e3a99f03a.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198135139200",
//                         game_player_name: "REKMEISTER",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "TakeFlyte",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "932eb89c-1db6-4529-9b9d-ff920477081d",
//                 leader: "a82fb9f2-a7cd-42b1-b7c3-1ed8e21ae78a",
//                 avatar: "https://distribution.faceit-cdn.net/images/8d850577-772a-4965-a5a1-6e98a544a163.jpeg",
//                 roster: [
//                     {
//                         player_id: "a82fb9f2-a7cd-42b1-b7c3-1ed8e21ae78a",
//                         nickname: "sveetea",
//                         avatar: "https://distribution.faceit-cdn.net/images/04fac171-d84d-4a1c-999e-5a270f59bf68.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198031153660",
//                         game_player_name: "mac",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "cbff9326-7403-420c-8820-2ab3524e38d7",
//                         nickname: "omoo",
//                         avatar: "https://assets.faceit-cdn.net/avatars/cbff9326-7403-420c-8820-2ab3524e38d7_1576908812216.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198129662585",
//                         game_player_name: "omoo",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "f185cf7c-ac29-48c1-98f3-5ae5dbf74e4f",
//                         nickname: "emblem",
//                         avatar: "https://assets.faceit-cdn.net/avatars/f185cf7c-ac29-48c1-98f3-5ae5dbf74e4f_1605776128837.jpg",
//                         membership: "esea",
//                         game_player_id: "76561198262349134",
//                         game_player_name: "emblem",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "8153acc4-fe7a-4caa-8feb-c6639b7303f7",
//                         nickname: "FlashET",
//                         avatar: "https://distribution.faceit-cdn.net/images/f774e356-8b56-4126-ad16-93dd2368b85e.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198164978045",
//                         game_player_name: "76561198164978045",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "5db9b4be-be77-458f-9a1d-9e49e53873ff",
//                         nickname: "Larryw1k",
//                         avatar: "https://assets.faceit-cdn.net/avatars/5db9b4be-be77-458f-9a1d-9e49e53873ff_1551225205576.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198807221293",
//                         game_player_name: "Larry5k",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Holly Molly",
//                 type: "premade",
//             },
//         },
//         voting: {
//             voted_entity_types: ["location", "map"],
//             location: {
//                 entities: [
//                     {
//                         guid: "Chicago",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                     },
//                     {
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                         class_name: "Denver",
//                     },
//                     {
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                         class_name: "Dallas",
//                     },
//                 ],
//                 pick: ["Dallas"],
//             },
//             map: {
//                 entities: [
//                     {
//                         guid: "de_dust2",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                     },
//                     {
//                         name: "Mirage",
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                     },
//                     {
//                         guid: "de_nuke",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                     },
//                     {
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                     },
//                     {
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                     },
//                     {
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_ancient", "de_anubis", "de_train"],
//             },
//         },
//         calculate_elo: false,
//         scheduled_at: 1743039000,
//         configured_at: 1743041434,
//         started_at: 1743042136,
//         finished_at: 1743043487,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-a773686d-bf2f-4e19-90ee-5fe513a716ec-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-a773686d-bf2f-4e19-90ee-5fe513a716ec-2-1.dem.gz",
//         ],
//         chat_room_id: "match-1-a773686d-bf2f-4e19-90ee-5fe513a716ec",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 0,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 4,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-a773686d-bf2f-4e19-90ee-5fe513a716ec",
//     },
//     {
//         match_id: "1-fedd2ba1-26ce-4440-a776-a53c54053dd8",
//         version: 2,
//         game: "cs2",
//         region: "NA",
//         competition_id: "348fab73-dfa1-4992-8ed2-b1b0ad2db171",
//         competition_type: "championship",
//         competition_name: "Off Season Shenanigans Season 7",
//         organizer_id: "7cd35f34-806c-4e26-9670-44f61c41d66a",
//         teams: {
//             faction1: {
//                 faction_id: "8a9c9fce-fcf3-404d-ac3b-42d750f875df",
//                 leader: "041949f0-a34f-4246-984c-a3ec0e275145",
//                 avatar: "https://distribution.faceit-cdn.net/images/0ddf693e-d922-4238-ac0f-a44a217e3141.jpeg",
//                 roster: [
//                     {
//                         player_id: "041949f0-a34f-4246-984c-a3ec0e275145",
//                         nickname: "b0nes",
//                         avatar: "https://distribution.faceit-cdn.net/images/53a06c89-a5f3-49d7-a0b6-ff39802ee520.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198083090482",
//                         game_player_name: "bones",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e10e672b-95ca-4882-88ef-c3615f23172c",
//                         nickname: "coley",
//                         avatar: "https://assets.faceit-cdn.net/avatars/e10e672b-95ca-4882-88ef-c3615f23172c_1551085798081.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198161909891",
//                         game_player_name: "coley",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "9dc50b1f-0980-4c47-a983-c276d3b8b781",
//                         nickname: "-_AJ",
//                         avatar: "https://distribution.faceit-cdn.net/images/1ca9b904-6809-420f-9355-ad3262005e8f.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198079695926",
//                         game_player_name: ".AJ",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "e865b017-5152-4898-90d1-03f49937c648",
//                         nickname: "_Wilson_",
//                         avatar: "https://distribution.faceit-cdn.net/images/d133d022-3d3c-45f1-b881-27c21af46093.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198068704558",
//                         game_player_name: "Wilson",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "ae4b6134-4a8e-4865-aa44-a2d46599d39a",
//                         nickname: "snufaffu",
//                         avatar: "https://distribution.faceit-cdn.net/images/767217b0-b517-473c-902f-a076d9b39793.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198127408500",
//                         game_player_name: "snufaffu",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "Amped eSports",
//                 type: "premade",
//             },
//             faction2: {
//                 faction_id: "0d1c2b67-d0b0-4ba5-94a5-935aea34affc",
//                 leader: "ff704bfb-9533-4047-9a4a-a71886397070",
//                 avatar: "https://distribution.faceit-cdn.net/images/47145329-93a6-4b01-b692-48e17e30f200.jpeg",
//                 roster: [
//                     {
//                         player_id: "ff704bfb-9533-4047-9a4a-a71886397070",
//                         nickname: "Tr1ck",
//                         avatar: "https://assets.faceit-cdn.net/avatars/ff704bfb-9533-4047-9a4a-a71886397070_1551134874059.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198138033226",
//                         game_player_name: "Trick",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "6db40a58-e65e-4907-82a2-7ec364999be1",
//                         nickname: "Go0dby3",
//                         avatar: "https://assets.faceit-cdn.net/avatars/6db40a58-e65e-4907-82a2-7ec364999be1_1550858524552.jpg",
//                         membership: "premium",
//                         game_player_id: "76561198096532399",
//                         game_player_name: "Goodbye",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "581d92b9-8310-4a29-81de-6b4057e8a6ed",
//                         nickname: "Signal",
//                         avatar: "https://distribution.faceit-cdn.net/images/a48cbaf2-af59-47b9-a0ae-5daec97cad61.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054121335",
//                         game_player_name: "Signal",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "96acce04-abc2-4721-809f-66957f17325a",
//                         nickname: "Gibbyatl",
//                         avatar: "https://distribution.faceit-cdn.net/images/7f97de77-595e-4d68-baeb-18113f93d168.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198143856840",
//                         game_player_name: "Gibby_ATL",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                     {
//                         player_id: "470d26d1-5f5c-4403-96ed-67c0b1ac3553",
//                         nickname: "dirtydan",
//                         avatar: "https://distribution.faceit-cdn.net/images/f6cc863a-5b9d-4ba3-92a3-3556c54f3642.jpeg",
//                         membership: "premium",
//                         game_player_id: "76561198054776069",
//                         game_player_name: "DirtyDan_",
//                         game_skill_level: 10,
//                         anticheat_required: true,
//                     },
//                 ],
//                 substituted: true,
//                 name: "RedactedSociety",
//                 type: "premade",
//             },
//         },
//         voting: {
//             location: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Chicago",
//                         class_name: "Chicago",
//                         game_location_id: "Chicago",
//                         guid: "Chicago",
//                     },
//                     {
//                         class_name: "Denver",
//                         game_location_id: "Denver",
//                         guid: "Denver",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Denver",
//                     },
//                     {
//                         class_name: "Dallas",
//                         game_location_id: "Dallas",
//                         guid: "Dallas",
//                         image_lg:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=428&height=212",
//                         image_sm:
//                             "https://distribution.faceit-cdn.net/images/flags/v1/us.jpg?width=110&height=55",
//                         name: "Dallas",
//                     },
//                 ],
//                 pick: ["Chicago"],
//             },
//             map: {
//                 entities: [
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7c17caa9-64a6-4496-8a0b-885e0f038d79_1695819126962.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/adf58ac6-b0f3-40e9-87ef-0af23fc60918_1695819116078.jpeg",
//                         name: "Dust2",
//                         class_name: "de_dust2",
//                         game_map_id: "de_dust2",
//                         guid: "de_dust2",
//                     },
//                     {
//                         class_name: "de_mirage",
//                         game_map_id: "de_mirage",
//                         guid: "de_mirage",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7fb7d725-e44d-4e3c-b557-e1d19b260ab8_1695819144685.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/796b5b23-41e4-4387-a4a9-0d28c1c57456_1695819136505.jpeg",
//                         name: "Mirage",
//                     },
//                     {
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/7197a969-81e4-4fef-8764-55f46c7cec6e_1695819158849.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/15ff938d-a70d-4d0b-9bf9-6be215cdb193_1695819151395.jpeg",
//                         name: "Nuke",
//                         class_name: "de_nuke",
//                         game_map_id: "de_nuke",
//                         guid: "de_nuke",
//                     },
//                     {
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a7d193ca-9498-4546-bf7b-da33e3e429a5_1695819186093.jpeg",
//                         name: "Ancient",
//                         class_name: "de_ancient",
//                         game_map_id: "de_ancient",
//                         guid: "de_ancient",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/5b844241-5b15-45bf-a304-ad6df63b5ce5_1695819190976.jpeg",
//                     },
//                     {
//                         class_name: "de_train",
//                         game_map_id: "de_train",
//                         guid: "de_train",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/225a54ad-c66d-46ee-8ae1-2e4159691ee9_1731582334484.png",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/3efe2d1d-da1b-4960-a439-daf216f77bb4_1731582328687.png",
//                         name: "Train",
//                     },
//                     {
//                         game_map_id: "de_inferno",
//                         guid: "de_inferno",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/993380de-bb5b-4aa1-ada9-a0c1741dc475_1695819220797.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/a2cb95be-1a3f-49f3-a5fa-a02503d02086_1695819214782.jpeg",
//                         name: "Inferno",
//                         class_name: "de_inferno",
//                     },
//                     {
//                         guid: "de_anubis",
//                         image_lg:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/31f01daf-e531-43cf-b949-c094ebc9b3ea_1695819235255.jpeg",
//                         image_sm:
//                             "https://assets.faceit-cdn.net/third_party/games/ce652bd4-0abb-4c90-9936-1133965ca38b/assets/votables/847a46ed-fbcc-4347-a64a-bc2d6a24be89_1695819226252.jpeg",
//                         name: "Anubis",
//                         class_name: "de_anubis",
//                         game_map_id: "de_anubis",
//                     },
//                 ],
//                 pick: ["de_ancient", "de_anubis", "de_nuke"],
//             },
//             voted_entity_types: ["location", "map"],
//         },
//         calculate_elo: false,
//         scheduled_at: 1742952600,
//         configured_at: 1742960391,
//         started_at: 1742960921,
//         finished_at: 1742963465,
//         demo_url: [
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-fedd2ba1-26ce-4440-a776-a53c54053dd8-1-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-fedd2ba1-26ce-4440-a776-a53c54053dd8-2-1.dem.gz",
//             "https://demos-us-east.backblaze.faceit-cdn.net/cs2/1-fedd2ba1-26ce-4440-a776-a53c54053dd8-3-1.dem.gz",
//         ],
//         chat_room_id: "match-1-fedd2ba1-26ce-4440-a776-a53c54053dd8",
//         best_of: 3,
//         results: {
//             winner: "faction1",
//             score: {
//                 faction1: 2,
//                 faction2: 1,
//             },
//         },
//         detailed_results: [
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction2",
//                 factions: {
//                     faction2: {
//                         score: 1,
//                     },
//                     faction1: {
//                         score: 0,
//                     },
//                 },
//             },
//             {
//                 asc_score: false,
//                 winner: "faction1",
//                 factions: {
//                     faction1: {
//                         score: 1,
//                     },
//                     faction2: {
//                         score: 0,
//                     },
//                 },
//             },
//         ],
//         status: "FINISHED",
//         round: 4,
//         group: 1,
//         faceit_url:
//             "https://www.faceit.com/{lang}/cs2/room/1-fedd2ba1-26ce-4440-a776-a53c54053dd8",
//     },
// ];
