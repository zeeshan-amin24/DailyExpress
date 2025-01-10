const cheerio = require("cheerio");
const axios = require("axios");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const indianNewsUrl = "https://indianexpress.com/section/india/";
const sportsNewsUrl = "https://indianexpress.com/section/sports/";
const worldNewsUrl = "https://indianexpress.com/section/world/";
let trendingNewsUrl = "https://indianexpress.com/section/trending/";
let politicsNewsUrl = "https://indianexpress.com/section/political-pulse/";
let scienceNewsUrl = "https://indianexpress.com/section/technology/science/";
let entertainmentNewsUrl = "https://indianexpress.com/section/entertainment/";
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  let trendingArticles = [];
  axios.get(trendingNewsUrl).then((response) => {
    let $ = cheerio.load(response.data);
    $("#trendhome .articles ul li").each(function () {
      let title = $(this).find("div a").text();
      let img = $(this).find("figure a img").attr("src");
      let href = $(this).find("div a").attr("href");
      if (title && img && href) {
        trendingArticles.push({
          title: title,
          img: img,
          href: href,
        });
      }
    });

    res.render("index", { trendingArticles });
  });
});

app.get("/entertainment", (req, res) => {
  let entertainmentArticles = [];
  axios.get(entertainmentNewsUrl).then((response) => {
    let $ = cheerio.load(response.data);
    $(".myie-nation .myie-articles ").each(function () {
      let title = $(this).find(".myie-img-context  .myie-title").text();
      let img = $(this).find(".myie-snaps a img").attr("data-src");
      let href = $(this).find(".myie-img-context  .myie-title a").attr("href");

      entertainmentArticles.push({
        title: title,
        img: img,
        href: href,
      });
    });

    res.render("entertainment", { entertainmentArticles });
  });
});

app.get("/sports", (req, res) => {
  let sportsArticles = [];
  axios.get(sportsNewsUrl).then((response) => {
    let $ = cheerio.load(response.data);
    $(".articles").each(function () {
      let title = $(this).find("h2").text();
      let img = $(this).find("img").attr("src");
      let date = $(this).find(".date").text();
      let href = $(this).find("a").attr("href");
      if (title && img && href) {
        sportsArticles.push({
          title: title,
          date: date,
          img: img,
          href: href,
        });
      }
    });
    res.render("sports", { sportsArticles });
  });
});

app.get("/india", (req, res) => {
  let indiaArticles = [];
  axios.get(indianNewsUrl).then((response) => {
    let $ = cheerio.load(response.data);

    $(".articles").each(function () {
      let title = $(this).find("h2").text();
      let img = $(this).find(".lazyloading").attr("data-src");
      let date = $(this).find(".date").text();
      let href = $(this).find("a").attr("href");
      if (title && img && href) {
        indiaArticles.push({
          title: title,
          date: date,
          img: img,
          href: href,
        });
      }
    });

    res.render("india", { indiaArticles });
  });
});

app.get("/world", (req, res) => {
  const worldArticles = [];

  axios.get(worldNewsUrl).then((response) => {
    let $ = cheerio.load(response.data);
    $("#north-east-data ul li").each(function () {
      let title = $(this).find("h3").text();
      let img = $(this).find("a figure img").attr("src");
      let href = $(this).find("a").attr("href");
      if (title && img && href) {
        worldArticles.push({
          title: title,
          img: img,
          href: href,
        });
      }
    });
    res.render("world", { worldArticles });
  });
});

app.get("/politics", (req, res) => {
  let politicsArticles = [];
  axios.get(politicsNewsUrl).then((response) => {
    let $ = cheerio.load(response.data);

    $(".articles").each(function () {
      let title = $(this).find("h2").text();
      let img = $(this).find(".lazyloading").attr("data-src");
      let date = $(this).find(".date").text();
      let href = $(this).find("a").attr("href");
      if (title && img && href) {
        politicsArticles.push({
          title: title,
          date: date,
          img: img,
          href: href,
        });
      }
    });

    res.render("politics", { politicsArticles });
  });
});

app.get("/science", (req, res) => {
  let scienceArticles = [];
  axios.get(scienceNewsUrl).then((response) => {
    let $ = cheerio.load(response.data);

    $(".articles").each(function () {
      let title = $(this).find("h2").text();
      let img = $(this).find(".snaps a img").attr("data-src");
      let date = $(this).find(".date").text();
      let href = $(this).find("a").attr("href");
      if (title && img && href) {
        scienceArticles.push({
          title: title,
          date: date,
          img: img,
          href: href,
        });
      }
    });
    res.render("science", { scienceArticles });
  });
});

app.post("/article", (req, res) => {

  const { image_url, article_title, article_url } = req.body;
 
  axios
    .get(article_url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      $(".osv-ad-class").remove();
      $(".custom_read_button").remove();
      $(".subscription_faq").remove();
      $(".instagram-media").remove();
      $("#id_subscription_notifier").remove();
      $("iframe").remove();
      $("img").remove()
          $("table").remove()
      $(".ie-adtext").remove()
      const text = $("div.full-details div#pcl-full-content")
        
      text.find("a").each(function () {
        const anchorText = $(this).text();  
        $(this).replaceWith(`<span>${anchorText}</span>`); 
      });
      res.render("readnews", {
        content: text,
        article_image: image_url,
        article_title: article_title, 
      });
    })
    .catch((error) => {
      res.status(400).send("Error fetching article");
    });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
