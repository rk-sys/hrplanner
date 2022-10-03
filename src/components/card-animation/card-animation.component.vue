<template>
  <aside
      class="relative z-0 py-4 px-4 overflow-hidden w-full justify-center items-center md:flex md:w-6/12 bg-gray-400 bg-cover bg-soccer flex-col">
    <div class="bg absolute"></div>
    <div class="bg bg2 absolute"></div>
    <div class="bg bg3 absolute"></div>
    <h1 class="text-white text-4xl sm:text-4xl font-bold uppercase">{{ $t('hrplanner') }}</h1>
    <h2 class="text-white text-2xl md:text-xl sm:text-2xl font-light uppercase font-secondary tracking-widest">
      {{ $t('better quality of work') }}</h2>
  </aside>
</template>

<style lang="scss"
       scoped>
.bg {
  animation: slide 3s ease-in-out infinite alternate;
  background-image: linear-gradient(45deg, #252230 50%, #334AFF 40%);
  bottom: 0;
  left: -30%;
  opacity: .75;
  right: -50%;
  top: 0;
  z-index: -1;
}

.bg2 {
  animation-direction: alternate-reverse;
  animation-duration: 4s;
}

.bg3 {
  animation-duration: 5s;
}

@keyframes slide {
  0% {
    transform: translateX(-15%);
  }
  100% {
    transform: translateX(15%);
  }
}
</style>
