class Movie {

    constructor(name, year, cast, rank) {
        this._name = name || '';
        this._year = year || '';
        this._cast = cast || '';
        this._rank = rank || '';
        Object.freeze(this);
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

}

export default Movie