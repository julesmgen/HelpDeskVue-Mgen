<template>
    <div id='wrapper' :class="[toggleClass ? 'menuDisplayed' : '']">

        <!--sidebar -->
        <SideBar @getChange="handleChange"/> <!--get change is for the back button only-->

        <!-- Page content -->
        <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class ="row">
                    <div class="col-lg-12">
                        <button v-show="toggleClass == false" class="back-button" @click="toggleTrue"> 

                            <i class="fa-solid fa-bars burger-icon"></i>
                            
                        </button>

                        <button v-show="toggleClass == true" class="back-button"/> <!-- filler lang para may space sa taas (pwede tanggalin)-->



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
        toggleTrue(){
            this.toggleClass = true;
        },
        handleChange(data){
            this.toggleClass = data;
            console.log(this.toggleClass)
        }
    },
    created: function(){
        this.toggleTrue();
    }
}
</script>

<style>
.burger-icon{
    padding:0;
    
    height: 25px;
    width: 25px;
}
.back-button{
    margin-top:5px;
    border: 0px;
    background-color: #FFFFFF;
}
.back-button:hover{
    opacity: 0.4;
    transition: 0.2s;
    transform: scale(1.15);
}
.divider{
    height:1px;
    border-width:0;
    /*color:gray;*/
    background-color:gray;
}
</style>