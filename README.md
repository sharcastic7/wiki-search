## Getting Started

First, clone the repo and install the dependencies.

```bash

npm i

```

Run the development server:

```bash

npm  run  dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How the App works

This application uses NextJS for the frontend and a serverless function in the backend to make requests to the Wikipedia APIs to retrieve search results and forward to the NextJS app.

## Basic Layout

The page is divided into 2 sections

- To show a search related textbox and results
- To show search history

## How search works

All search related code is in the useSearch hook. Here are some highlights about the feature

- All the results are shown with an image, a title and a description if available.
- The search string is debounced for 500 ms to make sure we don't make too many requests to the serverless function.
- Every time a user searches for a term, it gets appended to the URL so that the URL can be shared.
- The search results are infinitely loaded as the user goes towards the end of the list.
- All the search terms in that particular session are also saved.
- All search results are clickable and take you to their specific wiki page.
- useCallbacks and useMemos are used as needed to avoid unnecessary re-renders.
- A virtualized list is used to make sure that the page doesn't slow down because of too many items in the search results.
