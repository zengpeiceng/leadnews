function success(ctx, data, message='SUCCESS', code, host = null, total) {
  ctx.body = {
    host,
    code,
    data,
    message,
    total
  }
}

function error(ctx, message="ERROR", code, host = null) {
  ctx.body = {
    host,
    code,
    message,
  }
}

module.exports = {
  success,
  error
}