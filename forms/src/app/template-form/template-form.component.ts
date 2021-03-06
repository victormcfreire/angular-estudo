import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  constructor(
    private _http: HttpClient,
    private _cepService: ConsultaCepService
  ) { }

  onSubmit(formulario: any) {
    this._http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .pipe(map(res => res))
      .subscribe({
        next: (dados => {
          console.log(dados)
          formulario.form.reset();
        }),
        error: ((error: any) => alert('erro'))
      });
  }

  consultaCep(cep: any, form: any) {
    //Nova variável "cep" somente com dígitos.
    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      this._cepService.consultaCep(cep)?.pipe()
        .subscribe(dados => this.populaDadosForm(dados, form));
    }
  }

  populaDadosForm(dados: any, formulario: any) {

    if (!("erro" in dados)) {
      //Atualiza os campos com os valores da consulta.
      formulario.form.patchValue({
        endereco: {
          rua: dados.logradouro,
          cep: dados.cep,
          complemento: dados.complemento,
          bairro: dados.bairro,
          cidade: dados.localidade,
          estado: dados.uf
        }
      });
    } //end if.
    else {
      //CEP pesquisado não foi encontrado.
      this.resetaDadosForm(formulario);
      alert("CEP não encontrado.");
    }
  }

  resetaDadosForm(formulario: any) {
    formulario.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
  }

  ngOnInit(): void {
  }

  verificaValidTouched(campo: any) {
    return !campo.valid && campo.touched;
  }

  aplicaCssError(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    };
  }

}
