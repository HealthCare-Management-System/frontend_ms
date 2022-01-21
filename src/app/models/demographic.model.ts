import { User } from "./user.model";

export class Demographic{
    public id!:number;
    constructor(
        public birthDate:string,
        public age:number,
        public gender:string,
        public race:string,
        public ethnicity:string,
        public langKnown:string,
        public address:string,
        public emgrTitle:string,
        public emgrFname:string,
        public emgrLname:string,
        public emgrEmail:string,
        public emgrContactNo:string,
        public emgrRelation:string,
        public emgrAddress:string,
        public ppp:string,
        public allergyCheck:string
       
    ){}
}


  