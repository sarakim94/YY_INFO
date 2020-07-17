<template>
  <div class="content">
    <base-header class="pb-6">
      <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
          <h6 class="h2 text-white d-inline-block mb-0">메뉴 마스터 관리</h6>
        </div>
        <div class="col-lg-6 col-5 text-right">
          <base-button size="sm" type="neutral" @click.prevent="onInsert">등록</base-button>
        <!--Form modal-->
          <modal :show.sync="modal.form">
            <menu-modal :type="modal.type" :modaldata="modaldata"></menu-modal>
          </modal>
        </div>
      </div>
    </base-header>
    <div class="container-fluid mt--6">
      <div>
        <card class="no-border-card" body-classes="px-0 pb-1" footer-classes="pb-2">
          <div>
            <div class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap"
            >
              <el-select
                class="select-primary pagination-select"
                v-model="pagination.perPage"
                placeholder="Per page"
              >
                <el-option
                  class="select-primary"
                  v-for="item in pagination.perPageOptions"
                  :key="item"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>

              <div>
                <base-input v-model="searchQuery"
                            prepend-icon="fas fa-search"
                            placeholder="Name Search...">
                </base-input>
              </div>
            </div>
            
            <el-table :data="queriedData"
                      row-key="id"
                      header-row-class-name="thead-light"
                      @sort-change="sortChange"
                      @selection-change="selectionChange">
              <el-table-column label="ID"
                  prop="id"
                  min-width="40px"
                  sortable>
              </el-table-column>
              <el-table-column label="LV"
                  prop="lv"
                  min-width="30px">
              </el-table-column>
              <el-table-column label="NAME"
                  prop="name"
                  min-width="50px"
                  sortable>
              </el-table-column>
              <el-table-column label="PATH"
                  prop="path"
                  min-width="80px"
                  sortable>
              </el-table-column>
              <el-table-column label="ICON"
                  prop="icon"
                  min-width="100px">
              </el-table-column>
              <el-table-column label="ICON IMAGE"
                              min-width="100px"
                              prop="icon">
                  <template v-slot="{row}">
                    <div class="media-body">
                      <i :class=row.icon></i>
                    </div>
                  </template>
              </el-table-column>
              <el-table-column label="P_ID"
                  prop="p_id"
                  min-width="50px">
              </el-table-column>
              <el-table-column min-width="80px" align="center">
                <div slot-scope="{row}" class="table-actions">
                  <el-tooltip content="Edit" placement="top">
                    <a href="#!" @click.prevent="onEdit(row)" class="table-action" data-toggle="tooltip" data-original-title="Edit product">
                      <i class="fas fa-user-edit"></i>
                    </a>
                  </el-tooltip>
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
    </div></div
></template>
<script>
import { Table, TableColumn, Select, Option } from 'element-ui';
import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb'
import { BasePagination } from '@/components/argon-core';
import clientPaginationMixin from '~/components/tables/PaginatedTables/clientPaginationMixin'
import swal from 'sweetalert2';
import menues from '~/components/tables/menues';
import MenuModal from '@/pages/settings/menu/menu_master_i';
import Fuse from 'fuse.js';

export default {
  mixins: [clientPaginationMixin],
  layout: 'SettingsLayout',
  components: {
    BasePagination,
    RouteBreadCrumb,
    MenuModal,
    [Select.name]: Select,
    [Option.name]: Option,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn
  },
  data() {
    return {
      MenuData: [],
      modal: {
        type: '',
        form: false
      },
      modaldata: {
        id: '',
        lv: '',
        name: '',
        path: '',
        icon: '',
        p_id: '',
      },
      menues,
      propsToSearch: ['name'],
      tableData: [],
      selectedRows: []
    };
  },
  methods: {
    onInsert(){

      this.modal.type = 'insert'

      this.modaldata.id = ''
      this.modaldata.lv = '0'
      this.modaldata.name = ''
      this.modaldata.path = ''
      this.modaldata.icon = ''
      this.modaldata.p_id = ''

      this.modal.form = true
    },
    onEdit(row) {
      this.modal.type = 'update'

      this.modaldata.id = `${row.id}`
      this.modaldata.lv = `${row.lv}`
      this.modaldata.name = `${row.name}`
      this.modaldata.path = `${row.path}`
      this.modaldata.icon = `${row.icon}`
      this.modaldata.p_id = `${row.p_id}`

      this.modal.form = true
    },
    onDelete(row) {
      swal.fire({
            title: `Warning`,
            text: `[${row.name}] 메뉴를 삭제하시겠습니까?`,
            buttonsStyling: false,
            confirmButtonClass: 'btn btn-warning',
            type: 'warning'
      }).then(result => {
        if(result.value === true){
          this.$axios.post('/a_delmenu',{
            id: row.id
          })

          let indexToDelete = this.tableData.findIndex(
            tableRow => tableRow.id === row.id
          );
          if (indexToDelete >= 0) {
            this.tableData.splice(indexToDelete, 1);
          }
        }
      });
    },

    selectionChange(selectedRows) {
      this.selectedRows = selectedRows
    },
    
    async getMenuData() {
      try {
        const response = await this.$axios.get('/a_selmenu');
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async UpdateData(type, m_data){
      this.modal.form = false;

      this.MenuData = await this.getMenuData();
      this.tableData = this.MenuData;
      this.fuseSearch = new Fuse(this.tableData, {
        keys: ['name'],
        threshold: 0.3
      });

    }
  },
  async created () {
    this.$nuxt.$on('update-menu', (type, m_data) => {
      this.UpdateData(type, m_data);  
    })

    this.MenuData = await this.getMenuData();
    this.tableData = this.MenuData;
    this.fuseSearch = new Fuse(this.tableData, {
      keys: ['name'],
      threshold: 0.3
    });
    this.$store.commit('SET_TITLE', '메뉴관리');
  }
};
</script>
<style>
  .no-border-card .card-footer{
    border-top: 0;
  }
</style>
