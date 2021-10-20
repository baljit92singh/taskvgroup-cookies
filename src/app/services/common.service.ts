import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  getEmployee(): Observable<any> {
    return this.http.get("http://dummy.restapiexample.com/api/v1/employees")
  }

  createEmployee(data: any): Observable<any> {
    return this.http.post("http://dummy.restapiexample.com/api/v1/create", data)
  }

  getEmployeeById(data: any): Observable<any> {
    return this.http.get("http://dummy.restapiexample.com/api/v1/employees/" + data.id)
  }

  updateEmployee(data: any): Observable<any> {
    return this.http.put("http://dummy.restapiexample.com/public/api/v1/update/" + data.id, data.item)
  }

  deleteEmployee(data: any): Observable<any> {
    return this.http.delete("http://dummy.restapiexample.com/public/api/v1/delete/" + data.id)
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }
}
