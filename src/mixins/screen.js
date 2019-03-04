export default {
  computed: {
    isTablet () {
      return window.innerWidth < 991 && window.innerWidth >= 767
    },
    isDesktop () {
      return window.innerWidth >= 991
    },
    isPhone () {
      return window.innerWidth < 767
    },
    isMobile () {
      return this.isPhone || this.isTablet
    }
  }
}
