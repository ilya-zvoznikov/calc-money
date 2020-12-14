import React, { Component } from 'react';
import Total from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';

class App extends Component {

  // state = {
  //   transactions: JSON.parse(localStorage.getItem('transactions')) || [],
  //   description: '',
  //   amount: '',
  //   resultIncome: parseFloat(localStorage.getItem('resultIncome') || 0),
  //   resultExpences: parseFloat(localStorage.getItem('resultExpences') || 0),
  //   resultBalance: parseFloat(localStorage.getItem('resultBalance') || 0),
  // };

  componentWillMount = () => {
    this.setState({
      transactions: JSON.parse(localStorage.getItem('transactions')) || [],
      description: '',
      amount: '',
      resultIncome: parseFloat(localStorage.getItem('resultIncome') || 0),
      resultExpences: parseFloat(localStorage.getItem('resultExpences') || 0),
      resultBalance: parseFloat(localStorage.getItem('resultBalance') || 0),
    });
  }

  addTransaction = (add) => {
    const transactions = [...this.state.transactions];

    transactions.push({
      id: `cmr${(+new Date()).toString(16)}`,
      description: this.state.description,
      amount: this.state.amount,
      add,
    });

    this.setState({
      transactions,
      description: '',
      amount: '',
    },
      () => {
        this.getBalance();
        this.addToStorage();
      }
    );
  }

  addAmount = e => {
    this.setState({ amount: parseFloat(parseFloat(e.target.value).toFixed(2)) })
  }

  addDesctiption = e => {
    this.setState({ description: e.target.value })
  }

  getInOrOut = transactionType => (
    this.state.transactions
      .filter(item => transactionType ? item.add : !item.add)
      .reduce((acc, item) => (acc + item.amount).toFixed(2), 0)
  );

  getBalance = () => {
    const resultIncome = this.getInOrOut(true);
    const resultExpences = this.getInOrOut(false);
    const resultBalance = (resultIncome - resultExpences).toFixed(2);
    this.setState({
      resultIncome,
      resultExpences,
      resultBalance,
    })
  }

  addToStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(this.state.transactions));
    localStorage.setItem('resultBalance', this.state.resultBalance);
    localStorage.setItem('resultExpences', this.state.resultExpences);
    localStorage.setItem('resultIncome', this.state.resultIncome)
  }

  render() {
    return (
      <>
        <header>
          <h1>Кошелек</h1>
          <h2>Калькулятор расходов</h2>
        </header>

        <main>
          <div className="container">
            <Total
              state={this.state}
            />
            <History
              transactions={this.state.transactions}
            />
            <Operation
              addTransaction={this.addTransaction}
              addAmount={this.addAmount}
              addDescription={this.addDesctiption}
              description={this.state.description}
              amount={this.state.amount}
            />
          </div>
        </main>
      </>
    );
  }
}

export default App;
