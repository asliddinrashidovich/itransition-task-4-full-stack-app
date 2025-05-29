import { Input } from "antd"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"

function SearchUsers() {
    const [inputValue, setInputvalue] = useState("")
    const [searchParams, setSearchParams] = useSearchParams()

    function handleSubmit() {
        console.log(inputValue)
        searchParams.set('search', inputValue)
        setSearchParams(searchParams)
    }
  return (
    <>
        <Input.Search value={inputValue} onChange={(e) => setInputvalue(e.target.value)} placeholder="Search" variant="filled" onSearch={handleSubmit} style={{width: '220px', background: 'transparent'}}/>
    </>
  )
}

export default SearchUsers