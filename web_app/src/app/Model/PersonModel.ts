export class EmployeeModel {   
    public id: string;
    public firstName: string;
    public lastName: string;
    public street: string;
    public postcode: string;
    public city: string;
    public phone: string;
    public skillSet?: any[];

    constructor(id: string, firstName: string, lastName: string, street: string, postcode: string, city: string, phone: string, skillSet?: any[]) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.street = street;
        this.postcode = postcode;
        this.city = city;
        this.phone = phone;
        this.skillSet = skillSet;
    }   

    get requestData(): any{
        return {
            "lastName": this.lastName,
            "firstName": this.firstName,
            "street": this.street,
            "postcode": this.postcode,
            "city": this.city,
            "phone": this.phone,
            "skillSet": []
        };
    }

    public toString(): string {
        return `User Details:\nID: ${this.id}\nFirst Name: ${this.firstName}\nLast Name: ${this.lastName}\nStreet: ${this.street}\nPostcode: ${this.postcode}\nCity: ${this.city}\nPhone: ${this.phone}\nSkill Set: ${this.skillSet}`;
    }
}