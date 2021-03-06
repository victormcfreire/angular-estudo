import { AlunosService } from './../alunos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.scss']
})
export class AlunoDetalheComponent implements OnInit {

  aluno!: Aluno;
  inscricao!: Subscription;

  constructor(
    private _route: ActivatedRoute,
    private _alunosService: AlunosService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    /*this.inscricao = this._route.params.subscribe(
      (params: any) => {
        let id = params['id'];

        this.aluno = this._alunosService.getAluno(id);
      }
    );*/

    console.log('ngOnInit: AlunoDetalheComponent');

    this.inscricao = this._route.data.subscribe(
      (info) => {
        console.log('Recebendo o obj Aluno do resolver');
        this.aluno = info['aluno'];
      }
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  editarContato() {
    this._router.navigate(['/alunos', this.aluno.id, 'editar']);
  }

}
