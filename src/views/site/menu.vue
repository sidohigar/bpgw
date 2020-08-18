<template>
  <div>
    <v-list>
      <v-list-group
        v-for="(item, idx) in items"
        :key="idx"
        v-model="item.active"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="subItem in item.subItems"
          :key="subItem.title"
          :to="subItem.to"
        >
          <v-list-item-content>
            <v-list-item-title v-text="subItem.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'mdi-home',
          subItems: [
            {
              title: 'Dashboard',
              to: '/'
            },
            {
              title: 'About',
              to: '/about'
            }
          ]
        },
        {
          title: 'Clone',
          active: true,
          icon: 'mdi-account',
          subItems: [
            {
              title: 'Dashboard2',
              to: '/'
            },
            {
              title: 'About2',
              to: '/about'
            }
          ]
        }
      ]
    }
  }
}
</script>
