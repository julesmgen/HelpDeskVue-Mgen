<template>
    <div>
        <div class="row container-header">
            <div class="col-md-6">
                <h1 class="view-ticket-header">View Tickets (draft)</h1>
            </div>
            <div class="col-md-6">
                <div class="float-right beside-header">
                    <button>New Ticket</button>
                    <select name="" id="">
                        <option value="value1">Value1</option>
                        <option value="value2">Value2</option>
                    </select>
                    <button>
                        Refresh
                    </button>
                </div>
            </div>
        </div>

        <hr>
        
        <div class="table-responsive">

            <table class="table table-striped custom-table">
            <thead>
                <tr>
                
                <th class="table-header" scope="col">Ticket ID</th>
                <th class="table-header" scope="col">Requestor</th>
                <th class="table-header" scope="col">Department</th>
                <th class="table-header" scope="col">Contact Number</th>
                <th class="table-header" scope="col">Issue</th>
                <th class="table-header" scope="col">Description</th>
                <th class="table-header" scope="col">Justification</th>
                <th class="table-header" scope="col">Action</th>
                
                </tr>
            </thead>
            <tbody>
                <tr v-if="noMember">
                <td colspan="5" align="center">The user you entered does not exist</td>
                </tr>

                <tr class="data" v-for="ticket in tickets" :key='ticket.id' scope="row">

                <!-- item displays here-->
                <!--<div v-for="post in posts" :key='post.id'>-->
                    <td>
                        {{ticket.id}}
                    </td>
                    <td>
                        {{ticket.requestor}}
                    </td>
                    <td>
                        {{ticket.department}}
                    </td>
                    
                    <td>
                        {{ticket.contact_no}}
                    </td>
                    <td>
                        {{ticket.issue}}
                    </td>
                    <td>
                        {{ticket.description}}
                    </td>
                    <td>
                        {{ticket.justification}}
                    </td>
                    <td>
                        <button @click="clickUpdate(ticket.id)" class="action-btn edit" > 
                            <img class="action-icons" src="../../assets/images/edit-97-64.png" alt="Edit icon here"/> 
                        </button>
                        
                        <button @click="deleteData(ticket.id)" class="action-btn delete"> 
                            <img class="action-icons" src="../../assets/images/delete-icon.png" alt="Delete icon here"/> 
                        </button>
                    </td>
                <!--</div>-->
                </tr>


                <!-- if update button is clicked -->
                <tr v-if="updateUser">
                <td>
                    <input value="trial"/>
                </td>
                <td>
                    <input value="trial"/>
                </td>
                <td>
                    <input value="trial"/>
                </td>
                <td>
                    <input value="trial"/>
                </td>

                <button class="submit-btn">Submit</button>
                </tr>



                

                
                
            </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'ViewTickets',
    
    data(){
       return{
           tickets: [],
           isActive: false,
           showAddUser: false,
           search: {keyword: ''}, 
           noMember: false, 
           updateUser: false //default value of update (for update front-end)

       }
   },

   methods:{
       getPosts(){
        axios.get('http://localhost/helpdesk/helpdesk/get_tickets.php')
            .then((response)=>{
                console.log(response.data)
                this.tickets=response.data;
            })
            .catch((error)=> {
                console.log(error)
            })
       },
   },

   created: function(){
     this.getPosts()
   },
}
</script>

<style>
.container-header{
    /*max-height:70px;*/
}
.action-icons{
    height: 20px;
    width: 20px;
}
hr{
    height: 1px;
    background-color:#d4d4d4;
}

/* btn style*/
.action-btn{
    margin-left:20px;
    border: 1px solid;
    border-radius: 4px;
}
.edit{
    background-color: rgb(81, 62, 245);
}

.edit:hover{
    background-color:rgb(148, 148, 245);
    transition: 0.15s;
}

.delete{
    background-color:rgb(248, 53, 53);
}

.delete:hover{
    background-color:rgb(247, 122, 122);
    transition: 0.15s;
}
.data{
    font-size: 16px;
}
.table-header{
    font-size: 120%;
}
.view-ticket-header{
    text-indent: 5px;
}
.float-right{
    float:right;
}
.beside-header{
    margin-top: 25px;
}
</style>