import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporateRegisterationComponent } from './corporate-registeration/corporate-registeration.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
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
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '../shared/shared.module';
import { InboxComponent } from './inbox/inbox.component';
import { NursePatientInfoComponent } from './nurse/nurse-patient-info/nurse-patient-info.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { MatTableModule } from '@angular/material/table';
import { PatientSignupComponent } from '../shared/patient-signup/patient-signup.component';

import { HttpClientModule } from '@angular/common/http';

import { MatSort, MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';

import { PatientManagementComponent } from './admin/patient-management/patient-management.component';
import { ApproveRequestsComponent } from './approve-requests/approve-requests.component';
import { ChatInboxComponent } from './chat-inbox/chat-inbox.component';
import { UpdateNotesComponent } from './update-notes/update-notes.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { MatBadgeModule } from '@angular/material/badge';
import { VisitPatientComponent } from '../patient/visit-patient/visit-patient.component';

import { ActivePatientsComponent } from './admin/active-patients/active-patients.component';
import { DeactivePatientsComponent } from './admin/deactive-patients/deactive-patients.component';
import { BlockPatientsComponent } from './admin/block-patients/block-patients.component';

import { ActiveCoUsersComponent } from './admin/active-co-users/active-co-users.component';
import { DeactiveCoUsersComponent } from './admin/deactive-co-users/deactive-co-users.component';
import { BlockCoUsersComponent } from './admin/block-co-users/block-co-users.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { MedicationComponent } from './admin/medication/medication.component';
import { DiagnosisComponent } from './admin/diagnosis/diagnosis.component';
import { ProcedureComponent } from './admin/procedure/procedure.component';
import { AddProcedureComponent } from './admin/add-procedure/add-procedure.component';
import { AddDignosisComponent } from './admin/add-dignosis/add-dignosis.component';
import { AddMedicationComponent } from './admin/add-medication/add-medication.component';
import { PatientDiagnosisComponent } from '../shared/patient-diagnosis/patient-diagnosis.component';
import { UpdateAppointmentComponent } from '../patient/update-appointment/update-appointment.component';

const routes2: Routes = [
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: 'registration', component: CorporateRegisterationComponent },
      { path: 'nurse-patient-info', component: NursePatientInfoComponent },
      { path: 'patient-registration', component: PatientSignupComponent },
      { path: 'inbox', component: InboxComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'patient-Management', component: PatientManagementComponent },
      { path: 'approve-requests', component: ApproveRequestsComponent },
      { path: 'visit-patient/:appid', component: VisitPatientComponent },
      { path: 'active-patients', component: ActivePatientsComponent },
      { path: 'deactive-patients', component: DeactivePatientsComponent },
      { path: 'block-patients', component: BlockPatientsComponent },
      { path: 'active-co-users', component: ActiveCoUsersComponent },
      { path: 'deactive-co-users', component: DeactiveCoUsersComponent },
      { path: 'block-co-users', component: BlockCoUsersComponent },
      { path: 'patient-diagnosis', component: PatientDiagnosisComponent },
      { path: 'chat-inbox', component: ChatInboxComponent },

      { path: 'medication', component: MedicationComponent },

      { path: 'diagnosis', component: DiagnosisComponent },
      { path: 'procedure', component: ProcedureComponent },
    ],
  },
];
@NgModule({
  declarations: [
    CorporateRegisterationComponent,
    AdminDashboardComponent,
    InboxComponent,
    NursePatientInfoComponent,

    PatientManagementComponent,
    ApproveRequestsComponent,
    ChatInboxComponent,
    UpdateNotesComponent,
   
    ActivePatientsComponent,
    DeactivePatientsComponent,
    BlockPatientsComponent,
    ActiveCoUsersComponent,
    DeactiveCoUsersComponent,
    BlockCoUsersComponent,
    UserManagementComponent,
    MedicationComponent,
    DiagnosisComponent,
    ProcedureComponent,
    AddProcedureComponent,
    AddDignosisComponent,
    AddMedicationComponent,
    CorporateRegisterationComponent,
    UpdateAppointmentComponent,
  ],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    FormsModule,
    MatTableModule,
    MatSelectModule,
    Ng2TelInputModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forChild(routes2),
    SharedModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTreeModule,
    MatSidenavModule,
    MatIconModule,
    MatExpansionModule,
    MatRadioModule,
    MatToolbarModule,
    MatDividerModule,
    MatCardModule,
    MatTableModule,
    HttpClientModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  entryComponents: [CorporateRegisterationComponent],
})
export class AdminModule {}
