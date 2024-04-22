document.addEventListener('DOMContentLoaded', function () {

  //scroll to anchor 
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    });
  });

  // Dropdown Toggle
  const dropdownToggle = document.querySelectorAll('.dropdown-toggle');

  dropdownToggle.forEach(item => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      item.parentElement.classList.toggle('show');
    });
  })

  window.addEventListener('click', (e) => {
    if (!e.target.matches('.header-nav .dropdown-toggle')) {
      dropdownToggle.forEach(item => {
        item.parentElement.classList.remove('show');
      })
    }
  })

  // Navigation Menu
  document.querySelector('.nav-toggle').addEventListener('click', function () {
    if (document.querySelector('.header.nav-active')) {
      if (document.querySelector('.menu-collapse.active')) {
        document.querySelector('.menu-collapse.active').classList.remove('active');
      }
    }
    document.querySelector('.header').classList.toggle('nav-active');
    document.querySelector('body').classList.toggle('unscroll');
  })

  var slotsSwiper = new Swiper(".slots-slider", {
    slidesPerView: 'auto',
    slidesPerGroup: 2,
    spaceBetween: 8,
    cssMode: true,
    lazy: true,
    // loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    }
  });

  var slotsTopSwiper = new Swiper(".slots-slider-top", {
    slidesPerView: 'auto',
    slidesPerGroup: 2,
    spaceBetween: 4,
    cssMode: true,
    lazy: true,
    // loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        spaceBetween: 20,
      },
    },
  });

  let slotCard = document.querySelectorAll('.slots-slider-wrapper .slot-item');

  slotCard.forEach(item => {
    if (window.matchMedia("not ((hover: hover) and (pointer: fine))").matches) {
      let itemWrapper = item.closest('.slots-slider-wrapper');
      item.addEventListener('click', () => {
        item.classList.add('active');
        itemWrapper.classList.add('slot-card-active');
        if (item.querySelector('video')) {
          item.querySelector('video').play()
        }
      })
      itemWrapper.addEventListener('click', (event) => {
        if (event.target.classList.contains('slot-card-active')) {
          itemWrapper.querySelector('.slot-item.active').classList.remove('active');
          itemWrapper.classList.remove('slot-card-active');
          if (itemWrapper.querySelector('.slot-item.active video')) {
            itemWrapper.querySelector('.slot-item.active video').pause();
            itemWrapper.querySelector('.slot-item.active video').currentTime = 0;
          }
        }
      })
    } else {
      item.addEventListener('mouseover', () => {
        var rect = item.getBoundingClientRect();
        let parentRect = item.closest('.swiper').getBoundingClientRect();
        let cardRect = item.querySelector('.slot-card').getBoundingClientRect();
        let positionLeft = 0;

        if (parentRect.left < 70 && rect.left < 70) {
          positionLeft = cardRect.width / 2;
        } else if (parentRect.left < 70 && rect.left > (parentRect.width - (cardRect.width / 2))) {
          positionLeft = document.body.clientWidth - (cardRect.width / 2) - parentRect.left + 12;
        } else {
          positionLeft = rect.left - parentRect.left + 24 + (rect.width / 2);
        }

        item.querySelector('.slot-card').style.left = positionLeft + 'px';

        if (item.querySelector('video')) {
          sleep(1000).then(() => {
            item.querySelector('video').play()
          })
        }
      
      });
      item.addEventListener('mouseleave', () => {
        if (item.querySelector('video')) {
          item.querySelector('video').pause()
          item.querySelector('video').currentTime = 0;
        }
      })
    }
  })

  // Accordion
  if (document.querySelector('.accordion')) {
    // (Optional) Active an item if it has the class "is-active"  
    // document.querySelector('.accordion-content .accordion-item.active');

    document.querySelectorAll('.accordion-content .accordion-item > .accordion-heading').forEach((item) => {
      item.addEventListener('click', function () {
        // event.preventDefault();
        let accordion = item.closest('.accordion');
        let content = item.parentNode.querySelector('.accordion-text');
        // Cancel the siblings
        if (item.parentNode.classList.contains('active')) {
          item.parentNode.classList.remove('active')
          content.style.maxHeight = 0;
        } else {
          if (!accordion.classList.contains('accordion-multiple') && item.parentNode.classList.contains('active')) {
            document.querySelector('.accordion-content .accordion-item.active .accordion-text').style.maxHeight = 0;
            item.parentNode.classList.contains('active').classList.remove('active');
          }
          // Toggle the item
          item.parentNode.classList.add('active');
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    })
  } 

  // Tabs 
  if (document.querySelector('.tabs')) {
    const tabs = document.querySelectorAll('[data-tab-target]')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const tabSiblings = Array.from(tab.parentElement.children).filter(sibling => sibling !== tab && sibling.classList.contains('tab'));
        const target = document.querySelector(tab.dataset.tabTarget);

        const tabContentSiblings = Array.from(target.parentElement.children).filter(sibling => sibling !== target);

        tabContentSiblings.forEach(tabContent => {
          tabContent.classList.remove('active')
        })
     
        tabSiblings.forEach(tab => {
          tab.classList.remove('active')
        })

        tab.classList.add('active')
        target.classList.add('active')
      })
    })

   

  }



});


(function () {
  /* Opening modal window function */
  function openModal() {
    /* Get trigger element */
    var modalTrigger = document.getElementsByClassName('jsModalTrigger');

    /* Set onclick event handler for all trigger elements */
    for (var i = 0; i < modalTrigger.length; i++) {
      modalTrigger[i].onclick = function () {
        var target = this.getAttribute('href').substr(1);
        var modalWindow = document.getElementById(target);

        modalWindow.classList ? modalWindow.classList.add('open') : modalWindow.className += ' ' + 'open';
        document.querySelector('body').classList.add('unscroll');

        if (modalWindow.classList.contains('search-modal')) {
          setTimeout(() => {
            document.querySelector('.search-modal .search-field').focus();
            // Start Search DEMO
            document.querySelector('.search-field').addEventListener('input', (event) => {
              let field = event.target;
              document.querySelector('.search-loading').classList.remove('d-none');
              document.querySelector('.search-authors').classList.add('d-none');
              document.querySelector('.search-tags').classList.add('d-none');
              document.querySelector('.search-articles').classList.add('d-none');
              document.querySelector('.search-not-found').classList.add('d-none');

              if (field.value == 'D') {
                setTimeout(() => {
                  document.querySelector('.search-not-found').classList.add('d-none');
                  document.querySelector('.search-loading').classList.add('d-none');
                  document.querySelector('.search-authors').classList.remove('d-none');
                  document.querySelector('.search-tags').classList.remove('d-none');
                  document.querySelector('.search-articles').classList.remove('d-none');
                }, 1000);
              } else {
                setTimeout(() => {
                  document.querySelector('.search-loading').classList.add('d-none');
                  document.querySelector('.search-authors').classList.add('d-none');
                  document.querySelector('.search-tags').classList.add('d-none');
                  document.querySelector('.search-articles').classList.add('d-none');
                  document.querySelector('.search-not-found').classList.remove('d-none');
                }, 1000);
              }
            })
            // End Search DEMO
          }, 300);
        }
       
      }
    }
  }

  function closeModal() {
    /* Get close button */
    var closeButton = document.getElementsByClassName('jsModalClose');
    var closeOverlay = document.getElementsByClassName('jsOverlay');

    /* Set onclick event handler for close buttons */
    for (var i = 0; i < closeButton.length; i++) {
      closeButton[i].onclick = function () {
        var modalWindow = this.closest('.modal');
        modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        document.querySelector('body').classList.remove('unscroll');
      }
    }

    /* Set onclick event handler for modal overlay */
    for (var i = 0; i < closeOverlay.length; i++) {
      closeOverlay[i].onclick = function () {
        var modalWindow = this.parentNode;

        modalWindow.classList ? modalWindow.classList.remove('open') : modalWindow.className = modalWindow.className.replace(new RegExp('(^|\\b)' + 'open'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        document.querySelector('body').classList.remove('unscroll');
      }
    }

  }

  /* Handling domready event IE9+ */
  function ready(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  /* Triggering modal window function after dom ready */
  ready(openModal);
  ready(closeModal);
}());

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}