import * as mysql from "mysql";

let tableName = "";

function queryTableFields(tablename: string): void {
    let connection = mysql.createConnection({
        host: "",
        user: "",
        password: "",
        database: ""
    });

    // let sql = "SHOW COLUMNS FROM `" + tablename + "`";
    let sql = "SELECT COLUMN_NAME, COLUMN_TYPE, COLUMN_COMMENT FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = \"" + tablename + "\";"

    connection.query(sql, function (error, result) {
        if (error) throw error;
        for (let i = 0; i < result.length; i++) {
            // console.log(result[i]);
            let recordName = result[i].COLUMN_NAME as string;
            let recordType = result[i].COLUMN_TYPE as string;
            let comment = result[i].COLUMN_COMMENT as string;
            let entityName = convertName(recordName);
            let entityType = convertType(recordType);

            console.log("/**\n" + comment + "\n*/");
            console.log("@TableField(\"" + recordName + "\")");
            console.log("private " + entityType + " " + entityName + ";");
            console.log();

            // console.log(result[i]);
            // console.log(convertName(result[i].Field as string));
            // console.log(convertType(result[i].Type as string));
        }
    });
}

queryTableFields(tableName);

function convertName(recordName: string): string {
    let strs: string[] = recordName.split("_");
    let res: string = strs[0];

    for (let i = 1; i < strs.length; i++) {
        let start = strs[i].charAt(0).toUpperCase();
        let end = strs[i].substring(1);
        let str = start + end;
        res += str;
    }

    return res;
}

let map = new Map();
map.set("bigint", "Long");
map.set("varchar", "String");
map.set("datetime", "Date");
map.set("tinyint", "Byte");
map.set("text", "String");

function convertType(recordType: string): string {
    let endIndex = recordType.indexOf("(");
    let key = endIndex == -1 ? recordType : recordType.substring(0, endIndex);
    return map.get(key) as string;
}