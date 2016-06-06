export class Book {
    public Key: number;
    public Title: string;
    public Author: string;
    public SubTitle: string;
    public Series: string;
    public Number: number;
    public Image: string;
    public Read: boolean;
    public Reading: boolean;
    public Listening: boolean;

    constructor() {

    }

    //constructor(key: number, title: string, author: string, subtitle: string, series: string, numberinseries: number, imageURL: string, read: boolean, reading: boolean, listening: boolean) {
    //    this.Key = key;
    //    this.Title = title;
    //    this.Author = author;
    //    this.SubTitle = subtitle;
    //    this.Series = series;
    //    this.Number = numberinseries;
    //    this.Image = imageURL;
    //    this.Read = read;
    //    this.Reading = reading;
    //    this.Listening = listening;
    //}  

    //Order by Author
    public static sortByKey(array, key, key2, key3) {
          return array.sort(function (a, b) {
            var x = a[key] + a[key2] + a[key3]; var y = b[key] + b[key2] + b[key3];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
}