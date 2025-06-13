export class Address {
  id: string;
  fullname: string;
  phoneNumber: string;
  address: string;
  defaultAddress: boolean;
  to_district_id: number;
  to_ward_code: string;

  constructor(
    id: string = "",
    fullname: string = "",
    phoneNumber: string = "",
    address: string = "",
    defaultAddress: boolean = false,
    to_district_id: number = 0,
    to_ward_code: string = ""
  ) {
    this.id = id;
    this.fullname = fullname;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.defaultAddress = defaultAddress;
    this.to_district_id = to_district_id;
    this.to_ward_code = to_ward_code;
  }
}

export interface Ward {
  Id: string;
  Name: string;
  Level: string;
}

export interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

export interface Province {
  Id: string;
  Name: string;
  Districts: District[];
}

export const AddressLevel = {
  Province: "province",
  District: "district",
  Ward: "ward",
  Details: "details",
} as const;
export type AddressLevel = (typeof AddressLevel)[keyof typeof AddressLevel];
