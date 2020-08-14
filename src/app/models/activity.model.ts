import { FunctionStatusResponse } from './function-status-response.model';

export interface Activity {
    requestId: number;
    secondsDuration: number;
    status: string;
    statusUrl: string;
    response: FunctionStatusResponse;
}
