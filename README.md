# sqlEntityHelper
根据数据库表生成实体类代码

# 运行环境
Node.js : v18.16.1
typescript : 5.1.5

# 使用方式
## 安装依赖
`node -i @types/mysql`
`node -i ts-node`

## 运行
`ts-node {文件位置}`

## 结果
得到的是包含了注释、mybatis-plus注解、字段定义的Java代码，例如
```
/**
*/
@TableField(")
private xxx xxx;
