import MovieModel from "./models/MovieModel";

class Movie {

    constructor(name, year, cast, rank) {
        this._name = name || '';
        this._year = year || '';
        this._cast = cast || '';
        this._rank = rank || '';
    }

    get name() {
        return this._name;
    }

    get year() {
        return this._year;
    }

    get rank() {
        return this._rank;
    }

    get cast() {
        return this._cast;
    }

    requestMovieImdb(search) {
        return new Promise((resolve) => {
            let movieModel = new MovieModel();
            movieModel.requestMovie(search).then((response) => {
                this.fillMovieInformation(response);
                resolve();
            });
        });
    }

    requestAllMoviesImdb(search) {
        return new Promise((resolve) => {
            let movieModel = new MovieModel();
            movieModel.requestAllMovies(search).then((response) => {
                resolve(response.d);
            });
        });
    }

    fillMovieInformation(movieInformation) {
        this._name = movieInformation.l;
        this._year = movieInformation.y;
        this._cast = movieInformation.s;
        this._rank = movieInformation.rank;
    }

}

export default Movie