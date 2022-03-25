<template>
    <div>
        <div class="row container-header">
            <div class="col-md-6">
                <h1 class="view-ticket-header">View Tickets (draft)</h1>
            </div>
            <div class="col-md-6">
                <div class="float-right beside-header">
                    <button class="margin-right btn btn-primary" @click="openAddTicket">New Ticket</button>
                    <select class="margin-right selectfilter" name="" id="">
                        <option value="value1">Value1</option>
                        <option value="value2">Value2</option>
                    </select>
                    <button class="btn btn-light btn-refresh" @click="refreshPage">
                        <i class="fa-solid fa-arrow-rotate-right"></i>
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
                        
                        <button @click="deleteTicket(ticket.id)" class="action-btn delete"> 
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

        <div v-if="ticketOpen == true">
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <div class="col-lg-6">
                                        <h3 class="modal-title">
                                            {{dynamicTitle}}
                                        </h3>
                                    </div>
                                    <div class="col-lg-6">
                                        
                                        <button class="float-right btn btn-danger" @click="closeAddTicket">
                                            Close
                                        </button>
                                    </div>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label for="">Requestor</label>
                                        <input placeholder="Enter requestor" type="text" class="form-control" v-model="addTicket.requestor"/>
                                    </div>

                                    <div class="form-group">
                                        <label for="">Department</label>
                                        <input placeholder="Enter department" type="text" class="form-control" v-model="addTicket.department"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Contact Number</label>
                                        <input placeholder="Enter contact number" type="text" class="form-control" v-model="addTicket.contact_no"/>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Issue</label>
                                        <!--<input placeholder="Enter issue" type="text" class="form-control" v-model="addTicket.issue"/>-->
                                        <br>
                                        <select class="form-control" v-model="addTicket.issue" required>
                                            <option></option>
                                            <option v-for="issue in issues" :key='issue.id'>{{issue.title}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Description</label>
                                        <!--<input type="text" class="form-control" v-model="addTicket.description"/>-->
                                        <textarea rows="5" cols="20" class="form-control issue" placeholder="Enter description" v-model="addTicket.description" required></textarea>
                                    </div>
                                    <div class="form-group">
                                        <label for="">Justification</label>
                                        <!--<input type="text" class="form-control" v-model="addTicket.justification"/>-->
                                        <textarea rows="5" cols="20" class="form-control issue" placeholder="Enter justification" v-model="addTicket.justification" required></textarea>
                                    </div>
                                    <br>
                                    <div align="center">
                                        <input type="hidden" v-model="addTicket.hiddenId"/>
                                        <button class="btn btn-success" @click="submitTicket">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name:'ViewTickets',
    
    data(){
       return{
           
            addTicket:{
                hiddenId:'',
                requestor:'',
                department:'',
                contact_no:'',
                issue:'',
                description:'',
                justification:'',
                status:'available'
            },
            ticketOpen:false,
            issues:[],
            dynamicTitle:'Add Ticket',
            tickets: [],
            isActive: false,
            showAddUser: false,
            search: {keyword: ''}, 
            noMember: false, 
            updateUser: false //default value of update (for update front-end)

       }
   },

   methods:{
       getIssue(){
            axios.get('http://localhost/helpdesk/helpdesk/get_issue.php')
                .then((response)=>{
                    console.log(response.data)
                    this.issues=response.data
                })
                .catch((error)=> {
                console.log(error)
                })
        },
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
       openAddTicket(){
           this.ticketOpen =true;
       },
       closeAddTicket(){
           this.ticketOpen =false;
       },
       submitTicket(){

            if(this.addTicket.requestor != '' && this.addTicket.department != '' && this.addTicket.contact_no != '' && this.addTicket.issue != ''){
               axios.post('http://localhost/helpdesk/helpdesk/add_ticket.php',
                    {
                        requestor:this.addTicket.requestor,
                        department:this.addTicket.department,
                        contact_no:this.addTicket.contact_no,
                        issue:this.addTicket.issue,
                        description:this.addTicket.description,
                        justification:this.addTicket.justification,
                        status:this.addTicket.status
                    })
                    .then((response)=>{
                        console.log(response.data.message);
                        this.addTicket.requestor=""
                        this.addTicket.department=""
                        this.addTicket.contact_no=""
                        this.addTicket.issue=""
                        this.addTicket.description=""
                        
                        //location.reload();
                        alert(response.data.message);
                        this.closeAddTicket()
                        this.refreshPage()
                    })
                    .catch((error)=> {
                        console.log(error)
                    });
            }
           else{
               alert("Fill all the fields");
           }
          
       },
       refreshPage(){
           //temporary for reload
           location.reload()
       },

       deleteTicket(id){
            console.log(id)
            axios.post('http://localhost/helpdesk/helpdesk/delete_ticket.php',{
                idid: id
            })
            .then(function (response){
                // Remove index from users
                location.reload();
                alert(response.data.message);
            })
            .catch((error)=> {
                console.log(error)
            });
       }
   },

   created: function(){
     this.getPosts()
     this.getIssue()
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
.selectfilter{
    height:34px;
    width: 100px;
}
hr{
    height: 1px;
    background-color:#d4d4d4;
}

/* btn style*/
.btn-refresh{
    border:1px solid;
    border-color:silver;
}
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

.margin-right{
    margin-right:10px;
}
.full-width{
    width:100%;
}

/*modal stuff*/

.modal-mask{
    position: fixed;
    z-index: 9998;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    display: table;
    transition: opacity .3s ease;
}
.modal-wrapper{
    display: table-cell;
    vertical-align: middle;
}
/*close button for modal*/
.modal-close-btn{
    padding:5px 15px 5px 15px;
}

/*for textarea "issue" */

.issue{
    resize:none;
}
</style>