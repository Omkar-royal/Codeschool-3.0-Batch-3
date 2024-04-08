import { Earning, responseMessage } from './../../common/constants';
import { Component } from '@angular/core';
import { RestApiServiceService } from '../../services/rest-api-service.service';
import { Employee } from '../../common/constants';
import { CommonModule, NgFor } from '@angular/common';
import { FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators, FormArray } from '@angular/forms';
import { CurrencyWithCommasPipePipe } from '../../pipes/currency-with-commas-pipe.pipe';
import { InputValidationsService } from '../../services/input-validations.service';
import { Router } from '@angular/router';


export interface Earnings {
  earning_id: number;
  amount: number;
  date_of_earning: string;
}

export interface Deductions {
  deduction_id: number;
  amount: number;
  date_of_deduction: string;
}
@Component({
  selector: 'app-add-salary',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CurrencyWithCommasPipePipe, NgFor],
  templateUrl: './add-salary.component.html',
  styleUrl: './add-salary.component.css'
})
export class AddSalaryComponent {

  employees: Employee[] = [];
  selectEarningTypes: any = [];
  selectDeductionTypes: any = [];
  isFormSubmitted: boolean = false;

  earnings: any = [];
  deductions: any = [];
  earningTypeError: string = '';
  deductionTypeError: string = '';

  form = this.fb.group({
    "employee_id": new FormControl(),
    "total_earnings": new FormControl(),
    "total_deductions": new FormControl(),
    "net_salary": new FormControl(),
    "base_salary": new FormControl(),

  })

  earningsForm = this.fb.group({
    earning_id: new FormControl(),
    amount: new FormControl(),
  });
  deductionForm = this.fb.group({
    deduction_id: new FormControl(),
    amount: new FormControl(),
  })
  constructor(public http: RestApiServiceService, private fb: FormBuilder, public validate: InputValidationsService, public router: Router) {
    this.fetchSelectOptions();
  }

  fetchSelectOptions() {
    this.http.getData('fetch-select-options', '').then((res: any) => {
      this.employees = res.employees;
      this.selectEarningTypes = res.earning_type;
      this.selectDeductionTypes = res.deduction_type;
    })
  }

  addEarnings() {
    this.isFormSubmitted = true;
    const foundEarningType = this.earnings.find((item: any) => item.earning_id === this.earningsForm.value.earning_id);

    if (foundEarningType) {
      this.earningTypeError = 'Already added this earning type';
    } else {
      this.earningTypeError = '';
      if (!this.earningsForm.valid || !this.earningsForm.value.amount.trim()) {
        responseMessage('error', "Please enter the amount", true);
      } else {
        this.earnings.push({
          earning_id: this.earningsForm.value.earning_id,
          amount: parseFloat(this.earningsForm.value.amount).toFixed(2),
        });
      }
    }


    const base_salary = this.form.get('base_salary')?.value || 0;
    const earningAmount = this.earnings.reduce((acc: number, curr: any) => acc + Number(curr.amount || 0), 0);
    this.form.get('total_earnings')?.patchValue(earningAmount);
    const total_deductions = this.form.get('total_deductions')?.value || 0;
    const netSalary = Number(base_salary) + Number(earningAmount) - Number(total_deductions);
    this.form.get('net_salary')?.patchValue(netSalary);
  }
  addDeduction() {
    this.isFormSubmitted = true;

    const foundDeductionType = this.deductions.find((item: any) => item.deduction_id === this.deductionForm.value.deduction_id);

    if (foundDeductionType) {
      this.deductionTypeError = 'Already added this deduction type';
    } else {
      this.deductionTypeError = '';
      if (!this.deductionForm.valid || !this.deductionForm.value.amount.isNaN) {
        responseMessage('error', "Please enter the amount", true);
      } else {
        this.deductions.push({
          deduction_id: this.deductionForm.value.deduction_id,
          amount: parseFloat(this.deductionForm.value.amount).toFixed(2),
        });
      }
    }
    const base_salary = this.form.get('base_salary')?.value || 0;
    const deductionAmount = this.deductions.reduce((acc: number, curr: any) => acc + Number(curr.amount || 0), 0);
    this.form.get('total_deductions')?.patchValue(deductionAmount);
    const total_earnings = this.form.get('total_earnings')?.value || 0;
    const netSalary = Number(base_salary) + Number(total_earnings) - Number(deductionAmount);
    this.form.get('net_salary')?.patchValue(netSalary);
  }


  addSalary() {
    const data = {
      'employee_id': this.form.get('employee_id')?.value,
      'base_salary': this.form.get('base_salary')?.value,
      'total_earnings': this.form.get('total_earnings')?.value,
      'total_deductions': this.form.get('total_deductions')?.value,
      'net_salary': this.form.get('net_salary')?.value,
      'deductions': this.deductions,
      'earnings': this.earnings,
    }
    if (this.form.valid && this.earningsForm.valid && this.deductionForm.valid) {
      this.http.postData('add-salary', data).then((res) => {
        responseMessage('success', 'Salary Added Successfully', true);
        this.router.navigate(['/']);
      },
        (err) => {
          console.log(err);
          responseMessage('error', 'Something went wrong! Please try again later', true);
        })

    }
  }























  // addEarning(earning_id: number, amount_of_earning: number) {
  //   if (earning_id !== 0 && amount_of_earning !== 0) {
  //     this.earnings.push({
  //       earning_id: earning_id,
  //       amount: amount_of_earning,
  //       date_of_earning: new Date().toISOString(),
  //     });
  //   }

  //   const totalEarningAmount = this.earnings.reduce((acc, curr) => acc + Number(curr.amount), 0);

  //   this.totalEarningAmount = totalEarningAmount;

  //   const netSalary = Number(this.baseSalary) + Number(this.totalEarningAmount) - Number(this.totalDeductionAmount);
  //   this.netSalary = netSalary;
  // }
  // addDeductions(deduction_id: number, amount_of_deduction: number) {
  //   if (deduction_id !== 0 && amount_of_deduction !== 0) {
  //     this.deductions.push({
  //       deduction_id: deduction_id,
  //       amount: amount_of_deduction,
  //       date_of_deduction: new Date().toISOString(),
  //     });
  //   }

  //   const totalDeductionAmount = this.deductions.reduce((acc, curr) => acc + Number(curr.amount), 0);


  //   this.totalDeductionAmount = totalDeductionAmount;
  //   const netSalary = Number(this.baseSalary) + Number(this.totalEarningAmount) - Number(this.totalDeductionAmount);
  //   this.netSalary = netSalary;


  // }
  // totalNetSalary() {
  //   const netSalary = Number(this.baseSalary) + Number(this.totalEarningAmount) - Number(this.totalDeductionAmount);
  //   this.netSalary = netSalary;
  // }


  // addSalary() {
  //   this.form.get('employee_id')?.patchValue(this.employee_id);
  //   this.form.get('base_salary')?.patchValue(this.baseSalary);
  //   this.form.get('net_salary')?.patchValue(this.netSalary);
  //   this.form.get('total_earnings')?.patchValue(this.totalEarningAmount);
  //   this.form.get('total_deductions')?.patchValue(this.totalDeductionAmount);
  //   // this.form.get('data_of_salary')?.patchValue(new Date().toISOString());
  //   for (let earning of this.earnings) {
  //     (this.form.get('earnings') as unknown as FormArray).push(this.fb.group(earning));
  //   }

  //   for (let deduction of this.deductions) {
  //     (this.form.get('deductions') as FormArray).push(this.fb.group(deduction));
  //   }

  //   this.http.postData('add-salary', this.form.value).then((data: any) => {
  //     console.log("Successfully added salary");
  //     alert("Successfully Added Salary")
  //   })
  // }
}