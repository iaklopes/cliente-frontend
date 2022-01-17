<template>
    <div>
        <h3>Usuário logado: {{this.auth.user}}</h3>
        <router-link :to="{name: 'Create'}" class="btn btn-primary" v-if="auth.perfil == 'ADM'">Adicionar</router-link>
        <router-link :to="{name: 'Login'}" class="btn btn-dark sair">Sair</router-link>
        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Nome</td>
                <td>CPF</td>
                <td>Endereço</td>
                <td>Telefone</td>
                <td>Email</td>
                <td>Actions</td>
            </tr>
            </thead>

            <tbody>
                <tr v-for="cliente in clientes" :key="cliente.idCliente">
                    <td>{{ cliente.idCliente }}</td>
                    <td>{{ cliente.nome }}</td>
                    <td>{{ cliente.cpf }}</td>
                    <td>{{ cliente.endereco.cidade}}-{{cliente.endereco.uf}}</td>
                    <td>
                        <ul>
                            <li v-for="telefone in cliente.telefoneList" :key="telefone.idTelefone">{{telefone.nrTelefone}}</li>
                        </ul>
                    </td>
                    <td>
                        <ul>
                            <li v-for="email in cliente.emailList" :key="email.idEmail">{{email.email}}</li>
                        </ul>                       
                    </td>

                    
                    <td v-if="auth.perfil == 'ADM'"><router-link :to="{name: 'Edit', params: { id: cliente.idCliente }}" class="btn btn-primary">Atualizar</router-link></td>
                    <td v-if="auth.perfil == 'ADM'"><button class="btn btn-danger" @click="deletarCliente(cliente.idCliente)">Apagar</button></td>
                    <td v-if="auth.perfil == 'USER'"><button class="btn btn-secondary" @click="semAcesso()">Atualizar</button></td>
                    <td v-if="auth.perfil == 'USER'"><button class="btn btn-secondary" @click="semAcesso()">Apagar</button></td>
                    
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import auth from '../store/LocalStorage';

    export default {
        data(){
            return{
                clientes: {
                    idCliente:  "",
                    nome: "",
                    cpf: "",
                    endereco: {
                        logradouro: "",
                        bairro: "", 
                        cidade: "", 
                        uf: "", 
                        cep: "", 
                        complemento: ""                         
                    },
                    telefoneList: null,
                    emailList: null
                },
                telefoneProps: [],
                auth:{

                }
            }
        },

        created: function()
        {
            this.buscarCLientes();
            this.auth = auth            
        },

        methods: {
            semAcesso()
            {
                alert("Você não tem acesso a esse recurso")
            },            
            buscarCLientes()
            {
              let uri = 'http://localhost:8080/clientes';
              this.axios.get(uri).then((response) => {
                  this.clientes = response.data;
              });
            },
            deletarCliente(id)
            {
                if(auth.perfil == 'ADM'){
                   let uri = 'http://localhost:8080/cliente/' + id;
                this.axios.delete(uri).then((response) =>{
                    
                    this.buscarCLientes(); 
                    console.log(response)  
                    alert("Cliente apagado com sucesso.")                 
                }) 
                }else{
                    alert("Você não tem acesso a esse recurso")
                }
                
            }
        }
    }
</script>
<style>
.btn.btn-dark.sair{
margin-left: 85%;
}
</style>