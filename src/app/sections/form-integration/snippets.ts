export const formControlSnippet = `
  submitted = false;

  emailControl = new FormControl('', {
    validators: [Validators.required, Validators.email],
    asyncValidators: [this.takenEmailValidator()],
  });

  constructor() {
    // Set up reactive toast — show predicate gates on submission
    this.toast.fromForm(this.emailControl, {
      PENDING: {
        message: 'Checking email…',
        show: () => this.submitted,
      },
      INVALID: {
        message: (ctrl) => {
          if (ctrl.errors?.['required']) return 'Email is required';
          if (ctrl.errors?.['email'])    return 'Enter a valid email';
          if (ctrl.errors?.['taken'])    return 'Email is already taken';
        },
        show: () => this.submitted,
      },
      VALID: {
        message: 'Email looks good!',
        duration: 2000,
        show: () => this.submitted,
      },
    });
  }

  submit() {
    this.submitted = true;
    // Re-run validation to trigger statusChanges immediately
    this.emailControl.updateValueAndValidity();
  }`;

export const formGroupSnippet = `
  submitted = false;

  form = new FormGroup({
    name:     new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  constructor() {
    this.toast.fromForm(this.form, {
      INVALID: {
        message: (form) => {
          const c = form.controls;
          if (c.name.errors?.['required'])     return 'Name is required';
          if (c.name.errors?.['minlength'])    return 'Name needs 3+ characters';
          if (c.password.errors?.['required']) return 'Password is required';
          if (c.password.errors?.['minlength'])return 'Password needs 6+ characters';
        },
        show: () => this.submitted,
      },
      VALID: {
        message: 'Form is valid!',
        duration: 2000,
        show: () => this.submitted,
      },
    });
  }

  submit() {
    this.submitted = true;
    this.form.updateValueAndValidity();
  }`;
