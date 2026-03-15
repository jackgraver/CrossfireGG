import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/rules/")({
    component: RouteComponent,
});

type RuleSectionProps = {
    title: string;
    children: React.ReactNode;
};

function RuleSection({ title, children }: RuleSectionProps) {
    return (
        <div className="space-y-4">
            <h1 className="border-b pb-2 text-2xl font-bold">{title}</h1>
            {children}
        </div>
    );
}

function RouteComponent() {
    return (
        <div className="mx-auto max-w-4xl space-y-8 p-6">
            <RuleSection title="1. General League Rules">
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        Crossfire GG reserves the right to modify, change,
                        adapt, or alter the rules at any time with or without
                        prior notice to maintain a fair and competitive
                        environment.
                    </li>
                    <li>
                        Crossfire GG reserves the right to adjudicate on any
                        issue not explicitly addressed by the rules.
                    </li>
                    <li>
                        All players must uphold the spirit of fair play and
                        competition at all times. These are the only rules
                        governing Crossfire GG competitions.
                    </li>
                    <li>
                        Conflict resolution decisions by Crossfire GG are
                        confidential unless otherwise permitted by written
                        consent. Crossfire GG is not responsible for enforcing
                        private agreements between players or teams.
                    </li>
                    <li>No custom Player Models are allowed.</li>
                    <li>
                        FACEIT Anti-Cheat must be installed and active during
                        any Crossfire GG matches.
                    </li>
                    <li>
                        All Players must be from the North American region.
                    </li>
                </ul>
            </RuleSection>

            <RuleSection title="2. Tournament Structure & Schedule & Seeding">
                <ul className="list-disc space-y-4 pl-6">
                    <li>Total Teams: 32 Format: Tier 2 Ranked (VRS-Enabled)</li>
                    <li>
                        Prize Pool: $3,500 USD
                        <ul className="list-circle mt-2 space-y-1 pl-6">
                            <li>
                                1st: $2,000 USD 2nd: $1250 USD 3rd: $250 USD
                            </li>
                        </ul>
                    </li>
                    <li>
                        Server Region: North America (United States only) ●
                        Anti-Cheat: FACEIT AC
                    </li>
                    <li>Broadcast Delay: Minimum 90 seconds</li>
                    <li>
                        Group Stage:
                        <ul className="list-circle mt-2 space-y-2 pl-6">
                            <li>
                                8 Groups × 4 Teams (32 total). Round-Robin
                                Format (BO3). Top 2 teams from each group
                                advance to the Playoffs (16 total). Default
                                Match Day: Fridays at 8 PM EST. Teams may
                                reschedule within the group-stage window (March
                                2 – March 22).
                            </li>
                        </ul>
                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead className="bg-secondBg">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Round
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Dates
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Default Day
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Time (EST)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Round 1
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            March 2 - March 8
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Friday March 6{" "}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            8 PM
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Round 2
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            March 9 – March 15
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Friday March 13
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            8 PM
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Round 3
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            March 16 – March 22
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Friday March 20
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            8 PM
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>
                    <li>
                        Playoff Stage:
                        <ul className="list-circle mt-2 space-y-2 pl-6">
                            <li>
                                16-Team Single Elimination Bracket (BO3).
                                Default Match Day: Fridays at 8 PM EST each
                                round. Reschedules allowed within the round
                                window with admin approval. Playoff Window:
                                (March 30 – April 25)
                            </li>
                        </ul>
                        <div className="mt-4 overflow-x-auto">
                            <table className="min-w-full border-collapse border border-gray-300">
                                <thead className="bg-secondBg">
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Round
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Dates
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Default Day
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Time (EST)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Round of 16
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            March 30 – April 5
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Friday April 3{" "}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            8 PM
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Quarterfinals
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            April 6 – April 12{" "}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Friday April 10
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            8 PM
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Semi-Finals
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            April 13 – April 1
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Friday April 17
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            8 PM
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Grand Finals
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            April 20 – April 25
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            Friday April 24
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            8 PM
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </li>
                    <li>
                        VRS & Seeding Policy
                        <ul className="list-circle mt-2 space-y-2 pl-6">
                            <li>
                                Crossfire GG Season 4 is an open event any
                                eligible North American team may register until
                                all 32 slots are filled. No Open Qualifiers are
                                held. Seeding Priority: 1. Teams with a Valve
                                Regional Standings (VRS) rank will be seeded
                                first by their most recent VRS ranking. 2.
                                Remaining teams will be seeded based on ESEA
                                League Division and Win/Loss record. The final
                                seeding list will be publicly posted before
                                Round 1. Using February 2nd, 2026 VRS
                                Leaderboard for seeding.
                            </li>
                        </ul>
                    </li>
                    <li>
                        CrossfireGG does not enforce a full roster lock during
                        the regular season or group stage. Teams may adjust
                        players prior to playoffs, subject to tournament
                        administration approval. The term “Roster” refers
                        primarily to the Core-3 competitive identity.
                    </li>
                    <li>
                        VRS Teams:
                        <ul className="list-circle mt-2 space-y-2 pl-6">
                            <li>
                                Must maintain at least three (3) players from
                                the official VRS snapshot roster at all times.
                                Changing one or two players does not affect VRS
                                eligibility. Falling below three snapshot
                                players results in immediate disqualification to
                                preserve VRS integrity.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Non-VRS Teams:
                        <ul className="list-circle mt-2 space-y-2 pl-6">
                            <li>
                                Must also maintain a consistent Core-3 identity
                                for competitive integrity. Administrative review
                                may occur if the core identity changes.
                            </li>
                        </ul>
                    </li>
                </ul>
            </RuleSection>

            <RuleSection title="3. Scheduling">
                <ul className="list-disc space-y-4 pl-6">
                    <li>All match times are first-come, first-served.</li>
                    <li>All times are displayed in EST/EDT.</li>
                    <li>Map vetoes occur immediately before matches.</li>
                    <li>
                        An admin may set a default match time if teams cannot
                        agree on one.
                    </li>
                    <li>
                        If a veto cannot be completed, a random map or maps will
                        be assigned and cannot be changed.
                    </li>
                    <li>
                        After a CS2 update, ISP outage, or technical issue,
                        teams must pause the match and contact an admin. If a
                        player cannot reconnect after a CS2 update, an admin
                        must be contacted.
                    </li>
                    <li>
                        Matches must be scheduled and played between 12:00 PM
                        and 12:00 AM EST/EDT.
                    </li>
                    <li>
                        Teams must submit conflicts 1 hour before the match.
                    </li>
                </ul>
            </RuleSection>

            <RuleSection title="4. Standings, Tiebreakers, Playoffs, & Qualification">
                <ul className="list-disc space-y-4 pl-6">
                    <li>
                        If a match must be replayed, the start money will be
                        $12,500.
                    </li>
                    <li>
                        Standings, matches, and brackets are maintained through
                        FACEIT Bracket
                    </li>
                    <li>
                        Playoff-eligible teams will retain their seed throughout
                        the playoffs.
                    </li>
                    <li>
                        Qualifiers guarantee a spot in the group stage, unless
                        otherwise noted.
                    </li>
                    <li>
                        If a qualified team fails to meet requirements, their
                        spot will be given to the next-highest team
                    </li>
                    <li>W/L Round Ratio will break tiebreakers</li>
                </ul>
            </RuleSection>

            <RuleSection title="5. Prizes">
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        Winners will be contacted within 14 days of Crossfire
                        GG’s conclusion.
                    </li>
                    <li>Prizes will be distributed via PayPal only.</li>
                    <li>
                        Payments will be made within 90 days of all required
                        paperwork submission.
                    </li>
                    <li>
                        Crossfire GG is not responsible for prize splits between
                        players and organizations. Payments are sent to the team
                        captain or organization.
                    </li>
                </ul>
            </RuleSection>

            <RuleSection title="6. Eligibility & Rosters">
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        During Crossfire registration, teams will be required to
                        designate a team captain via the signup form. The
                        designated captain must be a player from the team’s
                        CROSSFIRE’s core. Designated Captains may request a
                        captain role change to be transferred anytime but may be
                        a part of the core.
                    </li>
                    <li>
                        Roster changes are allowed until the Playoff Stage, at
                        which point rosters lock.
                    </li>
                    <li>
                        Teams must play with at least 3 original core players
                        per match.
                    </li>
                    <li>
                        Maximum roster size: 8 (5 starters, 2 substitutes, 1
                        coach).
                    </li>
                    <li>No multi-accounting is allowed.</li>
                    <li>Entry fees are non-refundable for any reason.</li>
                    <li>
                        Teams failing to pay the entry fee may be removed.
                    </li>
                    <li>
                        Team Coaches are not permitted to substitute at any
                        point in the event.
                    </li>
                    <li>All players must reside in North America</li>
                    <li>
                        All CROSSFIRE rosters will be locked once the Playoff
                        Stage begins, a form will be sent out for all the
                        playoff rosters to complete for the roster lock
                    </li>
                    <li>
                        Roster changes are allowed anytime throughout the group
                        stage. Players added through a roster change cannot be
                        considered a part of the core 3-5 of your original
                        roster.
                    </li>
                    <li>
                        Teams may substitute a player between matches for any
                        reason, provided they maintain a majority of their
                        registered core, except in cases of a verifiable
                        emergency.
                    </li>
                    <li>
                        Substitutions during a match or between maps are only
                        permitted in the event of a verifiable emergency.
                    </li>
                    <li>
                        All emergencies are subject to approval at the Admin’s
                        discretion.
                    </li>
                </ul>
            </RuleSection>

            <RuleSection title="7. Game Settings">
                <ul className="list-disc space-y-2 pl-6">
                    <li>Freeze Time: 15 seconds</li>
                    <li>Round Time: 1:55 minutes</li>
                    <li>Regulation Start Money: $800</li>
                    <li>Match Format: MR12/3</li>
                    <li>
                        Overtime: MR6 with $12,500 start money, continue sides
                    </li>
                    <li>1 Technical Timeout (up to 15 minutes)</li>
                    <li>3 Tactical Timeouts (30 seconds each)</li>
                    <li>
                        Veto Format: A removes, B removes, A picks, B picks, A
                        removes, B removes, Decider
                    </li>
                </ul>
            </RuleSection>

            <RuleSection title="8. Forfeits">
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        Teams must have 5 players on the server within 15
                        minutes of the scheduled start time.
                    </li>
                    <li>
                        Failure to do so will result in a forfeit, scored as a
                        13-0 win or 2-0 win.
                    </li>
                    <li>
                        If neither team can field 5 players, the match may be
                        rescheduled or double forfeited.
                    </li>
                    <li>
                        If no match is scheduled before the default time, the
                        team that shows up will receive the FFW (Forfeit Win).
                    </li>
                    <li>
                        Habitual forfeits may result in bans from future
                        Crossfire GG seasons.
                    </li>
                </ul>
            </RuleSection>

            <RuleSection title="9. Tech Problems & Resolutions">
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        Vote for a pause for standard timeout (up to 3 uses per
                        team, 30 seconds each).
                    </li>
                    <li>Use !pause for serious technical issues.</li>
                    <li>
                        Teams must inform admins immediately during technical
                        timeouts.
                    </li>
                    <li>
                        Teams have 10 minutes to resolve technical issues unless
                        otherwise permitted by admins.
                    </li>
                    <li>
                        Admins may pause matches at any time for any technical
                        or competitive reason.
                    </li>
                </ul>
            </RuleSection>

            <RuleSection title="10. Exploits, Bugs, Infractions, & Penalties">
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        Exploiting known or unknown bugs for advantage is
                        prohibited.
                    </li>
                    <li>
                        Pixel walking, invisible ledges, or glitching is banned.
                    </li>
                    <li>
                        No bomb plants in floating positions or through solid
                        objects.
                    </li>
                    <li>Bombs must be audible to the opposing team.</li>
                    <li>
                        Players must not join the enemy team during a match.
                    </li>
                    <li>Boosting involving clipping is illegal.</li>
                    <li>
                        All infractions will be handled case-by-case basis.
                        Penalties can include forfeits or disqualification.
                    </li>
                    <li>
                        Betting on your own matches is strictly prohibited.
                    </li>
                </ul>
            </RuleSection>

            <RuleSection title="11. Cheating, Stream Sniping, and Other Offenses">
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        Cheating of any kind results in immediate expulsion from
                        Crossfire GG.
                    </li>
                    <li>
                        Account sharing during matches results in match
                        forfeiture and expulsion.
                    </li>
                    <li>
                        Players must run FACEIT Anti-Cheat during all matches.
                    </li>
                    <li>
                        Players with active VAC bans or platform bans are not
                        eligible.
                    </li>
                    <li>
                        If a player is banned mid-season, all their team’s
                        results are forfeited.
                    </li>
                    <li>
                        At no point should any player or coach be in a Twitch
                        stream of the match. It doesn't matter if it's between
                        maps or a tech pause. Zero tolerance policy on this.
                    </li>
                    <li>
                        Use of racial slurs results in an FFL, and a second
                        offense leads to a tournament ban.
                    </li>
                </ul>
            </RuleSection>

            <RuleSection title="12. Support & Admins">
                <ul className="list-disc space-y-2 pl-6">
                    <li>
                        Admins are contacted through the Support Channel in the
                        Crossfire GG Discord.
                    </li>
                    <li>Admin decisions are final and confidential.</li>
                    <li>
                        Public posting of disputes or admin conversations may
                        result in penalties.
                    </li>
                    <li>
                        Protests must be filed through the official Crossfire
                        Discord ticket system and include supporting evidence
                        (screenshots, match links, or demo timestamps). Teams
                        have up to 1 day after a match concludes to submit a
                        formal protest
                    </li>
                    <li>
                        Appeals escalate from Match Admin → Head Admin →
                        Tournament Director. Final decisions are logged and
                        archived for record-keeping
                    </li>
                    <li>
                        All public standings, results, and prize data will be
                        posted on immutable platforms (X & Discord)
                    </li>
                    <li>
                        Sharing another server’s connection IP without
                        CROSSFIRE's prior consent is prohibited. First offense:
                        written warning. Further offense: loss of map pick. All
                        official matches may be broadcast live by CROSSFIRE
                        staff or approved partners. (Please check #streaming in
                        the Discord for further information on how to stream a
                        match)
                    </li>
                    <li>
                        For any questions, clarifications, or exceptions,
                        contact the Crossfire GG administrative team via
                        Discord.
                    </li>
                </ul>
            </RuleSection>
        </div>
    );
}
