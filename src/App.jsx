import './App.css'
import Header from './components/Header/Header'
import Calendar from './components/Calendar/Calendar'
import RandomImage from './components/RandomImage/randomimage';
import Alert from './components/Alert/Alert';
import RandomQuote from './components/RandomQuote/RandomQuote';
import AddExpense from './components/AddExpense/AddExpense';
import ToDoList from './components/ToDoList/ToDoList';

function App() {

  return (
    <div className="app">
      <div className="allcomponents">
        <Header />
        <div className='elements-grid'>
          <Calendar />
          <RandomImage />
          <Alert />
          <RandomQuote />
          <AddExpense />
          <ToDoList />
        </div>
      </div>
    </div>
  )
}

export default App
