import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Pokemon } from 'src/app/interfaces/pokemon';

@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})
export class PokeDetailComponent implements OnInit {
poke$!:Observable<Pokemon>;
pokemon!:Pokemon;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PokemonService
  ) { }

  ngOnInit(): void {

    this.poke$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getPokemon(params.get('id')!))
    );
    this.poke$.subscribe(data=>
      this.pokemon=data
      )
  }
regresar(){
  this.router.navigate(['/home'])
}

}
