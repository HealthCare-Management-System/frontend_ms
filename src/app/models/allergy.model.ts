export class Allergy{
    public allergyId!:number;
    constructor(
       public masterId:MasterAllergy|null|undefined,
       public isAllergyFatal:string
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
