import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

interface Time {
  name: string;
  code: string;
}
@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {
  stateOptions: any[] = [{ label: 'Usuário', value: 'user' }, { label: 'Colaborador', value: 'staff' }];

  value = 'user';
  userForm!: FormGroup<any>;


  onSubmit() {
    console.log(this.formGroup.value);
  }

  date!: Time[];
  hours!: Time[];
  services!: Time[];
  formGroup!: FormGroup;
  minimumDate = new Date();
  name: any;

  ngOnInit() {
    this.hours = [
      { name: 'Masculino', code: 'M' },
      { name: 'Feminino', code: 'F' },
      { name: 'Outro', code: 'O' },

    ];
    this.services = [
      { name: 'Fisioterapia1', code: '1' },
      { name: 'Fisioterapia2', code: '2' },
      { name: 'Fisioterapia3', code: '3' },
      { name: 'Fisioterapia4', code: '4' },
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
