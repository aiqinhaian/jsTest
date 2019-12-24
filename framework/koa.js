const compose = (middleware = []) => {
  return (context, next) => {
    let index
    const dispatch = i => {
      index = i
      let fn = middleware[i]
      if (i === middleware.length) {
        fn = next
      }
      if (!fn) {
        return
      }
      return fn(context, () => {
        return dispatch(i + 1)
      })
    }
    return dispatch(0)
  }
}


var ms = [
  function foo (ctx, next) {
  console.log('foo1')
  next()
  console.log('foo2')
  },
  function bar (ctx, next) {
  console.log('bar1')
  next()
  console.log('bar2')
  },
  function qux (ctx, next) {
  console.log('qux1')
  next()
  console.log('qux2')
  }
]

compose(ms)()