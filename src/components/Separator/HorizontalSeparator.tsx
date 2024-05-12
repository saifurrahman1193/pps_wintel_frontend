import './horizontal_separator_styles.css';

function HorizontalSeparator(props) {
  return (
    <div className={'separator '+(props?.class||'')}>{props?.text}</div>
  )
}

export default HorizontalSeparator