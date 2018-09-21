export interface AppConfig {
    logging: {
        console: boolean;
        appInsights: boolean;
    };
    apiServer: {
        metadata: string;
    };
}