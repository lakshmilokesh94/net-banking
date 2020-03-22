import { Injectable } from "@angular/core";
import { AccountDataService } from "../account/account-data.service";
import { throws } from "assert";

@Injectable({
  providedIn: "root"
})
export class PaginationService {
  constructor(private dataSvc: AccountDataService) {
    this.items = this.dataSvc.getAllDetails();
  }

  items: any = [];
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number;
  currentLoadedData: any = [];

  getPageSize() {
    return this.pageSize;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getTotalPages() {
    this.totalPages = Math.ceil(this.items.length / this.pageSize);
    return this.totalPages;
  }

  getCurrentPageData(currentPage, pageToLoad) {
    if (this.items.length && currentPage !== pageToLoad) {
      if (currentPage < pageToLoad) {
        //go next
        let startIndex = currentPage * this.pageSize;
        let endIndex = pageToLoad ? pageToLoad * this.pageSize : 0;
        this.currentLoadedData = this.items.splice(startIndex, endIndex);
      } else if (currentPage > pageToLoad) {
        //go prev
        let endIndex = currentPage * this.pageSize;
        let startIndex = pageToLoad ? pageToLoad * this.pageSize : 0;
        this.currentLoadedData = this.items.splice(startIndex, endIndex);
      } else {
        //go first / last
        let index = currentPage * this.pageSize;
        this.currentLoadedData =
          this.currentPage === this.totalPages
            ? this.items.splice(index)
            : this.items.splice(0, index);
      }

      return this.currentLoadedData;
    }
  }

  getSearchResults(searchValue, field) {
    return this.dataSvc.getSearchResults(
      searchValue,
      field,
      this.currentLoadedData
    );
  }
  getSortedResults(searchValue) {
    return this.dataSvc.getSortedResults(searchValue, this.currentLoadedData);
  }
}
