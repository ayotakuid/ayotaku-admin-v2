<script setup>
  import LogoMyanimelist from '../../../../public/assets/media/ayotaku/Tulisan MyAnimeList.png';
</script>

<template>
  <div class="full-page">
    <div class="container-fluid">
      <div class="row d-flex align-items-center justify-content-center" style="min-height: 100vh; width:">
        <div class="col-lg-6 col-sm-12" id="root-content">
          <div class="content-div shadow-sm border border-white d-flex">
            <div class="container-fluid">
              <div class="row">
                <div class="col-lg-6 col-md-12 col-sm-12" id="left-side">
                  <div class="img-logo-login"></div>
                </div>
                <div class="col-lg-6 col-md-12 col-sm-12">
                  <div class="container-fluid">
                    <div class="row d-flex align-items-center justify-content-center" id="right-box-login">
                      <div class="col-md-12 text-light">
                        <div class="text-center"> <!-- Untuk mengatur agar konten berada di tengah -->
                          <img :src="LogoMyanimelist" alt="Logo Myanimelist" class="logo-myanime">
                          <div class="login">
                            <button class="btn btn-primary btn-sm">Login</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .full-page {
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: #2F303E;
    position: fixed;
  }

  .content-div {
    background-color: #26364E;
    border-radius: 20px;
    height: 500px;
    transition: 0.5s;
  }

  #left-side {
    height: 498px;
    width: 50%;
    background-image: url('../../../../public/assets/media/ayotaku/New Profile.png');
    background-size: cover;
    background-position: center;
    border-radius: 20px 0 0 20px;
    transition: 0.5s;
    opacity: 0.8;
  }

  #right-box-login {
    min-height: 50vh;
    transition: 0.5s;
  }

  .logo-myanime {
    width: 60%;
    transition: 0.5s;
  }

  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }


  @media (max-width: 992px) {
    #left-side {
      width: 100%;
      border-radius: 20px 20px 0 0;
      height: 250px;
    }

    #right-box-login {
      min-height: 20vh;
    }

    .logo-myanime {
      width: 50%;
    }
  }
</style>
