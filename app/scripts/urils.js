
findIndexById = function(obj,id,array){

    for(var x = 0; x < array.length; x++){

        if(obj[id] == array[x][id]){

            return x;
        }
    }
    return -1 ;
};