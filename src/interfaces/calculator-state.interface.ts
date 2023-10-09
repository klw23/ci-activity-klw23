import { OperatorKeys } from '../enums/operator-keys.enum';
import { CalculatorModel } from '../models/calculator.model';

export interface ICalculatorState {
  addAS(c: CalculatorModel, operators: Array<OperatorKeys>, operands: Array<string>): void;
  addMD(c: CalculatorModel, operators: Array<OperatorKeys>, operands: Array<string>): void;
  addEquals(c: CalculatorModel, operators: Array<OperatorKeys>, operands: Array<string>): void;
  getDisplay(): string;
}
