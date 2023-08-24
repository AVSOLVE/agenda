import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { NameValueInterface } from "../shared/interfaces/NameValue.interface";

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.css']
})
export class StaffCreateComponent implements OnInit {
  genders!: NameValueInterface[];
  services!: NameValueInterface[];
  userForm!: FormGroup;
  currentDate = new Date();

  constructor() { }

  ngOnInit() {
    this.clearUserForm();
    this.setGenders();
    this.setServices();
  }

  clearUserForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      sexo: new FormControl(''),
      data_nascimento: new FormControl(''),
      procedures: new FormControl(''),
    });
  }

  setGenders():void{
    this.genders = [
      { name: 'Feminino', value: 'F' },
      { name: 'Masculino', value: 'M' },
      { name: 'Outro', value: 'O' },
    ];
  }

  setServices():void{
    this.services = [
      { name: 'Fisioterapia', value: 'F' },
      { name: 'Massoterapia', value: 'M' },
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
