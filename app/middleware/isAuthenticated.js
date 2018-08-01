module.exports = (options, app) => {
  return async function isAuthenticated(ctx, next) {
    if (ctx.isAuthenticated()) {
    	var userArr = await ctx.service.createuser.isUserid(ctx.user.userId)
      var obj = {}
      obj = ctx.request.query.urlJurisdiction ? ctx.request.query : ctx.request.body
	    if (!obj.urlJurisdiction) {
	    	ctx.body = {code: 20000}
	    	return false
	    }
	    var urlJurisdiction = obj.urlJurisdiction.replace('#','')
	    if (userArr[0].user_menu_jurisdiction.indexOf(urlJurisdiction) < 0) {
	    	ctx.body = {code: 30000}
	    	return false
	    }
    	if (userArr[0].isDelete == 1) {
    		return next();
    	}
        if (userArr[0].isDelete == 0) {
        	ctx.body = {code: 10000}
        }
    } else {
      ctx.body = {code: 10000}
    }
  }
};