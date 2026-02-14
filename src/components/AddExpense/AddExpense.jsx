import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import "./AddExpense.css";

export default function AddExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Load from localStorage once
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  // Save whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const num = Number(amount);
    if (!num || num <= 0) return;
    if (!description.trim()) return;

    setExpenses((prev) => [
      ...prev,
      {
        id: Date.now(),
        amount: num,
        description: description.trim(),
      },
    ]);

    setAmount("");
    setDescription("");
  };

  const handleDelete = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const visibleExpenses = showAll ? expenses : expenses.slice(0, 3);

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="add-expense-elements">
      <div className="add-expense-header">
        <h3>Track your expenses</h3>
      </div>

      <form className="add-expense" onSubmit={handleSubmit}>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          step="0.01"
          className="expense-value"
          placeholder="Amount"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className="expense-description"
          placeholder="Description"
        />

        <button className="expense-submit" type="submit">
          Add
        </button>
      </form>

      <div className="expenses-registered">
        <h3>Total: {total.toFixed(2)}</h3>

        <ul className="expenses-table">
          {visibleExpenses.map((exp) => (

            <li key={exp.id} className="expense-item">
                <span className="expense-item-amount">{exp.amount.toFixed(2)}</span>
                <span className="expense-item-desc">{exp.description}</span>

                <button
                    className="expense-delete-btn"
                    onClick={() => handleDelete(exp.id)}
                    type="button"
                >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>

        {expenses.length > 3 && (
          <button
            className="see-all-btn"
            onClick={() => setShowAll((s) => !s)}
            type="button"
          >
            {showAll ? "Show Less" : "See All"}
          </button>
        )}
      </div>
    </div>
  );
}
