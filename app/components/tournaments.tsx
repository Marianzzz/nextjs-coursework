import TournamentCard from "./tournamentsCard";
import { getLastThreeTournaments } from "../actions/tournaments";
export default async function Tournament() {
    const tournament = await getLastThreeTournaments();

    return (
        <TournamentCard tournaments={tournament} />
    );
}