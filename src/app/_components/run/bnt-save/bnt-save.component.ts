import { Component } from '@angular/core';
import {MatSnackBar} from '@angular/material';
//import {RunComponent} from '../run.component';

@Component({
  selector: 'app-bnt-save',
  templateUrl: 'bnt-save.component.html',
  styleUrls: ['bnt-save.component.scss']
})
export class BntSaveComponent{

  constructor(public snack: MatSnackBar,
              ) { }
  clickSave(){
    this.snack.openFromComponent(MessageSave,{
      duration:500,
    });
      
      }
}
  
  @Component({
    selector:'message-save', 
    templateUrl:'s.html',
    styles:[`.savestyle{
      color:hotpink;}`
    ],
  })
  export class MessageSave{}

