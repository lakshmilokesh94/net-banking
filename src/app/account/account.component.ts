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
  searchValue: string = "";
  sortByField = "";

  constructor(private dataSvc: AccountDataService) {}

  getAccounts() {
    this.accounts = this.accountDetails.map(detail => {
      return detail["Account No"];
    });
    this.accounts = this.accounts.filter((account, index) => {
      return this.accounts.indexOf(account) === index;
    });
  }

  onSearchChange() {
    this.accountDetails = this.dataSvc.getSearchResults(
      this.searchValue,
      "Transaction Details"
    );
  }

  onSortByChanged(event) {
    this.sortByField = event.target.value;
    this.accountDetails = this.dataSvc.getSortedResults(this.sortByField);
  }

  ngOnInit() {
    // this.dataSvc.getAllAccountDetails().subscribe(response => {
    //   this.accountDetails = response;
    //   console.log(response);
    // });

    this.accountDetails = this.dataSvc.getAllDetails();
    this.getAccounts();
  }
}
