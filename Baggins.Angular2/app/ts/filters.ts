import {Pipe} from 'angular2/core';

@Pipe({
    name: 'authorFilter'
})
export class authorFilter {
    transform(value, args?) {
        let [name] = args;
        return value.filter(book => {
            if (name != undefined && name != "" && name != "undefined")
                return book[0].Author == name;
            else
                return book[0].Author
        });
    }
}
@Pipe({
    name: 'readFilter'
})
export class readFilter {
    transform(value, args?) {
        let [name] = args;
        return value.filter(book => {
            if (name != undefined && name != "" && name != "undefined")
                return book.Read == true;
            else
                return book
        });
    }
}
@Pipe({
    name: 'unreadFilter'
})
export class unreadFilter {
    transform(value, args?) {
        let [name] = args;
        return value.filter(book => {
            if (name != undefined && name != "" && name != "undefined")
                return book.Read == false && book.Reading == false;
            else
                return book
        });
    }
}
@Pipe({
    name: 'readingFilter'
})
export class readingFilter {
    transform(value, args?) {
        let [name] = args;
        return value.filter(book => {
            if (name != undefined && name != "" && name != "undefined")
                return book.Reading == true;
            else
                return book
        });
    }
}