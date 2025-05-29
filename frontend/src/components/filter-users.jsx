import { Select } from "antd"
import { useSearchParams } from "react-router-dom";

function FilterUsers() {
    const [searchParams, setSearchParams] = useSearchParams()
    const handleChangeFilter = value => {
        console.log(`selected ${value}`);
        searchParams.set('filter', value)
        setSearchParams(searchParams)
    };
  return (
    <>
        <Select
            defaultValue="last"
            style={{ width: 150}}
            onChange={handleChangeFilter}
            className="p-[30px]"
            options={[
                { value: 'name', label: 'By Name' },
                { value: 'email', label: 'By Email' },
                { value: 'last', label: 'By Last Online' },
            ]}
        />
    </>
  )
}

export default FilterUsers