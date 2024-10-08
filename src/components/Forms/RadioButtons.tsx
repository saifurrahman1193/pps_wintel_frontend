const RadioButtons = ({ label, value, onChange }:any) => {

    const cb_element = 'cb_'+getRandomArbitrary(100,1000)

    function getRandomArbitrary(min:number, max:number) {
      return Math.random() * (max - min) + min;
    }
    
  
    return (
      <>
          <div className="custom-control custom-radio mb-2 mx-1">
              <input className="custom-control-input" type="radio" checked={value} onChange={onChange} id={cb_element} style={{ "cursor" : "pointer" }}/>
              <label className="custom-control-label" htmlFor={cb_element} style={{ "cursor" : "pointer" }}>{label}</label>
          </div>
      </>
    );
};


export default RadioButtons
