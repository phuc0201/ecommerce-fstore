import { useState, useEffect, useMemo } from "react";
import type { Province, District, Ward } from "../../types/address.type";
import { AddressLevel } from "../../types/address.type";
import { CiSearch } from "react-icons/ci";
import AddressService from "../../services/address.service";

export default function AddressSelector(props: {
  setAddress: (address: string) => void;
  setClose: (open: boolean) => void;
}) {
  const [addressDetails, setAddressDetails] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [administrativeAreas, setAdministrativeAreas] = useState<
    Province[] | District[] | Ward[]
  >([]);
  const [searchableAreas, setSearchableAreas] = useState<
    Province[] | District[] | Ward[]
  >([]);

  const [selectedAddresses, setSelectedAddresses] = useState<
    {
      level: AddressLevel | null;
      id: string;
      name: string;
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
    props.setAddress(address);
    props.setClose(false);
  };

  const handleSelectAddress = (selectedItem: { id: string; name: string }) => {
    setSearchValue("");

    if (currentLevel === AddressLevel.Province) {
      setSelectedAddresses([{ level: AddressLevel.Province, ...selectedItem }]);
      const province = provinces.find((p) => p.Id === selectedItem.id);
      if (province) {
        setAdministrativeAreas(province.Districts);
        setCurrentLevel(AddressLevel.District);
      }
    } else if (currentLevel === AddressLevel.District) {
      setSelectedAddresses((prev) => [
        ...prev,
        { level: AddressLevel.District, ...selectedItem },
      ]);
      const district = (administrativeAreas as District[]).find(
        (d) => d.Id === selectedItem.id
      );
      if (district) {
        setAdministrativeAreas(district.Wards);
        setCurrentLevel(AddressLevel.Ward);
      }
    } else if (currentLevel === AddressLevel.Ward) {
      setSelectedAddresses((prev) => [
        ...prev,
        { level: AddressLevel.Ward, ...selectedItem },
      ]);
      setCurrentLevel(null);
    }
  };

  const resetSelectedAddress = (resetLevel: AddressLevel | null = null) => {
    if (!resetLevel) {
      setSelectedAddresses([]);
      setAdministrativeAreas(provinces);
      setCurrentLevel(AddressLevel.Province);
    } else {
      let newSelectedAddress = [];
      for (let i = 0; i < selectedAddresses.length; i++) {
        if (selectedAddresses[i].level !== resetLevel) {
          newSelectedAddress.push(selectedAddresses[i]);
        } else if (selectedAddresses[i].level === resetLevel) break;
      }
      setSelectedAddresses(newSelectedAddress);
      setCurrentLevel(resetLevel);

      switch (resetLevel) {
        case AddressLevel.Province:
          setAdministrativeAreas(provinces);
          break;
        case AddressLevel.District:
        case AddressLevel.Ward:
          const selectedProvince = provinces.find(
            (item) => item.Name === selectedAddresses[0]?.name
          );
          if (resetLevel === AddressLevel.District) {
            setAdministrativeAreas(selectedProvince?.Districts ?? []);
          } else {
            const selectedDistrict = selectedProvince?.Districts.find(
              (item) => item.Name === selectedAddresses[1]?.name
            );
            setAdministrativeAreas(selectedDistrict?.Wards ?? []);
          }
          break;
        default:
          break;
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
    setSearchableAreas(
      administrativeAreas.filter((item) =>
        normalizeString(item.Name).includes(normalizeString(e.target.value))
      ) as Province[] | District[] | Ward[]
    );
  };

  const fetchAdminBoundaries = async () => {
    try {
      let data = AddressService.getAddress();
      let adminBoundaries = await data;
      setAdministrativeAreas(adminBoundaries);
      setSearchableAreas(adminBoundaries);
      setProvinces(adminBoundaries);
    } catch (error) {
      console.error("Error fetching data" + error);
    }
  };

  useEffect(() => {
    fetchAdminBoundaries();
  }, []);

  useMemo(() => {
    setSearchableAreas(administrativeAreas);
  }, [administrativeAreas]);

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
        {selectedAddresses.length < 3 &&
          (searchableAreas as (Province | District | Ward)[]).map((item) => (
            <div
              key={item.Id}
              onClick={() =>
                handleSelectAddress({ id: item.Id, name: item.Name })
              }
              className=" hover:text-primary text-sm cursor-pointer p-2 col-span-1"
            >
              {item.Name}
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
