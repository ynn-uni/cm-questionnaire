# 项目文档

项目名称：可用性量表数据分析平台
合作单位：四川美术学院

## 开发说明

项目使用vue-admin-template作为基础框架
[vue-admin-template](https://github.com/PanJiaChen/vue-admin-template)

## 相关文档

接口文档：https://www.showdoc.cc/690126569546088?page_id=3959986161234585

蓝湖地址：https://lanhuapp.com/web/#/item/project/board?pid=a08162e3-cd93-4bbd-a10d-e17ba5ced681

## 部署

服务器地址：47.107.151.209
项目文件夹地址：/usr/local/www/Examine-Vue
访问域名：ygf.artopcq.com
nginx文件路径：/usr/local/nginx/conf
nginx代理：nginx.conf

```nginx.conf
# 云工坊
server {
    listen 80;
    server_name ygf.artopcq.com;

    location / {
        root /usr/local/www/Examine-Vue/;
        try_files $uri $uri/ /index.html;
    }

    location /public/images {
        root /usr/local/www/Examine-Api/;
    }

    location /Apis {
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cookie_path / "/; secure; HttpOnly; SameSite=strict";
        proxy_pass http://127.0.0.1:9301;
    }
}
```

执行命令：

```sh
yarn build:prod

scp -r ./dist/* root@47.107.151.209:/usr/local/www/Examine-Vue
```
