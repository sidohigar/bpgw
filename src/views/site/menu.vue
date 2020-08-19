<template>
  <div>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="title">
          BLUEPORT
        </v-list-item-title>
        <v-list-item-subtitle>
          groupware v0.1
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn @click="$store.commit('setEdit', !$store.state.editable)" icon>
          <v-icon v-text="$store.state.editable ? 'mdi-eye' : 'mdi-pencil'"></v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-list nav>
      <v-list-group
        v-for="(item, idx) in items"
        :key="idx"
        v-model="item.active"
        :prepend-icon="item.icon"
        :no-action="!$store.state.editable"
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>
              {{item.title}}
              <span v-if="$store.state.editable">
                <v-btn @click="openDialogItem(idx)" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="moveItem(items, idx, -1)" v-if="idx > 0"><v-icon>mdi-chevron-double-up</v-icon></v-btn>
                <v-btn icon @click="moveItem(items, idx, 1)" v-if="idx < items.length - 1"><v-icon>mdi-chevron-double-down</v-icon></v-btn>
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="(subItem, idx2) in item.subItems"
          :key="idx2"
          :to="$store.state.editable ? null : subItem.to"
        >
          <v-list-item-content>
            <v-list-item-title :class="$store.state.editable ? 'pl-4' : ''">
              {{subItem.title}}
              <span v-if="$store.state.editable">
                <v-btn @click="openDialogSubItem(idx, idx2)" icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon @click="moveItem(item.subItems, idx2, -1)" v-if="idx2 > 0"><v-icon>mdi-chevron-double-up</v-icon></v-btn>
                <v-btn icon @click="moveItem(item.subItems, idx2, 1)" v-if="idx2 < item.subItems.length - 1"><v-icon>mdi-chevron-double-down</v-icon></v-btn>
              </span>
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action v-if="$store.state.editable">
            <v-btn icon :to="subItem.to" exact><v-icon>mdi-arrow-right-bold-circle-outline</v-icon></v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-list-item  @click="openDialogSubItem(idx, -1)" v-if="$store.state.editable">
          <v-list-item-icon :class="$store.state.editable ? 'pl-4':''">
            <v-icon>mdi-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>추가하기</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item @click="openDialogItem(-1)" v-if="$store.state.editable">
        <v-list-item-icon><v-icon>mdi-plus</v-icon></v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>추가하기</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-dialog v-model="dialogItem" max-width="400">
      <v-card>
        <v-card-title>
          메인 메뉴 수정
          <v-spacer></v-spacer>
          <v-btn icon @click="saveItem" color="success"><v-icon>mdi-content-save</v-icon></v-btn>
          <v-btn icon @click="dialogItem=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="2">
              <v-icon v-text="formItem.icon" required></v-icon>
            </v-col>
            <v-col cols="10">
              <v-text-field
                v-model="formItem.icon"
                label="mdi icon"
                outlined
                clearable
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-text-field v-model="formItem.title" label="메뉴 이름" outlined hide-details></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogSubItem" max-width="400">
      <v-card>
        <v-card-title>
          서브 메뉴 수정
          <v-spacer></v-spacer>
          <v-btn icon @click="saveSubItem" color="success"><v-icon>mdi-content-save</v-icon></v-btn>
          <v-btn icon @click="dialogSubItem=false"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-title>
        <v-card-text>
          <v-text-field v-model="formSubItem.title" label="메뉴 이름" outlined required></v-text-field>
          <v-text-field v-model="formSubItem.to" label="경로" outlined required></v-text-field>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ['items'],
  data () {
    return {
      loading: false,
      dialogItem: false,
      dialogSubItem: false,
      selectedItemIndex: -1,
      selectedSubItemIndex: -1,
      formItem: {
        title: '',
        icon: 'mdi-crosshairs-question'
      },
      formSubItem: {
        title: '',
        to: ''
      }
    }
  },
  methods: {
    openDialogItem (index) {
      this.selectedItemIndex = index
      if (index < 0) {
        this.formItem.icon = 'mdi-crosshairs-question'
        this.formItem.title = ''
      } else {
        this.formItem = this.items[index]
        // this.formItem.icon = this.items[index].icon
        // this.formItem.title = this.items[index].title
      }
      this.dialogItem = true
    },
    async saveItem () {
      if (this.selectedItemIndex < 0) {
        this.items.push(this.formItem)
      } else {
        this.items[this.selectedItemIndex] = this.formItem
      }
      this.save()
    },
    openDialogSubItem (index, subIndex) {
      this.selectedItemIndex = index
      this.selectedSubItemIndex = subIndex
      if (subIndex < 0) {
        this.formSubItem.title = ''
        this.formSubItem.to = ''
      } else {
        this.formSubItem = this.items[index].subItems[subIndex]
      }
      this.dialogSubItem = true
    },
    async saveSubItem () {
      if (this.selectedSubItemIndex < 0) {
        if (!this.items[this.selectedItemIndex].subItems) { this.items[this.selectedItemIndex].subItems = [] }
        this.items[this.selectedItemIndex].subItems.push(this.formSubItem)
      } else {
        this.items[this.selectedItemIndex].subItems[this.selectedSubItemIndex] = this.formSubItem
      }
      this.save()
    },
    async save () {
      try {
        this.loading = true
        await this.$firebase.database().ref().child('site').child('menu').set(this.items)
      } finally {
        this.dialogItem = false
        this.dialogSubItem = false
        this.loading = false
        this.formItem = {
          title: '',
          icon: 'mdi-crosshairs-question'
        }
        this.formSubItem = {
          title: '',
          to: ''
        }
      }
    },
    moveItem (items, i, arrow) {
      // const item = items.splice(i, 1)[0]
      // items.splice(i + arrow, 0, item)
      items.splice(i + arrow, 0, ...items.splice(i, 1))
      this.save()
    }
  }
}
</script>
