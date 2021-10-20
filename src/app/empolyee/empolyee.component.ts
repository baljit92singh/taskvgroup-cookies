import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DialogboxComponent } from '../dialogbox/dialogbox.component';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-empolyee',
  templateUrl: './empolyee.component.html',
  styleUrls: ['./empolyee.component.css']
})
export class EmpolyeeComponent implements OnInit {
  empolyeeList: Array<any> = [];
  constructor(private router: Router,
    private cookies: CookieService,
    public commonServie: CommonService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getEmployeeList()
  }

  getEmployeeList() {
    this.commonServie.getEmployee().subscribe(res => {
      if (res && res.data) {
        this.empolyeeList = res.data;
      } else {
        this.commonServie.openSnackBar(res.message, "Dismiss")
      }
    })
  }

  logout() {
    this.cookies.deleteAll()
    this.router.navigate(['/login'])
  }

  openDialog(action: any, obj: any): void {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogboxComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result && result.event == 'Add') {
        this.empolyeeList.push(result.data)
        this.getEmployeeList()
      } else if (result && result.event == 'Update') {
        this.updateEmployee(result.data);
      } else if (result && result.event == 'Delete') {
        this.deleteEmployee(result.data);
      }
    });
  }

  updateEmployee(data: any) {
    this.commonServie.updateEmployee({ id: data.id, item: data }).subscribe(res => {
      if (res) {
        this.getEmployeeList()
        this.commonServie.openSnackBar(res.message, "Dismiss")
      } else {
        this.commonServie.openSnackBar(res.message, "Dismiss")
      }
    })
  }

  deleteEmployee(data: any) {
    // console.log(data);
    this.commonServie.deleteEmployee(data).subscribe(res => {
      if (res) {
        this.getEmployeeList()
        this.commonServie.openSnackBar(res.message, "Dismiss")
      } else {
        this.commonServie.openSnackBar(res.message, "Dismiss")
      }
    })
  }

}
