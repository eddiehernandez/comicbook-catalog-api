export default class Logger {

    private static getTimeStamp (): string {
        return new Date().toISOString();
    }


    public static info (message: string, object?: any) {
        if (object)
            console.info(`[INFO] [${this.getTimeStamp()}] ${message}`, object)
        else
            console.info(`[INFO] [${this.getTimeStamp()}] ${message}`)
    }   

    public static warn (message: string, object?: any) {
        if (object)
            console.warn(`[WARN] [${this.getTimeStamp()}] ${message}`, object)
        else
            console.warn(`[WARN] [${this.getTimeStamp()}] ${message}`)
    }   
    public static error (message: string, object?: any) {
        if (object)
            console.error(`[ERR] [${this.getTimeStamp()}] ${message}`, object)
        else
            console.error(`[ERR] [${this.getTimeStamp()}] ${message}`)
    }   
    public static debug (message: string, object?: any) {
        if (object)
            console.debug(`[DEBUG] [${this.getTimeStamp()}] ${message}`, object)
        else
            console.debug(`[DEBUG] [${this.getTimeStamp()}] ${message}`)
    }   

}