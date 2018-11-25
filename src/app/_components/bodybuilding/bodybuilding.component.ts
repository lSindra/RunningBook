import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bodybuilding',
  templateUrl: './bodybuilding.component.html',
  styleUrls: ['./bodybuilding.component.scss']
})
export class BodybuildingComponent implements OnInit {
  title="Bodybuilding";
  form:FormGroup;
  bodyChallenges = ['Bíceps','Costas','Pernas'];
  bodyDescription=['Descrição bíceps','Descrição costas', 'Descrição pernas'];
  bodyNivel=['Nível 1','Nível 2', 'Nível 3'];

  constructor(private formBuilder:FormBuilder,
    private http:HttpClient) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      bodyChallenges: this.buildBody(),
      bodyDescription:this.buildDesc(),
      bodyNivel:this.buildNivel()
      })
  }
  onSubmit(){
    console.log(this.form);
    let valueSubmit = Object.assign({},this.form.value);
    let valueSubmit2 = Object.assign({},this.form.value);
    let valueSubmit3 = Object.assign({},this.form.value);

    valueSubmit = Object.assign(valueSubmit,{
      bodyChallenges: valueSubmit.bodyChallenges
      .map((v, i)=> v ? this.bodyChallenges[i] : null)
      .filter(v => v!== null)
    }),
    valueSubmit2 = Object.assign(valueSubmit2,{
      bodyDescription: valueSubmit2.bodyDescription
      .map((c,y)=> c ? this.bodyDescription[y] : null)
      .filter(c => c !== null)
    }),
    valueSubmit3 = Object.assign(valueSubmit3,{
      bodyNivel: valueSubmit3.bodyNivel
      .map((x,b)=> x ? this.bodyNivel[b]:null)
      .filter(x => x !== null)
    })


      if(this.form.valid){
        this.http
        .post('https://httpbin.org/post',  JSON.stringify(valueSubmit,valueSubmit2,valueSubmit3))
        .subscribe(dados => console.log(dados));
    }   
  }
  buildBody(){
    const values = this.bodyChallenges.map(v => new FormControl(false));

    return this.formBuilder.array(values);  
  }
  buildDesc(){
    const values2 = this.bodyDescription.map(c => new FormControl(false));
    return this.formBuilder.array(values2);
  }
  buildNivel(){
    const values3 = this.bodyNivel.map(x => new FormControl(false));
    return this.formBuilder.array(values3);
  }

}
