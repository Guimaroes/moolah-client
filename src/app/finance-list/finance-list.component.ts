import { Component, OnInit, ViewChild } from '@angular/core';
import { Finance } from '../models/finance';
import { Type } from '../models/type';
import { FinanceService } from '../_services/finance.service';
import { TypeService } from '../_services/type.service';
import { FormBuilder } from '@angular/forms';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-finance-list',
  templateUrl: './finance-list.component.html',
  styleUrls: ['./finance-list.component.css']
})
export class FinanceListComponent implements OnInit {
  userId: number = 0;
  
  finance: Finance | undefined;

  finances: Finance[] = [];
  types: Type[] = [];

  financeForm = this.formBuilder.group({
    name: '',
    value: Number,
    typeId: Number
  });

  constructor( 
    private financeService: FinanceService, 
    private tokenStorageService: TokenStorageService,
    private typeService: TypeService, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenStorageService.getUser().id;

    this.financeService.getUserFinances(this.userId).subscribe((finances: Finance[]) => {
      this.finances = finances;
    });

    this.typeService.getUserTypes(this.userId).subscribe((types: Type[]) => {
      this.types = types;
    });
  }

  onSubmit(): void {
    if (this.finance) {
      this.update();
    } else {
      this.add();
    }
    this.financeForm.reset();
  }

  delete(finance: Finance): void {
    this.financeService.removeFinance(finance.id).subscribe(() => {
      this.finances = this.finances.filter(val => val !== finance)
    })
  }

  add(): void {
    this.financeService.addFinance(
      this.financeForm.value.name,
      this.financeForm.value.value,
      this.financeForm.value.typeId,
      this.userId
    ).subscribe((finance: Finance) => {
      this.finances.unshift(finance);
    });
  }

  update(): void {
    if (this.finance) {
      
      const index = this.finances.indexOf(this.finance);
      
      this.financeService.updateFinance(
        this.finance.id,
        this.financeForm.value.name,
        this.financeForm.value.value,
        this.financeForm.value.typeId,
        this.userId
      ).subscribe((finance: Finance) => {
        this.finances[index] = finance;
      });
  
      this.finance = undefined;
    }
  }

  setFinance(finance: Finance): void {
    this.finance = finance;

    this.financeForm.setValue({
      name: finance.name,
      value: finance.value,
      typeId: finance.type.id
    });
  }
}
