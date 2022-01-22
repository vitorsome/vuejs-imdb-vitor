import Cache from "../cache";

class MovieModel {

    constructor() {
        this.return = 'asdadasd';
        this.cache = new Cache();
    }

    requestMovie(search) {
        return new Promise((resolve) => {
            this.request(search).then((response) => {
                resolve(response.d[0]);
            })
        });
    }

    requestAllMovies(search) {
        return new Promise((resolve) => {
            this.request(search).then((response) => {
                resolve(response);
            })
        });
    }

    request(search) {
        return new Promise((resolve, reject) => {
            let cachedMovie = this.cache.getObjectCache(search);
            if (!cachedMovie) {
                fetch("https://imdb8.p.rapidapi.com/auto-complete?q="+encodeURI(search), {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "imdb8.p.rapidapi.com",
                        "x-rapidapi-key": process.env.VUE_APP_APIKEY
                    }
                })
                .then(response => {
                    return response.json();
                }).then(response => {
                    this.cache.setObjectCache(search, JSON.stringify(response));
                    resolve(response);
                })
                .catch(err => {
                    reject(err);
                    console.log("ASDASDASDASD");
                    console.error(err);
                });
            } else {
                resolve(cachedMovie);
            }
        });
    }

}

export default MovieModel;