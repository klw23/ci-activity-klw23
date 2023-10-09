import { OperatorKeys } from "../enums/operator-keys.enum";
import { ICalculatorState } from "../interfaces/calculator-state.interface";
import { CalculatorModel } from "../models/calculator.model";
import { State1 } from "./state-1.state";
import { State3 } from "./state-3.state";


export class State2 implements ICalculatorState {
    private _buffer: string;

    private constructor() {}

    private static  theInstance: State2;
    static instance(c : CalculatorModel) : State2 {
        if (State2.theInstance === undefined) {
            State2.theInstance = new State2
        }
        return State2.theInstance;
    }

    addAS(c: CalculatorModel, operators :Array<OperatorKeys>, operands :Array<string>): void {
        c.changeState(State1.instance(c));
    }
    addMD(c: CalculatorModel, operators :Array<OperatorKeys>, operands :Array<string>): void {
        c.changeState(State3.instance(c));
    }
    addEquals(c : CalculatorModel, operators :Array<OperatorKeys>, operands :Array<string>): void {
        c.evaluate(operators, operands);
        c.changeState(State1.instance(c));
    }

    getDisplay(): string {
        return this._buffer;
    }
} 