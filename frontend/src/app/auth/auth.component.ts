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
  selectedFile: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/\S+@\S+\.\S+/)])),
      password: new FormControl(null, Validators.compose([Validators.required])),
    });

    this.signUpForm = this.formBuilder.group({
      firstname: new FormControl(null, Validators.compose([Validators.required])),
      lastname: new FormControl(null, Validators.compose([Validators.required])),
      middlename: [''],
      email: new FormControl(null, Validators.compose([Validators.required, Validators.pattern(/\S+@\S+\.\S+/)])),
      profile_picture: [''],
      password: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  ngOnInit(): void { }

  get loginFormControls(): any {
    return this.loginForm['controls'];
  }
  get signUpFormControls(): any {
    return this.signUpForm['controls'];
  }
  
  submitLoginForm() {
    const data = this.loginForm.value;
    this.authService.login(data).subscribe((result: any) => {
      if (result.statusCode === 200) {
        const { data: { token, id } } = result;
        this.router.navigate([`/dashboard`]);
        localStorage.setItem('token', token);
      } else {
        alert(result.message)
      }
    }, (error) => {
      this.loginForm.reset();
      alert('Incorrect Username/Password');
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.selectedFile = reader.result;
      };
      reader.onerror = (error) => {
        this.selectedFile = null;
      };
    }
  }

  registerUser() {
    const data = this.signUpForm.value;
    data.profile_picture = this.selectedFile;
    this.authService.registerUser(data).subscribe((result: any) => {
      alert(result.message);
    }, (error) => {
      this.loginForm.reset();
      alert('Issue while registering user.');
    });
  }
}
