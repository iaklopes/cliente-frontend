<template>
  <div class="container">
        <div class="card">
            <div class="card-header">
                <h3>Login</h3>
            </div>
            <div class="card-body">
                <form v-on:submit.prevent>
                    <div class="form-group">
                        <label>Usuario:</label>
                        <input type="text" class="form-control" v-model="auth.user"/>
                        <span></span>
                    </div>
                    <div class="form-group">
                        <label>Senha:</label>
                        <input type="password" class="form-control" v-model="auth.password"/>
                    </div>                    
                    <div class="form-group center">
                        <center>                            
                            <input type="submit" class="btn btn-success" value="Acessar" @click="authClient"/>
                        </center>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import auth from '../store/LocalStorage'
export default{ 
        data(){
            return{
                auth:{
                    user: "",
                    password: ""
                }
            }
        },
        methods: {
            authClient()
            {
                if(this.auth.user == "admin" && this.auth.password == 123456){
                    auth.user = this.auth.user
                    auth.perfil = "ADM"

                    this.$router.push({name: 'Index'});
                }else if (this.auth.user == "comum" && this.auth.password == 123456) {
                    auth.user = this.auth.user
                    auth.perfil = "USER"

                    this.$router.push({name: 'Index'});
                } else {
                    alert("Usuário ou senha incorretos")
                }
            }
        },
    }    
  
</script>
<style>
.form-group{
    margin: 15px;
}
.col{
    margin: 5px;
}
.dirty {
  border-color: #5A5;
  background: #EFE;
}

.dirty:focus {
  outline-color: #8E8;
}

.error {
  border-color: red;
  background: #FDD;
}

.error:focus {
  outline-color: #F99;
}
</style>