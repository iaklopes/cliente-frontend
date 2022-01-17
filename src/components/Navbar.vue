<template>
    <b-navbar class="navbar navbar-expand-sm bg-light">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'Index' }" class="nav-link">Listar Clientes</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'Login' }" class="nav-link">Sair</router-link>
        </li>
      </ul>
    </b-navbar>
</template>