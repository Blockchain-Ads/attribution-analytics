import './id5.js';
declare type status_ok = string;
declare type TypeStatus = status_ok | Error;
declare type Error = {
    errorCode: number;
    reason: string;
};
declare type StandardResult = {
    result: any;
    status: TypeStatus;
};
export declare function bcaWeb3Connect(address: string, signupUrl?: string): Promise<StandardResult>;
declare const _default: {
    bcaWeb3Connect: typeof bcaWeb3Connect;
};
export default _default;
