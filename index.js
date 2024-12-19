const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const indianNewsUrl = "https://indianexpress.com/section/india/";
const sportsNewsUrl='https://indianexpress.com/section/sports/'
const worldNewsUrl='https://indianexpress.com/section/world/'
let trendingNewsUrl='https://indianexpress.com/section/trending/'
let politicsNewsUrl="https://indianexpress.com/section/political-pulse/"
let scienceNewsUrl="https://indianexpress.com/section/technology/science/"const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const indianNewsUrl = "https://indianexpress.com/section/india/";
const sportsNewsUrl='https://indianexpress.com/section/sports/'
const worldNewsUrl='https://indianexpress.com/section/world/'
let trendingNewsUrl='https://indianexpress.com/section/trending/'
let politicsNewsUrl="https://indianexpress.com/section/political-pulse/"
let scienceNewsUrl="https://indianexpress.com/section/technology/science/"
let entertainmentNewsUrl='https://indianexpress.com/section/entertainment/'
app.set("view engine", "ejs");
app.use(express.static('public'));   

app.get("/", (req, res) => {
  let trendingArticles=[]
  axios.get(trendingNewsUrl)
  .then(response=>{
    let $ =cheerio.load(response.data)
    $('#trendhome .articles ul li').each(function(){
let title = $(this).find('div a').text() 
let img = $(this).find('figure a img').attr('src') 
let href = $(this).find('div a').attr('href')
if(title&&img&&href){
  trendingArticles.push({
    title: title,
    img: img,
    href: href
  })
}

    })
  
    res.render("index" ,{ trendingArticles });
  })

});

app.get("/entertainment", (req, res) => {
  let entertainmentArticles=[]
  axios.get(entertainmentNewsUrl)
  .then(response=>{
    let $ =cheerio.load(response.data)
    $('.myie-nation .myie-articles ').each(function(){
let title = $(this).find('.myie-img-context  .myie-title').text()
let img = $(this).find('.myie-snaps a img').attr('data-src') 
let href = $(this).find('.myie-img-context  .myie-title').attr('href')


  entertainmentArticles.push({
    title: title,
    img: img,
    href: href
  })



    })

    res.render("entertainment" ,{ entertainmentArticles });
  })

});


app.get('/sports', (req, res)=>{
  let sportsArticles=[]
  axios.get(sportsNewsUrl)
  .then(response=>{
    let $=cheerio.load(response.data)
    $('.articles').each(function() {
      let title = $(this).find('h2').text();
      let img = $(this).find('img').attr('src')
      let date = $(this).find('.date').text();
      let href = $(this).find('a').attr('href');
if(title&&img&&href){
  sportsArticles.push({
    title: title,
    date: date,
    img: img,
    href: href
  });

}
    
   
    });
    res.render('sports', { sportsArticles })
  })
})


app.get("/india", (req, res) => {
  let indiaArticles = [];
  axios.get(indianNewsUrl)
    .then(response => {
      let $ = cheerio.load(response.data);

      $('.articles').each(function() {
        let title = $(this).find('h2').text();
        let img = $(this).find('.lazyloading').attr('data-src');
        let date = $(this).find('.date').text();
        let href = $(this).find('a').attr('href');
if(title&&img&&href){
  indiaArticles.push({
    title: title,
    date: date,
    img: img,
    href: href
  });
}
        
      });

      res.render("india", { indiaArticles });
    })
});

app.get('/world', (req, res)=>{
  const worldArticles=[]

  axios.get(worldNewsUrl)
  .then(response=>{
    let $=cheerio.load(response.data)
    $('#north-east-data ul li').each(function(){
let title=$(this).find('h3').text()
let img=$(this).find('a figure img').attr('src')
let href=$(this).find('a').attr('href')
if(title&&img&&href){
  worldArticles.push({
    title: title,
    img: img,
    href: href
  })
}

    })
    res.render('world', { worldArticles})
  })

})


app.get("/politics", (req, res) => {
  let politicsArticles = [];
  axios.get(politicsNewsUrl)
    .then(response => {
      let $ = cheerio.load(response.data);

      $('.articles').each(function() {
        let title = $(this).find('h2').text();
        let img = $(this).find('.lazyloading').attr('data-src');
        let date = $(this).find('.date').text();
        let href = $(this).find('a').attr('href');
if(title&&img&&href){
  politicsArticles.push({
    title: title,
    date: date,
    img: img,
    href: href
  });
}
        
      });

      res.render("politics", { politicsArticles });
    })
});

app.get("/science", (req, res) => {
  let scienceArticles = [];
  axios.get(scienceNewsUrl)
    .then(response => {
      let $ = cheerio.load(response.data);

      $('.articles').each(function() {
        let title = $(this).find('h2').text();
        let img = $(this).find('.snaps a img').attr('data-src');
        let date = $(this).find('.date').text();
        let href = $(this).find('a').attr('href');
if(title&&img&&href){
  scienceArticles.push({
    title: title,
    date: date,
    img: img,
    href: href
  });
}


        
      });
      res.render("science", { scienceArticles });
    })
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

let entertainmentNewsUrl='https://indianexpress.com/section/entertainment/'
app.set("view engine", "ejs");
app.use(express.static('public'));   

app.get("/", (req, res) => {
  let trendingArticles=[]
  axios.get(trendingNewsUrl)
  .then(response=>{
    let $ =cheerio.load(response.data)
    $('#trendhome .articles ul li').each(function(){
let title = $(this).find('div a').text() 
let img = $(this).find('figure a img').attr('src') 
let href = $(this).find('div a').attr('href')
if(title&&img&&href){
  trendingArticles.push({
    title: title,
    img: img,
    href: href
  })
}

    })
  
    res.render("index" ,{ trendingArticles });
  })

});

app.get("/entertainment", (req, res) => {
  let entertainmentArticles=[]
  axios.get(entertainmentNewsUrl)
  .then(response=>{
    let $ =cheerio.load(response.data)
    $('.myie-nation .myie-articles ').each(function(){
let title = $(this).find('.myie-img-context  .myie-title').text()
let img = $(this).find('.myie-snaps a .lazyloading').attr('data-src') 
let href = $(this).find('.myie-img-context  .myie-title').attr('href')


if(title&&img&&href){
  entertainmentArticles.push({
    title: title,
    img: img,
    href: href
  })
}


    })

    res.render("entertainment" ,{ entertainmentArticles });
  })

});


app.get('/sports', (req, res)=>{
  let sportsArticles=[]
  axios.get(sportsNewsUrl)
  .then(response=>{
    let $=cheerio.load(response.data)
    $('.articles').each(function() {
      let title = $(this).find('h2').text();
      let img = $(this).find('img').attr('src')
      let date = $(this).find('.date').text();
      let href = $(this).find('a').attr('href');
if(title&&img&&href){
  sportsArticles.push({
    title: title,
    date: date,
    img: img,
    href: href
  });

}
    
   
    });
    res.render('sports', { sportsArticles })
  })
})


app.get("/india", (req, res) => {
  let indiaArticles = [];
  axios.get(indianNewsUrl)
    .then(response => {
      let $ = cheerio.load(response.data);

      $('.articles').each(function() {
        let title = $(this).find('h2').text();
        let img = $(this).find('.lazyloading').attr('data-src');
        let date = $(this).find('.date').text();
        let href = $(this).find('a').attr('href');
if(title&&img&&href){
  indiaArticles.push({
    title: title,
    date: date,
    img: img,
    href: href
  });
}
        
      });

      res.render("india", { indiaArticles });
    })
});

app.get('/world', (req, res)=>{
  const worldArticles=[]

  axios.get(worldNewsUrl)
  .then(response=>{
    let $=cheerio.load(response.data)
    $('#north-east-data ul li').each(function(){
let title=$(this).find('h3').text()
let img=$(this).find('a figure img').attr('src')
let href=$(this).find('a').attr('href')
if(title&&img&&href){
  worldArticles.push({
    title: title,
    img: img,
    href: href
  })
}

    })
    res.render('world', { worldArticles})
  })

})


app.get("/politics", (req, res) => {
  let politicsArticles = [];
  axios.get(politicsNewsUrl)
    .then(response => {
      let $ = cheerio.load(response.data);

      $('.articles').each(function() {
        let title = $(this).find('h2').text();
        let img = $(this).find('.lazyloading').attr('data-src');
        let date = $(this).find('.date').text();
        let href = $(this).find('a').attr('href');
if(title&&img&&href){
  politicsArticles.push({
    title: title,
    date: date,
    img: img,
    href: href
  });
}
        
      });

      res.render("politics", { politicsArticles });
    })
});

app.get("/science", (req, res) => {
  let scienceArticles = [];
  axios.get(scienceNewsUrl)
    .then(response => {
      let $ = cheerio.load(response.data);

      $('.articles').each(function() {
        let title = $(this).find('h2').text();
        let img = $(this).find('img').attr('src');
        let date = $(this).find('.date').text();
        let href = $(this).find('a').attr('href');
if(title&&img&&href){
  scienceArticles.push({
    title: title,
    date: date,
    img: img,
    href: href
  });
}
        
      });

      res.render("science", { scienceArticles });
    })
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
