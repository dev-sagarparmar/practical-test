import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup;
  signUpForm: FormGroup;
  radiobutton: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      password: new FormControl(null, Validators.compose([Validators.required])),
    });

    this.signUpForm = this.formBuilder.group({
      firstname: new FormControl(null, Validators.compose([Validators.required])),
      lastname: new FormControl(null, Validators.compose([Validators.required])),
      middlename: [''],
      email: new FormControl(null, Validators.compose([Validators.required, Validators.email])),
      profile_picture: [''],
      password: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  ngOnInit(): void { }

  submitLoginForm() {
    const data = this.loginForm.value;
    this.authService.login(data).subscribe((result: any) => {
      if (result.statusCode === 200) {
        const { data: { token, id } } = result;
        this.router.navigate([`/dashboard/${id}`]);
        localStorage.setItem('token', token);
      } else {
        alert(result.message)
      }
    }, (error) => {
      this.loginForm.reset();
      alert('Incorrect Username/Password');
    });
  }

  registerUser() {
    const data = this.signUpForm.value;
    this.authService.registerUser(data).subscribe((result: any) => {
      alert(result.message);
    }, (error) => {
      this.loginForm.reset();
      alert('Issue while registering user.');
    });
  }
}
