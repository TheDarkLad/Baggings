<template>
    <div>
            <div class="form-group">
                <input type="text"
                       v-model="searchText"
                       class="form-control"
                       id="Title"
                       placeholder="Zoeken" />
            </div>
            <div class="form-group">
                <select v-model="filterStatus" class="form-control">
                    <option v-for="status in filterStatuses" :key="status.id" :value="status.id" v-html="status.text"></option>
                </select>
            </div>

            <div class="author" v-for="author in filteredBooks" :key="author.author">
                <h3 v-html="author[0].author"></h3>
                <div class="books">                    
                    <div class="book" v-for="book in orderedBooks(author)" :key="book.key">
                        <router-link :to="'/edit/' + book.key">
                        <div class="header">
                             <figure>
                                <img :src="book.image" class="cover img-center" alt="image">
                            </figure>
                        </div>
                        <div class="content">
                            <p v-if="book.title" class="card-title" v-html="book.title"></p>
                            <p v-if="book.subtitle" class="subtitle" v-html="book.subtitle"></p>
                            <p v-if="book.series" class="series" v-html="book.series"></p>
                        </div>
                        <div class="banner">
                            <svg height="100" width="100" v-if="book.status === 1" >
                                <polygon points="0,0 50,0 100,50 100,100" class="finished" />
                                <text x="39" y="-12" fill="WHITE" transform="rotate(45)">GELEZEN </text>
                            </svg>
                            <svg height="100" width="100" v-if="book.status === 2">
                                <polygon points="0,0 50,0 100,50 100,100" class="reading" />
                                <text x="35" y="-12" fill="WHITE" transform="rotate(45)">MEE BEZIG</text>
                            </svg>
                        </div> 
                     </router-link>
                     </div>
                </div> 
            </div>
            <router-link :to="'/add/'" class="button add"><i class="fa fa-plus"></i></router-link>
        </div>
</template>
<script>    
    import shared from './../shared';
    
    export default {
        name:"books",
        mixins:[shared],
        props: [],
        data(){
            return {
                books: [],
                searchText: undefined,
                filterStatuses: [
                    { text: 'Alle boeken', id: -1} ,
                    { text: 'Nog te lezen', id: 0} ,
                    { text: 'Gelezen', id: 1} ,
                    { text: 'Mee Bezig', id: 2} ,
                ],
                filterStatus: -1,
            }
        },
        methods: {
            groupBy(arr, prop) {
                const map = new Map(Array.from(arr, obj => [obj[prop], []]));
                arr.forEach(obj => map.get(obj[prop]).push(obj));
                return Array.from(map.values());
            },
            orderedBooks(books){
                if(books){
                    books = books.sort((a, b) => (a.series > b.series) ? 1 : -1);
                    books = books.sort((a, b) => (a.number > b.number) ? 1 : -1);
                }
                return books;            
            },
            loadData(){
                fetch(`${this.bookUrl}?v=` + Date.now().valueOf())
                    .then(r => r.json())
                    .then(json => { this.books=json;});
            },
        },
        computed:{
            filteredBooks(){
                let filteredBooks = this.books;
                if(filteredBooks){
                    // filter text
                    if(this.searchText) {
                        filteredBooks = filteredBooks.filter((x) => {
                            var filterstrings = [this.searchText];
                            var regex = new RegExp( filterstrings.join( "|" ), "i");
                            return (x.title && regex.test(x.title)
                                || (x.author && regex.test(x.author))
                                || (x.series && regex.test(x.series))
                                || (x.subtitle && regex.test(x.subtitle)))
                        });
                    }

                    // filter staus
                    if(this.filterStatus > -1){
                        filteredBooks = filteredBooks.filter((x) => {
                            return (x.status === this.filterStatus)
                        });
                    }
                    // sort 
                    filteredBooks = filteredBooks.sort((a, b) => (a.author > b.author) ? 1 : -1);
                    
                    // group by author
                    filteredBooks = this.groupBy(filteredBooks, "author");                       
                }
                return filteredBooks;
            }
        },
        mounted(){
            this.loadData();
        }
}
</script>