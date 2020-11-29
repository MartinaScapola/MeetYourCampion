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
            //This function get the information of all the champions in the League of Legends 
            async getLolData() {
                const lolData = await fetch("https://ddragon.leagueoflegends.com/cdn/10.23.1/data/es_ES/champion.json")
                .then((res) => res.json())
                .then((data) => (obj = data))
                .catch((error) => console.log(error));
                const championsList = []
                
            //With this loop, we go through all the json and sent the the variable championList. 
                for (cham in lolData.data) {
                    const champion = (lolData.data[cham]);
                    const thumbimg = `https://static.u.gg/assets/lol/riot_static/10.23.1/img/champion/${champion.image.full}`;
                    champion.thumbImg = thumbimg;
                    championsList.push(champion);
                }      

            //Then traslate that to "Champion", calling that array with the "this."
                this.champions = championsList
                this.filteredChampions = championsList
                
            },
            //This function is to filter the names of the Champions according what the user type in the input.
            filter() {       
                const listFiltered = this.champions.filter((cham) => {
                    let isfiltered = cham.name.toLowerCase().includes(this.filterChampion.toLowerCase())         
                    return isfiltered
                })
                this.filteredChampions = listFiltered
            },
            //With this function we get the data of an especific champion. 
            async getChampionData(id) {
                const ChampionData = await fetch(`https://ddragon.leagueoflegends.com/cdn/10.24.1/data/es_ES/champion/${id}.json`)
                .then((res) => res.json())
                .then((data) => (obj = data))
                .catch((error) => console.log(error));

            //here we call a url with the image of the champions, but in this case we complete it with the info of the champion. 
                const fullimage = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${ChampionData.data[id].id}_0.jpg`;
                ChampionData.data[id].fullimage = fullimage;
                console.log(ChampionData.data[id].spells)
                
            //same as the last one but with the spells images. 
                ChampionData.data[id].spells.forEach((spell) => {
                    const spellicon = `https://ddragon.leagueoflegends.com/cdn/10.24.1/img/spell/${spell.image.full}`
                    spell.icon = spellicon;
                })

                console.log(ChampionData.data[id].spells)
                
                this.championInfo = ChampionData.data[id]
                
            },
            //So, this one is for when i click in the image of the champion, we go to the "second page". 
            async selectChampionHandler(id) {
                await this.getChampionData(id)
                this.isChampionModalOpen = true;
                document.body.style.overflow = 'hidden';
            }, 
            //and when we click the "exit" icon, we go back to the inicial page. 
            CloseChampionModal() {
                this.isChampionModalOpen = false;
                document.body.style.overflow = 'visible'
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