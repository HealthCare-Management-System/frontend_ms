export class LockUnlockUsers {
    'id': number;
    'name': string;
    'role': string;
    'status': string;

    

    constructor(id: number,name: string,role: string,status: string){
      this.id=id,
      this.name=name,
      this.role=role,
      this.status=status

    }
  }