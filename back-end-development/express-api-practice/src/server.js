import express from 'express'

export const app = express()

export const start = async () => {
  try {
    app.listen(3000, () => {
      console.log(`REST API on http://localhost:${3000}/api}`)
    })
  } catch (e) {
    console.error(e)
  }
}
