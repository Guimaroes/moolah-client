import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TokenStorageService } from 'app/_services/token-storage.service';
import { Type } from '../models/type';
import { TypeService } from '../_services/type.service';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.css']
})
export class TypeListComponent implements OnInit {
  userId: number = 0;

  type: Type | undefined;

  types: Type[] = [];

  typeForm = this.formBuilder.group({
    name: '',
    categoryId: Number
  });

  constructor(
    private typeService: TypeService, 
    private tokenStorageService: TokenStorageService, 
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userId = this.tokenStorageService.getUser().id;
    
    this.typeService.getUserTypes(this.userId).subscribe((types: Type[]) => {
      this.types = types;
    })
  }

  onSubmit(): void {
    if (this.type) {
      this.update();
    } else {
      this.add();
    }
    this.typeForm.reset();
  }

  delete(type: Type): void {
    this.typeService.removeType(type.id).subscribe(() => {
      this.types = this.types.filter(val => val !== type)
    })
  }

  add(): void {
    this.typeService.addType(
      this.typeForm.value.name,
      this.typeForm.value.categoryId,
      this.userId
    ).subscribe((type: Type) => {
      this.types.unshift(type);
    });
  }

  update(): void {
    if (this.type) {
      
      const index = this.types.indexOf(this.type);
      
      this.typeService.updateType(
        this.type.id,
        this.typeForm.value.name,
        this.typeForm.value.categoryId,
        this.userId
      ).subscribe((type: Type) => {
        this.types[index] = type;
      });
  
      this.type = undefined;
    }
  }

  setType(type: Type): void {
    this.type = type;

    this.typeForm.setValue({
      name: type.name,
      categoryId: type.category.id
    });
  }
}
