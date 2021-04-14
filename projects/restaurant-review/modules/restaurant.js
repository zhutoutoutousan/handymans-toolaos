/** @module Restaurants */

import sqlite from 'sqlite-async'

/**
 * Accounts
 * ES6 module that handles adding restaurants
 */
class Restaurants {
	/**
   * Create a restaurant object
   * @param {String} [dbName=":memory:"] - The name of the database file to use.
   */
     constructor(dbName = ':memory:') {
		return (async() => {
			this.db = await sqlite.open(dbName)
			// we need this table to store the user accounts
			const sql = 'CREATE TABLE IF NOT EXISTS restaurants\
				(restaurant_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, postcode TEXT, photo TEXT, food TEXT, description TEXT, review TEXT);'
			await this.db.run(sql)
			return this
		})()
	}

	async getAllRestaurant() {
		let restaurants = [];
		let records;
		let sql = `SELECT COUNT(*) FROM restaurant`
		const countsInfo = await this.db.get(sql);
		
		const counts = countsInfo['COUNT(*)'];
		
		for (let i = 1; i <= counts; i++) {
			sql = `SELECT * FROM restaurant WHERE restaurant_id = ${i};`
			records = await this.db.get(sql);
			restaurants = [...restaurants, records ]
		}

		return restaurants;
	}

	async addRestaurant() {
		let sql = `SELECT * FROM restaurant;`
		const records = await this.db.get(sql);
		console.log(records);
	}

	async close() {
		await this.db.close()
	}
}

export default Restaurants