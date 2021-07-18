import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../interfaces/pokemon'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
baseUrl=environment.baseUrl
  constructor(private http:HttpClient) { }


  getPokemon(index:any):Observable<Pokemon>{
    return this.http.get<Pokemon>(`${this.baseUrl}/pokemon/${index}`)
  }
 
}
