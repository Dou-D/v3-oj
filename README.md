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

store中导出的ref，不需要再通过`.value`来访问  
```js
Router.addRoute(parentName: RouteRecordName, route: RouteRecordRaw): () => void (+1 overload)
```
解释： Add a new route record as the child of an existing route.  
```
@param parentName — Parent Route Record where route should be appended at

@param route — Route Record to add
```