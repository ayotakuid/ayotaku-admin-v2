<script setup>
  import { useRouter } from 'vue-router';
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import LogoMyanimelist from '../../../../public/assets/media/ayotaku/Tulisan MyAnimeList.png';
  import LogoLoginButton from '../../../../public/assets/media/icons/ayotaku/Icon MAL.svg';
  import Cookies from '../../utils/handler-cookies';
  import Fetching from '../../utils/handler-fetching';
  import { CLIENT_ID, CODE_CHALLENGE, RESPONSE_TYPE } from '../../utils/others/config.json';

  const router = useRouter();
  const getStateLogin = ref();
  const loadingButton = ref(false);
  const emit = defineEmits(['stateLogin']);
  
  watchEffect(async () => {
    const { code } = router.currentRoute.value.query;
    const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

    if (code) {
      loadingButton.value = true;

      const responseCallback = await Fetching.handlerCallbackLogin(code);

      if (responseCallback.status) {
        if (responseCallback.status !== 'success') {
          toast.promise((promise), {
            loading: 'Loading...',
            success: 'Ada suatu kesalahan terjadi!',
            duration: 2000
          });
          return;
        }

        if (responseCallback.status === 'success') {
          toast.promise((promise), {
            loading: 'Loading...',
            success: 'Berhasil login dengan Myanimelist',
            duration: 2000
          });

          Cookies.setCookies('tokenAyotaku', responseCallback.responseData?.tokenAyotaku);
          Cookies.setCookies('tokenMAL', responseCallback.responseData?.token_mal);

          setTimeout(() => {
            toast.promise((promise), {
              loading: 'Please wait',
              success: 'Berhasil di redirect',
              error: 'ERROR',
              duration: 3000
            })

            const parse = JSON.stringify({
              id: responseCallback.responseData?.id_mal,
              name: responseCallback.responseData?.name_mal,
            })

            localStorage.setItem('infoLogin', parse);
            localStorage.setItem('stateLogin', 'true');
            getStateLogin.value = localStorage.getItem('stateLogin');
            emit('stateLogin', getStateLogin.value);

            router.push('/').then(() => {
              setTimeout(() => {
                location.reload();
              }, 2000)
            });
          }, 2500)
        }
      }
    }
  });

  const handlerClickButton = () => {
    loadingButton.value = true
  }
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
                            <a 
                              class="button-login" 
                              :class="{ 'disable-button-login': loadingButton }" 
                              :href="`https://myanimelist.net/v1/oauth2/authorize?response_type=${RESPONSE_TYPE}&client_id=${CLIENT_ID}&code_challenge=${CODE_CHALLENGE}`"
                              @click="handlerClickButton"
                            >
                              <img :src="LogoLoginButton" alt="Icon Button Login" class="img-button-login rounded-circle"> Login
                            </a>
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
    font-family: "Nunito", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
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
    width: 80%;
    transition: 0.5s;
  }

  .login {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .button-login {
    background-color: #4a4f6a;
    color: white;
    border: 1px solid #ffffff;
    box-shadow: 5px 5px 15px black;
    border-radius: 25px;
    padding: 10px 20px;
    font-size: larger;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 150px;
    transition: 0.5s;
    cursor: pointer;
  }

  .button-login:hover {
    background-color: #2c3250;
    box-shadow: 2px 2px 10px black;
  }

  .disable-button-login {
    pointer-events: none;
    cursor: default;
  }

  .img-button-login {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border: 1px solid #ffffff;
  }

  @media (max-width: 1400px) {
    #right-box-login {
      min-height: 80vh;
      border-radius: 20px;
      display: inline;
    }
  }


  @media (max-width: 992px) {
    #left-side {
      width: 100%;
      border-radius: 20px 20px 0 0;
      height: 250px;
    }

    #right-box-login {
      min-height: 40vh;
    }

    .logo-myanime {
      width: 50%;
    }

    @media (max-width: 450px) {
      #right-box-login {
        min-height: 30vh;
      }
    }
  }
</style>
