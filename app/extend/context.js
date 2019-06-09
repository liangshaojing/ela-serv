module.exports = {
    success(status, data) {
        this.status = status;
        this.body = {
            success: true,
            data
        }
    },

    failure(status, msg) {
        this.status = status;
        this.message = msg;
    }
}