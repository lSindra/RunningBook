import {Component} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatSnackBar} from '@angular/material';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthProcessService, FirestoreSyncService, Theme } from 'ngx-auth-firebaseui';
import { RunningUserModel } from '../_models/user-model';
import { populateRunningBookUserModel } from '../_models/populators/user-model-populator';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent {
  editMode: boolean;

  updateFormGroup: FormGroup;

  updateNameFormControl: AbstractControl;
  updateEmailFormControl: AbstractControl;
  updatePhoneNumberFormControl: AbstractControl;
  updatePasswordFormControl: AbstractControl;
  updateUsernameFormControl: AbstractControl;
  updateBirthdayFormControl: AbstractControl;
  updateCityFormControl: AbstractControl;

  constructor(public auth: AngularFireAuth,
              public authProcess: AuthProcessService,
              private _fireStoreService: FirestoreSyncService,
              private snackBar: MatSnackBar) {
  }

  protected initUpdateFormGroup() {
    const currentUser: RunningUserModel = populateRunningBookUserModel(this.auth.auth.currentUser);

    this.updateFormGroup = new FormGroup({
      
      name: this.updateNameFormControl = new FormControl(
        {value: currentUser.displayName, disabled: true},
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ]
        ),
        
        email: this.updateEmailFormControl = new FormControl(
          {value: currentUser.email, disabled: true},
          [
            Validators.required
          ]),
          
          phoneNumber: this.updatePhoneNumberFormControl = new FormControl('',
          []),
        
        username: this.updateUsernameFormControl = new FormControl(
          {value: currentUser.username, disabled: true},
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(25),
          ]
        ),

        birthday: this.updateUsernameFormControl = new FormControl(
          {value: currentUser.birthday, disabled: true},
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(25),
          ]
        ),

        city: this.updateUsernameFormControl = new FormControl(
          {value: currentUser.city, disabled: true},
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(25),
          ]
        ),
      });

        this.updateFormGroup.enable();
      }
      
  changeEditMode() {
    this.editMode = !this.editMode;

    this.editMode ? this.initUpdateFormGroup() : this.reset();
  }

  reset() {
    this.updateFormGroup.reset();
    this.updateFormGroup.disable();
    this.updateFormGroup = null;
  }

  async save() {
    if (this.updateFormGroup.dirty) {
      const user = this.auth.auth.currentUser;
      // user.updateProfile()
      // user.updateEmail()

      const snackBarMsg: string[] = [];

      try {
        if (this.updateNameFormControl.dirty) {
          await user.updateProfile({displayName: this.updateNameFormControl.value, photoURL: null});
          snackBarMsg.push(`your name has been update to ${user.displayName}`);
        }

        if (this.updateEmailFormControl.dirty) {
          await user.updateEmail(this.updateEmailFormControl.value);
          snackBarMsg.push(`your email has been update to ${user.email}`);
        }

        if (this.updatePhoneNumberFormControl.dirty) {
          await user.updatePhoneNumber(this.updatePhoneNumberFormControl.value);
          console.log('phone number = ', this.updatePhoneNumberFormControl.value);
          snackBarMsg.push(`your phone number has been update to ${user.phoneNumber}`);
        }

        await this._fireStoreService.updateUserData(this.authProcess.parseUserInfo(user));

      } catch (error) {
        error.message ? this.snackBar.open(error.message, 'Ok') : this.snackBar.open(error, 'Ok');
        console.error(error);
        console.error(error.code);
        console.error(error.message);
      }


      if (snackBarMsg.length > 0) {
        this.snackBar.open(snackBarMsg.join('\\n'), 'Ok');
      }
      // this.updateFormGroup.reset();
    }

    this.editMode = false;
  }

  async deleteAccount() {
    try {
      const user = this.auth.auth.currentUser;

      await this.authProcess.deleteAccount();
      await this._fireStoreService.deleteUserData(user.uid);
      this.editMode = false;
      this.snackBar.open('Your account has been successfully deleted!', 'OK', {
        duration: 5000
      })
    } catch (error) {
      console.log('Error while delete user\'s account', error);
      this.snackBar.open('Error occurred while deleting your account!', 'OK', {
        duration: 5000
      })
    }
  }

}