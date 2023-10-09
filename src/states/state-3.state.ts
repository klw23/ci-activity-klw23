import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorState } from '../interfaces/calculator-state.interface';
import { CalculatorModel } from '../models/calculator.model';
import { State1 } from './state-1.state';
import { State2 } from './state-2.state';

export class State3 implements ICalculatorState {
  private constructor() {}

  private static theInstance: State3;
  static instance(c: CalculatorModel): State3 {
    if (State3.theInstance === undefined) {
      State3.theInstance = new State3();
    }
    return State3.theInstance;
  }

  public addAS(c: CalculatorModel, operators: Array<OperatorKeys>, operands: Array<string>): void {
    let newOperators: Array<OperatorKeys> = [];
    newOperators.push(operators[operators.length - 2]); // second to last operator
    let newOperands: Array<string> = operands.slice(-2);
    operands.pop();
    operands.pop();
    operators.splice(operators.length - 2, 1);
    let result = c.evaluate(newOperators, newOperands);
    c.clearBuffer();
    operands.push(result);
    c.changeState(State2.instance(c));
  }

  public addMD(c: CalculatorModel, operators: Array<OperatorKeys>, operands: Array<string>): void {
    let newOperators: Array<OperatorKeys> = [];
    newOperators.push(operators[operators.length - 2]); // second to last operator
    let newOperands: Array<string> = operands.slice(-2);
    operands.pop();
    operands.pop();
    operators.splice(operators.length - 2, 1);
    let result = c.evaluate(newOperators, newOperands);
    c.clearBuffer();
    operands.push(result);
    c.changeState(State3.instance(c));
  }

  public addEquals(c: CalculatorModel, operators: Array<OperatorKeys>, operands: Array<string>): void {
    let newOperators: Array<OperatorKeys> = operators.slice(-1);
    let newOperands: Array<string> = operands.slice(-2);
    operators.pop();
    operands.pop();
    operands.pop();
    operands.push(c.evaluate(newOperators, newOperands));
    c.changeState(State1.instance(c));
    c.addEquals();
  }

  public getDisplay(): string {
    return '';
  }
}
