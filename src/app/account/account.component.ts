import { Component } from "@angular/core";
import { AccountDataService } from "./account-data.service";
import { PaginationService } from "../pagination/pagination.service";

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

  constructor(private pagerSvc: PaginationService) {}

  getAccounts() {
    this.accounts = this.accountDetails.map(detail => {
      return detail["Account No"];
    });
    this.accounts = this.accounts.filter((account, index) => {
      return this.accounts.indexOf(account) === index;
    });
  }

  onSearchChange() {
    this.accountDetails = this.pagerSvc.getSearchResults(
      this.searchValue,
      "Transaction Details"
    );
  }

  onSortByChanged(event) {
    this.sortByField = event.target.value;
    this.accountDetails = this.pagerSvc.getSortedResults(this.sortByField);
  }

  onPageChanged(args) {
    this.accountDetails =
      this.pagerSvc.getCurrentPageData(args.old, args.new) ||
      this.accountDetails;
  }

  ngOnInit() {
    // this.dataSvc.getAllAccountDetails().subscribe(response => {
    //   this.accountDetails = response;
    //   console.log(response);
    // });

    this.accountDetails = this.pagerSvc.getCurrentPageData(1, 0);
    this.getAccounts();
  }
}
