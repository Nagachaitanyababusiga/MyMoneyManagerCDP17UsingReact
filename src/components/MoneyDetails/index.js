// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {name, icon, value, altvalue, color, testid} = props
  return (
    <div style={{backgroundColor: color}} className="MoneyDetailItem">
      <img className="icon" src={icon} alt={altvalue} />
      <div className="MoneyDetailItemtext">
        <p className="MoneyDetailItempara">{name}</p>
        <p className="MoneyDetailItemamt" data-testid={testid}>
          Rs.{value}
        </p>
      </div>
    </div>
  )
}

export default MoneyDetails
