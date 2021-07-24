// data
var films = [
    { id: 1, etat:"avoir", nom: "Iron Man", duree: 126, img: 'assets/img/quarz-luxe.JPG'},
    { id: 2, etat:"avoir", nom: 'L\'Incroyable Hulk', duree: 200, img: 'assets/img/curren-business.JPG'},
    { id: 3, etat:"avoir", nom: 'Iron Man 2', duree: 125, img: 'assets/img/curren-sport.JPG'},
    { id: 4, etat:"vu", nom: 'Thor', duree: 118, img: 'assets/img/jaragar-racing.JPG'},
    { id: 5, etat:"vu", nom: 'Captain America: First Avenger', duree: 3, img: 'assets/img/liges-hommes.JPG'},
    { id: 6, etat:"avoir", nom: 'Avengers', duree: 165, img: 'assets/img/maserati-mechanical.JPG'},
    { id: 7, etat:"vu", nom: 'Iron Man 3', duree: 125, img: 'assets/img/montre-mecanique.JPG'},
    { id: 8, etat:"avoir", nom: 'Thor : Le Monde des ténèbres', duree: 128, img: 'assets/img/brand-designer.JPG'},
    { id: 9, etat:"vu", nom: 'Captain America : Le Soldat de l\'hiver', duree: 124, img: 'assets/img/relogio-masculino.JPG'},
    { id: 10, etat:"vu", nom: 'Les Gardiens de la Galaxie', duree: 129, img: 'assets/img/tissot-multifunction.JPG'},
  ];

const Home = {
    template: '#home',
    name: 'Home',
    data: () => {
        return { 
            films,
            searchKey: '',
            liked: [],
            cart: []
        }
    },
    computed: {
        filteredList(){
            return this.films.filter((film) => {
                return film.nom.toLowerCase().includes(this.searchKey.toLowerCase());
            })
        },
        getLikeCookie(){
            let cookieValue = JSON.parse($cookies.get('like'));
            cookieValue == null ? this.liked = [] : this.liked = cookieValue
        },
        cartTotalAmount(){
            let total = 0;
            for (let item in this.cart){
                total = total + (this.cart[item].quantity * this.cart[item].duree);
            }
            return total;
        },
        itemTotalAmount(){
            let itemTotal = 0;
            for (let item in this.cart){
                itemTotal = itemTotal + this.cart[item].quantity;
            }
            return itemTotal;
        }
    },
    methods: {
        vu(filmVu) {
            for (let i = 0; i < this.films.length; i++) {
                if (this.films[i].id === filmVu.id) {
                    filmVu.etat = "vu";
                }
            }
        },
        setLikeCookie(){
            document.addEventListener('input', () => {
                setTimeout(() => {
                    $cookies.set('like', JSON.stringify(this.liked));
                }, 300);
                
            })
        },
        addToCart(film){
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i].id === film.id) {
                    return this.cart[i].quantity++
                }
            }
            this.cart.push({
                id: film.id,
                img: film.img,
                nom: film.nom,
                duree: film.duree,
                quantity: 1
            })
        },
        cartPlusOne(film){
            film.quantity = film.quantity + 1;
        },
        cartMinusOne(film, id){
            if (film.quantity == 1){
                this.cartRemoveItem(id);
            } else {
                film.quantity = film.quantity - 1;
            }
        },
        cartRemoveItem(id){
            this.$delete(this.cart, id);
        }
        
    },
    mounted: () => {
        this.getLikeCookie;
    },
}

const Settings = {
    template: '<h1>Settings</h1>',
    name: 'Settings'
}

const WishList = {
    template: '<h1>WishList</h1>',
    name: 'WishList'
}

const ShoppingCart = {
    template: '<h1>ShoppingCart</h1>',
    name: 'ShoppingCart'
}

const router = new VueRouter({
    routes: [
        { path: '/', component: Home, name: 'Home'},
        { path: '/settings', component: Settings, name: 'Settings'},
        { path: '/wishlist', component: WishList, name: 'WishList'},
        { path: '/shoppingcart', component: ShoppingCart, name: 'ShoppingCart'},
    ]
})


const vue = new Vue({
    router
}).$mount('#app');