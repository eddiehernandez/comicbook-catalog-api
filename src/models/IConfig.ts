export default interface IConfig {
    port: number,
    token: {
        expireTime: number,
        issuer: string,
        secret: string
    }
}