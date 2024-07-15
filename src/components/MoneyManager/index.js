import {v4 as v4uuid} from 'uuid'
import {Component} from 'react'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    ContList: [],
    title: '',
    amount: 0,
    type: 'INCOME',
  }

  inputChange = event => {
    this.setState({title: event.target.value})
  }

  amountChange = event => {
    this.setState({amount: parseInt(event.target.value)})
  }

  typeChange = event => {
    this.setState({type: event.target.value})
  }

  submit = event => {
    event.preventDefault()
    const {ContList, title, amount, type} = this.state
    if (title !== '' && amount > 0) {
      const newList = [...ContList, {id: v4uuid(), title, amount, type}]
      this.setState({ContList: newList, title: '', amount: 0, type: 'INCOME'})
    }
  }

  deleteTrans = id => {
    const {ContList} = this.state
    const newList = ContList.filter(x => x.id !== id)
    this.setState({ContList: newList})
  }

  render() {
    const {ContList, title, amount, type} = this.state
    const {income, expenses} =
      ContList.length > 0
        ? ContList.reduce(
            (acc, x) => {
              if (x.type === 'INCOME') {
                acc.income += x.amount
              } else if (x.type === 'EXPENSES') {
                acc.expenses += x.amount
              }
              return acc
            },
            {income: 0, expenses: 0},
          )
        : {income: 0, expenses: 0}
    // console.log(income)
    // console.log(expenses)
    // console.log(typeof this.state.amount)
    return (
      <div className="outer-cont">
        <div className="pCard">
          <h1>HI, Richard</h1>
          <p>
            Welcome back to your
            <span style={{color: '#0b69ff'}}> Money Manager</span>
          </p>
        </div>
        <div className="card-cont">
          <MoneyDetails
            name="Your Balance"
            value={income - expenses}
            testid="balanceAmount"
            icon="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
            altvalue="balance"
            color="#84cc16"
          />
          <MoneyDetails
            name="Your Income"
            value={income}
            testid="incomeAmount"
            icon="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
            altvalue="income"
            color="#cffafe"
          />
          <MoneyDetails
            name="Your Expenses"
            value={expenses}
            testid="expensesAmount"
            icon="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
            altvalue="expenses"
            color="#7c3aed"
          />
        </div>
        <div className="two-cont-cont">
          <form className="add-transaction">
            <h1>Add Transaction</h1>
            <label className="label" htmlFor="transtitle">
              TITLE
            </label>
            <input
              className="input"
              onChange={this.inputChange}
              placeholder="TITLE"
              id="transtitle"
              value={title}
            />
            <label className="label" htmlFor="transamt">
              AMOUNT
            </label>
            <input
              id="transamt"
              className="input"
              placeholder="AMOUNT"
              type="number"
              min="0"
              value={amount > 0 ? String(amount) : ''}
              onChange={this.amountChange}
            />
            <label className="label" htmlFor="dropdown">
              TYPE
            </label>
            <select
              className="input"
              id="dropdown"
              value={type}
              onChange={this.typeChange}
            >
              <option value={transactionTypeOptions[0].optionId}>
                {transactionTypeOptions[0].displayText}
              </option>
              <option value={transactionTypeOptions[1].optionId}>
                {transactionTypeOptions[1].displayText}
              </option>
            </select>
            <button className="submit" type="submit" onClick={this.submit}>
              Add
            </button>
          </form>
          <div className="show-transaction">
            <h1>History</h1>
            <hr style={{color: 'black', width: '100%'}} />
            <ul className="outer-lst-cont">
              <li key="mk-4" className="outer-lst-itm">
                <p className="my-itm">Title</p>
                <p className="my-itm">Amount</p>
                <p className="my-itm">Type</p>
              </li>
              <hr style={{color: 'black', width: '100%'}} />
              {ContList.map(x => (
                <TransactionItem
                  key={x.id}
                  deleteTrans={this.deleteTrans}
                  Details={x}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
