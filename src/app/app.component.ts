import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-checkboxes-example';

  public today = new Date().setHours(0, 0, 0, 0);
  public showDetail: boolean = false;
  public logggedInUser;
  public patientForm: FormGroup;
  public immunizations: Array<any> = [
    { name: 'DPT', value: false },
    { name: 'Mumps', value: false },
    { name: 'Measles', value: false },
    { name: 'Rubella', value: false },
    { name: 'Polio', value: false },
    { name: 'Smallpox', value: false }
  ];

  constructor(
    private formBuilder: FormBuilder) {
    this.patientForm = formBuilder.group({
      firstName: [''],
      lastName: [''],
      gender: [''],
      dob: ['', Validators.required],
      email: [''],
      mobileNo: [''],
      password: [''],
      rePassword: [''],
      medicalHistory: this.formBuilder.array([
        this.initMedicalHistoryFields()
      ]),
      hospitalizationDetails: this.formBuilder.array([
        this.initHospitalizationFields()
      ]),
      injuryDetails: this.formBuilder.array([
        this.initInjuriesFields()
      ]),
      medicationDetails: this.formBuilder.array([
        this.initMedicationFields()
      ]),
      isAllergy: [''],
      allergyList: [''],
      immunizationDetails: this.formBuilder.array(this.immunizations)
      // currentImmunization:['']
    });
    console.log(this.patientForm.controls.immunizationDetails);
    console.log(JSON.stringify(this.patientForm.controls.immunizationDetails.value));
  }

  registerChanges($event) {
    console.log("Here ", $event.target, " to here");

  }


  ngOnInit() {

  }
  //---------Surgeries and dates----------------
  initMedicalHistoryFields(): FormGroup {
    return this.formBuilder.group({
      surgery: [''],
      surgerydob: ['']
    })
  }


  addMedicalHistoryField(): void {
    const control = <FormArray>this.patientForm.controls.medicalHistory;
    control.push(this.initMedicalHistoryFields());
  }

  removeMedicalHistoryField(i: number): void {
    const control = <FormArray>this.patientForm.controls.medicalHistory;
    control.removeAt(i);
  }

  //---------Hospitalizations: (other than for surgeries)----------------
  initHospitalizationFields(): FormGroup {
    return this.formBuilder.group({
      hospitalizationDate: [''],
      hospitalizationWhere: [''],
      hospitalizationReason: ['']
    })
  }

  addHospitalizationFields(): void {
    const control = <FormArray>this.patientForm.controls.hospitalizationDetails;
    control.push(this.initHospitalizationFields());
  }

  removeHospitalizationFields(i: number): void {
    const control = <FormArray>this.patientForm.controls.hospitalizationDetails;
    control.removeAt(i);
  }

  //---------Injuries/Fractures (type, date and how injured)----------------
  initInjuriesFields(): FormGroup {
    return this.formBuilder.group({
      injuriesType: [''],
      injuriesDate: [''],
      howInjured: ['']
    })
  }



  addInjuriesFields(): void {
    const control = <FormArray>this.patientForm.controls.injuryDetails;
    control.push(this.initInjuriesFields());
  }

  removeInjuriesFields(i: number): void {
    const control = <FormArray>this.patientForm.controls.injuryDetails;
    control.removeAt(i);
  }

  //---------Medications are you taking?----------------
  initMedicationFields(): FormGroup {
    return this.formBuilder.group({
      medicationName: [''],
      medicationDose: [''],
      medicationTakenDaily: [''],
      medicationReason: ['']
    })
  }

  addMedicationFields(): void {
    const control = <FormArray>this.patientForm.controls.medicationDetails;
    control.push(this.initMedicationFields());
  }

  removeMedicationFields(i: number): void {
    const control = <FormArray>this.patientForm.controls.medicationDetails;
    control.removeAt(i);
  }

  updateToDo(e) {
    alert("100");
    console.log(e.target.checked);
    const checkArray: FormArray = this.patientForm.get('immunizationDetails') as FormArray;
    console.log("Array:", JSON.stringify(checkArray));
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  setImmunization(e: Event, i: number) {
    console.log("===========>", JSON.stringify(this.patientForm.value));
  }



  manage() {
    console.log("===========>", this.patientForm);
    console.log("===========>", JSON.stringify(this.patientForm.value));
  }

}