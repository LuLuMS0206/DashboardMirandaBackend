export class APIError extends Error {
    status: number;
    isOperational: boolean;

    constructor(message: string, status: number, isOperational: boolean) {
        super(message);
        this.status = status;
        this.isOperational = isOperational;

        Error.captureStackTrace(this, this.constructor);
    }
}
