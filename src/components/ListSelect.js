export default function ListSelect({ labelText, initialValue, arrayToMap, handleChange }) {
    return (
      <label>
        {labelText}
        <select value={initialValue} onChange={e => handleChange(e.target.value)}>
          {
            arrayToMap.map((item) => {
              return <option value={item} key={item}>{item}</option>
            })
          }
        </select>
      </label>
    )
  }