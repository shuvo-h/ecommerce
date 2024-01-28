import { FieldValues } from "react-hook-form";
import ElectroForm from "../../../components/form/ElectroForm";
import ElectroInput from "../../../components/form/ElectroInput";
import {  DatePicker, DatePickerProps, Slider } from "antd";
import { productsApi } from "../../../redux/features/products/productsApi";
import ElectroSelect from "../../../components/form/ElectroSelect";
type FilterItems = {
  onSearch: (data: FieldValues) => void;
};

const FilterItems = ({ onSearch }: FilterItems) => {
  const { data: options, isLoading } =
    productsApi.useGetProductFilterOptionsQuery(undefined);
  console.log(options);

  const optionFormatter = (options: string[]) => {
    try {
      const filteredList = options.filter((str) => str.trim() !== "");
      const list = filteredList.map((el: string) => ({ value: el, label: el }));
      if (list.length) {
        return { list, defaultValue: list[0].value };
      } else {
        return { list, defaultValue: "" };
      }
    } catch (error) {
      console.log(error);
      return { list: [], defaultValue: "" };
    }
  };
  const onReleaseDateChange: DatePickerProps["onChange"] = (
    _date,
    dateString
  ) => {
    console.log(dateString);
  };

  const onBrandChange = (value: string) => {
    console.log(value);
  };
  const onModelChange = (value: string) => {
    console.log(value);
  };
  const onCategoryChange = (value: string) => {
    console.log(value);
  };
  const onOSChange = (value: string) => {
    console.log(value);
  };
  const onConnectivityChange = (value: string) => {
    console.log(value);
  };
  const onPowerSourceChange = (value: string) => {
    console.log(value);
  };
  const onCameraResulationChange = (value: string) => {
    console.log(value);
  };
  const onStorageCapacityChange = (value: string) => {
    console.log(value);
  };
  const onScreenSizeChange = (value: string) => {
    console.log(value);
  };

  return (
    <div>
      <ElectroForm
        className="border p-4 rounded-lg shadow-md"
        onSubmit={onSearch}
        defaultValues={undefined}
      >
        <div className="grid grid-cols-4 gap-2">
          <ElectroInput type="search" name="search" label="Search product" placeHolder="Search by name, model, etc." />
          <div>
            <label>
              Price Range
              <Slider range defaultValue={[20, 50]} disabled={false} />
            </label>
          </div>

          <div>
            <label>
              Release Date
              <DatePicker
                onChange={onReleaseDateChange}
                defaultValue={undefined}
              />
            </label>
          </div>
          <div>
            <label>
              Brand:
              <ElectroSelect
                onChange={onBrandChange}
                options={optionFormatter(options?.data?.brand || []).list}
                defaultValue={
                  optionFormatter(options?.data?.brand || []).defaultValue ||
                  undefined
                }
                placeholder="Select Brand"
                isLoading={isLoading}
              />
            </label>
          </div>

          <div>
            <label>
              Model:
              <ElectroSelect
                onChange={onModelChange}
                options={optionFormatter(options?.data?.modelNumber || []).list}
                defaultValue={
                  optionFormatter(options?.data?.modelNumber || [])
                    .defaultValue || undefined
                }
                placeholder="Select Model"
                isLoading={isLoading}
              />
            </label>
          </div>

          <div>
            <label>
              Category:
              <ElectroSelect
                onChange={onCategoryChange}
                options={optionFormatter(options?.data?.category || []).list}
                defaultValue={
                  optionFormatter(options?.data?.category || []).defaultValue ||
                  undefined
                }
                placeholder="Select Category"
                isLoading={isLoading}
              />
            </label>
          </div>

          <div>
            <label>
              Operating System:
              <ElectroSelect
                onChange={onOSChange}
                options={
                  optionFormatter(options?.data?.operatingSystem || []).list
                }
                defaultValue={
                  optionFormatter(options?.data?.operatingSystem || [])
                    .defaultValue || undefined
                }
                placeholder="Select Operating System"
                isLoading={isLoading}
              />
            </label>
          </div>

          <div>
            <label>
              Connectivity:
              <ElectroSelect
                onChange={onConnectivityChange}
                options={
                  optionFormatter(options?.data?.connectivity || []).list
                }
                defaultValue={
                  optionFormatter(options?.data?.connectivity || [])
                    .defaultValue || undefined
                }
                placeholder="Select Connectivity"
                isLoading={isLoading}
              />
            </label>
          </div>

          <div>
            <label>
              Power Source:
              <ElectroSelect
                onChange={onPowerSourceChange}
                options={optionFormatter(options?.data?.powerSource || []).list}
                defaultValue={
                  optionFormatter(options?.data?.powerSource || [])
                    .defaultValue || undefined
                }
                placeholder="Select Power Source"
                isLoading={isLoading}
              />
            </label>
          </div>

          <div>
            <label>
              Camera Resulation:
              <ElectroSelect
                onChange={onCameraResulationChange}
                options={
                  optionFormatter(
                    options?.data?.features?.cameraResolution || []
                  ).list
                }
                defaultValue={
                  optionFormatter(
                    options?.data?.features?.cameraResolution || []
                  ).defaultValue || undefined
                }
                placeholder="Select Camera Resulation"
                isLoading={isLoading}
              />
            </label>
          </div>
          <div>
            <label>
              Camera Resulation:
              <ElectroSelect
                onChange={onStorageCapacityChange}
                options={
                  optionFormatter(
                    options?.data?.features?.storageCapacity || []
                  ).list
                }
                defaultValue={
                  optionFormatter(
                    options?.data?.features?.storageCapacity || []
                  ).defaultValue || undefined
                }
                placeholder="Select Storage Capacity"
                isLoading={isLoading}
              />
            </label>
          </div>
          <div>
            <label>
              Camera Resulation:
              <ElectroSelect
                onChange={onScreenSizeChange}
                options={
                  optionFormatter(options?.data?.features?.screenSize || [])
                    .list
                }
                defaultValue={
                  optionFormatter(options?.data?.features?.screenSize || [])
                    .defaultValue || undefined
                }
                placeholder="Select Screen Size"
                isLoading={isLoading}
              />
            </label>
          </div>

          
        </div>
      </ElectroForm>
    </div>
  );
};

export default FilterItems;
