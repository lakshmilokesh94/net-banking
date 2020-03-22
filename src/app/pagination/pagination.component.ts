import { Component, Input, Output } from "@angular/core";
import { PaginationService } from "./pagination.service";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.css"]
})
export class PaginationComponent {
  pageSize: number;
  currentPage: number;
  @Output() pageChange: any = new EventEmitter();

  constructor(private svc: PaginationService) {}
  totalPages: number;

  goToPrev() {
    if (this.currentPage > 1) {
      this.pageChange.emit({ old: this.currentPage, new: --this.currentPage });
    }
  }

  goToNext() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit({ old: this.currentPage, new: ++this.currentPage });
    }
  }

  goToFirst() {
    this.pageChange.emit({ old: this.currentPage, new: 1 });
    this.currentPage = 1;
  }

  goToLast() {
    this.pageChange.emit({ old: this.currentPage, new: this.totalPages });
    this.currentPage = this.totalPages;
  }

  ngOnInit() {
    this.pageSize = this.svc.getPageSize();
    this.currentPage = this.svc.getCurrentPage();
    this.totalPages = this.svc.getTotalPages();
  }
}
