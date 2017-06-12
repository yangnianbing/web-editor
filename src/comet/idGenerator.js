function IdGenerator(prefix){
    this.prefix = prefix;
    this.lastId = 0;
}

IdGenerator.prototype.next = function(){
    return this.prefix + (++this.lastId);
}

export default new IdGenerator('#id-');