import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {
  title= "Runs";
  form:FormGroup;
  runChallenges = ['Desafio dos 10km','Desafio dos 25km','Desafio dos 30km'];
  runDescription=['Descrição 10km','Descrição 25km', 'Descrição 30km'];
  runNivel=['Nível 1','Nível 2', 'Nível 3'];

  constructor(private formBuilder:FormBuilder,
              private http:HttpClient) { 
}
  ngOnInit() {
    this.form = this.formBuilder.group({
      runChallenges: this.buildRuns(),
      runDescription:this.buildDesc(),
      runNivel:this.buildNivel()
      })
  }

  onSubmit(){
    console.log(this.form);
    let valueSubmit = Object.assign({},this.form.value);
    let valueSubmit2 = Object.assign({},this.form.value);
    let valueSubmit3 = Object.assign({},this.form.value);

    valueSubmit = Object.assign(valueSubmit,{
      runChallenges: valueSubmit.runChallenges
      .map((v, i)=> v ? this.runChallenges[i] : null)
      .filter(v => v!== null)
    }),
    valueSubmit2 = Object.assign(valueSubmit2,{
      runDescription: valueSubmit2.runDescription
      .map((c,y)=> c ? this.runDescription[y] : null)
      .filter(c => c !== null)
    }),
    valueSubmit3 = Object.assign(valueSubmit3,{
      runNivel: valueSubmit3.runNivel
      .map((x,b)=> x ? this.runNivel[b]:null)
      .filter(x => x !== null)
    })


      if(this.form.valid){
        this.http
        .post('https://httpbin.org/post',  JSON.stringify(valueSubmit,valueSubmit2,valueSubmit3))
        .subscribe(dados => console.log(dados));
    }   
  }

  buildRuns(){
    const values = this.runChallenges.map(v => new FormControl(false));

    return this.formBuilder.array(values);  
  }
  buildDesc(){
    const values2 = this.runDescription.map(c => new FormControl(false));
    return this.formBuilder.array(values2);
  }
  buildNivel(){
    const values3 = this.runNivel.map(x => new FormControl(false));
    return this.formBuilder.array(values3);
  }
}