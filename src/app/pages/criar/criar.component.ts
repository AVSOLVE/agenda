import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

interface Time {
  name: string;
  code: string;
}
@Component({
  selector: 'app-criar',
  templateUrl: './criar.component.html',
  styleUrls: ['./criar.component.css']
})

export class CriarComponent implements OnInit {

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
      { name: '08 AM', code: '08' },
      { name: '09 AM', code: '09' },
      { name: '10 AM', code: '10' },
      { name: '11 AM', code: '11' },
      { name: '12 PM', code: '12' },
      { name: '13 PM', code: '13' },
      { name: '14 PM', code: '14' },
      { name: '15 PM', code: '15' },
      { name: '16 PM', code: '16' },
      { name: '17 PM', code: '17' },
    ];
    this.procedures = [
      { name: 'Fisioterapia1', code: '1' },
      { name: 'Fisioterapia2', code: '2' },
      { name: 'Fisioterapia3', code: '3' },
      { name: 'Fisioterapia4', code: '4' },
    ];

    this.formGroup = new FormGroup({
        name: new FormControl(''),
        date: new FormControl(''),
        procedure: new FormControl(''),
        time: new FormControl(''),
      });
  }

}
