export function deepClone<T>(obj:T):T{
    let result : T | any;
    if(typeof obj !=='object' || obj == null){
        return obj;
    }
    if(obj instanceof Array){
        result = [] ;
    }else{
        result = {};
    }

    for(const key in obj){
        result[key] = deepClone(obj[key]);
    }

    return result;
}