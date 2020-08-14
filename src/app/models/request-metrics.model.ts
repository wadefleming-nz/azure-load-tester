import { FunctionStatusResponse } from './function-status-response.model';

export interface RequestMetrics {
    requestId: number;
    startTime: Date;
    currTime: Date;
    status: string;
    response: FunctionStatusResponse;
}
