import axios from "axios";
import { SystemConstants } from "../constants/SystemContants";
import { Address } from "../types/address";
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

  getProvinces: async () => {
    try {
      const response = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
        {
          headers: {
            Token: "3ba50132-46c7-11f0-9b81-222185cb68c8",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching provinces:", error);
      throw error;
    }
  },

  getDistricts: async (provinceId: any) => {
    try {
      const response = await axios.get(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
        {
          headers: {
            Token: "3ba50132-46c7-11f0-9b81-222185cb68c8",
          },
          params: {
            province_id: provinceId,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching districts:", error);
      throw error;
    }
  },

  getWards: async (districtId: number) => {
    try {
      const response = await axios.post(
        "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
        { district_id: districtId },
        {
          headers: {
            Token: "3ba50132-46c7-11f0-9b81-222185cb68c8",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching wards:", error);
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
