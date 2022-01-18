export class Allergy{
    public allergyId!:number;
    constructor(
       public master_id:MasterAllergy|null|undefined,
       public isAllergyFatal:string
        ){}
}
export class AllergyType{
    constructor(
        public id:any,
        public value:string,
        public clinicalInformation:string,
    ){}
}
export class AllergyName{
    constructor(
        public id:any,
        public value:string,
        public AtypeV:string,
    ){}
}

export class AllergyClinicalInformation{
    constructor(
        public id:any,
        public value:string

    ){}
}
export class MasterAllergy{
    public masterallergyId!:number;
    constructor(
    public allergyType:string,
    public allergyName:string,
    public allergyDescription:string,
    public allergyClinicalInformation:string
    ){}
}
