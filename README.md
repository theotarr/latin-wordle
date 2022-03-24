<p align="center">
    <img src="https://www.latindictionary.io/static/assets/img/favicon/mstile-150x150.png" width=200 height=200/>
</p>
<h1 align="center"> 
    Latin Wordle
</h1>
<p align=center>
    <a href="https://wordle.latindictionary.io/">
        Live Game Here
    </a>
</p>

## Inspiration

Latin Wordle is a free and open-source project that aims to provide a fun and interactive way to learn Latin. I was inspired by the real version (linked above), and decided to make my own version for latindictionary.io. Please feel free to contribute to the project, and if you have any suggestions, please let me know!
Also, go play the real (English) Wordle [here](https://www.powerlanguage.co.uk/wordle/).

## Forking This Repo

There are no copyright restrictions on this project, so feel free to fork and use it for your own purposes. Although it you deploy this website publically we do require an **attribution** and link to our site.

### Tech Stack

This project was built using [React](https://reactjs.org/), [Typescript](https://www.typescriptlang.org/), and [Tailwind UI](https://tailwindui.com/). There is no backend or database used because the word list is stored on the frontend.

### Contributing

If you would like to contribute to the project, please create your own branch and submit a pull request to the main branch when you are done working.

### Pruning the Word List

We are in the middle of pruning the very difficult words from the `wordlist.ts` so all players can have some chance at guessing the word within six guesses. We are focussing on purging words that have 3 or more consonants in a row, or forms that are very rare. If you would like to help, you can go through the process or creating your own branch or just submit a Github issue with the words that you think should be purged.

### File Structure
```
latin-wordle
|   README.md, LICENSE, configs, etc.
|  
|───public (all the public and search engine data)
|   |   favicon.ico
|   |   logo.png
|   |   sitemap.xml
|
|───src
|   |   App.tsx
|   |   index.css
|   |   index.tsx
|   |   
|   |───components
|   |   |   alerts
|   |   |   grid
|   |   |   keyboard
|   |   |   mini-grid
|   |   |   modals
|   |   |   stats
|   |
|   |───constants (word list and valid guesses)
|   |   |   validGuesses.ts
|   |   |   wordlist.ts
|   |
|   |───lib (utility and other functions)
|   |   |   keyboard.ts
|   |   |   localStorage.ts
|   |   |   share.ts
|   |   |   stats.ts
|   |   |   statuses.ts
|   |   |   words.ts

```


### To Run Locally

Clone the repository and perform the following command line actions:

```bash
$ cd latin-wordle
$ npm install
$ npm run start
```
