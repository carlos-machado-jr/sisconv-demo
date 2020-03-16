import { VeiculosService } from './../../service/veiculos.service';
import { Router } from '@angular/router';
import { AuthService } from './../../login/auth.service';
import { Setor } from './../../model/setor';
import { Posto } from './../../model/posto';
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Veiculos } from 'src/app/model/veiculos';

@Component({
  selector: 'app-add-proprietarios',
  templateUrl: './add-proprietarios.component.html',
  styleUrls: ['./add-proprietarios.component.css']
})
export class AddProprietariosComponent implements OnInit {
  autenticacao: boolean = false;
  hide: boolean = true;
  
  teste = [1];
  length = this.teste.length;
  num = this.length + 1; 
  lastValue = this.teste[--this.length];
  formulario: FormGroup;
  veiculo: FormArray;
  veiculos: Veiculos[];


  posto: Posto[] = [
     { 'posto': 'MN-RC'},
     { 'posto': 'MN-RM2'},
     { 'posto': 'MN-QPA'},
     { 'posto': 'CB-EF'},
     { 'posto': 'CB-MA'},
     { 'posto': 'CB-MO'},
     { 'posto': 'CB-AR'},
     { 'posto': '3SG-AR'},
     { 'posto': '3SG-PD'},
     { 'posto': '3SG-MO'},
     { 'posto': '2SG-AR'},
     { 'posto': '2SG-PD'}
  ];
  setor: Setor[] = [
    {'nome': 'CPD'},
    {'nome': 'SEP'},
    {'nome': 'GABINETE'},
    {'nome': 'INTENDENCIA'},
    {'nome': 'SEDIME'},
    {'nome': 'PAIOL'},
    {'nome': 'RANCHO'}
  ]
  constructor(
    private formBuilder: FormBuilder,
    private veiculosService: VeiculosService
    
    ) { } 

  onSubmit(){
    this.veiculo.controls.map( v => {
      this.veiculos.push(v.value)
    });
    if(this.formulario.valid){
    console.log('valido');
  }else{
    console.log('invalido');

  }
    console.log(this.veiculos);

  }

  ngOnInit(){

    this.formulario = this.formBuilder.group({
      // email:[null, [Validators.required, Validators.email]],
      // nip:[null, Validators.required ],
     veiculo: this.formBuilder.array([this.createVeiculo()])
    });

    console.log(this.veiculosService.listarVeiculos());
    
  }

  emailErro(){
    
    if(this.formulario.get('email').hasError('required')){
      return 'Digite seu email!'
    } else {
      return this.formulario.get('email').hasError('email') ? 'Email invalido!' : '';
    }
  }

  incrementa(){
   
    this.veiculo= this.formulario.get('veiculo') as FormArray;
    this.veiculo.push(this.createVeiculo());
    this.veiculosService.adicionarVeiculos().subscribe();


  }

  createVeiculo(): FormGroup{
    return this.formBuilder.group({
      modelo:''
    });
  }
  
}