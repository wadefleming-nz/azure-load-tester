export interface FunctionStatusResponse {
    name: string;
    instanceId: string;
    runtimeStatus: string;
    input?: any;
    customStatus?: any;
    output: any;
    createdTime: Date;
    lastUpdatedTime: Date;
}
