import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';

import { ProfileComponent } from './profile/profile.component';

import { AppointmentComponent } from './appointment/appointment.component';
import { VisitPatientComponent } from './visit-patient/visit-patient.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { PatientInboxComponent } from './patient-inbox/patient-inbox.component';
import { PatientNotesComponent } from './patient-notes/patient-notes.component';

import { ModalModule } from './_modal';
import { AppointmetScheduling1Component } from './appointmet-scheduling1/appointmet-scheduling1.component';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { PatientDetailsUpdateComponent } from './patient-details-update/patient-details-update.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { PatientDashboardDisplayComponent } from './patient-dashboard-display/patient-dashboard-display.component';

const routes3: Routes = [
  {
    path: 'dashboard',
    component: PatientDashboardComponent,
    children: [
      {path:'',component: PatientDashboardDisplayComponent},
      { path: 'patient-profile', component: ProfileComponent },
      { path: 'appointment', component: AppointmentComponent },
      { path: 'visit-patient', component: VisitPatientComponent },
      { path: 'patient-inbox', component: PatientInboxComponent },
      { path: 'patient-note', component: PatientNotesComponent },
      {
        path: 'patient-demographic-details',
        component: PatientDetailsComponent,
      },
      {path:'patient-dashboard-diaplay',component: PatientDashboardDisplayComponent},
      
      {
        path: 'patient-demographic-details-update',
        component: PatientDetailsUpdateComponent,
      },

      { path: 'visit-patient', component: VisitPatientComponent },
      { path: 'patient-inbox', component: PatientInboxComponent },
      { path: 'patient-note', component: PatientNotesComponent },
      { path: 'scheduler', component: SchedulerComponent },

      {
        path: 'appointment-scheduling1',
        component: AppointmetScheduling1Component,
      },
    ],
  },
];

@NgModule({
  declarations: [
    PatientDashboardComponent,

    ProfileComponent,

    AppointmentComponent,

    VisitPatientComponent,
    PatientInboxComponent,
    PatientNotesComponent,

    AppointmetScheduling1Component,
    PatientDetailsComponent,
    PatientDetailsUpdateComponent,
    SchedulerComponent,
    PatientDashboardDisplayComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes3),
    SharedModule,

    MatButtonModule,
    MatSlideToggleModule,
    MatNativeDateModule,

    MatDividerModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatStepperModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTreeModule,
    MatSidenavModule,
    Ng2TelInputModule,
    MatExpansionModule,
    MatRadioModule,
    MatToolbarModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatIconModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatGridListModule,
    ModalModule,
    MatFormFieldModule,
    MatInputModule,
    ScheduleModule,
  ],
})
export class PatientModule {}
