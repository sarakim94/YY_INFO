<template>
  <footer class="footer px-4 mx-2">
    <div class="row align-items-center justify-content-lg-between">
      <div class="col-lg-6">
        <div class="copyright text-center text-lg-left text-muted">
          <router-link class="nav-link nav-link-icon" to="/About">
            © {{year}} <span class="nav-link-inner--text">Yooyoung IT Team.</span>
          </router-link>
        </div>
      </div>
      <div class="col-lg-6">
        <ul class="nav nav-footer justify-content-center justify-content-lg-end">
          <li class="nav-item">
            <a href="http://gw.yypharm.co.kr" class="nav-link" target="_blank">GW</a>
          </li>
          <li class="nav-item">
            <a href="http://sfa.yypharm.co.kr" class="nav-link" target="_blank">SFA</a>
          </li>
          <li class="nav-item">
            <a href="http://mos.yypharm.co.kr" class="nav-link" target="_blank">MOS</a>
          </li>
          <li class="nav-item">
            <a href="http://cbolt.yypharm.co.kr" class="nav-link" target="_blank">C.Bolt</a>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style></style>
