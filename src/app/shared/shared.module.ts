import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { PatientSignupComponent } from './patient-signup/patient-signup.component';

import { MatRadioModule } from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedProfileComponent } from './shared-profile/shared-profile.component';
import { PatientDiagnosisComponent } from './patient-diagnosis/patient-diagnosis.component';
import { PatientSharedInfoComponent } from './patient-shared-info/patient-shared-info.component';
import { VitalFormComponent } from './vital-form/vital-form.component';
import { MedicationFormComponent } from './medication-form/medication-form.component';
import { PatientVisitInfoComponent } from './patient-visit-info/patient-visit-info.component';
import { PatientVisitInfoListComponent } from './patient-visit-info-list/patient-visit-info-list.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PatientSignupComponent,
    SharedProfileComponent,
    PatientDiagnosisComponent,
    PatientSharedInfoComponent,
    VitalFormComponent,
    MedicationFormComponent,
    PatientVisitInfoComponent,
    PatientVisitInfoListComponent,
  ],
  imports: [
 MatTabsModule,
 MatTableModule,
    CommonModule,
    MatRadioModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    Ng2TelInputModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatTreeModule,
    MatSidenavModule,
    
    MatExpansionModule,
   
    MatToolbarModule,
    MatCardModule,
    MatIconModule,

  ],
  exports: [
    HeaderComponent,
    FooterComponent ,
    SharedProfileComponent,
    PatientVisitInfoListComponent
]
})
export class SharedModule { }
