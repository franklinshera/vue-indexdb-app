<template>
<h1>Dexie</h1>
<section class="dexie-page">
    <div class="info" v-show="resStatus != '' ">
      {{ resStatus }}
    </div>
  <form action="" @submit.prevent="save">

    <div class="input-group">
      <label for="">Name</label>
      <input type="text" v-model="name">
    </div>

    <div class="input-group">
      <label for="">Age</label>
      <input type="text" v-model="age">
    </div>

    <button id="send">Save</button>
  </form>

<hr>


  <div class="no-data" v-show="friends.length == 0"> No friends</div>

  <div class="friendslist" v-show="friends.length > 0">
      <div class="friendhead">
          <span>ID</span>
          <span>NAME</span>
          <span>AGE</span>
          <span>DEL</span>
      </div>

      <div class="friend" v-for="friend in friends" :key="friend.id">
          <span>{{ friend.id }}</span>
          <span>{{ friend.name }} </span>
          <span>{{ friend.age }}</span>
          <span><button id="del" @click.prevent="deleteFriend(friend.id)">&times;</button></span>
      </div>
  </div>


</section>
</template>


<script >
import { ref } from "vue";

import { db } from "../db";
  import { liveQuery } from "dexie";
  import { useObservable } from "@vueuse/rxjs";



export default{
  name: 'Dexie',
  setup(){

    let name = ref("");
    let age = ref(0);
    let resStatus = ref("");

    function notify(info){
      resStatus.value = info;

        setTimeout(() => resStatus.value = "",3500)
    }

    async function save(){

      if(name.value == '' || age.value == 0){

        notify("Fill All Fields");

        return;
      }
      
       try {
         
        const id = await db.friends.add({
          name: name.value,
          age: age.value,
        });


        notify(`${name.value} successfully added. Got id ${id}`);


        name.value = '';
        age.value = 0;

      } catch (error) {
        notify(`Failed to add ${name.value}: ${error}`);
      }


    }


async function deleteFriend(id){
  if(id < 1){
   notify("Invalid ID")
  }
  await db.friends.delete(id)
}
    return{
      name,
      age,
      resStatus,
      save,
      friends: useObservable(
          liveQuery(() => db.friends.toArray())
        ),
        deleteFriend
    }

  }
}
</script>


<style>


hr{
  background-color: #2c3e50;
  height: 2px;
  width: 100%;
  margin-bottom: 20px;
}
.friendslist{
  width: 40%;
}

.friendslist .friend{
  margin: 10px;
}

.friendslist .friend  , .friendslist .friendhead {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info{
  width: 40%;
  background-color: #3fb27f;
  border-radius: 5px;
  padding: 15px;
  color:white;
}
section.dexie-page{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form{
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
}
.input-group{
  width: 40%;
  display: flex;
  gap: 5px;
}

.input-group label{
  font-size: 20px;
}
.input-group input{
  width: 70%;
  padding: 5px;
  border-radius: 5px;
  border: 2px #111 solid
}

#del{
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 25px;
  aspect-ratio: 1;
  cursor: pointer;
  border: none;
}
#send{
  padding: 10px 60px;
  border: none;
  background-color: #2c3e50;
  color: white;
}
</style>
