// Your JavaScript code goes here
console.log("Hello, world!");





// Add event listener to scroll links
document.querySelectorAll(".scroll-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetElement = document.querySelector(this.getAttribute("href"));
    const targetOffsetTop = targetElement.offsetTop - 128;

    window.scrollTo({
      top: targetOffsetTop,
      behavior: "smooth",
    });
  });
});

const offcanvasElementList = document.querySelectorAll(".offcanvas");
const offcanvasList = [...offcanvasElementList].map(
  (offcanvasEl) => new bootstrap.Offcanvas(offcanvasEl)
);

const offcanvasElement = document.getElementById("offcanvasResponsive");
const closeOffCanvasLinks = document.querySelectorAll(".closeOffCanvas");

closeOffCanvasLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    // Close the offcanvas menu and overlay using Bootstrap methods
    const offcanvasElement = document.getElementById("offcanvasResponsive");
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasElement);
    offcanvasInstance.hide();

    const overlayElement = document.querySelector(".offcanvas-overlay");
    overlayElement.classList.remove("show");

    const targetElement = document.querySelector(this.getAttribute("href"));
    const targetOffsetTop = targetElement.offsetTop - 100;

    window.scrollTo({
      top: targetOffsetTop,
      behavior: "smooth",
    });
  });
});




//ACCORDION FUNCTION
class Accordion {
  constructor(element) {
    this.element = element;
    this.items = Array.from(element.querySelectorAll(".Accordion-item"));
    this.activeItem = null;

    this.openFirstItem();

    this.items.forEach((item) => {
      const toggle = item.querySelector(".Accordion-toggle");
      toggle.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleItem(item);
      });
    });
  }

  openFirstItem() {
    const firstItem = this.items[0];
    firstItem.classList.add("active");
    this.activeItem = firstItem;
    this.openContent(firstItem);
  }

  toggleItem(item) {
    if (this.activeItem === item) {
      // Do nothing if the same item is clicked again
      return;
    } else {
      if (this.activeItem) {
        this.activeItem.classList.remove("active");
        this.closeContent(this.activeItem);
      }
      item.classList.add("active");
      this.activeItem = item;
      this.openContent(item);

      // Get all accordion anchor elements
      const anchorElements = document.querySelectorAll(
        ".accordionCampusAnchor"
      );

      // Remove all accordion item classes from the anchor elements
      anchorElements.forEach((anchorElement) => {
        Array.from(anchorElement.classList).forEach((cls) => {
          if (cls.startsWith("accordionItem")) {
            anchorElement.classList.remove(cls);
          }
        });
      });

      // Add the class corresponding to the active accordion item
      anchorElements.forEach((anchorElement) => {
        anchorElement.classList.add(
          `accordionItem${item.id.replace("accordionItem", "")}`
        );
      });
    }
  }

  openContent(item) {
    const content = item.querySelector(".Accordion-content");
    content.style.maxHeight = content.scrollHeight + "px";
    // Add active CSS styles to the active accordion item
    item.querySelector(".Accordion-toggle").classList.add("active-toggle");
    item.classList.add("active-accordion-item");
  }

  closeContent(item) {
    const content = item.querySelector(".Accordion-content");
    content.style.maxHeight = null;
    // Remove active CSS styles from the inactive accordion item
    item.querySelector(".Accordion-toggle").classList.remove("active-toggle");
    item.classList.remove("active-accordion-item");
  }

  resetAccordion() {
    this.items.forEach((item) => {
      item.classList.remove("active");
      this.closeContent(item);
    });
    this.activeItem = null;
  }

  resetAnchorClass(activeItemId) {
    const anchorElements = document.querySelectorAll(".accordionCampusAnchor");
    anchorElements.forEach((anchorElement) => {
      Array.from(anchorElement.classList).forEach((cls) => {
        if (cls.startsWith("accordionItem")) {
          anchorElement.classList.remove(cls);
        }
      });
      anchorElement.classList.add(
        `accordionItem${activeItemId.replace("accordionItem", "")}`
      );
    });
  }
}

// Initialize the accordion
const accordionElements = document.querySelectorAll(".Accordion");
accordionElements.forEach((element) => {
  const accordion = new Accordion(element);
  element.AccordionInstance = accordion;
});

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    // Remove active class from all nav-links
    navLinks.forEach((navLink) => navLink.classList.remove("active"));
    // Add active class to the current nav-link
    e.target.classList.add("active");
    const tabId = e.target.getAttribute("data-bs-target");
    const accordionElement = document.querySelector(`${tabId} .Accordion`);
    const accordion = accordionElement.AccordionInstance;
    accordion.resetAccordion();

    const activeItem = accordionElement.querySelector(".active");
    if (!activeItem) {
      accordion.openFirstItem();
    }

    let activeItemId;
    if (activeItem) {
      activeItemId = activeItem.id;
    } else {
      activeItemId = accordion.items[0].id; // default to the first item
    }

    accordion.resetAnchorClass(activeItemId);
  });
});




//GALLERY HORIZONTAL BUTTON AND AUTO PLAY
/* SET IMAGE SLIDER HEIGHT */
const slideImagerImages = document.querySelector('.slideImagerImages');
const slideImages = document.querySelectorAll('.slideImage');
let currentIndex = 0;
let autoslideImageInterval;
let slideImagerImagesWidth = slideImages[0].offsetWidth;

function nextslideImage() {
  currentIndex = (currentIndex + 1) % slideImages.length;
  updateslideImagerImages();
}

function prevslideImage() {
  currentIndex = (currentIndex - 1 + slideImages.length) % slideImages.length;
  updateslideImagerImages();
}

function updateslideImagerImages() {
  const activeslideImageOffset = -(slideImages[currentIndex].offsetLeft - (slideImagerImages.clientWidth - slideImagerImagesWidth) / 2);

  if (currentIndex === slideImages.length - 1 && !slideImagerImages.style.transition) {
    slideImagerImages.style.transition = 'none';
    slideImagerImages.style.transform = `translateX(0px)`;

    setTimeout(() => {
      slideImagerImages.style.transition = 'transform 0.5s ease-in-out';
      currentIndex = 0;
      updateslideImagerImages();
    }, 0);
  } else {
    slideImagerImages.style.transform = `translateX(${activeslideImageOffset}px)`;
  }

  updateslideImageVisibility(); // Call the function to update slideImage visibility
  updateslideImageSize();
}

function updateslideImageVisibility() {
  slideImages.forEach((slideImage, index) => {
    if (index === currentIndex || (index === currentIndex - 1 && currentIndex === 0)) {
      slideImage.classList.remove('inactive');
    } else {
      slideImage.classList.add('inactive');
    }
  });
}

function updateslideImageSize() {
  slideImages.forEach((slideImage, index) => {
    if (index === currentIndex) {
      slideImage.style.transform = 'scale(1.2)'; // Increase size for the active slideImage
    } else {
      slideImage.style.transform = 'scale(0.8)'; // Reset size for inactive slideImages
    }
  });
}

// Auto-slideImage functionality
function startAutoslideImage() {
  autoslideImageInterval = setInterval(() => {
    nextslideImage();
  }, 3000); // Change slideImage every 3 seconds (adjust as needed)
}

function stopAutoslideImage() {
  clearInterval(autoslideImageInterval);
}

// Start auto-slideImage when the page loads
startAutoslideImage();

// Pause auto-slideImage on hover (optional)
slideImagerImages.addEventListener('mouseover', stopAutoslideImage);
slideImagerImages.addEventListener('mouseout', startAutoslideImage);

// Loop back to the first image after any slideImage
function checkLastslideImage() {
  if (currentIndex === slideImages.length - 1 || currentIndex === 0) {
    setTimeout(() => {
      currentIndex = 1; // Start from the second image
      updateslideImagerImages();
    }, 500); // Delay before looping to the second slideImage
  }
}

// Listen for the end of the transition to check for the last slideImage
slideImagerImages.addEventListener('transitionend', checkLastslideImage);

// Recalculate slideImagerImagesWidth when the window is resized
window.addEventListener('resize', () => {
  slideImagerImagesWidth = slideImagerImages.clientWidth;
  updateslideImagerImages();
});

// Initial positioning and sizing
updateslideImagerImages();



//STOP YOUTUBE VIDEO
document.addEventListener('DOMContentLoaded', function() {
  var tabLinks = document.querySelectorAll('.nav-link.footerTabContainerItem');
  tabLinks.forEach(function(tabLink) {
    tabLink.addEventListener('shown.bs.tab', function() {
      var iframes = document.querySelectorAll('iframe');
      iframes.forEach(function(iframe) {
        var src = iframe.getAttribute('src');
        iframe.setAttribute('src', src);
      });
    });
  });
});