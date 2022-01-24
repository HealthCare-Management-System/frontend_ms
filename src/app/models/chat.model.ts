import { User } from './user.model';

export class NOTES {
  'notesid': number;
  'sendDate': Date;
  'message': string;
  'urgencyLevel': string;
  'deleted': string;
  'read': string;
  'receiverId': User;
  'senderId': User;
  constructor() {}
}
