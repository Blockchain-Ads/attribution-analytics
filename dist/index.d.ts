import './id5.js';
declare type status_ok = string;
declare type TypeStatus = status_ok | Error;
declare type Error = {
    errorCode: number;
    reason: string;
};
declare type BcaConnectResult = {
    result: string | Array<any>;
    status: TypeStatus;
};
export declare function bcaWeb3Connect(address: string): Promise<BcaConnectResult>;
declare const _default: {
    bcaWeb3Connect: typeof bcaWeb3Connect;
};
export default _default;
