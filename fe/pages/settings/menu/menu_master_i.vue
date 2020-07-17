<template>
  <card>
    <!-- Card header -->
    <h3 v-if="type === 'insert'" slot="header" class="mb-0">메뉴 마스터 입력</h3>
    <h3 v-if="type === 'update'" slot="header" class="mb-0">메뉴 마스터 수정</h3>

    <!-- Card body -->
    <form class="needs-validation"
          @submit.prevent="submit">
      <div class="form-row">
        <div class="col-md-4">
          <base-input label="ID"
                      name="ID"
                      placeholder="ID"
                      required
                      v-model="modaldata.id">
          </base-input>
        </div>
        <div class="col-md-4">
          <base-input label="LV"
                      name="LV">
            <select class="form-control" v-model="modaldata.lv">
              <option>0</option>
              <option>1</option>
            </select>
          </base-input>
        </div>
        <div v-if="modaldata.lv === '0'" class="col-md-4" >
          <base-input label="P_ID"
                      name="P_ID"
                      placeholder=""
                      v-model="modaldata.p_id=''"
                      disabled=""
                      >
          </base-input>
        </div>
        <div v-if="modaldata.lv === '1'" class="col-md-4">
          <base-input label="P_ID"
                      name="P_ID"
                      placeholder="PARENT ID."
                      required
                      v-model="modaldata.p_id">
          </base-input>
        </div>
      </div>
      <div class="form-row">
        <div class="col-md-12">
          <base-input label="NAME"
                      name="NAME"
                      placeholder="Input the menu name."
                      required
                      v-model="modaldata.name">
          </base-input>
        </div>
      </div>
      <div class="form-row">
        <div v-if="modaldata.lv === '0'" class="col-md-12">
          <base-input label="PATH"
                    name="PATH"
                    placeholder=""
                    disabled=""
                    v-model="modaldata.path=''">
          </base-input>
        </div>
        <div v-if="modaldata.lv === '1'" class="col-md-12">
          <base-input label="PATH"
                      name="PATH"
                      placeholder="Input the vue file path."
                      required
                      v-model="modaldata.path">
          </base-input>
        </div>
      </div>
      
      <div class="form-row">
        <div v-if="modaldata.lv === '0'" class="col-md-12">
          <base-input label="ICON"
                      name="ICON"
                      placeholder="Input the menu icon string."
                      v-model="modaldata.icon">
          </base-input>
        </div>
        <div v-if="modaldata.lv === '1'" class="col-md-12">
          <base-input label="ICON"
                      name="ICON"
                      placeholder=""
                      v-model="modaldata.icon=''"
                      disabled="">

          </base-input>
        </div>
      </div>
      
      <base-button type="primary" native-type="submit">Submit form</base-button>
    </form>
  </card>
</template>



<script>
import icons from '~/components/icon';
import swal from 'sweetalert2';

  export default {
    components: {
    },
    props: {
      type: '',  
      modaldata: {
        id: '',
        lv: '',
        name: '',
        path: '',
        icon: '',
        p_id: '',
      },
    },
    data() {
      return {
        icons,
      }
    },
    methods: {
      async submit() {
        try {
          if(this.type === 'insert'){
            this.$axios.post('/a_inmenu',{
              id: this.modaldata.id,
              lv: this.modaldata.lv,
              name: this.modaldata.name,
              path: this.modaldata.path,
              icon: this.modaldata.icon,
              p_id: this.modaldata.p_id
            })
          }
          else if(this.type === 'update'){
            this.$axios.post('/a_upmenu',{
              id: this.modaldata.id,
              lv: this.modaldata.lv,
              name: this.modaldata.name,
              path: this.modaldata.path,
              icon: this.modaldata.icon,
              p_id: this.modaldata.p_id
            })
          }
          else{
            alert('이상한 경로입니다.')
          }

          this.$notify({
            message:
              '<b>저장이 완료되었습니다.</b>',
            timeout: 5000,
            icon: 'ni ni-bell-55',
            type: 'info'
          })

          $nuxt.$emit('update-menu', this.type, this.modaldata)
        }
        catch (error) {
          swal.fire({
          title: `Warning`,
          text: '저장 또는 수정이 실패하였습니다.',
          buttonsStyling: false,
          confirmButtonClass: 'btn btn-warning',
          type: 'warning'
          })  
        }
      }
    }
  }
</script>
<style>
</style>
