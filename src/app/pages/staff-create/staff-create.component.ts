import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { NameValueInterface } from "../shared/interfaces/NameValue.interface";

@Component({
  selector: 'app-staff-create',
  templateUrl: './staff-create.component.html',
  styleUrls: ['./staff-create.component.css']
})
export class StaffCreateComponent implements OnInit {
  userForm!: FormGroup<any>;
  onSubmit() {
    console.log(this.formGroup.value);
  }

  date!: NameValueInterface[];
  hours!: NameValueInterface[];
  services!: NameValueInterface[];
  formGroup!: FormGroup;
  minimumDate = new Date();
  name: any;

  ngOnInit() {
    this.hours = [
      { name: 'Masculino', value: 'M' },
      { name: 'Feminino', value: 'F' },
      { name: 'Outro', value: 'O' },

    ];
    this.services = [
      { name: 'Fisioterapia1', value: '1' },
      { name: 'Fisioterapia2', value: '2' },
      { name: 'Fisioterapia3', value: '3' },
      { name: 'Fisioterapia4', value: '4' },
    ];

    this.formGroup = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      sex: new FormControl(''),
      selectedServices: new FormControl(''),
    });
  }
}
