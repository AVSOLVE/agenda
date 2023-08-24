import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NameValueInterface } from "../../shared/NameValue.interface";

interface Time {
  name: string;
  code: string;
}
@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CriarComponent implements OnInit {
  clients!: NameValueInterface[];
  hours!: NameValueInterface[];
  procedures!: NameValueInterface[];
  userForm!: FormGroup;
  currentDate = new Date();

  constructor(private _router: Router) { }

  ngOnInit() {
    this.clearUserForm();
    this.setClients();
    this.setProcedures();
    this.setHours();
  }

  clearUserForm(): void {
    this.userForm = new FormGroup({
      nameClient: new FormControl(''),
      data_agendamento: new FormControl(''),
      procedure: new FormControl(''),
      time: new FormControl(''),
    });
  }

  setClients(): void {
    this.clients = [
      { name: 'Alexandre', value: '0' },
      { name: 'Beatriz', value: '0' },
      { name: 'Dayanne', value: '0' },
      { name: 'Lais', value: '0' },
      { name: 'Ronaldo', value: '0' },
      { name: 'Samuel', value: '0' },
    ];
  }

  setProcedures(): void {
    this.procedures = [
      { name: 'Acupuntura', value: '0' },
      { name: 'Auriculoterapia', value: '0' },
      { name: 'Fisio Ortopédica', value: '0' },
      { name: 'Fisio Pélvica', value: '0' },
      { name: 'Fisioterapia', value: '0' },
      { name: 'Limpeza de Pele', value: '0' },
      { name: 'Massoterapia', value: '0' },
      { name: 'Pilates', value: '0' },
      { name: 'RPG', value: '0' },
    ];
  }

  setHours(): void {
    this.hours = [
      { name: '07 AM', value: '7' },
      { name: '08 AM', value: '8' },
      { name: '09 AM', value: '9' },
      { name: '10 AM', value: '10' },
      { name: '11 AM', value: '11' },
      { name: '12 PM', value: '12' },
      { name: '13 PM', value: '13' },
      { name: '14 PM', value: '14' },
      { name: '15 PM', value: '15' },
      { name: '16 PM', value: '16' },
      { name: '17 PM', value: '17' },
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
