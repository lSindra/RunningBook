import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {MatSnackBar} from '@angular/material';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthProcessService, FirestoreSyncService } from 'ngx-auth-firebaseui';
import { UserService } from '../../_services/user.service';
import { RunningUserModel } from '../../_models/user-model';
import { cleanUserModel } from '../../_models/user-model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  editMode: boolean;
  updateFormGroup: FormGroup;
  updateNameFormControl: AbstractControl;
  updateEmailFormControl: AbstractControl;
  updatePhoneNumberFormControl: AbstractControl;
  updatePasswordFormControl: AbstractControl;
  updateUsernameFormControl: AbstractControl;
  updateBirthdayFormControl: AbstractControl;
  updateCityFormControl: AbstractControl;
  user: RunningUserModel;

  constructor(public auth: AngularFireAuth,
              public authProcess: AuthProcessService,
              private _fireStoreService: FirestoreSyncService,
              private snackBar: MatSnackBar,
              private userService: UserService) {}

  ngOnInit(): void {
    this.initUpdateForm();
  }

  protected initUpdateForm() {
    this.userService.getUserByUID(this.auth.auth.currentUser.uid).subscribe(
      (user)  => { this.user = cleanUserModel(user) },
      (error) => { console.log(error) },
      ()      => { this.populateUpdateForm() }
    )
    return this.user;
  }

  protected populateUpdateForm() {
    this.updateFormGroup = new FormGroup({
      
      name: this.updateNameFormControl = new FormControl(
        {value: this.user.displayName, disabled: true},
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ]
      ),
      
      email: this.updateEmailFormControl = new FormControl(
          {value: this.user.email, disabled: true},
          [
            Validators.required
          ]),
          
      phoneNumber: this.updatePhoneNumberFormControl = new FormControl('',
        []),
      
      username: this.updateUsernameFormControl = new FormControl(
          {value: "", disabled: true},
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(25),
          ]
      ),

      birthday: this.updateBirthdayFormControl = new FormControl(
          {value: this.user.birthday, disabled: true},
          []
      ),

      city: this.updateCityFormControl = new FormControl(
          {value: this.user.city, disabled: true},
          [
            Validators.minLength(2),
            Validators.maxLength(25),
          ]
      )
    });

    this.updateFormGroup.enable();
  }
      
  changeEditMode() {
    this.editMode = !this.editMode;
  }

  reset() {
    this.updateFormGroup.disable();
  }

  async save() {
    if (this.updateFormGroup.dirty) {
      const authUser = this.auth.auth.currentUser;
      const snackBarMsg: string[] = [];

      try {
        if (this.updateNameFormControl.dirty && this.updateNameFormControl.valid) {
          await authUser.updateProfile({displayName: this.updateNameFormControl.value, photoURL: null});
          snackBarMsg.push(`your name has been update to ${authUser.displayName}`);
        }

        if (this.updateEmailFormControl.dirty && this.updateEmailFormControl.valid) {
          await authUser.updateEmail(this.updateEmailFormControl.value);
          snackBarMsg.push(`your email has been update to ${authUser.email}`);
        }

        if (this.updatePhoneNumberFormControl.dirty && this.updatePhoneNumberFormControl.valid) {
          await authUser.updatePhoneNumber(this.updatePhoneNumberFormControl.value);
          console.log('phone number = ', this.updatePhoneNumberFormControl.value);
          snackBarMsg.push(`your phone number has been update to ${authUser.phoneNumber}`);
        }
        if (this.updateUsernameFormControl.dirty && this.updateUsernameFormControl.valid) {
          this.user.username = this.updateUsernameFormControl.value;
          await this.userService.updateUser(this.user);
          snackBarMsg.push(`your username has been update to ${this.updateUsernameFormControl.value}`);
        }
        if (this.updateBirthdayFormControl.dirty && this.updateBirthdayFormControl.valid) {
          this.user.birthday = this.updateBirthdayFormControl.value;
          await this.userService.updateUser(this.user);
          snackBarMsg.push(`your birthday date has been update to ${this.updateBirthdayFormControl.value}`);
        }

        await this._fireStoreService.updateUserData(this.authProcess.parseUserInfo(authUser));

      } catch (error) {
        error.message ? this.snackBar.open(error.message, 'Ok') : this.snackBar.open(error, 'Ok');
        console.error(error);
        console.error(error.code);
        console.error(error.message);
      }

      if (snackBarMsg.length > 0) {
        this.snackBar.open(snackBarMsg.join('\\n'), 'Ok');
      }
    }

    this.editMode = false;
  }

  async deleteAccount() {
    this.auth.auth.signOut();
  }
}