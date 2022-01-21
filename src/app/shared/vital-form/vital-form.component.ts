import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vital-form',
  templateUrl: './vital-form.component.html',
  styleUrls: ['./vital-form.component.css'],
})
export class VitalFormComponent implements OnInit {
  VitalSignForm: FormGroup = new FormGroup({});

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.VitalSignForm = this.fb.group({
      height: ['', Validators.required],
      weight: ['', Validators.required],
      bloodpressure: ['', Validators.required],
      bodytemperature: ['', Validators.required],
      respirationrate: ['', Validators.required],
    });
  }

  onVitalSignFormSubmit() {
    let height = this.VitalSignForm.value.height;
    let weight = this.VitalSignForm.value.weight;
    let bloodpressure = this.VitalSignForm.value.bloodpressure;
    let bodytemperature = this.VitalSignForm.value.bodytemperature;
    let respirationrate = this.VitalSignForm.value.respirationrate;

    console.log(this.VitalSignForm.value);
  }
}
