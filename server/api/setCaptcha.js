const svgCaptcha = require('svg-captcha')

module.exports = async ctx=>{
    const keyCaptcha = Math.floor(Math.random() * 25)
    const captcha = svgCaptcha.createMathExpr({keyCaptcha})
    ctx.session.captcha = captcha.text;
    ctx.set('Content-Type', 'image/svg+xml')
    ctx.body = captcha.data
}