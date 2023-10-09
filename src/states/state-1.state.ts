import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorState } from '../interfaces/calculator-state.interface';
import { CalculatorModel } from '../models/calculator.model';
import { State2 } from './state-2.state';

export class State1 implements ICalculatorState {
  private constructor() {}

  private _buffer: string;

  private static theInstance: State1;
  static instance(c: CalculatorModel): State1 {
    if (State1.theInstance === undefined) {
      State1.theInstance = new State1();
    }
    return State1.theInstance;
  }

  addAS(c: CalculatorModel, operators: Array<OperatorKeys>, operands: Array<string>): void {
    c.changeState(State2.instance(c));
  }

  addMD(c: CalculatorModel, operators: Array<OperatorKeys>, operands: Array<string>): void {
    c.changeState(State2.instance(c));
  }

  addEquals(c: CalculatorModel, operators: Array<OperatorKeys>, operands: Array<string>): void {
    c.evaluate(operators, operands);
    c.changeState(State1.instance(c));
  }

  getDisplay(): string {
    return this._buffer;
  }
}
