<template>
  <v-toolbar-title>
    {{title}}
    <v-btn icon @click="openDialog" v-if="$store.state.editable">
      <v-icon>mdi-grease-pencil</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="400">
      <v-card>
        <v-card-title>
          제목 수정
          <v-spacer></v-spacer>
          <v-btn icon @click="save"><v-icon>mdi-content-save</v-icon></v-btn>
          <v-btn icon @click="dialog=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="text" outlined label="제목" @keypress.enter="save" hide-details/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-toolbar-title>
</template>

<script>
export default {
  props: ['title'],
  data () {
    return {
      dialog: false,
      text: this.title
    }
  },
  mounted () {
    // console.log(this.title)
    // console.log(this.text)
  },
  methods: {
    openDialog () {
      this.dialog = true
    },
    async save () {
      try {
        await this.$firebase.database().ref().child('site').update({ title: this.text })
        // throw new Error('예외 테스트 (강제 예외 발생!)')
      } finally {
        this.dialog = false
      }
    }
  }
}
</script>
