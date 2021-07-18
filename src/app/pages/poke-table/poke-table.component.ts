import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from '../../interfaces/pokemon';
import { filter } from 'rxjs/operators';

export interface Item {
  position:number,
  image:string,
  name:string
}
@Component({
  selector: 'app-poke-table',
  templateUrl: './poke-table.component.html',
  styleUrls: ['./poke-table.component.scss']
})
export class PokeTableComponent implements OnInit {
  p: number = 1;

pokemons:Item[]=[]
  constructor(private pokemonService:PokemonService) { }

  ngOnInit(): void {
   this.getPokemons();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
   this.pokemons=[]
    let pokemonData:Item;
    for(let i=1; i<=100; i++){
      this.pokemonService.getPokemon(i).pipe(
      filter((dato:any)=>dato.name.includes(filterValue)) 
      ).subscribe((res:any)=>{
        pokemonData={
          position:i,
          image:res.sprites.front_default,
          name:res.name
        };
        this.pokemons.push(pokemonData)
      },
      err=>{console.log(err);})
      }
  }
    
getPokemons(){
  let pokemonData:Item;
  for(let i=1; i<=100; i++){
    this.pokemonService.getPokemon(i).subscribe(
      (res:Pokemon)=>{
        pokemonData={
          position:i,
          image:res.sprites.front_default,
          name:res.name
        };
        this.pokemons.push(pokemonData)
      },
      err=>{console.log(err);}
    )
  }
}
}
