
import PropTypes from 'prop-types';
import React  from 'react';


function FormRowSelect({name,labelText,list,defaultValue='',onChange}) {
    
  return (
    <div className='form-row'>
    <label htmlFor={name} className='form-label'>
        {labelText || name}
    </label>
    <select name={name} id={name} className='form-select' defaultValue={defaultValue} onChange={onChange}>
      {list.map((itemValue)=>{
        return <option key={itemValue} value={itemValue}>
          {itemValue}
        </option>
      })}
    </select>
    </div>
  )
}

FormRowSelect.propTypes = {
    name : PropTypes.string,
    labelText:PropTypes.string,
    list:PropTypes.array,
    defaultValue:PropTypes.string

}

export default FormRowSelect