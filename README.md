# sylu-oj

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

store 中导出的 ref，不需要再通过`.value`来访问

```js
Router.addRoute(parentName: RouteRecordName, route: RouteRecordRaw): () => void (+1 overload)
```

解释： Add a new route record as the child of an existing route.

```
@param parentName — Parent Route Record where route should be appended at

@param route — Route Record to add
```

## 动态路由踩坑

刷新权限路由造成*白屏*或*404*（如果你配置 404 了的话）  
### 解决方案 1（推荐）

```javascript
userStore.addAdminRoutes(); //获取到后端返回值，添加到路由
return next(to.fullPath); // 在这块重新访问该路由
```

### 解决方案 2

```javascript
if (!to.redirectedFrom) {
  return next({ ...to, replace: true }); 
}
```
>`redirectedFrom`  
当你对某些路由有重定向功能，例如'/'定向到'/home'，如果此时访问'/'，此时输出的to中，就包含`redirectedFrom`
>
<img src="https://pic.imgdb.cn/item/66344b4c0ea9cb14039f4a0e.png" />