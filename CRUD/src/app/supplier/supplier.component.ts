import { Component } from '@angular/core';
import { Supplier } from '../Supplier';
import { SupplierService } from '../supplier.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  suppliers: Supplier[] = [];
  formGroupSupplier: FormGroup;
  isEditing = false;
  
  constructor(private supplierService: SupplierService, private formBuilder:FormBuilder) { 
    this.formGroupSupplier = this.formBuilder.group({
      id: '',
      name: '',
      active: false, //inicial value of checkbox
      category: '',
      contact: ''
    });
  }
 
  ngOnInit(): void {
    this.loadSuppliers(); //carrega os suppliers
  }
  

  loadSuppliers() {  
    this.supplierService.getSuppliers().subscribe( //
      {
        next: data => this.suppliers = data,
      error: () => console.log('error')
      }
    );
  }
  save(){ //se devolve um observable é necessário um subscribe

   

    if(this.isEditing){

      this.supplierService.update(this.formGroupSupplier.value).subscribe(
        {
          next: () =>  {
            this.loadSuppliers();
            this.formGroupSupplier.reset();
            this.isEditing = false;
          }
        }
      )

    }
    else{
      this.supplierService.save(this.formGroupSupplier.value).subscribe(
        {
          //a resposta chega pelo next | client é data
          next : data => { //tratando o retorno do save |
            this.suppliers.push(data); //atualiza o array
            this.formGroupSupplier.reset();
          }
        }
       );
    }
  }



  remove(supplier : Supplier):void{
    this.supplierService.remove(supplier).subscribe(
      {
        //a resposta chega pelo next, ou seja, se tudo for feito com sucesso
        next:() => this.loadSuppliers()
      });
  }

  edit(supplier : Supplier):void{
    this.formGroupSupplier.setValue(supplier);//
    this.isEditing = true;
  }

}
