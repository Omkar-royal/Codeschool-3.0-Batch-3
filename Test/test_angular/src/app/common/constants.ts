import Swal from "sweetalert2";


export const responseMessage = (icons: any, messageTitle: string, showConfirmStatus: boolean) => {

    Swal.fire({
        icon: icons,
        title: messageTitle,
        showConfirmButton: showConfirmStatus,
    });
};

export interface Employee {
    id: number;
    fullname: string;
    email: string;
    employee_image: string;
    date_of_birth: string;
    gender: string;
    contact_number: string;
    address: string;
    department_id: number;
    department?: any;
    salaries?: Salary[];
    deductions?: Deduction[];
    earnings?: Earning[];
    created_at: string;
    updated_at: string;
}

export interface Department {
    id: number;
    department_name: string;
    created_at: string;
    updated_at: string;
}

export interface Salary {
    id: number;
    employee_id: number;
    base_salary: number;
    total_earnings: number;
    total_deductions: number;
    net_salary: number;
    date_of_salary: string;
    created_at: string;
    updated_at: string;
}

export interface Deduction {
    id: number;
    employee_id: number;
    salary_id: number;
    deduction_id: number;
    amount: number;
    date_of_deduction: string;
    created_at: string;
    updated_at: string;
}

export interface Earning {
    id: number;
    employee_id: number;
    salary_id: number;

    earning_id: number;
    amount: number;
    date_of_earning: string;
    created_at: string;
    updated_at: string;
}
