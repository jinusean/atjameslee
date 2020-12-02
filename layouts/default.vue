<template>
  <div class="flex flex-col w-full min-h-screen">
    <div class="flex-grow-0 z-10">
      <jcl-navbar />
    </div>
    <div class="mt-16 flex flex-grow flex-col">
      <div class="flex-grow flex items-stretch">
        <nuxt />
      </div>
      <jcl-footer />
    </div>
  </div>
</template>

<script>
import JclNavbar from '@/components/layout/JclNavbar'
import JclFooter from '@/components/layout/JclFooter'

export default {
  components: { JclNavbar, JclFooter },
}
</script>
<style scoped>
.asdf {
  align-content: center;
  justify-content: center;
  align-items: center;
}

/*.jcl-layout {*/
/*  @include layout-size();*/

/*  display: grid;*/
/*  flex: 1;*/
/*  grid-template-areas:*/
/*    'navbar'*/
/*    'main';*/
/*  grid-template-rows: auto 1fr;*/
/*  grid-template-columns: 1fr;*/

/*  .navbar {*/
/*    grid-area: navbar;*/
/*  }*/

/*  .main {*/
/*    grid-area: main;*/
/*    width: 100%;*/

/*    h1 {*/
/*      text-transform: uppercase;*/
/*    }*/
/*  }*/
/*}*/

/*@include media-breakpoint-down(sm) {*/
/*  .jcl-layout {*/
/*    grid-template-areas:*/
/*      'navbar'*/
/*      'main';*/
/*    grid-template-columns: 100%;*/

/*    !* display: block; *!*/
/*    overflow: hidden;*/
/*  }*/
/*}*/
</style>
