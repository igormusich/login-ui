import { Component, OnInit, HostListener, ViewChild, EventEmitter, Output, Input, ElementRef, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from '../services/login.service';
import { LoginProfile } from '../model/login-profile';

@Component({
  selector: 'app-user-id',
  templateUrl: './user-id.component.html',
  styleUrls: ['./user-id.component.css']
})
export class UserIdComponent implements OnInit {
  public signInId: FormControl;
  public signInForm: FormGroup;
  public isSubmitted: boolean = false;
  public timeoutFlag: boolean = false;
  public respErrorFlag: boolean = false;
  public inlineError: boolean = false;
  public inlineErrorFlag: boolean = false;
  public errorMessage: string = null;
  public errorHeader: string = null;
  public notificationType: string = null;
  public loading = false;

  @ViewChild('errorDisplay') errorDisplayEl: ElementRef;
  @ViewChild('inlineError') inlineErrorEl: ElementRef;
  @ViewChild('inputField') inputFieldEl: ElementRef;
  @ViewChild('timeout') timeoutEl: ElementRef;

  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit() {

    this.signInId = new FormControl("", Validators.required);
    this.signInForm = new FormGroup({ signInId: this.signInId });
  }

  onSubmit() {
    //Reset Errors on submit
    console.log('onSubmit()');

    if (this.signInId.value.trim().length > 0) {
        this.isSubmitted = false;
        this.resetAllFlags();
        this.initPasswordValidation();
    } else {
        this.isSubmitted = true;
    }
  }

  initPasswordValidation() {
    //Loading icon on request
    this.loading = true;

    this.loginService.getLoginProfile(this.signInId.value).subscribe(
      (loginProfile: LoginProfile) => {
        console.log('Login profile Success => ', loginProfile);
      });

    //this.router.navigate(['/validate'], { skipLocationChange: true });
  }

  resetAllFlags() {
    this.timeoutFlag = false;
    this.respErrorFlag = false;
    this.inlineError = false;
    //Cllear Headers and Messages for errors
    this.errorHeader = null;
    this.errorMessage = null;
  }

  isSpace($event) {
    // if (this.eraseInput) {
    //   this.signInId.reset();
    //   this.eraseInput = false;
    // }
    let charCode = ($event.which) ? $event.which : $event.keyCode;
    if (charCode === 32)
      return false;

    return true;
  }

  getStyle() {
    if (this.notificationType) {
     
      //Set CSS of Error box based on type of error
      switch (this.notificationType) {
        case "ERROR": return "notification-critical";
        case "WARNING": return "notification-warning";
        case "SUCCESS": return "notification-success";
        case "INFO": return "notification-informational";
        default: return "notification-critical";
      }
    }
    //Default if no Error response from server but error on client
    return "notification-critical";
  }

}
