class Storage {
    setValue(key, value) {
        localStorage.setItem(key, value);
    }

    getValue(key){
        return localStorage.getItem(key);
    }

    clear(){
        localStorage.clear();
    }
}