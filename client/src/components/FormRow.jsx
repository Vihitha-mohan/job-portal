import PropTypes from 'prop-types';
import React  from 'react';

function FormRow(props) {
    const {LabelText,defaultValue,name,type,onChange} = props;
    console.log(props);
  return (
        <div className="form-row"> 
        <label htmlFor={name} className="form-label">
          {LabelText || name}
        </label>
        <input type={type} id={name} name={name} className="form-input" defaultValue={defaultValue || ''} onChange={onChange} required/>
      </div>

  )
}

FormRow.propTypes = {
    LabelText : PropTypes.string,
    defaultValue : PropTypes.string,
    name:PropTypes.string,
    type:PropTypes.string

}
export default FormRow;