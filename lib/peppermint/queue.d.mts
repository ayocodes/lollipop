export default function _default(db_connection: any): {
    checkout: (originator: any, limit: any) => Promise<any[]>;
    save_sent: (ids: any, op_hash: any) => Promise<import("pg").QueryResult<any>>;
    save_state: (ids: any, state: any) => Promise<import("pg").QueryResult<any>>;
    state: {
        PENDING: string;
        CONFIRMED: string;
        FAILED: string;
        UNKNOWN: string;
        REJECTED: string;
    };
};
