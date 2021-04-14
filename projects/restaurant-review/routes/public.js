
import Router from 'koa-router'
import Accounts from '../modules/accounts.js'
import Restaurants from '../modules/restaurant.js'

const router = new Router()

const dbName = 'website.db'

let publicData;

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 */
router.get('/', async ctx => {
	try {
		if(publicData) {
			ctx.hbs = {...ctx.hbs, data: [...publicData]}
		}
		
		console.log(ctx.hbs)
		await ctx.render('index', ctx.hbs)
	} catch(err) {
		await ctx.render('error', ctx.hbs)
	}
})


/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => await ctx.render('register'))

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', async ctx => {
	const account = await new Accounts(dbName)
	try {
		// call the functions in the module
		await account.register(ctx.request.body.user, ctx.request.body.pass, ctx.request.body.email)
		ctx.redirect(`/login?msg=new user "${ctx.request.body.user}" added, you need to log in`)
	} catch(err) {
		console.log(err)
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
		await ctx.render('register', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.get('/login', async ctx => {
	console.log(ctx.hbs)
	await ctx.render('login', ctx.hbs)
})

router.post('/login', async ctx => {
	const account = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const body = ctx.request.body
		await account.login(body.user, body.pass)
		ctx.session.authorised = true
		const referrer = body.referrer || '/secure'
		return ctx.redirect(`${referrer}?msg=you are now logged in...`)
	} catch(err) {
		console.log(err)
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		await account.close()
	}
})

router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.redirect('/?msg=you are now logged out')
})

router.get('/getallrestaurant', async ctx => {
	const restaurants = await new Restaurants(dbName)
	try {
		const body = ctx.request.body
		const records = await restaurants.getAllRestaurant();
		publicData = records;
		return ctx.redirect('/')
	} catch(err) {
		console.log(err)
		ctx.hbs.msg = err.message
		// await ctx.render('', ctx.hbs)
	} finally {
		await restaurants.close()
	}


})

router.post('/addrestaurant', async ctx => {
	
})

export default router
