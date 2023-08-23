import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { NameValueInterface } from "../shared/interfaces/NameValue.interface";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

export class UserCreateComponent implements OnInit {
  genders!: NameValueInterface[];
  userForm!: FormGroup;
  currentDate = new Date();

  constructor() { }

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
    throw new Error('Method not implemented.');
  }



}
