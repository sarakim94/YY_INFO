<template>
  <div class="card">
    <div class="card-header border-0">
      <div class="row">
<!--      
        <div class="col-6">
          <h3 class="mb-0">Sales Table</h3>
        </div>
-->
        <div class="col-6 text-right">
<!--          <el-tooltip content="Delete" placement="top">
            <base-button type="danger" icon size="sm">
              <span class="btn-inner--icon"><i class="fas fa-trash"></i></span>
              <span class="btn-inner--text">Delete</span>
            </base-button>
          </el-tooltip>
-->
        </div>
      </div>
    </div>

    <el-table class="table-responsive table-flush"
              header-row-class-name="thead-light"
              row-key="id"
              :data="tdata"
              :row-class-name="rowClassName"
              @selection-change="onSelectionChange">

      <el-table-column label="MONTH"
                       width="200px"
                       min-width="100px"
                       prop="name"
                       >
        <template v-slot="{row}">
          <div class="table-user">
            <b>{{row.name}}</b>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="GOAL"
                       width="300px"
                       min-width="200px"
                       prop="goal"
                       sortable>
        <template v-slot="{row}">
          <div class="table-user">
            <b>{{row.goal | currency}}</b>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="SALES"
                       width="300px"
                       min-width="200px"
                       prop="sales"
                       sortable>
        <template v-slot="{row}">
          <div class="table-user">
            <b>{{row.sales | currency}}</b>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="COMPLETION"
                       min-width="300px"
                       prop="completion"
                       sortable>
        <template v-slot="{row}">
          <div class="d-flex align-items-center">
              <div>
                  <base-progress :type="row.statusType" :value="row.completion"/>
              </div>
              <span class="completion ml-3">{{row.completion | fixed}}%</span>
          </div>
        </template>
        
      </el-table-column>

      <el-table-column label="STATUS"
                       width="300px"
                       min-width="100px"
                       prop="status"
                       sortable>
        <template v-slot="{row}">
          <div class="table-user">
            <badge class="badge-dot mr-4" :type="row.statusType">
              <i :class="`bg-${row.statusType}`"></i>
              <span class="status">{{row.status}}</span>
            </badge>
          </div>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>
<script>
  import { Table, TableColumn, DropdownMenu, DropdownItem, Dropdown, Tooltip } from 'element-ui'

  export default {
    name: 'inline-actions-table',
    props: [
      'tdata'
    ],
    components: {
      [Tooltip.name]: Tooltip,
      [Table.name]: Table,
      [TableColumn.name]: TableColumn,
      [Dropdown.name]: Dropdown,
      [DropdownItem.name]: DropdownItem,
      [DropdownMenu.name]: DropdownMenu,
    },
    data() {
      return {
        currentPage: 1,
        selectedRows: []
      };
    },
    methods: {
      onEdit(row) {
        alert(`You want to edit ${row.name}`)
      },
      onDelete(row) {
        alert(`You want to delete ${row.name}`)
      },
      onSelectionChange(selectedRows) {
        this.selectedRows = selectedRows
      },
      rowClassName({ rowIndex }) {
        if (rowIndex === 2) {
          return 'table-success'
        }
        return ''
      }
    },
    filters: {
      currency: function (value) {
        parseFloat(value)
        var num = new Number(value)
        return num.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      fixed: function (value) {
        parseFloat(value)
        var num = new Number(value)
        return parseFloat(num.toFixed(2))
      },
    }
  }
</script>
