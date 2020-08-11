<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">사용자 권한 관리</h6>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div class="row" >
          <div class="col-xl-6 col-md-6">
            <card style="min-height:850px;">
              <template slot="header">
                <!-- Title -->
                <h5 class="h3 mb-0">메뉴 리스트</h5>
              </template>
              <menutree :data="menudata" show-checkbox multiple allow-batch whole-row @item-click="itemClick" v-model="value"></menutree>
            </card>
          </div>
          <div class="col-xl-6 col-md-6" >
            <card style="min-height:850px;">
              <template slot="header">
                <!-- Title -->
                <div class="row">
                  <div class="col-xl-10 col-md-8">
                    <h5 class="h3 mb-0">《 {{this.selectedMenu.name}} 》 권한 리스트</h5>
                  </div>
                  <div class="col-xl-2 col-md-4 text-right">
                    <base-button size="sm" type="neutral" @click.prevent="onInsert">등록</base-button>
                  </div>
                </div>
              </template>
              <treeselect
                :multiple="true"
                :options="options"
                :disable-branch-nodes="true"
                v-model="value"
                search-nested
              />
              <div>
                <el-table :data="queriedData"
                            row-key="emp_cd"
                            header-row-class-name="thead-light"
                            @sort-change="sortChange"
                            @selection-change="selectionChange">
                    <el-table-column label="EMP_CD"
                        prop="emp_cd"
                        min-width="100px"
                        sortable>
                    </el-table-column>
                    
                    <el-table-column label="DEPT_NM"
                        prop="dept_nm"
                        min-width="100px"
                        sortable>
                    </el-table-column>

                    <el-table-column label="EMP_NM"
                        prop="emp_nm"
                        min-width=""
                        sortable>
                    </el-table-column>

                    <el-table-column min-width="80px" align="center">
                      <div slot-scope="{row}" class="table-actions">
                        <el-tooltip content="Delete" placement="top">
                          <a href="#!" @click.prevent="onDelete(row)" class="table-action table-action-delete" data-toggle="tooltip"
                            data-original-title="Delete product">
                            <i class="fas fa-trash"></i>
                          </a>
                        </el-tooltip>
                      </div>
                    </el-table-column>
                  </el-table>
                </div>
                <div
                  slot="footer"
                  class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
                >
                  <div class="">
                    <p class="card-category">
                      Showing {{ from + 1 }} to {{ to }} of {{ total }} entries

                      <span v-if="selectedRows.length">
                        &nbsp; &nbsp; {{selectedRows.length}} rows selected
                      </span>
                    </p>

                  </div>
                  <base-pagination
                    class="pagination-no-border"
                    v-model="pagination.currentPage"
                    :per-page="pagination.perPage"
                    :total="total"
                  >
                  </base-pagination>
                </div>
            </card>
          </div>
      </div>
    </div>
  </div>  
</template>
<script>
import axios from 'axios'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import swal from 'sweetalert2';
import { BasePagination } from '@/components/argon-core';
import { Table, TableColumn, Select, Option } from 'element-ui';
import clientPaginationMixin from '~/components/tables/PaginatedTables/clientPaginationMixin'
import Menutree from 'vue-jstree'

import Fuse from 'fuse.js';


export default {
  mixins: [clientPaginationMixin],
  layout: 'SettingsLayout',
  components: {
    Treeselect,
    BasePagination,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    Menutree,
  },
  async asyncData(){
    axios.defaults.baseURL = 'http://218.38.191.120:8000/api';

    return await axios.get('/getMenutree')
    .then((res) => {
      return { menudata: res.data }
    })
    .catch((error) => {
      console.log(error);
    })
  },
  data() {
    return {
      selectedMenu: { id: "", name: "User", icon: ""},
      value: null,
      options: [],
      selectedRows: [],
      tableData: [],
      menudata: [],
    }
  },
  methods: {
    async getOptions(){
      try {
        const response = await this.$axios.get('/getuserlist');
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getAuthUserData(id) {
      try {
        const response = await this.$axios.get('/a_authuser/' + id);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getMenu() {
      try {
        const response = await this.$axios.get('/getMenutree');
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    selectionChange(selectedRows) {
      this.selectedRows = selectedRows
    },
    onDelete(row) {
      this.$axios.post('/a_delauth',{
        emp_cd: row.emp_cd,
        pgid: this.selectedMenu.id
      })

      let indexToDelete = this.tableData.findIndex(
        tableRow => tableRow.emp_cd === row.emp_cd
      );
      if (indexToDelete >= 0) {
        this.tableData.splice(indexToDelete, 1);
      }
    },
    async onInsert(){
      var len = this.menudata.length;

      if(this.value == null){
        console.log('user no selected');
        return;
      }
      
      for(var i=0; i<len; i++){
        var menu = new Array();
        menu = this.menudata[i].children;

        var len2 = menu.length;
        for(var j=0; j<len2; j++){
          if(menu[j].selected){
            await this.$axios.post('/a_setauth',{
              pgid: menu[j].id,
              users: this.value
            })
          }
        }
      }

      var result = await this.getAuthUserData(this.selectedMenu.id);
      if(result == ''){
        this.tableData = [];
      }
      else{
        this.tableData = result;
      }
      
    },
    async itemClick (node) {
      this.selectedMenu.id = node.model.id;
      this.selectedMenu.name = node.model.text;
      this.selectedMenu.icon = node.model.icon;

      
      var result = await this.getAuthUserData(node.model.id); 
      if(result == ''){
        this.tableData = [];
      }
      else{
        this.tableData = result; 
      }
    }
  },
  async created () {
    this.options = await this.getOptions();

    //this.menudata = await this.getMenu();
  }
};
</script>
