import { ContentObserver } from '@angular/cdk/observers';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { YearService } from '@syncfusion/ej2-angular-schedule';
import { Allergy, MasterAllergy } from 'src/app/models/allergy.model';
import { Demographic } from 'src/app/models/demographic.model';
import { PatientDetails } from 'src/app/models/PatientDetails.model';
import { User } from 'src/app/models/user.model';
import { AllergyService } from 'src/app/service/allergy.service';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { DemographicService } from 'src/app/service/demographic.service';


@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.css']
})
export class PatientDetailsComponent implements OnInit {
  default!:number;
  EnableAllergyDisplay!:string;
  emergencyAddress!:string;
  todisableWholePage!:string;
  @Output() newItemEvent = new EventEmitter<string>();
  @Input() toInformPatientDeatilsComponentFromAppointment!: string;
  contactForm!: FormGroup;
  allergyForm!:FormGroup;
  emergencyContactForm!:FormGroup;
  display!:string;
  allergyT!:string;
  displayedColumns: string[] = ['allergyType', 'allergyName', 'allergyDescription', 'allergyClinicalInformation','is Allergy Fatal'];
  dataSource!: any;
  obj!:PatientDetails;
  successMsg!: string;
  age!:number;
  demographicObj!:Demographic;
  loggedinUser:User|null|undefined;
  allergyObj!:Allergy[];
  confirmation!:string;
  master!: any;
  moreAllergyList:any=[];
  AlCLinicalInformation :any[]=[];
  AlDescription:any[]=[];
  allergyType: any[]= [];
  allergyName:any[]=[];
  allergies!: any;
  Relations=[
    {id:1,value:'father'} ,
    {id:2,value:'mother'},
    {id:3,value:'sibling'},
    {id:4,value:'spouse'},
    {id:5,value:'friend'}
   ];
  selectedValue!:string;
  selectedName!:String;
  selectedType='yes';
  constructor(private _formBuilder: FormBuilder,private demographicService:DemographicService,private authservice: AuthServiceService, public router: Router,private allergyService:AllergyService) { }

  ngOnInit(): void {
    this.default=1;
    this.display='';
    this. todisableWholePage='yes';
    this.allergyForm=this._formBuilder.group({
      AllergyN:['', Validators.required],
      AllergyT:['', Validators.required],
      AllergyD:['', Validators.required],
      AllergyC:['', Validators.required],
      AllergyF:['', Validators.required],
    });
    this.contactForm=this._formBuilder.group({
          gender:['', Validators.required],
      DOB:['', Validators.required],
      Age:['', Validators.required],
      addr1:['', Validators.required],
      langKnown:['', Validators.required],
      Race:['', Validators.required],
      ethnicity:['', Validators.required],
      sel3:['', Validators.required],
      
    });
    this.emergencyContactForm=this._formBuilder.group({
      // sel1:['', Validators.required],
      emTitle:['', Validators.required],
      emFirstName:['', Validators.required],
      emLastName:['', Validators.required],
      emPhone:['', Validators.required],
      emEmail:['', Validators.required],
      Relation:['', Validators.required],
      sel2:['', Validators.required],
      emAddress:['', Validators.required],
      
    });

    this.loggedinUser=this.authservice.isLoggedIn();
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
    this.allergyType.push('Others')//to get distinct type from repeated values
    //this.AlCLinicalInformation=[...new Set(master.map((item:any) => item.allergyClinicalInformation))];
    // this.AlDescription=[...new Set(master.map((item:any) => item.allergyDescription))];
    console.log(this.allergyType);
    
  }
  CalAge(event:any) {
    let d= this.contactForm.value.DOB;
    let d1 = new Date(d).getFullYear();
    let t = new Date().getFullYear();
    this.age=t-d1;
  }
  onChangeType(newValue: any) {
    console.log("if it is others..")
    
    console.log(newValue);
    this.selectedValue='';
    this.selectedName='';
    if(newValue==='Others'){
      this.selectedName=newValue;
      this.selectedType='';
      this.allergyT='';
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
  
  addMore(){
    console.log("hi ... from addmore()");
    let allergyN=this.allergyForm.value.AllergyN;
    let allergyT=this.allergyForm.value.AllergyT;
    let allergyD=this.allergyForm.value.AllergyD;
    let allergyC=this.allergyForm.value.AllergyC;
    let allergyF=this.allergyForm.value.AllergyF;
   let obj=this.getMasterAllergyId(this.master,allergyT,allergyN,allergyD,allergyC);
   console.log(obj);
    let allergyObj:Allergy=new Allergy(obj,allergyF);
    this.moreAllergyList.push(allergyObj);
   this.reset();
  }
  getMasterAllergyId(master: any, allergyT: any, allergyN: any, allergyD: any, allergyC: any) :MasterAllergy{
    let id!:number;
    
    let obj=new MasterAllergy(allergyT,allergyN,allergyD,allergyC);
    console.log(this.obj);
    for(var m of master){
      if(m.allergyType.match(allergyT)&&m.allergyClinicalInformation.match(allergyC)&&m.allergyDescription.match(allergyD)&&m.allergyName.match(allergyN))
      {        obj.masterallergyId=m.masterallergyId;
        this.RemoveElementFromFetchedMasterArray(m.masterallergyId);
      }
    }
    console.log(this.obj);
    return obj; 
  }
  RemoveElementFromFetchedMasterArray(key: number) {
    this.master=this.master.filter((item :any)=> item.masterallergyId !== key);
} 
  reset(){
    this.selectedType='yes';
    this.selectedName='';
    this.allergyForm.reset();
    
    
  }
  submitWithOutAllergy(){
    this.contactForm.value.Age=this.age;
    let gender=this.contactForm.value.gender;
    let DOB=this.contactForm.value.DOB;
    let age=this.contactForm.value.Age;
    let addr1=this.contactForm.value.addr1;
    let Race=this.contactForm.value.Race;
    let emgrTitle=this.emergencyContactForm.value.emTitle;
    let emFirstName=this.emergencyContactForm.value.emFirstName;
    let emLastName=this.emergencyContactForm.value.emLastName;
    let emgrEmail=this.emergencyContactForm.value.emEmail;
    let emgrContactNo=this.emergencyContactForm.value.emPhone;
    let Relation=this.emergencyContactForm.value.Relation;
    let ethnicity=this.contactForm.value.ethnicity;
   let langKnown=this.contactForm.value.langKnown;
    let sel2=this.emergencyContactForm.value.sel2;
    let sel3=this.contactForm.value.sel3;
    let emAddress=this.emergencyContactForm.value.emAddress;
    this.demographicObj=new Demographic(DOB,age,gender,Race,ethnicity,langKnown,addr1,emgrTitle,emFirstName,emLastName,emgrEmail,emgrContactNo,Relation,emAddress,sel2,sel3); 
    console.log("the demogrpahic information without allergies");
    console.log(this.demographicObj);
    if(this.contactForm.value.sel3==='no'){
    
    this.obj=new PatientDetails(this.demographicObj,this.loggedinUser,this.moreAllergyList);
    console.log(this.obj);
    
  this.demographicService.savePatientDemographic(this.obj).subscribe(data => {
    console.log(data);
    // alert("successfully deleted");
    // this.loadPatientDetails();
  });
    this.successMsg = `Successfully Submitted`;
  }
    console.log(this.obj);
  }
  submitWithAllergy(){
    this.submitWithOutAllergy();
    console.log("from submit form");
    let allergyN=this.allergyForm.value.AllergyN;
    let allergyT=this.allergyForm.value.AllergyT;
    let allergyD=this.allergyForm.value.AllergyD;
    let allergyC=this.allergyForm.value.AllergyC;
    let allergyF=this.allergyForm.value.AllergyF;
    let objA=this. getMasterAllergyId(this.master,allergyT,allergyN,allergyD,allergyC);
    let allergyObj:Allergy=new Allergy(objA,allergyF);
    console.log("the allergy");
   this.moreAllergyList.push(allergyObj);
    console.log(this.moreAllergyList);
    this.dataSource=this.moreAllergyList;
    this.obj=new PatientDetails(this.demographicObj,this.loggedinUser,this.moreAllergyList);
    this.demographicService.savePatientDemographic(this.obj).subscribe();
    console.log("after submitting");
    console.log(this.obj);
    this.EnableAllergyDisplay='yes';
    this.successMsg = `Successfully Submitted`;
    this.allergyForm.reset();
    
  }
  
  addNewItem() {
    this.newItemEvent.emit("to call appointment component");
  }
  goBack(){
    if (this.toInformPatientDeatilsComponentFromAppointment === 'fromAppointment') {
      this. todisableWholePage='';
      this.addNewItem();
    }
    else {
      this.router.navigate(['/patient/dashboard/patient-profile']);
    }
  }
  forAddress1(){
    console.log("from address1");
    this.emergencyAddress=this.contactForm.value.addr1;
  }
  forAddress2(){
console.log("from Address2")
this.emergencyAddress='';
  }
  next(){
    this.forAddress1();
  }
}
export class Datepicker {
  // minDate = new Date(2017, 0, 1);
  maxDate = new Date();
}
