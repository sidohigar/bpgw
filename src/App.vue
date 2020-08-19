<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <site-title :title="site.title"></site-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="save">
        <v-icon>mdi-check</v-icon>
      </v-btn>
      <v-btn icon @click="read">
        <v-icon>mdi-read</v-icon>
      </v-btn>
      <v-btn icon @click="readOnce">
        <v-icon>mdi-qqchat</v-icon>
      </v-btn>
      <v-btn icon to="/about">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app v-model="drawer" width="400">
      <site-menu :items="site.menu"></site-menu>
    </v-navigation-drawer>
    <v-main>
      <router-view/>
    </v-main>
    <site-footer :footer="site.footer"></site-footer>
  </v-app>
</template>

<script>
import SiteTitle from '@/views/site/title'
import SiteFooter from '@/views/site/footer'
import SiteMenu from '@/views/site/menu'

export default {
  components: { SiteTitle, SiteFooter, SiteMenu },
  name: 'App',
  data () {
    return {
      drawer: false,
      site: {
        menu: [],
        title: '',
        footer: ''
      }
    }
  },
  created () {
    this.subscribe()
  },
  mounted () {
  },
  methods: {
    subscribe () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {
        const v = sn.val()
        if (!v) {
          this.$firebase.database().ref().child('site').set(this.site)
        } else {
          this.site = v
        }
      }, (e) => {
        console.log(e.message)
      })
    },
    save () {
      this.$firebase.database().ref().child('site').set({
        title: '', footer: '', menu: [{ title: '', icon: '' }]
      })
    },
    read () {
      this.$firebase.database().ref().child('site').on('value', (sn) => {
        // console.log(sn)
        console.log(sn.val())
      })
    },
    async readOnce () {
      const sn = await this.$firebase.database().ref().child('site').once('value')
      console.log(sn.val())
    }
  }
}
</script>
