import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {
  action: string;
  local_data: any;
  employeeForm = this.formBuilder.group({
    employee_name: ['', Validators.required],
    salary: ['', Validators.required],
    age: ['', Validators.required],
  });
  constructor(public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder, private commonServie: CommonService) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.f.employee_name.setValue(this.local_data.employee_name)
    this.f.salary.setValue(this.local_data.employee_salary)
    this.f.age.setValue(this.local_data.employee_age)
  }

  ngOnInit(): void {
  }

  get f() { return this.employeeForm.controls; }


  doAction() {
    if (this.action === "Add") {
      const employeeFormRequest = {
        name: this.f.employee_name.value,
        salary: this.f.salary.value,
        age: this.f.age.value,
      };
      this.commonServie.createEmployee(employeeFormRequest).subscribe(res => {
        if (res) {
          this.dialogRef.close({ event: this.action, data: res.data });
        } else {
          this.commonServie.openSnackBar(res.message, "Dismiss")
        }
      })
    } else {
      this.dialogRef.close({ event: this.action, data: this.local_data });
    }


  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
