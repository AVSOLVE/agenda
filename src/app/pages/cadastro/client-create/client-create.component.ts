import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { NameValueInterface } from "../../shared/NameValue.interface";
import { Router } from "@angular/router";

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})

export class ClientCreateComponent implements OnInit {
  genders!: NameValueInterface[];
  userForm!: FormGroup;
  currentDate = new Date();

  constructor(private _router:Router) { }

  ngOnInit() {
    this.clearUserForm();
    this.setGenders();
  }

  clearUserForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      sexo: new FormControl(''),
      data_nascimento: new FormControl(''),
    });
  }

  setGenders():void{
    this.genders = [
      { name: 'Feminino', value: 'F' },
      { name: 'Masculino', value: 'M' },
      { name: 'Outro', value: 'O' },
    ];
  }

  save() {
    console.log(this.userForm.value);
    this.clearUserForm()
  }

  cancel() {
    this.clearUserForm();
    this._router.navigate(['/home'])
  }
}
