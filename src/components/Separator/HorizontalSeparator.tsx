import './horizontal_separator_styles.css';

function HorizontalSeparator(props:any) {
  return (
    <div className={'separator '+(props?.class||'')}>{props?.text}</div>
  )
}

export default HorizontalSeparator