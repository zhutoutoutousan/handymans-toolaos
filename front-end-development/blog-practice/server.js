const express = require('express')
const articleRouter = require('./routes/articles')
const app = express()
const mongoose = require('mongoose')


mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    const articles = [{
        title: 'Test Article',
        createdAt : new Date(),
        description: 'Test description'
    },
    {
        title: 'Test Article 2',
        createdAt : new Date(),
        description: 'Test description 2'
    }
    ];

    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(5000)