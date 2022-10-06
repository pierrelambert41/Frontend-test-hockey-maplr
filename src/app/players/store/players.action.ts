import { createAction, props } from "@ngrx/store";
import { Players } from "./players";

export const invokePlayersAPI = createAction(
    '[Players API] Invoke Players Fetch API'
);

export const playersFetchAPISuccess = createAction(
    '[Players API] Fetch API Success',
    props<{ allPlayers: Players[] }>()
);

export const invokeSaveNewPlayerApi = createAction(
    '[Players API] Invoke save new player api',
    props<{ newPlayer: Players }>()
);

export const saveNewPlayerSucess = createAction(
    '[Player API] save new player api success',
    props<{ newPlayer: Players }>()
);

export const invokeUpdatePlayerAPI = createAction(
    '[Player API] Inovke update player api',
    props<{ updatePlayer: Players }>()
  );
   
  export const updatePlayerAPISuccess = createAction(
    '[Player API] update  player api success',
    props<{ updatePlayer: Players }>()
  );

  export const invokeDeletePlayerAPI = createAction(
    '[Player API] Invoke delete player api',
    props<{id:number}>()
  );
   
  export const deletePlayerAPISuccess = createAction(
    '[Player API] deleted player api success',
    props<{id:number}>()
  );
