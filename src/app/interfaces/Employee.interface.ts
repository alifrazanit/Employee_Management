export interface Employee {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    birthDate: Date;
    basicSalary: Number;
    status: statusEmployee;
    group: string;
    description: string;
    id:any;
}

export enum statusEmployee {
    AKTIF = 'AKTIF',
    NON_AKTIF = 'NON_AKTIF'
}

export enum groupEmployee {
    AKUNTAN = 'Akuntan',
    QA = 'Quality Assurace',
    PM = 'Project Manajer',
    TL = 'Team Leader',
    IT = 'IT',
}