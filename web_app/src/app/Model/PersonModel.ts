export class EmployeeModel {   
    public id: number;
    public firstName: string;
    public lastName: string;
    public street: string;
    public postcode: number;
    public city: string;
    public phone: number;
    public skillSet?: any[];

    constructor(id: number, firstName: string, lastName: string, street: string, postcode: number, city: string, phone: number, skillSet?: any[]) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.postcode = postcode;
        this.city = city;
        this.phone = phone;
        this.skillSet = skillSet;
    }   

    public toString(): string {
        return `User Details:\nID: ${this.id}\nFirst Name: ${this.firstName}\nLast Name: ${this.lastName}\nStreet: ${this.street}\nPostcode: ${this.postcode}\nCity: ${this.city}\nPhone: ${this.phone}\nSkill Set: ${this.skillSet}`;
    }
}