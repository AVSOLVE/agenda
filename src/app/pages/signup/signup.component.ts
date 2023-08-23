import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";

interface Time {
  name: string;
  code: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {

  onSubmit() {
  console.log(this.formGroup.value);
  }

    date!: Time[];
    hours!: Time[];
    procedures!: Time[];
    formGroup!: FormGroup;
    minimumDate = new Date();
  name: any;

    ngOnInit() {
      this.hours = [
        { name: 'Masculino', code: 'M' },
        { name: 'Feminino', code: 'F' },
        { name: 'Outro', code: 'O' },

      ];
      this.procedures = [
        { name: 'Fisioterapia1', code: '1' },
        { name: 'Fisioterapia2', code: '2' },
        { name: 'Fisioterapia3', code: '3' },
        { name: 'Fisioterapia4', code: '4' },
      ];

      this.formGroup = new FormGroup({
          name: new FormControl(''),
          phone: new FormControl(''),
          email: new FormControl(''),
          date: new FormControl(''),
          sex: new FormControl(''),
        });
    }

  }
