import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-appointmet-scheduling1',
  templateUrl: './appointmet-scheduling1.component.html',
  styleUrls: ['./appointmet-scheduling1.component.css'],
})
export class AppointmetScheduling1Component implements OnInit {
  contactForm: FormGroup = new FormGroup({});
  selected = '';
  message = '';
  players = [
    'Sachin ',
    'Rohit',
    'Aditya',
    'Nikhil',
    'Shubhangi',
    ' Shital ',
    'Mahesh   ',
    'Priyanka',
  ];

  availableTimeSlots = [
    '9AM - 10AM ',
    '10AM - 11AM',
    '11AM - 12AM',
    '12AM - 1PM',
    '1PM - 2PM',
    '2PM - 3PM',
    '3PM - 4PM   ',
    '4PM - 5PM',
    '5PM - 6PM',
  ];

  physicians: any = [];
  physicianName: any = [];
  patientId: any = [];
  patients:any =[];
  constructor(
    public fb: FormBuilder,
    private authservice: AuthServiceService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadusers();
    this.contactForm = this.fb.group({});
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  onCreate() {
    this.message = 'Appointment created successfully';
  }
  onUpdate() {
    this.message = 'Appointment updated successfully';
  }

  onDelete() {
    this.message = 'Appointment Deleted successfully';
  }

  update(e: any) {
    this.selected = e.target.value;
  }

  onFormSubmit() {
    console.log(this.contactForm);
    console.log(this.loadusers());
    this.loadusers();
  }

  loadusers() {
    return this.authservice.getUsers().subscribe((data: {}) => {
      this.physicians = data;

      for (let phy of this.physicians) {
        this.physicianName.push(phy.name);
      }

      console.log(this.physicianName);
      this.physicians.splice(0, 1);
    });
  }


  
  loadPatientDetails() {
    return this.authservice.getUsers().subscribe((data: {}) => {
      this.patients = data;

      for (let phy of this.patients) {
        this.patientId.push(phy.id);
      }

      console.log(this.patientId);
      this.patients.splice(0, 1);
    });
  }
}
