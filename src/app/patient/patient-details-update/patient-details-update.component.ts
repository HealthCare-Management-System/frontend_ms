import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Allergy, MasterAllergy } from 'src/app/models/allergy.model';
import { Demographic } from 'src/app/models/demographic.model';
import { PatientDetails } from 'src/app/models/PatientDetails.model';
import { User } from 'src/app/models/user.model';
import { AllergyService } from 'src/app/service/allergy.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DemographicService } from 'src/app/service/demographic.service';


@Component({
  selector: 'app-patient-details-update',
  templateUrl: './patient-details-update.component.html',
  styleUrls: ['./patient-details-update.component.css']
})
export class PatientDetailsUpdateComponent implements OnInit {
  birthDate!:string;
  demographicId: any;
  selectedValue = '';
  selectedName!: String;
  selectedType = 'yes';
  age!:number|undefined;
  todisableWholePage!:string;
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() toInformPatientDeatilsComponentFromAppointment!: string;
  successMsg!: string;
  AlCLinicalInformation: any[] = [];
  AlDescription: any[] = [];
  allergyType: any[] = [];
  allergyName: any[] = [];
  master!: MasterAllergy;
  newAllergy!: string;
  loggedinUser?: User | null;
  patientDetails!: PatientDetails;
  contactForm!: FormGroup;
  allergyForm!: FormGroup;
  emergencyContactForm!: FormGroup;
  demographicObj!: Demographic | null | undefined;
  moreAllergyList: any = [];
  obj!: PatientDetails;
  displayedColumns: string[] = ['allergyType', 'allergyName', 'allergyDescription', 'allergyClinicalInformation', 'is Allergy Fatal', 'Delete'];
  displayedColumns1: string[] = ['allergyType', 'allergyName', 'allergyDescription', 'allergyClinicalInformation', 'is Allergy Fatal'];
  dataSource: any = [];
  constructor(private _formBuilder: FormBuilder, private demographicService: DemographicService, private authService: AuthServiceService, private allergyService: AllergyService, public router: Router) { }

  ngOnInit(): void {
    this. todisableWholePage='yes';
    this.loggedinUser = this.authService.isLoggedIn();
    this.loadPatientDetails();
    this.allergyForm = this._formBuilder.group({
      AllergyN: ['', Validators.required],
      AllergyT: ['', Validators.required],
      AllergyD: ['', Validators.required],
      AllergyC: ['', Validators.required],
      AllergyF: ['', Validators.required],
    });
    this.contactForm = this._formBuilder.group({
      gender: ['', Validators.required],
      DOB: ['', Validators.required],
      Age: ['', Validators.required],
      addr1: ['', Validators.required],
      langKnown: ['', Validators.required],
      Race: ['', Validators.required],
      ethnicity: ['', Validators.required],
      sel3: ['', Validators.required],

    });
    this.emergencyContactForm = this._formBuilder.group({

      emTitle: ['', Validators.required],
      emFirstName: ['', Validators.required],
      emLastName: ['', Validators.required],
      emPhone: ['', Validators.required],
      emEmail: ['', Validators.required],
      Relation: ['', Validators.required],
      sel2: ['', Validators.required],
      emAddress: ['', Validators.required],

    });
    this.getMasterAllergies();


  }
  getMasterAllergies() {
    this.allergyService.getMasterAllergies().subscribe((data: MasterAllergy) => {
      this.master = data;

    console.log("the master allergies");
    console.log(this.master);
      this.fetchAllergyType(this.master);
      
    });
  }
  fetchAllergyType(master: any) {
    console.log("to get single coulumn");
    this.allergyType = [...new Set(master.map((item:any) => item.allergyType))];
    this.allergyType.push('Others')
    this.allergyType = [...new Set(master.map((item:any) => item.allergyType))];
    console.log(this.allergyType);
    
  }
  onChangeType(newValue: any) {
    console.log("if it is others..")
    
    console.log(newValue);
    this.selectedValue='';
    this.selectedName='';
    if(newValue==='Others'){
      this.selectedName=newValue;
      this.selectedType='';
    }else{
      this.selectedValue=newValue;
    }
    let i=0;
    while(i<this.allergyName.length){
      this.allergyName.pop();
    }
      this.fetchAllergyName(this.master,newValue);
  }
  fetchAllergyName( master: any,newValue:any) {
    // this.allergyName=master.filter((item:any)=>item.allergyType==newValue);
    
    for(var m of master){
      if(m.allergyType.match(newValue)){
      this.allergyName.push(m.allergyName);}
      }
      console.log('the subthings under animal');
      console.log(this.allergyName);
      this.allergyName=[...new Set(this.allergyName.map((item:any) => item))];
      console.log(this.allergyName);
    }
    onChangeName(event:any){
      this.fetchAllergyDescription(this.master,event);
    }
    fetchAllergyDescription(master: any, event: any) {
      for(var m of master){
        if(m.allergyName.match(event)&&m.allergyType.match(this.allergyForm.value.AllergyT)){
          this.AlDescription.push(m.allergyDescription);
        }
        }
        this.AlDescription=[...new Set(this.AlDescription.map((item:any) => item))];
        console.log(this.AlDescription);
    }
    onChangeDescription(event:any){
      console.log(event);
      this.fetchAllergyClinicalInformtion(this.master,event);
    }
    fetchAllergyClinicalInformtion(master:any, event: any) {
      console.log(master);
      for(var m of master){
        
        if(m.allergyDescription!==null){
          console.log(m.allergyDescription);
          if(m.allergyDescription.match(event)&&m.allergyName.match(this.allergyForm.value.AllergyN)&&m.allergyType.match(this.allergyForm.value.AllergyT)){
          
          this.AlCLinicalInformation.push(m.allergyClinicalInformation);
          console.log(m.allergyClinicalInformation);
        }
        
        }
        
        }
        this.AlCLinicalInformation=[...new Set(this.AlCLinicalInformation.map((item:any) => item))];
        console.log(this.AlCLinicalInformation);
    }

  loadPatientDetails() {
    this.demographicService.getPatientDemographicsById(this.loggedinUser?.id).subscribe((data: any) => {
      this.patientDetails = data;
      console.log(this.patientDetails);
      console.log(this.patientDetails.demographic?.emgrFname);
      this.dataSource = this.patientDetails.allergies;
      console.log(this.dataSource);
      console.log("fetching id");
      this.age=this.patientDetails.demographic?.age;
      console.log(this.patientDetails.demographic?.id);
      this.removePreviousAllergies(this.dataSource);
    });
  }
  removePreviousAllergies(dataSource: any) {
    for(var d of dataSource){
      console.log(d);
    }
  }
  onChange(event: any) {

  }
  onSubmit() {
    let gender = this.contactForm.value.gender;
    let DOB = this.contactForm.value.DOB;
   // this.birthDate=this.contactForm.value.DOB.toDateString();
    let age = this.contactForm.value.Age;
    let addr1 = this.contactForm.value.addr1;
    let Race = this.contactForm.value.Race;
    let emgrTitle = this.emergencyContactForm.value.emTitle;
    let emFirstName = this.emergencyContactForm.value.emFirstName;
    let emLastName = this.emergencyContactForm.value.emLastName;
    let emgrEmail = this.emergencyContactForm.value.emEmail;
    let emgrContactNo = this.emergencyContactForm.value.emPhone;
    let Relation = this.emergencyContactForm.value.Relation;
    let ethnicity = this.contactForm.value.ethnicity;
    let langKnown = this.contactForm.value.langKnown;
    let sel2 = this.emergencyContactForm.value.sel2;
    let sel3 = this.contactForm.value.sel3;
    let emAddress = this.emergencyContactForm.value.emAddress;
    this.demographicObj = new Demographic(DOB, age, gender, Race, ethnicity, langKnown, addr1, emgrTitle, emFirstName, emLastName, emgrEmail, emgrContactNo, Relation, emAddress,sel2,  sel3);
    this.demographicId = this.patientDetails.demographic?.id;
    // this.demographicObj.id=this.demographicId;
    // console.log(this.demographicObj);
    if (this.contactForm.value.sel3 === 'no' && this.patientDetails.demographic?.allergyCheck === 'no') {
      this.obj = new PatientDetails(this.demographicObj, this.loggedinUser, this.moreAllergyList);
      this.obj.id = this.patientDetails.id;
      console.log("from component ts file");
      console.log(this.obj);
      console.log(this.patientDetails.id);
      console.log(this.obj);
      this.successMsg = 'Successfully Updated';
      // this.demographicService.updatePatientDetails(this.patientDetails.id, this.obj).subscribe(data => {
      //   console.log(data);
      //   // alert("successfully deleted");
      //   this.loadPatientDetails();
      // });
    }
  }
  addAllergy() {
  }
  deleteAllergy(element: Allergy) {
    console.log("deleting by id");
    console.log(element.allergyId);
    this.allergyService.deleteAllergy(element.allergyId).subscribe(data => {
      console.log(data);
      // alert("successfully deleted");
      this.loadPatientDetails();
    });
  }
  addNewAllergy() {
    this.newAllergy = 'yes';
  }
  submitWithAllergy() {
    this.onSubmit();
    this.dataSource = this.addToPreviousAllergy(this.moreAllergyList);
    console.log("all allergies");
    console.log(this.dataSource);
    this.obj = new PatientDetails(this.demographicObj, this.loggedinUser, this.dataSource);
    console.log("the patient details with newly added allergies:");
    console.log(this.obj);

    // this.demographicService.updatePatientDetails(this.patientDetails.id, this.obj).subscribe(data => {
    //   console.log(data);
    //   // alert("successfully deleted");
    //   this.loadPatientDetails();
    // });
    this.successMsg = 'Successfully Updated';

   
  }
  addNewItem() {
    this.newItemEvent.emit("to call appointment component");
  }
  addMore() {
    let allergyN = this.allergyForm.value.AllergyN;
    let allergyT = this.allergyForm.value.AllergyT;
    let allergyD = this.allergyForm.value.AllergyD;
    let allergyC = this.allergyForm.value.AllergyC;
    let allergyF = this.allergyForm.value.AllergyF;
    let obj = this.getMasterAllergyId(this.master, allergyT, allergyN, allergyD, allergyC);
    let allergyObj: Allergy = new Allergy(obj, allergyF);
    this.addtoList(allergyObj);
    this.moreAllergyList.push(allergyObj);
    this.reset();
  }
  addtoList(allergyObj: Allergy) {
    //this.ngOnInit();
    this.dataSource.push(allergyObj);
    console.log("the datasource with newly added allergies");
    console.log(this.dataSource);

  }
  getMasterAllergyId(master: any, allergyT: any, allergyN: any, allergyD: any, allergyC: any): MasterAllergy {
    let id!: number;
    let obj = new MasterAllergy(allergyT, allergyN, allergyD, allergyC);
    for (var m of master) {
      if (m.allergyType.match(allergyT) && m.allergyClinicalInformation.match(allergyC) && m.allergyDescription.match(allergyD) && m.allergyName.match(allergyN)) {
        obj.masterallergyId = m.masterallergyId;
      }
    }
    return obj;
  }
  addToPreviousAllergy(moreAllergyList: any): Allergy {
    for (var m of moreAllergyList) {
      this.dataSource.push(m);
    }
    return this.dataSource;
  }
  reset() {
    this.selectedType = 'yes';
    this.selectedName = '';
    this.allergyForm.reset();
  }
  deleteAllAllergis() {

    this.allergyService.deleteAllergiesByPatientId(this.patientDetails.id).subscribe(data => {
      console.log(data);
      // alert("successfully deleted");
      this.loadPatientDetails();
    });
    this.loadPatientDetails();
    this.newAllergy = 'no';



  }
  done() {
    this.newAllergy = 'no';
    let allergyN = this.allergyForm.value.AllergyN;
    let allergyT = this.allergyForm.value.AllergyT;
    let allergyD = this.allergyForm.value.AllergyD;
    let allergyC = this.allergyForm.value.AllergyC;
    let allergyF = this.allergyForm.value.AllergyF;
    let obj = this.getMasterAllergyId(this.master, allergyT, allergyN, allergyD, allergyC);
    let allergyObj: Allergy = new Allergy(obj, allergyF);
    this.moreAllergyList.push(allergyObj);
    this.loadPatientDetails();
  }
  goBack() {
    if (this.toInformPatientDeatilsComponentFromAppointment === 'fromAppointment') {
      this. todisableWholePage='';
      this.addNewItem();
    }
    else {
      this.router.navigate(['/patient/dashboard/patient-profile']);
    }
  }
  CalAge(event:any){
    let d= this.contactForm.value.DOB;
    let d1 = new Date(d).getFullYear();
    let t = new Date().getFullYear();
    this.age=t-d1;
    console.log(this.age);
  }
  cancel(){
    this.newAllergy='no';
  }
}
