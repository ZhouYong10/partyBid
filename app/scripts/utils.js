
findIndexById = function(id,idName,array){

    for(var x = 0; x < array.length; x++){

        if(array[x][idName] == id){

            return x;
        }
    }
    return -1;
};

