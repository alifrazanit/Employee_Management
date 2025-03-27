import { Employee, groupEmployee, statusEmployee } from "@interfaces/Employee.interface";

export const dataEmployee: Employee[] = [
    { username: 'alif1', firstName: 'Alif', lastName: 'Saputra', email: 'ailfrazanit@gmail.com', birthDate: new Date('1997-10-09'), basicSalary: 11000000, status: statusEmployee.AKTIF, group: groupEmployee.IT, description: 'Test' },
    { username: 'mila1', firstName: 'Mila', lastName: 'Indah', email: 'milaindah@gmail.com', birthDate: new Date('1998-11-10'), basicSalary: 10000000, status: statusEmployee.AKTIF, group: groupEmployee.QA, description: 'Lorem Ipsum' },
    { username: 'budi1', firstName: 'Budiman', lastName: 'Prakoso', email: 'budimanPrakoso@gmail.com', birthDate: new Date('1993-11-05'), basicSalary: 8000000, status: statusEmployee.AKTIF, group: groupEmployee.PM, description: 'Lorem Ipsum' }
];