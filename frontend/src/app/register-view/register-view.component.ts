import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterViewService } from './register-view.service';


@Component({
  selector: 'app-register-view',
  templateUrl: './register-view.component.html',
  styleUrls: ['./register-view.component.css']
})
export class RegisterViewComponent implements OnInit {

  signUpForm: FormGroup;
  userDetails: any;
  editDetails: any = false;

  constructor(
    private registerViewService: RegisterViewService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    this.signUpForm = this.formBuilder.group({
      firstname: new FormControl(null, Validators.compose([Validators.required])),
      lastname: new FormControl(null, Validators.compose([Validators.required])),
      middlename: [''],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getUserData(id);
  }

  getUserData(id: any) {
    this.registerViewService.getUser(id).subscribe((result: any) => {
      const { data } = result;
      this.userDetails = data;
      this.signUpForm.patchValue({
        firstname: data.firstname,
        lastname: data.lastname,
        middlename: data.middlename,
      });
    }, (error) => {
      alert('Issue while fetching user data.\nTry logging in again.');
      this.router.navigate(['/dashboard']);
    });
  }

  get signUpFormControls(): any {
    return this.signUpForm['controls'];
  }
  
  editUserDetail() {
    const data = { id: this.userDetails.id, ...this.signUpForm.value };
    this.registerViewService.updateUser(data).subscribe((result: any) => {
      this.ngOnInit();
      this.editDetails = false
      alert('User edited successfully.');
    }, (error) => {
      alert('Issue while saving user data.');
      this.editDetails = false
    });
  }

  deleteUser() {
    this.registerViewService.deleteUser(this.userDetails.id).subscribe((result: any) => {
      this.signUpForm.reset();
      alert('User deleted successfully.');
      this.logoutUser();
    }, (error) => {
      alert('Issue while saving user data.');
      this.editDetails = false
    });
  }

  logoutUser() {
    this.router.navigate(['/']);
    localStorage.removeItem('token');
  }
}
