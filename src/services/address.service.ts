import { SystemConstants } from "../constants/SystemContants";
import { Address } from "../types/address.type";
import { v4 as uuidv4 } from "uuid";
const AddressService = {
  getAddress: async () => {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching address:", error);
      throw error;
    }
  },

  getAddressFromLocal: () => {
    const addressStr = localStorage.getItem(SystemConstants.ADDRESS);
    if (addressStr) {
      const addressData = JSON.parse(addressStr);
      return addressData as Address[];
    }
    return [];
  },

  addNewAddress: (address: Address) => {
    const existingAddresses = AddressService.getAddressFromLocal();
    address.id = uuidv4();
    if (existingAddresses.length === 0) {
      address.defaultAddress = true;
    }
    existingAddresses.push(address);
    localStorage.setItem(
      SystemConstants.ADDRESS,
      JSON.stringify(existingAddresses)
    );
    if (address.defaultAddress) {
      AddressService.setSelectedAddress(address);
    }
  },

  removeAddress: (id: string) => {
    const existingAddresses = AddressService.getAddressFromLocal();
    const updatedAddresses = existingAddresses.filter(
      (address) => address.id !== id
    );
    localStorage.setItem(
      SystemConstants.ADDRESS,
      JSON.stringify(updatedAddresses)
    );
  },

  setSelectedAddress: (address: Address) => {
    const existingAddresses = AddressService.getAddressFromLocal();
    const updatedAddresses = existingAddresses.map((addr) => {
      if (addr.id === address.id) {
        return { ...addr, defaultAddress: true };
      }
      return { ...addr, defaultAddress: false };
    });
    localStorage.setItem(
      SystemConstants.ADDRESS,
      JSON.stringify(updatedAddresses)
    );
  },
};

export default AddressService;
