import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,FormControl} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent implements OnInit {
  title="Foods";
  form:FormGroup;
  foodChallenges = ['Diminuir carboidratos','Comer 2 frutas/dia','Beber água'];
  foodNivel = ["Nível 1", "Nível 2","Nível 3"];
  foodDescription = ["Descrição 1","Descrição 2","Descrição 3"];

  constructor(private formBuilder:FormBuilder,
              private http:HttpClient) { 
}
  ngOnInit() {
    this.form = this.formBuilder.group({
      foodChallenges: this.buildFood(),
      foodDescription:this.buildDesc(),
      foodNivel:this.buildNivel()
      })
  }

  onSubmit(){
    console.log(this.form);
    let valueSubmit = Object.assign({},this.form.value);
    let valueSubmit2 = Object.assign({},this.form.value);
    let valueSubmit3 = Object.assign({},this.form.value);

    valueSubmit = Object.assign(valueSubmit,{
      foodChallenges: valueSubmit.foodChallenges
      .map((v, i)=> v ? this.foodChallenges[i] : null)
      .filter(v => v!== null)
    }),
    valueSubmit2 = Object.assign(valueSubmit2,{
      foodNivel: valueSubmit2.runDescription
      .map((c,y)=> c ? this.foodNivel[y] : null)
      .filter(c => c !== null)
    }),
    valueSubmit3 = Object.assign(valueSubmit3,{
      foodDescription: valueSubmit3.foodDescription
      .map((x,b)=> x ? this.foodDescription[b]:null)
      .filter(x => x !== null)
    })

      if(this.form.valid){
        this.http
        .post('https://httpbin.org/post',  JSON.stringify(valueSubmit,valueSubmit2,valueSubmit3))
        .subscribe(dados => console.log(dados));
    }   
  }

  buildFood(){
    const values = this.foodChallenges.map(v => new FormControl(false));
    return this.formBuilder.array(values);  
  }
  buildDesc(){
    const values2 = this.foodDescription.map(c => new FormControl(false));
    return this.formBuilder.array(values2);
  }
  buildNivel(){
    const values3 = this.foodNivel.map(x => new FormControl(false));
    return this.formBuilder.array(values3);
  }
}
