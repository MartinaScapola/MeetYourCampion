const vue =  new Vue(
    {
        el: '.app',
        data: {
            champions: [], 
            filterChampion: "", 
            filteredChampions: []
        },
        methods: {
            async getLolData() {
                const lolData = await fetch("http://ddragon.leagueoflegends.com/cdn/10.23.1/data/en_US/champion.json")
                .then((res) => res.json())
                .then((data) => (obj = data))
                .catch((error) => console.log(error));
                const championsList = []

                for (cham in lolData.data) {
                    const champion = (lolData.data[cham]);
                    const thumbimg = `https://static.u.gg/assets/lol/riot_static/10.23.1/img/champion/${champion.image.full}`;
                    champion.thumbImg = thumbimg;
                    championsList.push(champion);
                }      
                this.champions = championsList
                this.filteredChampions = championsList
            },
            filter() {       
                const listFiltered = this.champions.filter((cham) => {
                    let isfiltered = cham.name.toLowerCase().includes(this.filterChampion.toLowerCase())         
                    return isfiltered
                })
                this.filteredChampions = listFiltered
            }
        },
        mounted() {
            this.getLolData()
        },
        watch: {
            filterChampion() {
                this.filter() 
            },
        }
    });