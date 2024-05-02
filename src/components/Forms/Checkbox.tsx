import React, { useState, Fragment } from 'react';

const Checkbox = ({ label, labelClass, value, onChange, disabled }) => {
    const [checked, setChecked] = useState(false);
  
    const handleChange = () => {
      setChecked(!checked);
    };

    const cb_element = 'cb_'+getRandomArbitrary(100,1000)

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }
    
  
    return (
      <>
          <div className="custom-control custom-checkbox mb-2 mx-1">
              <input className="custom-control-input" type="checkbox" checked={value} onChange={onChange} id={cb_element} style={{ "cursor" : "pointer" }} disabled={disabled} />
              <label className={"custom-control-label "+(labelClass||"")+" "+(disabled ? "text-muted":"")} htmlFor={cb_element} style={{ "cursor" : "pointer" }}>{label}</label>
          </div>
      </>
    );
};


export default Checkbox
