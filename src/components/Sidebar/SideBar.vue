<template>
    <div id="sidebar-wrapper">   
        <img class="helpdesk-icon" src="../../assets/images/helpdesk-sample_icon.png" alt="">
        <ul class="sidebar-nav">

            <div class='ayusin-lang'>
                <!--header1-->
                <!--general-->
                <p class="nav-header">general</p>
                <li>
                    <router-link @click="makeDashBoardActive" :class="[this.dashboardActive ? 'active' : '']" to="/">Dashboard</router-link>
                    
                </li>
                <li>
                    <router-link @click="makeViewTicketsActive" :class="[this.viewTicketsActive ? 'active' : '']" to="/viewtickets">Tickets</router-link>
                </li>
            
                <br>

                <!--header2-->
                <!--if administrator this will show (else, it wont be shown)-->
                <p class="nav-header">administrator</p>
                
                <li>
                    <router-link @click="makeDepartmentActive" :class="[this.departmentActive ? 'active' : '']" to="/department">Department</router-link>
                </li>
                <li>
                    <a href="#">Users</a>
                </li>
                <li>
                    <a href="#">User Roles</a>
                </li>
                <li>
                    <a href="#">Settings</a>
                </li>

                <br>

                <!--header3-->
                <!--MSP-->
                <p class="nav-header">msp</p>

                <li>
                    <a href="#">For Support</a>
                </li>
                <li>
                    <a href="#">Export Report</a>
                </li>
                <li>
                    <a href="#">Graphical Report</a>
                </li>

                <li class="list-container_button">
                    <button @click="toggleFalse(false)" class="back-button">
                        <i class="back-icon fa-solid fa-circle-arrow-left"></i>
                    </button>
                </li>
                
            </div>

        </ul>

        
    </div>
        
</template>

<script>
/* stuff that i probably won't use */
//import {computed} from 'vue'
//import {useRouter} from 'vue-router'
//import SideBarLink from './SideBarLink.vue'

export default {
    name:'SideBar',
    data(){
        return{
            toggleClass:true,
            dashboardActive: false,
            viewTicketsActive: false,
            departmentActive: false,
            website_url:'http://localhost:8080'
        }
    },

    components:{
        //SideBarLink
    },
    methods:{
        //sidebar methods (kinda long tho)
        makeDashBoardActive(){
            this.dashboardActive = true;
            this.viewTicketsActive = false;
            this.departmentActive = false;
        },
        makeViewTicketsActive(){
            this.viewTicketsActive = true;
            this.dashboardActive = false;
            this.departmentActive = false;
        },
        makeDepartmentActive(){
            this.departmentActive = true;
            this.dashboardActive = false;
            this.viewTicketsActive = false;
            
        },
        setPageActive(){
            if(window.location.href == this.website_url || window.location.href == this.website_url + "/"){
                this.makeDashBoardActive();
            }else if(window.location.href == this.website_url + "/viewtickets"){
                this.makeViewTicketsActive();
            }else if(window.location.href == this.website_url + "/department"){
                this.makeDepartmentActive();
            }
        },

        toggleFalse(data){
            this.$emit('getChange',data)
        },
    },
    
    created: function(){
        this.setPageActive();

        
    }
}
</script>

<style scoped>
/*sidebar */

#sidebar-wrapper{
    z-index: 1;
    position: absolute;
    width: 0px;
    height: 100%;
    overflow-y: hidden;
    background:#2d78b1;
    /*border: 0.5px solid #1e6097;*/
    transition: 0.5s ease;
}

/* Sidebar styling */
.sidebar-nav{
    padding:0;
    list-style: none;
    margin-top: 10%;
    

}
.sidebar-nav li{
    font-size:17px;
    text-indent: 20px;
    line-height: 50px;
}
.sidebar-nav li a{
    display: block;
    text-decoration: none;
    color:#ddd;
}

.sidebar-nav li a:hover{
    background: #1e6097;
}


.helpdesk-icon{
    width: 50px;
    height: 60px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 15%;
}

.nav-header{
    text-indent: 15px;
    color: #ddd;
    font-family:Arial, Helvetica, sans-serif;
    font-size: 15px;
    font-weight: 600;
    text-transform: uppercase;
}

.active{
    background: #1e6097;
}


.back-icon{
    height: 20px;
    width: 20px;
    color: white;
    
}
.back-button{
    padding:0px 0px 0px 0px;
    border: 0px solid;
    background-color: #ffffff00;
}

.back-button:hover{
    opacity: 0.4;
    transition: 0.2s;
    
}

.list-container_button{
    position:absolute;
    bottom:0;
}

</style>