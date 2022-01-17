<template>
  <div class="container">
      <Navbar/>
        <div class="card">
            <div class="card-header">
                <h3>Adicionar cliente</h3>
            </div>
            <div class="card-body">
                <p v-if="erros.length">
                <b>Por favor, corrija o(s) seguinte(s) erro(s):</b>
                <ul>
                    <li v-for="error in erros" :key="error">{{ error }}</li>
                </ul>
                </p>
                <b-form v-on:submit.prevent>
                    <div class="form-group">
                        <label>Nome:</label>
                        <input type="text" class="form-control" v-model="clientes.nome" required/>
                    </div>
                    <div class="form-group">
                        <label>CPF:</label>
                        <input type="text" class="form-control" v-mask="'###.###.###-##'" v-model="clientes.cpf" required/>
                    </div>
                    <!--Inicio endereco -->
                    <div class="form-group">
                        <label>Endereço:</label>
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="CEP" aria-label="CEP" v-mask="'##.###-###'" v-model="clientes.endereco.cep" required @change="buscarCep(clientes.endereco.cep)">
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Logradouro" aria-label="Logradouro" v-model="clientes.endereco.logradouro" required>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Bairro" aria-label="Bairro" v-model="clientes.endereco.bairro" required>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Cidade" aria-label="Cidade" v-model="clientes.endereco.cidade" required>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="UF" aria-label="UF" v-model="clientes.endereco.uf" required>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" placeholder="Complemento" aria-label="Complemento" v-model="clientes.endereco.complemento">
                            </div>
                        </div>
                    </div>
                    <!--Fim endereco -->
                    <div class="form-group">
                        <label>Telefone:</label>
                        <div class="row">
                            <div class="col">
                                <input type="submit" class="btn btn-primary" value="Adicionar" @click="adicionarTelefone()"/> 
                            </div>                          
                        </div>
                        <div class="row" v-for="(telefone, index) in telefoneProps" :key="index">
                            <div class="col">
                                <select class="form-select" aria-label="Tipo telefone" v-model="telefone.tipoTelefone" required>
                                    <option selected>{{telefone.tipoTelefone}}</option>
                                    <option value="Residencial">Residencial</option>
                                    <option value="Comercial">Comercial</option>
                                    <option value="Celular">Celular</option>
                            </select>
                            </div>
                            <div class="col">
                                <input type="text" class="form-control" aria-label="Telefone" v-mask="['(##) ####-####', '(##) #####-####']" v-model="telefone.nrTelefone" required />
                            </div>
                            <div class="col ">                          
                                <input type="submit" class="btn btn-danger" value="X" @click="removerTelefone(index)" />                               
                            </div>                         
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Email:</label>
                        <div class="row">
                            <div class="col">
                                <input type="submit" class="btn btn-primary" value="Adicionar" @click="adicionarEmail()"/> 
                            </div>                          
                        </div>
                        <div class="row" v-for="(email, index) in emailProps" :key="index">
                            <div class="col">
                                <input type="text" class="form-control" aria-label="email" v-model="email.email" required />
                            </div>
                            <div class="col ">                          
                                <input type="submit" class="btn btn-danger" value="X" @click="removerEmail(index)" />                               
                            </div>                         
                        </div>
                    </div>
                    <hr>
                    
                    <div class="form-group center">
                        <input type="submit" class="btn btn-success" value="Adicionar" @click="adicionarCliente"/>
                    </div>
                </b-form>
            </div>
        </div>
    </div>
</template>
<script>
import Navbar from './Navbar.vue'
export default{
        components: {
            Navbar
        },
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
                    telefoneList: {
                        tipoTelefone: "",
                        nrTelefone: ""
                    },
                    emailList: {}
                },
                telefoneProps: [],
                emailProps:[],
                erros: []
            }
        },
        created: function(){
            this.buscarCliente();
        },

        methods: {
            buscarCep(cep)
            {
                let cepSemMascara = cep.replace(/[^\d]+/g, '');
                let uri = 'https://viacep.com.br/ws/'+cepSemMascara+'/json/';
                this.axios.get(uri).
                    then((response => {
                        this.clientes.endereco.logradouro = response.data.logradouro
                        this.clientes.endereco.bairro = response.data.bairro
                        this.clientes.endereco.cidade = response.data.bairro
                        this.clientes.endereco.uf = response.data.uf                        
                    }))
             },
            adicionarEmail()
            {
                this.constroiFormEmail()
            },
            async constroiFormEmail()
            {
                const email = {}
                this.emailProps.push(email)
            },
            removerEmail(idCampo)
            {
                this.emailProps.splice(idCampo, 1)
            },
            adicionarTelefone()
            {
                this.constroiFormTelefone()
            },
            async constroiFormTelefone()
            {
                const telefone = {}
                this.telefoneProps.push(telefone)
            },
            removerTelefone(idCampo) 
            {
                this.telefoneProps.splice(idCampo, 1)
            },
            buscarCliente()
            {
              let uri = 'http://localhost:8080/cliente/' + this.$route.params.id;
                this.axios.get(uri).then((response) => {
                    this.clientes = response.data;
                    this.telefoneProps = this.clientes.telefoneList
                    this.emailProps = this.clientes.emailList
                });
            },
            validaFormulario()
            {
                if(this.name && this.cpf){
                    return true
                }
                this.erros = [];

                if(this.clientes.nome == "" || this.clientes.nome.length < 3){                    
                        this.erros.push("Nome deve ter ao menos 3 caracteres!")
                }
                if(this.clientes.cpf.length < 14){
                    this.erros.push("Digite um CPF válido.")
                }
                if(this.clientes.endereco.cep == "" || this.clientes.endereco.cep.length < 8){
                    this.erros.push("Digite um CEP válido.")
                }
                if(this.clientes.endereco.logradouro == "" || this.clientes.endereco.logradouro.length < 3){
                    this.erros.push("Digite um logradouro válido.")
                }
                if(this.clientes.endereco.bairro == "" || this.clientes.endereco.bairro.length < 3){
                    this.erros.push("Digite um bairro válido.")
                }
                if(this.clientes.endereco.cidade == "" || this.clientes.endereco.cep.length < 3){
                   this.erros.push("Digite um cidade válido.") 
                }
                if(this.clientes.endereco.uf == "" || this.clientes.endereco.cep.length < 2){
                    this.erros.push("Digite um uf válido.")
                }
                if(Object.values(this.clientes.telefoneList).length === 0){
                    this.erros.push("Digite ao menos um telefone")
                }
                if(Object.values(this.clientes.emailList).length === 0){
                    this.erros.push("Digite ao menos um email")
                }
            return true
            },
            adicionarCliente()
            {
              if(this.validaFormulario()){
                  let uri = 'http://localhost:8080/cliente/';
              
              this.clientes.cpf = this.clientes.cpf.replace(/[^\d]+/g, '');
              this.clientes.endereco.cep = parseInt(this.clientes.endereco.cep.replace(/[^\d]+/g, ''));

                this.axios.post(uri, this.clientes).
                    then((response) => {
                        this.$router.push({name: 'Index'});
                        console.log(response)
                        alert("Cliente adicionado com sucesso.")
                    });
              }              
            }
        },
        updated() {
            this.$emit('update:telefoneProps', this.clientes.telefoneList = this.telefoneProps)
            this.$emit('update:telefoneProps', this.clientes.emailList = this.emailProps)
        }
    }    
  
</script>
<style>
.form-group{
    margin: 15px;
}
.col{
    margin: 5px;
}
</style>