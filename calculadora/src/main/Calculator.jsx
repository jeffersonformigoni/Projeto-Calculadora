import React, { Component } from "react";
import "./Calculator.css";

import Button from "../components/Button";
import Display from "../components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};
export default class Calculator extends Component {
  state = { ...initialState };

  constructor(props) {
    super(props);

    this.clearMemory = this.clearMemory.bind(this);
    this.setOperation = this.setOperation.bind(this);
    this.addDigit = this.addDigit.bind(this);
  }

  clearMemory() {
    this.setState({ ...initialState });
  }

  setOperation(operation) {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true });
    } else {
      const equal = operation === "=";
      const currentOperation = this.state.operation;

      const values = [...this.state.values];
      try {
        if (currentOperation && values[1] !== 0) {
          switch (currentOperation) {
            case "+":
              values[0] = values[0] + values[1];
              break;
            case "-":
              values[0] = values[0] - values[1];
              break;
            case "*":
              values[0] = values[0] * values[1];
              break;
            case "/":
              values[0] = values[0] / values[1];
              break;
            default:
              break;
          }
        }
      } catch (e) {
        values[0] = this.state.values[0];
      }

      // Verifica se o resultado é NaN ou Infinity
      if (isNaN(values[0]) || !isFinite(values[0])) {
        this.clearMemory();
        return;
      }

      values[1] = 0;

      this.setState({
        displayValue: values[0],
        operation: equal ? null : operation,
        current: equal ? 0 : 1,
        clearDisplay: !equal,
        values,
      });
    }
  }

  addDigit(n) {
    // Garante que displayValue seja tratado como string
    const displayValue = String(this.state.displayValue);

    // Evita múltiplos pontos no mesmo número
    if (n === "." && displayValue.includes(".")) {
      return;
    }

    // Verifica se o display deve ser limpo
    const clearDisplay = displayValue === "0" || this.state.clearDisplay;

    // Define o valor atual do display
    const currentValue = clearDisplay ? "" : displayValue;

    // Adiciona o dígito ou ponto ao valor atual
    const newDisplayValue = n === "." && clearDisplay ? "0." : currentValue + n;

    // Atualiza o estado do display
    this.setState({ displayValue: newDisplayValue, clearDisplay: false });

    // Atualiza o array de valores apenas se o dígito não for um ponto
    if (n !== ".") {
      const i = this.state.current;
      const newValue = parseFloat(newDisplayValue);
      const values = [...this.state.values];
      values[i] = newValue;
      this.setState({ values });
    }
  }

  render() {
    return (
      <div className="calculator">
        <Display value={this.state.displayValue} />
        <Button label="AC" click={this.clearMemory} triple />
        <Button label="/" click={this.setOperation} operation />
        <Button label="7" click={this.addDigit} />
        <Button label="8" click={this.addDigit} />
        <Button label="9" click={this.addDigit} />
        <Button label="*" click={this.setOperation} operation />
        <Button label="4" click={this.addDigit} />
        <Button label="5" click={this.addDigit} />
        <Button label="6" click={this.addDigit} />
        <Button label="-" click={this.setOperation} operation />
        <Button label="1" click={this.addDigit} />
        <Button label="2" click={this.addDigit} />
        <Button label="3" click={this.addDigit} />
        <Button label="+" click={this.setOperation} operation />
        <Button label="0" click={this.addDigit} double />
        <Button label="." click={this.addDigit} />
        <Button label="=" click={this.setOperation} operation />
      </div>
    );
  }
}
