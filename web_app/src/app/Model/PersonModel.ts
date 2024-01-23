export class EmployeeModel {
    public id?: number;
    public firstName: string;
    public lastName: string;
    public street: string;
    public postcode: string;
    public city: string;
    public phone: string;
    public skillSet?: string;


    constructor(firstName: string, lastName: string, street: string, postcode: string, city: string, phone: string, skillSet?: string, id?: number,) {
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


    /*  public static fromJson(json: Record<string, any>): EmployeeModel {
          return new EmployeeModel(
              json['firstName'],
              json['lastName'],
              json['street'],
              json['postcode'],
              json['city'],
              json['phone'],
              json['skillSet'],
              json['id'],
          );
      }
  */


    /*    public toJson(): Record<string, any> {
            return {
                id: this.id,
                firstName: this.firstName,
                lastName: this.lastName,
                street: this.street,
                postcode: this.postcode,
                city: this.city,
                phone: this.phone,
                skillSet: this.skillSet,
            };
        }*/
}


