import { BuildingService } from './../../../services/building.service';
import { SessionManagerService } from './../../../services/session-manager.service';
import { ILoginForm } from './../../../models/ilogin-form';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm! : FormGroup;

  constructor(private _fb: FormBuilder, private _service : AuthService, private _session:SessionManagerService, private _building : BuildingService) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required, Validators.minLength(8)]]
    })
  }

  public onSubmit(){
    if(!this.loginForm.valid) return;
    let loginResult : ILoginForm = {
      email : this.loginForm.controls["email"].value,
      password : this.loginForm.controls["password"].value
    };
    console.log(loginResult);
    this._service.login(loginResult).subscribe({
      next : (data) => {
        this._session.clearCurrentUser();
        console.log(data)
        this._session.setCurrentUser(data);
        this._building.get().subscribe(console.log);
      },
      error : (err) => console.error(err)
    })
  }

}
