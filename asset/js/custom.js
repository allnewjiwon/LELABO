

$(function(){
  
  // 1. 메뉴 호버 이벤트
  menuMotion1=gsap.timeline({
    paused:true,
  })
  menuMotion1
  .from('.header .nav-contents .wrap-img > *',{delay:0.5,opacity:0,stagger:.1, yPercent:100});


  $('[data-menu]').mouseover(function(){
    
    menuData = $(this).data('menu');
    maxHeight = $(menuData).outerHeight();
    $('.nav-contents .menu').removeClass('show');
    $('.nav-contents').css({'max-height':maxHeight}).find(menuData).addClass('show');

    if(menuData == '#shop'){
      menuMotion1.restart();
    }
   
  })

  $('.header').mouseleave(function(){
    setTimeout(function(){
      $('.nav-contents .menu').removeClass('show');
      $('.nav-contents').css({'max-height':0});
    }, 1000);
    menuMotion1.reverse();
  })



    // 2. gsap load 애니메이션 
  gsap.set('.load .inst .overflow-h span',{yPercent:100})
  gsap.set('.load .load-main > *',{yPercent:530})
  const loadAni = gsap.timeline({
    onComplete:function(){
      $('.load').remove()
    }
  })
  loadAni.addLabel('a')

  loadAni
  .to('.load',{height:0, delay:3.5}, 'a')
  .to('.load .inst .overflow-h span',{yPercent:0, delay: 1.5}, 'a')
  .to('.load .inst .overflow-h span',{yPercent:-100, delay: 2.5}, 'a')
  .to('.load .load-main > *',{
    stagger: .07,
    yPercent:0, 
    delay: .7,
  },'a')
  .to('.load .load-main > *',{
    stagger: .05,
    yPercent: -470,
    delay: 3,
  },'a')
  
  .addLabel('b')
  .from('.sc-visual .scroll-area .thumb-box img',{scale: 1.2},'b-=.4') 
  .from('.sc-visual .pin-area .overflow-h .of-w',{yPercent: 100},'b-=.4') 


  // 3. main-visual 스크롤 스크럽 이펙트

  const mainScrub = document.querySelectorAll('.sc-visual .scrub')
  mainScrub.forEach(element => {
    dataY = element.dataset.y;
    gsap.to(element,{
      scrollTrigger: {
        trigger: '.sc-visual',
        start:"0% 100%", 
        end:"100% 0%",
        scrub:1,
        // duration:3,
        // markers: true,
      },
      yPercent:dataY
    })
  });

  // 3-1) 메인 비주얼 이미지 z-index 변경 애니메이션

  gsap.timeline({
    scrollTrigger: {
      trigger: '.sc-visual',
      start:"0% 0%", 
      end:"100% 0%",
      scrub:1,
      // markers:true,
    },
  })
  .to('.thumb-box.box1',{"z-index":1})
  .to('.thumb-box.box2',{"z-index":2})
  .to('.thumb-box.box3',{"z-index":3})
  .to('.thumb-box.box4',{"z-index":4})



  // 4. sc-wrap 스크롤 이벤트

  const scale1 = gsap.timeline({
    scrollTrigger: {
      trigger: '.sc-wrap',
      start: '0% 80%',
      end: '-10% 0%',
      scrub: 1,
      // markers: true
    }
  })
  scale1
  .from('.sc-wrap',{scale: .9})

  
  const scale2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.sc-wrap',
      start: '100% 100%',
      end: '100% 100%',
      scrub: 1,
      // markers: true
    }
  })
  scale2
  .to('.sc-wrap',{scale: .9})


  // 5. sc-influ 이미지 스크럽 이벤트

  const influScrub = document.querySelectorAll('.sc-influ .scroll-area img')
  influScrub.forEach(element => {
    dataY = element.dataset.y;
    gsap.to(element,{
      scrollTrigger: {
        trigger: element.parentElement,
        scrub: 1,
        start:"0% 100%", 
        end:"100% 0%",
        // markers: true,
      },
      yPercent:dataY
    })
  });

// 6. sc-prd 카드 이미지 스크럽 이펙트
  const cardScrub = document.querySelectorAll('.sc-prd .wrap-card .thumb-box img')
  cardScrub.forEach(element => {
    dataY = element.dataset.y;
    gsap.to(element,{
      scrollTrigger: {
        trigger: element.parentElement,
        scrub: 1,
        start:"0% 100%", 
        end:"100% 0%",
        // markers: true,
      },
      yPercent:dataY
    })
  });



  // 7. mobile nav

    $('.header .wrapper-m .btn-menu').click(function(e){
      e.preventDefault();

      $('.header .wrapper-m .nav').slideToggle();

    })
    $('.container').click(function(e){
      e.preventDefault();
      $('.header .wrapper-m .nav').slideUp();
    })

    $('.header .wrapper-m .link-nav').click(function(e){
      e.preventDefault();
      $(this).siblings('.sub-nav-list').slideToggle();
      $(this).children('.icon-arrow').toggleClass('on');
    })

    // 8. mobile swiper

    var ww = $(window).width();
    var prdSwiper = undefined;

    function initSwiper(){
      if(ww < 768 && prdSwiper == undefined){
        prdSwiper = new Swiper(".sc-prd .swiper",{
          slidesPerView: 'auto', 
        });
      }else if(ww >= 768 && prdSwiper!= undefined){
        prdSwiper.destroy();
        prdSwiper == undefined;
      }
    }

    initSwiper();

    $(window).on("resize", function(){
      ww = $(window).width();
      initSwiper();
    });
 
    // $(window).trigger("resize"); 

   

})