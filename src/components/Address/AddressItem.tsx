import AddressService from "../../services/address.service";
import { Address } from "../../types/address.type";

type AddressItemProps = {
  address: Address;
  selectedAddress: Address;
  setSelectedAddress: (address: Address) => void;
  setIsRemoveAddress: (isRemove: boolean) => void;
};

export default function AddressItem({
  address,
  selectedAddress,
  setSelectedAddress,
  setIsRemoveAddress,
}: AddressItemProps) {
  const removeAddress = (address: Address) => {
    AddressService.removeAddress(address.id);
    setIsRemoveAddress(true);
  };

  const selectAddress = (address: Address) => {
    AddressService.setSelectedAddress(address);
    setSelectedAddress(address);
  };
  return (
    <div className="flex gap-4">
      <input
        id={"radio-address-" + address.id}
        type="radio"
        name="list-radio-address"
        checked={address.id === selectedAddress.id}
        onChange={() => selectAddress(address)}
        className="ml-4"
      />
      <label
        htmlFor={"radio-address-" + address.id}
        className="grid gap-1 cursor-pointer w-full py-3 pr-4"
      >
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <h5 className="font-medium">{address.fullname}</h5>
            <div className="h-3 w-[2px] bg-gray-400"></div>
            <span className="">{address.phoneNumber}</span>
          </div>
          <button
            onClick={() => removeAddress(address)}
            className="text-sm text-red-400"
          >
            Xóa
          </button>
        </div>
        <div className="text-gray-500 text-sm line-clamp-1">
          {address.address}
        </div>
      </label>
    </div>
  );
}
