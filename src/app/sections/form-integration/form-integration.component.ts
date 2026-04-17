import { Component, OnDestroy, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { HotToastFormRef, HotToastService } from '@ngxpert/hot-toast';
import { CodeComponent } from '../../shared/components/code/code.component';
import { formControlSnippet, formGroupSnippet } from './snippets';

type DemoTab = 'control' | 'group';

@Component({
  selector: 'app-form-integration',
  templateUrl: './form-integration.component.html',
  imports: [ReactiveFormsModule, CodeComponent],
})
export class FormIntegrationComponent implements OnDestroy {
  private toast = inject(HotToastService);

  activeTab: DemoTab = 'control';

  readonly controlSnippet = formControlSnippet;
  readonly groupSnippet = formGroupSnippet;

  emailControl = new FormControl('', {
    validators: [Validators.required, Validators.email],
    asyncValidators: [this.takenEmailValidator()],
    updateOn: 'change',
  });

  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  emailSubmitted = false;
  registrationSubmitted = false;

  private emailRef: HotToastFormRef = this.setupEmailRef();
  private registrationRef: HotToastFormRef = this.setupRegistrationRef();

  submitEmailDemo(): void {
    this.emailSubmitted = true;
    this.emailControl.updateValueAndValidity();
  }

  submitRegistrationDemo(): void {
    this.registrationSubmitted = true;
    this.registrationForm.updateValueAndValidity();
  }

  resetEmailDemo(): void {
    this.emailSubmitted = false;
    this.emailRef.close();
    this.emailControl.reset('');
    this.emailRef = this.setupEmailRef();
  }

  resetRegistrationDemo(): void {
    this.registrationSubmitted = false;
    this.registrationRef.close();
    this.registrationForm.reset();
    this.registrationRef = this.setupRegistrationRef();
  }

  ngOnDestroy(): void {
    this.emailRef.close();
    this.registrationRef.close();
  }

  private setupEmailRef(): HotToastFormRef {
    return this.toast.fromForm(this.emailControl, {
      PENDING: {
        message: 'Checking email…',
        show: () => this.emailSubmitted,
      },
      INVALID: {
        message: (ctrl) => {
          const e = ctrl.errors;
          if (e?.['required']) return 'Email is required';
          if (e?.['email']) return 'Enter a valid email address';
          if (e?.['taken']) return 'That email is already taken';
          return 'Invalid email';
        },
        show: () => this.emailSubmitted,
      },
      VALID: {
        message: 'Email looks good!',
        duration: 2000,
        show: () => this.emailSubmitted,
      },
    });
  }

  private setupRegistrationRef(): HotToastFormRef {
    return this.toast.fromForm(this.registrationForm, {
      INVALID: {
        message: (form) => {
          const c = form.controls;
          if (c.name.errors?.['required']) return 'Name is required';
          if (c.name.errors?.['minlength']) return 'Name needs at least 3 characters';
          if (c.password.errors?.['required']) return 'Password is required';
          if (c.password.errors?.['minlength']) return 'Password needs at least 6 characters';
          return 'Please fix the errors above';
        },
        show: () => this.registrationSubmitted,
      },
      VALID: {
        message: 'Form is valid!',
        duration: 2000,
        show: () => this.registrationSubmitted,
      },
    });
  }

  private takenEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return new Observable((observer) => {
        const timeout = setTimeout(() => {
          const takenEmails = ['test@taken.com', 'user@taken.com'];
          observer.next(takenEmails.includes(control.value) ? { taken: true } : null);
          observer.complete();
        }, 800);
        return () => clearTimeout(timeout);
      });
    };
  }
}
