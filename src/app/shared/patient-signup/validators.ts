import {
  AbstractControl,
  AsyncValidatorFn,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { AuthServiceService } from 'src/app/service/auth-service.service';



export function firstNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log('first name validator' + control.value);
    return null;
  };
}




export function passwordValidator(): ValidatorFn {
  let fun1 = (form: AbstractControl): ValidationErrors | null => {
    //let password: string = form.get('password')?.value;
    let password: string = form.get("password")?.value;
    let password1 = form.get("firstName")?.value;
    let confirmPassword: string = form.get("confirmPassword")?.value;
    console.log('password value ' + password);
    console.log('confirm password value ' + confirmPassword);
    if (password == confirmPassword) {
      return { errorMessage: 'Password should match' };
    } else {
      return null;
    }
  };

  return fun1;
}




// export function MustMatch(controlName: string, matchingControlName: string) {
//   return (formGroup: FormGroup) => {
//       const control = formGroup.controls[controlName];
//       const matchingControl = formGroup.controls[matchingControlName];

//       if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
//           // return if another validator has already found an error on the matchingControl
//           return;
//       }

//       // set error on matchingControl if validation fails
//       if (control.value !== matchingControl.value) {
//           matchingControl.setErrors({ mustMatch: true });
//       } else {
//           matchingControl.setErrors(null);
//       }
//   }


// export function userExistsValidator(user: AuthServiceService):AsyncValidatorFn  {
//   return (control: AbstractControl) => {
//       return user.findUserByEmail(control.value)
//           .pipe(
//               map(user => user ? {userExists:true} : null)
//           );
//   }
// }
