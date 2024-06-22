<script setup>
  // SETTING TITLE FOR PAGE
  const data = [
    {
      name: 'episode-page',
      text: 'Episode Anime Page',
    },
  ];

  const emit = defineEmits(['parents'])
  emit('parents', data)
</script>

<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-md-12 my-2 d-flex justify-content-end">
              <router-link 
                to="/" 
                class="btn btn-primary btn-sm btn-icon"
                v-tooltip.bottom-end="'Back to dashboard'"
              >
                <i class="fa-solid fa-arrow-left"></i>
              </router-link>
            </div>

            <div class="col-md-12">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero esse accusamus voluptates quisquam porro sit ipsa adipisci impedit quam cum laborum quod praesentium consequuntur sapiente nihil error quas, quibusdam iusto.
              Adipisci, quasi at. Dignissimos laborum tempore asperiores? Eligendi corporis doloremque obcaecati repudiandae enim eveniet autem in dolorem, similique illo repellendus cupiditate voluptate dolores eum veritatis officiis minus libero, quia vel.
              Et mollitia ab voluptates exercitationem expedita corporis magni totam consectetur ipsa, dicta id reprehenderit autem consequatur rem tempore, in distinctio? Eos autem voluptas eum tempore, reiciendis doloribus nesciunt aperiam maxime?
              Officia excepturi, obcaecati error atque repudiandae impedit totam, doloremque facilis tenetur non dolorum deserunt minus? Hic commodi non eos excepturi nihil. Provident eius aliquam incidunt in veritatis esse explicabo modi.
              Voluptates sint esse, deserunt quidem inventore deleniti fuga iusto suscipit obcaecati totam odit exercitationem eos perspiciatis quas optio possimus nam nostrum dolorum repudiandae porro vero. Vel voluptatibus neque dicta libero?
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>