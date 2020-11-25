const vue =  new Vue(
    {
        el: '.app',
        data: {
            champions: [], 
            filterChampion: "", 
            filteredChampions: [],
            championInfo: {},
            isChampionModalOpen: false
        },
        methods: {
            async getLolData() {
                const lolData = await fetch("http://ddragon.leagueoflegends.com/cdn/10.23.1/data/es_ES/champion.json")
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
            },
            async getChampionData(id) {
                const ChampionData = await fetch(`http://ddragon.leagueoflegends.com/cdn/10.24.1/data/es_ES/champion/${id}.json`)
                .then((res) => res.json())
                .then((data) => (obj = data))
                .catch((error) => console.log(error));

                const fullimage = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${ChampionData.data[id].id}_0.jpg`;
                ChampionData.data[id].fullimage = fullimage;
                console.log(ChampionData.data[id].spells)
                
                ChampionData.data[id].spells.forEach((spell) => {
                    const spellicon = `http://ddragon.leagueoflegends.com/cdn/10.24.1/img/spell/${spell.image.full}`
                    spell.icon = spellicon;
                })

                console.log(ChampionData.data[id].spells)
                
                this.championInfo = ChampionData.data[id]
            },

            async selectChampionHandler(id) {
                await this.getChampionData(id)
                this.isChampionModalOpen = true;
                document.body.style.overflow = 'hidden';
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