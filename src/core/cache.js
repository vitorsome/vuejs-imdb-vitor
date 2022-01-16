let Cache = function() {
    this.init();
    this.key = '';
    this.value = '';
}

Cache.prototype.init = function() {
    console.log('iniciando objeto de cache');
    //Verifica se existe session storage

}

Cache.prototype.setObjectCache = function(key, value) {
    sessionStorage.setItem(key, value);
}

Cache.prototype.getObjectCache = function(key) {
    console.log(key);
    this.key = key;
    this.value = false;
    let cached = sessionStorage.getItem(key);
    if (cached) {
       this.key = key;
       this.value = JSON.parse(cached);
    }
}

export default Cache;