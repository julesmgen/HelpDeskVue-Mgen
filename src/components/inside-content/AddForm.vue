<template>
    <div class="container">
        <form>
            <div class="row">
                <h4 class="header-form">New Ticket Form</h4>

                <form @submit.prevent=""> 
                
                    <div class="inputs">

                        <div class="input-group"> <!--input-group-icon-->
                            <p>Requestor</p>
                            <input class="text" type="text" placeholder="Enter Requestor" v-model="formData.requestor" required/> <!--placeholder="Enter a name or email address"-->
                            <!-- <i class="fa fa-user"></i>-->
                        </div>
                        <div class="input-group"> <!--input-group-icon-->
                            <p>Department</p>
                            <input class="text" type="text" placeholder="Enter Deparment" v-model="formData.department" required/>
                            <!--<div class="input-icon"></div>-->
                            <!-- <i class="fa fa-envelope"></i>-->
                        </div>
                        <div class="input-group"> <!--input-group-icon-->
                            <p>Contact Number</p>
                            <input class="text" type="text" placeholder="Enter Contact Number" v-model="formData.contact_no" required/>
                            <!--
                            <div class="input-icon"><i class="fa fa-key"></i>
                            </div>
                            -->
                        </div>

                        <div class="input-group"> 
                            <p>Issue</p>
                            <div >
                                <select class="full-width" v-model="formData.issue" required>
                                    <option></option>
                                    <option v-for="issue in issues" :key='issue.id'>{{issue.title}}</option>
                                </select>
                            </div>
                            
                        </div>

                        <div class="input-group"> <!--input-group-icon-->
                            <p>Description</p>
                            <textarea rows="10" cols="50" class="issue"  type="text" placeholder="Enter description" v-model="formData.description" required></textarea>
                            <!--
                            <div class="input-icon"><i class="fa fa-key"></i>
                            </div>
                            -->
                        </div>

                        <div class="input-group"> <!--input-group-icon-->
                            <p>Justification</p>
                            <textarea rows="10" cols="50" class="issue"  type="text" placeholder="Enter justification" v-model="formData.justification" required></textarea>
                            <!--
                            <div class="input-icon"><i class="fa fa-key"></i>
                            </div>
                            -->
                        </div>

                        <br>

                        <button type="submit" class="submit-btn" @click="submitData"> Submit </button>


                    </div>

                </form>

            </div>
            <!--
            <div class="row">
                <div class="col-half">
                    <h4>Date of Birth</h4>
                    <div class="input-group">
                        <div class="col-third"><input type="text" placeholder="DD" /></div>
                        <div class="col-third"><input type="text" placeholder="MM" /></div>
                        <div class="col-third"><input type="text" placeholder="YYYY" /></div>
                    </div>
                </div>
                <div class="col-half">
                    <h4>Gender</h4>
                    <div class="input-group"><input id="gender-male" type="radio" name="gender" value="male" /><label for="gender-male">Male</label><input id="gender-female" type="radio" name="gender" value="female" /><label for="gender-female">Female</label></div>
                </div>
            </div>
            <div class="row">
                <h4>Payment Details</h4>
                <div class="input-group"><input id="payment-method-card" type="radio" name="payment-method" value="card" checked="true" /><label for="payment-method-card"><span><i class="fa fa-cc-visa"></i>Credit Card</span></label><input id="payment-method-paypal" type="radio" name="payment-method" value="paypal" /><label for="payment-method-paypal"> <span><i class="fa fa-cc-paypal"></i>Paypal</span></label></div>
                <div class="input-group input-group-icon"><input type="text" placeholder="Card Number" />
                    <div class="input-icon"><i class="fa fa-credit-card"></i></div>
                </div>
                <div class="col-half">
                    <div class="input-group input-group-icon"><input type="text" placeholder="Card CVC" />
                        <div class="input-icon"><i class="fa fa-user"></i></div>
                    </div>
                </div>
                <div class="col-half">
                    <div class="input-group"><select>
                            <option>01 Jan</option>
                            <option>02 Jan</option>
                        </select><select>
                            <option>2015</option>
                            <option>2016</option>
                        </select></div>
                </div>
            </div>
            <div class="row">
                <h4>Terms and Conditions</h4>
                <div class="input-group"><input id="terms" type="checkbox" /><label for="terms">I accept the terms and conditions for signing up to this service, and hereby confirm I have read the privacy policy.</label></div>
            </div>
            -->
        </form>
    </div>
</template>




<script>
import axios from 'axios'

export default {
    name: 'AddForm',

    data(){
        return{
            issues:[],
            formData:{
                requestor:'',
                department:'',
                contact_no:'',
                issue:'',
                description:'',
                justification:''
            },
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
        submitData(){
            console.log(
                    this.formData.requestor,
                    this.formData.department,
                    this.formData.contact_no,
                    this.formData.issue,
                    this.formData.description,
                    this.formData.justification
            )
            if(this.formData.requestor != '' && this.formData.department != '' && this.formData.contact_no != '' && this.formData.issue != ''){
                axios.post('http://localhost/helpdesk/helpdesk/add_ticket.php',
                {
                    requestor:this.formData.requestor,
                    department:this.formData.department,
                    contact_no:this.formData.contact_no,
                    issue:this.formData.issue,
                    description:this.formData.description,
                    justification:this.formData.justification
                })
                    .then((response)=>{
                        console.log(response.data.message);
                        this.formData.requestor ='';
                        this.formData.department ='';
                        this.formData.contact_no ='';
                        this.formData.issue ='';
                        this.formData.description ='';
                        this.formData.justification ='';

                        //location.reload();
                        alert(response.data.message);
                            
                    })
                    .catch((error)=> {
                    console.log(error)
                    });
            } else{
                alert("Fill all the fields");
            }
        }
    },

    created: function(){
     this.getIssue()
   }
}
</script>




<style>
/* 64ac15 */
*,
*:before,
*:after {
  box-sizing: border-box;
}
body {
  /*padding: 1em;*/
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 15px;
  color: #b9b9b9;
  /*background-color: #e3e3e3;*/
  margin-top: 20px;
  margin-bottom: 20px;
}
h4 {
  color: #1e6097;
  font-size: 150%;
}
input,
input[type="radio"] + label,
input[type="checkbox"] + label:before,
select option,
select {
  width: 100%;
  padding: 1em;
  line-height: 1.4;
  background-color: #f9f9f9;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
input:focus {
  outline: 0;
  border-color: #26628f;
}
input:focus + .input-icon i {
  color: #2d78b1;
}
input:focus + .input-icon:after {
  border-right-color: #2d78b1;
}
input[type="radio"] {
  display: none;
}
input[type="radio"] + label,
select {
  display: inline-block;
  width: 50%;
  /*text-align: center;*/
  float: left;
  border-radius: 0;
}
input[type="radio"] + label:first-of-type {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
input[type="radio"] + label:last-of-type {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
input[type="radio"] + label i {
  padding-right: 0.4em;
}
input[type="radio"]:checked + label,
input:checked + label:before,
select:focus,
select:active {
  /*background-color: #2d78b1; */ /* #f0a500 */
  /*color: #fff;*/
  border-color: #26628f;
}
input[type="checkbox"] {
  display: none;
}
input[type="checkbox"] + label {
  position: relative;
  display: block;
  padding-left: 1.6em;
}
input[type="checkbox"] + label:before {
  position: absolute;
  top: 0.2em;
  left: 0;
  display: block;
  width: 1em;
  height: 1em;
  padding: 0;
  content: "";
}
input[type="checkbox"] + label:after {
  position: absolute;
  top: 0.45em;
  left: 0.2em;
  font-size: 0.8em;
  color: #fff;
  opacity: 0;
  font-family: FontAwesome;
  content: "\f00c";
}
input:checked + label:after {
  opacity: 1;
}
select {
  height: 3.4em;
  line-height: 2;
}
select:first-of-type {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}
select:last-of-type {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}
select:focus,
select:active {
  outline: 0;
}
select option {
  /* background-color: #2d78b1;
  color: #fff; */
}
.input-group {
  margin-bottom: 1em;
  zoom: 1;
}
.input-group:before,
.input-group:after {
  content: "";
  display: table;
}
.input-group:after {
  clear: both;
}
.input-group-icon {
  position: relative;
}
.input-group-icon input {
  padding-left: 4.4em;
}
.input-group-icon .input-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 3.4em;
  height: 3.4em;
  line-height: 3.4em;
  text-align: center;
  pointer-events: none;
}
.input-group-icon .input-icon:after {
  position: absolute;
  top: 0.6em;
  bottom: 0.6em;
  left: 3.4em;
  display: block;
  border-right: 1px solid #e5e5e5;
  content: "";
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.input-group-icon .input-icon i {
  -webkit-transition: 0.35s ease-in-out;
  -moz-transition: 0.35s ease-in-out;
  -o-transition: 0.35s ease-in-out;
  transition: 0.35s ease-in-out;
  transition: all 0.35s ease-in-out;
}
.container {
  max-width: 38em;
  padding: 1em 3em 2em 3em;
  margin: 0em auto;
  background-color: #fff;
  border-radius: 4.2px;
  box-shadow: 0px 3px 10px -2px rgba(0, 0, 0, 0.2);
}
.row {
  zoom: 1;
}
.row:before,
.row:after {
  content: "";
  display: table;
}
.row:after {
  clear: both;
}
.col-half {
  padding-right: 10px;
  float: left;
  width: 50%;
}
.col-half:last-of-type {
  padding-right: 0;
}
.col-third {
  padding-right: 10px;
  float: left;
  width: 33.33333333%;
}
.col-third:last-of-type {
  padding-right: 0;
}
@media only screen and (max-width: 540px) {
  .col-half {
    width: 100%;
    padding-right: 0;
  }
}

.inputs{
    margin-left: 5%;
    margin-right: 5%;
}

.inputs p{
    font-size: 85%;
    color: #696969;
    font-weight: 600;
}

.input-group ::placeholder{
    color:#b9b9b9;
    font-size: 90%;
    font-style: italic;
}

.issue{
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 1em;
    width: 100%;
    background-color: #f9f9f9;
    border: 1px solid #e5e5e5;
    border-radius: 3px;
    -webkit-transition: 0.35s ease-in-out;
    -moz-transition: 0.35s ease-in-out;
    -o-transition: 0.35s ease-in-out;
    transition: 0.35s ease-in-out;
    transition: all 0.35s ease-in-out;
    resize:none;
}

.issue:focus {
  outline: 0;
  border-color: #26628f;
}
.full-width{
    width:100%;
}
/*css for button */

.submit-btn{
  appearance: none;
  border: 1px solid rgba(27, 31, 35, .15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, .1) 0 1px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system,system-ui,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  padding: 10px 26px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  background-color:#1e6097;
  margin:auto;
    display: block;
}

.submit-btn:focus:not(:focus-visible):not(.focus-visible) {
  box-shadow: none;
  outline: none;
}

.submit-btn:hover {
  background-color: #2496ee;
  transition: 0.15s;
}

.submit-btn:focus {
  box-shadow: rgba(46, 164, 79, .4) 0 0 0 3px;
  outline: none;
}

.submit-btn:disabled {
  background-color: #94d3a2;
  border-color: rgba(27, 31, 35, .1);
  color: rgba(255, 255, 255, .8);
  cursor: default;
}
.text{
  width: 200%;
}


</style>