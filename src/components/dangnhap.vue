<template>
  <header class="py-4 bg-light border-bottom mb-3">
    <div class="container">
      <div class="text-center my-5">
        <h1 class="fw-bolder">Đăng nhập</h1>
      </div>
    </div>
  </header>
  <div class="container py-5">
    <div class="profile-wrapper p-4 border rounded">
      <div class="row justify-content-center">
        <div class="col-lg-6">
          <div class="bg-white shadow-lg rounded p-4">
            <div class="row align-items-center">
              <div class="col-12">
                <!-- Thông báo lỗi -->
                <div v-if="errorMessage" class="alert alert-danger text-center">
                  {{ errorMessage }}
                </div>
                <!-- Thông báo thành công -->
                <div v-if="successMessage" class="alert alert-success text-center">
                  {{ successMessage }}
                </div>

                <!-- Form đăng nhập -->
                <form @submit.prevent="login">
                  <div class="mb-3">
                    <label for="email" class="form-label fw-bold">
                      Email <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                      <span class="input-group-text bg-primary text-white">
                        <i class="bi bi-envelope"></i>
                      </span>
                      <input
                        v-model="email"
                        id="email"
                        type="email"
                        class="form-control"
                        placeholder="Nhập email"
                        required
                      />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label for="password" class="form-label fw-bold">
                      Mật khẩu <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                      <span class="input-group-text bg-primary text-white">
                        <i class="bi bi-lock"></i>
                      </span>
                      <input
                        v-model="password"
                        id="password"
                        type="password"
                        class="form-control"
                        placeholder="Nhập mật khẩu"
                        required
                      />
                    </div>
                  </div>

                  <div class="d-flex justify-content-between align-items-center mb-4">
                    <div class="form-check">
                      <input
                        v-model="rememberMe"
                        class="form-check-input"
                        type="checkbox"
                        id="inlineFormCheck"
                      />
                      <label class="form-check-label" for="inlineFormCheck">
                        Ghi nhớ mật khẩu
                      </label>
                    </div>
                    <router-link to="/register" class="text-primary">
                      Đăng ký
                    </router-link>
                  </div>

                  <button
                    type="submit"
                    class="btn btn-dark w-100 py-2"
                    :disabled="loading"
                  >
                    {{ loading ? "Đang đăng nhập..." : "Đăng nhập" }}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Cookies from "js-cookie";

const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);

const router = useRouter();
const store = useStore();

// Khi mở trang → tự động điền email nếu đã ghi nhớ
onMounted(() => {
  const savedEmail = Cookies.get("email");
  if (savedEmail) {
    email.value = savedEmail;
    rememberMe.value = true;
  }
});

const login = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  loading.value = true;

  // Delay 1 giây cho giống thật
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Lấy thông tin user đã đăng ký (fake) từ localStorage
  const savedUser = localStorage.getItem("userInfo");
  if (!savedUser) {
    errorMessage.value = "Chưa có tài khoản nào. Vui lòng đăng ký trước!";
    loading.value = false;
    return;
  }

  const user = JSON.parse(savedUser);

  // Chỉ cần email đúng là cho đăng nhập (mật khẩu không kiểm tra vì đang fake)
  if (user.email === email.value.trim()) {
    // Lưu vào Vuex để navbar nhận biết đã login
    store.dispatch("login", {
      isLoggedIn: true,
      userInfo: user,
    });

    // Ghi nhớ email nếu chọn
    if (rememberMe.value) {
      Cookies.set("email", email.value, { expires: 7 });
    } else {
      Cookies.remove("email");
    }

    successMessage.value = `Chào mừng ${user.hoTen}! Đăng nhập thành công`;
    
    setTimeout(() => {
      router.push("/");
    }, 1200);
  } else {
    errorMessage.value = "Email không đúng hoặc chưa đăng ký!";
  }

  loading.value = false;
};
</script>

<style scoped>
.profile-wrapper {
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-dark {
  background-color: #212529;
  transition: all 0.3s ease;
}

.btn-dark:hover {
  background-color: #000 !important;
}
</style>