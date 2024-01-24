export class EmployeeModel {   
    public id: string;
    public lastName: string;
    public firstName: string;
    public street: string;
    public postcode: string;
    public city: string;
    public phone: string;
    public skillSet?: any[];

    constructor(id: string, lastName: string, firstName: string,street: string, postcode: string, city: string, phone: string, skillSet?: any[]) {
        this.id = id;
        this.lastName = lastName;
        this.firstName = firstName;
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

    updateEmployee(lastName?: string, firstName?: string,street?: string, postcode?: string, city?: string, phone?: string, skillSet?: any[]){
        this.lastName = lastName ?? this.lastName;
        this.firstName = firstName ?? this.firstName;
        this.street = street ?? this.street;
        this.postcode = postcode ?? this.postcode;
        this.city = city ?? this.city;
        this.phone = phone ?? this.phone;
        this.skillSet = skillSet ?? this.skillSet;
    }

    public toString(): string {
        return `User Details:\nID: ${this.id}\nLast Name: ${this.lastName}\nFirst Name: ${this.firstName}\nStreet: ${this.street}\nPostcode: ${this.postcode}\nCity: ${this.city}\nPhone: ${this.phone}\nSkill Set: ${this.skillSet}`;
    }
}