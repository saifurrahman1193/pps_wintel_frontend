const Checkbox = ({ label, labelClass, value, onChange, disabled }:any) => {
    const cb_element = 'cb_' + getRandomArbitrary(100, 1000)

    function getRandomArbitrary(min:number=0, max:number=0) {
        return Math.random() * (max - min) + min;
    }

    return (
        <>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={value} onChange={onChange} id={cb_element} style={{ "cursor": "pointer" }} disabled={disabled} />
                <label className={"form-check-label " + (labelClass || "") + " " + (disabled ? "text-muted" : "")} htmlFor={cb_element} style={{ "cursor": "pointer" }}>{label}</label>
            </div>
        </>
    );
};


export default Checkbox
