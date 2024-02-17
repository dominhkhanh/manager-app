import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';
import { ProductService } from '../services/product.service';
import { finalize } from 'rxjs';

interface TypeList {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './add-edit-product-modal.component.html',
  styleUrls: ['./add-edit-product-modal.component.scss'],
})
export class AddEditProductComponent implements OnInit {
  productForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _productService: ProductService,
    private _dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService
  ) {
    this.productForm = this._fb.group({
      id: '',
      name: '',
      description: '',
      type: '',
      category: '',
      price: '',
      dob: '',
    });
  }

  loading: boolean = false;

  typeList: TypeList[] = [
    { value: 'DienMay', viewValue: 'Điện máy' },
    { value: 'GiaDung', viewValue: 'Gia dụng' },
    { value: 'DienThoai', viewValue: 'Điện thoại' },
  ];

  ngOnInit(): void {
    this.productForm.patchValue(this.data);
  }

  onFormSubmit() {
    console.log('this.data', this.data);
    if (this.productForm.valid) {
      if (this.data) {
        this.updateProduct();
      } else {
        this.addProduct();
      }
    }
  }
  
  updateProduct() {
    this.loading = true;
    this._productService.updateProduct(this.data.id, this.productForm.value)
      .subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Product updated!');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }
  
  addProduct() {
    this.loading = true;
    this._productService.addProduct(this.productForm.value)
      .subscribe({
        next: (val: any) => {
          this._coreService.openSnackBar('Product added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      });
  }
}
