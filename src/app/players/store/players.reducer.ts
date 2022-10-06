import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import { Players } from "./players";
import { deletePlayerAPISuccess, playersFetchAPISuccess, saveNewPlayerSucess, updatePlayerAPISuccess } from "./players.action";

export const initialState: ReadonlyArray<Players> = [];

export const playerReducer = createReducer(
    initialState,
    on(playersFetchAPISuccess, (state, { allPlayers }) => {
        return allPlayers
    }),
    on(saveNewPlayerSucess, (state, { newPlayer }) => {
        return [...state, newPlayer];
    }),
    on(updatePlayerAPISuccess, (state, { updatePlayer }) => {
        let newState = state.filter((_) => _.id != updatePlayer.id);
        newState.unshift(updatePlayer);
        return newState;
    }),
    on(deletePlayerAPISuccess, (state, { id }) => {
        let newState = state.filter((_) => _.id != id);
        return newState;
      })
);