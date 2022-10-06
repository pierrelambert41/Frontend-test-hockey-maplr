import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createEffects } from "@ngrx/effects/src/effects_module";
import { select, Store } from "@ngrx/store";
import { EMPTY } from "rxjs";
import { withLatestFrom, map, mergeMap, switchMap } from 'rxjs/operators';
import { setAPIStatus } from "src/app/shared/store/app.action";
import { Appstate } from "src/app/shared/store/appstate";
import { PlayersService } from "../players.service";
import { deletePlayerAPISuccess, invokeDeletePlayerAPI, invokePlayersAPI, invokeSaveNewPlayerApi, invokeUpdatePlayerAPI, playersFetchAPISuccess, saveNewPlayerSucess, updatePlayerAPISuccess } from "./players.action";
import { selectPlayers } from "./players.selector";

@Injectable()
export class PlayersEffect {
    
    loadAllBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(invokePlayersAPI),
      withLatestFrom(this.store.pipe(select(selectPlayers))),
      mergeMap(([, playerformStore]) => {
        if (playerformStore.length > 0) {
          return EMPTY;
        }
        return this.playersService
          .get()
          .pipe(map((data) => playersFetchAPISuccess({ allPlayers: data })));
      })
    )
  );

  saveNewPlayer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeSaveNewPlayerApi),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.playersService.create(action.newPlayer).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return saveNewPlayerSucess({ newPlayer: data });
          })
        );
      })
    );
  });

  updateBookAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeUpdatePlayerAPI),
      switchMap((action) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.playersService.update(action.updatePlayer).pipe(
          map((data) => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return updatePlayerAPISuccess({ updatePlayer: data });
          })
        );
      })
    );
  });

  deleteBooksAPI$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(invokeDeletePlayerAPI),
      switchMap((actions) => {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } })
        );
        return this.playersService.delete(actions.id).pipe(
          map(() => {
            this.appStore.dispatch(
              setAPIStatus({
                apiStatus: { apiResponseMessage: '', apiStatus: 'success' },
              })
            );
            return deletePlayerAPISuccess({ id: actions.id });
          })
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private playersService: PlayersService,
    private store: Store,
    private appStore: Store<Appstate>
) {}
}
