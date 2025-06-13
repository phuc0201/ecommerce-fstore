import { useState, useEffect } from "react";
import { AddressLevel } from "../../types/address";
import { CiSearch } from "react-icons/ci";
import AddressService from "../../services/address.service";

export default function AddressSelector(props: {
  setAddress: (newAddress: any) => void;
  setClose: (open: boolean) => void;
}) {
  const [addressDetails, setAddressDetails] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [provinces, setProvinces] = useState<any[]>([]);
  const [searchProvinces, setSearchProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [searchDistricts, setSearchDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const [searchWards, setSearchWards] = useState<any[]>([]);
  const [selectedAddresses, setSelectedAddresses] = useState<
    {
      level: AddressLevel | null;
      id: Number;
      name: String;
    }[]
  >([]);

  const [currentLevel, setCurrentLevel] = useState<AddressLevel | null>(
    AddressLevel.Province
  );

  const addNewAddress = () => {
    let address =
      addressDetails !== "" ? addressDetails + ", " : addressDetails;

    let reverseSelectedAddress = [...selectedAddresses];
    reverseSelectedAddress.reverse().map((item, index) => {
      address +=
        index < selectedAddresses.length - 1 ? item.name + ", " : item.name;
    });
    props.setAddress({
      address: address,
      to_district_id: selectedAddresses[1].id,
      to_ward_code: selectedAddresses[2].id,
    });
    props.setClose(false);
  };

  const handleSelectAddress = async (selectedItem: {
    id: number;
    name: string;
  }) => {
    setSearchValue("");
    if (currentLevel === AddressLevel.Province) {
      setSelectedAddresses((prev) => [
        ...prev,
        {
          level: AddressLevel.Province,
          ...selectedItem,
        },
      ]);

      const districts = await AddressService.getDistricts(selectedItem.id);

      setDistricts(districts.data);
      setSearchDistricts(districts.data);
      setCurrentLevel(AddressLevel.District);
    } else if (currentLevel === AddressLevel.District) {
      setSelectedAddresses((prev) => [
        ...prev,
        {
          level: AddressLevel.District,
          ...selectedItem,
        },
      ]);
      const wards = await AddressService.getWards(selectedItem.id);
      setWards(wards.data);
      setSearchWards(wards.data);
      setCurrentLevel(AddressLevel.Ward);
    } else if (currentLevel === AddressLevel.Ward) {
      setSelectedAddresses((prev) => [
        ...prev,
        {
          level: AddressLevel.Ward,
          ...selectedItem,
        },
      ]);
      setCurrentLevel(null);
    }
  };

  const resetSelectedAddress = (resetLevel: AddressLevel | null = null) => {
    if (!resetLevel) {
      // Reset all selections
      setSelectedAddresses([]);
      setCurrentLevel(AddressLevel.Province);
      setDistricts([]);
      setSearchDistricts([]);
      setWards([]);
      setSearchWards([]);
      setAddressDetails("");
      setSearchValue("");
      setSearchProvinces(provinces);
      return;
    }

    // Find index of the level to reset to
    const levelIndex = selectedAddresses.findIndex(
      (item) => item.level === resetLevel
    );
    if (levelIndex === -1) return;

    const newSelected = selectedAddresses.slice(0, levelIndex);
    setSelectedAddresses(newSelected);

    if (resetLevel === AddressLevel.Province) {
      setCurrentLevel(AddressLevel.Province);
      setDistricts([]);
      setSearchDistricts([]);
      setWards([]);
      setSearchWards([]);
      setAddressDetails("");
      setSearchValue("");
      setSearchProvinces(provinces);
    } else if (resetLevel === AddressLevel.District) {
      setCurrentLevel(AddressLevel.District);
      setWards([]);
      setSearchWards([]);
      setAddressDetails("");
      setSearchValue("");
      // Restore districts for the selected province
      const province = newSelected.find(
        (item) => item.level === AddressLevel.Province
      );
      if (province) {
        AddressService.getDistricts(Number(province.id)).then((districts) => {
          setDistricts(districts.data);
          setSearchDistricts(districts.data);
        });
      }
    } else if (resetLevel === AddressLevel.Ward) {
      setCurrentLevel(AddressLevel.Ward);
      setAddressDetails("");
      setSearchValue("");
      // Restore wards for the selected district
      const district = newSelected.find(
        (item) => item.level === AddressLevel.District
      );
      if (district) {
        AddressService.getWards(Number(district.id)).then((wards) => {
          setWards(wards.data);
          setSearchWards(wards.data);
        });
      }
    }
  };

  const normalizeString = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const searchAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (currentLevel === AddressLevel.Province) {
      setSearchProvinces(
        provinces.filter((item: any) =>
          normalizeString(item.ProvinceName).includes(
            normalizeString(e.target.value)
          )
        )
      );
    } else if (currentLevel === AddressLevel.District) {
      setSearchDistricts(
        districts.filter((item: any) =>
          normalizeString(item.DistrictName).includes(
            normalizeString(e.target.value)
          )
        )
      );
    } else if (currentLevel === AddressLevel.Ward) {
      setSearchWards(
        wards.filter((item: any) =>
          normalizeString(item.WardName).includes(
            normalizeString(e.target.value)
          )
        )
      );
    }
  };

  const fetchAdminBoundaries = async () => {
    try {
      let provinces = await AddressService.getProvinces();
      setProvinces(provinces.data);
      setSearchProvinces(provinces.data);
    } catch (error) {
      console.error("Error fetching data" + error);
    }
  };

  useEffect(() => {
    fetchAdminBoundaries();
  }, []);

  return (
    <div className="p-4 flex flex-col h-full">
      <div>
        <div className="text-blue-600 text-sm mb-5 flex items-center justify-between">
          <button
            onClick={() => props.setClose(false)}
            className="flex items-center gap-2"
          >
            <i className="fa-solid fa-angle-left"></i>
            <span>Trở về</span>
          </button>
          <button onClick={() => resetSelectedAddress()} className="">
            <span>Thiết lập lại</span>
          </button>
        </div>

        <div className="text-gray-500 mb-3">Thông tin người nhận</div>

        <div>
          <div className="flex flex-col gap-5">
            {selectedAddresses.map((item, index) => (
              <div
                key={index}
                onClick={() => resetSelectedAddress(item.level)}
                className="pl-3 flex items-center gap-2 cursor-pointer"
              >
                <div className="relative flex h-6 w-6 items-center justify-center rounded-full border border-solid border-gray-500 after:w-[1px] after:h-5 after:bg-gray-500 after:absolute after:top-full after:left-1/2 after:translate-x-1/2"></div>
                <div>{item.name}</div>
              </div>
            ))}

            <div className="flex items-center gap-2 rounded-[8px] border border-solid border-primary p-3 mb-5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full border border-solid border-primary">
                <div className="h-4 w-4 rounded-full bg-primary"></div>
              </div>
              <div className="text-sm">
                {selectedAddresses.length < 3 &&
                  (currentLevel === AddressLevel.Province
                    ? "Chọn tỉnh/thành phố"
                    : currentLevel === AddressLevel.District
                    ? "Chọn quận/huyện"
                    : "Chọn phường/xã")}
                {selectedAddresses.length === 3 && "Địa chỉ chi tiết"}
              </div>
            </div>
          </div>

          {selectedAddresses.length < 3 && (
            <div className="rounded-full border border-gray-500 overflow-hidden p-1 pl-4 pr-1 flex items-center">
              <input
                type="text"
                name=""
                id=""
                placeholder="Tìm kiếm..."
                value={searchValue}
                onChange={(e) => {
                  searchAddress(e);
                }}
                className="w-full focus:ring-0 border-none outline-none h-4 placeholder:text-gray-400 placeholder:text-sm"
              />
              <button className="w-10 aspect-square text-white bg-primary rounded-full flex">
                <CiSearch className="text-2xl m-auto" />
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        className={`overflow-y-auto customize-scrollbar mt-5 ${
          selectedAddresses.length === 3 ? "" : "grid grid-cols-2"
        }`}
      >
        {selectedAddresses.length < 1 &&
          searchProvinces.length > 0 &&
          searchProvinces
            .filter(
              (item: any) => !item.ProvinceName?.toLowerCase().includes("test")
            )
            .map((item: any) => (
              <div
                key={item.ProvinceID}
                onClick={() =>
                  handleSelectAddress({
                    id: item.ProvinceID,
                    name: item.ProvinceName,
                  })
                }
                className=" hover:text-primary text-sm cursor-pointer p-2 col-span-1"
              >
                {item.ProvinceName}
              </div>
            ))}

        {selectedAddresses.length === 1 &&
          searchDistricts.length > 0 &&
          searchDistricts
            .filter(
              (item: any) => !item.DistrictName?.toLowerCase().includes("test")
            )
            .map((item: any) => (
              <div
                key={item.DistrictID}
                onClick={() =>
                  handleSelectAddress({
                    id: item.DistrictID,
                    name: item.DistrictName,
                  })
                }
                className="hover:text-primary text-sm cursor-pointer p-2 col-span-1"
              >
                {item.DistrictName}
              </div>
            ))}

        {selectedAddresses.length === 2 &&
          searchWards.length > 0 &&
          searchWards
            .filter(
              (item: any) => !item.WardName?.toLowerCase().includes("test")
            )
            .map((item: any) => (
              <div
                key={item.WardCode}
                onClick={() =>
                  handleSelectAddress({
                    id: item.WardCode,
                    name: item.WardName,
                  })
                }
                className="hover:text-primary text-sm cursor-pointer p-2 col-span-1"
              >
                {item.WardName}
              </div>
            ))}

        {selectedAddresses.length === 3 && (
          <div>
            <label
              htmlFor="address_details"
              className="block mb-2 text-gray-500"
            >
              Thông tin chi tiết (Số nhà, đường, ...)
            </label>
            <textarea
              id="address_details"
              rows={4}
              value={addressDetails}
              onChange={(e) => {
                let value = e.target.value;
                if (value.length < 100) {
                  setAddressDetails(value);
                }
              }}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-yellow-100 focus:border-primary focus:outline-none placeholder:text-sm placeholder:text-gray-400"
            ></textarea>
          </div>
        )}
      </div>

      {selectedAddresses.length === 3 && (
        <button
          onClick={() => addNewAddress()}
          className={`absolute bottom-4 right-4 left-4 p-3  bg-primary text-white rounded-lg`}
        >
          <span>Xác nhận</span>
        </button>
      )}
    </div>
  );
}
