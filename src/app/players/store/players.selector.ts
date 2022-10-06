import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Players } from "./players";

export const selectPlayers = createFeatureSelector<Players[]>('myPlayers');

export const selectPlayerById = (playerId: number) => 
    createSelector(selectPlayers, (players: Players[]) => {
        let playerById = players.filter((_) => _.id == playerId);
        if (playerById.length == 0) {
            return null;
        }
        return playerById[0];
    })