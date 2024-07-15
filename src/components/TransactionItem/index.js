// Write your code here
import './index.css'

const TransactionItem = props => {
  const {Details, deleteTrans} = props
  const {id, title, amount, type} = Details
  const deleteit = () => {
    deleteTrans(id)
  }
  return (
    <>
      <li className="intransactionitm">
        <p className="trans-cont-itm">{title}</p>
        <p className="trans-cont-itm">{amount}</p>
        <p className="trans-cont-itm">{type}</p>
        <button className="delete-btn" type="button" onClick={deleteit}>
          <img
            className="delete-image"
            data-testid="delete"
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          />
        </button>
      </li>
      <hr style={{color: 'black', width: '100%'}} />
    </>
  )
}

export default TransactionItem
