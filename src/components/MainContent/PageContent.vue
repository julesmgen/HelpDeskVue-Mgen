<template>
    <div id='wrapper' :class="[toggleClass ? 'menuDisplayed' : '']">

        <!--sidebar -->
        <SideBar />

        <!-- Page content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class ="row">
                    <div class="col-lg-12">
                        <button class="back-button" @click="toggleMenu"> 
                            
                            <img class="back-icon" v-if="toggleClass == false" :src="this.frontIcon" alt="Front Icon">
                            <img class="back-icon" v-if="toggleClass == true" :src="this.backIcon" alt="Back Icon"> 
                            
                        </button>

                        <hr class="divider"/>
                        

                        <router-view></router-view>

                        
                        

                    </div>
                
                </div>
                
            </div>

        </div>

    </div>
</template>

<script>
import SideBar from '../Sidebar/SideBar.vue'
//import ViewTickets from './ViewTickets.vue'

export default {
    name:'PageContent',

    components:{
        SideBar,
        //ViewTickets
    },

    data(){
        return{
            toggleClass:false,
            backIcon: require('@/assets/images/back-icon.png'),
            frontIcon: require('@/assets/images/front-icon.png')
        }
    },

    methods:{
        toggleMenu(){
            //e.preventDefault();
            this.toggleClass = !this.toggleClass;
        },
        toggleTrue(){
            this.toggleClass = true;
        }
    },
    created: function(){
        this.toggleTrue();
    }
}
</script>

<style>
.back-icon{
    height: 20px;
    width: 20px;
}
.back-button{
    border: 0px solid;
    background-color: #FFFFFF;
}
.back-button:hover{
    opacity: 0.4;
    transition: 0.2s;
}
.divider{
    height:1px;
    border-width:0;
    /*color:gray;*/
    background-color:gray;
}
</style>