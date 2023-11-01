document.addEventListener("alpine:init", () => {
  Alpine.data("slider", (obj) => ({
    slider: null,
    itemsAll: [],
    items: [],
    step: 0,
    offset: 0,
    viewporWidth: null,
    itemShow: 1,
    len: 0,
    lock: false,
    autoSlide: obj.autoSlide,
    sliderNav: null,
    
    init() {
      this.viewport = this.$refs.viewport;
      if(obj.itemShow){
        this.itemShow = obj.itemShow
      }
      this.viewporWidth = this.viewport.offsetWidth;
      this.slider = this.$refs.slider;
      this.itemsAll = this.viewport.querySelectorAll(".item");
      this.len = this.itemsAll.length;
      this.widthslde = this.viewport.clientWidth;
      // this.sliderNav = this.$refs.slider_nav;
      if(this.$refs.nav){
      this.sliderNav = this.$refs.nav;
      console.log(this.itemShow)
      }
      this.slider.style.left = '-'+2*this.widthslde+'px';
      this.itemsAll.forEach(each=>{each.style.width=this.widthslde/this.itemShow+"px";});

      for (let i = 0; i < this.len; ++i) {
          this.items[i] = this.itemsAll[i];
          this.items[i].remove();
      };
      for (let i = 0; i < 5; i++) {
        this.drow('start');
        this.offset = i+1;
      }
      if (this.autoSlide){
      setInterval(() => {
        this.next()
        }, this.autoSlide);
      }
    },
    next() {
      if(!this.lock){
      this.lock = true;
      let slide2 = this.viewport.querySelectorAll(".slide");
      for (let i = 0; i < this.offset; i++) {
          slide2[i].style.left = i * this.widthslde - this.widthslde + "px"
          slide2[i].style.transition = "3s"
      }
      setTimeout(() => {
        slide2[0].remove();
        this.drow('next');
        this.lock = false;
        }, 3000);
      }
    },
    prev() {
      if(!this.lock){
      this.lock = true;
      let slide2 = this.viewport.querySelectorAll(".slide");

      for (let i = this.offset-1; i > -1; i--) {
          slide2[i].style.left = i * this.widthslde + this.widthslde + "px"
          slide2[i].style.transition = "3s"
      }
      setTimeout(() => {
        slide2[this.offset-1].remove();
        this.drow('prev');
        this.lock = false;
        }, 3000);
      }
    },
    drow(direction) {
      let slide = document.createElement("div");
      slide.classList.add("slide", "border-box", "h-full", "flex", "absolute");
      if (direction == 'start') {
        slide.style.left = this.offset * this.widthslde + "px";
      }
      else if (direction == 'next') {
        slide.style.left = (this.offset-1) * this.widthslde + "px";
      }
      else if (direction == 'prev') {
        slide.style.left = '0px';
      }
      for (let i = 0; i < this.itemShow; i++) {
        if (direction == 'start' || direction == 'next') {
          slide.append(this.items[this.step].cloneNode(true));
          if (this.step + 1 == this.len) {
              this.step = 0;
          } else {
              this.step++
          }
          this.slider.append(slide);
        }
        else if (direction == 'prev') {
          if (this.step == 0) {
              this.step = 9;
          } else {
              this.step--
          }
          slide.append(this.items[this.step].cloneNode(true));
          this.slider.prepend(slide);
        }
      }
      
    },
  }))
  });