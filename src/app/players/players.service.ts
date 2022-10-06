import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Players } from './store/players';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<Players[]>('http://localhost:3000/players')
  }

  create(payload: Players) {
    return this.http.post<Players>('http://localhost:3000/players', payload)
  }

  update(payload: Players) {
    return this.http.put<Players>(`http://localhost:3000/players/${payload.id}`, payload);
  }

  delete(id: number) {
    return this.http.delete(`http://localhost:3000/players/${id}`);
  }
}
