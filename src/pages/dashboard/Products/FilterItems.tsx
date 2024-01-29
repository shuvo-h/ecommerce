import { FieldValues } from "react-hook-form";
import ElectroForm from "../../../components/form/ElectroForm";
import ElectroInput from "../../../components/form/ElectroInput";
import {  DatePicker, DatePickerProps, Slider } from "antd";
import { productsApi } from "../../../redux/features/products/productsApi";
import ElectroSelect from "../../../components/form/ElectroSelect";
import { useDispatch } from "react-redux";
import debounce from "lodash/debounce"
import { setPriceQuery, setQuery } from "../../../redux/features/products/productSlice";
type FilterItems = {
  onSearch: (data: FieldValues) => void;
};

const FilterItems = ({ onSearch }: FilterItems) => {
  const dispatch = useDispatch();
  const { data: options, isLoading } =
    productsApi.useGetProductFilterOptionsQuery(undefined);

  const optionFormatter = (optionsData: string[]) => {
    const options = ['All',...optionsData]
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

  const onPriceRangeChange = debounce((value: number[]) => {
    // dispatch(setQuery({key:"minPrice"}))
    const [minPrice,maxPrice] = value;
    dispatch(setPriceQuery({minPrice,maxPrice}))
  },1000);
  
  const onReleaseDateChange: DatePickerProps["onChange"] = (
    _date,
    dateString
    ) => {
      dispatch(setQuery({key:"releaseDate",value:dateString}))
    };
    
    const onBrandChange = (value: string) => {
      dispatch(setQuery({key:"brand",value}))
    };
    const onModelChange = (value: string) => {
      dispatch(setQuery({key:"model",value}))
    };
    const onCategoryChange = (value: string) => {
      dispatch(setQuery({key:"category",value}))
    };
    const onOSChange = (value: string) => {
      console.log(value);
      dispatch(setQuery({key:"operatingSystem",value}))
    };
    const onConnectivityChange = (value: string) => {
      console.log(value);
      dispatch(setQuery({key:"connectivity",value}))
    };
    const onPowerSourceChange = (value: string) => {
      console.log(value);
      dispatch(setQuery({key:"powerSource",value}))
    };
    const onCameraResulationChange = (value: string) => {
      console.log(value);
      dispatch(setQuery({key:"cameraResolution",value}))
    };
    const onStorageCapacityChange = (value: string) => {
      console.log(value);
      dispatch(setQuery({key:"storageCapacity",value}))
    };
    const onScreenSizeChange = (value: string) => {
      console.log(value);
      dispatch(setQuery({key:"screenSize",value}))
  };

  return (
    <div>
      <ElectroForm
        className="border p-4 rounded-lg shadow-md"
        onSubmit={onSearch}
        defaultValues={undefined}
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8">
          <ElectroInput 
            className="mb-4"
            type="search" 
            name="search" 
            label="Search product" 
            placeHolder="Search by name, model, etc." 
            
          />
          <div>
            <label className="font-semibold">
              Price Range
              <Slider onChange={onPriceRangeChange} range defaultValue={[10, 5000]} marks={{'0':0,'50000':50000}} min={0} max={50000} disabled={false} />
            </label>
          </div>

          <div>
            <label className="font-semibold">
              Release Date
              <DatePicker
                className="block mb-4"
                onChange={onReleaseDateChange}
                defaultValue={undefined}
              />
            </label>
          </div>
          <div>
            <label  className="font-semibold">
              Brand:
              <ElectroSelect
              className="block mb-4"
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
            <label className="font-semibold">
              Model:
              <ElectroSelect
              className="block mb-4"
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
            <label className="font-semibold">
              Category:
              <ElectroSelect
              className="block mb-4"
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
            <label className="font-semibold">
              Operating System:
              <ElectroSelect
              className="block mb-4"
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
            <label className="font-semibold">
              Connectivity:
              <ElectroSelect
              className="block mb-4"
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
            <label className="font-semibold">
              Power Source:
              <ElectroSelect
              className="block mb-4"
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
            <label className="font-semibold">
              Camera Resulation:
              <ElectroSelect
              className="block mb-4"
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
            <label className="font-semibold">
              Storage Capacity:
              <ElectroSelect
              className="block mb-4"
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
            <label className="font-semibold">
              Screen Size:
              <ElectroSelect
              className="block mb-4"
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
          {/* invisiable submit button to submit the form for search field */}
          <button type="submit"></button>
        </div>
      </ElectroForm>
    </div>
  );
};

export default FilterItems;
