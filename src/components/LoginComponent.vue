<template>
    <div class="q-pa-md" style="max-width: 400px">

      <h2 class="text-center">{{ title }}</h2>

      <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="column items-center q-gutter-md"
      >
      <q-input
        type="text"
        v-model="userName"
        filled
        label="Usuario"
        :rules="[val => !!val || 'Campo requerido']"
      />
      <q-input
        v-model="userPassword"
        filled
        label="Contraseña"
        :type="isPwd ? 'password' : 'text'"
        :rules="[val => !!val || 'Campo requerido']"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn label="Login" type="submit" color="primary"/>
        <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
      </div>

    </q-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useApiStore } from 'stores/api-store';

const store = useApiStore();
const $q = useQuasar();
const localStorage:(string | null) = $q.localStorage.getItem('user');

const isPwd = ref(false);
const userName = ref(localStorage);
const userPassword = ref('');

const onSubmit = () => {
  store.login(userName.value, userPassword.value);
};

const onReset = () => {
  userName.value = '';
  userPassword.value = '';
};

interface Props {
  title: string;
}

withDefaults(defineProps<Props>(), {
  title: () => 'Login',
});

</script>
