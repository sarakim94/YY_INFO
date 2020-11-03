<template>
    <div>
        <div class="position-relative">
            <!-- shape Hero -->
            <section class="section section-lg section-shaped overflow-hidden my-0">
                <div class="shape shape-style-1 shape-secondary shape-skew">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="container py-0 pb-lg">
                    <div class="row justify-content-between align-items-center">
                        <div class="col-lg-5 mb-5 mb-lg-0">
                            <h2 class="text-white display-3">Yooyoung System Operation.</h2>
                            
                            <p class="lead text-white mt-4">We run a stable server system for yooyoung pharm. Also develop and maintain ERP, SFA, and MES System.</p>
                        </div>
                        <div class="col-lg-6 mb-lg-auto">
                            <div class="rounded shadow-lg overflow-hidden transform-perspective-right">
                                <b-carousel id="carousel1"
                                            controls
                                            indicators>
                                    <!-- Text slides with image -->
                                    <b-carousel-slide img-src="img/about/yyinfo.jpg"></b-carousel-slide>
                                    <b-carousel-slide img-src="img/about/erp.jpg"></b-carousel-slide>
                                    <b-carousel-slide img-src="img/about/sfa.jpg"></b-carousel-slide>
                                    <b-carousel-slide img-src="img/about/tpms.jpg"></b-carousel-slide>
                                </b-carousel>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <!-- 1st Hero Variation -->
        </div>
        <section class="mt-4 section section-lg">
            <div class="container">
                <div class="row justify-content-center text-center mb-lg">
                    <div class="col-lg-8">
                        <h2 class="display-3">The amazing Team</h2>
                                  <br />
                        <p class="lead text-muted">We are a key IT talent for Yoo Young Pharm.</p>
                                  <br />          <br />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
                        <div class="px-4">
                            <img v-lazy="'img/team'"
                                 class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                 style="width: 200px;">
                            <div class="pt-4 text-center">
                                <h5 class="title">
                                    <span class="d-block mb-1">Lee ChulWoo</span>
                                    <small class="h6 text-muted">System Administrator</small>
                                </h5>
                                <div class="mt-3">
                                    <base-button tag="a" href="javascript:void(0)" type="warning" icon="fa fa-twitter" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="javascript:void(0)" type="warning" icon="fa fa-facebook" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="javascript:void(0)" type="warning" icon="fa fa-dribbble" rounded
                                                 icon-only></base-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
                        <div class="px-4">
                            <img v-lazy="'img/team/'"
                                 class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                 style="width: 200px;">
                            <div class="pt-4 text-center">
                                <h5 class="title">
                                    <span class="d-block mb-1">Choi JungHoon</span>
                                    <small class="h6 text-muted">SFA Administrator</small>
                                </h5>
                                <div class="mt-3">
                                    <base-button tag="a" href="javascript:void(0)" type="primary" icon="fa fa-twitter" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="javascript:void(0)" type="primary" icon="fa fa-facebook" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="javascript:void(0)" type="primary" icon="fa fa-dribbble" rounded
                                                 icon-only></base-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
                        <div class="px-4">
                            <img v-lazy="'img/team/jbs.jpg'"
                                 class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                 style="width: 200px;">
                            <div class="pt-4 text-center">
                                <h5 class="title">
                                    <span class="d-block mb-1">Jeon BeomSu</span>
                                    <small class="h6 text-muted">Software Developer</small>
                                </h5>
                                <div class="mt-3">
                                    <base-button tag="a" href="javascript:void(0)" type="info" icon="fa fa-twitter" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="javascript:void(0)" type="info" icon="fa fa-facebook" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="javascript:void(0)" type="info" icon="fa fa-dribbble" rounded
                                                 icon-only></base-button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3 mb-5 mb-lg-0">
                        <div class="px-4">
                            <img v-lazy="'img/team/'"
                                 class="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                                 style="width: 200px;">
                            <div class="pt-4 text-center">
                                <h5 class="title">
                                    <span class="d-block mb-1">Kim SeiHee</span>
                                    <small class="h6 text-muted">Software Developer</small>
                                </h5>
                                <div class="mt-3">
                                    <base-button tag="a" href="javascript:void(0)" type="success" icon="fa fa-twitter" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="javascript:void(0)" type="success" icon="fa fa-facebook" rounded
                                                 icon-only></base-button>
                                    <base-button tag="a" href="javascript:void(0)" type="success" icon="fa fa-dribbble" rounded
                                                 icon-only></base-button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <br />
        
        <section class="section section-lg">
            <div class="container">
                <div class="row row-grid justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="display-3">Available on these technologies
                            
                        </h2>

                        <br />
                        <br />
                        
                        <div class="text-center">
                            <div class="row justify-content-center">
                                <div class="col-lg-2 col-4">
                                    <a href="https://docs.microsoft.com/en-us/dotnet/csharp/" target="_blank" data-toggle="tooltip"
                                       data-original-title="C# Docs - get started, tutorials, reference. | Microsoft Docs">
                                        <img v-lazy="'img/brand/csharp.jpg'"
                                             class="rounded-circle img-fluid">
                                    </a>
                                </div>
                                <div class="col-lg-2 col-4">
                                    <a href="https://www.embarcadero.com/products/delphi" target="_blank" data-toggle="tooltip"
                                       data-original-title="Delphi: Software Overview - embarcadero">
                                        <img v-lazy="'img/brand/delphi.jpg'"
                                             class="rounded-circle img-fluid opacity-5">
                                    </a>
                                </div>
                                <div class="col-lg-2 col-4">
                                    <a href="https://getbootstrap.com/" target="_blank" data-toggle="tooltip"
                                       data-original-title="Bootstrap - The most popular HTML, CSS, and JS library ...">
                                        <img v-lazy="'img/brand/bootstrap.jpg'"
                                             class="rounded-circle img-fluid  opacity-5">
                                    </a>
                                </div>
                                <div class="col-lg-2 col-4">
                                    <a href="https://vuejs.org/" target="_blank" data-toggle="tooltip"
                                       data-original-title="Vue.js - The progressive javascript framework">
                                        <img v-lazy="'img/brand/vue.jpg'"
                                             class="rounded-circle img-fluid">
                                    </a>
                                </div>
                                <div class="col-lg-2 col-4">
                                    <a href="https://www.oracle.com/database/technologies/" target="_blank" data-toggle="tooltip"
                                       data-original-title="Database Technologies - Oracle Database">
                                        <img v-lazy="'img/brand/oracle.jpg'"
                                             class="rounded-circle img-fluid opacity-5">
                                    </a>
                                </div>
                                <div class="col-lg-2 col-4">
                                    <a href="https://docs.microsoft.com/ko-kr/sql/sql-server" target="_blank" data-toggle="tooltip"
                                       data-original-title="SQL Server 기술 설명서 - SQL Server | Microsoft Docs">
                                        <img v-lazy="'img/brand/mssql.jpg'"
                                             class="rounded-circle img-fluid opacity-5">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
//import { BCarousel } from 'bootstrap-vue/esm/components/carousel/carousel';
//import { BCarouselSlide } from 'bootstrap-vue/esm/components/carousel/carousel-slide';
import swal from 'sweetalert2';

export default {
    layout: 'DashboardLayout',
    components: {
  //      BCarousel,
  //      BCarouselSlide
    },
    mounted () {
        
    },
    created(){
        this.$store.commit('SET_TITLE', 'MAIN');
    }
};
</script>

