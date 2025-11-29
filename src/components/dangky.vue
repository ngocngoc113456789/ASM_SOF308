<template>
  <header class="py-4 bg-light border-bottom mb-3">
    <div class="container">
      <div class="text-center my-5">
        <h1 class="fw-bolder">Đăng Ký</h1>
      </div>
    </div>
  </header>
  <div class="container">
    <div class="profile-wrapper p-4 border rounded">
      <div class="row">
        <div class="col-lg-10 offset-lg-1">
          <div class="bg-white shadow rounded mb-3">
            <div class="row">
              <div class="col-md-7 pe-0">
                <div class="form-left h-100 py-5 px-5">
                  <form @submit.prevent="register" class="row g-4">
                    <div class="col-12">
                      <label>Họ tên<span class="text-danger">*</span></label>
                      <div class="input-group">
                        <div class="input-group-text">
                          <i class=""></i>
                        </div>
                        <input
                          v-model="hoTen"
                          type="text"
                          class="form-control"
                          placeholder="Họ tên"
                          :disabled="loading"
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <label>Email<span class="text-danger">*</span></label>
                      <div class="input-group">
                        <div class="input-group-text">
                          <i class=""></i>
                        </div>
                        <input
                          v-model="email"
                          type="email"
                          class="form-control"
                          placeholder="Email"
                          :disabled="loading"
                        />
                      </div>
                    </div>

                    <div class="col-12">
                      <label>Password<span class="text-danger">*</span></label>
                      <div class="input-group">
                        <div class="input-group-text">
                          <i class=""></i>
                        </div>
                        <input
                          v-model="matKhau"
                          type="password"
                          class="form-control"
                          placeholder="Password"
                          :disabled="loading"
                        />
                      </div>
                    </div>

                    <!-- Thông báo thành công (xanh) -->
                    <div v-if="successMessage" class="col-12 text-success mt-2">
                      <small>{{ successMessage }}</small>
                    </div>

                    <!-- Thông báo lỗi (đỏ) -->
                    <div v-if="errorMessage" class="col-12 text-danger mt-2">
                      <small>{{ errorMessage }}</small>
                    </div>

                    <div class="col-12">
                      <router-link to="/login" class="float-end text-primary">
                        Tài khoản đã có
                      </router-link>
                    </div>

                    <div class="col-12">
                      <button
                        type="submit"
                        class="btn btn-dark px-4 float-end mt-4"
                        :disabled="loading"
                      >
                        {{ loading ? "Đang đăng ký..." : "Đăng ký" }}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const hoTen = ref("");
const email = ref("");
const matKhau = ref("");
const errorMessage = ref("");
const successMessage = ref("");   // thêm dòng này để hiện thông báo xanh
const loading = ref(false);
const router = useRouter();

const register = async () => {
  // Reset thông báo cũ
  errorMessage.value = "";
  successMessage.value = "";

  // Kiểm tra rỗng
  if (!hoTen.value || !email.value || !matKhau.value) {
    errorMessage.value = "Vui lòng điền đầy đủ thông tin.";
    return;
  }

  loading.value = true;

  // Giả lập đang gọi API (delay 1 giây cho giống thật)
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Fake thành công 100%
  localStorage.setItem("userInfo", JSON.stringify({
    hoTen: hoTen.value,
    email: email.value,
    role: "USER"
  }));

  successMessage.value = "Đăng ký thành công! Đang chuyển sang trang đăng nhập...";
  loading.value = false;

  // Chuyển sang trang login sau 1.5 giây
  setTimeout(() => {
    router.push("/login");
  }, 1500);
};
</script>

<style scoped>
.profile-wrapper {
  border: 2px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>