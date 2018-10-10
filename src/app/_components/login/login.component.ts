import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router
        ) {}

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    successfulLogin(event) {
        this.router.navigate([this.returnUrl]);        
    }

    failedLogin(event) {
        console.log(event)    
    }
}
