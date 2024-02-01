# bakamanga-react

## Project Description

3kManga is the final project for our Bachelor Program in University of Greenwich
in Ho Chi Minh City Campus. It is a social media website for sharing and reading
comic. The website's goal is to eradicate a common issue with comic websites,
which is relying too much on a separate forum or third-party services to provide
discussion space for readers.

Our website solve the problem by having its own community section where users
can share their opinion on the comics. The core features of the website include:

- Browsing and reading comic
- Uploading comic
- Community features
- Administering data

## Repository Description

This repository is the front-end ReactJS application for the 3kManga website. To
view the back-end ASP.NET Web API, please visit
[here](https://github.com/huynhloc-1110/BakaMangaAPI).

This ReactJS application use the following libraries for development:

- ReactJS
- Create React App
- React Router
- Bootstrap

## Deployment link

We have deployed the ReactJS application with Vercel
[here](https://bakamanga.vercel.app).
You can also visit the API on Render [here](https://bakamanga-api.onrender.com).

## Run locally

To run the API locally, follow the steps below:

1. Clone the project.

```shell
git clone git@github.com:huynhloc-1110/bakamanga-react.git
```

2. Change the shell location to the repository's root folder. Then add an `.env`
   file with the variable linked to the API url. The content should be something
   like this:

```
REACT_APP_API_URL="https://localhost:7036"
```

3. Install the necessary npm modules.

```shell
npm install
```

4. Run the application.

```shell
npm start
```
