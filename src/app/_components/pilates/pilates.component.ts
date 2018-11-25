import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-pilates',
  templateUrl: './pilates.component.html',
  styleUrls: ['./pilates.component.scss']
})
export class PilatesComponent implements OnInit {
  title="Pilates";
  form:FormGroup;
  pilatesChallenges = ['Stretches Front','Sit Up','Leg Extension'];
  pilatesDescription = ['Alongas os músculos isquiotibiais','Fortalecer os músculos abdominais','Fortalecer músculos do glúteos'];
  pilatesNivel = ["Nível 1","Nível 2", "Nível 3"];
  

  constructor(private formBuilder:FormBuilder,
              private http:HttpClient) { 
}
  ngOnInit() {
    this.form = this.formBuilder.group({
      pilatesChallenges: this.buildPilates(),
      pilatesDescription: this.buildDesc(),
      pilatesNivel:this.buildNivel()
      })
  }

  onSubmit(){
    console.log(this.form);
    let valueSubmit = Object.assign({},this.form.value);
    let valueSubmit2 = Object.assign({},this.form.value);
    let valueSubmit3 = Object.assign({},this.form.value);

    valueSubmit = Object.assign(valueSubmit,{
      pilatesChallenges: valueSubmit.pilatesChallenges
      .map((v, i)=> v ? this.pilatesChallenges[i] : null)
      .filter(v => v!== null)
    }),
    valueSubmit2 = Object.assign(valueSubmit2,{
      pilatesDescription: valueSubmit2.pilatesDescription
      .map((c,y)=> c ? this.pilatesDescription[y] : null)
      .filter(c => c !== null)
    }),
    valueSubmit3 = Object.assign(valueSubmit3,{
      pilatesNivel: valueSubmit3.pilatesNivel
      .map((x,b)=> x ? this.pilatesNivel[b]:null)
      .filter(x => x !== null)
    })


      if(this.form.valid){
        this.http
        .post('https://httpbin.org/post',  JSON.stringify(valueSubmit))
        .subscribe(dados => console.log(dados));
    }   
  }

  buildPilates(){
    const values = this.pilatesChallenges.map(v => new FormControl(false));
    return this.formBuilder.array(values);  
  }
  buildDesc(){
    const values2 = this.pilatesDescription.map(c => new FormControl(false));
    return this.formBuilder.array(values2);
  }
  buildNivel(){
    const values3 = this.pilatesNivel.map(x => new FormControl(false));
    return this.formBuilder.array(values3);
  }
}

