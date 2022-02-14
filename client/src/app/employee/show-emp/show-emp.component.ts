import { Component, Input, OnInit } from '@angular/core';
import { themeRulesStandardCreator } from '@fluentui/react';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css'],
})
export class ShowEmpComponent implements OnInit {
  constructor(private service: SharedService) {}

  EmployeeList: any = [];

  @Input() emp: any;
  PhotoFilePath: string;
  PhotoFileName: 'anonymous.png';

  ngOnInit(): void {
    this.refreshEmpList();
  }

  editClick(item: any): void {
    console.log(item);
    this.emp = item;
  }

  deleteClick(item: { EmployeeId: any }): void {
    this.service.deleteEmployee(item.EmployeeId).subscribe((data) => {
      alert(data.toString());
      this.refreshEmpList();
    });
  }

  closeClick() {
    this.refreshEmpList();
  }

  refreshEmpList(): void {
    this.service.getEmpList().subscribe((data) => {
      this.EmployeeList = data;
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
      this.emp = {
        PhotoFileName: 'anonymous.png',
      };
    });
  }
}
