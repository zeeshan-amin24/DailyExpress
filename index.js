<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Daily Express</title>
    <link rel="stylesheet" href="/style.css" />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
      crossorigin="anonymous"
    />
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
      crossorigin="anonymous"
    ></script>
    <link
      rel="website icon"
      href="https://i.ibb.co/Fw3csXz/download-removebg-preview.png"
    />
  </head>
  <body>
    <nav class="navbar navbar-expand-sm bg-body-tertiary">
      <div class="container-fluid">
        <a class="navbar-brand active" href="/">Daily Express</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a
                class="nav-link"
                aria-current="page"
                href="india"
                target="_blank"
                >India</a
              >
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/world" target="_blank">World</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/politics" target="_blank">Politics</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/sports" target="_blank">Sports</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/science" target="_blank">Science</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/entertainment" target="_blank"
                >Entertainment</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="card-container">
      <% trendingArticles.forEach(function(article) { %>
      <div class="card" style="width: 18rem">
        <img src="<%= article.img %>" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title"><%= article.title %></h5>
          <div class="read-full-article-div">
            <button
              data-src="<%= article.href %>"
              data-image-src="<%= article.img %>"
              data-title-src = "<%= article.title%>"
              class="read-full-article btn btn-primary"
              id="button-submit"
              target="_blank"
            >
              Read Full Article
            </button>
          </div>
        </div>
      </div>
      <% }); %>
    </div>
    <script>
      window.onload = () => {
        document.querySelectorAll("#button-submit").forEach((btn) => {
          btn.addEventListener("click", async () => {
            let headersList = {
              Accept: "*/*",
              "Content-Type": "application/json",
            };

            let bodyContent = JSON.stringify({
              url: btn.getAttribute("data-src").toString(),
              image_url: btn.getAttribute("data-image-src"),
              article_title: btn.getAttribute("data-title-src")
            });

            let response = await fetch("http://localhost:3000/article", {
              method: "POST",
              body: bodyContent,
              headers: headersList,
            });

            let data = await response.text();
            document.write(data)
          });
        });
      };
    </script>
  </body>
</html>
