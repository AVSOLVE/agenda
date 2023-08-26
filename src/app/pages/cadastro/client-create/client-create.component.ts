import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms";
import { NameValueInterface } from "../../shared/NameValue.interface";
import { Router } from "@angular/router";
import { AppServiceService } from "src/app/AppService.service";

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})

export class ClientCreateComponent implements OnInit {
  genders = ['Masculino','Feminino'];
  userForm!: FormGroup;
  currentDate = new Date();

  constructor(
    private _router: Router,
    private _appService: AppServiceService
    ) { }

  ngOnInit() {
    this.clearUserForm();
  }

  clearUserForm(): void {
    this.userForm = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      gender: new FormControl(''),
      dob: new FormControl(''),
    });
  }

  saveCliente(): void {
    const data = this.userForm.value;
    const table = 'person';
    this._appService.saveOne(data, table).subscribe({});
  }

  cancel() {
    this.clearUserForm();
    this._router.navigate(['/home'])
  }
}
