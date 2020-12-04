<template>
  <div class="flex flex-col justify-center items-center w-screen h-screen">
    <client-only>
      <iframe v-if="pdf" :src="pdf" width="100%" height="100%" />
      <vue-html2pdf
        v-else
        ref="html2Pdf"
        :html-to-pdf-options="options"
        :show-layout="false"
        :float-layout="true"
        :enable-download="false"
        :preview-modal="false"
        :manual-pagination="true"
        @hook:mounted="onLoad"
        @beforeDownload="beforeDownload"
      >
        <section slot="pdf-content" class="bg-white">
          <section class="pdf-item">
            <h4>Title</h4>

            <span> Value </span>
          </section>
        </section>
      </vue-html2pdf>
    </client-only>
  </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf'

export default {
  name: 'ResumePage',
  layout: 'blank',
  components: {
    VueHtml2pdf,
  },
  data() {
    return {
      blob: null,
      pdf: null,
    }
  },
  computed: {
    options() {
      return {
        margin: 1,
        filename: 'james_lee_resume',
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
      }
    },
  },
  methods: {
    async beforeDownload({ html2pdf, options, pdfContent }) {
      const pdf = html2pdf().set(options).from(pdfContent)
      const blobUrl = await pdf.output('bloburl')
      const res = await this.$http.get(blobUrl)
      this.blob = await res.blob()

      const filename = 'james_lee_resume.pdf'

      const file = new File([this.blob], filename, { type: 'application/pdf' })
      console.log(file)
      // this.pdf = file

      // Download file
      const a = document.createElement('a')
      a.download = filename
      a.href = window.URL.createObjectURL(file)
      a.target = '_blank'
      // a.click()
    },
    generatePdf() {
      this.$refs.html2Pdf.generatePdf()
    },
    onLoad() {
      this.$refs.html2Pdf.generatePdf()
    },
  },
}
</script>

<style scoped></style>
