import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
  ) { }

  dataSet = [];
  columns: any;
  searchUser = null;

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    this.dashboardService.getAllUsers({ filter: { firstname: this.searchUser } }).subscribe((result: any) => {
      const { data } = result;
      this.dataSet = data;
      if (this.dataSet && this.dataSet.length) {
        this.columns = Object.keys(this.dataSet[0]);
      }
    }, (error) => {
      alert('Issue while fetching user data.\nTry logging in again.');
      this.router.navigate(['/']);
    });
  }

}
