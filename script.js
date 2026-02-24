// Script cho website Du Lịch Việt Nam
// Viết cho học sinh cấp 3 với chú thích từng dòng lệnh

// Chờ tài liệu HTML tải xong trước khi thực thi JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Hàm này sẽ chạy khi trang web đã tải xong

  // Xử lý form đặt tour
  const bookingForm = document.getElementById("bookingForm");
  // Tìm form đặt tour theo ID

  if (bookingForm) {
    // Kiểm tra xem form có tồn tại không (chỉ có ở trang booking.html)

    // Thêm sự kiện submit cho form
    bookingForm.addEventListener("submit", function (event) {
      // Ngăn form gửi dữ liệu mặc định để kiểm tra trước
      event.preventDefault();

      // Gọi hàm kiểm tra form
      if (validateForm()) {
        // Nếu form hợp lệ, hiển thị thông báo thành công
        alert(
          "Cảm ơn bạn đã đặt tour! Chúng tôi sẽ liên hệ với bạn trong vòng 24 giờ.",
        );
        // Hiển thị hộp thoại thông báo
        bookingForm.reset();
        // Reset form về trạng thái ban đầu
      }
    });
  }

  // Hàm kiểm tra tính hợp lệ của form
  function validateForm() {
    // Lấy giá trị từ các trường input
    const fullname = document.getElementById("fullname").value.trim();
    // Lấy họ tên và loại bỏ khoảng trắng thừa
    const email = document.getElementById("email").value.trim();
    // Lấy email và loại bỏ khoảng trắng thừa
    const phone = document.getElementById("phone").value.trim();
    // Lấy số điện thoại và loại bỏ khoảng trắng thừa
    const tour = document.getElementById("tourSelect").value;
    // Lấy tour đã chọn
    const startDate = document.getElementById("startDate").value;
    // Lấy ngày khởi hành
    const numPeople = document.getElementById("numPeople").value;
    // Lấy số người

    // Kiểm tra họ tên không được để trống
    if (fullname === "") {
      alert("Vui lòng nhập họ và tên!");
      // Hiển thị thông báo lỗi
      return false;
      // Trả về false để ngăn form gửi
    }

    // Kiểm tra email có đúng định dạng không
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Biểu thức chính quy để kiểm tra email
    if (!emailRegex.test(email)) {
      alert("Vui lòng nhập email hợp lệ!");
      // Hiển thị thông báo lỗi
      return false;
      // Trả về false
    }

    // Kiểm tra số điện thoại
    const phoneRegex = /^[0-9]{10,11}$/;
    // Biểu thức chính quy cho số điện thoại Việt Nam
    if (!phoneRegex.test(phone)) {
      alert("Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số)!");
      // Hiển thị thông báo lỗi
      return false;
      // Trả về false
    }

    // Kiểm tra đã chọn tour chưa
    if (tour === "") {
      alert("Vui lòng chọn tour!");
      // Hiển thị thông báo lỗi
      return false;
      // Trả về false
    }

    // Kiểm tra ngày khởi hành
    if (startDate === "") {
      alert("Vui lòng chọn ngày khởi hành!");
      // Hiển thị thông báo lỗi
      return false;
      // Trả về false
    }

    // Kiểm tra ngày khởi hành không được trong quá khứ
    const today = new Date().toISOString().split("T")[0];
    // Lấy ngày hôm nay theo định dạng YYYY-MM-DD
    if (startDate < today) {
      alert("Ngày khởi hành không được trong quá khứ!");
      // Hiển thị thông báo lỗi
      return false;
      // Trả về false
    }

    // Kiểm tra số người
    if (numPeople < 1 || numPeople > 20) {
      alert("Số người phải từ 1 đến 20!");
      // Hiển thị thông báo lỗi
      return false;
      // Trả về false
    }

    // Nếu tất cả kiểm tra đều pass
    return true;
    // Trả về true để cho phép gửi form
  }

  // Xử lý hiệu ứng hover cho các card
  const cards = document.querySelectorAll(
    ".destination-card, .food-item, .tour-card",
  );
  // Tìm tất cả các card trong trang

  cards.forEach(function (card) {
    // Lặp qua từng card

    // Thêm sự kiện mouseenter (khi chuột vào card)
    card.addEventListener("mouseenter", function () {
      // Thêm class hover để tạo hiệu ứng
      this.classList.add("card-hover");
    });

    // Thêm sự kiện mouseleave (khi chuột rời card)
    card.addEventListener("mouseleave", function () {
      // Xóa class hover
      this.classList.remove("card-hover");
    });
  });

  // Xử lý gallery ảnh (nếu có)
  const images = document.querySelectorAll(
    ".destination-card img, .food-item img, .tour-image img",
  );
  // Tìm tất cả hình ảnh trong card

  images.forEach(function (img) {
    // Lặp qua từng hình ảnh

    // Thêm sự kiện click để phóng to ảnh
    img.addEventListener("click", function () {
      // Tạo modal để hiển thị ảnh phóng to
      createImageModal(this.src, this.alt);
      // Gọi hàm tạo modal với đường dẫn và mô tả ảnh
    });
  });

  // Hàm tạo modal hiển thị ảnh phóng to
  function createImageModal(src, alt) {
    // Tạo các phần tử HTML cho modal
    const modal = document.createElement("div");
    // Tạo div modal
    modal.className = "image-modal";
    // Thêm class cho modal

    modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${src}" alt="${alt}">
                <p>${alt}</p>
            </div>
        `;
    // Thêm nội dung HTML cho modal

    // Thêm modal vào body
    document.body.appendChild(modal);

    // Hiển thị modal
    setTimeout(function () {
      modal.classList.add("show");
    }, 10);

    // Xử lý đóng modal
    const closeBtn = modal.querySelector(".close-modal");
    // Tìm nút đóng modal

    closeBtn.addEventListener("click", function () {
      // Thêm sự kiện click để đóng modal
      closeModal(modal);
    });

    // Đóng modal khi click bên ngoài
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        // Kiểm tra click vào nền modal
        closeModal(modal);
      }
    });
  }

  // Hàm đóng modal
  function closeModal(modal) {
    // Xóa class show để ẩn modal
    modal.classList.remove("show");

    // Xóa modal khỏi DOM sau khi animation kết thúc
    setTimeout(function () {
      document.body.removeChild(modal);
    }, 300);
  }

  // Xử lý responsive menu (cho mobile)
  const menuToggle = document.createElement("button");
  // Tạo nút toggle menu cho mobile
  menuToggle.className = "menu-toggle";
  // Thêm class
  menuToggle.innerHTML = "&#9776;";
  // Thêm icon hamburger

  // Thêm nút toggle vào header
  const header = document.querySelector("header");
  if (header) {
    header.appendChild(menuToggle);
  }

  // Xử lý click nút toggle
  menuToggle.addEventListener("click", function () {
    const menu = document.querySelector(".menu");
    // Tìm menu
    menu.classList.toggle("show");
    // Thêm/xóa class show
  });

  // Xử lý smooth scroll cho các liên kết nội bộ
  const links = document.querySelectorAll('a[href^="#"]');
  // Tìm các liên kết bắt đầu bằng #

  links.forEach(function (link) {
    // Lặp qua từng liên kết
    link.addEventListener("click", function (event) {
      event.preventDefault();
      // Ngăn hành vi mặc định

      const targetId = this.getAttribute("href");
      // Lấy ID của phần tử đích
      const targetElement = document.querySelector(targetId);
      // Tìm phần tử đích

      if (targetElement) {
        // Nếu phần tử tồn tại
        targetElement.scrollIntoView({
          behavior: "smooth",
          // Cuộn mượt mà
        });
      }
    });
  });

  // Thêm hiệu ứng animation khi scroll
  const observerOptions = {
    threshold: 0.1,
    // Kích hoạt khi 10% phần tử hiển thị
  };

  const observer = new IntersectionObserver(function (entries) {
    // Tạo observer để theo dõi phần tử vào viewport
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        // Nếu phần tử đang hiển thị
        entry.target.classList.add("animate-in");
        // Thêm class để tạo animation
      }
    });
  }, observerOptions);

  // Áp dụng observer cho các card
  const animateElements = document.querySelectorAll(
    ".destination-card, .food-item, .tour-card, .region-section",
  );
  animateElements.forEach(function (element) {
    observer.observe(element);
    // Theo dõi từng phần tử
  });
});

// Thêm CSS cho modal và responsive menu
const additionalStyles = `
<style>
/* Modal styles */
.image-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    opacity: 0;
    transition: opacity 0.3s;
}

.image-modal.show {
    opacity: 1;
}

.modal-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    background: white;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.modal-content img {
    width: 100%;
    height: auto;
    max-height: 70vh;
    object-fit: contain;
}

.modal-content p {
    padding: 1rem;
    text-align: center;
    font-weight: bold;
    margin: 0;
}

.close-modal {
    position: absolute;
    top: 10px;
    right: 15px;
    color: white;
    font-size: 30px;
    font-weight: bold;
    cursor: pointer;
    z-index: 10001;
}

/* Responsive menu styles */
.menu-toggle {
    display: none;
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
}

.menu {
    transition: all 0.3s;
}

/* Animation styles */
.destination-card, .food-item, .tour-card, .region-section {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s ease-out;
}

.animate-in {
    opacity: 1;
    transform: translateY(0);
}

@media (max-width: 768px) {
    .menu-toggle {
        display: block;
    }

    .menu {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background: #2c3e50;
        flex-direction: column;
        max-height: 0;
        overflow: hidden;
    }

    .menu.show {
        max-height: 500px;
    }

    .form-row {
        grid-template-columns: 1fr;
    }
}
</style>
`;

// Thêm CSS bổ sung vào head
document.head.insertAdjacentHTML("beforeend", additionalStyles);
// Thêm vào sau các lệnh hiện có trong script.js

// 1. Hiệu ứng đổi màu Header khi cuộn
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// 2. Nút Back to Top
const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 3. Thông báo nhỏ khi người dùng click vào ảnh (Toast notification)
images.forEach((img) => {
  img.style.cursor = "zoom-in"; // Đổi con trỏ chuột cho ảnh
});
