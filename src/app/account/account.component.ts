import { Component } from "@angular/core";
import { AccountDataService } from "./account-data.service";

@Component({
  selector: "account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent {
  accountDetails: any = [];
  accounts = [];
  constructor(private dataSvc: AccountDataService) {}

  ngOnInit() {
    // this.dataSvc.getAllAccountDetails().subscribe(response => {
    //   this.accountDetails = response;
    //   console.log(response);
    // });

    this.accountDetails = this.dataSvc.getAllDetails();
    this.accounts = this.accountDetails.map(detail => {
      return detail["Account No"];
    });
    this.accounts = this.accounts.filter((account, index) => {
      return this.accounts.indexOf(account) === index;
    });
  }
}
