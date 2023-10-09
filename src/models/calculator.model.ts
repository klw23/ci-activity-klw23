
import { ActionKeys } from '../enums/action-keys.enum';
import { NumericKeys } from '../enums/numeric-keys.enum';
import { OperatorKeys } from '../enums/operator-keys.enum';
import { ICalculatorModel } from '../interfaces/calculator-model.interface';
import { ICalculatorState } from '../interfaces/calculator-state.interface';
import { State1 } from '../states/state-1.state';

export class CalculatorModel implements ICalculatorModel {

  private _operands: Array<string> = [];
  private _buffer: string = '';
  private _operators: Array<OperatorKeys> = [];

  private _state: ICalculatorState;
  
  public constructor() {
    this._state = State1.instance(this);
  }

  public addAS() : void { this._state.addAS(this, this._operators, this._operands); }
  public addMD() : void { this._state.addMD(this, this._operators, this._operands); }
  public addEquals() : void { this._state.addEquals(this, this._operators, this._operands); }

  public changeState(state :ICalculatorState) : void {
    this._state = state
  }

  public pressNumericKey(key: NumericKeys): void {
    this._buffer += key;
  }

  public pressOperatorKey(key: OperatorKeys): void {
    this._operators.push(key);
    this._operands.push(this._buffer);
    this._buffer = '';

    if (key === OperatorKeys.MINUS || key === OperatorKeys.PLUS) {
      this.addAS()
    } else {
      this.addMD()
    }
  }

  public pressActionKey(key: ActionKeys): void {
    switch (key) {
      case ActionKeys.CLEAR:
        this._buffer = '';
        this._operands = [];
        this._operators = [];
        break;
      case ActionKeys.DOT:
        this._buffer += '.';
        break;
      case ActionKeys.EQUALS:
        this._operands.push(this._buffer);
        if (this._operators.length !== this._operands.length - 1) {
          this.pressActionKey(ActionKeys.CLEAR);
          break;
        }
        this.addEquals();
        break;
      default:
        throw new Error('Invalid Action');
    }
  }

  public display(): string {
    return this._buffer;
  }

  public evaluate(operators : Array<OperatorKeys>, operands : Array<string>): string {

    while(operators.length > 0) {
      const operator: OperatorKeys = operators.shift();
      const operandOne: number = parseFloat(operands.shift());
      const operandTwo: number = parseFloat(operands.shift());

      console.log("HERE: ", operator, " ", operandOne, " ", operandTwo);
      
      switch(operator) {
        case OperatorKeys.PLUS:
          this._buffer = (operandOne + operandTwo).toString();
          break;
        case OperatorKeys.MINUS:
          this._buffer = (operandOne - operandTwo).toString();
          break;
        case OperatorKeys.MULT:
          this._buffer = (operandOne * operandTwo).toString();
          break;  
        case OperatorKeys.DIV:
          this._buffer = (operandOne / operandTwo).toString();
          break;
        default:
          break;
      }
      operands.unshift(this._buffer);
    }
    
    this._buffer = operands.shift();
    return this._buffer;
  }

  public clearBuffer() {
    this._buffer = "";
  }

}
