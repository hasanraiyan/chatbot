class ApiResponse {
    constructor(statusCode, data, message = "ok") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode >= 200 && statusCode <= 300;
    }

    toJSON() {
        return {
            statusCode: this.statusCode,
            success: this.success,
            message: this.message,
            data: this.data
        }
    }
}

export default ApiResponse;