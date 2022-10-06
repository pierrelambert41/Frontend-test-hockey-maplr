import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlayersRoutingModule } from './players-routing.module';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { playerReducer } from './store/players.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PlayersEffect } from './store/players.effect';
import { AddComponent } from './add/add.component'
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    HomeComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    StoreModule.forFeature('myPlayers', playerReducer),
    EffectsModule.forFeature([PlayersEffect]),
    CommonModule,
    PlayersRoutingModule,
    FormsModule
  ]
})
export class PlayersModule { }
