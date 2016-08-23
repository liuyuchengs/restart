
/**
 * 自定义类型信息
 */
declare namespace DataType{
    interface location{
        latitude:number,
        longitude:number,
    }
    export interface HttpResult{
        data:any;
        code:number;
        message:string;
    }
    export interface IQueryParams{
        city?:string;
        area?:string;
        professionId?:number;
        itemId?:number;
        order?:string;
        currentPage?:number;
        pageRows?:number;
        location?:location;
    }
    export enum MysqlEnv{
        /**
         * 阿里云
         */
        Aliyun,
        /**
         * 本机
         */
        Local,
        /**
         * 测试服务器
         */
        Test
    }
}
