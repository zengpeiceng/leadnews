function success(ctx, data, message='SUCCESS', code, host = null) {
  ctx.body = {
    host,
    code,
    data,
    message,
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