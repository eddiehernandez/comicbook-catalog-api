export default class Logger {

    private static getTimeStamp (): string {
        return new Date().toISOString();
    }


    public static info (message: string, object?: any) {
        if (object)
            console.info(`[${this.getTimeStamp()}] ${message}`, object)
        else
            console.info(`[${this.getTimeStamp()}] ${message}`)
    }   

    public static warn (message: string, object?: any) {
        if (object)
            console.warn(`[${this.getTimeStamp()}] ${message}`, object)
        else
            console.warn(`[${this.getTimeStamp()}] ${message}`)
    }   
    public static error (message: string, object?: any) {
        if (object)
            console.error(`[${this.getTimeStamp()}] ${message}`, object)
        else
            console.error(`[${this.getTimeStamp()}] ${message}`)
    }   
    public static debug (message: string, object?: any) {
        if (object)
            console.debug(`[${this.getTimeStamp()}] ${message}`, object)
        else
            console.debug(`[${this.getTimeStamp()}] ${message}`)
    }   

}